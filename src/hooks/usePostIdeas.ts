import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface GeneratedIdea {
  id: string;
  user_id: string;
  business_type: string;
  target_audience: string;
  goals: string[];
  platform: string;
  post_caption: string;
  hashtags: string[];
  ai_recommendations: {
    best_posting_time: string;
    engagement_tips: string;
    expected_engagement: "low" | "medium" | "high";
    content_type: string;
  };
  status: "generated" | "saved" | "drafted" | "scheduled";
  created_at: string;
  updated_at: string;
}

export interface PostIdeaProfile {
  id: string;
  user_id: string;
  business_type: string;
  target_audience: string;
  primary_goals: string[];
  brand_voice: "casual" | "professional" | "friendly" | "authoritative" | "inspirational";
  created_at: string;
  updated_at: string;
}

export interface GenerateIdeasParams {
  businessType: string;
  targetAudience: string;
  goals: string[];
  platform: string;
  brandVoice?: string;
  numberOfIdeas?: number;
}

export const usePostIdeas = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all generated ideas
  const { data: ideas, isLoading: ideasLoading } = useQuery({
    queryKey: ["post-ideas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_post_ideas")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as GeneratedIdea[];
    },
  });

  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["post-idea-profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_idea_profiles")
        .select("*")
        .maybeSingle();

      if (error) throw error;
      return data as PostIdeaProfile | null;
    },
  });

  // Generate new ideas
  const generateIdeas = useMutation({
    mutationFn: async (params: GenerateIdeasParams) => {
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        "generate-post-ideas",
        { body: params }
      );

      if (functionError) throw functionError;
      if (!functionData.success) throw new Error(functionData.error || "Failed to generate ideas");

      // Store ideas in database
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const ideasToInsert = functionData.ideas.map((idea: any) => ({
        user_id: user.id,
        business_type: functionData.metadata.businessType,
        target_audience: functionData.metadata.targetAudience,
        goals: functionData.metadata.goals,
        platform: functionData.metadata.platform,
        post_caption: idea.caption,
        hashtags: idea.hashtags,
        ai_recommendations: {
          best_posting_time: idea.best_posting_time,
          engagement_tips: idea.engagement_tips,
          expected_engagement: idea.expected_engagement,
          content_type: idea.content_type,
        },
        status: "generated",
      }));

      const { data, error } = await supabase
        .from("generated_post_ideas")
        .insert(ideasToInsert)
        .select();

      if (error) throw error;
      return data as GeneratedIdea[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-ideas"] });
      toast({
        title: "✨ Ideas Generated",
        description: "Your post ideas have been created successfully!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update idea status
  const updateIdeaStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: GeneratedIdea["status"] }) => {
      const { error } = await supabase
        .from("generated_post_ideas")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-ideas"] });
    },
  });

  // Delete idea
  const deleteIdea = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("generated_post_ideas")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-ideas"] });
      toast({
        title: "Idea Deleted",
        description: "The post idea has been removed.",
      });
    },
  });

  // Save or update profile
  const saveProfile = useMutation({
    mutationFn: async (profileData: Omit<PostIdeaProfile, "id" | "user_id" | "created_at" | "updated_at">) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("post_idea_profiles")
        .upsert({ ...profileData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data as PostIdeaProfile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post-idea-profile"] });
      toast({
        title: "✅ Profile Saved",
        description: "Your business profile has been saved successfully!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    ideas,
    ideasLoading,
    profile,
    profileLoading,
    generateIdeas,
    updateIdeaStatus,
    deleteIdea,
    saveProfile,
  };
};

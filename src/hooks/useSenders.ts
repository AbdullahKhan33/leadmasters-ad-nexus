import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface EmailSender {
  id: string;
  user_id: string;
  from_name: string;
  from_email: string;
  domain_id: string | null;
  is_verified: boolean;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export const useSenders = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: senders = [], isLoading, error } = useQuery({
    queryKey: ["email-senders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("email_senders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as EmailSender[];
    },
  });

  const createSender = useMutation({
    mutationFn: async (sender: Omit<EmailSender, "id" | "user_id" | "created_at" | "updated_at">) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("email_senders")
        .insert({
          ...sender,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-senders"] });
      toast({
        title: "Sender added",
        description: "Email sender has been successfully added.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add sender.",
        variant: "destructive",
      });
    },
  });

  const updateSender = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<EmailSender> & { id: string }) => {
      const { data, error } = await supabase
        .from("email_senders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-senders"] });
      toast({
        title: "Sender updated",
        description: "Email sender has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update sender.",
        variant: "destructive",
      });
    },
  });

  const deleteSender = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("email_senders")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-senders"] });
      toast({
        title: "Sender deleted",
        description: "Email sender has been successfully deleted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete sender.",
        variant: "destructive",
      });
    },
  });

  const setDefaultSender = useMutation({
    mutationFn: async (id: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // First, unset all defaults
      await supabase
        .from("email_senders")
        .update({ is_default: false })
        .eq("user_id", user.id);

      // Then set the new default
      const { data, error } = await supabase
        .from("email_senders")
        .update({ is_default: true })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-senders"] });
      toast({
        title: "Default sender updated",
        description: "Default email sender has been set.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to set default sender.",
        variant: "destructive",
      });
    },
  });

  return {
    senders,
    isLoading,
    error,
    createSender: createSender.mutate,
    updateSender: updateSender.mutate,
    deleteSender: deleteSender.mutate,
    setDefaultSender: setDefaultSender.mutate,
    isCreating: createSender.isPending,
    isUpdating: updateSender.isPending,
    isDeleting: deleteSender.isPending,
  };
};

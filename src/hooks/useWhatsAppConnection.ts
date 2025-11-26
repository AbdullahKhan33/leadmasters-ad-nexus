import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppAccount {
  id: string;
  user_id: string;
  business_name: string;
  account_id: string;
  phone_number: string;
  phone_display_name: string;
  is_verified: boolean;
  is_active: boolean;
  connected_at: string;
  metadata: any;
}

export const useWhatsAppConnection = (userId: string | undefined) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: accounts, isLoading } = useQuery({
    queryKey: ["whatsapp-accounts", userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("whatsapp_business_accounts")
        .select("*")
        .eq("user_id", userId)
        .order("connected_at", { ascending: false });

      if (error) throw error;
      return data as WhatsAppAccount[];
    },
    enabled: !!userId,
  });

  const activeAccount = accounts?.find((acc) => acc.is_active);
  const isConnected = (accounts?.length ?? 0) > 0;

  const setActiveAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      if (!userId) throw new Error("User not authenticated");

      // First, set all accounts to inactive
      await supabase
        .from("whatsapp_business_accounts")
        .update({ is_active: false })
        .eq("user_id", userId);

      // Then set the selected one as active
      const { error } = await supabase
        .from("whatsapp_business_accounts")
        .update({ is_active: true })
        .eq("id", accountId)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-accounts", userId] });
      toast({
        title: "Account switched",
        description: "Active WhatsApp account updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to switch account. Please try again.",
        variant: "destructive",
      });
      console.error("Error switching account:", error);
    },
  });

  const disconnectAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const { error } = await supabase
        .from("whatsapp_business_accounts")
        .delete()
        .eq("id", accountId)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-accounts", userId] });
      toast({
        title: "Disconnected",
        description: "WhatsApp account disconnected successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to disconnect account. Please try again.",
        variant: "destructive",
      });
      console.error("Error disconnecting account:", error);
    },
  });

  // Get unique business names
  const businessNames = Array.from(
    new Set(accounts?.map((acc) => acc.business_name) ?? [])
  );

  // Get accounts for a specific business
  const getAccountsByBusiness = (businessName: string) => {
    return accounts?.filter((acc) => acc.business_name === businessName) ?? [];
  };

  return {
    accounts,
    activeAccount,
    isConnected,
    isLoading,
    businessNames,
    getAccountsByBusiness,
    setActiveAccount: setActiveAccountMutation.mutate,
    disconnectAccount: disconnectAccountMutation.mutate,
  };
};

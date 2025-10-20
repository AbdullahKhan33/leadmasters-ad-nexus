import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Domain {
  id: string;
  user_id: string;
  domain_name: string;
  verification_status: string;
  spf_verified: boolean;
  dkim_verified: boolean;
  created_at: string;
  updated_at: string;
  isDummy?: boolean;
}

const DUMMY_DOMAIN: Domain = {
  id: 'dummy-demo-domain',
  user_id: 'dummy',
  domain_name: 'demo.leadmasters.com',
  verification_status: 'verified',
  spf_verified: true,
  dkim_verified: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  isDummy: true,
};

export function useDomains() {
  const queryClient = useQueryClient();

  const { data: domains = [], isLoading, error } = useQuery({
    queryKey: ['email-domains'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('email_domains')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Add dummy domain to the list
      return [DUMMY_DOMAIN, ...(data || [])] as Domain[];
    },
  });

  const createDomain = useMutation({
    mutationFn: async (domainName: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('email_domains')
        .insert([{
          domain_name: domainName,
          user_id: user.id,
          verification_status: 'pending',
          spf_verified: false,
          dkim_verified: false,
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-domains'] });
      toast({
        title: "Domain added",
        description: "Your domain has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add domain",
        variant: "destructive",
      });
    },
  });

  const updateDomainVerification = useMutation({
    mutationFn: async ({ 
      domainId, 
      spfVerified, 
      dkimVerified 
    }: {
      domainId: string;
      spfVerified?: boolean;
      dkimVerified?: boolean;
    }) => {
      const updateData: any = {};
      if (spfVerified !== undefined) updateData.spf_verified = spfVerified;
      if (dkimVerified !== undefined) updateData.dkim_verified = dkimVerified;
      
      if (spfVerified && dkimVerified) {
        updateData.verification_status = 'verified';
      }
      
      const { error } = await supabase
        .from('email_domains')
        .update(updateData)
        .eq('id', domainId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-domains'] });
    },
  });

  const deleteDomain = useMutation({
    mutationFn: async (domainId: string) => {
      const { error } = await supabase
        .from('email_domains')
        .delete()
        .eq('id', domainId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-domains'] });
      toast({
        title: "Domain deleted",
        description: "Your domain has been removed successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete domain",
        variant: "destructive",
      });
    },
  });

  return {
    domains,
    isLoading,
    error,
    createDomain: createDomain.mutateAsync,
    updateDomainVerification: updateDomainVerification.mutateAsync,
    deleteDomain: deleteDomain.mutateAsync,
    isCreating: createDomain.isPending,
    isDeleting: deleteDomain.isPending,
  };
}

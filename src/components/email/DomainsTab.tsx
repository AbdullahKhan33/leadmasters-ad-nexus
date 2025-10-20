import { useState } from "react";
import { Plus, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DomainTile } from "./DomainTile";
import { DomainConfigWizard } from "./DomainConfigWizard";
import { DomainDetailsModal } from "./DomainDetailsModal";
import { useDomains } from "@/hooks/useDomains";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function DomainsTab() {
  const { domains, isLoading, deleteDomain } = useDomains();
  const [showWizard, setShowWizard] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState<string | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedDomainForDetails, setSelectedDomainForDetails] = useState<{
    name: string;
    isVerified: boolean;
  } | null>(null);

  const handleAddDomain = () => {
    setSelectedDomainId(undefined);
    setShowWizard(true);
  };

  const handleConfigure = (domainId: string, domainName: string, verificationStatus: string, isDummy?: boolean) => {
    if (isDummy) {
      // Show details modal for demo domain
      setSelectedDomainForDetails({
        name: domainName,
        isVerified: true,
      });
      setDetailsModalOpen(true);
      return;
    }
    
    // Show details modal for verified domains
    setSelectedDomainForDetails({
      name: domainName,
      isVerified: verificationStatus === 'verified',
    });
    setDetailsModalOpen(true);
  };

  const handleResumeDomain = (domainId: string) => {
    setSelectedDomainId(domainId);
    setShowWizard(true);
  };

  const handleCloseWizard = () => {
    setShowWizard(false);
    setSelectedDomainId(undefined);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading domains...</p>
      </div>
    );
  }

  const realDomains = domains.filter(d => !d.isDummy);
  const showEmptyState = realDomains.length === 0;

  // Show wizard inline if active
  if (showWizard) {
    return (
      <DomainConfigWizard
        domainId={selectedDomainId}
        onComplete={handleCloseWizard}
      />
    );
  }

  // Show domains list
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Email Domains</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your verified sending domains
          </p>
        </div>
        <Button 
          onClick={handleAddDomain}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Domain
        </Button>
      </div>

      {/* Domains List */}
      {showEmptyState ? (
        <Card className="p-12 text-center">
          <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No domains configured yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Add your first sending domain to start sending emails from LeadMasters.
          </p>
          <Button 
            onClick={handleAddDomain}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Domain
          </Button>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {domains.map((domain) => {
              const isVerified = domain.verification_status === 'verified';
              const isPending = domain.verification_status === 'pending';
              
              return (
                <DomainTile
                  key={domain.id}
                  domainId={domain.id}
                  domainName={domain.domain_name}
                  isDummy={domain.isDummy}
                  verificationStatus={domain.verification_status}
                  onConfigure={isVerified ? () => handleConfigure(domain.id, domain.domain_name, domain.verification_status, domain.isDummy) : undefined}
                  onDelete={domain.isDummy ? undefined : () => setDeletingId(domain.id)}
                  onResume={isPending ? () => handleResumeDomain(domain.id) : undefined}
                />
              );
            })}
          </div>

          {/* Domain Details Modal */}
          {selectedDomainForDetails && (
            <DomainDetailsModal
              open={detailsModalOpen}
              onOpenChange={setDetailsModalOpen}
              domainName={selectedDomainForDetails.name}
              isVerified={selectedDomainForDetails.isVerified}
            />
          )}

          {/* Delete Confirmation Dialog */}
          <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete domain?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove the domain and related sender associations.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  if (deletingId) deleteDomain(deletingId);
                  setDeletingId(null);
                }}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

    </div>
  );
}

import { useState } from "react";
import { Plus, Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DomainTile } from "./DomainTile";
import { DomainConfigWizard } from "./DomainConfigWizard";
import { useDomains } from "@/hooks/useDomains";

export function DomainsTab() {
  const { domains, isLoading } = useDomains();
  const [showWizard, setShowWizard] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState<string | undefined>();

  const handleAddDomain = () => {
    setSelectedDomainId(undefined);
    setShowWizard(true);
  };

  const handleConfigure = (domainId: string, isDummy?: boolean) => {
    if (isDummy) {
      // Show info for dummy domain
      return;
    }
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
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={handleCloseWizard}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Domains
        </Button>
        
        <DomainConfigWizard
          domainId={selectedDomainId}
          onComplete={handleCloseWizard}
        />
      </div>
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
        <Button onClick={handleAddDomain}>
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
          <Button onClick={handleAddDomain}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Domain
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {domains.map((domain) => (
            <DomainTile
              key={domain.id}
              domainId={domain.id}
              domainName={domain.domain_name}
              isDummy={domain.isDummy}
              onConfigure={() => handleConfigure(domain.id, domain.isDummy)}
            />
          ))}
        </div>
      )}

    </div>
  );
}

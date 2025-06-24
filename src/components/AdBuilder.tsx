
import { useState } from "react";
import { AdPlatformMenu } from "./AdPlatformMenu";
import { FacebookAdBuilder } from "./FacebookAdBuilder";
import { InstagramAdBuilder } from "./InstagramAdBuilder";
import { GoogleAdBuilder } from "./GoogleAdBuilder";
import { LinkedInAdBuilder } from "./LinkedInAdBuilder";
import { WhatsAppAdBuilder } from "./WhatsAppAdBuilder";

type Platform = 'facebook' | 'instagram' | 'google' | 'linkedin' | 'whatsapp';

export function AdBuilder() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('facebook');

  console.log("AdBuilder rendering, selectedPlatform:", selectedPlatform);

  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatform(platformId as Platform);
  };

  const renderPlatformBuilder = () => {
    switch (selectedPlatform) {
      case 'facebook':
        console.log("Rendering Facebook ad builder");
        return <FacebookAdBuilder />;
      case 'instagram':
        console.log("Rendering Instagram builder");
        return <InstagramAdBuilder />;
      case 'google':
        console.log("Rendering Google builder");
        return <GoogleAdBuilder />;
      case 'linkedin':
        console.log("Rendering LinkedIn builder");
        return <LinkedInAdBuilder />;
      case 'whatsapp':
        console.log("Rendering WhatsApp builder");
        return <WhatsAppAdBuilder />;
      default:
        return <FacebookAdBuilder />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <AdPlatformMenu 
        activePlatform={selectedPlatform} 
        onPlatformChange={handlePlatformChange} 
      />
      {renderPlatformBuilder()}
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSegments } from '@/hooks/useSegments';

interface CampaignConfigurationProps {
  onBack: () => void;
  onSubmit: (data: CampaignData) => void;
}

interface CampaignData {
  campaignName: string;
  selectedAudience: string;
  selectedLists: string[];
}

export function CampaignConfiguration({ onBack, onSubmit }: CampaignConfigurationProps) {
  const [campaignName, setCampaignName] = useState("");
  const [selectedAudience, setSelectedAudience] = useState<string>("all_contacts");
  const [selectedLists, setSelectedLists] = useState<string>("");
  const { toast } = useToast();
  const { segments } = useSegments();
  
  // Create audience options with "All Contacts" plus custom segments
  const audienceOptions = [
    { value: "all_contacts", label: "All Contacts" },
    ...segments.map(segment => ({
      value: segment.id,
      label: segment.name
    }))
  ];

  const lists = [
    { value: "customers", label: "All Customers" },
    { value: "prospects", label: "Prospects" },
    { value: "vip", label: "VIP Customers" },
    { value: "inactive", label: "Inactive Users" },
  ];

  const handleSubmit = () => {
    if (!campaignName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a campaign name",
        variant: "destructive",
      });
      return;
    }

    const campaignData: CampaignData = {
      campaignName: campaignName.trim(),
      selectedAudience: selectedAudience,
      selectedLists: selectedLists ? [selectedLists] : [],
    };

    onSubmit(campaignData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Configure Campaign ✨
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="campaignName" className="text-base font-medium text-gray-900">
              Campaign Name:
            </Label>
            <Input
              id="campaignName"
              placeholder="Enter campaign name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          {/* Select Audience */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              Select Audience:
            </Label>
            <Select value={selectedAudience} onValueChange={setSelectedAudience}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select audience" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {audienceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedAudience !== "all_contacts" && (
              <p className="text-sm text-gray-600">
                Selected segment: {audienceOptions.find(opt => opt.value === selectedAudience)?.label}
              </p>
            )}
          </div>

          {/* Select Lists */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              Select Lists:
            </Label>
            <Select value={selectedLists} onValueChange={setSelectedLists}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select lists" />
              </SelectTrigger>
              <SelectContent>
                {lists.map((list) => (
                  <SelectItem key={list.value} value={list.value}>
                    {list.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-6">
            <Button
              variant="outline"
              onClick={onBack}
              className="px-8 py-2 h-10 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-8 py-2 h-10 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
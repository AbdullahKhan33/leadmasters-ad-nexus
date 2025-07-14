import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CampaignConfigurationProps {
  onBack: () => void;
  onSubmit: (data: CampaignData) => void;
}

interface CampaignData {
  campaignName: string;
  sendToAllContacts: boolean;
  selectedCategories: string[];
  selectedLists: string[];
}

export function CampaignConfiguration({ onBack, onSubmit }: CampaignConfigurationProps) {
  const [campaignName, setCampaignName] = useState("");
  const [sendToAllContacts, setSendToAllContacts] = useState<string>("yes");
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [selectedLists, setSelectedLists] = useState<string>("");
  const { toast } = useToast();

  // Mock data for categories and lists
  const categories = [
    { value: "marketing", label: "Marketing" },
    { value: "transactional", label: "Transactional" },
    { value: "reminder", label: "Reminder" },
    { value: "promotional", label: "Promotional" },
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
      sendToAllContacts: sendToAllContacts === "yes",
      selectedCategories: selectedCategories ? [selectedCategories] : [],
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

          {/* Send to All Contacts */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-900">
              Send to All Contacts:
            </Label>
            <RadioGroup 
              value={sendToAllContacts} 
              onValueChange={setSendToAllContacts}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="text-gray-700 font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="text-gray-700 font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Select Categories */}
          <div className="space-y-2">
            <Label className="text-base font-medium text-gray-900">
              Select Categories:
            </Label>
            <Select value={selectedCategories} onValueChange={setSelectedCategories}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
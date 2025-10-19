import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Edit, Trash2, CheckCircle } from "lucide-react";
import { usePostIdeas } from "@/hooks/usePostIdeas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const businessTypes = [
  "E-commerce Store",
  "Service-based Business",
  "B2B Company",
  "Restaurant/Cafe",
  "Fitness/Wellness",
  "Education/Training",
  "Real Estate",
  "Healthcare",
  "Agency/Consulting",
  "Non-profit",
  "Other",
];

const goalOptions = [
  "Brand Awareness",
  "Lead Generation",
  "Community Building",
  "Product Promotion",
  "Education/Tips",
  "Customer Engagement",
  "Event Promotion",
];

const brandVoices = [
  { id: "professional", label: "🎯 Professional" },
  { id: "casual", label: "💬 Casual & Friendly" },
  { id: "authoritative", label: "👔 Formal & Authoritative" },
  { id: "inspirational", label: "🌟 Inspirational" },
];

export const ProfileTab = () => {
  const { profile, profileLoading, saveProfile } = usePostIdeas();
  const [isEditing, setIsEditing] = useState(!profile);
  const [businessType, setBusinessType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [primaryGoals, setPrimaryGoals] = useState<string[]>([]);
  const [brandVoice, setBrandVoice] = useState<
    "casual" | "professional" | "friendly" | "authoritative" | "inspirational"
  >("professional");

  useEffect(() => {
    if (profile) {
      setBusinessType(profile.business_type);
      setTargetAudience(profile.target_audience);
      setPrimaryGoals(profile.primary_goals);
      setBrandVoice(profile.brand_voice);
      setIsEditing(false);
    }
  }, [profile]);

  const handleGoalToggle = (goal: string) => {
    setPrimaryGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleSave = async () => {
    await saveProfile.mutateAsync({
      business_type: businessType,
      target_audience: targetAudience,
      primary_goals: primaryGoals,
      brand_voice: brandVoice,
    });
    setIsEditing(false);
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (profile && !isEditing) {
    return (
      <div className="space-y-4">
        {/* Profile Display Card */}
        <Card className="border border-gray-200 shadow-md bg-white rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-gray-100 pb-3 pt-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <User className="w-5 h-5 text-purple-600" />
              Business Profile
            </CardTitle>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <div>
              <Label className="text-muted-foreground text-sm">Business Type</Label>
              <p className="text-base font-medium">{profile.business_type}</p>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm">Target Audience</Label>
              <p className="text-sm">{profile.target_audience}</p>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm">Primary Goals</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.primary_goals.map((goal) => (
                  <Badge key={goal} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground text-sm">Brand Voice</Label>
              <p className="text-base font-medium capitalize">{profile.brand_voice}</p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="border border-purple-200 bg-purple-50/50 shadow-md rounded-xl">
          <CardHeader className="pb-3 pt-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              Why save a profile?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Generate ideas faster</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">Consistent brand voice</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">No repeated input</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Profile Form */}
      <Card className="border border-gray-200 shadow-md bg-white rounded-xl">
        <CardHeader className="border-b border-gray-100 pb-3 pt-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            {profile ? "Edit Business Profile" : "Create Business Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-4">
          <div className="space-y-1.5">
            <Label htmlFor="business-type" className="text-sm font-medium">Business Type</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger id="business-type">
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="target-audience" className="text-sm font-medium">Target Audience</Label>
            <Textarea
              id="target-audience"
              placeholder="Describe your ideal customer (age, interests, pain points)..."
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              maxLength={200}
              rows={2}
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {targetAudience.length}/200 characters
            </p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Primary Goals</Label>
            <div className="grid grid-cols-2 gap-2">
              {goalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={`profile-${goal}`}
                    checked={primaryGoals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <label
                    htmlFor={`profile-${goal}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Brand Voice</Label>
            <RadioGroup
              value={brandVoice}
              onValueChange={(value: any) => setBrandVoice(value)}
            >
              <div className="space-y-2">
                {brandVoices.map((voice) => (
                  <div key={voice.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={voice.id} id={`voice-${voice.id}`} />
                    <label
                      htmlFor={`voice-${voice.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {voice.label}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSave}
              disabled={
                !businessType ||
                !targetAudience ||
                primaryGoals.length === 0 ||
                saveProfile.isPending
              }
              className="flex-1 h-11 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl font-semibold rounded-xl transition-all text-sm"
            >
              {saveProfile.isPending ? "Saving..." : "Save Profile"}
            </Button>
            {profile && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={saveProfile.isPending}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card className="border border-purple-200 bg-purple-50/50 shadow-md rounded-xl">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-purple-600">Pro Tip:</span> Save your business info for quick generation. You can load this
              profile in the Generate tab to skip filling out the form each time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

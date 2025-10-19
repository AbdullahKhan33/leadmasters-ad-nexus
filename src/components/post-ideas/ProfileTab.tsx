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
      <div className="space-y-6">
        {/* Profile Display Card */}
        <Card className="border-2 border-primary/20 hover:border-primary/30 transition-all shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-b-2 border-primary/20">
            <CardTitle className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              <User className="w-6 h-6 text-purple-600" />
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
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Business Type</Label>
              <p className="text-lg font-medium">{profile.business_type}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Target Audience</Label>
              <p className="text-sm">{profile.target_audience}</p>
            </div>

            <div>
              <Label className="text-muted-foreground">Primary Goals</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.primary_goals.map((goal) => (
                  <Badge key={goal} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-muted-foreground">Brand Voice</Label>
              <p className="text-lg font-medium capitalize">{profile.brand_voice}</p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-b-2 border-primary/20">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              💡 Why save a profile?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
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
    <div className="space-y-6">
      {/* Profile Form */}
      <Card className="border-2 border-primary/20 hover:border-primary/30 transition-all shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-b-2 border-primary/20">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {profile ? "✏️ Edit Business Profile" : "🎯 Create Business Profile"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-type">Business Type</Label>
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

          <div className="space-y-2">
            <Label htmlFor="target-audience">Target Audience</Label>
            <Textarea
              id="target-audience"
              placeholder="Describe your ideal customer (age, interests, pain points)..."
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              {targetAudience.length}/200 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label>Primary Goals</Label>
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

          <div className="space-y-2">
            <Label>Brand Voice</Label>
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

          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              disabled={
                !businessType ||
                !targetAudience ||
                primaryGoals.length === 0 ||
                saveProfile.isPending
              }
              className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all font-bold"
            >
              {saveProfile.isPending ? "Saving..." : "💾 Save Profile"}
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
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 shadow-xl">
        <CardContent className="pt-6">
          <p className="text-base font-medium text-gray-700">
            💡 <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Pro Tip:</span> Save your business info for quick generation. You can load this
            profile in the Generate tab to skip filling out the form each time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

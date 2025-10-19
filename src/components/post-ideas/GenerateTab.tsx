import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Loader2 } from "lucide-react";
import { usePostIdeas, GenerateIdeasParams } from "@/hooks/usePostIdeas";
import { IdeaCard } from "./IdeaCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

const platforms = [
  { id: "facebook", label: "Facebook", icon: "📘" },
  { id: "instagram", label: "Instagram", icon: "📷" },
  { id: "linkedin", label: "LinkedIn", icon: "💼" },
  { id: "twitter", label: "Twitter/X", icon: "🐦" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
];

const brandVoices = [
  { id: "professional", label: "🎯 Professional" },
  { id: "casual", label: "💬 Casual & Friendly" },
  { id: "authoritative", label: "👔 Formal & Authoritative" },
  { id: "inspirational", label: "🌟 Inspirational" },
];

export const GenerateTab = () => {
  const { profile, generateIdeas, deleteIdea, updateIdeaStatus } = usePostIdeas();
  const [businessType, setBusinessType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [platform, setPlatform] = useState("");
  const [brandVoice, setBrandVoice] = useState("professional");
  const [numberOfIdeas, setNumberOfIdeas] = useState(5);
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const loadProfile = () => {
    if (profile) {
      setBusinessType(profile.business_type);
      setTargetAudience(profile.target_audience);
      setGoals(profile.primary_goals);
      setBrandVoice(profile.brand_voice);
    }
  };

  const handleGoalToggle = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleGenerate = async () => {
    const params: GenerateIdeasParams = {
      businessType,
      targetAudience,
      goals,
      platform,
      brandVoice,
      numberOfIdeas,
    };

    const result = await generateIdeas.mutateAsync(params);
    if (result) {
      setGeneratedIdeas(result);
    }
  };

  const canGenerate =
    businessType && targetAudience && goals.length > 0 && platform;

  return (
    <div className="space-y-5">
      {/* Business Context Section */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-purple-600">✨</span>
            Business Context
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-type">Business Type</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger id="business-type" className="border-2 hover:border-primary/50 transition-colors">
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
            {businessType === "Other" && (
              <Textarea
                placeholder="Please specify your business type..."
                value={businessType === "Other" ? "" : businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="mt-2 border-2 focus:border-primary"
                rows={2}
              />
            )}
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
            <Label>Goals</Label>
            <div className="grid grid-cols-2 gap-2">
              {goalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={goals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <label
                    htmlFor={goal}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {profile && (
            <Button variant="outline" onClick={loadProfile} className="w-full">
              Load Saved Profile
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Platform Selection */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="border-b border-gray-100 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-purple-600">📱</span>
            Platform Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={platform} onValueChange={setPlatform}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {platforms.map((p) => (
                <div key={p.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={p.id} id={p.id} />
                  <label
                    htmlFor={p.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {p.icon} {p.label}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between hover:bg-gray-50 p-0">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <span className="text-purple-600">⚙️</span>
                  Advanced Options
                </CardTitle>
                <span className="text-gray-400">{showAdvanced ? "▲" : "▼"}</span>
              </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Brand Voice</Label>
                <RadioGroup value={brandVoice} onValueChange={setBrandVoice}>
                  <div className="space-y-2">
                    {brandVoices.map((voice) => (
                      <div key={voice.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={voice.id} id={voice.id} />
                        <label
                          htmlFor={voice.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {voice.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="num-ideas">
                  Number of Ideas: {numberOfIdeas}
                </Label>
                <input
                  id="num-ideas"
                  type="range"
                  min="3"
                  max="10"
                  value={numberOfIdeas}
                  onChange={(e) => setNumberOfIdeas(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Generate Button */}
      <Button
        size="lg"
        className="w-full h-12 font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 shadow-md hover:shadow-lg transition-all"
        onClick={handleGenerate}
        disabled={!canGenerate || generateIdeas.isPending}
      >
        {generateIdeas.isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Ideas...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Post Ideas with AI
          </>
        )}
      </Button>

      {/* Results Display */}
      {generatedIdeas.length > 0 && (
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Generated Ideas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                idea={idea}
                onDelete={(id) => deleteIdea.mutate(id)}
                onStatusChange={(id, status) =>
                  updateIdeaStatus.mutate({ id, status })
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateTab } from "./post-ideas/GenerateTab";
import { MyIdeasTab } from "./post-ideas/MyIdeasTab";
import { ProfileTab } from "./post-ideas/ProfileTab";
import { Sparkles, History, User } from "lucide-react";

export const PostIdeaGenerator = () => {
  const [currentTab, setCurrentTab] = useState("generate");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          AI Post Idea Generator
        </h1>
        <p className="text-muted-foreground">
          Generate engaging post ideas tailored to your business and audience
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate Ideas
          </TabsTrigger>
          <TabsTrigger value="my-ideas" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            My Generated Ideas
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Business Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-6">
          <GenerateTab />
        </TabsContent>

        <TabsContent value="my-ideas" className="mt-6">
          <MyIdeasTab />
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <ProfileTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

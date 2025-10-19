import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateTab } from "./post-ideas/GenerateTab";
import { MyIdeasTab } from "./post-ideas/MyIdeasTab";
import { ProfileTab } from "./post-ideas/ProfileTab";
import { Sparkles, History, User } from "lucide-react";

export const PostIdeaGenerator = () => {
  const [currentTab, setCurrentTab] = useState("generate");

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent" />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            AI Post Idea Generator
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate engaging post ideas tailored to your business and audience with the power of AI ✨
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-3 h-14 bg-gradient-to-r from-blue-50/80 via-purple-50/80 to-pink-50/80 border-2 shadow-lg">
          <TabsTrigger 
            value="generate" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Generate Ideas
          </TabsTrigger>
          <TabsTrigger 
            value="my-ideas" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white font-semibold transition-all"
          >
            <History className="w-4 h-4" />
            My Generated Ideas
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white font-semibold transition-all"
          >
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

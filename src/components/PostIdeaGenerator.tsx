import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateTab } from "./post-ideas/GenerateTab";
import { MyIdeasTab } from "./post-ideas/MyIdeasTab";
import { ProfileTab } from "./post-ideas/ProfileTab";
import { Sparkles, History, User } from "lucide-react";

export const PostIdeaGenerator = () => {
  const [currentTab, setCurrentTab] = useState("generate");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto py-8 space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-purple-600" />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              AI Post Idea Generator
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate engaging post ideas tailored to your business and audience with the power of AI ✨
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-16 bg-white/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl rounded-xl p-2">
            <TabsTrigger 
              value="generate" 
              className="flex items-center justify-center gap-2 rounded-lg text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold transition-all hover:bg-gray-100 data-[state=inactive]:text-gray-700"
            >
              <Sparkles className="w-5 h-5" />
              Generate Ideas
            </TabsTrigger>
            <TabsTrigger 
              value="my-ideas" 
              className="flex items-center justify-center gap-2 rounded-lg text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold transition-all hover:bg-gray-100 data-[state=inactive]:text-gray-700"
            >
              <History className="w-5 h-5" />
              My Generated Ideas
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center justify-center gap-2 rounded-lg text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold transition-all hover:bg-gray-100 data-[state=inactive]:text-gray-700"
            >
              <User className="w-5 h-5" />
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
    </div>
  );
};

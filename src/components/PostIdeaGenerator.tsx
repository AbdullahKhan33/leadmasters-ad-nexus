import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateTab } from "./post-ideas/GenerateTab";
import { MyIdeasTab } from "./post-ideas/MyIdeasTab";
import { ProfileTab } from "./post-ideas/ProfileTab";
import { Sparkles, History, User } from "lucide-react";

export const PostIdeaGenerator = () => {
  const [currentTab, setCurrentTab] = useState("generate");

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-gray-900">
            <Sparkles className="w-8 h-8 text-purple-600" />
            AI Post Idea Generator
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Generate engaging post ideas tailored to your business and audience
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <TabsTrigger 
              value="generate" 
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Generate Ideas</span>
              <span className="sm:hidden">Generate</span>
            </TabsTrigger>
            <TabsTrigger 
              value="my-ideas" 
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50 text-sm"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">My Generated Ideas</span>
              <span className="sm:hidden">My Ideas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-md font-medium transition-all data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-50 text-sm"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Business Profile</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-4">
            <GenerateTab />
          </TabsContent>

          <TabsContent value="my-ideas" className="mt-4">
            <MyIdeasTab />
          </TabsContent>

          <TabsContent value="profile" className="mt-4">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

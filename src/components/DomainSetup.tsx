import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SendersTab } from "./email/SendersTab";
import { DomainsTab } from "./email/DomainsTab";

export function DomainSetup() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Email Infrastructure
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your email senders and domain setup
          </p>
        </div>

        <Tabs defaultValue="senders" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            <TabsTrigger 
              value="senders"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Senders
            </TabsTrigger>
            <TabsTrigger 
              value="domains"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              Domains
            </TabsTrigger>
          </TabsList>

          <TabsContent value="senders">
            <SendersTab />
          </TabsContent>

          <TabsContent value="domains" className="space-y-6">
            <DomainsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

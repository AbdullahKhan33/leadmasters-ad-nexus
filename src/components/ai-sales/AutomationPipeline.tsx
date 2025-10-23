import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadCard } from "./LeadCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const stageConfig = {
  newLeads: {
    title: "New Leads",
    gradient: "from-blue-500 to-blue-600",
    count: 5
  },
  noReply: {
    title: "No Reply",
    gradient: "from-orange-500 to-orange-600",
    count: 3
  },
  qualified: {
    title: "Qualified",
    gradient: "from-purple-500 to-purple-600",
    count: 2
  },
  nurturing: {
    title: "Nurturing",
    gradient: "from-green-500 to-green-600",
    count: 3
  },
  longTerm: {
    title: "Long-Term",
    gradient: "from-gray-500 to-gray-600",
    count: 1
  },
  won: {
    title: "Won",
    gradient: "from-emerald-500 to-emerald-600",
    count: 1
  }
};

const dummyLeads = {
  newLeads: [
    { name: "Rajesh Kumar", source: "99acres", time: "2 mins ago", detail: "AI analyzing signals..." },
    { name: "Priya Sharma", source: "Meta Lead", time: "15 mins ago", detail: "High intent signals detected" },
    { name: "Amit Patel", source: "MagicBricks", time: "1 hour ago", detail: "Budget mentioned: ₹50L" },
    { name: "Sneha Reddy", source: "Custom API", time: "3 hours ago", detail: "Timeline: Urgent" },
    { name: "Vikram Singh", source: "99acres", time: "5 hours ago", detail: "Location: Bangalore" }
  ],
  noReply: [
    { name: "Arjun Mehta", source: "99acres", time: "48h ago", detail: "Reminder 2/3 • Next: Tomorrow" },
    { name: "Kavita Joshi", source: "Meta Lead", time: "24h ago", detail: "Reminder 1/3 • Next: In 22h" },
    { name: "Ravi Kumar", source: "MagicBricks", time: "72h ago", detail: "Reminder 3/3 • Final attempt" }
  ],
  qualified: [
    { name: "Neha Gupta", source: "99acres", time: "1 day ago", detail: "Budget: ₹75L • Unassigned", aiScore: 0.92 },
    { name: "Suresh Iyer", source: "Meta Lead", time: "2 days ago", detail: "Timeline: 2 months • Agent #3", aiScore: 0.78 }
  ],
  nurturing: [
    { name: "Pooja Desai", source: "MagicBricks", time: "Day 3/7", detail: "Opened: 2/3 msgs • Engagement: High" },
    { name: "Karthik Menon", source: "99acres", time: "Day 5/7", detail: "Opened: 4/5 msgs • Engagement: Medium" },
    { name: "Deepa Shah", source: "Custom API", time: "Day 1/7", detail: "Sent: 1h ago • Status: Delivered" }
  ],
  longTerm: [
    { name: "Manish Agarwal", source: "Meta Lead", time: "12 days ago", detail: "Next contact: 3 days • Interest: Low" }
  ],
  won: [
    { name: "Anita Rao", source: "Meta Lead", time: "2 days ago", detail: "Deal: ₹1.2Cr • Converted!" }
  ]
};

export function AutomationPipeline() {
  return (
    <div className="space-y-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {Object.entries(stageConfig).map(([key, config]) => (
            <div key={key} className="flex-shrink-0 w-80">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${config.gradient}`} />
                      {config.title}
                    </CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`bg-gradient-to-r ${config.gradient} text-white border-0`}
                    >
                      {config.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-3">
                      {dummyLeads[key as keyof typeof dummyLeads].map((lead, idx) => (
                        <LeadCard key={idx} {...lead} />
                      ))}
                    </div>
                  </ScrollArea>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50"
                  >
                    View All ({config.count})
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

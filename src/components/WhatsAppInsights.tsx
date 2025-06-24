
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Clock, 
  Send,
  Eye,
  Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";

const messageActivityData = [
  { date: 'Jan 1', sent: 12, received: 18, responded: 15 },
  { date: 'Jan 8', sent: 18, received: 24, responded: 20 },
  { date: 'Jan 15', sent: 24, received: 32, responded: 28 },
  { date: 'Jan 22', sent: 21, received: 28, responded: 24 },
  { date: 'Jan 29', sent: 28, received: 35, responded: 31 }
];

const responseTimeData = [
  { time: '<1min', count: 45 },
  { time: '1-5min', count: 32 },
  { time: '5-15min', count: 18 },
  { time: '15-60min', count: 8 },
  { time: '>1hr', count: 5 }
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export function WhatsAppInsights() {
  const [searchParams] = useSearchParams();
  const messageActivityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'messageActivity' && messageActivityRef.current) {
      messageActivityRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span>WhatsApp Insights</span>
              </h1>
              <p className="text-gray-600 mt-2">Track your WhatsApp business performance and customer interactions</p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                WhatsApp Connected
              </Badge>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 Days
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Messages Sent</p>
                  <p className="text-3xl font-bold text-gray-900">103</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Messages Received</p>
                  <p className="text-3xl font-bold text-gray-900">137</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +22% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Contacts</p>
                  <p className="text-3xl font-bold text-gray-900">89</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
                  <p className="text-3xl font-bold text-gray-900">2.4m</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    -30% vs last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Activity Chart */}
        <Card className="hover:shadow-md transition-shadow duration-200" ref={messageActivityRef}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span>WhatsApp Message Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={messageActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#10b981" strokeWidth={3} name="Messages Sent" />
                <Line type="monotone" dataKey="received" stroke="#3b82f6" strokeWidth={3} name="Messages Received" />
                <Line type="monotone" dataKey="responded" stroke="#f59e0b" strokeWidth={3} name="Responses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span>Response Time Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={responseTimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {responseTimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>Top Performing Conversations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ahmed Hassan</p>
                      <p className="text-sm text-gray-500">Product inquiry → Purchase</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Converted</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Fatima Al Zahra</p>
                      <p className="text-sm text-gray-500">Support request → Resolved</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Resolved</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mohammed Ali</p>
                      <p className="text-sm text-gray-500">Demo request → Meeting scheduled</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">In Progress</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-16 bg-green-600 hover:bg-green-700 text-white">
                <MessageSquare className="w-5 h-5 mr-2" />
                Open WhatsApp CRM
              </Button>
              <Button variant="outline" className="h-16">
                <Eye className="w-5 h-5 mr-2" />
                View All Conversations
              </Button>
              <Button variant="outline" className="h-16">
                <Users className="w-5 h-5 mr-2" />
                Manage Contacts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

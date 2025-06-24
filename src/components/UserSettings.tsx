
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  CreditCard, 
  Shield, 
  LogOut, 
  Upload,
  Settings,
  Bell,
  Key,
  History
} from "lucide-react";

export function UserSettings() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@company.com");

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        {/* Profile Settings */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <User className="w-5 h-5 text-purple-600" />
              <span>My Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 text-xl font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-gray-500">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300 focus:border-purple-400 focus:ring-purple-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-purple-400 focus:ring-purple-500/20"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Change Password</Label>
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Current password"
                  className="border-gray-300 focus:border-purple-400 focus:ring-purple-500/20"
                />
                <Input
                  type="password"
                  placeholder="New password"
                  className="border-gray-300 focus:border-purple-400 focus:ring-purple-500/20"
                />
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className="border-gray-300 focus:border-purple-400 focus:ring-purple-500/20"
                />
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Subscription & Billing */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span>Subscription & Billing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Current Plan</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    Professional
                  </Badge>
                  <span className="text-sm text-gray-500">$29/month</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white">
                Upgrade Plan
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Usage this month</span>
                  <span className="text-gray-900">142 / 500 posts</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Payment Methods</h4>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                  <div>
                    <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full text-purple-600 border-purple-200 hover:bg-purple-50">
              View Billing History
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <Shield className="w-5 h-5 text-purple-600" />
              <span>Security & Privacy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
              </div>
              <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-500 mt-1">Receive updates about your account activity</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50">
                <Key className="w-4 h-4 mr-3" />
                Manage API Keys
              </Button>
              <Button variant="outline" className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50">
                <History className="w-4 h-4 mr-3" />
                Login History
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border border-red-200 shadow-sm bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <LogOut className="w-5 h-5 text-red-600" />
              <span>Account Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
            
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-semibold text-red-800 mb-2">Delete Account</h3>
              <p className="text-sm text-red-600 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

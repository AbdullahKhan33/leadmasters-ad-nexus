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
  History,
  Sparkles,
  Crown,
  Lock,
  MessageCircle
} from "lucide-react";
import { usePremium } from "@/contexts/PremiumContext";
import { PremiumUpgradeModal } from "@/components/premium/PremiumUpgradeModal";

export function UserSettings() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@company.com");
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: "" });
  const [chatbotEnabled, setChatbotEnabled] = useState(() => {
    return localStorage.getItem('chatbot-disabled') !== 'true';
  });
  
  const { isPremium, setIsPremium, premiumFeatures, togglePremiumFeature } = usePremium();

  const handleUpgrade = () => {
    // Simulate successful upgrade - in a real app this would be handled by payment processing
    setIsPremium(true);
    setUpgradeModal({ isOpen: false, feature: "" });
    console.log("Premium upgrade successful - isPremium set to true");
  };

  const handleChatbotToggle = (enabled: boolean) => {
    setChatbotEnabled(enabled);
    localStorage.setItem('chatbot-disabled', (!enabled).toString());
    
    // Trigger the global chatbot functions
    if (enabled) {
      (window as any).enableChatbot?.();
    } else {
      (window as any).disableChatbot?.();
    }
  };

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

        {/* Interface & Support Preferences */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <span>Interface & Support</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">AI Support Chatbot</Label>
                <p className="text-sm text-gray-500 mt-1">Show the floating chatbot assistant on all pages</p>
              </div>
              <Switch checked={chatbotEnabled} onCheckedChange={handleChatbotToggle} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-500 mt-1">Receive updates about your account activity</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Premium Features */}
        <Card className={`border shadow-sm hover:shadow-md transition-all duration-300 bg-white ${
          isPremium ? 'border-purple-200 bg-gradient-to-r from-purple-50/50 to-pink-50/50' : 'border-gray-200'
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              {isPremium ? <Crown className="w-5 h-5 text-purple-600" /> : <Sparkles className="w-5 h-5 text-purple-600" />}
              <span>Premium Features</span>
              {isPremium && (
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-500 text-white ml-2">
                  Active
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {!isPremium && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-purple-900 mb-1">Upgrade to Premium</h3>
                    <p className="text-sm text-purple-700">Unlock AI-powered features to supercharge your CRM</p>
                  </div>
                  <Button
                    onClick={() => setUpgradeModal({ isOpen: true, feature: "Premium Features" })}
                    className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Label className="text-base font-medium">AI Lead Scoring</Label>
                    {!isPremium && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-600">Automatically score and prioritize your leads</p>
                </div>
                <Switch 
                  checked={isPremium && premiumFeatures.aiLeadScoring} 
                  onCheckedChange={() => isPremium && togglePremiumFeature('aiLeadScoring')}
                  disabled={!isPremium}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Label className="text-base font-medium">AI Suggested Templates</Label>
                    {!isPremium && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-600">Get smart template recommendations for better responses</p>
                </div>
                <Switch 
                  checked={isPremium && premiumFeatures.aiSuggestedTemplates} 
                  onCheckedChange={() => isPremium && togglePremiumFeature('aiSuggestedTemplates')}
                  disabled={!isPremium}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Label className="text-base font-medium">Smart WhatsApp Drips</Label>
                    {!isPremium && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-600">Automated follow-up sequences powered by AI</p>
                </div>
                <Switch 
                  checked={isPremium && premiumFeatures.smartWhatsAppDrips} 
                  onCheckedChange={() => isPremium && togglePremiumFeature('smartWhatsAppDrips')}
                  disabled={!isPremium}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Label className="text-base font-medium">Post-Sale Review Flows</Label>
                    {!isPremium && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <p className="text-sm text-gray-600">Automated review collection and customer feedback</p>
                </div>
                <Switch 
                  checked={isPremium && premiumFeatures.postSaleReviewFlows} 
                  onCheckedChange={() => isPremium && togglePremiumFeature('postSaleReviewFlows')}
                  disabled={!isPremium}
                />
              </div>
            </div>

            {isPremium && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Premium Plan Active</span>
                </div>
                <p className="text-sm text-green-700">All AI features are available and can be toggled on/off as needed.</p>
              </div>
            )}
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
                  <Badge className={isPremium 
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                  }>
                    {isPremium ? 'Premium' : 'Free'}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {isPremium ? '$29/month' : '$0/month'}
                  </span>
                </div>
              </div>
              {!isPremium && (
                <Button 
                  onClick={() => setUpgradeModal({ isOpen: true, feature: "Premium Plan" })}
                  className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white"
                >
                  Upgrade Plan
                </Button>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Usage this month</span>
                  <span className="text-gray-900">142 / {isPremium ? '∞' : '100'} AI actions</span>
                </div>
                <Progress value={isPremium ? 28 : 70} className="h-2" />
              </div>
            </div>
            
            {isPremium && (
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
            )}
            
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

        <PremiumUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal({ isOpen: false, feature: "" })}
          feature={upgradeModal.feature}
          onUpgrade={handleUpgrade}
        />
      </div>
    </div>
  );
}

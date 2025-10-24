
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TableProperties,
  Megaphone,
  UserPlus
} from "lucide-react";
import { CRMTableView } from "./crm/CRMTableView";
import { CSVImportModal } from "./crm/CSVImportModal";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { PremiumUpgradeModal } from "./premium/PremiumUpgradeModal";
import { SegmentManager } from "./segments/SegmentManager";
import { CampaignDashboard } from "./campaigns/CampaignDashboard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function CRM() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [upgradeModal, setUpgradeModal] = useState({ isOpen: false, feature: "" });
  const [csvImportModal, setCsvImportModal] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  // Handle navigation from other views
  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const handleTabChange = (value: string) => {
    console.log("CRM tab change:", value);
    setActiveTab(value);
  };

  const handleUpgrade = () => {
    console.log("CRM upgrade button clicked");
    // Here you would integrate with your payment system
    console.log("Upgrading to premium...");
    setUpgradeModal({ isOpen: false, feature: "" });
  };

  const handleImportComplete = () => {
    console.log("CRM import complete");
    // Refresh the data when import is complete
    window.location.reload();
  };

  const handleImportClick = () => {
    console.log("CRM import button clicked");
    setCsvImportModal(true);
  };

  const handleSeedContacts = async () => {
    try {
      setIsSeeding(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Not authenticated",
          variant: "destructive",
        });
        return;
      }

      // Sample contacts data
      const sampleContacts = [
        { name: "Rajesh Kumar", phone: "+919876543210", email: "rajesh.kumar@email.com", source: "WhatsApp", status: "New", last_message: "Interested in 2BHK apartment" },
        { name: "Priya Sharma", phone: "+919876543211", email: "priya.sharma@email.com", source: "Facebook", status: "Active", last_message: "Looking for career switch to data science" },
        { name: "Ahmed Al-Mansouri", phone: "+971501234567", email: "ahmed.almansouri@email.com", source: "LinkedIn", status: "Qualified", last_message: "Interested in luxury villa in Dubai" },
        { name: "Fatima Hassan", phone: "+971501234568", email: "fatima.hassan@email.com", source: "Instagram", status: "New", last_message: "Looking for professional upskilling courses" },
        { name: "Mohammed Khan", phone: "+919876543212", email: "mohammed.khan@email.com", source: "WhatsApp", status: "Active", last_message: "Need property in Mumbai under 1Cr" },
        { name: "Sara Abdullah", phone: "+974444123456", email: "sara.abdullah@email.com", source: "Website", status: "New", last_message: "Interested in executive MBA program" },
        { name: "Vijay Singh", phone: "+919876543213", email: "vijay.singh@email.com", source: "Referral", status: "Qualified", last_message: "First time home buyer in Pune" },
        { name: "Aisha Mohammed", phone: "+966501234567", email: "aisha.mohammed@email.com", source: "Facebook", status: "Active", last_message: "Career transition to tech - programming course" },
        { name: "John David", phone: "+971501234569", email: "john.david@email.com", source: "LinkedIn", status: "New", last_message: "Looking for 3BHK in Dubai Marina" },
        { name: "Sneha Patel", phone: "+919876543214", email: "sneha.patel@email.com", source: "Instagram", status: "Active", last_message: "Interested in digital marketing bootcamp" },
        { name: "Omar Khalifa", phone: "+974444123457", email: "omar.khalifa@email.com", source: "WhatsApp", status: "Qualified", last_message: "Investment property in Doha" },
        { name: "Ravi Mehta", phone: "+919876543215", email: "ravi.mehta@email.com", source: "Website", status: "New", last_message: "Looking for studio apartment in Bangalore" },
        { name: "Layla Ahmed", phone: "+966501234568", email: "layla.ahmed@email.com", source: "Facebook", status: "Active", last_message: "Business management certification" },
        { name: "Amit Desai", phone: "+919876543216", email: "amit.desai@email.com", source: "Referral", status: "Qualified", last_message: "Villa in Tier-2 city under 75L" },
        { name: "Noor Al-Thani", phone: "+974444123458", email: "noor.althani@email.com", source: "LinkedIn", status: "New", last_message: "Executive education program in Qatar" },
        { name: "Kavita Reddy", phone: "+919876543217", email: "kavita.reddy@email.com", source: "Instagram", status: "Active", last_message: "IELTS test preparation course" },
        { name: "Khalid Rashed", phone: "+971501234570", email: "khalid.rashed@email.com", source: "WhatsApp", status: "Qualified", last_message: "Ready-to-move apartment in Sharjah" },
        { name: "Ananya Gupta", phone: "+919876543218", email: "ananya.gupta@email.com", source: "Website", status: "New", last_message: "Career switcher - data science bootcamp" },
        { name: "Abdullah Bin Saleh", phone: "+966501234569", email: "abdullah.saleh@email.com", source: "Facebook", status: "Active", last_message: "Vision 2030 property investment in Riyadh" },
        { name: "Meera Krishnan", phone: "+919876543219", email: "meera.krishnan@email.com", source: "Referral", status: "Qualified", last_message: "Professional upskilling - MBA program" },
        { name: "Hassan Ibrahim", phone: "+974444123459", email: "hassan.ibrahim@email.com", source: "LinkedIn", status: "New", last_message: "Luxury villa in Doha compound" },
        { name: "Deepak Kumar", phone: "+919876543220", email: "deepak.kumar@email.com", source: "Instagram", status: "Active", last_message: "Plot for construction in Jaipur" },
        { name: "Yasmin Farouk", phone: "+971501234571", email: "yasmin.farouk@email.com", source: "WhatsApp", status: "Qualified", last_message: "Arabic language learning course" },
        { name: "Rohan Sharma", phone: "+919876543221", email: "rohan.sharma@email.com", source: "Website", status: "New", last_message: "Investment property NRI" },
        { name: "Mariam Salem", phone: "+966501234570", email: "mariam.salem@email.com", source: "Facebook", status: "Active", last_message: "Women career development program" },
      ];

      // Insert contacts with user_id
      const contactsToInsert = sampleContacts.map(contact => ({
        ...contact,
        user_id: user.id,
      }));

      const { error } = await supabase
        .from('leads')
        .insert(contactsToInsert);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${sampleContacts.length} sample contacts added successfully`,
      });

      // Reload to refresh the table
      window.location.reload();
    } catch (error: any) {
      console.error('Error seeding contacts:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to seed contacts",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <PremiumProvider>
      <div className="h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/60 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                LeadMasters CRM
              </h1>
              <p className="text-gray-600 text-sm font-medium">WhatsApp Lead Management</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="shadow-sm hover:shadow-md transition-all duration-200 border-gray-200/80 hover:border-green-200 hover:bg-gradient-to-r hover:from-green-50/50 hover:to-green-50/50 hover:text-green-700"
                onClick={handleSeedContacts}
                disabled={isSeeding}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {isSeeding ? 'Seeding...' : 'Seed Sample Contacts'}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="shadow-sm hover:shadow-md transition-all duration-200 border-gray-200/80 hover:border-purple-200 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-purple-50/50 hover:text-purple-700"
                onClick={handleImportClick}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
                Import from Apollo
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 px-6 shadow-sm">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-50/80 via-blue-50/40 to-purple-50/40 rounded-xl p-1.5 shadow-inner border border-gray-200/30">
              <TabsTrigger 
                value="campaigns" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <Megaphone className="w-4 h-4" />
                <span>Campaigns</span>
              </TabsTrigger>
              <TabsTrigger 
                value="table" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <TableProperties className="w-4 h-4" />
                <span>Contacts</span>
              </TabsTrigger>
              <TabsTrigger 
                value="segments" 
                className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:via-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gradient-to-r hover:from-blue-50/60 hover:via-purple-50/60 hover:to-pink-50/60 hover:shadow-sm hover:text-purple-700 transition-all duration-200 rounded-lg font-semibold"
              >
                <Users className="w-4 h-4" />
                <span>Segments</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="campaigns" className="h-full m-0">
              <CampaignDashboard />
            </TabsContent>
            <TabsContent value="table" className="h-full m-0">
              <CRMTableView 
                highlightLeadId={location.state?.highlightLeadId}
                onUpgradeClick={(feature) => setUpgradeModal({ isOpen: true, feature })} 
                onImportClick={handleImportClick}
              />
            </TabsContent>
            <TabsContent value="segments" className="h-full m-0">
              <div className="h-full p-6">
                <SegmentManager />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <PremiumUpgradeModal
          isOpen={upgradeModal.isOpen}
          onClose={() => setUpgradeModal({ isOpen: false, feature: "" })}
          feature={upgradeModal.feature}
          onUpgrade={handleUpgrade}
        />

        <CSVImportModal
          isOpen={csvImportModal}
          onClose={() => setCsvImportModal(false)}
          onImportComplete={handleImportComplete}
        />
      </div>
    </PremiumProvider>
  );
}

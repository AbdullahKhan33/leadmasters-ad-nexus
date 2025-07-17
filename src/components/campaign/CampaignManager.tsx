
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Eye, Edit, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { CampaignRecipientsDialog } from "./CampaignRecipientsDialog";

interface Campaign {
  id: string;
  name: string;
  templateName: string;
  status: string;
  allContacts: number;
  targetCategories: string[];
  createdAt: string;
}

interface CampaignManagerProps {
  onBack: () => void;
}

// Sample campaign data
const sampleCampaigns: Campaign[] = [
  {
    id: "CAM-1001",
    name: "Summer Promo Blast",
    templateName: "Promo Offer 20%",
    status: "Sent",
    allContacts: 5000,
    targetCategories: ["Retail", "Discounts"],
    createdAt: "2024-07-01 09:00 AM"
  },
  {
    id: "CAM-1002",
    name: "Order Updates June",
    templateName: "Order Confirmation",
    status: "In Progress",
    allContacts: 2300,
    targetCategories: ["E-commerce", "Orders"],
    createdAt: "2024-07-03 02:15 PM"
  },
  {
    id: "CAM-1003",
    name: "Appointment Reminders",
    templateName: "Appointment Reminder",
    status: "Draft",
    allContacts: 800,
    targetCategories: ["Healthcare", "Clinics"],
    createdAt: "2024-07-05 11:30 AM"
  },
  {
    id: "CAM-1004",
    name: "Product Launch Alert",
    templateName: "New Product Launch",
    status: "Sent",
    allContacts: 3200,
    targetCategories: ["Technology", "Innovation"],
    createdAt: "2024-07-02 04:45 PM"
  },
  {
    id: "CAM-1005",
    name: "Customer Feedback Survey",
    templateName: "Feedback Request",
    status: "Draft",
    allContacts: 1500,
    targetCategories: ["Survey", "Customer Service"],
    createdAt: "2024-07-04 10:20 AM"
  }
];

export function CampaignManager({ onBack }: CampaignManagerProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRowClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCampaign(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sent':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 whitespace-nowrap">
            {status}
          </Badge>
        );
      case 'in progress':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 whitespace-nowrap">
            {status}
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200 whitespace-nowrap">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="whitespace-nowrap">
            {status}
          </Badge>
        );
    }
  };

  const formatContactCount = (count: number) => {
    return count.toLocaleString();
  };

  const formatCategories = (categories: string[]) => {
    return categories.join(", ");
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Campaign Manager
          </h1>
          <p className="text-gray-600">
            Track, edit, and manage all your WhatsApp campaigns in one place
          </p>
        </div>

        {/* Create New Campaign Button */}
        <div className="flex justify-end">
          <Button 
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Campaign
          </Button>
        </div>

        {/* Campaigns Table */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Name</th>
                    <th className="text-left p-4 font-medium text-gray-900">Template Name</th>
                    <th className="text-left p-4 font-medium text-gray-900">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900">All Contacts</th>
                    <th className="text-left p-4 font-medium text-gray-900">Target Categories</th>
                    <th className="text-left p-4 font-medium text-gray-900">Created At</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleCampaigns.map((campaign) => (
                    <tr 
                      key={campaign.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
                      onMouseEnter={() => setHoveredRow(campaign.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      onClick={() => handleRowClick(campaign)}
                    >
                      <td className="p-4 text-sm text-gray-900 font-medium">{campaign.name}</td>
                      <td className="p-4 text-sm text-gray-600">{campaign.templateName}</td>
                      <td className="p-4">
                        {getStatusBadge(campaign.status)}
                      </td>
                      <td className="p-4 text-sm text-gray-900 font-medium">{formatContactCount(campaign.allContacts)}</td>
                      <td className="p-4 text-sm text-gray-600">{formatCategories(campaign.targetCategories)}</td>
                      <td className="p-4 text-sm text-gray-600">{campaign.createdAt}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          {/* Quick Action Icons - Visible on hover */}
                          <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
                            hoveredRow === campaign.id ? 'opacity-100' : 'opacity-0'
                          }`}>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('View campaign:', campaign.id);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Edit campaign:', campaign.id);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Duplicate campaign:', campaign.id);
                              }}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete campaign:', campaign.id);
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Recipients Dialog */}
      {selectedCampaign && (
        <CampaignRecipientsDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          campaignName={selectedCampaign.name}
          campaignId={selectedCampaign.id}
          totalRecipients={selectedCampaign.allContacts}
        />
      )}
    </div>
  );
}

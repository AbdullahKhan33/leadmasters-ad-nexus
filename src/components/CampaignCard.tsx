
import { Button } from "@/components/ui/button";
import { Edit, Copy, MoreHorizontal } from "lucide-react";

interface Campaign {
  id: number;
  name: string;
  status: string;
  performance: string;
}

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Draft':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excellent':
        return 'text-green-600';
      case 'Good':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-purple-200 hover:shadow-sm transition-all duration-200 bg-white group">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <h4 className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors duration-200">{campaign.name}</h4>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        <p className={`text-sm font-medium ${getPerformanceColor(campaign.performance)}`}>
          Performance: {campaign.performance}
        </p>
      </div>
      
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
        >
          <Copy className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

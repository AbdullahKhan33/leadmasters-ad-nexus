
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Edit, Copy, Trash2, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";

interface Template {
  id: string;
  name: string;
  type: string;
  category: string;
  language: string;
  status: string;
  createdAt: string;
}

interface TemplateSelectionProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template) => void;
  onCreateNewTemplate: () => void;
  onNext: () => void;
  isCreatingTemplate?: boolean;
  onRefresh?: () => void;
}

// Sample data for demonstration
const sampleTemplates: Template[] = [
  {
    id: "TMP-1001",
    name: "Order Confirmation",
    type: "Text",
    category: "Transactional",
    language: "English",
    status: "Approved",
    createdAt: "2024-07-01 10:15 AM"
  },
  {
    id: "TMP-1002",
    name: "Promo Offer 20%",
    type: "Image",
    category: "Marketing",
    language: "English",
    status: "Approved",
    createdAt: "2024-07-03 11:40 AM"
  },
  {
    id: "TMP-1003",
    name: "Appointment Reminder",
    type: "Text",
    category: "Reminder",
    language: "Hindi",
    status: "Pending",
    createdAt: "2024-07-05 2:00 PM"
  }
];

export function TemplateSelection({
  templates,
  selectedTemplate,
  onTemplateSelect,
  onCreateNewTemplate,
  onNext,
  isCreatingTemplate = false,
  onRefresh
}: TemplateSelectionProps) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Use sample data if no templates provided
  const displayTemplates = templates.length > 0 ? templates : sampleTemplates;

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        // Add a small delay to show the loading state
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
            {status}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
            {status}
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  if (displayTemplates.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No Templates Available</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get started by creating your first WhatsApp message template. Templates help you send consistent, approved messages to your customers.
            </p>
            <Button 
              onClick={onCreateNewTemplate}
              disabled={isCreatingTemplate}
              className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isCreatingTemplate ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 mr-2" />
              )}
              {isCreatingTemplate ? 'Creating Template...' : 'Create a New Template'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <Button 
          onClick={handleRefresh}
          variant="outline"
          disabled={isRefreshing}
          className="border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
        
        <Button 
          onClick={onCreateNewTemplate}
          variant="outline"
          disabled={isCreatingTemplate}
          className="border-purple-200 text-purple-600 hover:bg-purple-50 disabled:opacity-50"
        >
          {isCreatingTemplate ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          {isCreatingTemplate ? 'Creating Template...' : 'Create a New Template'}
        </Button>
      </div>

      {/* Templates Table */}
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Template ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Category</th>
                  <th className="text-left p-4 font-medium text-gray-900">Language</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Created At</th>
                  <th className="text-left p-4 font-medium text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayTemplates.map((template) => (
                  <tr 
                    key={template.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer group ${
                      selectedTemplate?.id === template.id ? 'bg-purple-50 hover:bg-purple-50' : ''
                    }`}
                    onClick={() => onTemplateSelect(template)}
                    onMouseEnter={() => setHoveredRow(template.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="p-4 text-sm text-gray-900 font-mono">{template.id}</td>
                    <td className="p-4 text-sm text-gray-900 font-medium">{template.name}</td>
                    <td className="p-4 text-sm text-gray-600">{template.type}</td>
                    <td className="p-4 text-sm text-gray-600">{template.category}</td>
                    <td className="p-4 text-sm text-gray-600">{template.language}</td>
                    <td className="p-4">
                      {getStatusBadge(template.status)}
                    </td>
                    <td className="p-4 text-sm text-gray-600">{template.createdAt}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                          onClick={(e) => {
                            e.stopPropagation();
                            onTemplateSelect(template);
                          }}
                          className={selectedTemplate?.id === template.id ? 
                            "bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white" : 
                            "border-gray-200 hover:bg-gray-50"
                          }
                        >
                          {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
                        </Button>
                        
                        {/* Quick Action Icons - Visible on hover */}
                        <div className={`flex items-center space-x-1 transition-opacity duration-200 ${
                          hoveredRow === template.id ? 'opacity-100' : 'opacity-0'
                        }`}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle edit action
                              console.log('Edit template:', template.id);
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
                              // Handle duplicate action
                              console.log('Duplicate template:', template.id);
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
                              // Handle delete action
                              console.log('Delete template:', template.id);
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

      {/* Next Button */}
      {selectedTemplate && (
        <div className="flex justify-end">
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Next: Configure Campaign
          </Button>
        </div>
      )}
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";

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
}

export function TemplateSelection({
  templates,
  selectedTemplate,
  onTemplateSelect,
  onCreateNewTemplate,
  onNext
}: TemplateSelectionProps) {
  if (templates.length === 0) {
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
              className="bg-gradient-to-r from-[#7C3AED] to-[#D946EF] hover:from-purple-700 hover:to-pink-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create a New Template
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Create New Template Button */}
      <div className="flex justify-end">
        <Button 
          onClick={onCreateNewTemplate}
          variant="outline"
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create a New Template
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
                {templates.map((template) => (
                  <tr 
                    key={template.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      selectedTemplate?.id === template.id ? 'bg-purple-50' : ''
                    }`}
                    onClick={() => onTemplateSelect(template)}
                  >
                    <td className="p-4 text-sm text-gray-900">{template.id}</td>
                    <td className="p-4 text-sm text-gray-900 font-medium">{template.name}</td>
                    <td className="p-4 text-sm text-gray-600">{template.type}</td>
                    <td className="p-4 text-sm text-gray-600">{template.category}</td>
                    <td className="p-4 text-sm text-gray-600">{template.language}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        template.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : template.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {template.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{template.createdAt}</td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          onTemplateSelect(template);
                        }}
                      >
                        {selectedTemplate?.id === template.id ? 'Selected' : 'Select'}
                      </Button>
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

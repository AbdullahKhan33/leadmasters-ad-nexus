
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Ticket, 
  Send, 
  Upload,
  HelpCircle,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportForm {
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  file?: File;
}

export function Support() {
  const [supportForm, setSupportForm] = useState<SupportForm>({
    subject: '',
    description: '',
    priority: 'Medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supportForm.subject.trim() || !supportForm.description.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in both subject and description.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const ticketId = Math.random().toString(36).substr(2, 9).toUpperCase();
      
      toast({
        title: "Support Ticket Created",
        description: `Ticket submitted successfully. Our team will get back to you soon. Ticket ID: ${ticketId}`,
      });

      // Reset form
      setSupportForm({ subject: '', description: '', priority: 'Medium' });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSupportForm(prev => ({ ...prev, file }));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7C3AED] to-[#D946EF] bg-clip-text text-transparent mb-2">
            Support Center
          </h1>
          <p className="text-gray-600">Get help from our expert team</p>
        </div>

        {/* Create Support Ticket */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <Ticket className="w-5 h-5 text-purple-600" />
              <span>Create Support Ticket</span>
            </CardTitle>
            <p className="text-gray-600">Describe your issue and our team will help you resolve it quickly.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief description of your issue"
                    className="border-gray-300 focus:border-purple-500"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={supportForm.priority} onValueChange={(value: 'Low' | 'Medium' | 'High') => setSupportForm(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger className="border-gray-300 focus:border-purple-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Low</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Medium">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span>Medium</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="High">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>High</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={supportForm.description}
                  onChange={(e) => setSupportForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please provide detailed information about your issue, including steps to reproduce, expected behavior, and any error messages you're seeing..."
                  rows={6}
                  className="border-gray-300 focus:border-purple-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file">File Attachment (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileUpload}
                    className="border-gray-300 focus:border-purple-500"
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                  />
                  <Upload className="w-4 h-4 text-gray-400" />
                </div>
                {supportForm.file && (
                  <div className="flex items-center space-x-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Selected: {supportForm.file.name}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, GIF, PDF, DOC, DOCX, TXT (Max 10MB)
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getPriorityColor(supportForm.priority)} border`}>
                    {supportForm.priority} Priority
                  </Badge>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Creating Ticket...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Create Ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <span>Quick Help</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                <h3 className="font-semibold text-gray-900 mb-2">Before Creating a Ticket</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check our FAQ in the chatbot</li>
                  <li>• Try refreshing the page</li>
                  <li>• Clear your browser cache</li>
                  <li>• Check your internet connection</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                <h3 className="font-semibold text-gray-900 mb-2">Response Times</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <span className="text-red-600 font-medium">High:</span> 2-4 hours</li>
                  <li>• <span className="text-orange-600 font-medium">Medium:</span> 4-8 hours</li>
                  <li>• <span className="text-green-600 font-medium">Low:</span> 1-2 business days</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Emergency Support</span>
              </div>
              <p className="text-sm text-blue-700">
                For urgent issues affecting your business operations, please email us directly at{' '}
                <a href="mailto:support@leadmasters.ai" className="underline font-medium">
                  support@leadmasters.ai
                </a>{' '}
                with "URGENT" in the subject line.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

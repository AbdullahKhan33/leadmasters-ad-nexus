import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

interface CSVLead {
  name: string;
  phone: string;
  source: string;
  status: string;
  last_message?: string;
}

export function CSVImportModal({ isOpen, onClose, onImportComplete }: CSVImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
      setSuccess(false);
    } else {
      setError('Please select a valid CSV file');
      setFile(null);
    }
  };

  const parseCSV = (text: string): CSVLead[] => {
    const lines = text.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
    
    // Validate required headers
    const requiredHeaders = ['name', 'phone'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
    }

    const leads: CSVLead[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"(.*)"$/, '$1'));
      if (values.length === headers.length && values[0]) {
        const lead: CSVLead = {
          name: values[headers.indexOf('name')] || '',
          phone: values[headers.indexOf('phone')] || '',
          source: values[headers.indexOf('source')] || 'CSV Import',
          status: values[headers.indexOf('status')] || 'New',
          last_message: values[headers.indexOf('last_message')] || values[headers.indexOf('lastmessage')] || ''
        };
        leads.push(lead);
      }
    }
    return leads;
  };

  const handleImport = async () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const text = await file.text();
      const leads = parseCSV(text);
      
      if (leads.length === 0) {
        throw new Error('No valid leads found in CSV file');
      }

      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('You must be logged in to import leads');
      }

      // Insert leads in batches
      const batchSize = 10;
      let imported = 0;

      for (let i = 0; i < leads.length; i += batchSize) {
        const batch = leads.slice(i, i + batchSize);
        const leadsToInsert = batch.map(lead => ({
          ...lead,
          user_id: user.id,
          timestamp: new Date().toISOString()
        }));

        const { error: insertError } = await supabase
          .from('leads')
          .insert(leadsToInsert);

        if (insertError) {
          throw new Error(`Failed to import leads: ${insertError.message}`);
        }

        imported += batch.length;
        setProgress(Math.round((imported / leads.length) * 100));
      }

      setSuccess(true);
      toast({
        title: "Import Successful",
        description: `Successfully imported ${leads.length} leads from CSV`,
        variant: "default",
      });

      setTimeout(() => {
        onImportComplete();
        onClose();
        resetModal();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import CSV');
      toast({
        title: "Import Failed",
        description: err instanceof Error ? err.message : 'Failed to import CSV',
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const downloadSampleCSV = () => {
    const sampleData = `name,phone,source,status,last_message
Ahmed Hassan,+971501234567,WhatsApp,New,Interested in premium package
Fatima Al Zahra,+971509876543,Facebook,Active,Thank you for the proposal
Mohammed Ali,+971501111222,Instagram,Awaiting Reply,Looking for social media manager
Sara Al Rashid,+971502345678,Website,New,Need help with digital marketing
Omar Abdullah,+971503456789,LinkedIn,Active,Interested in your services package`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_leads.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Sample Downloaded",
      description: "Sample CSV file has been downloaded",
      variant: "default",
    });
  };

  const resetModal = () => {
    setFile(null);
    setUploading(false);
    setProgress(0);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    if (!uploading) {
      resetModal();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Import Leads from CSV</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Sample CSV Download */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Need a template?</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadSampleCSV}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                <Download className="w-4 h-4 mr-1" />
                Sample CSV
              </Button>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Download our sample CSV to see the required format
            </p>
          </div>


          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="csv-file">Select CSV File</Label>
            <div className="relative">
              <input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button 
                variant="outline" 
                className="w-full justify-start border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-200"
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {file ? file.name : "Choose file"}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Importing leads...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Leads imported successfully! Refreshing data...
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={uploading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || uploading || success}
              className="flex-1"
            >
              {uploading ? 'Importing...' : 'Import Leads'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Recipient {
  id: string;
  phoneNumber: string;
  name: string;
  status: 'delivered' | 'read' | 'failed' | 'pending';
  sentAt: string;
  readAt?: string;
}

interface CampaignRecipientsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  campaignName: string;
  campaignId: string;
  totalRecipients: number;
}

// Generate mock recipients data
const generateMockRecipients = (campaignId: string, totalCount: number): Recipient[] => {
  const recipients: Recipient[] = [];
  const statuses: Recipient['status'][] = ['delivered', 'read', 'failed', 'pending'];
  const names = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson',
    'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez', 'William Garcia', 'Jessica Rodriguez',
    'Christopher Lee', 'Amanda White', 'Matthew Lewis', 'Ashley Walker', 'Daniel Hall',
    'Nicole Young', 'Andrew King', 'Stephanie Wright', 'Joshua Lopez', 'Melissa Hill'
  ];

  for (let i = 0; i < totalCount; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const phoneNumber = `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`;
    
    const sentDate = new Date();
    sentDate.setHours(sentDate.getHours() - Math.floor(Math.random() * 48));
    
    const readDate = randomStatus === 'read' ? new Date(sentDate.getTime() + Math.random() * 3600000) : undefined;

    recipients.push({
      id: `${campaignId}-${i + 1}`,
      phoneNumber,
      name: `${randomName} ${i + 1}`,
      status: randomStatus,
      sentAt: sentDate.toISOString(),
      readAt: readDate?.toISOString()
    });
  }

  return recipients;
};

const getStatusBadge = (status: Recipient['status']) => {
  switch (status) {
    case 'delivered':
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
          Delivered
        </Badge>
      );
    case 'read':
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
          Read
        </Badge>
      );
    case 'failed':
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">
          Failed
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
          Pending
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const exportToCSV = (recipients: Recipient[], campaignName: string) => {
  const headers = ['Phone Number', 'Name', 'Status', 'Sent At', 'Read At'];
  const csvContent = [
    headers.join(','),
    ...recipients.map(recipient => [
      recipient.phoneNumber,
      `"${recipient.name}"`,
      recipient.status,
      `"${formatDateTime(recipient.sentAt)}"`,
      recipient.readAt ? `"${formatDateTime(recipient.readAt)}"` : ''
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${campaignName.replace(/\s+/g, '_')}_recipients.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export function CampaignRecipientsDialog({ 
  isOpen, 
  onClose, 
  campaignName, 
  campaignId, 
  totalRecipients 
}: CampaignRecipientsDialogProps) {
  const [allRecipients] = useState(() => generateMockRecipients(campaignId, totalRecipients));
  const topRecipients = allRecipients.slice(0, 10);

  const handleExportCSV = () => {
    exportToCSV(allRecipients, campaignName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Campaign Recipients - {campaignName}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              Showing top 10 of {totalRecipients.toLocaleString()} recipients
            </p>
            <Button 
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export All to CSV
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="overflow-auto h-full border rounded-md">
            <table className="w-full">
              <thead className="bg-muted/50 sticky top-0">
                <tr>
                  <th className="text-left p-3 font-medium text-sm">Phone Number</th>
                  <th className="text-left p-3 font-medium text-sm">Name</th>
                  <th className="text-left p-3 font-medium text-sm">Status</th>
                  <th className="text-left p-3 font-medium text-sm">Sent At</th>
                  <th className="text-left p-3 font-medium text-sm">Read At</th>
                </tr>
              </thead>
              <tbody>
                {topRecipients.map((recipient, index) => (
                  <tr 
                    key={recipient.id} 
                    className={`border-b border-border hover:bg-muted/30 ${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                    }`}
                  >
                    <td className="p-3 text-sm font-mono">
                      {recipient.phoneNumber}
                    </td>
                    <td className="p-3 text-sm">
                      {recipient.name}
                    </td>
                    <td className="p-3">
                      {getStatusBadge(recipient.status)}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {formatDateTime(recipient.sentAt)}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {recipient.readAt ? formatDateTime(recipient.readAt) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-shrink-0 pt-4 border-t">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              Total recipients: {totalRecipients.toLocaleString()}
            </span>
            <span>
              Click "Export All to CSV" to download complete list
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
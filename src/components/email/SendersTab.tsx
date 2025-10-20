import { useState } from "react";
import { Mail, Edit, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSenders, EmailSender } from "@/hooks/useSenders";
import { AddSenderModal } from "./AddSenderModal";
import { Skeleton } from "@/components/ui/skeleton";

export const SendersTab = () => {
  const { senders, isLoading, deleteSender } = useSenders();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSender, setEditingSender] = useState<EmailSender | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSenders = senders.filter(
    (sender) =>
      sender.from_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sender.from_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    if (deletingId) {
      deleteSender(deletingId);
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (!senders.length) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="rounded-full bg-primary/10 p-6 mb-6">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">No senders configured yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Add your first sender identity to start sending emails from LeadMasters.
          </p>
          <Button 
            onClick={() => setIsAddModalOpen(true)} 
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sender
          </Button>
        </div>

        <AddSenderModal
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          sender={null}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search senders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sender
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredSenders.map((sender) => (
            <Card key={sender.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-semibold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                        {sender.from_name}
                      </h4>
                      {sender.is_verified && (
                        <Badge variant="default" className="bg-green-500">
                          Verified
                        </Badge>
                      )}
                      {!sender.is_verified && (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                      {sender.is_default && (
                        <Badge variant="outline">Default</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground truncate">{sender.from_email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingSender(sender)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDeletingId(sender.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <AddSenderModal
        open={isAddModalOpen || !!editingSender}
        onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) setEditingSender(null);
        }}
        sender={editingSender}
      />

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Campaigns using this sender may be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

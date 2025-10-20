import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSenders, EmailSender } from "@/hooks/useSenders";
import { Smartphone } from "lucide-react";

const senderSchema = z.object({
  from_name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  from_email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
});

type SenderFormData = z.infer<typeof senderSchema>;

interface AddSenderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sender?: EmailSender | null;
}

export const AddSenderModal = ({ open, onOpenChange, sender }: AddSenderModalProps) => {
  const { createSender, updateSender, isCreating, isUpdating } = useSenders();
  const isEdit = !!sender;

  const form = useForm<SenderFormData>({
    resolver: zodResolver(senderSchema),
    defaultValues: {
      from_name: sender?.from_name || "",
      from_email: sender?.from_email || "",
    },
  });

  const onSubmit = (data: SenderFormData) => {
    if (isEdit && sender) {
      updateSender(
        { id: sender.id, ...data },
        {
          onSuccess: () => {
            onOpenChange(false);
            form.reset();
          },
        }
      );
    } else {
      createSender(
        {
          from_name: data.from_name,
          from_email: data.from_email,
          domain_id: null,
          is_verified: false,
          is_default: false,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            form.reset();
          },
        }
      );
    }
  };

  const fromName = form.watch("from_name") || "John Doe";
  const fromEmail = form.watch("from_email") || "john.doe@email.com";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            {isEdit ? "Edit Sender" : "Add Sender"}
          </DialogTitle>
          <DialogDescription>
            Specify what your recipients will see when they receive emails from this sender.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="from_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name your recipients will see
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="from_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@email.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      From email is the sender email address from which your recipients will receive your emails. Format must be name@domain.com.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 sm:gap-0">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isCreating || isUpdating}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg"
                >
                  {isEdit ? "Save changes" : "Add sender"}
                </Button>
              </DialogFooter>
            </form>
          </Form>

          <div className="hidden md:block">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Smartphone className="h-4 w-4" />
                <span>Preview</span>
              </div>
              <div className="bg-background rounded-md p-4 shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {fromName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{fromName}</p>
                      <p className="text-xs text-muted-foreground truncate">{fromEmail}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Email Subject</p>
                    <p className="text-xs mt-1 line-clamp-2">
                      This is how your sender will appear in the recipient's inbox...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

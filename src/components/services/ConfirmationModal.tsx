
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Clock, ArrowRight, Phone, FileText } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "package" | "service" | "contact";
  title: string;
  price?: string;
}

export function ConfirmationModal({ isOpen, onClose, type, title, price }: ConfirmationModalProps) {
  const getConfirmationContent = () => {
    switch (type) {
      case "package":
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />,
          heading: "Order Confirmed",
          message: `Thank you for choosing the ${title}. We're excited to help grow your business.`,
          details: [
            "Confirmation email sent to your inbox",
            "Our team will contact you within 24 hours",
            "Project delivery within 3-5 business days",
            "Progress updates via WhatsApp"
          ],
          nextSteps: "Check your email for payment details and project kick-off information."
        };
      case "service":
        return {
          icon: <CheckCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
          heading: "Service Ordered",
          message: `Your ${title} order has been confirmed and added to our queue.`,
          details: [
            "Confirmation email with service details sent",
            "Service completion within 2-3 business days",
            "Detailed delivery report included",
            "One free revision if needed"
          ],
          nextSteps: "Our specialists will begin working on your service after payment confirmation."
        };
      case "contact":
        return {
          icon: <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
          heading: "Message Sent",
          message: "Thank you for your inquiry. We'll create a custom solution tailored to your business needs.",
          details: [
            "Our team will call you within 2 hours",
            "Discussion of your specific requirements",
            "Personalized recommendation provided",
            "Custom quote delivered within 24 hours"
          ],
          nextSteps: "Please keep your phone available - we'll be calling soon."
        };
      default:
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />,
          heading: "Success",
          message: "Your request has been processed successfully.",
          details: [],
          nextSteps: ""
        };
    }
  };

  const content = getConfirmationContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg mx-auto bg-white rounded-lg shadow-xl border border-gray-200">
        <DialogHeader className="text-center pb-6">
          {content.icon}
          <DialogTitle className="text-2xl font-semibold text-gray-900 mb-3">
            {content.heading}
          </DialogTitle>
          <p className="text-gray-600 leading-relaxed">
            {content.message}
          </p>
          {price && (
            <div className="bg-gray-50 rounded-lg p-4 mt-4 border border-gray-100">
              <p className="text-sm text-gray-500 mb-1">Total Amount</p>
              <p className="text-xl font-semibold text-gray-900">{price}</p>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              What happens next
            </h4>
            <ul className="space-y-3">
              {content.details.map((detail, index) => {
                const getIcon = () => {
                  if (detail.includes("email")) return <Mail className="w-4 h-4 text-blue-600" />;
                  if (detail.includes("call") || detail.includes("contact")) return <Phone className="w-4 h-4 text-blue-600" />;
                  if (detail.includes("report") || detail.includes("delivery")) return <FileText className="w-4 h-4 text-blue-600" />;
                  return <ArrowRight className="w-4 h-4 text-blue-600" />;
                };

                return (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-3">
                    {getIcon()}
                    <span>{detail}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {content.nextSteps && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-sm text-amber-800 font-medium">
                <strong>Important:</strong> {content.nextSteps}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={onClose}
              variant="outline" 
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

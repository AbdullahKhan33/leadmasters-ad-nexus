
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Clock, ArrowRight } from "lucide-react";

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
          icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />,
          heading: "Order Confirmed! 🎉",
          message: `Thank you for choosing the ${title}! We're excited to help grow your business.`,
          details: [
            "📧 You'll receive a detailed email within 5 minutes with next steps",
            "📞 Our team will contact you within 24 hours to begin setup",
            "🚀 Your package will be ready within 3-5 business days",
            "💬 You can track progress via WhatsApp updates"
          ],
          nextSteps: "Check your email for payment details and project kick-off information."
        };
      case "service":
        return {
          icon: <CheckCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />,
          heading: "Service Ordered! ✅",
          message: `Your ${title} order has been confirmed.`,
          details: [
            "📧 Confirmation email sent with service details",
            "⏱️ Service will be completed within 2-3 business days",
            "📋 You'll receive a detailed delivery report",
            "🔄 Free revision included if needed"
          ],
          nextSteps: "Our specialists will begin working on your service immediately after payment confirmation."
        };
      case "contact":
        return {
          icon: <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />,
          heading: "Message Sent! 📨",
          message: "Thank you for reaching out! We'll create a custom solution for your business.",
          details: [
            "📞 Our team will call you within 2 hours",
            "📋 We'll discuss your specific requirements",
            "💡 Get a personalized recommendation",
            "📊 Receive a custom quote within 24 hours"
          ],
          nextSteps: "Keep an eye on your phone - we'll be calling soon!"
        };
      default:
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />,
          heading: "Success!",
          message: "Your request has been processed.",
          details: [],
          nextSteps: ""
        };
    }
  };

  const content = getConfirmationContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-xl shadow-2xl border-0">
        <DialogHeader className="text-center pb-4">
          {content.icon}
          <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
            {content.heading}
          </DialogTitle>
          <p className="text-gray-600 text-sm leading-relaxed">
            {content.message}
          </p>
          {price && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mt-3 border border-purple-100">
              <p className="text-sm text-gray-600 mb-1">Total Amount:</p>
              <p className="text-lg font-bold text-purple-700">{price}</p>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              What happens next:
            </h4>
            <ul className="space-y-2">
              {content.details.map((detail, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {content.nextSteps && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">
                💡 {content.nextSteps}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={onClose}
              variant="outline" 
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
            <Button 
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white"
            >
              Got it! 👍
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
}

interface NotificationBarProps {
  notifications: Notification[];
  onDismiss?: (id: string) => void;
}

export function NotificationBar({ notifications, onDismiss }: NotificationBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (notifications.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  if (!isVisible || notifications.length === 0) return null;

  const current = notifications[currentIndex];

  const getColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-900";
      case "warning":
        return "bg-orange-50 border-orange-200 text-orange-900";
      default:
        return "bg-blue-50 border-blue-200 text-blue-900";
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border-2 p-4 flex items-center gap-3 animate-fade-in",
        getColor(current.type)
      )}
    >
      <Bell className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{current.message}</p>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {notifications.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === currentIndex ? "w-8 bg-current" : "w-1.5 bg-current/30"
              )}
            />
          ))}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
          onClick={() => {
            onDismiss?.(current.id);
            setIsVisible(false);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

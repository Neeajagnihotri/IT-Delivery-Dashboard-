
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Bell, AlertCircle, Info, CheckCircle } from "lucide-react";

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notification?: {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    timestamp: string;
  } | null;
  onDismiss: (notificationId: string) => void;
}

export const NotificationModal = ({ 
  open, 
  onOpenChange, 
  notification,
  onDismiss 
}: NotificationModalProps) => {
  if (!notification) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-teal" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-deep-blue" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-amber-200 bg-amber-50';
      case 'success':
        return 'border-teal/20 bg-teal/5';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-deep-blue/20 bg-deep-blue/5';
    }
  };

  const handleClose = () => {
    onDismiss(notification.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-soft-silver/30">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2 text-deep-blue">
            <Bell className="h-5 w-5" />
            Notification Details
          </DialogTitle>
        </DialogHeader>
        
        <div className={`p-4 rounded-lg border ${getTypeColor(notification.type)}`}>
          <div className="flex items-start gap-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <h3 className="font-semibold text-deep-blue mb-2">
                {notification.title}
              </h3>
              <p className="text-slate text-sm leading-relaxed">
                {notification.message}
              </p>
              <p className="text-xs text-slate/70 mt-3">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-soft-silver/30">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-soft-silver text-slate hover:bg-light-bg"
          >
            Keep Notification
          </Button>
          <Button
            onClick={handleClose}
            className="bg-deep-blue hover:bg-deep-blue/90 text-white"
          >
            <X className="h-4 w-4 mr-2" />
            Close & Dismiss
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

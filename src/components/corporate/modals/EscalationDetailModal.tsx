
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Calendar, 
  User, 
  Building2, 
  FileText,
  Clock,
  CheckCircle,
  X
} from "lucide-react";

interface EscalationDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  escalation: any;
}

export const EscalationDetailModal = ({ open, onOpenChange, escalation }: EscalationDetailModalProps) => {
  if (!escalation) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-charcoal text-white';
      case 'high': return 'bg-slate text-white';
      case 'medium': return 'bg-teal text-white';
      default: return 'bg-soft-silver text-charcoal';
    }
  };

  const handleResolve = () => {
    console.log(`Resolving escalation: ${escalation.id}`);
    // Add resolution logic here
    onOpenChange(false);
  };

  const handleUpdate = () => {
    console.log(`Updating escalation: ${escalation.id}`);
    // Add update logic here
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <AlertTriangle className="h-6 w-6 text-teal" />
            <span>Escalation Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Information */}
          <Card className="bg-light-bg border border-deep-blue/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-deep-blue">{escalation.projectName}</span>
                <Badge className={getPriorityColor(escalation.priority)}>
                  {escalation.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-teal" />
                  <div>
                    <p className="text-sm text-slate">Customer</p>
                    <p className="font-medium text-deep-blue">{escalation.clientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-teal" />
                  <div>
                    <p className="text-sm text-slate">Project Owner</p>
                    <p className="font-medium text-deep-blue">{escalation.engineerHead}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-teal" />
                  <div>
                    <p className="text-sm text-slate">Date Raised</p>
                    <p className="font-medium text-deep-blue">6/1/2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-teal" />
                  <div>
                    <p className="text-sm text-slate">Resolution ETA</p>
                    <p className="font-medium text-deep-blue">{escalation.resolutionETA}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Escalation Details */}
          <Card className="border border-deep-blue/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-teal" />
                <span>Escalation Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">Title</h4>
                <p className="text-slate">API Performance Issues</p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">Description</h4>
                <p className="text-slate">
                  Critical performance degradation in API response times affecting customer operations. 
                  Response times have increased by 300% over the past 48 hours, causing timeout issues 
                  for end users. Immediate investigation and resolution required.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">Impact Assessment</h4>
                <ul className="list-disc list-inside text-slate space-y-1">
                  <li>Customer operations severely impacted</li>
                  <li>SLA breach imminent if not resolved within 24 hours</li>
                  <li>Potential revenue loss of $50K per day</li>
                  <li>Customer satisfaction at risk</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-deep-blue mb-2">Actions Taken</h4>
                <ul className="list-disc list-inside text-slate space-y-1">
                  <li>Infrastructure team notified and investigating</li>
                  <li>Database performance analysis initiated</li>
                  <li>Customer informed of ongoing investigation</li>
                  <li>Backup systems activated to mitigate impact</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-soft-silver text-deep-blue hover:bg-light-bg"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-deep-blue hover:bg-deep-blue/90 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Update Status
            </Button>
            <Button
              onClick={handleResolve}
              className="bg-teal hover:bg-teal/90 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Resolved
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

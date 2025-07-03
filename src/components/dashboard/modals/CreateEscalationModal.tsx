
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertTriangle, 
  Calendar, 
  User, 
  Building2, 
  FileText,
  CheckCircle,
  X
} from "lucide-react";
import { toast } from "sonner";

interface CreateEscalationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateEscalationModal = ({ open, onOpenChange }: CreateEscalationModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: '',
    customer: '',
    project: '',
    owner: '',
    status: 'Open',
    dateRaised: new Date().toISOString().split('T')[0],
    resolutionETA: '',
    description: '',
    impactAssessment: '',
    actionsTaken: ''
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.priority || !formData.customer || !formData.project || !formData.owner || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log('Creating escalation:', formData);
    toast.success("Escalation created successfully");
    
    // Reset form
    setFormData({
      title: '',
      priority: '',
      customer: '',
      project: '',
      owner: '',
      status: 'Open',
      dateRaised: new Date().toISOString().split('T')[0],
      resolutionETA: '',
      description: '',
      impactAssessment: '',
      actionsTaken: ''
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      priority: '',
      customer: '',
      project: '',
      owner: '',
      status: 'Open',
      dateRaised: new Date().toISOString().split('T')[0],
      resolutionETA: '',
      description: '',
      impactAssessment: '',
      actionsTaken: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <AlertTriangle className="h-6 w-6 text-teal" />
            <span>Create New Escalation</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-deep-blue font-medium">
                Escalation Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Brief description of the issue"
                className="border-soft-silver focus:border-teal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-deep-blue font-medium">
                Priority *
              </Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger className="border-soft-silver focus:border-teal">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer" className="text-deep-blue font-medium">
                Customer *
              </Label>
              <Select value={formData.customer} onValueChange={(value) => setFormData({...formData, customer: value})}>
                <SelectTrigger className="border-soft-silver focus:border-teal">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme-corp">Acme Corporation</SelectItem>
                  <SelectItem value="tech-solutions">Tech Solutions Ltd</SelectItem>
                  <SelectItem value="global-systems">Global Systems Inc</SelectItem>
                  <SelectItem value="innovate-co">Innovate Co</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project" className="text-deep-blue font-medium">
                Associated Project *
              </Label>
              <Select value={formData.project} onValueChange={(value) => setFormData({...formData, project: value})}>
                <SelectTrigger className="border-soft-silver focus:border-teal">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecommerce-platform">E-commerce Platform</SelectItem>
                  <SelectItem value="mobile-banking">Mobile Banking App</SelectItem>
                  <SelectItem value="crm-system">CRM System</SelectItem>
                  <SelectItem value="data-analytics">Data Analytics Dashboard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner" className="text-deep-blue font-medium">
                Escalation Owner *
              </Label>
              <Select value={formData.owner} onValueChange={(value) => setFormData({...formData, owner: value})}>
                <SelectTrigger className="border-soft-silver focus:border-teal">
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  <SelectItem value="lisa-chen">Lisa Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="impactAssessment" className="text-deep-blue font-medium">
                Impact Assessment
              </Label>
              <Textarea
                id="impactAssessment"
                value={formData.impactAssessment}
                onChange={(e) => setFormData({...formData, impactAssessment: e.target.value})}
                placeholder="Describe the impact of this escalation"
                className="border-soft-silver focus:border-teal min-h-[80px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-deep-blue font-medium">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger className="border-soft-silver focus:border-teal">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRaised" className="text-deep-blue font-medium">
                Date Raised
              </Label>
              <Input
                id="dateRaised"
                type="date"
                value={formData.dateRaised}
                onChange={(e) => setFormData({...formData, dateRaised: e.target.value})}
                className="border-soft-silver focus:border-teal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolutionETA" className="text-deep-blue font-medium">
                Resolution ETA *
              </Label>
              <Input
                id="resolutionETA"
                type="date"
                value={formData.resolutionETA}
                onChange={(e) => setFormData({...formData, resolutionETA: e.target.value})}
                className="border-soft-silver focus:border-teal"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actionsTaken" className="text-deep-blue font-medium">
                Actions Taken
              </Label>
              <Textarea
                id="actionsTaken"
                value={formData.actionsTaken}
                onChange={(e) => setFormData({...formData, actionsTaken: e.target.value})}
                placeholder="Describe actions taken to resolve this escalation"
                className="border-soft-silver focus:border-teal min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-deep-blue font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description of the escalation"
                className="border-soft-silver focus:border-teal min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-soft-silver">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-teal hover:bg-teal/90 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Create Escalation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

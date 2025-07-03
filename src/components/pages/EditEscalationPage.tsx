
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, ArrowLeft, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const EditEscalationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data based on escalation ID
  const initialData = {
    '1': {
      title: 'API Performance Issues',
      customer: 'TechCorp Industries',
      projectOwner: 'Alex Rodriguez',
      dateRaised: '2024-06-01',
      resolutionETA: '2024-06-08',
      priority: 'High',
      status: 'In Progress',
      description: 'Critical performance degradation in API response times affecting customer operations. Response times have increased by 300% over the past 48 hours, causing timeout issues for end users. Immediate investigation and resolution required.',
      impactAssessment: 'Customer operations severely impacted. SLA breach imminent if not resolved within 24 hours. Potential revenue loss of £50K per day. Customer satisfaction at risk.',
      actionsTaken: 'Infrastructure team notified and investigating. Database performance analysis initiated. Customer informed of ongoing investigation. Backup systems activated to mitigate impact.'
    },
    '2': {
      title: 'Budget Overrun Discussion',
      customer: 'InnovateCorp',
      projectOwner: 'Sarah Johnson',
      dateRaised: '2024-06-02',
      resolutionETA: '2024-06-05',
      priority: 'Medium',
      status: 'Open',
      description: 'Project budget has exceeded initial estimates by 15% due to additional scope requirements and technical complexities discovered during implementation phase.',
      impactAssessment: 'Budget variance of 15% from original estimate. Additional resources required for completion. Timeline may be affected. Customer approval needed for budget increase.',
      actionsTaken: 'Budget analysis completed. Scope change documentation prepared. Meeting scheduled with customer stakeholders. Alternative solutions being evaluated.'
    },
    '3': {
      title: 'Resource Allocation Conflict',
      customer: 'GlobalTech',
      projectOwner: 'Mike Chen',
      dateRaised: '2024-06-03',
      resolutionETA: '2024-06-10',
      priority: 'Critical',
      status: 'Open',
      description: 'Multiple high-priority projects are competing for the same specialized resources, causing significant delays and potential delivery risks.',
      impactAssessment: 'Three critical projects affected simultaneously. Key specialist resources over-allocated. Delivery timelines at risk. Customer commitments may be breached.',
      actionsTaken: 'Resource capacity analysis initiated. Priority matrix review scheduled. External contractor options being explored. Customer communications planned.'
    }
  };

  const escalationData = initialData[id as keyof typeof initialData];
  const [formData, setFormData] = useState(escalationData || {
    title: '',
    customer: '',
    projectOwner: '',
    dateRaised: '',
    resolutionETA: '',
    priority: '',
    status: '',
    description: '',
    impactAssessment: '',
    actionsTaken: ''
  });

  if (!escalationData) {
    return (
      <div className="min-h-screen bg-light-bg p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold text-deep-blue mb-4">Escalation Not Found</h2>
              <Button onClick={() => navigate('/')} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!formData.title || !formData.priority || !formData.customer || !formData.projectOwner || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    console.log('Saving escalation:', formData);
    toast.success("Escalation updated successfully");
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-soft-silver text-deep-blue hover:bg-light-bg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue flex items-center gap-3">
                <AlertTriangle className="h-8 w-8" />
                Edit Escalation
              </h1>
              <p className="text-slate mt-1">Update escalation details and status</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-deep-blue/5 to-teal/5">
            <CardTitle className="text-xl font-bold text-deep-blue">
              Escalation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-deep-blue font-medium">
                    Escalation Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="border-soft-silver focus:border-teal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-deep-blue font-medium">
                    Priority *
                  </Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger className="border-soft-silver focus:border-teal">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer" className="text-deep-blue font-medium">
                    Customer *
                  </Label>
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                    className="border-soft-silver focus:border-teal"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectOwner" className="text-deep-blue font-medium">
                    Project Owner *
                  </Label>
                  <Input
                    id="projectOwner"
                    value={formData.projectOwner}
                    onChange={(e) => setFormData({...formData, projectOwner: e.target.value})}
                    className="border-soft-silver focus:border-teal"
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
                    className="border-soft-silver focus:border-teal min-h-[120px]"
                    placeholder="Detailed description of the escalation"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-deep-blue font-medium">
                    Status
                  </Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger className="border-soft-silver focus:border-teal">
                      <SelectValue />
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
                  <Label htmlFor="impactAssessment" className="text-deep-blue font-medium">
                    Impact Assessment
                  </Label>
                  <Textarea
                    id="impactAssessment"
                    value={formData.impactAssessment}
                    onChange={(e) => setFormData({...formData, impactAssessment: e.target.value})}
                    className="border-soft-silver focus:border-teal min-h-[80px]"
                    placeholder="Describe the impact of this escalation"
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
                    className="border-soft-silver focus:border-teal min-h-[80px]"
                    placeholder="Describe actions taken to resolve this escalation"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-soft-silver mt-6">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-soft-silver text-deep-blue hover:bg-light-bg"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-teal hover:bg-teal/90 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const CreateEscalationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    priority: '',
    customer: '',
    project: '',
    owner: '',
    status: 'Open',
    dateRaised: '',
    resolutionETA: '',
    description: ''
  });

  // Pre-fill form data when editing
  useEffect(() => {
    if (isEditing && id) {
      // Mock data for editing - in real app, this would come from API
      const escalationData = {
        '1': {
          title: 'API Performance Issues',
          priority: 'high',
          customer: 'techcorp',
          project: 'project-alpha',
          owner: 'alex-rodriguez',
          status: 'Open',
          dateRaised: '2024-06-01',
          resolutionETA: '2024-06-08',
          description: 'Critical performance degradation in API response times affecting customer operations. Response times have increased by 300% over the past 48 hours, causing timeout issues for end users. Immediate investigation and resolution required.'
        },
        '2': {
          title: 'Budget Overrun Discussion',
          priority: 'medium',
          customer: 'innovatecorp',
          project: 'beta-platform',
          owner: 'sarah-johnson',
          status: 'Open',
          dateRaised: '2024-06-02',
          resolutionETA: '2024-06-05',
          description: 'Project budget has exceeded initial estimates by 15% due to additional scope requirements and technical complexities discovered during implementation phase.'
        },
        '3': {
          title: 'Resource Allocation Conflict',
          priority: 'critical',
          customer: 'globaltech',
          project: 'customer-portal',
          owner: 'mike-chen',
          status: 'Open',
          dateRaised: '2024-06-03',
          resolutionETA: '2024-06-10',
          description: 'Multiple high-priority projects are competing for the same specialized resources, causing significant delays and potential delivery risks.'
        }
      };

      const data = escalationData[id as keyof typeof escalationData];
      if (data) {
        setFormData(data);
      }
    }
  }, [isEditing, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/Updating escalation:', formData);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-deep-blue/5 to-teal/5">
            <CardTitle className="text-xl font-bold text-deep-blue flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {isEditing ? 'Edit Escalation' : 'Create New Escalation'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-deep-blue font-medium text-sm">
                      Escalation Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the issue"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="mt-2 bg-white border-soft-silver focus:border-teal text-deep-blue placeholder:text-slate"
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority" className="text-deep-blue font-medium text-sm">
                      Priority *
                    </Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value) => setFormData({...formData, priority: value})}
                    >
                      <SelectTrigger className="mt-2 bg-white border-soft-silver focus:border-teal">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-soft-silver shadow-lg">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="customer" className="text-deep-blue font-medium text-sm">
                      Customer *
                    </Label>
                    <Select 
                      value={formData.customer} 
                      onValueChange={(value) => setFormData({...formData, customer: value})}
                    >
                      <SelectTrigger className="mt-2 bg-white border-soft-silver focus:border-teal">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-soft-silver shadow-lg">
                        <SelectItem value="techcorp">TechCorp Industries</SelectItem>
                        <SelectItem value="innovatecorp">InnovateCorp</SelectItem>
                        <SelectItem value="globaltech">GlobalTech</SelectItem>
                        <SelectItem value="megacorp">MegaCorp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="project" className="text-deep-blue font-medium text-sm">
                      Associated Project *
                    </Label>
                    <Select 
                      value={formData.project} 
                      onValueChange={(value) => setFormData({...formData, project: value})}
                    >
                      <SelectTrigger className="mt-2 bg-white border-soft-silver focus:border-teal">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-soft-silver shadow-lg">
                        <SelectItem value="project-alpha">Project Alpha</SelectItem>
                        <SelectItem value="beta-platform">Beta Platform</SelectItem>
                        <SelectItem value="customer-portal">Customer Portal</SelectItem>
                        <SelectItem value="data-migration">Data Migration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="owner" className="text-deep-blue font-medium text-sm">
                      Escalation Owner *
                    </Label>
                    <Select 
                      value={formData.owner} 
                      onValueChange={(value) => setFormData({...formData, owner: value})}
                    >
                      <SelectTrigger className="mt-2 bg-white border-soft-silver focus:border-teal">
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-soft-silver shadow-lg">
                        <SelectItem value="alex-rodriguez">Alex Rodriguez</SelectItem>
                        <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="mike-chen">Mike Chen</SelectItem>
                        <SelectItem value="emily-davis">Emily Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status" className="text-deep-blue font-medium text-sm">
                      Status
                    </Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => setFormData({...formData, status: value})}
                    >
                      <SelectTrigger className="mt-2 bg-white border-soft-silver focus:border-teal">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-soft-silver shadow-lg">
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dateRaised" className="text-deep-blue font-medium text-sm">
                      Date Raised
                    </Label>
                    <Input
                      id="dateRaised"
                      type="date"
                      value={formData.dateRaised}
                      onChange={(e) => setFormData({...formData, dateRaised: e.target.value})}
                      className="mt-2 bg-white border-soft-silver focus:border-teal text-deep-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resolutionETA" className="text-deep-blue font-medium text-sm">
                      Resolution ETA *
                    </Label>
                    <Input
                      id="resolutionETA"
                      type="date"
                      value={formData.resolutionETA}
                      onChange={(e) => setFormData({...formData, resolutionETA: e.target.value})}
                      className="mt-2 bg-white border-soft-silver focus:border-teal text-deep-blue"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-deep-blue font-medium text-sm">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the escalation..."
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="mt-2 bg-white border-soft-silver focus:border-teal min-h-[180px] text-deep-blue placeholder:text-slate resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-soft-silver/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-soft-silver text-slate hover:bg-light-bg px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-teal hover:bg-teal/90 text-white px-6"
                >
                  {isEditing ? 'Update Escalation' : 'Create Escalation'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

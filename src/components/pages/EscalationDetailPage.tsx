
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Calendar, User, Building2, Clock, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const EscalationDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data based on escalation ID
  const escalationData = {
    '1': {
      title: 'API Performance Issues',
      customer: 'TechCorp Industries',
      projectOwner: 'Alex Rodriguez',
      dateRaised: '6/1/2024',
      resolutionETA: '6/8/2024',
      priority: 'High',
      description: 'Critical performance degradation in API response times affecting customer operations. Response times have increased by 300% over the past 48 hours, causing timeout issues for end users. Immediate investigation and resolution required.',
      impactAssessment: [
        'Customer operations severely impacted',
        'SLA breach imminent if not resolved within 24 hours',
        'Potential revenue loss of £50K per day',
        'Customer satisfaction at risk'
      ],
      actionsTaken: [
        'Infrastructure team notified and investigating',
        'Database performance analysis initiated',
        'Customer informed of ongoing investigation',
        'Backup systems activated to mitigate impact'
      ]
    },
    '2': {
      title: 'Budget Overrun Discussion',
      customer: 'InnovateCorp',
      projectOwner: 'Sarah Johnson',
      dateRaised: '6/2/2024',
      resolutionETA: '6/5/2024',
      priority: 'Medium',
      description: 'Project budget has exceeded initial estimates by 15% due to additional scope requirements and technical complexities discovered during implementation phase.',
      impactAssessment: [
        'Budget variance of 15% from original estimate',
        'Additional resources required for completion',
        'Timeline may be affected',
        'Customer approval needed for budget increase'
      ],
      actionsTaken: [
        'Budget analysis completed',
        'Scope change documentation prepared',
        'Meeting scheduled with customer stakeholders',
        'Alternative solutions being evaluated'
      ]
    },
    '3': {
      title: 'Resource Allocation Conflict',
      customer: 'GlobalTech',
      projectOwner: 'Mike Chen',
      dateRaised: '6/3/2024',
      resolutionETA: '6/10/2024',
      priority: 'Critical',
      description: 'Multiple high-priority projects are competing for the same specialized resources, causing significant delays and potential delivery risks.',
      impactAssessment: [
        'Three critical projects affected simultaneously',
        'Key specialist resources over-allocated',
        'Delivery timelines at risk',
        'Customer commitments may be breached'
      ],
      actionsTaken: [
        'Resource capacity analysis initiated',
        'Priority matrix review scheduled',
        'External contractor options being explored',
        'Customer communications planned'
      ]
    }
  };

  const escalation = escalationData[id as keyof typeof escalationData];

  if (!escalation) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-slate-800 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-teal text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
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

        {/* Main Escalation Details Card */}
        <Card className="bg-white shadow-lg mb-6">
          <CardHeader className="border-b bg-gradient-to-r from-deep-blue/5 to-teal/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-deep-blue flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Escalation Details
              </CardTitle>
              <Badge className={getPriorityColor(escalation.priority)}>
                {escalation.priority} Priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-deep-blue mb-4">{escalation.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-teal" />
                    <div>
                      <p className="text-sm text-slate">Customer</p>
                      <p className="font-semibold text-deep-blue">{escalation.customer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-teal" />
                    <div>
                      <p className="text-sm text-slate">Date Raised</p>
                      <p className="font-semibold text-deep-blue">{escalation.dateRaised}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-teal" />
                    <div>
                      <p className="text-sm text-slate">Project Owner</p>
                      <p className="font-semibold text-deep-blue">{escalation.projectOwner}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-teal" />
                    <div>
                      <p className="text-sm text-slate">Resolution ETA</p>
                      <p className="font-semibold text-deep-blue">{escalation.resolutionETA}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Escalation Details Section */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-bold text-deep-blue flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Escalation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate mb-2">Title</h3>
                <p className="text-deep-blue font-semibold">{escalation.title}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate mb-2">Description</h3>
                <p className="text-deep-blue leading-relaxed">{escalation.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate mb-3">Impact Assessment</h3>
                <ul className="space-y-2">
                  {escalation.impactAssessment.map((impact, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-teal text-sm mt-1">•</span>
                      <span className="text-deep-blue">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate mb-3">Actions Taken</h3>
                <ul className="space-y-2">
                  {escalation.actionsTaken.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-teal text-sm mt-1">•</span>
                      <span className="text-deep-blue">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

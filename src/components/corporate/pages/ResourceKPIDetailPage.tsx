
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, UserX, ArrowLeft } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate, useParams } from "react-router-dom";

const resourceData = {
  total: {
    title: "Total Resources",
    value: 156,
    description: "Complete workforce overview",
    data: [
      { name: 'Engineering', count: 85, percentage: 54.5, color: '#008080' },
      { name: 'Design', count: 28, percentage: 17.9, color: '#22356F' },
      { name: 'QA', count: 18, percentage: 11.5, color: '#37474F' },
      { name: 'Management', count: 15, percentage: 9.6, color: '#64748B' },
      { name: 'HR', count: 10, percentage: 6.4, color: '#475569' }
    ],
    details: [
      { name: 'John Smith', department: 'Engineering', role: 'Senior Developer', status: 'Active', experience: '5+ years' },
      { name: 'Sarah Johnson', department: 'Design', role: 'UI/UX Designer', status: 'Active', experience: '3+ years' },
      { name: 'Mike Chen', department: 'QA', role: 'Test Lead', status: 'Active', experience: '4+ years' },
      { name: 'Lisa Wang', department: 'Engineering', role: 'Backend Developer', status: 'Active', experience: '2+ years' },
      { name: 'David Lee', department: 'Management', role: 'Project Manager', status: 'Active', experience: '6+ years' }
    ]
  },
  billable: {
    title: "Billable Resources",
    value: 132,
    description: "Currently assigned to client projects",
    data: [
      { name: 'Client Projects', count: 132, percentage: 84.6, color: '#008080' },
      { name: 'Internal Tasks', count: 24, percentage: 15.4, color: '#22356F' }
    ],
    details: [
      { name: 'Alex Rodriguez', department: 'Engineering', role: 'Full Stack Developer', client: 'TechCorp Industries', billableRate: '$85/hr' },
      { name: 'Emily Davis', department: 'Design', role: 'Senior Designer', client: 'InnovateCorp', billableRate: '$70/hr' },
      { name: 'Tom Wilson', department: 'QA', role: 'QA Engineer', client: 'GlobalTech', billableRate: '$60/hr' },
      { name: 'Anna Smith', department: 'Engineering', role: 'Lead Developer', client: 'MegaCorp', billableRate: '$95/hr' },
      { name: 'James Brown', department: 'Management', role: 'Technical Lead', client: 'RetailTech', billableRate: '$110/hr' }
    ]
  },
  available: {
    title: "Available Resources",
    value: 24,
    description: "Ready for new project assignments",
    data: [
      { name: 'Bench', count: 15, percentage: 62.5, color: '#008080' },
      { name: 'Training', count: 6, percentage: 25, color: '#22356F' },
      { name: 'Between Projects', count: 3, percentage: 12.5, color: '#37474F' }
    ],
    details: [
      { name: 'Chris Wilson', department: 'Engineering', role: 'Junior Developer', availability: 'Immediate', skills: 'React, Node.js' },
      { name: 'Maria Garcia', department: 'Design', role: 'Graphic Designer', availability: 'Next Week', skills: 'Figma, Adobe Suite' },
      { name: 'Robert Taylor', department: 'QA', role: 'Junior Tester', availability: 'Immediate', skills: 'Manual Testing, Selenium' },
      { name: 'Jennifer Lee', department: 'Engineering', role: 'DevOps Engineer', availability: '2 Weeks', skills: 'AWS, Docker, Kubernetes' },
      { name: 'Michael Davis', department: 'Management', role: 'Business Analyst', availability: 'Immediate', skills: 'Requirements Analysis, Agile' }
    ]
  }
};

export const ResourceKPIDetailPage = () => {
  const navigate = useNavigate();
  const { kpiType } = useParams<{ kpiType: string }>();
  
  const kpiData = resourceData[kpiType as keyof typeof resourceData];

  if (!kpiData) {
    return (
      <div className="min-h-screen bg-light-bg p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-deep-blue mb-4">KPI Not Found</h2>
          <Button onClick={() => navigate('/resource-utilization')} className="bg-teal hover:bg-teal/90 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resource Utilization
          </Button>
        </Card>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate('/resource-utilization');
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBackClick}
            className="mb-4 border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resource Utilization
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal rounded-xl">
              {kpiType === 'total' && <Users className="h-8 w-8 text-white" />}
              {kpiType === 'billable' && <UserCheck className="h-8 w-8 text-white" />}
              {kpiType === 'available' && <UserX className="h-8 w-8 text-white" />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue">{kpiData.title}</h1>
              <p className="text-slate">{kpiData.description}</p>
            </div>
          </div>
        </div>

        {/* KPI Summary Card */}
        <Card className="mb-8 bg-gradient-to-r from-deep-blue to-teal text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">{kpiData.value}</h2>
                <p className="text-xl opacity-90">{kpiData.title}</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-75">Last Updated</p>
                <p className="text-lg">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts and Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Distribution Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={kpiData.data}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {kpiData.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Resource Count by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={kpiData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#008080" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Resource List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Detailed Resource Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpiData.details.map((resource, index) => (
                <div key={index} className="p-4 bg-light-bg rounded-xl border border-soft-silver/30 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-lg">
                        <Users className="h-5 w-5 text-deep-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-blue">{resource.name}</h4>
                        <p className="text-sm text-slate">{resource.department} - {resource.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {kpiType === 'billable' && (
                        <>
                          <div className="text-right">
                            <p className="text-sm text-slate">Client</p>
                            <p className="font-medium text-deep-blue">{(resource as any).client}</p>
                          </div>
                          <Badge className="bg-teal text-white">
                            {(resource as any).billableRate}
                          </Badge>
                        </>
                      )}
                      {kpiType === 'available' && (
                        <>
                          <div className="text-right">
                            <p className="text-sm text-slate">Skills</p>
                            <p className="font-medium text-deep-blue">{(resource as any).skills}</p>
                          </div>
                          <Badge className="bg-deep-blue text-white">
                            {(resource as any).availability}
                          </Badge>
                        </>
                      )}
                      {kpiType === 'total' && (
                        <Badge className="bg-teal text-white">
                          {(resource as any).experience}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

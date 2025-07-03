
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FolderOpen, Users, ArrowLeft, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { useNavigate, useParams } from "react-router-dom";

const projectResourceData = {
  'Project Alpha': {
    client: 'TechCorp Industries',
    totalResources: 8,
    budget: 450000,
    completion: 92,
    resources: [
      { name: 'John Smith', role: 'Lead Developer', status: 'Billable', hours: 160, rate: 95, department: 'Engineering', efficiency: 98 },
      { name: 'Sarah Johnson', role: 'UI Designer', status: 'Billable', hours: 140, rate: 70, department: 'Design', efficiency: 95 },
      { name: 'Mike Chen', role: 'QA Engineer', status: 'Billable', hours: 120, rate: 60, department: 'QA', efficiency: 92 },
      { name: 'Lisa Wang', role: 'Backend Developer', status: 'Billable', hours: 150, rate: 85, department: 'Engineering', efficiency: 96 },
      { name: 'David Lee', role: 'Project Manager', status: 'Billable', hours: 100, rate: 110, department: 'Management', efficiency: 94 },
      { name: 'Alex Rodriguez', role: 'DevOps Engineer', status: 'Billable', hours: 130, rate: 90, department: 'Engineering', efficiency: 97 },
      { name: 'Emily Davis', role: 'Business Analyst', status: 'Shadowing', hours: 80, rate: 0, department: 'Management', efficiency: 88 },
      { name: 'Tom Wilson', role: 'Junior Developer', status: 'Shadowing', hours: 100, rate: 0, department: 'Engineering', efficiency: 85 }
    ],
    departmentBreakdown: [
      { department: 'Engineering', count: 4, billable: 3, shadowing: 1, color: '#008080' },
      { department: 'Design', count: 1, billable: 1, shadowing: 0, color: '#22356F' },
      { department: 'QA', count: 1, billable: 1, shadowing: 0, color: '#37474F' },
      { department: 'Management', count: 2, billable: 1, shadowing: 1, color: '#64748B' }
    ],
    timeline: [
      { month: 'Jan', planned: 20, actual: 18 },
      { month: 'Feb', planned: 25, actual: 28 },
      { month: 'Mar', planned: 30, actual: 32 },
      { month: 'Apr', planned: 25, actual: 24 }
    ]
  },
  'Beta Platform': {
    client: 'InnovateCorp',
    totalResources: 5,
    budget: 280000,
    completion: 78,
    resources: [
      { name: 'Anna Smith', role: 'Full Stack Developer', status: 'Billable', hours: 160, rate: 85, department: 'Engineering', efficiency: 94 },
      { name: 'James Brown', role: 'UI/UX Designer', status: 'Billable', hours: 140, rate: 75, department: 'Design', efficiency: 91 },
      { name: 'Robert Taylor', role: 'QA Lead', status: 'Billable', hours: 120, rate: 70, department: 'QA', efficiency: 89 },
      { name: 'Maria Garcia', role: 'Project Coordinator', status: 'Billable', hours: 100, rate: 65, department: 'Management', efficiency: 87 },
      { name: 'Chris Wilson', role: 'Junior QA', status: 'Shadowing', hours: 80, rate: 0, department: 'QA', efficiency: 82 }
    ],
    departmentBreakdown: [
      { department: 'Engineering', count: 1, billable: 1, shadowing: 0, color: '#008080' },
      { department: 'Design', count: 1, billable: 1, shadowing: 0, color: '#22356F' },
      { department: 'QA', count: 2, billable: 1, shadowing: 1, color: '#37474F' },
      { department: 'Management', count: 1, billable: 1, shadowing: 0, color: '#64748B' }
    ],
    timeline: [
      { month: 'Jan', planned: 15, actual: 12 },
      { month: 'Feb', planned: 20, actual: 22 },
      { month: 'Mar', planned: 25, actual: 23 },
      { month: 'Apr', planned: 20, actual: 21 }
    ]
  },
  'Customer Portal': {
    client: 'GlobalTech',
    totalResources: 3,
    budget: 150000,
    completion: 95,
    resources: [
      { name: 'Jennifer Lee', role: 'Senior Developer', status: 'Billable', hours: 160, rate: 90, department: 'Engineering', efficiency: 97 },
      { name: 'Michael Davis', role: 'Frontend Specialist', status: 'Billable', hours: 140, rate: 80, department: 'Engineering', efficiency: 93 },
      { name: 'Patricia Brown', role: 'UX Designer', status: 'Shadowing', hours: 100, rate: 0, department: 'Design', efficiency: 86 }
    ],
    departmentBreakdown: [
      { department: 'Engineering', count: 2, billable: 2, shadowing: 0, color: '#008080' },
      { department: 'Design', count: 1, billable: 0, shadowing: 1, color: '#22356F' }
    ],
    timeline: [
      { month: 'Jan', planned: 10, actual: 12 },
      { month: 'Feb', planned: 15, actual: 16 },
      { month: 'Mar', planned: 18, actual: 19 },
      { month: 'Apr', planned: 12, actual: 13 }
    ]
  }
};

export const ProjectResourceDetailPage = () => {
  const navigate = useNavigate();
  const { projectName } = useParams<{ projectName: string }>();
  
  const decodedProjectName = decodeURIComponent(projectName || '');
  const projectData = projectResourceData[decodedProjectName as keyof typeof projectResourceData];

  if (!projectData) {
    return (
      <div className="min-h-screen bg-light-bg p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-deep-blue mb-4">Project Not Found</h2>
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

  const billableResources = projectData.resources.filter(r => r.status === 'Billable').length;
  const shadowingResources = projectData.resources.filter(r => r.status === 'Shadowing').length;
  const totalBillableHours = projectData.resources.filter(r => r.status === 'Billable').reduce((sum, r) => sum + r.hours, 0);
  const totalRevenue = projectData.resources.filter(r => r.status === 'Billable').reduce((sum, r) => sum + (r.hours * r.rate), 0);

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
            <div className="p-3 bg-deep-blue rounded-xl">
              <FolderOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue">{decodedProjectName}</h1>
              <p className="text-slate">Resource allocation and performance details for {projectData.client}</p>
            </div>
          </div>
        </div>

        {/* Project Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Resources</p>
                  <p className="text-3xl font-bold">{projectData.totalResources}</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Billable</p>
                  <p className="text-3xl font-bold">{billableResources}</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Hours</p>
                  <p className="text-3xl font-bold">{totalBillableHours}</p>
                </div>
                <Calendar className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-charcoal to-slate text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Revenue</p>
                  <p className="text-3xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectData.departmentBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ department, count }) => `${department}: ${count}`}
                    >
                      {projectData.departmentBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Resource Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Resource Allocation Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectData.timeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="planned" stroke="#22356F" name="Planned" />
                    <Line type="monotone" dataKey="actual" stroke="#008080" name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Resource List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Project Team Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-soft-silver/30">
                    <th className="text-left p-3 text-slate font-medium">Name</th>
                    <th className="text-left p-3 text-slate font-medium">Role</th>
                    <th className="text-left p-3 text-slate font-medium">Department</th>
                    <th className="text-left p-3 text-slate font-medium">Status</th>
                    <th className="text-left p-3 text-slate font-medium">Hours</th>
                    <th className="text-left p-3 text-slate font-medium">Rate</th>
                    <th className="text-left p-3 text-slate font-medium">Efficiency</th>
                    <th className="text-left p-3 text-slate font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.resources.map((resource, index) => (
                    <tr key={index} className="border-b border-soft-silver/20 hover:bg-light-bg">
                      <td className="p-3">
                        <div className="font-semibold text-deep-blue">{resource.name}</div>
                      </td>
                      <td className="p-3 text-slate">{resource.role}</td>
                      <td className="p-3 text-slate">{resource.department}</td>
                      <td className="p-3">
                        <Badge 
                          className={resource.status === 'Billable' ? 'bg-teal text-white' : 'bg-deep-blue text-white'}
                        >
                          {resource.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-slate">{resource.hours}h</td>
                      <td className="p-3 text-slate">
                        {resource.status === 'Billable' ? `$${resource.rate}/hr` : 'N/A'}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Progress value={resource.efficiency} className="w-16 h-2" />
                          <span className="text-sm text-slate">{resource.efficiency}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate">
                        {resource.status === 'Billable' ? `$${(resource.hours * resource.rate).toLocaleString()}` : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

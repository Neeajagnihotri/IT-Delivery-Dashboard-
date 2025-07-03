
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, UserCheck, UserX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const resourceData = [
  { name: 'Billable', value: 132, color: '#008080' },
  { name: 'Benched', value: 24, color: '#22356F' }
];

const departmentData = [
  { department: 'Engineering', billable: 72, benched: 8 },
  { department: 'QA', billable: 22, benched: 4 },
  { department: 'Design', billable: 15, benched: 3 },
  { department: 'Management', billable: 12, benched: 2 },
  { department: 'DevOps', billable: 8, benched: 4 },
  { department: 'BA', billable: 3, benched: 3 }
];

export const ResourceUtilizationDetail = () => {
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const totalResources = 156;
  const billableResources = 132;
  const benchedResources = 24;

  const handleKPIClick = (kpiType: string) => {
    if (kpiType === 'total') {
      navigate('/resource-kpi/total');
    } else if (kpiType === 'billable') {
      setSelectedKPI('billable');
    } else if (kpiType === 'benched') {
      navigate('/benched-resources');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-deep-blue mb-2">Resource Utilization</h1>
            <p className="text-slate">Comprehensive view of resource allocation and utilization</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* KPI Cards with Zapcom Colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-deep-blue to-charcoal text-white"
            onClick={() => handleKPIClick('total')}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{totalResources}</div>
              <div className="text-sm text-white/80">Total Resources</div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-teal to-deep-blue text-white"
            onClick={() => handleKPIClick('billable')}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{billableResources}</div>
              <div className="text-sm text-white/80">Billable Resources</div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-slate to-charcoal text-white"
            onClick={() => handleKPIClick('benched')}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <UserX className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{benchedResources}</div>
              <div className="text-sm text-white/80">Benched Resources</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resource Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Resource Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                    >
                      {resourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Department Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="billable" fill="#008080" name="Billable" />
                    <Bar dataKey="benched" fill="#22356F" name="Benched" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project-wise Resource Breakdown (only when Billable Resources is clicked) */}
        {selectedKPI === 'billable' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Project-wise Resource Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { project: "Project Alpha", allocated: 12, utilization: "95%" },
                  { project: "Beta Platform", allocated: 8, utilization: "88%" },
                  { project: "Customer Portal", allocated: 6, utilization: "92%" },
                  { project: "Mobile App Revamp", allocated: 10, utilization: "87%" },
                  { project: "Security Audit", allocated: 5, utilization: "90%" }
                ].map((project, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/project-resources/${encodeURIComponent(project.project)}`)}
                  >
                    <div>
                      <h4 className="font-semibold text-deep-blue">{project.project}</h4>
                      <p className="text-sm text-slate">{project.allocated} resources allocated</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-teal text-white">{project.utilization}</Badge>
                      <p className="text-xs text-slate mt-1">Utilization</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

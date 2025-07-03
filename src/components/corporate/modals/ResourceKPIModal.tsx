
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, Target, Clock, Award, Building } from "lucide-react";

interface ResourceKPIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const utilizationData = [
  { department: 'Engineering', billable: 78, available: 7, utilization: 91.8 },
  { department: 'QA', billable: 29, available: 3, utilization: 90.6 },
  { department: 'Design', billable: 22, available: 2, utilization: 91.7 },
  { department: 'DevOps', billable: 16, available: 2, utilization: 88.9 },
  { department: 'Management', billable: 22, available: 6, utilization: 78.6 }
];

const skillDistribution = [
  { skill: 'Frontend', count: 45, fill: '#22356F' },
  { skill: 'Backend', count: 52, fill: '#008080' },
  { skill: 'Full Stack', count: 38, fill: '#37474F' },
  { skill: 'Mobile', count: 28, fill: '#475569' },
  { skill: 'Data Science', count: 15, fill: '#64748B' },
  { skill: 'DevOps', count: 18, fill: '#94A3B8' }
];

const performanceMetrics = [
  { metric: 'Productivity Score', value: 91.8, target: 85, status: 'excellent' },
  { metric: 'Client Satisfaction', value: 94.5, target: 90, status: 'excellent' },
  { metric: 'Project Delivery', value: 87.2, target: 85, status: 'good' },
  { metric: 'Innovation Index', value: 83.4, target: 80, status: 'good' }
];

export const ResourceKPIModal = ({ open, onOpenChange }: ResourceKPIModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-teal text-white';
      case 'good': return 'bg-deep-blue text-white';
      default: return 'bg-slate text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-deep-blue flex items-center gap-3">
            <div className="p-2 bg-charcoal rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            Resource Utilization Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-charcoal to-slate text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Resources</p>
                    <p className="text-3xl font-bold">187</p>
                  </div>
                  <Users className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Utilization Rate</p>
                    <p className="text-3xl font-bold">89.2%</p>
                  </div>
                  <Target className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Billable Resources</p>
                    <p className="text-3xl font-bold">167</p>
                  </div>
                  <Award className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Available</p>
                    <p className="text-3xl font-bold">20</p>
                  </div>
                  <Clock className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Utilization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Department Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={utilizationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="billable" fill="#008080" name="Billable" />
                      <Bar dataKey="available" fill="#37474F" name="Available" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Skill Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Skill Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ skill, count }) => `${skill}: ${count}`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Resource Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {performanceMetrics.map((metric) => (
                  <div key={metric.metric} className="p-4 bg-light-bg rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-deep-blue">{metric.metric}</h4>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {metric.value}%</span>
                        <span>Target: {metric.target}%</span>
                      </div>
                      <Progress value={metric.value} className="h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Department Resource Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {utilizationData.map((dept) => (
                  <div key={dept.department} className="p-4 border border-deep-blue/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-deep-blue">{dept.department}</h4>
                      <Badge className="bg-teal text-white">
                        {dept.utilization}% Utilization
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-slate">Total</p>
                        <p className="text-xl font-bold text-deep-blue">{dept.billable + dept.available}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate">Billable</p>
                        <p className="text-xl font-bold text-teal">{dept.billable}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate">Available</p>
                        <p className="text-xl font-bold text-slate">{dept.available}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

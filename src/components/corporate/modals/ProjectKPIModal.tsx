
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { FolderOpen, TrendingUp, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react";

interface ProjectKPIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const projectHealthData = [
  { status: 'Green', count: 18, fill: '#008080' },
  { status: 'Yellow', count: 4, fill: '#F59E0B' },
  { status: 'Red', count: 2, fill: '#EF4444' }
];

const projectProgressData = [
  { month: 'Jan', completed: 8, inProgress: 12, planned: 4 },
  { month: 'Feb', completed: 10, inProgress: 10, planned: 4 },
  { month: 'Mar', completed: 12, inProgress: 8, planned: 4 },
  { month: 'Apr', completed: 15, inProgress: 7, planned: 2 },
  { month: 'May', completed: 18, inProgress: 5, planned: 1 },
  { month: 'Jun', completed: 20, inProgress: 4, planned: 0 }
];

const departmentProjects = [
  { department: 'Engineering', active: 12, completed: 45, budget: 2400000 },
  { department: 'Design', active: 6, completed: 23, budget: 890000 },
  { department: 'Marketing', active: 4, completed: 18, budget: 650000 },
  { department: 'DevOps', active: 2, completed: 12, budget: 420000 }
];

export const ProjectKPIModal = ({ open, onOpenChange }: ProjectKPIModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-deep-blue flex items-center gap-3">
            <div className="p-2 bg-deep-blue rounded-xl">
              <FolderOpen className="h-6 w-6 text-white" />
            </div>
            Project Portfolio Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Projects</p>
                    <p className="text-3xl font-bold">24</p>
                  </div>
                  <FolderOpen className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Completion Rate</p>
                    <p className="text-3xl font-bold">83%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-charcoal to-slate text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Avg Duration</p>
                    <p className="text-3xl font-bold">4.2M</p>
                    <p className="text-xs opacity-75">months</p>
                  </div>
                  <Clock className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Budget Efficiency</p>
                    <p className="text-3xl font-bold">92%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Health Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Project Health Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectHealthData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ status, count }) => `${status}: ${count}`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Project Progress Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Project Progress Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completed" stroke="#008080" strokeWidth={3} />
                      <Line type="monotone" dataKey="inProgress" stroke="#22356F" strokeWidth={2} />
                      <Line type="monotone" dataKey="planned" stroke="#37474F" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Projects Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue flex items-center gap-2">
                <Users className="h-5 w-5" />
                Projects by Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentProjects.map((dept) => (
                  <div key={dept.department} className="p-4 bg-light-bg rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-deep-blue">{dept.department}</h4>
                      <Badge className="bg-teal text-white">
                        ${(dept.budget / 1000000).toFixed(1)}M Budget
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate">Active Projects</p>
                        <p className="text-2xl font-bold text-deep-blue">{dept.active}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate">Completed Projects</p>
                        <p className="text-2xl font-bold text-teal">{dept.completed}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion Rate</span>
                        <span>{Math.round((dept.completed / (dept.completed + dept.active)) * 100)}%</span>
                      </div>
                      <Progress value={Math.round((dept.completed / (dept.completed + dept.active)) * 100)} />
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

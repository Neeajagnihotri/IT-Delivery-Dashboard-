
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, Clock, AlertTriangle, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const deliverablesList = [
  { id: 1, name: "User Authentication Module", project: "E-commerce Platform", status: "Completed", dueDate: "2024-01-15", completedDate: "2024-01-12", priority: "High" },
  { id: 2, name: "Payment Gateway Integration", project: "E-commerce Platform", status: "In Progress", dueDate: "2024-02-01", completedDate: null, priority: "Critical" },
  { id: 3, name: "Mobile App UI Design", project: "Mobile Banking App", status: "Delayed", dueDate: "2024-01-20", completedDate: null, priority: "Medium" },
  { id: 4, name: "Security Audit Report", project: "Security Audit System", status: "Overdue", dueDate: "2024-01-10", completedDate: null, priority: "Critical" },
  { id: 5, name: "Customer Dashboard", project: "Customer Portal", status: "Completed", dueDate: "2024-01-25", completedDate: "2024-01-23", priority: "High" }
];

const statusData = [
  { status: 'Completed', count: 32, fill: '#008080' },
  { status: 'In Progress', count: 10, fill: '#22356F' },
  { status: 'Delayed', count: 6, fill: '#37474F' },
  { status: 'Overdue', count: 4, fill: '#475569' }
];

const monthlyData = [
  { month: 'Jan', completed: 12, delayed: 2, overdue: 1 },
  { month: 'Feb', completed: 15, delayed: 3, overdue: 2 },
  { month: 'Mar', completed: 18, delayed: 1, overdue: 1 },
  { month: 'Apr', completed: 20, delayed: 2, overdue: 0 }
];

export const DeliverablesDetail = () => {
  const getStatusBadge = (status: string) => {
    const variants = {
      Completed: 'bg-teal text-white',
      'In Progress': 'bg-deep-blue text-white',
      Delayed: 'bg-slate text-white',
      Overdue: 'bg-charcoal text-white'
    };
    return variants[status as keyof typeof variants] || 'bg-slate text-white';
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      Critical: 'bg-charcoal text-white',
      High: 'bg-deep-blue text-white',
      Medium: 'bg-slate text-white',
      Low: 'bg-teal text-white'
    };
    return variants[priority as keyof typeof variants] || 'bg-slate text-white';
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-deep-blue rounded-xl">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue">Deliverables</h1>
              <p className="text-slate">Comprehensive tracking of all project deliverables</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Deliverables</p>
                  <p className="text-3xl font-bold">52</p>
                </div>
                <Target className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Completed</p>
                  <p className="text-3xl font-bold">32</p>
                  <p className="text-xs opacity-75">61.5%</p>
                </div>
                <CheckCircle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">In Progress</p>
                  <p className="text-3xl font-bold">10</p>
                  <p className="text-xs opacity-75">19.2%</p>
                </div>
                <Clock className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-charcoal to-slate text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Overdue</p>
                  <p className="text-3xl font-bold">4</p>
                  <p className="text-xs opacity-75">7.7%</p>
                </div>
                <AlertTriangle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
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

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Monthly Deliverable Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#008080" name="Completed" />
                    <Bar dataKey="delayed" fill="#37474F" name="Delayed" />
                    <Bar dataKey="overdue" fill="#475569" name="Overdue" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deliverables List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Recent Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliverablesList.map((deliverable) => (
                <div key={deliverable.id} className="p-6 bg-white rounded-xl border border-soft-silver">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-deep-blue">{deliverable.name}</h4>
                    <div className="flex gap-2">
                      <Badge className={getPriorityBadge(deliverable.priority)}>
                        {deliverable.priority}
                      </Badge>
                      <Badge className={getStatusBadge(deliverable.status)}>
                        {deliverable.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate">Project</p>
                      <p className="font-medium text-deep-blue">{deliverable.project}</p>
                    </div>
                    <div>
                      <p className="text-slate">Due Date</p>
                      <p className="font-medium text-deep-blue flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {deliverable.dueDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate">Completed Date</p>
                      <p className="font-medium text-deep-blue">
                        {deliverable.completedDate || 'Not completed'}
                      </p>
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

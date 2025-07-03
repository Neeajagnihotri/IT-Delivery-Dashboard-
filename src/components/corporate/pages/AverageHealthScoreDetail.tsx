
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowLeft, Activity, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

const healthScoreData = [
  { name: 'Excellent', value: 8, color: '#008080' },
  { name: 'Good', value: 6, color: '#22356F' },
  { name: 'Fair', value: 3, color: '#37474F' },
  { name: 'Poor', value: 1, color: '#64748B' }
];

const projectHealthData = [
  { project: 'E-commerce Platform', score: 92, status: 'Excellent', team: 12 },
  { project: 'Mobile Banking App', score: 89, status: 'Excellent', team: 8 },
  { project: 'Customer Portal', score: 85, status: 'Good', team: 6 },
  { project: 'Security Audit System', score: 82, status: 'Good', team: 10 },
  { project: 'Data Analytics Dashboard', score: 78, status: 'Good', team: 7 },
  { project: 'Legacy System Migration', score: 65, status: 'Fair', team: 9 }
];

const monthlyTrendData = [
  { month: 'Jan', score: 82.5 },
  { month: 'Feb', score: 84.2 },
  { month: 'Mar', score: 86.1 },
  { month: 'Apr', score: 87.5 },
  { month: 'May', score: 88.3 },
  { month: 'Jun', score: 87.5 }
];

export const AverageHealthScoreDetail = () => {
  const navigate = useNavigate();

  const getHealthBadge = (status: string) => {
    const variants = {
      Excellent: 'bg-teal text-white',
      Good: 'bg-deep-blue text-white',
      Fair: 'bg-slate text-white',
      Poor: 'bg-charcoal text-white'
    };
    return variants[status as keyof typeof variants] || 'bg-slate text-white';
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-deep-blue mb-2">Average Health Score</h1>
            <p className="text-slate">Comprehensive analysis of project health across the organization</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">87.5%</div>
              <div className="text-sm opacity-90">Overall Health Score</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-deep-blue to-slate text-white">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">14</div>
              <div className="text-sm opacity-90">Healthy Projects</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-sm opacity-90">At Risk Projects</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-charcoal to-deep-blue text-white">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">+2.8%</div>
              <div className="text-sm opacity-90">Improvement This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Health Score Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Health Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthScoreData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {healthScoreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Health Score Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[75, 90]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#008080" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Health Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Project Health Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectHealthData.map((project, index) => (
                <div key={index} className="p-4 bg-light-bg rounded-xl border border-soft-silver/30 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-deep-blue mb-1">{project.project}</h4>
                      <p className="text-sm text-slate">{project.team} team members</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-deep-blue">{project.score}%</div>
                        <div className="text-xs text-slate">Health Score</div>
                      </div>
                      <Badge className={getHealthBadge(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-soft-silver/30 rounded-full h-2">
                    <div 
                      className="bg-teal h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.score}%` }}
                    ></div>
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

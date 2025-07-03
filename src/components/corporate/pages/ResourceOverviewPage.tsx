
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Users, Calendar, Award, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const utilizationData = [
  { month: 'Jan', utilization: 85, target: 80 },
  { month: 'Feb', utilization: 88, target: 80 },
  { month: 'Mar', utilization: 82, target: 80 },
  { month: 'Apr', utilization: 91, target: 80 },
  { month: 'May', utilization: 87, target: 80 },
  { month: 'Jun', utilization: 89, target: 80 }
];

const departmentData = [
  { name: 'Engineering', value: 45, color: '#22356F' },
  { name: 'QA', value: 25, color: '#008080' },
  { name: 'DevOps', value: 15, color: '#374B4F' },
  { name: 'Design', value: 15, color: '#23272F' }
];

const benchData = [
  { duration: '< 1 week', count: 8, cost: 12000 },
  { duration: '1-2 weeks', count: 12, cost: 24000 },
  { duration: '2-4 weeks', count: 10, cost: 30000 },
  { duration: '> 1 month', count: 4, cost: 18000 }
];

export const ResourceOverviewPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-charcoal to-deep-blue rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Resource Analytics Overview</h1>
              <p className="text-slate">Comprehensive resource analytics and insights</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Utilization Rate</p>
                  <p className="text-2xl font-bold text-deep-blue">87%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-teal mr-1" />
                    <span className="text-xs text-teal">+5% vs target</span>
                  </div>
                </div>
                <div className="p-3 bg-deep-blue rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Billability Ratio</p>
                  <p className="text-2xl font-bold text-teal">76.5%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-teal mr-1" />
                    <span className="text-xs text-teal">+2.1% this month</span>
                  </div>
                </div>
                <div className="p-3 bg-teal rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-slate/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Training Completion</p>
                  <p className="text-2xl font-bold text-slate">92%</p>
                  <div className="flex items-center mt-1">
                    <Award className="h-3 w-3 text-slate mr-1" />
                    <span className="text-xs text-slate">18 certifications</span>
                  </div>
                </div>
                <div className="p-3 bg-slate rounded-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-charcoal/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Upcoming Roll-offs</p>
                  <p className="text-2xl font-bold text-charcoal">12</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-3 w-3 text-charcoal mr-1" />
                    <span className="text-xs text-charcoal">Next 30 days</span>
                  </div>
                </div>
                <div className="p-3 bg-charcoal rounded-xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Utilization Trends */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Resource Utilization Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={utilizationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#374B4F" />
                    <YAxis stroke="#374B4F" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #22356F',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="utilization" stroke="#22356F" strokeWidth={3} />
                    <Line type="monotone" dataKey="target" stroke="#008080" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Department Analysis */}
          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Department-level Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bench Impact Analysis */}
        <Card className="bg-white rounded-2xl shadow-lg border border-slate/20 mb-8">
          <CardHeader>
            <CardTitle className="text-deep-blue flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-slate" />
              Bench Impact Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {benchData.map((item, index) => (
                <div key={index} className="p-4 bg-light-bg rounded-xl border border-slate/20">
                  <div className="text-lg font-semibold text-deep-blue mb-1">{item.count}</div>
                  <div className="text-sm text-slate mb-2">{item.duration}</div>
                  <div className="text-xs text-charcoal font-medium">
                    Cost: ${item.cost.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={benchData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="duration" stroke="#374B4F" />
                  <YAxis stroke="#374B4F" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff',
                      border: '1px solid #22356F',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#374B4F" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Export & Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-deep-blue hover:bg-deep-blue/90">
                Export Resource Summary
              </Button>
              <Button variant="outline" className="border-teal text-teal hover:bg-teal/5">
                Generate Utilization Report
              </Button>
              <Button variant="outline" className="border-slate text-slate hover:bg-slate/5">
                Download Bench Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

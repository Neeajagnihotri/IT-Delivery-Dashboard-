
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Target } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

const projectFinancialDetails = {
  'E-commerce Platform': {
    name: 'E-commerce Platform',
    client: 'TechCorp Industries',
    budget: 450000,
    spent: 380000,
    revenue: 520000,
    profit: 140000,
    status: 'On Track',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    monthlySpend: [
      { month: 'Jan', planned: 75000, actual: 72000 },
      { month: 'Feb', planned: 80000, actual: 78000 },
      { month: 'Mar', planned: 75000, actual: 73000 },
      { month: 'Apr', planned: 85000, actual: 82000 },
      { month: 'May', planned: 90000, actual: 87500 },
      { month: 'Jun', planned: 95000, actual: 90000 }
    ],
    costBreakdown: [
      { category: 'Development', amount: 180000, color: '#22356F' },
      { category: 'QA Testing', amount: 75000, color: '#008080' },
      { category: 'Management', amount: 65000, color: '#23272F' },
      { category: 'Infrastructure', amount: 42500, color: '#37474F' },
      { category: 'Other', amount: 17500, color: '#B0BEC5' }
    ]
  },
  'Mobile Banking App': {
    name: 'Mobile Banking App',
    client: 'Financial Services Inc',
    budget: 320000,
    spent: 285000,
    revenue: 390000,
    profit: 105000,
    status: 'On Track',
    startDate: '2024-02-01',
    endDate: '2024-07-15',
    monthlySpend: [
      { month: 'Feb', planned: 55000, actual: 52000 },
      { month: 'Mar', planned: 60000, actual: 58000 },
      { month: 'Apr', planned: 65000, actual: 63000 },
      { month: 'May', planned: 70000, actual: 67000 },
      { month: 'Jun', planned: 75000, actual: 72000 }
    ],
    costBreakdown: [
      { category: 'Development', amount: 140000, color: '#22356F' },
      { category: 'QA Testing', amount: 65000, color: '#008080' },
      { category: 'Management', amount: 45000, color: '#23272F' },
      { category: 'Infrastructure', amount: 25000, color: '#37474F' },
      { category: 'Other', amount: 10000, color: '#B0BEC5' }
    ]
  },
  'Customer Portal': {
    name: 'Customer Portal',
    client: 'Service Corp',
    budget: 180000,
    spent: 165000,
    revenue: 220000,
    profit: 55000,
    status: 'Completed',
    startDate: '2024-01-01',
    endDate: '2024-04-30',
    monthlySpend: [
      { month: 'Jan', planned: 45000, actual: 42000 },
      { month: 'Feb', planned: 50000, actual: 48000 },
      { month: 'Mar', planned: 50000, actual: 47000 },
      { month: 'Apr', planned: 45000, actual: 43000 }
    ],
    costBreakdown: [
      { category: 'Development', amount: 85000, color: '#22356F' },
      { category: 'QA Testing', amount: 35000, color: '#008080' },
      { category: 'Management', amount: 25000, color: '#23272F' },
      { category: 'Infrastructure', amount: 15000, color: '#37474F' },
      { category: 'Other', amount: 5000, color: '#B0BEC5' }
    ]
  },
  'Security Audit System': {
    name: 'Security Audit System',
    client: 'SecureTech Ltd',
    budget: 280000,
    spent: 240000,
    revenue: 310000,
    profit: 70000,
    status: 'On Track',
    startDate: '2024-03-01',
    endDate: '2024-08-15',
    monthlySpend: [
      { month: 'Mar', planned: 48000, actual: 45000 },
      { month: 'Apr', planned: 52000, actual: 50000 },
      { month: 'May', planned: 55000, actual: 53000 },
      { month: 'Jun', planned: 58000, actual: 56000 }
    ],
    costBreakdown: [
      { category: 'Development', amount: 120000, color: '#22356F' },
      { category: 'QA Testing', amount: 55000, color: '#008080' },
      { category: 'Management', amount: 35000, color: '#23272F' },
      { category: 'Infrastructure', amount: 20000, color: '#37474F' },
      { category: 'Other', amount: 10000, color: '#B0BEC5' }
    ]
  },
  'Data Analytics Dashboard': {
    name: 'Data Analytics Dashboard',
    client: 'Analytics Pro',
    budget: 220000,
    spent: 195000,
    revenue: 275000,
    profit: 80000,
    status: 'On Track',
    startDate: '2024-02-15',
    endDate: '2024-07-30',
    monthlySpend: [
      { month: 'Feb', planned: 35000, actual: 33000 },
      { month: 'Mar', planned: 40000, actual: 38000 },
      { month: 'Apr', planned: 42000, actual: 40000 },
      { month: 'May', planned: 45000, actual: 43000 },
      { month: 'Jun', planned: 48000, actual: 46000 }
    ],
    costBreakdown: [
      { category: 'Development', amount: 95000, color: '#22356F' },
      { category: 'QA Testing', amount: 45000, color: '#008080' },
      { category: 'Management', amount: 30000, color: '#23272F' },
      { category: 'Infrastructure', amount: 18000, color: '#37474F' },
      { category: 'Other', amount: 7000, color: '#B0BEC5' }
    ]
  }
};

export const ProjectFinancialDetail = () => {
  const navigate = useNavigate();
  const { projectName } = useParams<{ projectName: string }>();
  
  const decodedProjectName = decodeURIComponent(projectName || '');
  const project = projectFinancialDetails[decodedProjectName as keyof typeof projectFinancialDetails];

  if (!project) {
    return (
      <div className="min-h-screen bg-light-bg p-6 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-deep-blue mb-4">Project Not Found</h2>
          <Button onClick={() => navigate('/financial-health')} className="bg-teal hover:bg-teal/90 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Financial Health
          </Button>
        </Card>
      </div>
    );
  }

  const profitMargin = ((project.profit / project.revenue) * 100).toFixed(1);
  const budgetUtilization = ((project.spent / project.budget) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-deep-blue mb-2">{project.name} - Financial Details</h1>
            <p className="text-slate">{project.client} • {project.startDate} to {project.endDate}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/financial-health')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Financial Health
          </Button>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Target className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">
                ${(project.budget / 1000).toFixed(0)}K
              </div>
              <div className="text-sm opacity-90">Total Budget</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal to-charcoal text-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">
                ${(project.spent / 1000).toFixed(0)}K
              </div>
              <div className="text-sm opacity-90">Amount Spent</div>
              <div className="text-xs opacity-75 mt-1">{budgetUtilization}% of budget</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-charcoal to-slate text-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">
                ${(project.revenue / 1000).toFixed(0)}K
              </div>
              <div className="text-sm opacity-90">Total Revenue</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate to-deep-blue text-white">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold mb-2">
                ${(project.profit / 1000).toFixed(0)}K
              </div>
              <div className="text-sm opacity-90">Net Profit</div>
              <div className="text-xs opacity-75 mt-1">{profitMargin}% margin</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Spend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Monthly Spend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={project.monthlySpend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${(value as number / 1000).toFixed(0)}K`} />
                    <Line type="monotone" dataKey="planned" stroke="#37474F" strokeDasharray="5 5" name="Planned" />
                    <Line type="monotone" dataKey="actual" stroke="#008080" strokeWidth={2} name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={project.costBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={80}
                      dataKey="amount"
                      label={({ category, amount }) => `${category}: $${(amount / 1000).toFixed(0)}K`}
                    >
                      {project.costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${(value as number / 1000).toFixed(0)}K`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Cost Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.costBreakdown.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-light-bg rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="font-medium text-deep-blue">{category.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-deep-blue">
                      ${(category.amount / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-slate">
                      {((category.amount / project.spent) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Project Status & Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-light-bg rounded-lg">
              <div>
                <h4 className="font-semibold text-deep-blue">Current Status</h4>
                <p className="text-sm text-slate">Project is progressing as planned</p>
              </div>
              <Badge className="bg-teal text-white">{project.status}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

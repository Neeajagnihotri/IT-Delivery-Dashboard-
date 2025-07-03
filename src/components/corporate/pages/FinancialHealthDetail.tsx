
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowLeft, TrendingUp, TrendingDown, Calculator, PiggyBank, CreditCard, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

const budgetData = [
  { name: 'Spent', value: 1820000, color: '#008080' },
  { name: 'Remaining', value: 630000, color: '#22356F' }
];

const revenueData = [
  { month: 'Jan', actual: 245000, expected: 250000 },
  { month: 'Feb', actual: 268000, expected: 265000 },
  { month: 'Mar', actual: 289000, expected: 280000 },
  { month: 'Apr', actual: 312000, expected: 295000 },
  { month: 'May', actual: 298000, expected: 310000 },
  { month: 'Jun', actual: 325000, expected: 320000 }
];

const projectFinancials = [
  { project: 'E-commerce Platform', budget: 450000, spent: 380000, revenue: 520000, profit: 140000 },
  { project: 'Mobile Banking App', budget: 320000, spent: 285000, revenue: 390000, profit: 105000 },
  { project: 'Customer Portal', budget: 180000, spent: 165000, revenue: 220000, profit: 55000 },
  { project: 'Security Audit System', budget: 280000, spent: 240000, revenue: 310000, profit: 70000 },
  { project: 'Data Analytics Dashboard', budget: 220000, spent: 195000, revenue: 275000, profit: 80000 }
];

export const FinancialHealthDetail = () => {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleProjectClick = (projectName: string) => {
    navigate(`/project-financial/${encodeURIComponent(projectName)}`);
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-deep-blue mb-2">Financial Health</h1>
            <p className="text-slate">Comprehensive financial overview and project profitability analysis</p>
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
            <CardContent className="p-4 text-center">
              <PiggyBank className="h-6 w-6 mx-auto mb-2" />
              <div className="text-lg font-bold mb-1">{formatCurrency(2450000)}</div>
              <div className="text-xs opacity-90">Total Budget</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
            <CardContent className="p-4 text-center">
              <CreditCard className="h-6 w-6 mx-auto mb-2" />
              <div className="text-lg font-bold mb-1">{formatCurrency(1820000)}</div>
              <div className="text-xs opacity-90">Total Spent</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2" />
              <div className="text-lg font-bold mb-1">{formatCurrency(1937000)}</div>
              <div className="text-xs opacity-90">Actual Revenue</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-charcoal to-slate text-white">
            <CardContent className="p-4 text-center">
              <Calculator className="h-6 w-6 mx-auto mb-2" />
              <div className="text-lg font-bold mb-1">{formatCurrency(1920000)}</div>
              <div className="text-xs opacity-90">Expected Revenue</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-deep-blue to-charcoal text-white">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 mx-auto mb-2" />
              <div className="text-lg font-bold mb-1">{formatCurrency(450000)}</div>
              <div className="text-xs opacity-90">Total Profit</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-charcoal to-teal text-white">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2" />
              <div className="text-lg font-bold mb-1">{formatCurrency(120000)}</div>
              <div className="text-xs opacity-90">Bench Cost</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Budget Allocation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Budget Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line type="monotone" dataKey="actual" stroke="#008080" strokeWidth={2} name="Actual" />
                    <Line type="monotone" dataKey="expected" stroke="#22356F" strokeWidth={2} strokeDasharray="5 5" name="Expected" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Project Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectFinancials.map((project, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white rounded-xl border border-soft-silver cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProjectClick(project.project)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-deep-blue hover:text-teal transition-colors">
                      {project.project}
                    </h4>
                    <Badge className="bg-teal text-white">
                      Click for Details
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate">Budget</p>
                      <p className="font-bold text-deep-blue">{formatCurrency(project.budget)}</p>
                    </div>
                    <div>
                      <p className="text-slate">Spent</p>
                      <p className="font-bold text-deep-blue">{formatCurrency(project.spent)}</p>
                    </div>
                    <div>
                      <p className="text-slate">Revenue</p>
                      <p className="font-bold text-deep-blue">{formatCurrency(project.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-slate">Profit</p>
                      <p className="font-bold text-teal">{formatCurrency(project.profit)}</p>
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


import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, Target, PieChart as PieChartIcon, BarChart3, AlertCircle } from "lucide-react";

interface FinancialKPIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const revenueData = [
  { month: 'Jan', revenue: 320000, expenses: 245000, profit: 75000 },
  { month: 'Feb', revenue: 340000, expenses: 255000, profit: 85000 },
  { month: 'Mar', revenue: 360000, expenses: 270000, profit: 90000 },
  { month: 'Apr', revenue: 380000, expenses: 285000, profit: 95000 },
  { month: 'May', revenue: 420000, expenses: 310000, profit: 110000 },
  { month: 'Jun', revenue: 450000, expenses: 325000, profit: 125000 }
];

const costBreakdown = [
  { category: 'Salaries', amount: 2100000, percentage: 61.8, fill: '#22356F' },
  { category: 'Infrastructure', amount: 485000, percentage: 14.3, fill: '#008080' },
  { category: 'Tools & Licenses', amount: 285000, percentage: 8.4, fill: '#37474F' },
  { category: 'Office & Operations', amount: 325000, percentage: 9.6, fill: '#475569' },
  { category: 'Training & Development', amount: 195000, percentage: 5.9, fill: '#64748B' }
];

const projectProfitability = [
  { project: 'E-Commerce Platform', revenue: 850000, cost: 620000, profit: 230000, margin: 27.1 },
  { project: 'Mobile App Development', revenue: 450000, cost: 340000, profit: 110000, margin: 24.4 },
  { project: 'Data Analytics Dashboard', revenue: 320000, cost: 245000, profit: 75000, margin: 23.4 },
  { project: 'API Integration', revenue: 180000, cost: 145000, profit: 35000, margin: 19.4 }
];

const financialKPIs = [
  { kpi: 'Revenue Growth', current: 18.5, target: 15, status: 'excellent' },
  { kpi: 'Profit Margin', current: 22.8, target: 20, status: 'excellent' },
  { kpi: 'Cost Efficiency', current: 94.2, target: 90, status: 'excellent' },
  { kpi: 'Cash Flow', current: 87.6, target: 85, status: 'good' }
];

export const FinancialKPIModal = ({ open, onOpenChange }: FinancialKPIModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-teal text-white';
      case 'good': return 'bg-deep-blue text-white';
      case 'warning': return 'bg-yellow-500 text-white';
      default: return 'bg-slate text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-deep-blue flex items-center gap-3">
            <div className="p-2 bg-teal rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            Financial Performance Analytics
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Financial Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Revenue</p>
                    <p className="text-3xl font-bold">$4.2M</p>
                    <p className="text-xs opacity-75">+18.5% growth</p>
                  </div>
                  <DollarSign className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Profit Margin</p>
                    <p className="text-3xl font-bold">22.8%</p>
                    <p className="text-xs opacity-75">Above target</p>
                  </div>
                  <TrendingUp className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-charcoal to-slate text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">ROI</p>
                    <p className="text-3xl font-bold">24.6%</p>
                    <p className="text-xs opacity-75">Excellent</p>
                  </div>
                  <Target className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Monthly Burn</p>
                    <p className="text-3xl font-bold">$485K</p>
                    <p className="text-xs opacity-75">Controlled</p>
                  </div>
                  <BarChart3 className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Revenue & Profit Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
                      <Line type="monotone" dataKey="revenue" stroke="#008080" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="expenses" stroke="#37474F" strokeWidth={2} name="Expenses" />
                      <Line type="monotone" dataKey="profit" stroke="#22356F" strokeWidth={2} name="Profit" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-deep-blue flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Cost Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="amount"
                        label={({ category, percentage }) => `${category}: ${percentage}%`}
                      />
                      <Tooltip formatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial KPIs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue flex items-center gap-2">
                <Target className="h-5 w-5" />
                Key Financial Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {financialKPIs.map((kpi) => (
                  <div key={kpi.kpi} className="p-4 bg-light-bg rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-deep-blue">{kpi.kpi}</h4>
                      <Badge className={getStatusColor(kpi.status)}>
                        {kpi.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {kpi.current}%</span>
                        <span>Target: {kpi.target}%</span>
                      </div>
                      <Progress value={Math.min(kpi.current, 100)} className="h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Profitability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Project Profitability Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectProfitability.map((project) => (
                  <div key={project.project} className="p-4 border border-deep-blue/20 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-deep-blue">{project.project}</h4>
                      <Badge className={project.margin > 25 ? 'bg-teal text-white' : project.margin > 20 ? 'bg-deep-blue text-white' : 'bg-yellow-500 text-white'}>
                        {project.margin}% Margin
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-slate">Revenue</p>
                        <p className="text-xl font-bold text-deep-blue">${(project.revenue / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate">Cost</p>
                        <p className="text-xl font-bold text-slate">${(project.cost / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate">Profit</p>
                        <p className="text-xl font-bold text-teal">${(project.profit / 1000).toFixed(0)}K</p>
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


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from "lucide-react";

interface FinancialOverviewProps {
  data: any;
  userRole?: string;
  expanded?: boolean;
}

export const FinancialOverview = ({ data, userRole, expanded = false }: FinancialOverviewProps) => {
  const budgetUtilization = data?.total_budget ? Math.round(((data?.utilized_budget || 0) / data.total_budget) * 100) : 0;
  
  const salaryData = data?.salaries?.by_department ? Object.entries(data.salaries.by_department).map(([dept, amount]: [string, any]) => ({
    name: dept.charAt(0).toUpperCase() + dept.slice(1),
    value: amount / 1000, // Convert to thousands
    fill: "#475569"
  })) : [];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5" />
          <span>Financial Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Financial Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-emerald-600">{formatCurrency(data?.revenue || 2890000)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(data?.total_budget || 2450000)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Budget</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-amber-600">{formatCurrency(data?.burn_rate || 425000)}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Burn</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-emerald-600">{data?.profit_margin || 18.2}%</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Profit Margin</div>
          </div>
        </div>

        {/* Budget Utilization */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Budget Utilization</span>
            <span className="font-medium">{budgetUtilization}%</span>
          </div>
          <Progress value={budgetUtilization} className="h-2" />
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {formatCurrency(data?.utilized_budget || 2180000)} of {formatCurrency(data?.total_budget || 2450000)} utilized
          </div>
        </div>

        {/* Salary Information (HR Only) */}
        {userRole === 'hr' && data?.salaries && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">Salary Overview</h4>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">HR Only</Badge>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {formatCurrency(data.salaries.total_monthly || 890000)}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Monthly Payroll</div>
            </div>

            {/* Department Salary Breakdown */}
            {expanded && salaryData.length > 0 && (
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}K`, 'Monthly Salary']} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* Financial Health Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Revenue Growth</div>
              <div className="text-sm text-emerald-600">+12.4% this quarter</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <CreditCard className="h-5 w-5 text-slate-600" />
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Cash Flow</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Positive</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

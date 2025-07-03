
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Shield, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface QADashboardProps {
  data: any;
  expanded?: boolean;
}

export const QADashboard = ({ data, expanded = false }: QADashboardProps) => {
  const testData = [
    { name: "Passed", value: data?.test_passed || 2398, color: "#10b981" },
    { name: "Failed", value: (data?.test_cases || 2456) - (data?.test_passed || 2398), color: "#ef4444" }
  ];

  const passRate = data?.test_cases ? Math.round(((data?.test_passed || 0) / data.test_cases) * 100) : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>QA Dashboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Automation Coverage</span>
              <span className="font-medium">{data?.automation_coverage || 72.8}%</span>
            </div>
            <Progress value={data?.automation_coverage || 72.8} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Defect Removal Efficiency</span>
              <span className="font-medium">{data?.defect_removal_efficiency || 92.1}%</span>
            </div>
            <Progress value={data?.defect_removal_efficiency || 92.1} className="h-2" />
          </div>
        </div>

        {/* Test Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {data?.test_cases || 2456}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Test Cases</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {passRate}%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Pass Rate</div>
          </div>
        </div>

        {/* Test Results Pie Chart */}
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={testData}
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={50}
                dataKey="value"
              >
                {testData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Test Status */}
        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium">Tests Passed</span>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            {data?.test_passed || 2398} / {data?.test_cases || 2456}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

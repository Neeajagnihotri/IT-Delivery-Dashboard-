
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Target, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface DeliverablesSummaryProps {
  data: any;
  expanded?: boolean;
}

export const DeliverablesSummary = ({ data, expanded = false }: DeliverablesSummaryProps) => {
  const chartData = [
    { name: "On Time", value: data?.on_time || 0, fill: "#10b981" },
    { name: "Delayed", value: data?.delayed || 0, fill: "#f59e0b" },
    { name: "Overdue", value: data?.overdue || 0, fill: "#ef4444" }
  ];

  const total = (data?.on_time || 0) + (data?.delayed || 0) + (data?.overdue || 0);
  const completionRate = total > 0 ? Math.round(((data?.on_time || 0) / total) * 100) : 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Deliverables Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{data?.on_time || 0}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">On Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{data?.delayed || 0}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Delayed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{data?.overdue || 0}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Overdue</div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Overall Completion Rate</span>
            <span className="font-medium">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        {/* Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Deliverables */}
        {data?.upcoming && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Upcoming: {data.upcoming} deliverables
            </h4>
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <Clock className="h-4 w-4" />
              <span>Next milestone in 3 days</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

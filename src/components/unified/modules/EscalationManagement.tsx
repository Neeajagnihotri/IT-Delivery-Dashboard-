
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, AlertCircle, Clock, CheckCircle } from "lucide-react";

interface EscalationManagementProps {
  data: any;
  expanded?: boolean;
}

export const EscalationManagement = ({ data, expanded = false }: EscalationManagementProps) => {
  const resolutionRate = data?.total ? Math.round(((data?.resolved_this_week || 0) / data.total) * 100) : 0;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'medium': return <Clock className="h-4 w-4 text-amber-600" />;
      default: return <CheckCircle className="h-4 w-4 text-slate-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5" />
          <span>Escalation Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Escalation Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data?.total || 8}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Total Escalations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{data?.resolved_this_week || 5}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Resolved This Week</div>
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">Weekly Resolution Rate</span>
            <span className="font-medium">{resolutionRate}%</span>
          </div>
          <Progress value={resolutionRate} className="h-2" />
        </div>

        {/* Priority Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 dark:text-slate-100">Priority Breakdown</h4>
          
          <div className="flex items-center justify-between p-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
            <div className="flex items-center space-x-2">
              {getPriorityIcon('critical')}
              <span className="font-medium text-slate-900 dark:text-slate-100">Critical</span>
            </div>
            <Badge variant={getPriorityBadge('critical')}>
              {data?.critical || 2}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border border-orange-200 dark:border-orange-800 rounded-lg bg-orange-50 dark:bg-orange-900/10">
            <div className="flex items-center space-x-2">
              {getPriorityIcon('high')}
              <span className="font-medium text-slate-900 dark:text-slate-100">High</span>
            </div>
            <Badge variant={getPriorityBadge('high')}>
              {data?.high || 3}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-3 border border-amber-200 dark:border-amber-800 rounded-lg bg-amber-50 dark:bg-amber-900/10">
            <div className="flex items-center space-x-2">
              {getPriorityIcon('medium')}
              <span className="font-medium text-slate-900 dark:text-slate-100">Medium</span>
            </div>
            <Badge variant={getPriorityBadge('medium')}>
              {data?.medium || 3}
            </Badge>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Recent Activity</span>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200">
              +{data?.resolved_this_week || 5} resolved
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

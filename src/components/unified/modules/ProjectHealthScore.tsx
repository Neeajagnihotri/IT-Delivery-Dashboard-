
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FolderOpen, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface ProjectHealthScoreProps {
  data: any;
  expanded?: boolean;
}

export const ProjectHealthScore = ({ data, expanded = false }: ProjectHealthScoreProps) => {
  const healthColors = {
    Green: "#10b981",
    Yellow: "#f59e0b", 
    Red: "#ef4444"
  };

  const pieData = [
    { name: "Green", value: data?.green_projects || 0, color: "#10b981" },
    { name: "Yellow", value: data?.yellow_projects || 0, color: "#f59e0b" },
    { name: "Red", value: data?.red_projects || 0, color: "#ef4444" }
  ];

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'Green': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'Yellow': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Red': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case 'Green': return 'default';
      case 'Yellow': return 'secondary';
      case 'Red': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FolderOpen className="h-5 w-5" />
          <span>Project Health Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Health Distribution */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{data?.green_projects || 0}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Green</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{data?.yellow_projects || 0}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Yellow</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{data?.red_projects || 0}</div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Red</div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Project Details (if expanded) */}
        {expanded && data?.projects && (
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Project Details</h4>
            {data.projects.map((project: any) => (
              <div key={project.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getHealthIcon(project.health)}
                    <h5 className="font-medium text-slate-900 dark:text-slate-100">{project.name}</h5>
                  </div>
                  <Badge variant={getHealthBadgeVariant(project.health)}>
                    {project.health}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="font-medium">{project.completion}%</span>
                  </div>
                  <Progress value={project.completion} className="h-2" />
                  <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">Budget: </span>
                      <span className="font-medium">${project.budget.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-slate-400">Resources: </span>
                      <span className="font-medium">{project.allocated_resources}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

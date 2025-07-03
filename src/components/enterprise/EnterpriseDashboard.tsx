
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import { 
  Users, 
  FolderOpen, 
  Target, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  BarChart3,
  Activity,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";

export const EnterpriseDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data for now - replace with actual API call
      const mockData = {
        project_health: {
          total_projects: 12,
          green_projects: 8,
          yellow_projects: 3,
          red_projects: 1,
          avg_health_score: 82.5
        },
        resource_utilization: {
          total_resources: 156,
          billable_resources: 132,
          benched_resources: 24,
          utilization_rate: 84.6
        },
        deliverables: {
          total_deliverables: 48,
          completed_deliverables: 38,
          delayed_deliverables: 6,
          overdue_deliverables: 4
        },
        engineering_metrics: {
          avg_code_quality: 87.2,
          avg_test_coverage: 78.5,
          total_bugs_reported: 124,
          total_bugs_resolved: 118
        },
        qa_metrics: {
          avg_automation_coverage: 72.8,
          avg_defect_removal_efficiency: 92.1,
          total_test_cases: 2456,
          total_passed: 2398
        },
        financial: user?.role === 'hr' || user?.role === 'leadership' ? {
          total_budget: 2450000,
          total_utilized: 2180000,
          total_revenue: 2890000,
          avg_profit_margin: 18.2,
          avg_burn_rate: 425000
        } : null
      };
      
      setDashboardData(mockData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (percentage: number) => {
    if (percentage >= 80) return "text-emerald-600";
    if (percentage >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getHealthBadgeVariant = (status: string) => {
    switch (status) {
      case 'Green': return 'default';
      case 'Yellow': return 'secondary';
      case 'Red': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-slate-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Enterprise Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome back, {user?.name}. Here's your organization overview.
          </p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Project Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Project Health
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {dashboardData?.project_health?.avg_health_score?.toFixed(1)}%
              </div>
              <div className="flex space-x-1 mt-2">
                <Badge variant={getHealthBadgeVariant('Green')} className="text-xs">
                  {dashboardData?.project_health?.green_projects} Green
                </Badge>
                <Badge variant={getHealthBadgeVariant('Yellow')} className="text-xs">
                  {dashboardData?.project_health?.yellow_projects} Yellow
                </Badge>
                <Badge variant={getHealthBadgeVariant('Red')} className="text-xs">
                  {dashboardData?.project_health?.red_projects} Red
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resource Utilization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Resource Utilization
              </CardTitle>
              <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getHealthColor(dashboardData?.resource_utilization?.utilization_rate || 0)}`}>
                {dashboardData?.resource_utilization?.utilization_rate}%
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {dashboardData?.resource_utilization?.billable_resources} of {dashboardData?.resource_utilization?.total_resources} billable
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Deliverables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Deliverables
              </CardTitle>
              <Target className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {dashboardData?.deliverables?.completed_deliverables}/{dashboardData?.deliverables?.total_deliverables}
              </div>
              <p className="text-xs text-red-600 mt-1">
                {dashboardData?.deliverables?.overdue_deliverables} overdue
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Overview (HR & Leadership only) */}
        {(user?.role === 'hr' || user?.role === 'leadership') && dashboardData?.financial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Financial Health
                </CardTitle>
                <DollarSign className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">
                  {dashboardData?.financial?.avg_profit_margin?.toFixed(1)}%
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Profit margin
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engineering Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Engineering Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Code Quality</span>
              <span className={`font-medium ${getHealthColor(dashboardData?.engineering_metrics?.avg_code_quality || 0)}`}>
                {dashboardData?.engineering_metrics?.avg_code_quality?.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Test Coverage</span>
              <span className={`font-medium ${getHealthColor(dashboardData?.engineering_metrics?.avg_test_coverage || 0)}`}>
                {dashboardData?.engineering_metrics?.avg_test_coverage?.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Bug Resolution Rate</span>
              <span className="font-medium text-emerald-600">
                {((dashboardData?.engineering_metrics?.total_bugs_resolved / dashboardData?.engineering_metrics?.total_bugs_reported) * 100)?.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* QA Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Quality Assurance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Automation Coverage</span>
              <span className={`font-medium ${getHealthColor(dashboardData?.qa_metrics?.avg_automation_coverage || 0)}`}>
                {dashboardData?.qa_metrics?.avg_automation_coverage?.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Defect Removal Efficiency</span>
              <span className="font-medium text-emerald-600">
                {dashboardData?.qa_metrics?.avg_defect_removal_efficiency?.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Test Pass Rate</span>
              <span className="font-medium text-emerald-600">
                {((dashboardData?.qa_metrics?.total_passed / dashboardData?.qa_metrics?.total_test_cases) * 100)?.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">View Escalations</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Target className="h-5 w-5" />
              <span className="text-sm">Check Deliverables</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Analytics</span>
            </Button>
            {(user?.role === 'hr' || user?.role === 'leadership') && (
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-sm">Financial Reports</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

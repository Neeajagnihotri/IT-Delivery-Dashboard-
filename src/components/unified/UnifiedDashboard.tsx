
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  RefreshCw,
  Settings,
  Building2,
  Bell,
  Search,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { DeliverablesSummary } from "./modules/DeliverablesSummary";
import { EngineeringMetrics } from "./modules/EngineeringMetrics";
import { QADashboard } from "./modules/QADashboard";
import { ProjectHealthScore } from "./modules/ProjectHealthScore";
import { ResourceManagementModule } from "./modules/ResourceManagementModule";
import { EscalationManagement } from "./modules/EscalationManagement";
import { FinancialOverview } from "./modules/FinancialOverview";
import { SettingsModal } from "./modals/SettingsModal";
import { useToast } from "@/hooks/use-toast";

export const UnifiedDashboard = () => {
  const { user, logout } = useAuth();
  const [activeModule, setActiveModule] = useState("overview");
  const [showSettings, setShowSettings] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Mock comprehensive data - replace with actual API calls
      const mockData = {
        overview: {
          total_projects: 12,
          active_resources: 156,
          completed_deliverables: 38,
          total_deliverables: 48,
          health_score: 82.5,
          utilization_rate: 84.6
        },
        project_health: {
          green_projects: 8,
          yellow_projects: 3,
          red_projects: 1,
          projects: [
            { id: 1, name: "Enterprise CRM", health: "Green", completion: 85, budget: 450000, allocated_resources: 8 },
            { id: 2, name: "Mobile App Revamp", health: "Yellow", completion: 65, budget: 280000, allocated_resources: 5 },
            { id: 3, name: "Security Audit", health: "Red", completion: 30, budget: 150000, allocated_resources: 3 }
          ]
        },
        resources: {
          total: 156,
          billable: 132,
          benched: 24,
          by_department: {
            engineering: 85,
            qa: 28,
            design: 18,
            management: 15,
            hr: 10
          }
        },
        financial: {
          total_budget: 2450000,
          utilized_budget: 2180000,
          revenue: 2890000,
          profit_margin: 18.2,
          burn_rate: 425000,
          salaries: user?.role === 'hr' ? {
            total_monthly: 890000,
            by_department: {
              engineering: 520000,
              qa: 140000,
              design: 95000,
              management: 85000,
              hr: 50000
            }
          } : null
        },
        engineering: {
          code_quality: 87.2,
          test_coverage: 78.5,
          bugs_reported: 124,
          bugs_resolved: 118,
          deployment_frequency: 2.3
        },
        qa: {
          automation_coverage: 72.8,
          defect_removal_efficiency: 92.1,
          test_cases: 2456,
          test_passed: 2398
        },
        deliverables: {
          on_time: 32,
          delayed: 6,
          overdue: 4,
          upcoming: 15
        },
        escalations: {
          total: 8,
          critical: 2,
          high: 3,
          medium: 3,
          resolved_this_week: 5
        }
      };
      
      setDashboardData(mockData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
    toast({
      title: "Refreshed",
      description: "Dashboard data has been updated"
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'leadership': return 'default';
      case 'hr': return 'secondary';
      case 'resource_manager': return 'outline';
      default: return 'outline';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'leadership': return 'Leadership';
      case 'hr': return 'Human Resources';
      case 'resource_manager': return 'Resource Manager';
      default: return role;
    }
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading Zapcom IT Delivery Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-700 dark:to-slate-600 rounded-xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Zapcom IT Delivery Platform
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Enterprise Resource & Project Management Portal
                </p>
              </div>
            </div>

            {/* Actions and User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400">
                <Search className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="border-slate-200 dark:border-slate-600"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="border-slate-200 dark:border-slate-600"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 h-auto p-2">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {user?.name}
                      </p>
                      <Badge variant={getRoleBadgeVariant(user?.role)} className="text-xs">
                        {getRoleDisplayName(user?.role)}
                      </Badge>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-slate-600 text-white text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setShowSettings(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Projects
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {dashboardData?.overview?.total_projects}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {dashboardData?.project_health?.green_projects} healthy
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Resources
                </CardTitle>
                <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {dashboardData?.overview?.active_resources}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {dashboardData?.overview?.utilization_rate}% utilized
                </p>
              </CardContent>
            </Card>
          </motion.div>

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
                  {dashboardData?.overview?.completed_deliverables}/{dashboardData?.overview?.total_deliverables}
                </div>
                <p className="text-xs text-emerald-600 mt-1">
                  {Math.round((dashboardData?.overview?.completed_deliverables / dashboardData?.overview?.total_deliverables) * 100)}% complete
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Health Score
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">
                  {dashboardData?.overview?.health_score}%
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Overall platform health
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Escalations
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {dashboardData?.escalations?.total}
                </div>
                <p className="text-xs text-red-600 mt-1">
                  {dashboardData?.escalations?.critical} critical
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">
                  ${(dashboardData?.financial?.revenue / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {dashboardData?.financial?.profit_margin}% margin
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Module Tabs */}
        <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white rounded-lg transition-all duration-300 font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white rounded-lg transition-all duration-300 font-medium"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white rounded-lg transition-all duration-300 font-medium"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger 
              value="engineering" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white rounded-lg transition-all duration-300 font-medium"
            >
              Engineering
            </TabsTrigger>
            <TabsTrigger 
              value="qa" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white rounded-lg transition-all duration-300 font-medium"
            >
              QA
            </TabsTrigger>
            <TabsTrigger 
              value="escalations" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white rounded-lg transition-all duration-300 font-medium"
            >
              Escalations
            </TabsTrigger>
            <TabsTrigger 
              value="financial" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white rounded-lg transition-all duration-300 font-medium"
            >
              Financial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProjectHealthScore data={dashboardData?.project_health} />
              <DeliverablesSummary data={dashboardData?.deliverables} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EngineeringMetrics data={dashboardData?.engineering} />
              <QADashboard data={dashboardData?.qa} />
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectHealthScore data={dashboardData?.project_health} expanded />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceManagementModule data={dashboardData?.resources} />
          </TabsContent>

          <TabsContent value="engineering">
            <EngineeringMetrics data={dashboardData?.engineering} expanded />
          </TabsContent>

          <TabsContent value="qa">
            <QADashboard data={dashboardData?.qa} expanded />
          </TabsContent>

          <TabsContent value="escalations">
            <EscalationManagement data={dashboardData?.escalations} />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialOverview data={dashboardData?.financial} userRole={user?.role} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Settings Modal */}
      <SettingsModal 
        open={showSettings} 
        onOpenChange={setShowSettings} 
      />
    </div>
  );
};

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FolderOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Wrench,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const MainDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [engineeringTab, setEngineeringTab] = useState("development");

  const kpiCards = [
    {
      title: "Active Projects",
      value: "18",
      subtitle: "Healthy",
      icon: FolderOpen,
      color: "from-deep-blue to-teal",
      route: "/active-projects"
    },
    {
      title: "Resource Utilization",
      value: "84.6%",
      icon: Users,
      color: "from-teal to-deep-blue",
      route: "/resource-utilization"
    },
    {
      title: "Financial Health",
      value: "18.2%",
      icon: DollarSign,
      color: "from-slate to-charcoal",
      route: "/financial-health"
    },
    {
      title: "Average Health Score",
      value: "87.5%",
      subtitle: "Excellent",
      icon: TrendingUp,
      color: "from-charcoal to-slate",
      route: "/average-health-score"
    }
  ];

  const developmentMetrics = [
    {
      title: "Code Coverage",
      value: "91.4%",
      badge: "Excellent",
      badgeColor: "bg-teal text-white",
      description: "Based on SonarQube metrics",
      route: "/development/code-coverage"
    },
    {
      title: "PR Average Time",
      value: "4.2h",
      badge: "Good",
      badgeColor: "bg-deep-blue text-white",
      description: "Average merge time",
      route: "/development/pr-average-time"
    },
    {
      title: "Commits/Developer",
      value: "8.5",
      badge: "Good",
      badgeColor: "bg-slate text-white",
      description: "per day average",
      route: "/commits-developer"
    }
  ];

  const qaMetrics = [
    {
      title: "Test Coverage",
      value: "85.7%",
      badge: "Good",
      badgeColor: "bg-slate text-white",
      description: "Unit & Integration tests",
      route: "/qa/test-coverage"
    },
    {
      title: "Test Execution Rate",
      value: "95%",
      badge: "Excellent",
      badgeColor: "bg-charcoal text-white",
      description: "Automated test execution",
      route: "/qa/test-execution-rate"
    },
    {
      title: "Automation Coverage",
      value: "73%",
      badge: "Good",
      badgeColor: "bg-deep-blue text-white",
      description: "automated tests",
      route: "/automation-coverage"
    }
  ];

  const handleKPIClick = (route: string) => {
    navigate(route);
  };

  const handleMetricClick = (route: string) => {
    navigate(route);
  };

  const handleCreateEscalation = () => {
    navigate('/create-escalation');
  };

  const handleEscalationClick = (escalationId: string) => {
    navigate(`/escalation/${escalationId}`);
  };

  const handleEditEscalation = (escalationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit-escalation/${escalationId}`);
  };

  const handleDeleteEscalation = (escalationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this escalation?')) {
      // Handle deletion logic here
      console.log(`Deleting escalation ${escalationId}`);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {kpiCards.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="cursor-pointer"
              onClick={() => handleKPIClick(kpi.route)}
            >
              <Card className={`bg-gradient-to-r ${kpi.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 h-full border-0`}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 lg:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <kpi.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm lg:text-base font-medium opacity-90 mb-2">
                      {kpi.title}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-2xl lg:text-3xl font-bold">
                        {kpi.value}
                      </p>
                      {kpi.subtitle && (
                        <p className="text-xs lg:text-sm opacity-75">
                          {kpi.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Engineering Metrics and Manage Escalations - Side by Side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          {/* Engineering Metrics */}
          <Card className="bg-white border border-black/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-deep-blue flex items-center gap-2">
                  <Wrench className="h-6 w-6" />
                  Engineering Metrics
                </h3>
              </div>
              
              <Tabs value={engineeringTab} onValueChange={setEngineeringTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 bg-light-bg border border-black/10 h-12">
                  <TabsTrigger 
                    value="development" 
                    className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue border-r border-black/10 h-10"
                  >
                    Development Metrics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="qa" 
                    className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue h-10"
                  >
                    QA Metrics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="development" className="space-y-4">
                  <div className="space-y-4">
                    {developmentMetrics.map((metric, index) => (
                      <div 
                        key={metric.title}
                        className="p-4 bg-light-bg rounded-xl border border-black/10 cursor-pointer hover:bg-slate/10 transition-colors"
                        onClick={() => handleMetricClick(metric.route)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate">{metric.title}</span>
                          <Badge className={`${metric.badgeColor} text-xs`}>{metric.badge}</Badge>
                        </div>
                        <div className="text-2xl font-bold text-deep-blue mb-1">{metric.value}</div>
                        <div className="text-xs text-slate">{metric.description}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="qa" className="space-y-4">
                  <div className="space-y-4">
                    {qaMetrics.map((metric, index) => (
                      <div 
                        key={metric.title}
                        className="p-4 bg-light-bg rounded-xl border border-black/10 cursor-pointer hover:bg-slate/10 transition-colors"
                        onClick={() => handleMetricClick(metric.route)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate">{metric.title}</span>
                          <Badge className={`${metric.badgeColor} text-xs`}>{metric.badge}</Badge>
                        </div>
                        <div className="text-2xl font-bold text-deep-blue mb-1">{metric.value}</div>
                        <div className="text-xs text-slate">{metric.description}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Manage Escalations */}
          <Card className="bg-white border border-black/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-deep-blue flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Manage Escalations
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-deep-blue border-deep-blue">
                    3 Total
                  </Badge>
                  <Button 
                    className="bg-teal hover:bg-teal/90 text-white text-sm px-3 py-1 h-8"
                    onClick={handleCreateEscalation}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div 
                  className="p-4 bg-light-bg rounded-xl border border-black/10 cursor-pointer hover:bg-slate/5 transition-colors"
                  onClick={() => handleEscalationClick('1')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-deep-blue mb-1">
                        API Performance Issues
                      </h4>
                      <p className="text-sm text-slate mb-2">
                        Client: TechCorp Industries
                      </p>
                      <p className="text-sm text-slate">
                        Engineer: Alex Rodriguez
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-deep-blue text-white">
                        High Priority
                      </Badge>
                      <span className="text-xs text-slate">ETA 6/8/2024</span>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => handleEditEscalation('1', e)}
                          className="text-xs border-black/20 text-slate hover:bg-slate/10 p-1 h-6 w-6"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => handleDeleteEscalation('1', e)}
                          className="text-xs border-black/20 text-slate hover:bg-slate/10 p-1 h-6 w-6"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 bg-light-bg rounded-xl border border-black/10 cursor-pointer hover:bg-slate/5 transition-colors"
                  onClick={() => handleEscalationClick('2')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-deep-blue mb-1">
                        Budget Overrun Discussion
                      </h4>
                      <p className="text-sm text-slate mb-2">
                        Client: InnovateCorp
                      </p>
                      <p className="text-sm text-slate">
                        Engineer: Sarah Johnson
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-teal text-white">
                        Medium Priority
                      </Badge>
                      <span className="text-xs text-slate">ETA 6/5/2024</span>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => handleEditEscalation('2', e)}
                          className="text-xs border-black/20 text-slate hover:bg-slate/10 p-1 h-6 w-6"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => handleDeleteEscalation('2', e)}
                          className="text-xs border-black/20 text-slate hover:bg-slate/10 p-1 h-6 w-6"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="p-4 bg-light-bg rounded-xl border border-black/10 cursor-pointer hover:bg-slate/5 transition-colors"
                  onClick={() => handleEscalationClick('3')}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-deep-blue mb-1">
                        Resource Allocation Conflict
                      </h4>
                      <p className="text-sm text-slate mb-2">
                        Client: GlobalTech
                      </p>
                      <p className="text-sm text-slate">
                        Engineer: Mike Chen
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className="bg-charcoal text-white">
                        Critical Priority
                      </Badge>
                      <span className="text-xs text-slate">ETA 6/10/2024</span>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => handleEditEscalation('3', e)}
                          className="text-xs border-black/20 text-slate hover:bg-slate/10 p-1 h-6 w-6"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => handleDeleteEscalation('3', e)}
                          className="text-xs border-black/20 text-slate hover:bg-slate/10 p-1 h-6 w-6"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, UserCheck, UserX, Eye, Building, Brain, Plus, FolderPlus, UserPlus, BarChart3, Briefcase, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const resourceKPIs = [
  {
    title: "Total Resources",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    gradient: "from-deep-blue to-slate",
    textColor: "text-white",
    route: "/resource-kpi/total-resources"
  },
  {
    title: "Billable",
    value: "189",
    change: "+8%",
    changeType: "positive" as const,
    icon: UserCheck,
    gradient: "from-teal to-deep-blue",
    textColor: "text-white",
    route: "/resource-kpi/billable-resources"
  },
  {
    title: "Benched",
    value: "34",
    change: "-5%",
    changeType: "negative" as const,
    icon: UserX,
    gradient: "from-slate to-charcoal",
    textColor: "text-white",
    route: "/resource-kpi/benched-resources"
  },
  {
    title: "Shadow",
    value: "18",
    change: "+2%",
    changeType: "positive" as const,
    icon: Eye,
    gradient: "from-charcoal to-slate",
    textColor: "text-white",
    route: "/resource-kpi/shadow-resources"
  },
  {
    title: "Internal",
    value: "12",
    change: "0%",
    changeType: "neutral" as const,
    icon: Building,
    gradient: "from-deep-blue to-teal",
    textColor: "text-white",
    route: "/resource-kpi/internal-resources"
  },
  {
    title: "Zapminds",
    value: "6",
    change: "+1%",
    changeType: "positive" as const,
    icon: Brain,
    gradient: "from-teal to-deep-blue",
    textColor: "text-white",
    route: "/resource-kpi/zapminds-resources"
  }
];

export const ResourceManagementView = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const canAddResource = user?.role === "hr" || user?.role === "resource_manager";
  const canAddProject = user?.role === "resource_manager" || user?.role === "leadership";
  const canAllocateProject = user?.role === "resource_manager";

  const handleKPIClick = (route: string) => {
    navigate(route);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="container mx-auto px-6 py-6">
        {/* Header Card */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-8">
          <CardHeader className="border-b bg-light-bg rounded-t-2xl border-deep-blue/20 p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-r from-deep-blue to-teal">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-deep-blue mb-2">
                  Resource Management
                </h1>
                <p className="text-lg text-slate">
                  Enterprise Resource Optimization & Intelligence Platform
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Enhanced KPI Cards with Main Dashboard Color Scheme */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {resourceKPIs.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="cursor-pointer"
              onClick={() => handleKPIClick(kpi.route)}
            >
              <Card className={`bg-gradient-to-br ${kpi.gradient} ${kpi.textColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-5 relative z-10">
                  <CardTitle className="text-xs sm:text-sm font-medium text-white/90 leading-tight line-clamp-2 flex-1 pr-2">
                    {kpi.title}
                  </CardTitle>
                  <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <kpi.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 lg:p-5 pt-0 relative z-10">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 truncate group-hover:scale-105 transition-transform duration-300">
                    {kpi.value}
                  </div>
                  <div className="flex items-center gap-1 min-h-[20px]">
                    {kpi.changeType === 'positive' ? (
                      <TrendingUp className="h-3 w-3 text-white/80 flex-shrink-0" />
                    ) : kpi.changeType === 'negative' ? (
                      <TrendingDown className="h-3 w-3 text-white/80 flex-shrink-0" />
                    ) : null}
                    <p className="text-xs font-medium text-white/80 truncate">
                      {kpi.change} from last month
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-8">
          <CardContent className="p-6">
            <Tabs defaultValue="actions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-light-bg rounded-xl">
                <TabsTrigger 
                  value="actions"
                  className="text-deep-blue data-[state=active]:bg-deep-blue data-[state=active]:text-white"
                >
                  Resource Actions
                </TabsTrigger>
                <TabsTrigger 
                  value="overview"
                  className="text-deep-blue data-[state=active]:bg-deep-blue data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="projects"
                  className="text-deep-blue data-[state=active]:bg-deep-blue data-[state=active]:text-white"
                >
                  Project Management
                </TabsTrigger>
              </TabsList>

              {/* Resource Actions Tab Content */}
              <TabsContent value="actions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {canAddResource && (
                    <Card className="border border-teal/40 bg-gradient-to-br from-teal/10 to-teal/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-teal/60"
                          onClick={() => handleNavigation('/resource-management/add-resource')}>
                      <CardContent className="p-6 text-center">
                        <div className="p-4 bg-teal rounded-2xl shadow-lg mb-4 mx-auto w-fit hover:scale-110 transition-transform duration-300">
                          <UserPlus className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-deep-blue mb-2 hover:text-teal transition-colors duration-300">Add Resource</h3>
                        <p className="text-sm text-slate">Add new employee to the system</p>
                      </CardContent>
                    </Card>
                  )}

                  {canAddProject && (
                    <Card className="border border-deep-blue/40 bg-gradient-to-br from-deep-blue/10 to-deep-blue/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-deep-blue/60"
                          onClick={() => handleNavigation('/resource-management/add-project')}>
                      <CardContent className="p-6 text-center">
                        <div className="p-4 bg-deep-blue rounded-2xl shadow-lg mb-4 mx-auto w-fit hover:scale-110 transition-transform duration-300">
                          <FolderPlus className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-deep-blue mb-2 hover:text-teal transition-colors duration-300">Add Project</h3>
                        <p className="text-sm text-slate">Create new project</p>
                      </CardContent>
                    </Card>
                  )}

                  {canAllocateProject && (
                    <Card className="border border-slate/40 bg-gradient-to-br from-slate/10 to-slate/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-slate/60"
                          onClick={() => handleNavigation('/resource-management/project-allocation')}>
                      <CardContent className="p-6 text-center">
                        <div className="p-4 bg-slate rounded-2xl shadow-lg mb-4 mx-auto w-fit hover:scale-110 transition-transform duration-300">
                          <Plus className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-deep-blue mb-2 hover:text-teal transition-colors duration-300">Project Allocation</h3>
                        <p className="text-sm text-slate">Allocate resources to projects</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Overview Tab Content */}
              <TabsContent value="overview" className="mt-6">
                <Card className="border border-charcoal/40 bg-gradient-to-br from-charcoal/10 to-charcoal/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-charcoal/60"
                      onClick={() => handleNavigation('/resource-management/overview')}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-charcoal rounded-2xl shadow-lg mb-4 mx-auto w-fit hover:scale-110 transition-transform duration-300">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-deep-blue mb-2 hover:text-teal transition-colors duration-300">Analytics Overview</h3>
                    <p className="text-sm text-slate">View comprehensive analytics, trends, charts, and employee summaries for strategic resource planning</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Project Management Tab Content */}
              <TabsContent value="projects" className="mt-6">
                <Card className="border border-teal/40 bg-gradient-to-br from-teal/10 to-deep-blue/20 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-teal/60"
                      onClick={() => handleNavigation('/resource-management/projects')}>
                  <CardContent className="p-6 text-center">
                    <div className="p-4 bg-gradient-to-r from-teal to-deep-blue rounded-2xl shadow-lg mb-4 mx-auto w-fit hover:scale-110 transition-transform duration-300">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-deep-blue mb-2 hover:text-teal transition-colors duration-300">Project Management</h3>
                    <p className="text-sm text-slate">Comprehensive project directory with detailed timelines, budget tracking, and resource allocation insights</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

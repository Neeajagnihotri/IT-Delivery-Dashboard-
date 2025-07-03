
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Brain, Building2, GitBranch, Download, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { AllocationAnalytics } from "./analytics/AllocationAnalytics";
import { BenchAnalytics } from "./analytics/BenchAnalytics";
import { SkillsAnalytics } from "./analytics/SkillsAnalytics";
import { DepartmentAnalytics } from "./analytics/DepartmentAnalytics";
import { ProjectResourceHeatmap } from "./analytics/ProjectResourceHeatmap";

export const EnterpriseAnalyticsBoard = () => {
  const [activeTab, setActiveTab] = useState("allocation");

  const analyticsCards = [
    {
      id: "allocation",
      title: "Allocation Overview",
      icon: Users,
      color: "blue",
      description: "Resource allocation trends and utilization metrics"
    },
    {
      id: "bench",
      title: "Bench Analytics",
      icon: BarChart3,
      color: "amber",
      description: "Bench analysis, reasons, and cost impact"
    },
    {
      id: "skills",
      title: "Skills Distribution",
      icon: Brain,
      color: "purple",
      description: "Skills analysis, demand vs supply, and proficiency"
    },
    {
      id: "department",
      title: "Department Breakdown",
      icon: Building2,
      color: "emerald",
      description: "Department-wise performance and efficiency"
    },
    {
      id: "heatmap",
      title: "Project vs Resource",
      icon: GitBranch,
      color: "cyan",
      description: "3D visualization of project-resource allocation"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
      amber: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
      purple: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
      emerald: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
      cyan: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold enterprise-title">Enterprise Analytics Dashboard</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Comprehensive insights into resource allocation, performance, and optimization
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="enterprise-glass">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="enterprise-glass">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Analytics Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {analyticsCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`enterprise-glass enterprise-hover cursor-pointer transition-all ${
                activeTab === card.id ? 'ring-2 ring-slate-400 dark:ring-slate-500' : ''
              }`}
              onClick={() => setActiveTab(card.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(card.color)}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold enterprise-title text-sm">{card.title}</h3>
                    <p className="text-xs enterprise-subtitle">{card.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="hidden" />
        
        <TabsContent value="allocation" className="space-y-0">
          <AllocationAnalytics />
        </TabsContent>

        <TabsContent value="bench" className="space-y-0">
          <BenchAnalytics />
        </TabsContent>

        <TabsContent value="skills" className="space-y-0">
          <SkillsAnalytics />
        </TabsContent>

        <TabsContent value="department" className="space-y-0">
          <DepartmentAnalytics />
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-0">
          <ProjectResourceHeatmap />
        </TabsContent>
      </Tabs>
    </div>
  );
};

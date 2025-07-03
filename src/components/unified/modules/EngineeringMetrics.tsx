
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Code, Bug, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EngineeringMetricsProps {
  data: any;
  userRole?: string;
  expanded?: boolean;
}

export const EngineeringMetrics = ({ data, userRole, expanded = false }: EngineeringMetricsProps) => {
  const navigate = useNavigate();

  const developmentData = [
    { name: 'Week 1', completed: 12, planned: 15 },
    { name: 'Week 2', completed: 19, planned: 18 },
    { name: 'Week 3', completed: 16, planned: 20 },
    { name: 'Week 4', completed: 22, planned: 25 },
  ];

  const qaData = [
    { name: 'Week 1', passed: 45, failed: 5 },
    { name: 'Week 2', passed: 52, failed: 8 },
    { name: 'Week 3', passed: 48, failed: 12 },
    { name: 'Week 4', passed: 61, failed: 9 },
  ];

  const handleMetricClick = (metricType: string, category: string) => {
    navigate(`/${category}/${metricType}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="h-5 w-5" />
          <span>Engineering Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="development" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-light-bg">
            <TabsTrigger 
              value="development" 
              className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue font-medium h-10"
            >
              Development Metrics
            </TabsTrigger>
            <TabsTrigger 
              value="qa" 
              className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue font-medium h-10"
            >
              QA Metrics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="development" className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('stories-completed', 'development')}
              >
                <div className="text-2xl font-bold text-deep-blue">68</div>
                <div className="text-sm text-slate">Stories Completed</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('code-quality', 'development')}
              >
                <div className="text-2xl font-bold text-teal">8.4/10</div>
                <div className="text-sm text-slate">Code Quality</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('bugs-fixed', 'development')}
              >
                <div className="text-2xl font-bold text-charcoal">24</div>
                <div className="text-sm text-slate">Bugs Fixed</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('velocity', 'development')}
              >
                <div className="text-2xl font-bold text-slate">17 SP</div>
                <div className="text-sm text-slate">Avg Velocity</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('commits-developer', 'development')}
              >
                <div className="text-2xl font-bold text-deep-blue">8.5</div>
                <div className="text-sm text-slate">Commits/Developer</div>
                <div className="text-xs text-slate">per day average</div>
              </div>
            </div>

            {expanded && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={developmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#008080" name="Completed" />
                    <Bar dataKey="planned" fill="#22356F" name="Planned" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="qa" className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('test-execution', 'qa')}
              >
                <div className="text-2xl font-bold text-deep-blue">92%</div>
                <div className="text-sm text-slate">Test Execution Rate</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('pass-rate', 'qa')}
              >
                <div className="text-2xl font-bold text-teal">89%</div>
                <div className="text-sm text-slate">Pass Rate</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('defect-density', 'qa')}
              >
                <div className="text-2xl font-bold text-charcoal">0.8</div>
                <div className="text-sm text-slate">Defect Density</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('automation-coverage', 'qa')}
              >
                <div className="text-2xl font-bold text-slate">76%</div>
                <div className="text-sm text-slate">Automation Coverage</div>
              </div>
              <div 
                className="text-center p-4 bg-light-bg rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleMetricClick('automation-coverage-new', 'qa')}
              >
                <div className="text-2xl font-bold text-teal">73%</div>
                <div className="text-sm text-slate">Automation Coverage</div>
                <div className="text-xs text-slate">automated tests</div>
              </div>
            </div>

            {expanded && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={qaData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="passed" fill="#008080" name="Passed" />
                    <Bar dataKey="failed" fill="#23272F" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

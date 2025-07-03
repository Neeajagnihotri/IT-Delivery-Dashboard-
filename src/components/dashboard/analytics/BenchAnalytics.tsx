
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { UserX, Clock, TrendingDown, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const benchData = [
  { reason: "Between Projects", count: 18, percentage: 53, avgDays: 12, trend: "+2%" },
  { reason: "Skills Training", count: 8, percentage: 24, avgDays: 21, trend: "-5%" },
  { reason: "Client Transition", count: 5, percentage: 15, avgDays: 8, trend: "+1%" },
  { reason: "Performance Review", count: 3, percentage: 8, avgDays: 15, trend: "0%" }
];

const benchTrend = [
  { month: "Jan", count: 42, cost: 280000 },
  { month: "Feb", count: 38, cost: 252000 },
  { month: "Mar", count: 35, cost: 231000 },
  { month: "Apr", count: 40, cost: 264000 },
  { month: "May", count: 34, cost: 224000 },
  { month: "Jun", count: 34, cost: 224000 }
];

const COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'];

export const BenchAnalytics = () => {
  const totalBenched = benchData.reduce((sum, item) => sum + item.count, 0);
  const avgBenchTime = Math.round(benchData.reduce((sum, item) => sum + (item.avgDays * item.count), 0) / totalBenched);
  const monthlyCost = benchTrend[benchTrend.length - 1].cost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Benched</p>
                <p className="text-2xl font-bold text-amber-600">{totalBenched}</p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <UserX className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Bench Time</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{avgBenchTime} days</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Cost</p>
                <p className="text-2xl font-bold text-red-600">${(monthlyCost / 1000).toFixed(0)}k</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Utilization Rate</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">86.2%</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bench Reasons Distribution */}
        <Card className="enterprise-glass">
          <CardHeader className="pb-4">
            <CardTitle className="enterprise-title text-xl">Bench Reasons Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={benchData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="count"
                      label={({ reason, percentage }) => `${reason}: ${percentage}%`}
                    >
                      {benchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bench Trend */}
        <Card className="enterprise-glass">
          <CardHeader className="pb-4">
            <CardTitle className="enterprise-title text-xl">Bench Trend & Cost Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={benchTrend} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="count" fill="#f59e0b" name="Bench Count" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="cost" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      name="Cost ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card className="enterprise-glass">
        <CardHeader className="pb-4">
          <CardTitle className="enterprise-title text-xl">Bench Details by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {benchData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-6">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div>
                    <h4 className="font-medium enterprise-title text-lg">{item.reason}</h4>
                    <p className="text-sm enterprise-subtitle">{item.count} resources • Avg {item.avgDays} days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-xl font-bold">{item.percentage}%</div>
                    <div className="text-sm text-slate-500">{item.trend}</div>
                  </div>
                  <Progress value={item.percentage} className="w-32 h-3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

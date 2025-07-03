
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Users, Clock, TrendingUp, AlertCircle } from "lucide-react";

const allocationTrend = [
  { month: "Jan", billable: 85, benched: 15 },
  { month: "Feb", billable: 92, benched: 8 },
  { month: "Mar", billable: 88, benched: 12 },
  { month: "Apr", billable: 95, benched: 5 },
  { month: "May", billable: 90, benched: 10 }
];

const currentAllocation = [
  { name: "Engineering", count: 120 },
  { name: "Design", count: 30 },
  { name: "QA", count: 40 },
  { name: "Data Science", count: 25 },
  { name: "Product", count: 15 }
];

const departmentBreakdown = [
  { department: "Engineering", billable: 90, benched: 10 },
  { department: "Design", billable: 25, benched: 5 },
  { department: "QA", billable: 35, benched: 5 },
  { department: "Data Science", billable: 20, benched: 5 },
  { department: "Product", billable: 12, benched: 3 }
];

const detailedMetrics = {
  avgProjectAllocation: 3.5,
  avgBenchTime: 15,
  avgTimeForAllocation: 7
};

const COLORS = ['#22356F', '#008080', '#64748b', '#6366f1', '#8b5cf6'];

const chartConfig = {
  billable: {
    label: "Billable",
    color: "#22356F",
  },
  benched: {
    label: "Benched",
    color: "#008080",
  },
  count: {
    label: "Count",
    color: "#22356F",
  },
  utilization: {
    label: "Utilization",
    color: "#008080",
  },
  efficiency: {
    label: "Efficiency",
    color: "#22356F",
  },
  revenue: {
    label: "Revenue",
    color: "#008080",
  }
};

export const AllocationAnalytics = () => {
  const totalResources = currentAllocation.reduce((sum, dept) => sum + dept.count, 0);
  const billableResources = departmentBreakdown.reduce((sum, dept) => sum + dept.billable, 0);
  const benchedResources = departmentBreakdown.reduce((sum, dept) => sum + dept.benched, 0);
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Total Resources</p>
                <p className="text-2xl font-bold text-[#22356F]">{totalResources}</p>
              </div>
              <div className="p-3 bg-[#22356F]/10 rounded-lg">
                <Users className="h-6 w-6 text-[#22356F]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Billable</p>
                <p className="text-2xl font-bold text-[#008080]">{billableResources}</p>
              </div>
              <div className="p-3 bg-[#008080]/10 rounded-lg">
                <Clock className="h-6 w-6 text-[#008080]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Utilization Rate</p>
                <p className="text-2xl font-bold text-slate-700">{((billableResources / totalResources) * 100).toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">Benched</p>
                <p className="text-2xl font-bold text-slate-600">{benchedResources}</p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allocation Trend */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#22356F] font-bold">Allocation Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={allocationTrend} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                  <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="billable" 
                    stroke="#22356F" 
                    strokeWidth={3}
                    dot={{ fill: '#22356F', strokeWidth: 2, r: 4 }}
                    name="Billable"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benched" 
                    stroke="#008080" 
                    strokeWidth={3}
                    dot={{ fill: '#008080', strokeWidth: 2, r: 4 }}
                    name="Benched"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Current Allocation */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#22356F] font-bold">Current Allocation</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentAllocation}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ name, count }) => `${name}: ${count}`}
                  >
                    {currentAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-[#22356F] font-bold">Department Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentBreakdown} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                <XAxis dataKey="department" tick={{ fill: '#475569', fontSize: 10 }} />
                <YAxis tick={{ fill: '#475569', fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="billable" fill="#22356F" name="Billable" />
                <Bar dataKey="benched" fill="#008080" name="Benched" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-[#22356F] font-bold">Detailed Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">Avg Project Allocation</span>
            <span className="font-medium text-slate-700">{detailedMetrics.avgProjectAllocation}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">Avg Bench Time (Days)</span>
            <span className="font-medium text-slate-700">{detailedMetrics.avgBenchTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">Avg Time for Allocation (Days)</span>
            <span className="font-medium text-slate-700">{detailedMetrics.avgTimeForAllocation}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

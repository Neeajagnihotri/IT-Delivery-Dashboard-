
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, Target, Award, Building } from "lucide-react";

// Allocation Overview Data
const allocationData = [
  { month: "Jan", billable: 185, benched: 40, shadow: 15, associate: 7 },
  { month: "Feb", billable: 189, benched: 35, shadow: 18, associate: 6 },
  { month: "Mar", billable: 192, benched: 32, shadow: 16, associate: 7 },
  { month: "Apr", billable: 188, benched: 38, shadow: 14, associate: 7 },
  { month: "May", billable: 195, benched: 28, shadow: 18, associate: 6 },
  { month: "Jun", billable: 189, benched: 34, shadow: 18, associate: 6 }
];

// Bench Overview Data
const benchData = [
  { reason: "Between Projects", count: 18, percentage: 53 },
  { reason: "Skills Training", count: 8, percentage: 24 },
  { reason: "Client Ramp Down", count: 5, percentage: 15 },
  { reason: "Personal Leave", count: 3, percentage: 8 }
];

// Skills Distribution Data
const skillsData = [
  { skill: "React", count: 65, demand: 85, proficiency: 88 },
  { skill: "Node.js", count: 52, demand: 75, proficiency: 82 },
  { skill: "Python", count: 48, demand: 90, proficiency: 85 },
  { skill: "Java", count: 42, demand: 70, proficiency: 80 },
  { skill: "AWS", count: 38, demand: 95, proficiency: 78 },
  { skill: "TypeScript", count: 55, demand: 88, proficiency: 90 },
  { skill: "Docker", count: 35, demand: 80, proficiency: 75 },
  { skill: "Kubernetes", count: 28, demand: 85, proficiency: 72 }
];

// Department Breakdown Data
const departmentData = [
  { 
    department: "Engineering", 
    total: 125, 
    billable: 95, 
    benched: 20, 
    shadow: 8, 
    associate: 2,
    utilization: 92,
    avgSalary: 125000
  },
  { 
    department: "Design", 
    total: 28, 
    billable: 22, 
    benched: 4, 
    shadow: 2, 
    associate: 0,
    utilization: 88,
    avgSalary: 95000
  },
  { 
    department: "QA", 
    total: 35, 
    billable: 28, 
    benched: 5, 
    shadow: 2, 
    associate: 0,
    utilization: 85,
    avgSalary: 85000
  },
  { 
    department: "DevOps", 
    total: 22, 
    billable: 20, 
    benched: 1, 
    shadow: 1, 
    associate: 0,
    utilization: 95,
    avgSalary: 135000
  },
  { 
    department: "Product", 
    total: 18, 
    billable: 16, 
    benched: 1, 
    shadow: 1, 
    associate: 0,
    utilization: 90,
    avgSalary: 115000
  },
  { 
    department: "Data Science", 
    total: 19, 
    billable: 15, 
    benched: 3, 
    shadow: 1, 
    associate: 0,
    utilization: 89,
    avgSalary: 140000
  }
];

const chartConfig = {
  billable: { label: "Billable", color: "#10b981" },
  benched: { label: "Benched", color: "#f59e0b" },
  shadow: { label: "Shadow", color: "#8b5cf6" },
  associate: { label: "Associates", color: "#6366f1" },
  count: { label: "Count", color: "#3b82f6" },
  demand: { label: "Market Demand", color: "#ef4444" },
  proficiency: { label: "Avg Proficiency", color: "#8b5cf6" },
  utilization: { label: "Utilization %", color: "#06b6d4" }
};

export const AnalyticsBoard = () => {
  const totalBillable = allocationData[allocationData.length - 1].billable;
  const totalBenched = allocationData[allocationData.length - 1].benched;
  const utilizationRate = Math.round((totalBillable / (totalBillable + totalBenched)) * 100);

  return (
    <div className="space-y-8">
      {/* Allocation Overview Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Allocation Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Allocation Trend */}
          <Card className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Resource Allocation Trends</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">+5% billable resources this quarter</span>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={allocationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="billable" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="benched" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="shadow" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="associate" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Allocation Summary */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600 mb-1">{utilizationRate}%</div>
                <div className="text-sm text-gray-500">Overall Utilization</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Billable</span>
                  <Badge className="bg-green-500 text-white">{totalBillable}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Benched</span>
                  <Badge className="bg-orange-500 text-white">{totalBenched}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Shadow</span>
                  <Badge className="bg-purple-500 text-white">18</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Associates</span>
                  <Badge className="bg-indigo-500 text-white">6</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bench Overview Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-orange-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bench Analysis</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Bench Reasons Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={benchData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ reason, percentage }) => `${reason}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {benchData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'][index]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Bench Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {benchData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.reason}</h4>
                      <p className="text-sm text-gray-500">{item.count} resources</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{item.percentage}%</div>
                      <div className="text-xs text-gray-500">of bench</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Skills Distribution Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Award className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills Distribution</h2>
        </div>
        
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Skills vs Market Demand vs Proficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Resource Count" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="demand" fill="#ef4444" name="Market Demand %" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="proficiency" fill="#8b5cf6" name="Avg Proficiency %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Building className="h-6 w-6 text-teal-600" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Department Breakdown</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Department Utilization & Count</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="#06b6d4" name="Total Resources" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="utilization" fill="#10b981" name="Utilization %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Department Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {departmentData.map((dept, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{dept.department}</h4>
                      <Badge variant="outline">{dept.utilization}% utilized</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <div>Total: {dept.total}</div>
                      <div>Billable: {dept.billable}</div>
                      <div>Benched: {dept.benched}</div>
                      <div>Avg Salary: ${(dept.avgSalary / 1000).toFixed(0)}k</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

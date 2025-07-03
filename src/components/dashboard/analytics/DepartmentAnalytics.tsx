
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react";

const departmentData = [
  { 
    department: "Engineering", 
    total: 125, 
    billable: 98, 
    benched: 20, 
    shadow: 5, 
    associate: 2,
    utilization: 78.4,
    avgSalary: 125000,
    revenue: 1850000,
    efficiency: 92
  },
  { 
    department: "Design", 
    total: 28, 
    billable: 24, 
    benched: 3, 
    shadow: 1, 
    associate: 0,
    utilization: 85.7,
    avgSalary: 95000,
    revenue: 420000,
    efficiency: 88
  },
  { 
    department: "QA", 
    total: 35, 
    billable: 30, 
    benched: 4, 
    shadow: 1, 
    associate: 0,
    utilization: 85.7,
    avgSalary: 85000,
    revenue: 540000,
    efficiency: 85
  },
  { 
    department: "DevOps", 
    total: 22, 
    billable: 18, 
    benched: 2, 
    shadow: 2, 
    associate: 0,
    utilization: 81.8,
    avgSalary: 135000,
    revenue: 610000,
    efficiency: 95
  },
  { 
    department: "Product", 
    total: 18, 
    billable: 15, 
    benched: 2, 
    shadow: 1, 
    associate: 0,
    utilization: 83.3,
    avgSalary: 115000,
    revenue: 380000,
    efficiency: 89
  },
  { 
    department: "Data Science", 
    total: 19, 
    billable: 4, 
    benched: 3, 
    shadow: 8, 
    associate: 4,
    utilization: 21.1,
    avgSalary: 140000,
    revenue: 160000,
    efficiency: 78
  }
];

const COLORS = ['#22356F', '#008080', '#64748b', '#6366f1', '#8b5cf6', '#06b6d4'];

const chartConfig = {
  total: {
    label: "Total",
    color: "#22356F",
  },
  billable: {
    label: "Billable",
    color: "#008080",
  },
  revenue: {
    label: "Revenue",
    color: "#008080",
  },
  utilization: {
    label: "Utilization",
    color: "#22356F",
  },
  efficiency: {
    label: "Efficiency",
    color: "#008080",
  }
};

export const DepartmentAnalytics = () => {
  const totalEmployees = departmentData.reduce((sum, dept) => sum + dept.total, 0);
  const totalRevenue = departmentData.reduce((sum, dept) => sum + dept.revenue, 0);
  const avgUtilization = Math.round(departmentData.reduce((sum, dept) => sum + dept.utilization, 0) / departmentData.length);
  const avgEfficiency = Math.round(departmentData.reduce((sum, dept) => sum + dept.efficiency, 0) / departmentData.length);
  
  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Employees</p>
                <p className="text-2xl font-bold text-[#22356F]">{totalEmployees}</p>
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
                <p className="text-sm text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-[#008080]">${(totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="p-3 bg-[#008080]/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-[#008080]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Utilization</p>
                <p className="text-2xl font-bold text-slate-700">{avgUtilization}%</p>
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
                <p className="text-sm text-slate-600">Avg Efficiency</p>
                <p className="text-2xl font-bold text-slate-700">{avgEfficiency}%</p>
              </div>
              <div className="p-3 bg-slate-100 rounded-lg">
                <Building2 className="h-6 w-6 text-slate-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Size Distribution */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#22356F] text-xl">Department Size Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="total"
                    label={({ department, total }) => `${department}: ${total}`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue by Department */}
        <Card className="bg-white border-slate-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-[#22356F] text-xl">Revenue by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                  <XAxis 
                    dataKey="department" 
                    tick={{ fill: '#475569', fontSize: 12 }} 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`$${(value as number / 1000).toFixed(0)}k`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#008080" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Utilization vs Efficiency */}
      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-[#22356F] text-xl">Utilization vs Efficiency Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                <XAxis 
                  dataKey="department" 
                  tick={{ fill: '#475569', fontSize: 12 }} 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="utilization" fill="#22356F" name="Utilization %" />
                <Bar dataKey="efficiency" fill="#008080" name="Efficiency %" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Detailed Department Table */}
      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-[#22356F] text-xl">Department Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departmentData.map((dept, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <h4 className="font-semibold text-[#22356F] text-xl">{dept.department}</h4>
                  </div>
                  <div className="flex space-x-3">
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {dept.total} employees
                    </Badge>
                    <Badge variant={dept.utilization >= 80 ? "default" : "secondary"} className="text-sm px-3 py-1">
                      {dept.utilization}% utilized
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm mb-6">
                  <div>
                    <p className="text-slate-600 mb-1">Billable</p>
                    <p className="font-bold text-[#008080] text-lg">{dept.billable}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Benched</p>
                    <p className="font-bold text-slate-600 text-lg">{dept.benched}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Avg Salary</p>
                    <p className="font-bold text-lg">${(dept.avgSalary / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Revenue</p>
                    <p className="font-bold text-[#008080] text-lg">${(dept.revenue / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Efficiency</p>
                    <p className="font-bold text-[#22356F] text-lg">{dept.efficiency}%</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Utilization Rate</span>
                    <span>{dept.utilization}%</span>
                  </div>
                  <Progress value={dept.utilization} className="h-3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  RefreshCw,
  Filter,
  UserCheck,
  Building,
  GraduationCap
} from "lucide-react";
import { HRKPIDetailModal } from "./HRKPIDetailModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const attritionData = [
  { month: 'Jan', rate: 2.1, target: 2.5 },
  { month: 'Feb', rate: 1.8, target: 2.5 },
  { month: 'Mar', rate: 2.5, target: 2.5 },
  { month: 'Apr', rate: 1.9, target: 2.5 },
  { month: 'May', rate: 2.3, target: 2.5 },
  { month: 'Jun', rate: 1.7, target: 2.5 },
];

const headcountByLocation = [
  { location: 'New York', count: 85, fill: '#22356F', percentage: 34.4 },
  { location: 'San Francisco', count: 67, fill: '#008080', percentage: 27.1 },
  { location: 'Austin', count: 43, fill: '#37474F', percentage: 17.4 },
  { location: 'Remote', count: 52, fill: '#475569', percentage: 21.1 },
];

const attendanceData = [
  { day: 'Mon', present: 235, absent: 12, percentage: 95.1 },
  { day: 'Tue', present: 240, absent: 7, percentage: 97.2 },
  { day: 'Wed', present: 238, absent: 9, percentage: 96.4 },
  { day: 'Thu', present: 242, absent: 5, percentage: 98.0 },
  { day: 'Fri', present: 245, absent: 2, percentage: 99.2 },
];

const departmentMetrics = [
  {
    name: 'Engineering',
    headcount: 89,
    retentionRate: 96.5,
    attendanceRate: 97.2,
    satisfaction: 4.3,
    newHires: 8,
    color: 'from-deep-blue to-teal'
  },
  {
    name: 'Design',
    headcount: 34,
    retentionRate: 94.8,
    attendanceRate: 96.1,
    satisfaction: 4.1,
    newHires: 3,
    color: 'from-teal to-deep-blue'
  },
  {
    name: 'Marketing',
    headcount: 28,
    retentionRate: 92.3,
    attendanceRate: 95.7,
    satisfaction: 3.9,
    newHires: 2,
    color: 'from-slate to-charcoal'
  }
];

export const HRDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showKPIDetail, setShowKPIDetail] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<string>("");
  const [kpiData, setKpiData] = useState({
    totalEmployees: 247,
    activeEmployees: 235,
    newHires: 13,
    pendingOnboarding: 5,
    averageAttrition: 2.05,
    averageAttendance: 96.4,
    employeeSatisfaction: 4.2,
    totalDepartments: 8,
    retentionRate: 94.2,
    openPositions: 13,
    trainingCompletion: 91.5
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setKpiData(prev => ({
        ...prev,
        totalEmployees: prev.totalEmployees + Math.floor(Math.random() * 3),
        newHires: Math.floor(Math.random() * 5) + 10,
      }));
      setIsRefreshing(false);
    }, 1500);
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log(`Period changed to: ${period}`);
  };

  const handleDepartmentDrilldown = (department: string) => {
    console.log(`Drilling down into ${department} department`);
  };

  const handleKPIClick = (kpiType: string) => {
    setSelectedKPI(kpiType);
    setShowKPIDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white border-2 border-soft-silver/30 p-2 rounded-2xl shadow-lg h-16">
          <TabsTrigger 
            value="overview" 
            className="text-sm sm:text-base font-bold min-h-[48px] flex items-center gap-2 rounded-xl data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="text-sm sm:text-base font-bold min-h-[48px] flex items-center gap-2 rounded-xl data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="reports" 
            className="text-sm sm:text-base font-bold min-h-[48px] flex items-center gap-2 rounded-xl data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue"
          >
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['weekly', 'monthly', 'quarterly'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={`rounded-xl transition-all duration-300 ${
                    selectedPeriod === period 
                      ? 'bg-deep-blue hover:bg-deep-blue/90 text-white shadow-lg' 
                      : 'border-deep-blue/20 hover:border-teal hover:bg-teal/5 text-deep-blue'
                  }`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
            <Button 
              onClick={() => setIsRefreshing(true)}
              disabled={isRefreshing}
              className="bg-teal hover:bg-teal/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Attrition Trend */}
            <Card className="bg-white border border-deep-blue/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b border-deep-blue/10">
                <CardTitle className="text-deep-blue flex items-center gap-3">
                  <div className="p-2 bg-deep-blue rounded-xl shadow-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  Attrition Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attritionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff',
                          border: '1px solid #22356F',
                          borderRadius: '12px',
                          boxShadow: '0 4px 20px rgba(34, 53, 111, 0.15)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        stroke="#22356F" 
                        strokeWidth={3}
                        dot={{ fill: '#008080', strokeWidth: 2, r: 6 }}
                        name="Actual Rate"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#008080" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#008080', strokeWidth: 2, r: 4 }}
                        name="Target Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Headcount by Location */}
            <Card className="bg-white border border-teal/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="border-b border-teal/10">
                <CardTitle className="text-deep-blue flex items-center gap-3">
                  <div className="p-2 bg-teal rounded-xl shadow-lg">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Headcount Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={headcountByLocation}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="count"
                        label={({ location, percentage }) => `${location}: ${percentage}%`}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#ffffff',
                          border: '1px solid #22356F',
                          borderRadius: '12px',
                          boxShadow: '0 4px 20px rgba(34, 53, 111, 0.15)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Tracking */}
          <Card className="bg-white border border-charcoal/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="border-b border-charcoal/10">
              <CardTitle className="text-deep-blue flex items-center gap-3">
                <div className="p-2 bg-charcoal rounded-xl shadow-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                Weekly Attendance Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #22356F',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(34, 53, 111, 0.15)'
                      }}
                    />
                    <Bar dataKey="present" fill="#008080" name="Present" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="#37474F" name="Absent" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Department Performance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {departmentMetrics.map((dept, index) => (
              <Card 
                key={dept.name}
                className="bg-white border border-deep-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleDepartmentDrilldown(dept.name)}
              >
                <CardHeader className={`bg-gradient-to-r ${dept.color} text-white rounded-t-lg`}>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {dept.name}
                    <Badge className="bg-white/20 text-white border-white/30">
                      {dept.headcount} people
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate">Retention Rate</span>
                        <span className="text-deep-blue font-medium">{dept.retentionRate}%</span>
                      </div>
                      <Progress value={dept.retentionRate} className="h-3 bg-light-bg" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate">Attendance</span>
                        <span className="text-deep-blue font-medium">{dept.attendanceRate}%</span>
                      </div>
                      <Progress value={dept.attendanceRate} className="h-3 bg-light-bg" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate">Satisfaction</span>
                        <span className="text-deep-blue font-medium">{dept.satisfaction}/5</span>
                      </div>
                      <Progress value={(dept.satisfaction / 5) * 100} className="h-3 bg-light-bg" />
                    </div>
                    
                    <div className="pt-2 border-t border-soft-silver/30">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate">New Hires:</span>
                        <Badge className="bg-teal/10 text-teal border-teal/20">
                          +{dept.newHires} this month
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics content */}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Reports content */}
        </TabsContent>
      </Tabs>

      {/* HRKPIDetailModal */}
      <HRKPIDetailModal 
        open={showKPIDetail} 
        onOpenChange={setShowKPIDetail} 
        kpiType={selectedKPI}
      />
    </div>
  );
};

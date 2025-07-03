
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, UserCheck, Building, TrendingUp } from "lucide-react";

interface ResourceManagementModuleProps {
  data: any;
  expanded?: boolean;
}

export const ResourceManagementModule = ({ data, expanded = false }: ResourceManagementModuleProps) => {
  // Consistent data structure
  const resourceData = {
    total: data?.total || 247,
    billable: data?.billable || 189,
    benched: data?.benched || 34,
    shadow: data?.shadow || 18,
    internal: data?.internal || 12,
    zapminds: data?.zapminds || 6,
    by_department: data?.by_department || {
      engineering: 85,
      design: 32,
      qa: 28,
      devops: 18,
      management: 12
    }
  };

  const departmentData = Object.entries(resourceData.by_department).map(([dept, count]) => ({
    name: dept.charAt(0).toUpperCase() + dept.slice(1),
    value: count as number,
    fill: "#22356F"
  }));

  const utilizationRate = Math.round((resourceData.billable / resourceData.total) * 100);

  return (
    <Card className="bg-white border border-deep-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-light-bg to-white border-b border-deep-blue/20 p-4 md:p-6 rounded-t-2xl">
        <CardTitle className="flex items-center space-x-3 text-deep-blue">
          <div className="p-2 md:p-3 bg-gradient-to-r from-deep-blue to-teal rounded-2xl shadow-lg">
            <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </div>
          <span className="font-bold text-lg md:text-xl">Resource Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4 md:p-6">
        {/* Enhanced Resource Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="group text-center p-4 md:p-6 bg-gradient-to-br from-white to-light-bg rounded-2xl border border-deep-blue/20 hover:border-teal/40 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-deep-blue mb-2 group-hover:text-teal transition-colors duration-300">
              {resourceData.total}
            </div>
            <div className="text-sm md:text-base text-slate font-medium mb-2">Total Resources</div>
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-xs text-emerald-500 font-medium">+12% this month</span>
            </div>
          </div>
          
          <div className="group text-center p-4 md:p-6 bg-gradient-to-br from-teal/5 to-teal/10 rounded-2xl border border-teal/20 hover:border-teal/40 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-teal mb-2 group-hover:scale-105 transition-transform duration-300">
              {resourceData.billable}
            </div>
            <div className="text-sm md:text-base text-slate font-medium mb-2">Billable</div>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs px-2 py-1">
              Active
            </Badge>
          </div>
          
          <div className="group text-center p-4 md:p-6 bg-gradient-to-br from-white to-light-bg rounded-2xl border border-deep-blue/20 hover:border-slate/40 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-slate mb-2 group-hover:text-deep-blue transition-colors duration-300">
              {resourceData.benched}
            </div>
            <div className="text-sm md:text-base text-slate font-medium mb-2">Available</div>
            <Badge className="bg-slate/10 text-slate border-slate/20 text-xs px-2 py-1">
              Ready
            </Badge>
          </div>
        </div>

        {/* Enhanced Utilization Rate */}
        <div className="space-y-4 p-4 md:p-6 bg-gradient-to-r from-white to-light-bg rounded-2xl border border-deep-blue/20 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-deep-blue rounded-xl shadow-lg">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              <span className="text-base md:text-lg font-semibold text-deep-blue">Utilization Rate</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-deep-blue">{utilizationRate}%</span>
              <p className="text-xs text-slate">Target: 85%</p>
            </div>
          </div>
          <Progress 
            value={utilizationRate} 
            className="h-4 bg-white shadow-inner rounded-full overflow-hidden"
          />
          <div className="flex justify-between text-xs text-slate">
            <span>0%</span>
            <span className="text-deep-blue font-medium">Current: {utilizationRate}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Enhanced Department Breakdown */}
        <div className="p-4 md:p-6 bg-white rounded-2xl border border-deep-blue/20 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-teal rounded-xl shadow-lg">
              <Building className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-deep-blue">Department Distribution</h4>
          </div>
          <div className="h-48 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#475569', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fill: '#475569', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #22356F',
                    borderRadius: '12px',
                    color: '#22356F',
                    boxShadow: '0 4px 20px rgba(34, 53, 111, 0.15)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[6, 6, 0, 0]} 
                  fill="#22356F"
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="group flex items-center space-x-4 p-4 md:p-6 bg-gradient-to-r from-teal/5 to-teal/10 rounded-2xl border border-teal/20 hover:border-teal/40 hover:shadow-lg transition-all duration-300">
            <div className="p-3 bg-teal rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg md:text-xl text-deep-blue group-hover:text-teal transition-colors duration-300">
                Active Resources
              </div>
              <div className="text-sm md:text-base text-slate font-medium">
                {resourceData.billable} currently allocated
              </div>
              <div className="text-xs text-emerald-600 font-medium mt-1">
                ↗ 8% increase this week
              </div>
            </div>
          </div>
          
          <div className="group flex items-center space-x-4 p-4 md:p-6 bg-gradient-to-r from-white to-light-bg rounded-2xl border border-deep-blue/20 hover:border-deep-blue/40 hover:shadow-lg transition-all duration-300">
            <div className="p-3 bg-deep-blue rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-lg md:text-xl text-deep-blue group-hover:text-teal transition-colors duration-300">
                Active Departments
              </div>
              <div className="text-sm md:text-base text-slate font-medium">
                {Object.keys(resourceData.by_department).length} departments
              </div>
              <div className="text-xs text-deep-blue font-medium mt-1">
                All departments operational
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

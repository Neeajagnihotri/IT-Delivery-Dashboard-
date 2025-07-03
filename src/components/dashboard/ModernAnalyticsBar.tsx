
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const departmentData = [
  { name: "Engineering", allocation: 85, fill: "#22356F" },
  { name: "Design", allocation: 70, fill: "#008080" },
  { name: "QA", allocation: 90, fill: "#22356F" },
  { name: "DevOps", allocation: 75, fill: "#008080" },
  { name: "Support", allocation: 65, fill: "#22356F" }
];

const utilizationData = [
  { month: "Jan", utilization: 85, efficiency: 82, fill: "#22356F" },
  { month: "Feb", utilization: 88, efficiency: 85, fill: "#008080" },
  { month: "Mar", utilization: 82, efficiency: 80, fill: "#22356F" },
  { month: "Apr", utilization: 90, efficiency: 88, fill: "#008080" },
  { month: "May", utilization: 87, efficiency: 86, fill: "#22356F" },
  { month: "Jun", utilization: 92, efficiency: 90, fill: "#008080" }
];

export const ModernAnalyticsBar = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Department Allocation Breakdown */}
      <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-slate-50 border-b border-slate-200 pb-4">
          <CardTitle className="flex items-center space-x-3 text-deep-blue">
            <div className="p-2 bg-deep-blue rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold">Department Allocation Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis 
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    color: '#22356F',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="allocation" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Utilization vs Efficiency Analysis */}
      <Card className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-slate-50 border-b border-slate-200 pb-4">
          <CardTitle className="flex items-center space-x-3 text-deep-blue">
            <div className="p-2 bg-teal rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold">Utilization vs Efficiency Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.7} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis 
                  tick={{ fill: '#475569', fontSize: 12 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    color: '#22356F',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="utilization" fill="#22356F" radius={[2, 2, 0, 0]} />
                <Bar dataKey="efficiency" fill="#008080" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

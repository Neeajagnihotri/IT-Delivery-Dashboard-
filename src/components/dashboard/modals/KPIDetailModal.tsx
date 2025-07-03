
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Calendar, MapPin } from "lucide-react";

interface KPIDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpiType: string;
}

const getKPIData = (type: string) => {
  switch (type) {
    case "total_resources":
      return {
        title: "Total Resources",
        value: "247",
        data: [
          { month: "Jan", count: 235 },
          { month: "Feb", count: 238 },
          { month: "Mar", count: 242 },
          { month: "Apr", count: 245 },
          { month: "May", count: 247 },
          { month: "Jun", count: 247 }
        ],
        breakdown: [
          { category: "Engineering", count: 125, percentage: 51 },
          { category: "Design", count: 28, percentage: 11 },
          { category: "QA", count: 35, percentage: 14 },
          { category: "DevOps", count: 22, percentage: 9 },
          { category: "Product", count: 18, percentage: 7 },
          { category: "Others", count: 19, percentage: 8 }
        ]
      };
    case "billable":
      return {
        title: "Billable Resources",
        value: "189",
        data: [
          { month: "Jan", count: 178 },
          { month: "Feb", count: 182 },
          { month: "Mar", count: 185 },
          { month: "Apr", count: 187 },
          { month: "May", count: 189 },
          { month: "Jun", count: 189 }
        ],
        breakdown: [
          { category: "Senior", count: 75, percentage: 40 },
          { category: "Mid-level", count: 68, percentage: 36 },
          { category: "Junior", count: 46, percentage: 24 }
        ]
      };
    default:
      return {
        title: "KPI Details",
        value: "0",
        data: [],
        breakdown: []
      };
  }
};

const chartConfig = {
  count: { label: "Count", color: "#3b82f6" }
};

export const KPIDetailModal = ({ open, onOpenChange, kpiType }: KPIDetailModalProps) => {
  const kpiData = getKPIData(kpiType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600" />
            {kpiData.title} - Detailed Analytics
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Current Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{kpiData.value}</div>
                <div className="text-sm text-gray-500">Total Count</div>
              </div>
              
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+8% from last month</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Last updated: Today at 2:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>Global distribution</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">6-Month Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpiData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {kpiData.breakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.count}</Badge>
                      <span className="text-sm text-gray-500">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={kpiData.breakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

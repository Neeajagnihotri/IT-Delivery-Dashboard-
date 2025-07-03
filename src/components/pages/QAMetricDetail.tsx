
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Shield } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const QAMetricDetail = () => {
  const navigate = useNavigate();
  const { metricType } = useParams();

  const getMetricData = () => {
    switch (metricType) {
      case 'test-coverage':
        return {
          title: "Test Coverage",
          value: "85.7%",
          badge: "Good",
          badgeColor: "bg-slate text-white",
          description: "Unit & Integration tests",
          trend: "up",
          trendData: [
            { month: "Jan", value: 78.2 },
            { month: "Feb", value: 81.1 },
            { month: "Mar", value: 83.3 },
            { month: "Apr", value: 84.8 },
            { month: "May", value: 85.2 },
            { month: "Jun", value: 85.7 }
          ],
          breakdown: [
            { name: "Unit Tests", value: 1250, color: "#0891b2" },
            { name: "Integration Tests", value: 340, color: "#1e40af" },
            { name: "E2E Tests", value: 95, color: "#7c3aed" }
          ]
        };
      case 'test-execution-rate':
        return {
          title: "Test Execution Rate",
          value: "95%",
          badge: "Excellent",
          badgeColor: "bg-charcoal text-white",
          description: "Automated test execution",
          trend: "up",
          trendData: [
            { month: "Jan", value: 88 },
            { month: "Feb", value: 91 },
            { month: "Mar", value: 93 },
            { month: "Apr", value: 94 },
            { month: "May", value: 94.5 },
            { month: "Jun", value: 95 }
          ],
          breakdown: [
            { name: "Automated", value: 1598, color: "#10b981" },
            { name: "Manual", value: 87, color: "#f59e0b" }
          ]
        };
      default:
        return null;
    }
  };

  const metricData = getMetricData();

  if (!metricData) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-deep-blue mb-4">Metric Not Found</h2>
          <Button onClick={() => navigate('/')} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg">
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline" 
            className="mb-4 border-black/20 hover:border-black/40"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">{metricData.title}</h1>
              <p className="text-slate-600">{metricData.description}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-deep-blue mb-2">{metricData.value}</div>
              <Badge className={`${metricData.badgeColor} text-sm`}>{metricData.badge}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Trend Chart */}
          <Card className="bg-white border border-black/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                6-Month Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metricData.trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1e40af" 
                      strokeWidth={3}
                      dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Chart */}
          <Card className="bg-white border border-black/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Test Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metricData.breakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {metricData.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Statistics */}
        <Card className="bg-white border border-black/20 shadow-lg">
          <CardHeader>
            <CardTitle>Test Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-light-bg rounded-xl border border-black/10">
                <div className="text-sm font-medium text-slate mb-1">Total Tests</div>
                <div className="text-2xl font-bold text-deep-blue">
                  {metricData.breakdown.reduce((sum, item) => sum + item.value, 0)}
                </div>
              </div>
              <div className="p-4 bg-light-bg rounded-xl border border-black/10">
                <div className="text-sm font-medium text-slate mb-1">Pass Rate</div>
                <div className="text-2xl font-bold text-green-600">{metricData.value}</div>
              </div>
              <div className="p-4 bg-light-bg rounded-xl border border-black/10">
                <div className="text-sm font-medium text-slate mb-1">Failed Tests</div>
                <div className="text-2xl font-bold text-red-600">
                  {Math.round((100 - parseFloat(metricData.value)) * metricData.breakdown.reduce((sum, item) => sum + item.value, 0) / 100)}
                </div>
              </div>
              <div className="p-4 bg-light-bg rounded-xl border border-black/10">
                <div className="text-sm font-medium text-slate mb-1">Automation Level</div>
                <div className="text-2xl font-bold text-blue-600">
                  {metricType === 'test-execution-rate' ? '94.8%' : '89.2%'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

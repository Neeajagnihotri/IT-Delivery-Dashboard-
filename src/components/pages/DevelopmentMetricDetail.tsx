
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export const DevelopmentMetricDetail = () => {
  const navigate = useNavigate();
  const { metricType } = useParams();

  const getMetricData = () => {
    switch (metricType) {
      case 'code-coverage':
        return {
          title: "Code Coverage",
          value: "91.4%",
          badge: "Excellent",
          badgeColor: "bg-teal text-white",
          description: "Based on SonarQube metrics",
          trend: "up",
          trendData: [
            { month: "Jan", value: 87.2 },
            { month: "Feb", value: 89.1 },
            { month: "Mar", value: 90.3 },
            { month: "Apr", value: 91.4 },
            { month: "May", value: 91.4 },
            { month: "Jun", value: 91.4 }
          ],
          breakdown: [
            { name: "Frontend", coverage: 94.2 },
            { name: "Backend", coverage: 89.8 },
            { name: "API", coverage: 92.1 },
            { name: "Utils", coverage: 88.5 }
          ]
        };
      case 'pr-average-time':
        return {
          title: "PR Average Time",
          value: "4.2h",
          badge: "Good",
          badgeColor: "bg-deep-blue text-white",
          description: "Average merge time",
          trend: "down",
          trendData: [
            { month: "Jan", value: 6.1 },
            { month: "Feb", value: 5.8 },
            { month: "Mar", value: 5.2 },
            { month: "Apr", value: 4.8 },
            { month: "May", value: 4.5 },
            { month: "Jun", value: 4.2 }
          ],
          breakdown: [
            { name: "Small PRs", coverage: 2.1 },
            { name: "Medium PRs", coverage: 4.8 },
            { name: "Large PRs", coverage: 7.3 },
            { name: "Critical PRs", coverage: 3.2 }
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

          {/* Breakdown Chart */}
          <Card className="bg-white border border-black/20 shadow-lg">
            <CardHeader>
              <CardTitle>Breakdown by Component</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricData.breakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="coverage" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card className="bg-white border border-black/20 shadow-lg">
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-light-bg rounded-xl border border-black/10">
                <div className="text-sm font-medium text-slate mb-1">Current Period</div>
                <div className="text-2xl font-bold text-deep-blue">{metricData.value}</div>
              </div>
              <div className="p-4 bg-light-bg rounded-xl border border-black/10">
                <div className="text-sm font-medium text-slate mb-1">Previous Period</div>
                <div className="text-2xl font-bold text-slate">
                  {metricType === 'code-coverage' ? '90.3%' : '4.8h'}
                </div>
              </div>
              <div className="p-4 bg-light-bg rounded-xl border border-black/10">
                <div className="text-sm font-medium text-slate mb-1">Trend</div>
                <div className={`text-2xl font-bold ${metricData.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metricData.trend === 'up' ? '↗ Improving' : '↘ Improving'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

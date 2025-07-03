
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useNavigate } from "react-router-dom";

const executionData = [
  { week: 'Week 1', executed: 245, planned: 260, rate: 94.2 },
  { week: 'Week 2', executed: 280, planned: 285, rate: 98.2 },
  { week: 'Week 3', executed: 315, planned: 320, rate: 98.4 },
  { week: 'Week 4', executed: 295, planned: 310, rate: 95.2 },
];

const trendData = [
  { month: 'Jan', rate: 92.1 },
  { month: 'Feb', rate: 94.3 },
  { month: 'Mar', rate: 96.2 },
  { month: 'Apr', rate: 95.1 },
];

export const TestExecutionRateDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-blue mb-2">Test Execution Rate Details</h1>
          <p className="text-slate">Comprehensive analysis of test execution performance and trends</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Overall Rate</p>
                  <p className="text-3xl font-bold">95.2%</p>
                </div>
                <Badge className="bg-white/20 text-white">Excellent</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate">Tests Executed</p>
                  <p className="text-2xl font-bold text-deep-blue">1,135</p>
                </div>
                <div className="text-xs text-slate">This Month</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate">Tests Planned</p>
                  <p className="text-2xl font-bold text-deep-blue">1,175</p>
                </div>
                <div className="text-xs text-slate">This Month</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate">Avg. Daily</p>
                  <p className="text-2xl font-bold text-deep-blue">47</p>
                </div>
                <div className="text-xs text-slate">Tests/Day</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Execution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Weekly Execution Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={executionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="planned" fill="#22356F" name="Planned Tests" />
                    <Bar dataKey="executed" fill="#008080" name="Executed Tests" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Execution Rate Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="rate" stroke="#008080" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">Test Execution Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-deep-blue font-semibold">Test Suite</th>
                    <th className="text-left p-4 text-deep-blue font-semibold">Planned</th>
                    <th className="text-left p-4 text-deep-blue font-semibold">Executed</th>
                    <th className="text-left p-4 text-deep-blue font-semibold">Rate</th>
                    <th className="text-left p-4 text-deep-blue font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-light-bg">
                    <td className="p-4 text-deep-blue font-medium">Unit Tests</td>
                    <td className="p-4 text-slate">450</td>
                    <td className="p-4 text-slate">438</td>
                    <td className="p-4 text-slate">97.3%</td>
                    <td className="p-4">
                      <Badge className="bg-teal text-white">Excellent</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-light-bg">
                    <td className="p-4 text-deep-blue font-medium">Integration Tests</td>
                    <td className="p-4 text-slate">285</td>
                    <td className="p-4 text-slate">270</td>
                    <td className="p-4 text-slate">94.7%</td>
                    <td className="p-4">
                      <Badge className="bg-deep-blue text-white">Good</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-light-bg">
                    <td className="p-4 text-deep-blue font-medium">E2E Tests</td>
                    <td className="p-4 text-slate">180</td>
                    <td className="p-4 text-slate">165</td>
                    <td className="p-4 text-slate">91.7%</td>
                    <td className="p-4">
                      <Badge className="bg-slate text-white">Fair</Badge>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-light-bg">
                    <td className="p-4 text-deep-blue font-medium">Performance Tests</td>
                    <td className="p-4 text-slate">260</td>
                    <td className="p-4 text-slate">262</td>
                    <td className="p-4 text-slate">100.8%</td>
                    <td className="p-4">
                      <Badge className="bg-teal text-white">Excellent</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

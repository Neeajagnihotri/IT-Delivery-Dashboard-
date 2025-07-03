
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";

export const AutomationCoverageDetail = () => {
  const navigate = useNavigate();

  const coverageData = [
    { name: 'Automated', value: 73, color: '#008080' },
    { name: 'Manual', value: 27, color: '#374B4F' },
  ];

  const categoryData = [
    { name: 'Unit Tests', automated: 95, manual: 5 },
    { name: 'Integration', automated: 78, manual: 22 },
    { name: 'E2E Tests', automated: 65, manual: 35 },
    { name: 'API Tests', automated: 88, manual: 12 },
    { name: 'UI Tests', automated: 45, manual: 55 },
  ];

  const trendData = [
    { month: 'Jan', coverage: 65 },
    { month: 'Feb', coverage: 68 },
    { month: 'Mar', coverage: 70 },
    { month: 'Apr', coverage: 71 },
    { month: 'May', coverage: 73 },
    { month: 'Jun', coverage: 73 },
  ];

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-soft-silver text-deep-blue hover:bg-light-bg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue flex items-center gap-3">
                <Bot className="h-8 w-8" />
                Test Automation Coverage
              </h1>
              <p className="text-slate mt-1">Quality assurance automation metrics and analysis</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-2">Automation Coverage</p>
                  <p className="text-3xl font-bold">73%</p>
                  <p className="text-xs opacity-75">of total tests</p>
                </div>
                <Bot className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-deep-blue to-slate text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-2">Automated Tests</p>
                  <p className="text-3xl font-bold">1,247</p>
                  <p className="text-xs opacity-75">total count</p>
                </div>
                <CheckCircle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate to-charcoal text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-2">Manual Tests</p>
                  <p className="text-3xl font-bold">461</p>
                  <p className="text-xs opacity-75">remaining</p>
                </div>
                <AlertCircle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-deep-blue">
                Coverage Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={coverageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {coverageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-deep-blue">
                Coverage Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="coverage" 
                      stroke="#008080" 
                      strokeWidth={3}
                      name="Automation Coverage %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card className="bg-white shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-deep-blue">
              Coverage by Test Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="automated" fill="#008080" name="Automated %" />
                  <Bar dataKey="manual" fill="#374B4F" name="Manual %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Section */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-deep-blue">
              Analysis & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-deep-blue">
              <div className="p-4 bg-light-bg rounded-lg">
                <h3 className="font-semibold mb-2">📊 Current Status</h3>
                <p className="text-sm">
                  73% automation coverage indicates good progress toward industry best practices. The team has successfully automated 1,247 tests.
                </p>
              </div>
              <div className="p-4 bg-light-bg rounded-lg">
                <h3 className="font-semibold mb-2">🎯 Areas for Improvement</h3>
                <p className="text-sm">
                  UI tests show the lowest automation coverage at 45%. Focus on improving E2E and UI test automation to reach the 80% target.
                </p>
              </div>
              <div className="p-4 bg-light-bg rounded-lg">
                <h3 className="font-semibold mb-2">🚀 Next Steps</h3>
                <p className="text-sm">
                  Prioritize automating the remaining 461 manual tests, starting with high-frequency and regression-prone test cases.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

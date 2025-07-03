
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GitCommit, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export const CommitsDeveloperDetail = () => {
  const navigate = useNavigate();

  const weeklyData = [
    { name: 'Week 1', commits: 7.2, developers: 12 },
    { name: 'Week 2', commits: 8.1, developers: 12 },
    { name: 'Week 3', commits: 9.3, developers: 11 },
    { name: 'Week 4', commits: 8.5, developers: 12 },
    { name: 'Week 5', commits: 8.8, developers: 13 },
    { name: 'Week 6', commits: 8.0, developers: 12 },
  ];

  const developerData = [
    { name: 'Alex R.', commits: 12.3 },
    { name: 'Sarah J.', commits: 9.8 },
    { name: 'Mike C.', commits: 8.5 },
    { name: 'Lisa K.', commits: 7.2 },
    { name: 'John D.', commits: 6.9 },
    { name: 'Emma S.', commits: 8.7 },
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
                <GitCommit className="h-8 w-8" />
                Commits per Developer
              </h1>
              <p className="text-slate mt-1">Development productivity metrics and trends</p>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-2">Average Daily Commits</p>
                  <p className="text-3xl font-bold">8.5</p>
                  <p className="text-xs opacity-75">per developer</p>
                </div>
                <GitCommit className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-2">Active Developers</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs opacity-75">this month</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-slate to-charcoal text-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-2">Trend</p>
                  <p className="text-3xl font-bold">+12%</p>
                  <p className="text-xs opacity-75">vs last month</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-deep-blue">
                Weekly Commits Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="commits" 
                      stroke="#008080" 
                      strokeWidth={3}
                      name="Avg Commits/Developer"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-deep-blue">
                Developer Productivity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={developerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="commits" fill="#22356F" name="Daily Commits" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Section */}
        <Card className="bg-white shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-deep-blue">
              Analysis & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-deep-blue">
              <div className="p-4 bg-light-bg rounded-lg">
                <h3 className="font-semibold mb-2">📈 Productivity Trends</h3>
                <p className="text-sm">
                  Developer productivity has increased by 12% compared to last month, with an average of 8.5 commits per developer per day.
                </p>
              </div>
              <div className="p-4 bg-light-bg rounded-lg">
                <h3 className="font-semibold mb-2">👥 Team Performance</h3>
                <p className="text-sm">
                  The team maintains consistent output with 12 active developers contributing regularly to the codebase.
                </p>
              </div>
              <div className="p-4 bg-light-bg rounded-lg">
                <h3 className="font-semibold mb-2">🎯 Recommendations</h3>
                <p className="text-sm">
                  Continue current development practices while monitoring for potential burnout indicators in high-performing developers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

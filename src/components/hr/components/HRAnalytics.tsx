
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter } from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Users, Calendar, Brain, Download } from "lucide-react";

const attritionPrediction = [
  { employee: "John Smith", department: "Engineering", riskScore: 75, factors: ["Overwork", "Market demand"] },
  { employee: "Sarah Wilson", department: "Marketing", riskScore: 65, factors: ["Career growth", "Salary"] },
  { employee: "Mike Johnson", department: "Design", riskScore: 45, factors: ["Work-life balance"] },
];

const departmentAnalytics = [
  { department: "Engineering", headcount: 89, avgSalary: 95000, retention: 96.5, satisfaction: 4.2 },
  { department: "Design", headcount: 34, avgSalary: 78000, retention: 94.8, satisfaction: 4.1 },
  { department: "Marketing", headcount: 28, avgSalary: 65000, retention: 92.3, satisfaction: 3.9 },
  { department: "Sales", headcount: 45, avgSalary: 72000, retention: 89.7, satisfaction: 3.8 },
];

const performanceData = [
  { quarter: 'Q1 2024', avgRating: 4.1, promotions: 12, training: 156 },
  { quarter: 'Q4 2023', avgRating: 3.9, promotions: 8, training: 143 },
  { quarter: 'Q3 2023', avgRating: 4.0, promotions: 15, training: 134 },
  { quarter: 'Q2 2023', avgRating: 3.8, promotions: 10, training: 128 },
];

const diversityData = [
  { category: 'Gender', male: 145, female: 102, fill: '#22356F' },
  { category: 'Age Groups', '20-30': 98, '31-40': 89, '41-50': 45, '50+': 15 },
  { category: 'Experience', 'Junior': 67, 'Mid': 98, 'Senior': 82 },
];

export const HRAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'bg-red-500 text-white';
    if (score >= 50) return 'bg-yellow-500 text-white';
    return 'bg-teal text-white';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return 'High Risk';
    if (score >= 50) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-deep-blue">HR Analytics & Insights</h2>
        <div className="flex gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-48 border-soft-silver/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="2years">Last 2 Years</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-deep-blue hover:bg-deep-blue/90">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Predictive Analytics */}
      <Card className="bg-white border border-deep-blue/20">
        <CardHeader>
          <CardTitle className="text-deep-blue flex items-center gap-2">
            <div className="p-2 bg-deep-blue rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            Attrition Risk Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attritionPrediction.map((prediction, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-soft-silver/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-light-bg rounded-lg">
                    <Users className="h-5 w-5 text-deep-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-blue">{prediction.employee}</h4>
                    <p className="text-sm text-slate">{prediction.department}</p>
                    <div className="flex gap-2 mt-2">
                      {prediction.factors.map((factor, idx) => (
                        <Badge key={idx} className="bg-light-bg text-deep-blue text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getRiskColor(prediction.riskScore)}>
                    {getRiskLevel(prediction.riskScore)}
                  </Badge>
                  <p className="text-sm text-slate mt-1">Risk Score: {prediction.riskScore}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Performance Analytics */}
      <Card className="bg-white border border-teal/20">
        <CardHeader>
          <CardTitle className="text-deep-blue">Department Performance Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={departmentAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="retention" 
                  domain={[85, 100]}
                  tick={{ fill: '#475569', fontSize: 12 }}
                  label={{ value: 'Retention Rate (%)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  dataKey="satisfaction" 
                  domain={[3.5, 4.5]}
                  tick={{ fill: '#475569', fontSize: 12 }}
                  label={{ value: 'Satisfaction Score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff',
                    border: '1px solid #22356F',
                    borderRadius: '8px' 
                  }}
                  formatter={(value, name, props) => [
                    `${props.payload.department}: ${name === 'satisfaction' ? `${value}/5` : `${value}%`}`,
                    name === 'satisfaction' ? 'Satisfaction' : 'Retention'
                  ]}
                />
                <Scatter dataKey="satisfaction" fill="#008080" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-charcoal/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="quarter" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="avgRating" 
                    stroke="#22356F" 
                    strokeWidth={3}
                    name="Avg Rating"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="promotions" 
                    stroke="#008080" 
                    strokeWidth={3}
                    name="Promotions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Training & Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="quarter" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="training" fill="#37474F" name="Training Hours" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-deep-blue/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-deep-blue rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-deep-blue">Retention Improvement</h3>
            </div>
            <p className="text-2xl font-bold text-deep-blue mb-2">+2.3%</p>
            <p className="text-sm text-slate">Compared to last quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-teal/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-deep-blue">High Performers</h3>
            </div>
            <p className="text-2xl font-bold text-teal mb-2">23%</p>
            <p className="text-sm text-slate">Above 4.5 rating</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-charcoal/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-charcoal rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-deep-blue">At-Risk Employees</h3>
            </div>
            <p className="text-2xl font-bold text-charcoal mb-2">8</p>
            <p className="text-sm text-slate">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Custom Reports Section */}
      <Card className="bg-white border border-deep-blue/20">
        <CardHeader>
          <CardTitle className="text-deep-blue">Custom Report Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Select>
              <SelectTrigger className="border-soft-silver/40">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attendance">Attendance</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="salary">Salary Analysis</SelectItem>
                <SelectItem value="diversity">Diversity</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="border-soft-silver/40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="border-soft-silver/40">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-deep-blue hover:bg-deep-blue/90">
              Generate Report
            </Button>
          </div>
          <div className="p-4 bg-light-bg rounded-lg border border-soft-silver/30">
            <p className="text-sm text-slate text-center">
              Use the filters above to create custom reports and analytics dashboards
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

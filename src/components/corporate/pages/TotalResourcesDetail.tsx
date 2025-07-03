
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, ArrowLeft, Building, MapPin, Award, Calendar } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

const departmentData = [
  { name: 'Engineering', count: 85, color: '#008080' },
  { name: 'Design', count: 28, color: '#22356F' },
  { name: 'QA', count: 18, color: '#37474F' },
  { name: 'Management', count: 15, color: '#64748B' },
  { name: 'HR', count: 10, color: '#475569' }
];

const allResources = [
  { name: 'John Smith', department: 'Engineering', role: 'Senior Developer', status: 'Active', experience: '5+ years', location: 'New York' },
  { name: 'Sarah Johnson', department: 'Design', role: 'UI/UX Designer', status: 'Active', experience: '3+ years', location: 'San Francisco' },
  { name: 'Mike Chen', department: 'QA', role: 'Test Lead', status: 'Active', experience: '4+ years', location: 'Toronto' },
  { name: 'Lisa Wang', department: 'Engineering', role: 'Backend Developer', status: 'Active', experience: '2+ years', location: 'London' },
  { name: 'David Lee', department: 'Management', role: 'Project Manager', status: 'Active', experience: '6+ years', location: 'Austin' },
  { name: 'Emily Davis', department: 'Engineering', role: 'Full Stack Developer', status: 'Active', experience: '4+ years', location: 'Seattle' },
  { name: 'Alex Rodriguez', department: 'Design', role: 'Senior Designer', status: 'Active', experience: '5+ years', location: 'Chicago' },
  { name: 'Tom Wilson', department: 'QA', role: 'QA Engineer', status: 'Active', experience: '3+ years', location: 'Boston' }
];

export const TotalResourcesDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-deep-blue mb-2">Total Resources</h1>
            <p className="text-slate">Complete workforce overview and analytics</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-utilization')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resource Utilization
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">156</div>
              <div className="text-sm opacity-90">Total Resources</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-teal to-slate text-white">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">5</div>
              <div className="text-sm opacity-90">Departments</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-slate to-charcoal text-white">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">8</div>
              <div className="text-sm opacity-90">Locations</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-charcoal to-deep-blue text-white">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">4.2</div>
              <div className="text-sm opacity-90">Avg Experience</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, count }) => `${name}: ${count}`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Resource Count by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#008080" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">All Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {allResources.map((resource, index) => (
                <div key={index} className="p-4 bg-light-bg rounded-xl border border-soft-silver/30 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-deep-blue rounded-lg">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-blue">{resource.name}</h4>
                        <p className="text-sm text-slate">{resource.role}</p>
                      </div>
                    </div>
                    <Badge className="bg-teal text-white text-xs">
                      {resource.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-slate" />
                      <span className="text-slate">{resource.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-slate" />
                      <span className="text-slate">{resource.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-slate" />
                      <span className="text-slate">{resource.experience}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

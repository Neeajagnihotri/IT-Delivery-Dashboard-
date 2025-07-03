import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, ArrowLeft, Users, Calendar, Award, Search, Filter, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InternalResourcesExportModal } from "../modals/InternalResourcesExportModal";

const internalData = [
  { name: 'Operations', count: 5, color: '#22356F' },
  { name: 'Support', count: 4, color: '#008080' },
  { name: 'Admin', count: 3, color: '#37474F' }
];

const internalResources = [
  { id: 1, name: 'Mark Johnson', role: 'Operations Manager', department: 'Operations', type: 'Internal', joinDate: '2020-05-15', projects: 8 },
  { id: 2, name: 'Lisa Chen', role: 'IT Support Lead', department: 'Support', type: 'Internal', joinDate: '2021-03-10', projects: 12 },
  { id: 3, name: 'Robert Williams', role: 'Admin Coordinator', department: 'Admin', type: 'Internal', joinDate: '2019-08-20', projects: 6 },
  { id: 4, name: 'Amanda Davis', role: 'Process Analyst', department: 'Operations', type: 'Internal', joinDate: '2022-01-15', projects: 4 },
  { id: 5, name: 'Kevin Martinez', role: 'System Administrator', department: 'Support', type: 'Internal', joinDate: '2020-11-30', projects: 10 }
];

export const InternalResourcesKPIDetail = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const uniqueDepartments = Array.from(new Set(internalResources.map(resource => resource.department)));

  const filteredResources = internalResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "" || resource.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const avgProjects = Math.round(internalResources.reduce((sum, resource) => sum + resource.projects, 0) / internalResources.length);

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-deep-blue to-teal rounded-2xl shadow-lg">
              <Building className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Internal Resources Analytics</h1>
              <p className="text-slate">Internal operations and support team insights</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resource Management
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-sm opacity-90">Internal Resources</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-teal to-slate text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-sm opacity-90">Departments</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-slate to-charcoal text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{avgProjects}</div>
              <div className="text-sm opacity-90">Avg Projects</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-charcoal to-deep-blue text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">3.2</div>
              <div className="text-sm opacity-90">Avg Tenure (Years)</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={internalData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, count }) => `${name}: ${count}`}
                    >
                      {internalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Project Involvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={internalResources}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#374B4F" />
                    <YAxis stroke="#374B4F" />
                    <Tooltip />
                    <Bar dataKey="projects" fill="#22356F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Export */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate" />
                <Input
                  placeholder="Search internal resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-soft-silver/40 focus:border-teal"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48 border-slate text-slate">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    {uniqueDepartments.map(department => (
                      <SelectItem key={department} value={department}>{department}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-teal hover:bg-teal/90 text-white"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Internal Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Internal Resources Table */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Internal Resources Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-deep-blue font-semibold">Employee</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Department</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Role</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Join Date</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Projects</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Type</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id} className="hover:bg-light-bg/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-deep-blue/10 rounded-lg">
                            <Building className="h-4 w-4 text-deep-blue" />
                          </div>
                          <div className="font-medium text-deep-blue">{resource.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-teal/10 text-teal border-teal/20">
                          {resource.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate">{resource.role}</TableCell>
                      <TableCell className="text-slate">{new Date(resource.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium text-deep-blue">{resource.projects}</TableCell>
                      <TableCell>
                        <Badge className="bg-deep-blue/10 text-deep-blue border-deep-blue/20">
                          {resource.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-deep-blue text-deep-blue hover:bg-deep-blue/5">
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal/5">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <InternalResourcesExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

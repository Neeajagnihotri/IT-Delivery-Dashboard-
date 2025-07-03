
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, ArrowLeft, Clock, Users, Search, Filter, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShadowResourcesExportModal } from "../modals/ShadowResourcesExportModal";

const shadowData = [
  { name: 'Learning Phase', count: 12, color: '#22356F' },
  { name: 'Transition', count: 4, color: '#008080' },
  { name: 'Observation', count: 2, color: '#37474F' }
];

const shadowResources = [
  { id: 1, name: 'Emma Wilson', role: 'Junior Developer', mentor: 'John Smith', status: 'Learning', startDate: '2024-01-15', progress: 75 },
  { id: 2, name: 'Daniel Brown', role: 'QA Trainee', mentor: 'Mike Chen', status: 'Transition', startDate: '2024-02-01', progress: 60 },
  { id: 3, name: 'Sophie Davis', role: 'UI Designer', mentor: 'Sarah Johnson', status: 'Learning', startDate: '2024-01-20', progress: 85 },
  { id: 4, name: 'Ryan Taylor', role: 'Backend Developer', mentor: 'Alex Rodriguez', status: 'Observation', startDate: '2024-02-10', progress: 45 },
  { id: 5, name: 'Mia Garcia', role: 'DevOps Trainee', mentor: 'Jennifer Lee', status: 'Learning', startDate: '2024-01-25', progress: 70 }
];

export const ShadowResourcesKPIDetail = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const uniquePhases = Array.from(new Set(shadowResources.map(resource => resource.status)));

  const filteredResources = shadowResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.mentor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = selectedPhase === "all" || resource.status === selectedPhase;
    return matchesSearch && matchesPhase;
  });

  const avgProgress = Math.round(shadowResources.reduce((sum, resource) => sum + resource.progress, 0) / shadowResources.length);

  const handleViewDetails = (resourceId: number) => {
    console.log('Navigating to resource detail:', resourceId);
    navigate(`/resource-detail/${resourceId}`);
  };

  const handleUpdateProgress = (resourceId: number) => {
    console.log('Opening progress update for resource:', resourceId);
    alert(`Update progress for resource ID: ${resourceId}. This functionality will open a progress update modal.`);
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-charcoal to-slate rounded-2xl shadow-lg">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Shadow Resources Analytics</h1>
              <p className="text-slate">Training and mentorship program insights</p>
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
          <Card className="bg-gradient-to-r from-charcoal to-slate text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">18</div>
              <div className="text-sm opacity-90">Shadow Resources</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-slate to-deep-blue text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">12</div>
              <div className="text-sm opacity-90">Active Mentors</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-deep-blue to-teal text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{avgProgress}%</div>
              <div className="text-sm opacity-90">Avg Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-teal to-charcoal text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">8.5</div>
              <div className="text-sm opacity-90">Avg Weeks</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white rounded-2xl shadow-lg border border-charcoal/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Shadow Phase Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={shadowData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, count }) => `${name}: ${count}`}
                    >
                      {shadowData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-slate/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shadowResources}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#374B4F" />
                    <YAxis stroke="#374B4F" />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#23272F" />
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
                  placeholder="Search shadow resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-soft-silver/40 focus:border-teal"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                  <SelectTrigger className="w-48 border-slate text-slate">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by Phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Phases</SelectItem>
                    {uniquePhases.map(phase => (
                      <SelectItem key={phase} value={phase}>{phase}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-teal hover:bg-teal/90 text-white"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Progress Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shadow Resources Table */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Shadow Resources Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-deep-blue font-semibold">Resource</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Mentor</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Status</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Start Date</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Progress</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id} className="hover:bg-light-bg/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-deep-blue">{resource.name}</div>
                          <div className="text-sm text-slate">{resource.role}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate">{resource.mentor}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          resource.status === 'Learning' ? 'bg-deep-blue/10 text-deep-blue border-deep-blue/20' :
                          resource.status === 'Transition' ? 'bg-teal/10 text-teal border-teal/20' :
                          'bg-slate/10 text-slate border-slate/20'
                        }`}>
                          {resource.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate">{new Date(resource.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-charcoal h-2 rounded-full" 
                              style={{ width: `${resource.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate">{resource.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-deep-blue text-deep-blue hover:bg-deep-blue/5"
                            onClick={() => handleViewDetails(resource.id)}
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-teal text-teal hover:bg-teal/5"
                            onClick={() => handleUpdateProgress(resource.id)}
                          >
                            Update Progress
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

      <ShadowResourcesExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

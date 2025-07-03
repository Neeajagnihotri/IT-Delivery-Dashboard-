
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, ArrowLeft, Star, Trophy, Calendar, Search, Filter, Download, Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ZapmindsResourcesExportModal } from "../modals/ZapmindsResourcesExportModal";

const zapmindsProjects = [
  { name: 'AI Innovation Lab', count: 2, color: '#22356F' },
  { name: 'Data Analytics Platform', count: 2, color: '#008080' },
  { name: 'Automation Framework', count: 2, color: '#374B4F' }
];

const zapmindsResources = [
  { 
    id: 1, 
    name: 'Dr. Sarah Thompson', 
    role: 'AI Research Lead', 
    project: 'AI Innovation Lab',
    assignment: 'Technical Leadership',
    rating: 9.5, 
    experience: '8+ years',
    skills: ['Machine Learning', 'Python', 'TensorFlow']
  },
  { 
    id: 2, 
    name: 'Michael Chen', 
    role: 'Data Scientist', 
    project: 'Data Analytics Platform',
    assignment: 'Analytics Development',
    rating: 9.2, 
    experience: '6+ years',
    skills: ['Big Data', 'SQL', 'R']
  },
  { 
    id: 3, 
    name: 'Elena Rodriguez', 
    role: 'ML Engineer', 
    project: 'AI Innovation Lab',
    assignment: 'Model Development',
    rating: 8.8, 
    experience: '4+ years',
    skills: ['Deep Learning', 'PyTorch', 'AWS']
  },
  { 
    id: 4, 
    name: 'James Wilson', 
    role: 'DevOps Engineer', 
    project: 'Automation Framework',
    assignment: 'Infrastructure Setup',
    rating: 9.0, 
    experience: '5+ years',
    skills: ['Docker', 'Kubernetes', 'CI/CD']
  },
  { 
    id: 5, 
    name: 'Priya Patel', 
    role: 'Data Analyst', 
    project: 'Data Analytics Platform',
    assignment: 'Data Processing',
    rating: 8.5, 
    experience: '3+ years',
    skills: ['Statistical Analysis', 'Tableau', 'Excel']
  },
  { 
    id: 6, 
    name: 'Alexander Kim', 
    role: 'System Architect', 
    project: 'Automation Framework',
    assignment: 'Architecture Design',
    rating: 9.7, 
    experience: '10+ years',
    skills: ['System Design', 'Microservices', 'Cloud']
  }
];

export const ZapmindsResourcesKPIDetail = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [showExportModal, setShowExportModal] = useState(false);

  const projects = [...new Set(zapmindsResources.map(resource => resource.project))];

  const filteredResources = zapmindsResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === "all" || resource.project === selectedProject;
    return matchesSearch && matchesProject;
  });

  const avgRating = filteredResources.length > 0 ? 
    (filteredResources.reduce((sum, resource) => sum + resource.rating, 0) / filteredResources.length).toFixed(1) : "0.0";

  const handleViewDetails = (resourceId: number) => {
    navigate(`/resource-detail/${resourceId}`);
  };

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #008080 0%, #22356F 100%)' }}>
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#22356F' }}>Zapminds Initiative Analytics</h1>
              <p style={{ color: '#374B4F' }}>Internal resource allocation for innovation projects</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-2 hover:bg-opacity-90"
            style={{ borderColor: '#374B4F', color: '#22356F', backgroundColor: '#F5F7FA' }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resource Management
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #008080 0%, #22356F 100%)' }}>
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{filteredResources.length}</div>
              <div className="text-sm opacity-90">Assigned Resources</div>
            </CardContent>
          </Card>
          <Card className="text-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #22356F 0%, #374B4F 100%)' }}>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{avgRating}</div>
              <div className="text-sm opacity-90">Avg Performance</div>
            </CardContent>
          </Card>
          <Card className="text-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #374B4F 0%, #23272F 100%)' }}>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-sm opacity-90">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="text-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #23272F 0%, #008080 100%)' }}>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Allocation Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#008080/20' }}>
            <CardHeader>
              <CardTitle style={{ color: '#22356F' }}>Project Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={zapmindsProjects}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, count }) => `${name}: ${count}`}
                    >
                      {zapmindsProjects.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#22356F/20' }}>
            <CardHeader>
              <CardTitle style={{ color: '#22356F' }}>Performance Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredResources}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#374B4F" />
                    <YAxis stroke="#374B4F" />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#008080" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Export */}
        <Card className="bg-white rounded-2xl shadow-lg border-2 mb-8" style={{ borderColor: '#22356F/20' }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: '#374B4F' }} />
                <Input
                  placeholder="Search Zapminds resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2"
                  style={{ borderColor: '#374B4F40' }}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-[180px] border-2" style={{ borderColor: '#374B4F', color: '#374B4F' }}>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleExportClick} className="text-white hover:bg-opacity-90" style={{ backgroundColor: '#008080' }}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zapminds Resources Table */}
        <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#22356F/20' }}>
          <CardHeader>
            <CardTitle style={{ color: '#22356F' }}>Zapminds Initiative Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold" style={{ color: '#22356F' }}>Resource</TableHead>
                    <TableHead className="font-semibold" style={{ color: '#22356F' }}>Project</TableHead>
                    <TableHead className="font-semibold" style={{ color: '#22356F' }}>Assignment</TableHead>
                    <TableHead className="font-semibold" style={{ color: '#22356F' }}>Rating</TableHead>
                    <TableHead className="font-semibold" style={{ color: '#22356F' }}>Experience</TableHead>
                    <TableHead className="font-semibold" style={{ color: '#22356F' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResources.map((resource) => (
                    <TableRow key={resource.id} className="hover:bg-opacity-50" style={{ backgroundColor: '#F5F7FA50' }}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ backgroundColor: '#008080/20' }}>
                            <Brain className="h-4 w-4" style={{ color: '#008080' }} />
                          </div>
                          <div>
                            <div className="font-medium" style={{ color: '#22356F' }}>{resource.name}</div>
                            <div className="text-sm" style={{ color: '#374B4F' }}>{resource.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="border-2" style={{ backgroundColor: '#22356F/10', color: '#22356F', borderColor: '#22356F/20' }}>
                          {resource.project}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: '#374B4F' }}>{resource.assignment}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium" style={{ color: '#22356F' }}>{resource.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell style={{ color: '#374B4F' }}>{resource.experience}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(resource.id)}
                          className="border-2 hover:bg-opacity-90"
                          style={{ borderColor: '#22356F', color: '#22356F' }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <ZapmindsResourcesExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          data={{
            totalResources: filteredResources.length,
            avgRating,
            selectedProject: selectedProject !== "all" ? selectedProject : undefined
          }}
        />
      </div>
    </div>
  );
};

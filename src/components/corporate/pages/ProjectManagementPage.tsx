
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, Users, DollarSign, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const projectsData = [
  {
    id: 1,
    name: "E-commerce Platform",
    client: "TechCorp Inc.",
    status: "On-track",
    progress: 75,
    budget: 150000,
    spent: 112500,
    resources: 8,
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    manager: "John Smith"
  },
  {
    id: 2,
    name: "Mobile Banking App",
    client: "FinanceBank",
    status: "Delayed",
    progress: 45,
    budget: 200000,
    spent: 130000,
    resources: 6,
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    manager: "Sarah Johnson"
  },
  {
    id: 3,
    name: "Healthcare Portal",
    client: "MedTech Solutions",
    status: "Completed",
    progress: 100,
    budget: 120000,
    spent: 118000,
    resources: 5,
    startDate: "2023-10-01",
    endDate: "2024-03-01",
    manager: "Mike Wilson"
  }
];

export const ProjectManagementPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || project.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on-track': return 'bg-teal/10 text-teal border-teal/20';
      case 'delayed': return 'bg-slate/10 text-slate border-slate/20';
      case 'completed': return 'bg-deep-blue/10 text-deep-blue border-deep-blue/20';
      default: return 'bg-charcoal/10 text-charcoal border-charcoal/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on-track': return <CheckCircle className="h-4 w-4" />;
      case 'delayed': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-teal to-deep-blue rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Project Management</h1>
              <p className="text-slate">Comprehensive project tracking and management</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Total Projects</p>
                  <p className="text-2xl font-bold text-deep-blue">{projectsData.length}</p>
                  <p className="text-xs text-slate">Active & Completed</p>
                </div>
                <div className="p-3 bg-deep-blue rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">On Track</p>
                  <p className="text-2xl font-bold text-teal">
                    {projectsData.filter(p => p.status === 'On-track').length}
                  </p>
                  <p className="text-xs text-slate">Projects</p>
                </div>
                <div className="p-3 bg-teal rounded-xl">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-slate/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-slate">
                    ${projectsData.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate">Allocated</p>
                </div>
                <div className="p-3 bg-slate rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-charcoal/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Resources Allocated</p>
                  <p className="text-2xl font-bold text-charcoal">
                    {projectsData.reduce((sum, p) => sum + p.resources, 0)}
                  </p>
                  <p className="text-xs text-slate">Total Members</p>
                </div>
                <div className="p-3 bg-charcoal rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate" />
                  <Input
                    placeholder="Search projects or clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-soft-silver/40 focus:border-teal"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("all")}
                  className={selectedStatus === "all" ? "bg-deep-blue" : "border-soft-silver text-deep-blue"}
                >
                  All
                </Button>
                <Button
                  variant={selectedStatus === "on-track" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("on-track")}
                  className={selectedStatus === "on-track" ? "bg-teal" : "border-soft-silver text-deep-blue"}
                >
                  On Track
                </Button>
                <Button
                  variant={selectedStatus === "delayed" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("delayed")}
                  className={selectedStatus === "delayed" ? "bg-slate" : "border-soft-silver text-deep-blue"}
                >
                  Delayed
                </Button>
                <Button
                  variant={selectedStatus === "completed" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("completed")}
                  className={selectedStatus === "completed" ? "bg-deep-blue" : "border-soft-silver text-deep-blue"}
                >
                  Completed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Projects Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-deep-blue font-semibold">Project</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Client</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Status</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Progress</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Budget</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Resources</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Timeline</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id} className="hover:bg-light-bg/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-deep-blue">{project.name}</div>
                          <div className="text-sm text-slate">PM: {project.manager}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate">{project.client}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(project.status)}
                            {project.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-light-bg rounded-full h-2">
                            <div 
                              className="bg-teal h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-deep-blue">
                            ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate">
                            {Math.round((project.spent / project.budget) * 100)}% spent
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-slate" />
                          <span className="text-slate">{project.resources}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-slate">
                            {new Date(project.startDate).toLocaleDateString()} - 
                          </div>
                          <div className="text-slate">
                            {new Date(project.endDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/project/${project.name.toLowerCase().replace(/\s+/g, '-')}`)}
                          className="border-soft-silver text-deep-blue hover:bg-light-bg"
                        >
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
      </div>
    </div>
  );
};

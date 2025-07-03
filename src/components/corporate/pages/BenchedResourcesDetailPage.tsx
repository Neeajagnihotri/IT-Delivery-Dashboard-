
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, DollarSign, Clock, TrendingUp, AlertTriangle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const benchedResourcesData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "CSS"],
    benchDate: "2024-06-01",
    benchDuration: 28,
    monthlyCost: 12000,
    lastProject: "E-commerce Platform",
    availability: "Immediate",
    location: "New York"
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "DevOps Engineer",
    skills: ["AWS", "Docker", "Python"],
    benchDate: "2024-06-15",
    benchDuration: 14,
    monthlyCost: 11000,
    lastProject: "Cloud Migration",
    availability: "1 week notice",
    location: "Austin"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Full Stack Developer",
    skills: ["Node.js", "React", "MongoDB"],
    benchDate: "2024-05-20",
    benchDuration: 38,
    monthlyCost: 10500,
    lastProject: "Healthcare Portal",
    availability: "Immediate",
    location: "San Francisco"
  }
];

const benchCostData = [
  { month: 'Jan', cost: 45000 },
  { month: 'Feb', cost: 52000 },
  { month: 'Mar', cost: 38000 },
  { month: 'Apr', cost: 41000 },
  { month: 'May', cost: 47000 },
  { month: 'Jun', cost: 33500 }
];

const benchAgingData = [
  { range: '< 2 weeks', count: 8, color: '#008080' },
  { range: '2-4 weeks', count: 12, color: '#22356F' },
  { range: '1-2 months', count: 10, color: '#374B4F' },
  { range: '> 2 months', count: 4, color: '#23272F' }
];

export const BenchedResourcesDetailPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = benchedResourcesData.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalBenchCost = benchedResourcesData.reduce((sum, resource) => sum + resource.monthlyCost, 0);
  const averageBenchDuration = Math.round(benchedResourcesData.reduce((sum, resource) => sum + resource.benchDuration, 0) / benchedResourcesData.length);

  const handleAllocate = (resourceId: number) => {
    navigate('/resource-management/project-allocation', { state: { resourceId } });
  };

  const handleViewProfile = (resourceId: number) => {
    navigate(`/resource-detail/${resourceId}`);
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-slate to-charcoal rounded-2xl shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Benched Resources Analysis</h1>
              <p className="text-slate">Detailed bench cost analysis and resource management</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-slate text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white rounded-2xl shadow-lg border border-slate/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Total Benched</p>
                  <p className="text-2xl font-bold text-slate">{benchedResourcesData.length}</p>
                  <p className="text-xs text-slate">Resources</p>
                </div>
                <div className="p-3 bg-slate rounded-xl">
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-charcoal/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Monthly Bench Cost</p>
                  <p className="text-2xl font-bold text-charcoal">${totalBenchCost.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <DollarSign className="h-3 w-3 text-charcoal mr-1" />
                    <span className="text-xs text-charcoal">Current month</span>
                  </div>
                </div>
                <div className="p-3 bg-charcoal rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Avg. Bench Duration</p>
                  <p className="text-2xl font-bold text-deep-blue">{averageBenchDuration}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-deep-blue mr-1" />
                    <span className="text-xs text-deep-blue">Days</span>
                  </div>
                </div>
                <div className="p-3 bg-deep-blue rounded-xl">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate mb-1">Ready to Deploy</p>
                  <p className="text-2xl font-bold text-teal">
                    {benchedResourcesData.filter(r => r.availability === "Immediate").length}
                  </p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-teal mr-1" />
                    <span className="text-xs text-teal">Available now</span>
                  </div>
                </div>
                <div className="p-3 bg-teal rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bench Cost Trends */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Bench Cost Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={benchCostData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#374B4F" />
                    <YAxis stroke="#374B4F" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#ffffff',
                        border: '1px solid #22356F',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']}
                    />
                    <Bar dataKey="cost" fill="#374B4F" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Bench Aging Analysis */}
          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Bench Aging Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={benchAgingData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ range, count }) => `${range}: ${count}`}
                    >
                      {benchAgingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Filter */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate" />
              <Input
                placeholder="Search by name, role, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal"
              />
            </div>
          </CardContent>
        </Card>

        {/* Benched Resources Table */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
          <CardHeader>
            <CardTitle className="text-deep-blue flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-slate" />
              Benched Resources Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-deep-blue font-semibold">Resource</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Skills</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Bench Duration</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Monthly Cost</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Last Project</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Availability</TableHead>
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
                          <div className="text-xs text-slate">{resource.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {resource.skills.map(skill => (
                            <Badge key={skill} className="bg-teal/10 text-teal border-teal/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-slate" />
                          <span className="text-slate">{resource.benchDuration} days</span>
                        </div>
                        <div className="text-xs text-slate">
                          Since {new Date(resource.benchDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-charcoal">
                          ${resource.monthlyCost.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate">per month</div>
                      </TableCell>
                      <TableCell className="text-slate">{resource.lastProject}</TableCell>
                      <TableCell>
                        <Badge className={resource.availability === "Immediate" 
                          ? "bg-teal/10 text-teal border-teal/20" 
                          : "bg-slate/10 text-slate border-slate/20"
                        }>
                          {resource.availability}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAllocate(resource.id)}
                            className="border-teal text-teal hover:bg-teal/5"
                          >
                            Allocate
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewProfile(resource.id)}
                            className="border-deep-blue text-deep-blue hover:bg-deep-blue/5"
                          >
                            View Profile
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
    </div>
  );
};

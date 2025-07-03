import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, ArrowLeft, MapPin, Eye, Search, Filter, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResourceExportModal } from "../modals/ResourceExportModal";

const locationData = [
  { name: 'India', count: 145, color: '#22356F', cities: ['Bangalore', 'Hyderabad'] },
  { name: 'US', count: 78, color: '#008080', cities: ['Texas'] },
  { name: 'Canada', count: 24, color: '#374B4F', cities: ['Toronto', 'Vancouver'] }
];

const resourcesByLocation = {
  'India': [
    { id: 1, name: 'Rajesh Kumar', role: 'Senior Developer', city: 'Bangalore', experience: '5+ years', status: 'Billable' },
    { id: 2, name: 'Priya Sharma', role: 'QA Lead', city: 'Hyderabad', experience: '4+ years', status: 'Billable' },
    { id: 3, name: 'Amit Singh', role: 'DevOps Engineer', city: 'Bangalore', experience: '3+ years', status: 'Benched' },
    { id: 4, name: 'Sanjay Patel', role: 'Frontend Developer', city: 'Bangalore', experience: '2+ years', status: 'Billable' },
    { id: 5, name: 'Kavitha Reddy', role: 'Backend Developer', city: 'Hyderabad', experience: '4+ years', status: 'Billable' },
  ],
  'US': [
    { id: 6, name: 'John Smith', role: 'Architect', city: 'Texas', experience: '8+ years', status: 'Billable' },
    { id: 7, name: 'Sarah Johnson', role: 'Project Manager', city: 'Texas', experience: '6+ years', status: 'Billable' },
  ],
  'Canada': [
    { id: 8, name: 'Mike Chen', role: 'Full Stack Developer', city: 'Toronto', experience: '4+ years', status: 'Billable' },
    { id: 9, name: 'Lisa Wang', role: 'UI/UX Designer', city: 'Vancouver', experience: '3+ years', status: 'Benched' },
  ]
};

export const TotalResourcesKPIDetail = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleViewDetails = (resourceId: number) => {
    navigate(`/resource-detail/${resourceId}`);
  };

  const handleExportData = () => {
    setIsExportModalOpen(true);
  };

  // Filter resources based on search term
  const getFilteredResources = (resources: any[]) => {
    if (!searchTerm) return resources;
    return resources.filter(resource =>
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #22356F 0%, #008080 100%)' }}>
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#22356F' }}>Total Resources Analytics</h1>
              <p style={{ color: '#374B4F' }}>Comprehensive workforce overview and location-based analytics</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-2 text-white hover:bg-opacity-90"
            style={{ borderColor: '#374B4F', color: '#22356F', backgroundColor: '#F5F7FA' }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resource Management
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #22356F 0%, #008080 100%)' }}>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">247</div>
              <div className="text-sm opacity-90">Total Resources</div>
            </CardContent>
          </Card>
          <Card className="text-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #008080 0%, #374B4F 100%)' }}>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">189</div>
              <div className="text-sm opacity-90">Billable Resources</div>
            </CardContent>
          </Card>
          <Card className="text-white rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #374B4F 0%, #23272F 100%)' }}>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">34</div>
              <div className="text-sm opacity-90">Benched Resources</div>
            </CardContent>
          </Card>
        </div>

        {/* Location Distribution Chart */}
        <Card className="bg-white rounded-2xl shadow-lg border-2 mb-8" style={{ borderColor: '#22356F20' }}>
          <CardHeader>
            <CardTitle style={{ color: '#22356F' }}>Location-Based Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ name, count }) => `${name}: ${count}`}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Search and Export Options - Moved to top of India resources */}
        <Card className="bg-white rounded-2xl shadow-lg border-2 mb-6" style={{ borderColor: '#22356F20' }}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: '#374B4F' }} />
                <Input
                  placeholder="Search resources by name, role, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2"
                  style={{ borderColor: '#374B4F40' }}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-2 hover:bg-opacity-90" style={{ borderColor: '#374B4F', color: '#374B4F' }}>
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
                <Button 
                  onClick={handleExportData}
                  className="text-white hover:bg-opacity-90" 
                  style={{ backgroundColor: '#008080' }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location-based Resource Lists */}
        {locationData.map((location) => {
          const filteredResources = getFilteredResources(resourcesByLocation[location.name as keyof typeof resourcesByLocation] || []);
          
          return (
            <Card key={location.name} className="bg-white rounded-2xl shadow-lg border-2 mb-6" style={{ borderColor: '#22356F20' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2" style={{ color: '#22356F' }}>
                  <MapPin className="h-5 w-5" />
                  <span>{location.name} - {filteredResources.length} Resources {searchTerm && `(filtered from ${location.count})`}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredResources.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold" style={{ color: '#22356F' }}>Employee</TableHead>
                          <TableHead className="font-semibold" style={{ color: '#22356F' }}>Role</TableHead>
                          <TableHead className="font-semibold" style={{ color: '#22356F' }}>City</TableHead>
                          <TableHead className="font-semibold" style={{ color: '#22356F' }}>Experience</TableHead>
                          <TableHead className="font-semibold" style={{ color: '#22356F' }}>Status</TableHead>
                          <TableHead className="font-semibold" style={{ color: '#22356F' }}>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResources.map((resource) => (
                          <TableRow key={resource.id} className="hover:bg-opacity-50" style={{ backgroundColor: '#F5F7FA' }}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ backgroundColor: '#22356F20',color: '#22356F' }}>
                                  <Users className="h-4 w-4" />
                                </div>
                                <div className="font-medium" style={{ color: '#22356F' }}>{resource.name}</div>
                              </div>
                            </TableCell>
                            <TableCell style={{ color: '#374B4F' }}>{resource.role}</TableCell>
                            <TableCell style={{ color: '#374B4F' }}>{resource.city}</TableCell>
                            <TableCell style={{ color: '#374B4F' }}>{resource.experience}</TableCell>
                            <TableCell>
                              <Badge className={`border-2 ${
                                resource.status === 'Billable' 
                                  ? 'text-white border-transparent' 
                                  : 'border-transparent'
                              }`} style={{ 
                                backgroundColor: resource.status === 'Billable' ? '#008080' : '#374B4F',
                                color: 'white'
                              }}>
                                {resource.status}
                              </Badge>
                            </TableCell>
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
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p>No resources found matching "{searchTerm}"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ResourceExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

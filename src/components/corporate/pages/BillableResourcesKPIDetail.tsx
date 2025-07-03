import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, ArrowLeft, DollarSign, TrendingUp, Calendar, Search, Filter, Download } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BillableResourcesExportModal } from "../modals/BillableResourcesExportModal";

const billableData = [
  { name: 'Client Projects', count: 160, percentage: 84.7, color: '#22356F' },
  { name: 'Pre-sales', count: 18, percentage: 9.5, color: '#008080' },
  { name: 'Training', count: 11, percentage: 5.8, color: '#37474F' }
];

const revenueData = [
  { month: 'Jan', revenue: 2400000 },
  { month: 'Feb', revenue: 2650000 },
  { month: 'Mar', revenue: 2300000 },
  { month: 'Apr', revenue: 2800000 },
  { month: 'May', revenue: 2950000 },
  { month: 'Jun', revenue: 3100000 }
];

const billableResources = [
  { id: 1, name: 'Rajesh Kumar', role: 'Senior Developer', client: 'TechCorp Industries', billableRate: 85, hours: 160, revenue: 13600, utilization: 95 },
  { id: 2, name: 'Priya Sharma', role: 'QA Lead', client: 'FinanceHub', billableRate: 70, hours: 150, revenue: 10500, utilization: 88 },
  { id: 3, name: 'Kavitha Reddy', role: 'Backend Developer', client: 'DataCore', billableRate: 60, hours: 155, revenue: 9300, utilization: 91 },
  { id: 4, name: 'Sanjay Patel', role: 'Frontend Developer', client: 'RetailTech', billableRate: 95, hours: 165, revenue: 15675, utilization: 97 },
  { id: 5, name: 'John Smith', role: 'Architect', client: 'CorporateTech', billableRate: 110, hours: 170, revenue: 18700, utilization: 100 }
];

export const BillableResourcesKPIDetail = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const uniqueClients = Array.from(new Set(billableResources.map(resource => resource.client)));

  const filteredResources = billableResources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = selectedClient === "" || resource.client === selectedClient;
    return matchesSearch && matchesClient;
  });

  const totalRevenue = billableResources.reduce((sum, resource) => sum + resource.revenue, 0);
  const avgUtilization = Math.round(billableResources.reduce((sum, resource) => sum + resource.utilization, 0) / billableResources.length);

  const handleViewDetails = (resourceId: number) => {
    navigate(`/resource-detail/${resourceId}`);
  };

  const handleReallocate = (resourceId: number) => {
    // Navigate to project allocation page with the resource pre-selected
    navigate(`/resource-management/project-allocation?resourceId=${resourceId}`);
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-teal to-deep-blue rounded-2xl shadow-lg">
              <UserCheck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Billable Resources Analytics</h1>
              <p className="text-slate">Revenue generation and billability insights</p>
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
          <Card className="bg-gradient-to-r from-teal to-deep-blue text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">189</div>
              <div className="text-sm opacity-90">Billable Resources</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-deep-blue to-slate text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">${totalRevenue.toLocaleString()}</div>
              <div className="text-sm opacity-90">Monthly Revenue</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-slate to-charcoal text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{avgUtilization}%</div>
              <div className="text-sm opacity-90">Avg Utilization</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-charcoal to-teal text-white rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">76.5%</div>
              <div className="text-sm opacity-90">Billability Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Billable Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={billableData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {billableData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardHeader>
              <CardTitle className="text-deep-blue">Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#374B4F" />
                    <YAxis stroke="#374B4F" />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#008080" strokeWidth={3} />
                  </LineChart>
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
                  placeholder="Search billable resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-soft-silver/40 focus:border-teal"
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger className="w-48 border-slate text-slate">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by Client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Clients</SelectItem>
                    {uniqueClients.map(client => (
                      <SelectItem key={client} value={client}>{client}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-teal hover:bg-teal/90 text-white"
                  onClick={() => setIsExportModalOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Revenue Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billable Resources Table */}
        <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
          <CardHeader>
            <CardTitle className="text-deep-blue">Billable Resources Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-deep-blue font-semibold">Resource</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Client</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Rate/Hour</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Hours/Month</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Revenue</TableHead>
                    <TableHead className="text-deep-blue font-semibold">Utilization</TableHead>
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
                      <TableCell>
                        <Badge className="bg-deep-blue/10 text-deep-blue border-deep-blue/20">
                          {resource.client}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-teal">${resource.billableRate}</TableCell>
                      <TableCell className="text-slate">{resource.hours}</TableCell>
                      <TableCell className="font-medium text-deep-blue">${resource.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-12 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-teal h-2 rounded-full" 
                              style={{ width: `${resource.utilization}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate">{resource.utilization}%</span>
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
                            Details
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-teal text-teal hover:bg-teal/5"
                            onClick={() => handleReallocate(resource.id)}
                          >
                            Reallocate
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

      <BillableResourcesExportModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};

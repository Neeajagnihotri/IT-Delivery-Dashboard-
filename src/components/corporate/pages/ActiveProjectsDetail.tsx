
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderOpen, TrendingUp, AlertTriangle, Users, Calendar, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const projectData = [
  { 
    id: 1, 
    name: "Project Alpha", 
    customer: "TechCorp Industries", 
    health: "Green", 
    completion: 92, 
    budget: 450000, 
    team: 8, 
    deadline: "6/30/2024",
    stage: "Development",
    onTime: "92%",
    endDate: "6/30/2024",
    riskLevel: "Low",
    dmPo: "Sarah Johnson"
  },
  { 
    id: 2, 
    name: "Beta Platform", 
    customer: "InnovateCorp", 
    health: "Yellow", 
    completion: 78, 
    budget: 280000, 
    team: 5, 
    deadline: "5/15/2024",
    stage: "UAT",
    onTime: "78%",
    endDate: "5/15/2024",
    riskLevel: "Medium",
    dmPo: "Mike Chen"
  },
  { 
    id: 3, 
    name: "Customer Portal", 
    customer: "GlobalTech", 
    health: "Green", 
    completion: 95, 
    budget: 150000, 
    team: 3, 
    deadline: "7/20/2024",
    stage: "Testing",
    onTime: "95%",
    endDate: "7/20/2024",
    riskLevel: "Low",
    dmPo: "Alex Rodriguez"
  },
  { 
    id: 4, 
    name: "Data Migration", 
    customer: "MegaCorp", 
    health: "Red", 
    completion: 45, 
    budget: 320000, 
    team: 6, 
    deadline: "8/15/2024",
    stage: "Planning",
    onTime: "45%",
    endDate: "8/15/2024",
    riskLevel: "High",
    dmPo: "Emily Davis"
  },
  { 
    id: 5, 
    name: "E-commerce Platform", 
    customer: "RetailTech", 
    health: "Green", 
    completion: 85, 
    budget: 200000, 
    team: 4, 
    deadline: "3/30/2024",
    stage: "Development",
    onTime: "85%",
    endDate: "3/30/2024",
    riskLevel: "Low",
    dmPo: "John Smith"
  },
];

export const ActiveProjectsDetail = () => {
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleProjectClick = (projectName: string) => {
    const encodedName = encodeURIComponent(projectName);
    navigate(`/project/${encodedName}`);
  };

  const getHealthBadge = (health: string) => {
    const variants = {
      Green: 'bg-teal text-white',
      Yellow: 'bg-deep-blue text-white',
      Red: 'bg-charcoal text-white'
    };
    return variants[health as keyof typeof variants] || 'bg-slate text-white';
  };

  const getHealthColor = (health: string) => {
    const colors = {
      Green: '#008080',
      Yellow: '#22356F', 
      Red: '#37474F'
    };
    return colors[health as keyof typeof colors] || '#64748B';
  };

  const totalProjects = projectData.length;
  const healthyProjects = projectData.filter(p => p.health === 'Green').length;
  const atRiskProjects = projectData.filter(p => p.health === 'Yellow' || p.health === 'Red').length;

  const getProjectsByCategory = (category: string) => {
    switch (category) {
      case 'total':
        return projectData;
      case 'healthy':
        return projectData.filter(p => p.health === 'Green');
      case 'at-risk':
        return projectData.filter(p => p.health === 'Yellow' || p.health === 'Red');
      default:
        return projectData;
    }
  };

  const handleKPIClick = (kpiType: string) => {
    setSelectedKPI(selectedKPI === kpiType ? null : kpiType);
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBackClick}
            className="mb-4 border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-deep-blue rounded-xl">
              <FolderOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue">Active Projects</h1>
              <p className="text-slate">Detailed overview of all active projects</p>
            </div>
          </div>
        </div>

        {/* Clickable KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="bg-gradient-to-r from-deep-blue to-teal text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleKPIClick('total')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Projects</p>
                  <p className="text-3xl font-bold">{totalProjects}</p>
                </div>
                <FolderOpen className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-teal to-deep-blue text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleKPIClick('healthy')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Healthy Projects</p>
                  <p className="text-3xl font-bold">{healthyProjects}</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-slate to-charcoal text-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleKPIClick('at-risk')}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">At Risk</p>
                  <p className="text-3xl font-bold">{atRiskProjects}</p>
                </div>
                <AlertTriangle className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project List - Similar to Reference Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-deep-blue">
              {selectedKPI ? 
                `${selectedKPI === 'total' ? 'All' : selectedKPI === 'healthy' ? 'Healthy' : 'At Risk'} Projects` : 
                'Project Health Overview'
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-soft-silver/30">
                    <th className="text-left p-3 text-slate font-medium">Project Name</th>
                    <th className="text-left p-3 text-slate font-medium">Customer</th>
                    <th className="text-left p-3 text-slate font-medium">Health Status</th>
                    <th className="text-left p-3 text-slate font-medium">Current Stage</th>
                    <th className="text-left p-3 text-slate font-medium">On-Time %</th>
                    <th className="text-left p-3 text-slate font-medium">End Date</th>
                    <th className="text-left p-3 text-slate font-medium">Risk Level</th>
                    <th className="text-left p-3 text-slate font-medium">DM/PO</th>
                    <th className="text-left p-3 text-slate font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getProjectsByCategory(selectedKPI || 'total').map((project) => (
                    <tr key={project.id} className="border-b border-soft-silver/20 hover:bg-light-bg">
                      <td className="p-3">
                        <div className="font-semibold text-deep-blue">{project.name}</div>
                      </td>
                      <td className="p-3 text-slate">{project.customer}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: getHealthColor(project.health) }}
                          />
                          <span className="text-slate">{project.health}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate">{project.stage}</td>
                      <td className="p-3 text-slate">{project.onTime}</td>
                      <td className="p-3 text-slate">{project.endDate}</td>
                      <td className="p-3">
                        <Badge 
                          className={`${
                            project.riskLevel === 'Low' ? 'bg-teal' : 
                            project.riskLevel === 'Medium' ? 'bg-deep-blue' : 
                            'bg-charcoal'
                          } text-white`}
                        >
                          {project.riskLevel}
                        </Badge>
                      </td>
                      <td className="p-3 text-slate">{project.dmPo}</td>
                      <td className="p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleProjectClick(project.name)}
                          className="text-deep-blue border-deep-blue hover:bg-deep-blue hover:text-white"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

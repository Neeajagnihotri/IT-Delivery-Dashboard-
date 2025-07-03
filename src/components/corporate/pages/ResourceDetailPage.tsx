
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Award, Star, Briefcase, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data - in real app this would come from API
const resourceDetails: Record<string, {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  experience: string;
  joinDate: string;
  status: string;
  employeeId: string;
  skills: string[];
  currentProjects: Array<{
    name: string;
    status: string;
    startDate: string;
    client: string;
    role: string;
  }>;
  utilizationRate: number;
  projectSuccessRate: number;
  performanceRating: number;
}> = {
  "1": {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@zapcom.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Developer',
    department: 'Engineering',
    location: 'New York',
    experience: '5+ years experience',
    joinDate: 'Jan 15, 2023',
    status: 'billable',
    employeeId: 'EMP0001',
    skills: ['React', 'Node.js', 'TypeScript'],
    currentProjects: [
      {
        name: 'E-commerce Platform Redesign',
        status: 'Active',
        startDate: 'Mar 1, 2024',
        client: 'TechCorp Inc',
        role: 'Leading the frontend development for the new customer portal'
      },
      {
        name: 'Mobile App Development',
        status: 'Support',
        startDate: 'Feb 15, 2024',
        client: 'StartupXY',
        role: 'Providing technical consultation and code reviews'
      }
    ],
    utilizationRate: 85,
    projectSuccessRate: 92,
    performanceRating: 4.5
  }
};

export const ResourceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const resource = id ? resourceDetails[id] : undefined;

  if (!resource) {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#22356F' }}>Resource Not Found</h1>
          <Button onClick={() => navigate('/resource-management')} style={{ backgroundColor: '#22356F' }}>
            Back to Resource Management
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'billable':
        return { bg: '#008080', text: 'Billable' };
      case 'benched':
        return { bg: '#374B4F', text: 'Available' };
      case 'shadow':
        return { bg: '#22356F', text: 'Shadow' };
      default:
        return { bg: '#374B4F', text: status };
    }
  };

  const statusBadge = getStatusBadge(resource.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6" style={{ color: '#22356F' }} />
            <h1 className="text-xl font-bold" style={{ color: '#22356F' }}>Resource Profile</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#008080' }}>
                {resource.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: '#22356F' }}>{resource.name}</h2>
                <p className="text-slate-600 mb-1">{resource.role}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{resource.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{resource.department}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{resource.experience}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className="mb-2 text-white" style={{ backgroundColor: statusBadge.bg }}>
                {statusBadge.text}
              </Badge>
              <p className="text-sm text-slate-500">Not specified</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: '#22356F' }}>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <span className="text-sm">{resource.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <span className="text-sm">{resource.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-slate-400" />
                    <span className="text-sm">Employee ID: {resource.employeeId}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <span className="text-sm">Joined: {resource.joinDate}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Expertise */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: '#22356F' }}>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {resource.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: '#22356F' }}>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Utilization Rate</span>
                      <span className="font-semibold" style={{ color: '#008080' }}>{resource.utilizationRate}%</span>
                    </div>
                    <Progress value={resource.utilizationRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Project Success Rate</span>
                      <span className="font-semibold" style={{ color: '#008080' }}>{resource.projectSuccessRate}%</span>
                    </div>
                    <Progress value={resource.projectSuccessRate} className="h-2" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Performance Rating</span>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= resource.performanceRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Current Projects */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle style={{ color: '#22356F' }}>Current Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resource.currentProjects.map((project, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold" style={{ color: '#22356F' }}>{project.name}</h4>
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: project.status === 'Active' ? '#008080' : '#374B4F' }}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{project.role}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>Started: {project.startDate}</span>
                      <span>Client: {project.client}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Close
            </Button>
            <Button style={{ backgroundColor: '#008080' }} className="text-white">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

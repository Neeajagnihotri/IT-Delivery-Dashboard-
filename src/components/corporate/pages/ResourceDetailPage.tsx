
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Award, Star, Briefcase } from "lucide-react";
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
  salary: string;
  skills: string[];
  currentProject: string;
  projectManager: string;
  utilization: string;
  rating: number;
  certifications: string[];
  recentProjects: Array<{ name: string; duration: string; role: string; }>;
}> = {
  "1": {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@zapcom.com',
    phone: '+91 9876543210',
    role: 'Senior Developer',
    department: 'Engineering',
    location: 'Bangalore, India',
    experience: '5+ years',
    joinDate: '2021-03-15',
    status: 'Billable',
    salary: '₹1,20,000',
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'AWS'],
    currentProject: 'E-commerce Platform',
    projectManager: 'Sarah Johnson',
    utilization: '85%',
    rating: 4.2,
    certifications: ['AWS Certified Developer', 'React Specialist'],
    recentProjects: [
      { name: 'E-commerce Platform', duration: '6 months', role: 'Lead Developer' },
      { name: 'Banking App', duration: '4 months', role: 'Frontend Developer' },
    ]
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

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl shadow-lg" style={{ background: 'linear-gradient(135deg, #22356F 0%, #008080 100%)' }}>
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#22356F' }}>{resource.name}</h1>
              <p style={{ color: '#374B4F' }}>Detailed Resource Information</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-2 hover:bg-opacity-90"
            style={{ borderColor: '#374B4F', color: '#22356F', backgroundColor: '#F5F7FA' }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#22356F20' }}>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5" style={{ color: '#008080' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#22356F' }}>Email</p>
                      <p className="text-sm" style={{ color: '#374B4F' }}>{resource.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5" style={{ color: '#008080' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#22356F' }}>Phone</p>
                      <p className="text-sm" style={{ color: '#374B4F' }}>{resource.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5" style={{ color: '#008080' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#22356F' }}>Location</p>
                      <p className="text-sm" style={{ color: '#374B4F' }}>{resource.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5" style={{ color: '#008080' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#22356F' }}>Join Date</p>
                      <p className="text-sm" style={{ color: '#374B4F' }}>{new Date(resource.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#22356F20' }}>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {resource.skills.map((skill, index) => (
                    <Badge key={index} className="border-2" style={{ backgroundColor: '#008080/10', color: '#008080', borderColor: '#008080/20' }}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#22356F20' }}>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resource.recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
                      <div className="flex items-center space-x-3">
                        <Briefcase className="h-5 w-5" style={{ color: '#008080' }} />
                        <div>
                          <p className="font-medium" style={{ color: '#22356F' }}>{project.name}</p>
                          <p className="text-sm" style={{ color: '#374B4F' }}>{project.role}</p>
                        </div>
                      </div>
                      <Badge variant="outline" style={{ borderColor: '#374B4F', color: '#374B4F' }}>
                        {project.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <div className="space-y-6">
            <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#22356F20' }}>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: '#22356F' }}>{resource.role}</div>
                  <Badge className="mb-4" style={{ 
                    backgroundColor: resource.status === 'Billable' ? '#008080' : '#374B4F',
                    color: 'white'
                  }}>
                    {resource.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#374B4F' }}>Department:</span>
                    <span className="text-sm font-medium" style={{ color: '#22356F' }}>{resource.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#374B4F' }}>Experience:</span>
                    <span className="text-sm font-medium" style={{ color: '#22356F' }}>{resource.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#374B4F' }}>Current Project:</span>
                    <span className="text-sm font-medium" style={{ color: '#22356F' }}>{resource.currentProject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm" style={{ color: '#374B4F' }}>Utilization:</span>
                    <span className="text-sm font-medium" style={{ color: '#22356F' }}>{resource.utilization}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: '#374B4F' }}>Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium" style={{ color: '#22356F' }}>{resource.rating}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-white rounded-2xl shadow-lg border-2" style={{ borderColor: '#22356F20' }}>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resource.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-4 w-4" style={{ color: '#008080' }} />
                      <span className="text-sm" style={{ color: '#374B4F' }}>{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

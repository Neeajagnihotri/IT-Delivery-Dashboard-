
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Mail, 
  Phone,
  Award,
  TrendingUp,
  Clock,
  Star,
  Edit,
  ArrowLeft
} from "lucide-react";
import { EditResourceModal } from "../modals/EditResourceModal";

export const ResourceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [resource, setResource] = useState<any>(null);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockResource = {
      id: parseInt(id || '1'),
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      department: "Engineering",
      location: "New York, NY",
      experience: "5+ years",
      status: "Billable",
      email: "sarah.johnson@zapcom.com",
      phone: "+1 (555) 123-4567",
      salary: "$85,000",
      skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
      joinDate: "2023-01-15",
      projects: 2
    };
    setResource(mockResource);
  }, [id]);

  if (!resource) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'billable': return 'bg-teal';
      case 'benched': return 'bg-slate';
      case 'shadow': return 'bg-charcoal';
      case 'associate': return 'bg-deep-blue';
      default: return 'bg-slate';
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'N/A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEditResource = () => {
    console.log('ResourceDetailPage - Opening edit modal for resource:', resource);
    setShowEditModal(true);
  };

  const handleSaveResource = (updatedResource: any) => {
    console.log('ResourceDetailPage - Saving updated resource:', updatedResource);
    setResource(updatedResource);
    setShowEditModal(false);
  };

  const handleCloseEditModal = () => {
    console.log('ResourceDetailPage - Closing edit modal');
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="border-slate text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-deep-blue">Resource Profile</h1>
        </div>

        <div className="space-y-6">
          {/* Header Section */}
          <Card className="bg-white border-slate/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-xl font-semibold bg-gradient-to-r from-deep-blue to-teal text-white">
                    {getInitials(resource.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-deep-blue mb-2">
                        {resource.name}
                      </h2>
                      <p className="text-xl text-slate mb-3">
                        {resource.role}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-slate">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {resource.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {resource.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {resource.experience} experience
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={`${getStatusColor(resource.status)} text-white mb-3`}>
                        {resource.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-slate mb-3">
                        <DollarSign className="h-4 w-4" />
                        {resource.salary}
                      </div>
                      <Button onClick={handleEditResource} variant="outline" className="border-teal text-teal hover:bg-teal/5">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card className="bg-white border-slate/30">
              <CardHeader>
                <CardTitle className="text-xl text-deep-blue">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate" />
                  <span className="text-deep-blue">{resource.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-slate" />
                  <span className="text-deep-blue">{resource.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-slate" />
                  <span className="text-deep-blue">Employee ID: EMP{resource.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-slate" />
                  <span className="text-deep-blue">Joined: {resource.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-white border-slate/30">
              <CardHeader>
                <CardTitle className="text-xl text-deep-blue">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-deep-blue">Utilization Rate</span>
                    <span className="text-teal font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-deep-blue">Project Success Rate</span>
                    <span className="text-teal font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-3" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-deep-blue">Performance Rating</span>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-teal text-teal" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Section */}
          <Card className="bg-white border-slate/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-deep-blue">
                <Award className="h-6 w-6" />
                Skills & Expertise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {resource.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-4 py-2 text-sm border-deep-blue text-deep-blue">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Projects */}
          <Card className="bg-white border-slate/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-deep-blue">
                <TrendingUp className="h-6 w-6" />
                Current Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-light-bg rounded-lg border border-slate/30">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-deep-blue text-lg">E-commerce Platform Redesign</h4>
                    <Badge className="bg-teal text-white">Active</Badge>
                  </div>
                  <p className="text-slate mb-3">
                    Leading the frontend development for the new customer portal
                  </p>
                  <div className="flex items-center gap-6 text-sm text-slate">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Started: Mar 1, 2024
                    </span>
                    <span>Client: TechCorp Inc.</span>
                  </div>
                </div>
                
                <div className="p-4 bg-light-bg rounded-lg border border-slate/30">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-deep-blue text-lg">Mobile App Development</h4>
                    <Badge variant="outline" className="border-deep-blue text-deep-blue">Support</Badge>
                  </div>
                  <p className="text-slate mb-3">
                    Providing technical consultation and code reviews
                  </p>
                  <div className="flex items-center gap-6 text-sm text-slate">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Started: Feb 15, 2024
                    </span>
                    <span>Client: StartupXYZ</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Resource Modal */}
      {showEditModal && (
        <EditResourceModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          resource={resource}
          onSave={handleSaveResource}
        />
      )}
    </div>
  );
};

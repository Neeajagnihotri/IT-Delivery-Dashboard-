
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { EditResourceModal } from "../../corporate/modals/EditResourceModal";

interface ResourceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource: any;
  onResourceUpdate?: (updatedResource: any) => void;
}

export const ResourceDetailModal = ({ open, onOpenChange, resource, onResourceUpdate }: ResourceDetailModalProps) => {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentResource, setCurrentResource] = useState(resource);
  
  useEffect(() => {
    setCurrentResource(resource);
  }, [resource]);
  
  if (!currentResource) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'billable': return 'bg-teal';
      case 'benched': return 'bg-slate';
      case 'shadow': return 'bg-charcoal';
      case 'associate': return 'bg-deep-blue';
      default: return 'bg-slate';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleViewFullProfile = () => {
    onOpenChange(false);
    navigate(`/resource-detail/${currentResource.id}`);
  };

  const handleEditResource = () => {
    console.log('Opening edit modal for resource:', currentResource);
    setShowEditModal(true);
  };

  const handleSaveResource = (updatedResource: any) => {
    console.log('Saving updated resource:', updatedResource);
    setCurrentResource(updatedResource);
    
    // Call the callback to update parent component if provided
    if (onResourceUpdate) {
      onResourceUpdate(updatedResource);
    }
    
    setShowEditModal(false);
  };

  const handleCloseEditModal = () => {
    console.log('Closing edit modal');
    setShowEditModal(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white border-slate/30">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3 text-deep-blue">
              <User className="h-6 w-6 text-deep-blue" />
              Resource Profile
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Header Section */}
            <Card className="bg-white border-slate/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-deep-blue to-teal text-white">
                      {getInitials(currentResource.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-deep-blue mb-1">
                          {currentResource.name}
                        </h2>
                        <p className="text-lg text-slate mb-2">
                          {currentResource.role}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {currentResource.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {currentResource.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {currentResource.experience} experience
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={`${getStatusColor(currentResource.status)} text-white mb-2`}>
                          {currentResource.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-slate">
                          <DollarSign className="h-4 w-4" />
                          {currentResource.salary || 'Not specified'}
                        </div>
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
                  <CardTitle className="text-lg text-deep-blue">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate" />
                    <span className="text-deep-blue">{currentResource.email || `${currentResource.name.toLowerCase().replace(' ', '.')}@zapcom.com`}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate" />
                    <span className="text-deep-blue">{currentResource.phone || '+1 (555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-slate" />
                    <span className="text-deep-blue">Employee ID: EMP{currentResource.id.toString().padStart(4, '0')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-slate" />
                    <span className="text-deep-blue">Joined: {currentResource.joinDate || 'Jan 15, 2023'}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-white border-slate/30">
                <CardHeader>
                  <CardTitle className="text-lg text-deep-blue">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-deep-blue">Utilization Rate</span>
                      <span className="text-teal font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-deep-blue">Project Success Rate</span>
                      <span className="text-teal font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-deep-blue">Performance Rating</span>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-teal text-teal" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Section */}
            <Card className="bg-white border-slate/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <Award className="h-5 w-5" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(currentResource.skills || ['React', 'TypeScript', 'Node.js', 'AWS']).map((skill, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 border-deep-blue text-deep-blue">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Projects */}
            <Card className="bg-white border-slate/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <TrendingUp className="h-5 w-5" />
                  Current Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-light-bg rounded-lg border border-slate/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-deep-blue">E-commerce Platform Redesign</h4>
                      <Badge className="bg-teal text-white">Active</Badge>
                    </div>
                    <p className="text-sm text-slate mb-2">
                      Leading the frontend development for the new customer portal
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Started: Mar 1, 2024
                      </span>
                      <span>Client: TechCorp Inc.</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-light-bg rounded-lg border border-slate/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-deep-blue">Mobile App Development</h4>
                      <Badge variant="outline" className="border-deep-blue text-deep-blue">Support</Badge>
                    </div>
                    <p className="text-sm text-slate mb-2">
                      Providing technical consultation and code reviews
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Started: Feb 15, 2024
                      </span>
                      <span>Client: StartupXYZ</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate/30">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="border-slate text-deep-blue hover:bg-light-bg">
                Close
              </Button>
              <Button onClick={handleEditResource} variant="outline" className="border-teal text-teal hover:bg-teal/5">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button onClick={handleViewFullProfile} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
                View Full Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showEditModal && (
        <EditResourceModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          resource={currentResource}
          onSave={handleSaveResource}
        />
      )}
    </>
  );
};

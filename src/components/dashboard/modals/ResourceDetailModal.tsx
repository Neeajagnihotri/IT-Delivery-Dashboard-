
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ResourceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource: any;
}

export const ResourceDetailModal = ({ open, onOpenChange, resource }: ResourceDetailModalProps) => {
  const navigate = useNavigate();
  
  if (!resource) return null;

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
    navigate(`/resource-detail/${resource.id}`);
  };

  // Sample enhanced data
  const enhancedData = {
    ...resource,
    email: resource.email || `${resource.name.toLowerCase().replace(' ', '.')}@zapcg.com`,
    phone: resource.phone || '+1 (555) 123-4567',
    skills: resource.skills || ['React', 'TypeScript', 'Node.js', 'AWS'],
    performanceRating: resource.performanceRating || 4.5,
    utilizationRate: resource.utilizationRate || 85,
    projectSuccessRate: resource.projectSuccessRate || 92,
    feedback: resource.feedback || [
      {id: 1, date: '2024-03-01', author: 'John Smith', comment: 'Excellent technical skills and great team collaboration.', rating: 5},
      {id: 2, date: '2024-02-15', author: 'Sarah Johnson', comment: 'Shows strong problem-solving abilities and initiative.', rating: 4}
    ],
    upcomingEngagements: resource.upcomingEngagements || [
      {id: 1, title: 'Client Workshop', date: '2024-04-15', client: 'TechCorp Inc.', type: 'Workshop'},
      {id: 2, title: 'Project Kickoff', date: '2024-04-20', client: 'StartupXYZ', type: 'Meeting'}
    ],
    currentProjects: resource.currentProjects || [
      {id: 1, name: 'E-commerce Platform Redesign', role: 'Lead Developer', client: 'TechCorp Inc.', startDate: '2024-03-01', status: 'Active'},
      {id: 2, name: 'Mobile App Development', role: 'Consultant', client: 'StartupXYZ', startDate: '2024-02-15', status: 'Support'}
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white border-slate/30">
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
                    {getInitials(resource.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-deep-blue mb-1">
                        {resource.name}
                      </h2>
                      <p className="text-lg text-slate mb-2">
                        {resource.role}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate">
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
                      <Badge className={`${getStatusColor(resource.status)} text-white mb-2`}>
                        {resource.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-slate">
                        <DollarSign className="h-4 w-4" />
                        {resource.salary || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabbed Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 p-1 bg-light-bg rounded-xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="engagements">Engagements</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <Card className="bg-white border-slate/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-deep-blue">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-slate" />
                      <span className="text-deep-blue">{enhancedData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-slate" />
                      <span className="text-deep-blue">{enhancedData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-slate" />
                      <span className="text-deep-blue">Employee ID: EMP{resource.id.toString().padStart(4, '0')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-slate" />
                      <span className="text-deep-blue">Joined: Jan 15, 2023</span>
                    </div>
                  </CardContent>
                </Card>

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
                      {enhancedData.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1 border-deep-blue text-deep-blue">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="mt-6">
              <Card className="bg-white border-slate/30">
                <CardHeader>
                  <CardTitle className="text-lg text-deep-blue">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-deep-blue">Utilization Rate</span>
                      <span className="text-teal font-medium">{enhancedData.utilizationRate}%</span>
                    </div>
                    <Progress value={enhancedData.utilizationRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-deep-blue">Project Success Rate</span>
                      <span className="text-teal font-medium">{enhancedData.projectSuccessRate}%</span>
                    </div>
                    <Progress value={enhancedData.projectSuccessRate} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-deep-blue">Performance Rating</span>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= enhancedData.performanceRating ? 'fill-teal text-teal' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm font-medium">{enhancedData.performanceRating}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="mt-6">
              <Card className="bg-white border-slate/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                    <MessageSquare className="h-5 w-5" />
                    Performance Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {enhancedData.feedback.map((item) => (
                      <div key={item.id} className="p-3 bg-light-bg rounded-lg border border-slate/30">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm text-slate">
                            {item.author} • {new Date(item.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-deep-blue">{item.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Engagements Tab */}
            <TabsContent value="engagements" className="mt-6">
              <Card className="bg-white border-slate/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                    <Calendar className="h-5 w-5" />
                    Upcoming Engagements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {enhancedData.upcomingEngagements.map((engagement) => (
                      <div key={engagement.id} className="p-3 bg-light-bg rounded-lg border border-slate/30">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-deep-blue">{engagement.title}</h4>
                          <Badge className="bg-teal text-white">{engagement.type}</Badge>
                        </div>
                        <p className="text-sm text-slate mb-2">
                          Client: {engagement.client}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(engagement.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="mt-6">
              <Card className="bg-white border-slate/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                    <TrendingUp className="h-5 w-5" />
                    Current Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {enhancedData.currentProjects.map((project) => (
                      <div key={project.id} className="p-3 bg-light-bg rounded-lg border border-slate/30">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-deep-blue">{project.name}</h4>
                          <Badge className={project.status === 'Active' ? 'bg-teal text-white' : 'bg-slate text-white'}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate mb-2">
                          Role: {project.role} | Client: {project.client}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Started: {new Date(project.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate/30">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-slate text-deep-blue hover:bg-light-bg">
              Close
            </Button>
            <Button onClick={handleViewFullProfile} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
              View Full Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

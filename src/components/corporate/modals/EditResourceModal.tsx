
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { X, Plus, User, Award, TrendingUp, MessageSquare, Calendar, Briefcase, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: any;
  onSave: (updatedResource: any) => void;
}

export const EditResourceModal = ({ isOpen, onClose, resource, onSave }: EditResourceModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    location: '',
    experience: '',
    status: '',
    skills: [] as string[],
    joinDate: '',
    salary: '',
    performanceRating: 4.5,
    utilizationRate: 85,
    projectSuccessRate: 92,
    feedback: [] as Array<{id: number, date: string, author: string, comment: string, rating: number}>,
    upcomingEngagements: [] as Array<{id: number, title: string, date: string, client: string, type: string}>,
    currentProjects: [] as Array<{id: number, name: string, role: string, client: string, startDate: string, status: string}>
  });
  const [newSkill, setNewSkill] = useState('');
  const [newFeedback, setNewFeedback] = useState({ comment: '', rating: 5 });

  useEffect(() => {
    if (resource && isOpen) {
      setFormData({
        name: resource.name || '',
        email: resource.email || `${resource.name?.toLowerCase().replace(' ', '.')}@zapcg.com`,
        phone: resource.phone || '+1 (555) 123-4567',
        role: resource.role || '',
        department: resource.department || '',
        location: resource.location || '',
        experience: resource.experience || '',
        status: resource.status || '',
        skills: resource.skills || ['React', 'TypeScript', 'Node.js', 'AWS'],
        joinDate: resource.joinDate || 'Jan 15, 2023',
        salary: resource.salary || 'Not specified',
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
      });
    }
  }, [resource, isOpen]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddFeedback = () => {
    if (newFeedback.comment.trim()) {
      const feedback = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        author: 'Current User',
        comment: newFeedback.comment,
        rating: newFeedback.rating
      };
      setFormData(prev => ({
        ...prev,
        feedback: [...prev.feedback, feedback]
      }));
      setNewFeedback({ comment: '', rating: 5 });
    }
  };

  const handleSave = () => {
    try {
      const updatedResource = {
        ...resource,
        ...formData
      };
      onSave(updatedResource);
      toast({
        title: "Success",
        description: "Resource profile updated successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update resource profile",
        variant: "destructive",
      });
    }
  };

  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-deep-blue">
            Edit Resource Profile - {formData.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6 p-1 bg-light-bg rounded-xl">
            <TabsTrigger value="basic" className="text-xs">Basic Info</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="feedback" className="text-xs">Feedback</TabsTrigger>
            <TabsTrigger value="engagements" className="text-xs">Engagements</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-deep-blue flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billable">Billable</SelectItem>
                        <SelectItem value="benched">Available</SelectItem>
                        <SelectItem value="shadow">Shadow</SelectItem>
                        <SelectItem value="associate">Associate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input
                      id="joinDate"
                      value={formData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange('salary', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-deep-blue flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Skills & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <Button type="button" onClick={handleAddSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 border-deep-blue text-deep-blue">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-deep-blue flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Performance Rating</Label>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= formData.performanceRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm font-medium">{formData.performanceRating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Utilization Rate</Label>
                    <span className="font-medium">{formData.utilizationRate}%</span>
                  </div>
                  <Progress value={formData.utilizationRate} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <Label>Project Success Rate</Label>
                    <span className="font-medium">{formData.projectSuccessRate}%</span>
                  </div>
                  <Progress value={formData.projectSuccessRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-deep-blue flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Performance Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add performance feedback..."
                      value={newFeedback.comment}
                      onChange={(e) => setNewFeedback(prev => ({ ...prev, comment: e.target.value }))}
                      className="flex-1"
                    />
                    <div className="flex flex-col gap-2">
                      <Select value={newFeedback.rating.toString()} onValueChange={(value) => setNewFeedback(prev => ({ ...prev, rating: parseInt(value) }))}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>{rating}★</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={handleAddFeedback} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {formData.feedback.map((item) => (
                    <div key={item.id} className="p-3 bg-light-bg rounded-lg border">
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

          {/* Upcoming Engagements Tab */}
          <TabsContent value="engagements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-deep-blue flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Engagements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {formData.upcomingEngagements.map((engagement) => (
                    <div key={engagement.id} className="p-3 bg-light-bg rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-deep-blue">{engagement.title}</h4>
                          <p className="text-sm text-slate">Client: {engagement.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{engagement.type}</Badge>
                            <span className="text-xs text-slate">
                              {new Date(engagement.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Current Projects Tab */}
          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-deep-blue flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Current Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {formData.currentProjects.map((project) => (
                    <div key={project.id} className="p-3 bg-light-bg rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-deep-blue">{project.name}</h4>
                          <p className="text-sm text-slate">Role: {project.role}</p>
                          <p className="text-sm text-slate">Client: {project.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={project.status === 'Active' ? 'bg-teal text-white' : 'bg-slate text-white'}>
                              {project.status}
                            </Badge>
                            <span className="text-xs text-slate">
                              Started: {new Date(project.startDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate/30 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

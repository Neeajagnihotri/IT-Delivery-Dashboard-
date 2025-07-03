
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Save, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/contexts/ProjectContext";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const availableTechnologies = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Java", "AWS", "Docker", 
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "Jenkins",
  "Angular", "Vue.js", "Express.js", "Spring Boot", "Django", "Flask", "Redis",
  "Elasticsearch", "Microservices", "DevOps", "CI/CD", "Terraform", "Azure", "GCP"
];

export const EditProjectModal = ({ isOpen, onClose, projectId }: EditProjectModalProps) => {
  const { toast } = useToast();
  const { getProject, updateProject } = useProjects();
  const project = getProject(projectId);
  
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    status: '',
    priority: '',
    progress: 0,
    budget: 0,
    spent: 0,
    startDate: '',
    endDate: '',
    description: '',
    projectManager: '',
    teamLead: '',
    technologies: [] as string[]
  });
  
  const [newTechnology, setNewTechnology] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project && isOpen) {
      setFormData({
        name: project.name || '',
        client: project.client || '',
        status: project.status || '',
        priority: project.priority || '',
        progress: project.progress || 0,
        budget: project.budget || 0,
        spent: project.spent || 0,
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        description: project.description || '',
        projectManager: project.projectManager || '',
        teamLead: project.teamLead || '',
        technologies: project.technologies || []
      });
      setErrors({});
    }
  }, [project, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.client.trim()) {
      newErrors.client = "Client name is required";
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = "Progress must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addTechnology = (tech: string) => {
    if (tech && !formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech]
      }));
      setNewTechnology('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before saving.",
        variant: "destructive",
      });
      return;
    }

    try {
      const updatedData = {
        ...formData,
        remaining: formData.budget - formData.spent
      };
      
      updateProject(projectId, updatedData);
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-deep-blue">
            Edit Project Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`space-y-2 ${errors.name ? 'form-error' : ''}`}>
                  <Label htmlFor="name" className="text-deep-blue font-medium">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </div>
                  )}
                </div>
                
                <div className={`space-y-2 ${errors.client ? 'form-error' : ''}`}>
                  <Label htmlFor="client" className="text-deep-blue font-medium">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => handleInputChange('client', e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                  {errors.client && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.client}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-deep-blue font-medium">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-deep-blue font-medium">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectManager" className="text-deep-blue font-medium">Project Manager</Label>
                  <Input
                    id="projectManager"
                    value={formData.projectManager}
                    onChange={(e) => handleInputChange('projectManager', e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamLead" className="text-deep-blue font-medium">Tech Lead</Label>
                  <Input
                    id="teamLead"
                    value={formData.teamLead}
                    onChange={(e) => handleInputChange('teamLead', e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-deep-blue font-medium">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                </div>

                <div className={`space-y-2 ${errors.endDate ? 'form-error' : ''}`}>
                  <Label htmlFor="endDate" className="text-deep-blue font-medium">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                  {errors.endDate && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.endDate}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress & Budget */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue">Progress & Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`space-y-2 ${errors.progress ? 'form-error' : ''}`}>
                  <Label htmlFor="progress" className="text-deep-blue font-medium">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleInputChange('progress', Number(e.target.value))}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                  {errors.progress && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.progress}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-deep-blue font-medium">Total Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spent" className="text-deep-blue font-medium">Amount Spent ($)</Label>
                  <Input
                    id="spent"
                    type="number"
                    value={formData.spent}
                    onChange={(e) => handleInputChange('spent', Number(e.target.value))}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue">Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Select onValueChange={addTechnology}>
                  <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20">
                    <SelectValue placeholder="Select technologies" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate/30 z-50">
                    {availableTechnologies.filter(tech => !formData.technologies.includes(tech)).map((tech) => (
                      <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom technology"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology(newTechnology);
                      }
                    }}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20"
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTechnology(newTechnology)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-slate/30">
                    {formData.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="flex items-center gap-1 bg-deep-blue text-white">
                        {tech}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-teal"
                          onClick={() => removeTechnology(tech)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue">Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter detailed project description..."
                className="min-h-[120px] border-slate/40 focus:border-teal focus:ring-teal/20"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate/30">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

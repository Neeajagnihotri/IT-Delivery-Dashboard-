
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FolderPlus, Save, X, AlertCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/contexts/ProjectContext";

const availableTechnologies = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Java", "AWS", "Docker", 
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "Jenkins",
  "Angular", "Vue.js", "Express.js", "Spring Boot", "Django", "Flask", "Redis",
  "Elasticsearch", "Microservices", "DevOps", "CI/CD", "Terraform", "Azure", "GCP"
];

interface FormErrors {
  projectName?: string;
  clientName?: string;
  technologies?: string;
  startDate?: string;
  endDate?: string;
  progress?: string;
  budget?: string;
}

export const AddProjectPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addProject } = useProjects();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    projectManager: "",
    teamLead: "",
    priority: "",
    status: "Planning",
    progress: 0,
    startDate: "",
    endDate: "",
    budget: 0,
    spent: 0,
    technologies: [] as string[],
    description: "",
    milestones: [
      { name: "Project Initiation", date: "", status: "Pending" },
      { name: "Requirements Analysis", date: "", status: "Pending" },
      { name: "Design Phase", date: "", status: "Pending" },
      { name: "Development", date: "", status: "Pending" },
      { name: "Testing", date: "", status: "Pending" },
      { name: "Deployment", date: "", status: "Pending" }
    ],
    deliverables: [
      { name: "Project Documentation", status: "Pending", dueDate: "" },
      { name: "Technical Architecture", status: "Pending", dueDate: "" },
      { name: "Final Delivery", status: "Pending", dueDate: "" }
    ]
  });
  const [technologyInput, setTechnologyInput] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = "At least one technology is required";
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

    if (formData.budget < 0) {
      newErrors.budget = "Budget must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const projectData = {
        name: formData.projectName,
        client: formData.clientName,
        status: formData.status,
        priority: formData.priority,
        progress: formData.progress,
        budget: formData.budget,
        spent: formData.spent,
        remaining: formData.budget - formData.spent,
        startDate: formData.startDate,
        endDate: formData.endDate,
        description: formData.description,
        projectManager: formData.projectManager,
        teamLead: formData.teamLead,
        technologies: formData.technologies,
        resources: [],
        milestones: formData.milestones,
        deliverables: formData.deliverables
      };
      
      addProject(projectData);
      navigate('/resource-management');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addTechnology = (tech: string) => {
    if (tech && !formData.technologies.includes(tech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech]
      }));
      setTechnologyInput("");
      if (errors.technologies) {
        setErrors(prev => ({ ...prev, technologies: undefined }));
      }
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-deep-blue to-teal rounded-2xl shadow-lg">
              <FolderPlus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Add Project</h1>
              <p className="text-slate">Create comprehensive project with all details</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-slate text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Project Information */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-deep-blue">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`space-y-2 ${errors.projectName ? 'form-error' : ''}`}>
                  <Label htmlFor="projectName" className="text-deep-blue font-medium required">Project Name</Label>
                  <Input 
                    id="projectName" 
                    value={formData.projectName}
                    onChange={(e) => handleInputChange("projectName", e.target.value)}
                    placeholder="Enter project name" 
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                  {errors.projectName && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.projectName}
                    </div>
                  )}
                </div>
                
                <div className={`space-y-2 ${errors.clientName ? 'form-error' : ''}`}>
                  <Label htmlFor="clientName" className="text-deep-blue font-medium required">Client Name</Label>
                  <Input 
                    id="clientName" 
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                    placeholder="Enter client name" 
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                  {errors.clientName && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.clientName}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectManager" className="text-deep-blue font-medium">Project Manager</Label>
                  <Select onValueChange={(value) => handleInputChange("projectManager", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select project manager" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="john-smith" className="text-deep-blue hover:bg-light-bg">John Smith</SelectItem>
                      <SelectItem value="jane-doe" className="text-deep-blue hover:bg-light-bg">Jane Doe</SelectItem>
                      <SelectItem value="mike-johnson" className="text-deep-blue hover:bg-light-bg">Mike Johnson</SelectItem>
                      <SelectItem value="sarah-wilson" className="text-deep-blue hover:bg-light-bg">Sarah Wilson</SelectItem>
                      <SelectItem value="lisa-anderson" className="text-deep-blue hover:bg-light-bg">Lisa Anderson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamLead" className="text-deep-blue font-medium">Tech Lead</Label>
                  <Select onValueChange={(value) => handleInputChange("teamLead", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select tech lead" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="alex-rodriguez" className="text-deep-blue hover:bg-light-bg">Alex Rodriguez</SelectItem>
                      <SelectItem value="emily-davis" className="text-deep-blue hover:bg-light-bg">Emily Davis</SelectItem>
                      <SelectItem value="daniel-rodriguez" className="text-deep-blue hover:bg-light-bg">Daniel Rodriguez</SelectItem>
                      <SelectItem value="michael-chen" className="text-deep-blue hover:bg-light-bg">Michael Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority" className="text-deep-blue font-medium">Priority</Label>
                  <Select onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="Low" className="text-deep-blue hover:bg-light-bg">Low</SelectItem>
                      <SelectItem value="Medium" className="text-deep-blue hover:bg-light-bg">Medium</SelectItem>
                      <SelectItem value="High" className="text-deep-blue hover:bg-light-bg">High</SelectItem>
                      <SelectItem value="Critical" className="text-deep-blue hover:bg-light-bg">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-deep-blue font-medium">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="Planning" className="text-deep-blue hover:bg-light-bg">Planning</SelectItem>
                      <SelectItem value="In Progress" className="text-deep-blue hover:bg-light-bg">In Progress</SelectItem>
                      <SelectItem value="On Hold" className="text-deep-blue hover:bg-light-bg">On Hold</SelectItem>
                      <SelectItem value="Completed" className="text-deep-blue hover:bg-light-bg">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-deep-blue font-medium">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                </div>

                <div className={`space-y-2 ${errors.endDate ? 'form-error' : ''}`}>
                  <Label htmlFor="endDate" className="text-deep-blue font-medium">Expected End Date</Label>
                  <Input 
                    id="endDate" 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
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
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-deep-blue">Progress & Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`space-y-2 ${errors.progress ? 'form-error' : ''}`}>
                  <Label htmlFor="progress" className="text-deep-blue font-medium">Current Progress (%)</Label>
                  <Input 
                    id="progress" 
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => handleInputChange("progress", Number(e.target.value))}
                    placeholder="0" 
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                  {errors.progress && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.progress}
                    </div>
                  )}
                </div>

                <div className={`space-y-2 ${errors.budget ? 'form-error' : ''}`}>
                  <Label htmlFor="budget" className="text-deep-blue font-medium">Total Budget ($)</Label>
                  <Input 
                    id="budget" 
                    type="number"
                    min="0"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", Number(e.target.value))}
                    placeholder="Enter budget amount" 
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                  {errors.budget && (
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {errors.budget}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spent" className="text-deep-blue font-medium">Amount Spent ($)</Label>
                  <Input 
                    id="spent" 
                    type="number"
                    min="0"
                    value={formData.spent}
                    onChange={(e) => handleInputChange("spent", Number(e.target.value))}
                    placeholder="0" 
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-deep-blue">Required Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`space-y-3 ${errors.technologies ? 'form-error' : ''}`}>
                <Select onValueChange={addTechnology}>
                  <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                    <SelectValue placeholder="Select required technologies" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate/30 z-50">
                    {availableTechnologies.filter(tech => !formData.technologies.includes(tech)).map((tech) => (
                      <SelectItem key={tech} value={tech} className="text-deep-blue hover:bg-light-bg">{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add custom technology"
                    value={technologyInput}
                    onChange={(e) => setTechnologyInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology(technologyInput);
                      }
                    }}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                  <Button 
                    type="button" 
                    onClick={() => addTechnology(technologyInput)}
                    variant="outline"
                    size="sm"
                    className="border-slate text-deep-blue hover:bg-light-bg"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-slate/30">
                    {formData.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="flex items-center gap-1 bg-deep-blue text-white hover:bg-deep-blue/90">
                        {tech}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-teal"
                          onClick={() => removeTechnology(tech)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                
                {errors.technologies && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.technologies}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Description */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-deep-blue">Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter detailed project description, objectives, and requirements..."
                className="min-h-[120px] border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/resource-management')}
              disabled={isSubmitting}
              className="border-slate text-deep-blue hover:bg-light-bg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-deep-blue hover:bg-deep-blue/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

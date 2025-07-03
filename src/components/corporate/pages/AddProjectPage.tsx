import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FolderPlus, Save, X, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const availableSkills = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Java", "AWS", "Docker", 
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "Jenkins",
  "Angular", "Vue.js", "Express.js", "Spring Boot", "Django", "Flask", "Redis",
  "Elasticsearch", "Microservices", "DevOps", "CI/CD", "Terraform", "Azure", "GCP"
];

interface FormErrors {
  projectName?: string;
  clientName?: string;
  requiredSkills?: string;
  startDate?: string;
  endDate?: string;
}

export const AddProjectPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    engineeringManager: "",
    priority: "",
    startDate: "",
    endDate: "",
    budget: "",
    requiredSkills: [] as string[],
    description: ""
  });
  const [skillInput, setSkillInput] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (formData.requiredSkills.length === 0) {
      newErrors.requiredSkills = "At least one skill is required";
    }

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
      }
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
      
      toast({
        title: "Project Created Successfully",
        description: `${formData.projectName} has been added to the system with ${formData.requiredSkills.length} required skills.`,
      });
      
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
      setSkillInput("");
      // Clear skills error when adding a skill
      if (errors.requiredSkills) {
        setErrors(prev => ({ ...prev, requiredSkills: undefined }));
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
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
              <p className="text-slate">Create new project</p>
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
                    <div className="flex items-center gap-1 error-message">
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
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.clientName}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engineeringManager" className="text-deep-blue font-medium">Engineering Manager</Label>
                  <Select onValueChange={(value) => handleInputChange("engineeringManager", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select engineering manager" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="john-doe" className="text-deep-blue hover:bg-light-bg">John Doe</SelectItem>
                      <SelectItem value="jane-smith" className="text-deep-blue hover:bg-light-bg">Jane Smith</SelectItem>
                      <SelectItem value="mike-johnson" className="text-deep-blue hover:bg-light-bg">Mike Johnson</SelectItem>
                      <SelectItem value="sarah-wilson" className="text-deep-blue hover:bg-light-bg">Sarah Wilson</SelectItem>
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
                      <SelectItem value="high" className="text-deep-blue hover:bg-light-bg">High</SelectItem>
                      <SelectItem value="medium" className="text-deep-blue hover:bg-light-bg">Medium</SelectItem>
                      <SelectItem value="low" className="text-deep-blue hover:bg-light-bg">Low</SelectItem>
                      <SelectItem value="critical" className="text-deep-blue hover:bg-light-bg">Critical</SelectItem>
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
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-deep-blue font-medium">Expected End Date</Label>
                  <Input 
                    id="endDate" 
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="budget" className="text-deep-blue font-medium">Project Budget</Label>
                  <Input 
                    id="budget" 
                    type="text" 
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    placeholder="Enter budget amount" 
                    className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                </div>
                
                {/* Required Skills Section */}
                <div className={`space-y-2 md:col-span-2 ${errors.requiredSkills ? 'form-error' : ''}`}>
                  <Label className="text-deep-blue font-medium required">Required Skills</Label>
                  <div className="space-y-3">
                    <Select onValueChange={addSkill}>
                      <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                        <SelectValue placeholder="Select required skills" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-slate/30 z-50">
                        {availableSkills.filter(skill => !formData.requiredSkills.includes(skill)).map((skill) => (
                          <SelectItem key={skill} value={skill} className="text-deep-blue hover:bg-light-bg">{skill}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {/* Custom skill input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add custom skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill(skillInput);
                          }
                        }}
                        className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                      />
                      <Button 
                        type="button" 
                        onClick={() => addSkill(skillInput)}
                        variant="outline"
                        size="sm"
                        className="border-slate text-deep-blue hover:bg-light-bg"
                      >
                        Add
                      </Button>
                    </div>
                    
                    {formData.requiredSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-slate/30">
                        {formData.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="flex items-center gap-1 bg-deep-blue text-white hover:bg-deep-blue/90">
                            {skill}
                            <X
                              className="h-3 w-3 cursor-pointer hover:text-teal"
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {errors.requiredSkills && (
                      <div className="flex items-center gap-1 error-message">
                        <AlertCircle className="h-4 w-4" />
                        {errors.requiredSkills}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-deep-blue font-medium">Project Description</Label>
                  <Textarea 
                    id="description" 
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter detailed project description, objectives, and requirements..."
                    className="min-h-[120px] border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
                  />
                </div>
              </div>
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

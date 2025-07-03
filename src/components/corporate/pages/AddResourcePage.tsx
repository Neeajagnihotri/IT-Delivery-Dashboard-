
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Save, X, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";

const availableSkills = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Java", "AWS", "Docker", 
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "Jenkins",
  "Angular", "Vue.js", "Express.js", "Spring Boot", "Django", "Flask", "Redis",
  "Elasticsearch", "Microservices", "DevOps", "CI/CD", "Terraform", "Azure", "GCP"
];

const availableCertifications = [
  "AWS Certified Solutions Architect", "Google Cloud Professional", "Microsoft Azure Fundamentals",
  "Certified Kubernetes Administrator", "Oracle Certified Professional", "Salesforce Administrator",
  "PMP - Project Management Professional", "Certified ScrumMaster", "ITIL Foundation"
];

const domainExpertise = [
  "Healthcare", "Finance", "E-commerce", "Education", "Manufacturing", "Retail",
  "Banking", "Insurance", "Real Estate", "Media & Entertainment", "Travel & Hospitality"
];

const resourceManagers = [
  "John Smith", "Sarah Johnson", "Mike Brown", "Lisa Davis", "Tom Wilson", "Emily Chen"
];

const projectManagers = [
  "Alex Rodriguez", "Maria Garcia", "David Lee", "Jennifer White", "Robert Taylor", "Amanda Clark"
];

interface FormErrors {
  name?: string;
  email?: string;
  department?: string;
  role?: string;
  experience?: string;
  location?: string;
  status?: string;
  skills?: string;
  primarySkill?: string;
  resourceManager?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  expectedRollOffDate?: string;
  benchStartDate?: string;
  trainingCompletionDate?: string;
  projectUtilization?: string;
}

export const AddResourcePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
    experience: "",
    location: "",
    status: "",
    salary: "",
    email: "",
    phone: "",
    skills: [] as string[],
    // Resource Manager Fields
    resourceManager: "",
    primarySkill: "",
    secondarySkills: [] as string[],
    certifications: [] as string[],
    domainExpertise: "",
    currentProjectName: "",
    clientName: "",
    projectStartDate: "",
    projectEndDate: "",
    billabilityStatus: "",
    projectManagerName: "",
    projectUtilization: "",
    expectedRollOffDate: "",
    currentBenchStatus: "",
    benchStartDate: "",
    upcomingProjectAllocation: "",
    assignedTrainingPlan: "",
    trainingCompletionDate: ""
  });
  const [skillInput, setSkillInput] = useState("");
  const [secondarySkillInput, setSecondarySkillInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }

    if (!formData.experience) {
      newErrors.experience = "Experience level is required";
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    if (!formData.resourceManager) {
      newErrors.resourceManager = "Resource Manager is required";
    }

    if (!formData.primarySkill) {
      newErrors.primarySkill = "Primary skill is required";
    }

    // Date validation
    if (formData.projectStartDate && formData.projectEndDate) {
      const startDate = new Date(formData.projectStartDate);
      const endDate = new Date(formData.projectEndDate);
      if (endDate <= startDate) {
        newErrors.projectEndDate = "Project end date must be after start date";
      }
    }

    if (formData.projectUtilization && (isNaN(Number(formData.projectUtilization)) || Number(formData.projectUtilization) < 0 || Number(formData.projectUtilization) > 100)) {
      newErrors.projectUtilization = "Project utilization must be between 0 and 100";
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
        title: "Resource Added Successfully",
        description: `${formData.name} has been added to the system with ${formData.skills.length} skills.`,
      });
      
      navigate('/resource-management');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
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
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput("");
      // Clear skills error when adding a skill
      if (errors.skills) {
        setErrors(prev => ({ ...prev, skills: undefined }));
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addSecondarySkill = (skill: string) => {
    if (skill && !formData.secondarySkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        secondarySkills: [...prev.secondarySkills, skill]
      }));
      setSecondarySkillInput("");
    }
  };

  const removeSecondarySkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      secondarySkills: prev.secondarySkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addCertification = (certification: string) => {
    if (certification && !formData.certifications.includes(certification)) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, certification]
      }));
      setCertificationInput("");
    }
  };

  const removeCertification = (certToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert !== certToRemove)
    }));
  };

  const canEditSalary = user?.role === "hr" || user?.role === "resource_manager";

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-teal to-deep-blue rounded-2xl shadow-lg">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Add Resource</h1>
              <p className="text-slate">Add new employee to the system</p>
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
          {/* Personal Information */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-deep-blue">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className={`space-y-2 ${errors.name ? 'form-error' : ''}`}>
                  <Label htmlFor="name" className="text-deep-blue font-medium required">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </div>
                  )}
                </div>
                
                <div className={`space-y-2 ${errors.email ? 'form-error' : ''}`}>
                  <Label htmlFor="email" className="text-deep-blue font-medium required">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-deep-blue font-medium">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                </div>
                
                <div className={`space-y-2 ${errors.department ? 'form-error' : ''}`}>
                  <Label htmlFor="department" className="text-deep-blue font-medium required">Department</Label>
                  <Select onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="engineering" className="text-deep-blue hover:bg-light-bg">Engineering</SelectItem>
                      <SelectItem value="design" className="text-deep-blue hover:bg-light-bg">Design</SelectItem>
                      <SelectItem value="qa" className="text-deep-blue hover:bg-light-bg">Quality Assurance</SelectItem>
                      <SelectItem value="devops" className="text-deep-blue hover:bg-light-bg">DevOps</SelectItem>
                      <SelectItem value="product" className="text-deep-blue hover:bg-light-bg">Product Management</SelectItem>
                      <SelectItem value="data" className="text-deep-blue hover:bg-light-bg">Data Science</SelectItem>
                      <SelectItem value="mobile" className="text-deep-blue hover:bg-light-bg">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.department}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-deep-blue font-medium">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    placeholder="e.g., Senior Developer"
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                </div>
                
                <div className={`space-y-2 ${errors.experience ? 'form-error' : ''}`}>
                  <Label htmlFor="experience" className="text-deep-blue font-medium required">Experience Level</Label>
                  <Select onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="0-1" className="text-deep-blue hover:bg-light-bg">0-1 years</SelectItem>
                      <SelectItem value="1-3" className="text-deep-blue hover:bg-light-bg">1-3 years</SelectItem>
                      <SelectItem value="3-5" className="text-deep-blue hover:bg-light-bg">3-5 years</SelectItem>
                      <SelectItem value="5-8" className="text-deep-blue hover:bg-light-bg">5-8 years</SelectItem>
                      <SelectItem value="8+" className="text-deep-blue hover:bg-light-bg">8+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.experience}
                    </div>
                  )}
                </div>
                
                <div className={`space-y-2 ${errors.location ? 'form-error' : ''}`}>
                  <Label htmlFor="location" className="text-deep-blue font-medium required">Location</Label>
                  <Select onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="remote" className="text-deep-blue hover:bg-light-bg">Remote</SelectItem>
                      <SelectItem value="new-york" className="text-deep-blue hover:bg-light-bg">New York</SelectItem>
                      <SelectItem value="san-francisco" className="text-deep-blue hover:bg-light-bg">San Francisco</SelectItem>
                      <SelectItem value="austin" className="text-deep-blue hover:bg-light-bg">Austin</SelectItem>
                      <SelectItem value="seattle" className="text-deep-blue hover:bg-light-bg">Seattle</SelectItem>
                      <SelectItem value="chicago" className="text-deep-blue hover:bg-light-bg">Chicago</SelectItem>
                      <SelectItem value="bangalore" className="text-deep-blue hover:bg-light-bg">Bangalore</SelectItem>
                      <SelectItem value="hyderabad" className="text-deep-blue hover:bg-light-bg">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.location && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.location}
                    </div>
                  )}
                </div>
                
                <div className={`space-y-2 ${errors.status ? 'form-error' : ''}`}>
                  <Label htmlFor="status" className="text-deep-blue font-medium required">Status</Label>
                  <Select onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="billable" className="text-deep-blue hover:bg-light-bg">Billable</SelectItem>
                      <SelectItem value="benched" className="text-deep-blue hover:bg-light-bg">Benched</SelectItem>
                      <SelectItem value="shadow" className="text-deep-blue hover:bg-light-bg">Shadow</SelectItem>
                      <SelectItem value="associate" className="text-deep-blue hover:bg-light-bg">Associate</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.status}
                    </div>
                  )}
                </div>
                
                {canEditSalary && (
                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-deep-blue font-medium">Annual Salary</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => handleInputChange("salary", e.target.value)}
                      placeholder="e.g., $120,000"
                      type="text"
                      className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                    />
                  </div>
                )}
              </div>

              {/* Skills Section */}
              <div className={`space-y-3 ${errors.skills ? 'form-error' : ''}`}>
                <Label className="text-deep-blue font-medium required">Skills</Label>
                <div className="space-y-2">
                  <Select onValueChange={addSkill}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select skills" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {availableSkills.filter(skill => !formData.skills.includes(skill)).map((skill) => (
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
                </div>
                
                {/* Selected Skills */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-slate/30">
                    {formData.skills.map((skill) => (
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
                
                {errors.skills && (
                  <div className="flex items-center gap-1 error-message">
                    <AlertCircle className="h-4 w-4" />
                    {errors.skills}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Resource Manager Information */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-deep-blue">Resource Manager Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className={`space-y-2 ${errors.resourceManager ? 'form-error' : ''}`}>
                  <Label htmlFor="resourceManager" className="text-deep-blue font-medium required">Resource Manager / DM</Label>
                  <Select onValueChange={(value) => handleInputChange("resourceManager", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select resource manager" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {resourceManagers.map((manager) => (
                        <SelectItem key={manager} value={manager} className="text-deep-blue hover:bg-light-bg">{manager}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.resourceManager && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.resourceManager}
                    </div>
                  )}
                </div>

                <div className={`space-y-2 ${errors.primarySkill ? 'form-error' : ''}`}>
                  <Label htmlFor="primarySkill" className="text-deep-blue font-medium required">Primary Skill</Label>
                  <Select onValueChange={(value) => handleInputChange("primarySkill", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select primary skill" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {availableSkills.map((skill) => (
                        <SelectItem key={skill} value={skill} className="text-deep-blue hover:bg-light-bg">{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.primarySkill && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.primarySkill}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-deep-blue font-medium">Domain Expertise</Label>
                  <Select onValueChange={(value) => handleInputChange("domainExpertise", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select domain expertise" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {domainExpertise.map((domain) => (
                        <SelectItem key={domain} value={domain} className="text-deep-blue hover:bg-light-bg">{domain}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Secondary Skills */}
              <div className="space-y-3">
                <Label className="text-deep-blue font-medium">Secondary Skills</Label>
                <div className="space-y-2">
                  <Select onValueChange={addSecondarySkill}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select secondary skills" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {availableSkills.filter(skill => !formData.secondarySkills.includes(skill) && skill !== formData.primarySkill).map((skill) => (
                        <SelectItem key={skill} value={skill} className="text-deep-blue hover:bg-light-bg">{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom secondary skill"
                      value={secondarySkillInput}
                      onChange={(e) => setSecondarySkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSecondarySkill(secondarySkillInput);
                        }
                      }}
                      className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addSecondarySkill(secondarySkillInput)}
                      variant="outline"
                      size="sm"
                      className="border-slate text-deep-blue hover:bg-light-bg"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                {formData.secondarySkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-slate/30">
                    {formData.secondarySkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1 bg-teal text-white hover:bg-teal/90">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-deep-blue" 
                          onClick={() => removeSecondarySkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <Label className="text-deep-blue font-medium">Certifications</Label>
                <div className="space-y-2">
                  <Select onValueChange={addCertification}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select certifications" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {availableCertifications.filter(cert => !formData.certifications.includes(cert)).map((cert) => (
                        <SelectItem key={cert} value={cert} className="text-deep-blue hover:bg-light-bg">{cert}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom certification"
                      value={certificationInput}
                      onChange={(e) => setCertificationInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCertification(certificationInput);
                        }
                      }}
                      className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                    />
                    <Button 
                      type="button" 
                      onClick={() => addCertification(certificationInput)}
                      variant="outline"
                      size="sm"
                      className="border-slate text-deep-blue hover:bg-light-bg"
                    >
                      Add
                    </Button>
                  </div>
                </div>
                
                {formData.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-slate/30">
                    {formData.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="flex items-center gap-1 bg-slate text-white hover:bg-slate/90">
                        {cert}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-teal" 
                          onClick={() => removeCertification(cert)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 mb-6">
            <CardHeader>
              <CardTitle className="text-deep-blue">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentProjectName" className="text-deep-blue font-medium">Current Project Name</Label>
                  <Input
                    id="currentProjectName"
                    value={formData.currentProjectName}
                    onChange={(e) => handleInputChange("currentProjectName", e.target.value)}
                    placeholder="Enter current project name"
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-deep-blue font-medium">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                    placeholder="Enter client name"
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectManagerName" className="text-deep-blue font-medium">Project Manager Name</Label>
                  <Select onValueChange={(value) => handleInputChange("projectManagerName", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select project manager" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {projectManagers.map((pm) => (
                        <SelectItem key={pm} value={pm} className="text-deep-blue hover:bg-light-bg">{pm}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={`space-y-2 ${errors.projectStartDate ? 'form-error' : ''}`}>
                  <Label htmlFor="projectStartDate" className="text-deep-blue font-medium">Project Start Date</Label>
                  <Input
                    id="projectStartDate"
                    type="date"
                    value={formData.projectStartDate}
                    onChange={(e) => handleInputChange("projectStartDate", e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                  {errors.projectStartDate && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.projectStartDate}
                    </div>
                  )}
                </div>

                <div className={`space-y-2 ${errors.projectEndDate ? 'form-error' : ''}`}>
                  <Label htmlFor="projectEndDate" className="text-deep-blue font-medium">Project End Date</Label>
                  <Input
                    id="projectEndDate"
                    type="date"
                    value={formData.projectEndDate}
                    onChange={(e) => handleInputChange("projectEndDate", e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                  {errors.projectEndDate && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.projectEndDate}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billabilityStatus" className="text-deep-blue font-medium">Billability Status</Label>
                  <Select onValueChange={(value) => handleInputChange("billabilityStatus", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select billability status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="billable" className="text-deep-blue hover:bg-light-bg">Billable</SelectItem>
                      <SelectItem value="non-billable" className="text-deep-blue hover:bg-light-bg">Non-Billable</SelectItem>
                      <SelectItem value="internal" className="text-deep-blue hover:bg-light-bg">Internal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className={`space-y-2 ${errors.projectUtilization ? 'form-error' : ''}`}>
                  <Label htmlFor="projectUtilization" className="text-deep-blue font-medium">Project Utilization (%)</Label>
                  <Input
                    id="projectUtilization"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.projectUtilization}
                    onChange={(e) => handleInputChange("projectUtilization", e.target.value)}
                    placeholder="Enter utilization percentage"
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                  {errors.projectUtilization && (
                    <div className="flex items-center gap-1 error-message">
                      <AlertCircle className="h-4 w-4" />
                      {errors.projectUtilization}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedRollOffDate" className="text-deep-blue font-medium">Expected Roll-Off Date</Label>
                  <Input
                    id="expectedRollOffDate"
                    type="date"
                    value={formData.expectedRollOffDate}
                    onChange={(e) => handleInputChange("expectedRollOffDate", e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentBenchStatus" className="text-deep-blue font-medium">Current Bench Status</Label>
                  <Select onValueChange={(value) => handleInputChange("currentBenchStatus", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select bench status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="active" className="text-deep-blue hover:bg-light-bg">Active</SelectItem>
                      <SelectItem value="benched" className="text-deep-blue hover:bg-light-bg">Benched</SelectItem>
                      <SelectItem value="shadow" className="text-deep-blue hover:bg-light-bg">Shadow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benchStartDate" className="text-deep-blue font-medium">Bench Start Date</Label>
                  <Input
                    id="benchStartDate"
                    type="date"
                    value={formData.benchStartDate}
                    onChange={(e) => handleInputChange("benchStartDate", e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="upcomingProjectAllocation" className="text-deep-blue font-medium">Upcoming Project Allocation?</Label>
                  <Select onValueChange={(value) => handleInputChange("upcomingProjectAllocation", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select allocation status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="yes" className="text-deep-blue hover:bg-light-bg">Yes</SelectItem>
                      <SelectItem value="no" className="text-deep-blue hover:bg-light-bg">No</SelectItem>
                      <SelectItem value="pending" className="text-deep-blue hover:bg-light-bg">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTrainingPlan" className="text-deep-blue font-medium">Assigned Training Plan?</Label>
                  <Select onValueChange={(value) => handleInputChange("assignedTrainingPlan", value)}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Select training plan status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      <SelectItem value="yes" className="text-deep-blue hover:bg-light-bg">Yes</SelectItem>
                      <SelectItem value="no" className="text-deep-blue hover:bg-light-bg">No</SelectItem>
                      <SelectItem value="in-progress" className="text-deep-blue hover:bg-light-bg">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trainingCompletionDate" className="text-deep-blue font-medium">Training Completion Date</Label>
                  <Input
                    id="trainingCompletionDate"
                    type="date"
                    value={formData.trainingCompletionDate}
                    onChange={(e) => handleInputChange("trainingCompletionDate", e.target.value)}
                    className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
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
              {isSubmitting ? "Adding..." : "Add Resource"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

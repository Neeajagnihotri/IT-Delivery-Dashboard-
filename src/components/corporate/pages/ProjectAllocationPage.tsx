
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Users, Zap, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const availableProjects = [
  { id: "1", name: "E-commerce Platform", client: "TechCorp", requiredSkills: ["React", "Node.js", "AWS"] },
  { id: "2", name: "Mobile Banking App", client: "FinanceBank", requiredSkills: ["React Native", "Java", "Azure"] },
  { id: "3", name: "Healthcare Portal", client: "MedTech", requiredSkills: ["Angular", "Python", "Docker"] }
];

const availableResources = [
  { id: "1", name: "John Smith", designation: "Senior Developer", skills: ["React", "Node.js", "TypeScript"], status: "Benched" },
  { id: "2", name: "Mike Johnson", designation: "DevOps Engineer", skills: ["AWS", "Docker", "Python"], status: "Benched" },
  { id: "3", name: "Emma Wilson", designation: "Frontend Developer", skills: ["React", "TypeScript", "CSS"], status: "Billable" },
  { id: "4", name: "Alex Chen", designation: "Junior Developer", skills: ["JavaScript", "React", "HTML"], status: "Associate" }
];

export const ProjectAllocationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [allocationStartDate, setAllocationStartDate] = useState("");
  const [allocationEndDate, setAllocationEndDate] = useState("");
  const [roleInProject, setRoleInProject] = useState("");
  const [resourceAllocation, setResourceAllocation] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [smartMatches, setSmartMatches] = useState<any[]>([]);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    const project = availableProjects.find(p => p.id === projectId);
    if (project) {
      // Smart matching logic
      const matches = availableResources.filter(resource => 
        resource.skills.some(skill => project.requiredSkills.includes(skill))
      ).map(resource => ({
        ...resource,
        matchScore: resource.skills.filter(skill => project.requiredSkills.includes(skill)).length,
        matchPercentage: Math.round((resource.skills.filter(skill => project.requiredSkills.includes(skill)).length / project.requiredSkills.length) * 100)
      })).sort((a, b) => b.matchScore - a.matchScore);
      
      setSmartMatches(matches);
    }
  };

  const handleAllocate = () => {
    if (!selectedProject || !selectedResource || !allocationStartDate || !roleInProject || !resourceAllocation) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Resource Allocated Successfully",
      description: "The resource has been allocated to the project.",
    });
    
    // Reset form
    setSelectedProject("");
    setSelectedResource("");
    setAllocationStartDate("");
    setAllocationEndDate("");
    setRoleInProject("");
    setResourceAllocation("");
    setProjectManager("");
    setSmartMatches([]);
  };

  const handleCancel = () => {
    setSelectedProject("");
    setSelectedResource("");
    setAllocationStartDate("");
    setAllocationEndDate("");
    setRoleInProject("");
    setResourceAllocation("");
    setProjectManager("");
    setSmartMatches([]);
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-slate to-deep-blue rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">Smart Project Resource Allocation</h1>
              <p className="text-slate">Allocate resources to projects with intelligent skill matching</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-management')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Allocation Details */}
          <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
            <CardHeader className="bg-gradient-to-r from-light-bg to-white border-b border-deep-blue/20">
              <CardTitle className="text-deep-blue">Allocation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="project" className="text-deep-blue font-medium">Select Project *</Label>
                <Select value={selectedProject} onValueChange={handleProjectSelect}>
                  <SelectTrigger className="border-soft-silver/40 focus:border-teal">
                    <SelectValue placeholder="Choose project" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-soft-silver/30 z-50">
                    {availableProjects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name} - {project.client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resource" className="text-deep-blue font-medium">Select Resource *</Label>
                <Select value={selectedResource} onValueChange={setSelectedResource}>
                  <SelectTrigger className="border-soft-silver/40 focus:border-teal">
                    <SelectValue placeholder="Choose resource" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-soft-silver/30 z-50">
                    {availableResources.map(resource => (
                      <SelectItem key={resource.id} value={resource.id}>
                        {resource.name} - {resource.designation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-deep-blue font-medium">Allocation Start Date *</Label>
                  <Input 
                    id="startDate" 
                    type="date" 
                    value={allocationStartDate}
                    onChange={(e) => setAllocationStartDate(e.target.value)}
                    className="border-soft-silver/40 focus:border-teal"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-deep-blue font-medium">Allocation End Date</Label>
                  <Input 
                    id="endDate" 
                    type="date" 
                    value={allocationEndDate}
                    onChange={(e) => setAllocationEndDate(e.target.value)}
                    className="border-soft-silver/40 focus:border-teal"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-deep-blue font-medium">Role in Project *</Label>
                <Select value={roleInProject} onValueChange={setRoleInProject}>
                  <SelectTrigger className="border-soft-silver/40 focus:border-teal">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-soft-silver/30 z-50">
                    <SelectItem value="lead">Lead Developer</SelectItem>
                    <SelectItem value="senior">Senior Developer</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="junior">Junior Developer</SelectItem>
                    <SelectItem value="qa">QA Engineer</SelectItem>
                    <SelectItem value="devops">DevOps Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allocation" className="text-deep-blue font-medium">Resource % Allocation *</Label>
                <Input 
                  id="allocation" 
                  type="number" 
                  min="1" 
                  max="100"
                  placeholder="Enter percentage (1-100)"
                  value={resourceAllocation}
                  onChange={(e) => setResourceAllocation(e.target.value)}
                  className="border-soft-silver/40 focus:border-teal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pm" className="text-deep-blue font-medium">Project Manager</Label>
                <Select value={projectManager} onValueChange={setProjectManager}>
                  <SelectTrigger className="border-soft-silver/40 focus:border-teal">
                    <SelectValue placeholder="Select or auto-fill" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-soft-silver/30 z-50">
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={handleAllocate}
                  className="bg-deep-blue hover:bg-deep-blue/90 text-white flex-1"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Allocate Resource
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-soft-silver text-deep-blue hover:bg-light-bg"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Smart Resource Matching */}
          <Card className="bg-white rounded-2xl shadow-lg border border-teal/20">
            <CardHeader className="bg-gradient-to-r from-teal/5 to-teal/10 border-b border-teal/20">
              <CardTitle className="text-deep-blue flex items-center">
                <Zap className="h-5 w-5 mr-2 text-teal" />
                Smart Resource Matching
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {smartMatches.length > 0 ? (
                <div className="space-y-4">
                  {smartMatches.map(resource => (
                    <div 
                      key={resource.id}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selectedResource === resource.id 
                          ? 'border-teal bg-teal/5' 
                          : 'border-soft-silver/30 hover:border-teal/40 hover:bg-teal/5'
                      }`}
                      onClick={() => setSelectedResource(resource.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-deep-blue">{resource.name}</h4>
                          <p className="text-sm text-slate">{resource.designation}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            resource.status === 'Benched' 
                              ? 'bg-deep-blue/10 text-deep-blue border-deep-blue/20'
                              : resource.status === 'Associate'
                              ? 'bg-teal/10 text-teal border-teal/20'
                              : 'bg-slate/10 text-slate border-slate/20'
                          }>
                            {resource.status}
                          </Badge>
                          <Badge className="bg-teal text-white">
                            {resource.matchPercentage}% Match
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {resource.skills.map((skill: string) => {
                          const isRequired = selectedProject && availableProjects.find(p => p.id === selectedProject)?.requiredSkills.includes(skill);
                          return (
                            <Badge 
                              key={skill}
                              className={isRequired 
                                ? "bg-deep-blue text-white" 
                                : "bg-slate/20 text-slate border-slate/30"
                              }
                            >
                              {skill}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="p-4 bg-light-bg rounded-2xl mb-4 mx-auto w-fit">
                    <Zap className="h-8 w-8 text-slate" />
                  </div>
                  <p className="text-slate">Select a project to see smart resource matches</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDataSync, Project } from "@/contexts/DataSyncContext";
import { Slider } from "@/components/ui/slider";

interface EditProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
}

const availableSkills = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Java", "AWS", "Docker", 
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "Jenkins"
];

export const EditProjectModal = ({ open, onOpenChange, project }: EditProjectModalProps) => {
  const { toast } = useToast();
  const { updateProject } = useDataSync();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    status: "",
    priority: "",
    progress: 0,
    budget: 0,
    spent: 0,
    startDate: "",
    endDate: "",
    description: "",
    projectManager: "",
    teamLead: "",
    technologies: [] as string[]
  });
  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    if (project && open) {
      setFormData({
        name: project.name,
        client: project.client,
        status: project.status,
        priority: project.priority,
        progress: project.progress,
        budget: project.budget,
        spent: project.spent,
        startDate: project.startDate,
        endDate: project.endDate,
        description: project.description,
        projectManager: project.projectManager,
        teamLead: project.teamLead,
        technologies: [...project.technologies]
      });
    }
  }, [project, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProject(project.id, formData);
      
      toast({
        title: "Project Updated",
        description: "Changes have been synchronized across all dashboard views.",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.technologies.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, skill]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(skill => skill !== skillToRemove)
    }));
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white border-deep-blue/20">
        <DialogHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 p-6 rounded-t-lg border-b border-deep-blue/20">
          <DialogTitle className="text-2xl font-semibold text-deep-blue">
            Edit Project: {project.name}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-deep-blue font-medium">Project Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client" className="text-deep-blue font-medium">Client</Label>
              <Input 
                id="client" 
                value={formData.client}
                onChange={(e) => handleInputChange("client", e.target.value)}
                className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status" className="text-deep-blue font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate/30">
                  <SelectItem value="Planning" className="text-deep-blue hover:bg-light-bg">Planning</SelectItem>
                  <SelectItem value="In Progress" className="text-deep-blue hover:bg-light-bg">In Progress</SelectItem>
                  <SelectItem value="Completed" className="text-deep-blue hover:bg-light-bg">Completed</SelectItem>
                  <SelectItem value="On Hold" className="text-deep-blue hover:bg-light-bg">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-deep-blue font-medium">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate/30">
                  <SelectItem value="Low" className="text-deep-blue hover:bg-light-bg">Low</SelectItem>
                  <SelectItem value="Medium" className="text-deep-blue hover:bg-light-bg">Medium</SelectItem>
                  <SelectItem value="High" className="text-deep-blue hover:bg-light-bg">High</SelectItem>
                  <SelectItem value="Critical" className="text-deep-blue hover:bg-light-bg">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="projectManager" className="text-deep-blue font-medium">Project Manager</Label>
              <Input 
                id="projectManager" 
                value={formData.projectManager}
                onChange={(e) => handleInputChange("projectManager", e.target.value)}
                className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teamLead" className="text-deep-blue font-medium">Team Lead</Label>
              <Input 
                id="teamLead" 
                value={formData.teamLead}
                onChange={(e) => handleInputChange("teamLead", e.target.value)}
                className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
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
              <Label htmlFor="endDate" className="text-deep-blue font-medium">End Date</Label>
              <Input 
                id="endDate" 
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-deep-blue font-medium">Budget</Label>
              <Input 
                id="budget" 
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", parseFloat(e.target.value) || 0)}
                className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="spent" className="text-deep-blue font-medium">Amount Spent</Label>
              <Input 
                id="spent" 
                type="number"
                value={formData.spent}
                onChange={(e) => handleInputChange("spent", parseFloat(e.target.value) || 0)}
                className="border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
              />
            </div>
          </div>
          
          {/* Progress Slider */}
          <div className="space-y-2">
            <Label className="text-deep-blue font-medium">Progress: {formData.progress}%</Label>
            <Slider
              value={[formData.progress]}
              onValueChange={(value) => handleInputChange("progress", value[0])}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
          
          {/* Technologies */}
          <div className="space-y-2">
            <Label className="text-deep-blue font-medium">Technologies</Label>
            <div className="space-y-3">
              <Select onValueChange={addSkill}>
                <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                  <SelectValue placeholder="Add technology" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate/30">
                  {availableSkills.filter(skill => !formData.technologies.includes(skill)).map((skill) => (
                    <SelectItem key={skill} value={skill} className="text-deep-blue hover:bg-light-bg">{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom technology"
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
              
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-slate/30">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1 bg-deep-blue text-white hover:bg-deep-blue/90">
                      {tech}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-teal"
                        onClick={() => removeSkill(tech)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-deep-blue font-medium">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="min-h-[100px] border-slate/40 bg-white text-deep-blue focus:border-teal focus:ring-teal/20"
            />
          </div>
          
          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate/20">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddProjectModal = ({ open, onOpenChange }: AddProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    manager: "",
    description: "",
    priority: "",
    budget: "",
    startDate: "",
    endDate: "",
    requiredSkills: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const { toast } = useToast();

  const availableSkills = ["React", "Node.js", "Python", "Java", "AWS", "Docker", "TypeScript", "MongoDB", "PostgreSQL", "GraphQL"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success({
        title: "Project Created Successfully",
        description: `${formData.name} has been added to the project portfolio with required skills: ${formData.requiredSkills.join(", ")}.`,
      });
      setIsLoading(false);
      onOpenChange(false);
      setFormData({
        name: "",
        client: "",
        manager: "",
        description: "",
        priority: "",
        budget: "",
        startDate: "",
        endDate: "",
        requiredSkills: []
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skill]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto bg-white border-slate/30">
        <DialogHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 p-4 rounded-t-lg">
          <DialogTitle className="text-xl font-semibold text-deep-blue">Create New Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project-name" className="text-deep-blue font-medium">Project Name *</Label>
              <Input
                id="project-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter project name"
                className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client" className="text-deep-blue font-medium">Client Name *</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleInputChange("client", e.target.value)}
                placeholder="Enter client name"
                className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="manager" className="text-deep-blue font-medium">Engineering Manager *</Label>
              <Select onValueChange={(value) => handleInputChange("manager", value)}>
                <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate/30 z-50">
                  <SelectItem value="sarah-johnson" className="text-deep-blue hover:bg-light-bg">Sarah Johnson</SelectItem>
                  <SelectItem value="michael-chen" className="text-deep-blue hover:bg-light-bg">Michael Chen</SelectItem>
                  <SelectItem value="david-lee" className="text-deep-blue hover:bg-light-bg">David Lee</SelectItem>
                  <SelectItem value="lisa-wang" className="text-deep-blue hover:bg-light-bg">Lisa Wang</SelectItem>
                  <SelectItem value="john-martinez" className="text-deep-blue hover:bg-light-bg">John Martinez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-deep-blue font-medium">Priority *</Label>
              <Select onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate/30 z-50">
                  <SelectItem value="high" className="text-deep-blue hover:bg-light-bg">High</SelectItem>
                  <SelectItem value="medium" className="text-deep-blue hover:bg-light-bg">Medium</SelectItem>
                  <SelectItem value="low" className="text-deep-blue hover:bg-light-bg">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-deep-blue font-medium">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-deep-blue font-medium">Expected End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-deep-blue font-medium">Project Budget</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              placeholder="e.g., $500,000"
              type="text"
              className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
            />
          </div>

          {/* Required Skills Section */}
          <div className="space-y-2">
            <Label htmlFor="skills" className="text-deep-blue font-medium">Required Skills *</Label>
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
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-deep-blue font-medium">Project Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the project scope, objectives, and key requirements..."
              rows={4}
              className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate/30">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="border-slate text-deep-blue hover:bg-light-bg"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || formData.requiredSkills.length === 0}
              className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-deep-blue/90 hover:to-teal/90"
            >
              {isLoading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

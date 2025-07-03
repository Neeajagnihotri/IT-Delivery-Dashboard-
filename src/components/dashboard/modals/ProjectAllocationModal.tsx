
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, CheckCircle, AlertCircle } from "lucide-react";

interface ProjectAllocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Resource {
  id: number;
  name: string;
  role: string;
  status: string;
  skills: string[];
}

interface EnhancedResource extends Resource {
  skillMatch: number;
  matchPercentage: number;
}

const availableResources: Resource[] = [
  { id: 1, name: "John Smith", role: "Senior Developer", status: "Benched", skills: ["React", "Node.js", "TypeScript"] },
  { id: 2, name: "Mike Johnson", role: "DevOps Engineer", status: "Benched", skills: ["AWS", "Docker", "Python"] },
  { id: 3, name: "Emma Wilson", role: "Frontend Developer", status: "Billable", skills: ["React", "TypeScript", "CSS"] },
  { id: 4, name: "Alex Chen", role: "Junior Developer", status: "Associate", skills: ["JavaScript", "React", "HTML"] },
  { id: 5, name: "Sarah Davis", role: "Full Stack Developer", status: "Benched", skills: ["React", "Node.js", "MongoDB"] }
];

const activeProjects = [
  { id: 1, name: "Project Alpha", client: "TechCorp Inc.", resourceCount: 8, requiredSkills: ["React", "Node.js"] },
  { id: 2, name: "Project Beta", client: "InnovateLab", resourceCount: 6, requiredSkills: ["Python", "AWS"] },
  { id: 3, name: "Project Gamma", client: "StartupXYZ", resourceCount: 3, requiredSkills: ["React", "TypeScript"] }
];

export const ProjectAllocationModal = ({ open, onOpenChange }: ProjectAllocationModalProps) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedResource, setSelectedResource] = useState("");
  const [allocationDate, setAllocationDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const getSelectedProjectData = () => {
    return activeProjects.find(p => p.id.toString() === selectedProject);
  };

  const getFilteredResources = (): EnhancedResource[] => {
    const project = getSelectedProjectData();
    if (!project) return availableResources.map(r => ({ ...r, skillMatch: 0, matchPercentage: 0 }));

    return availableResources.map(resource => ({
      ...resource,
      skillMatch: resource.skills.filter(skill => project.requiredSkills.includes(skill)).length,
      matchPercentage: Math.round((resource.skills.filter(skill => project.requiredSkills.includes(skill)).length / project.requiredSkills.length) * 100)
    })).sort((a, b) => b.skillMatch - a.skillMatch);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const project = activeProjects.find(p => p.id.toString() === selectedProject);
    const resource = availableResources.find(r => r.id.toString() === selectedResource);

    // Simulate API call
    setTimeout(() => {
      toast.success({
        title: "Resource Allocated Successfully",
        description: `${resource?.name} has been allocated to ${project?.name} based on skill matching.`,
      });
      setIsLoading(false);
      onOpenChange(false);
      setSelectedProject("");
      setSelectedResource("");
      setAllocationDate("");
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto bg-white border-slate/30">
        <DialogHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 p-4 rounded-t-lg">
          <DialogTitle className="text-xl font-semibold flex items-center text-deep-blue">
            <Users className="h-5 w-5 mr-2" />
            Smart Project Resource Allocation
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Allocation Form */}
          <Card className="bg-white border-slate/30">
            <CardHeader className="bg-light-bg">
              <CardTitle className="text-lg text-deep-blue">Allocation Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project" className="text-deep-blue font-medium">Select Project *</Label>
                  <Select onValueChange={setSelectedProject}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Choose project" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {activeProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id.toString()} className="text-deep-blue hover:bg-light-bg">
                          <div className="flex flex-col">
                            <span>{project.name} - {project.client}</span>
                            <span className="text-xs text-slate">
                              Required: {project.requiredSkills.join(", ")}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProject && (
                  <div className="p-3 bg-light-bg rounded-lg border border-slate/30">
                    <div className="text-sm font-medium text-deep-blue">
                      Required Skills:
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {getSelectedProjectData()?.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs border-slate text-deep-blue">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="resource" className="text-deep-blue font-medium">Select Resource *</Label>
                  <Select onValueChange={setSelectedResource}>
                    <SelectTrigger className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue">
                      <SelectValue placeholder="Choose resource" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate/30 z-50">
                      {getFilteredResources().map((resource) => (
                        <SelectItem key={resource.id} value={resource.id.toString()} className="text-deep-blue hover:bg-light-bg">
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <span>{resource.name} - {resource.role}</span>
                              {selectedProject && (
                                <div className="flex items-center gap-1 mt-1">
                                  {resource.matchPercentage >= 70 ? (
                                    <CheckCircle className="h-3 w-3 text-teal" />
                                  ) : (
                                    <AlertCircle className="h-3 w-3 text-deep-blue" />
                                  )}
                                  <span className="text-xs text-slate">
                                    {resource.matchPercentage}% match
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allocation-date" className="text-deep-blue font-medium">Allocation Start Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate" />
                    <input
                      id="allocation-date"
                      type="date"
                      value={allocationDate}
                      onChange={(e) => setAllocationDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-slate/40 rounded-md focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal bg-white text-deep-blue"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
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
                    disabled={isLoading || !selectedProject || !selectedResource}
                    className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-deep-blue/90 hover:to-teal/90"
                  >
                    {isLoading ? "Allocating..." : "Allocate Resource"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Smart Matching Overview */}
          <Card className="bg-white border-slate/30">
            <CardHeader className="bg-light-bg">
              <CardTitle className="text-lg text-deep-blue">Smart Resource Matching</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {getFilteredResources().map((resource) => (
                  <div 
                    key={resource.id} 
                    className={`p-3 rounded-lg border transition-all ${
                      selectedResource === resource.id.toString() 
                        ? 'border-teal bg-teal/5' 
                        : 'border-slate/40 hover:border-slate/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-deep-blue">{resource.name}</h4>
                        <p className="text-sm text-slate">{resource.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={
                            resource.status === 'Benched' 
                              ? 'bg-deep-blue/10 text-deep-blue border-deep-blue/20'
                              : resource.status === 'Associate'
                              ? 'bg-teal/10 text-teal border-teal/20'
                              : 'bg-slate/10 text-slate border-slate/20'
                          }
                        >
                          {resource.status}
                        </Badge>
                        {selectedProject && (
                          <Badge 
                            variant={resource.matchPercentage >= 70 ? "default" : "secondary"}
                            className={resource.matchPercentage >= 70 ? "bg-teal text-white" : "bg-deep-blue/10 text-deep-blue"}
                          >
                            {resource.matchPercentage}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {resource.skills.map((skill) => {
                        const isRequired = selectedProject && getSelectedProjectData()?.requiredSkills.includes(skill);
                        return (
                          <Badge 
                            key={skill} 
                            variant={isRequired ? "default" : "outline"}
                            className={`text-xs ${isRequired ? "bg-teal text-white" : "border-slate text-deep-blue"}`}
                          >
                            {skill}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

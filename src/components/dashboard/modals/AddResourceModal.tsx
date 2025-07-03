
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface AddResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const availableSkills = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Java", "AWS", "Docker", 
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "Jenkins",
  "Angular", "Vue.js", "Express.js", "Spring Boot", "Django", "Flask", "Redis",
  "Elasticsearch", "Microservices", "DevOps", "CI/CD", "Terraform", "Azure", "GCP"
];

export const AddResourceModal = ({ open, onOpenChange }: AddResourceModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
    experience: "",
    location: "",
    status: "",
    salary: "",
    skills: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success({
        title: "Resource Added Successfully",
        description: `${formData.name} has been added to the system with ${formData.skills.length} skills.`,
      });
      setIsLoading(false);
      onOpenChange(false);
      setFormData({
        name: "",
        department: "",
        role: "",
        experience: "",
        location: "",
        status: "",
        salary: "",
        skills: []
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSkillSelect = (skill: string) => {
    addSkill(skill);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white border-slate/30">
        <DialogHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 p-4 rounded-t-lg">
          <DialogTitle className="text-xl font-semibold text-deep-blue">Add New Resource</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-deep-blue font-medium">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter full name"
                className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department" className="text-deep-blue font-medium">Department *</Label>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-deep-blue font-medium">Role *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                placeholder="e.g., Senior Developer"
                className="border-slate/40 focus:border-teal focus:ring-teal/20 bg-white text-deep-blue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-deep-blue font-medium">Experience Level *</Label>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-deep-blue font-medium">Location *</Label>
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
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status" className="text-deep-blue font-medium">Status *</Label>
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
            </div>
          </div>
          
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

          {/* Skills Section */}
          <div className="space-y-3">
            <Label className="text-deep-blue font-medium">Skills *</Label>
            <div className="space-y-2">
              <Select onValueChange={handleSkillSelect}>
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
              disabled={isLoading}
              className="bg-gradient-to-r from-deep-blue to-teal text-white hover:from-deep-blue/90 hover:to-teal/90"
            >
              {isLoading ? "Adding..." : "Add Resource"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Building, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign } from "lucide-react";

interface EditResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: any;
  onSave: (updatedResource: any) => void;
}

export const EditResourceModal: React.FC<EditResourceModalProps> = ({
  isOpen,
  onClose,
  resource,
  onSave
}) => {
  const [formData, setFormData] = useState({
    name: resource?.name || '',
    role: resource?.role || '',
    department: resource?.department || '',
    location: resource?.location || '',
    experience: resource?.experience || '',
    status: resource?.status || '',
    email: resource?.email || `${resource?.name?.toLowerCase().replace(' ', '.')}@zapcom.com` || '',
    phone: resource?.phone || '+1 (555) 123-4567',
    salary: resource?.salary || '',
    skills: resource?.skills?.join(', ') || 'React, TypeScript, Node.js, AWS',
    joinDate: resource?.joinDate || '2023-01-15',
    projects: resource?.projects || 0
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const updatedResource = {
      ...resource,
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };
    onSave(updatedResource);
    onClose();
  };

  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white border-slate/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold flex items-center gap-3 text-deep-blue">
            <User className="h-6 w-6 text-deep-blue" />
            Edit Resource Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-deep-blue font-medium">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-slate/30 focus:border-teal"
              />
            </div>
            
            <div>
              <Label htmlFor="role" className="text-deep-blue font-medium">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="border-slate/30 focus:border-teal"
              />
            </div>
            
            <div>
              <Label htmlFor="department" className="text-deep-blue font-medium">Department</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className="border-slate/30 focus:border-teal">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="QA">QA</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location" className="text-deep-blue font-medium">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="border-slate/30 focus:border-teal"
              />
            </div>
            
            <div>
              <Label htmlFor="experience" className="text-deep-blue font-medium">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="e.g., 5+ years"
                className="border-slate/30 focus:border-teal"
              />
            </div>
          </div>
          
          {/* Contact & Status Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="status" className="text-deep-blue font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="border-slate/30 focus:border-teal">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Billable">Billable</SelectItem>
                  <SelectItem value="Benched">Benched</SelectItem>
                  <SelectItem value="Shadow">Shadow</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-deep-blue font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-slate/30 focus:border-teal"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-deep-blue font-medium">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-slate/30 focus:border-teal"
              />
            </div>
            
            <div>
              <Label htmlFor="salary" className="text-deep-blue font-medium">Salary</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="e.g., $75,000"
                className="border-slate/30 focus:border-teal"
              />
            </div>
            
            <div>
              <Label htmlFor="projects" className="text-deep-blue font-medium">Current Projects</Label>
              <Input
                id="projects"
                type="number"
                value={formData.projects}
                onChange={(e) => handleInputChange('projects', parseInt(e.target.value) || 0)}
                className="border-slate/30 focus:border-teal"
              />
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="md:col-span-2">
            <Label htmlFor="skills" className="text-deep-blue font-medium">Skills (comma-separated)</Label>
            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="React, TypeScript, Node.js, AWS"
              rows={3}
              className="border-slate/30 focus:border-teal"
            />
          </div>
          
          <div>
            <Label htmlFor="joinDate" className="text-deep-blue font-medium">Join Date</Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleInputChange('joinDate', e.target.value)}
              className="border-slate/30 focus:border-teal"
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-3 pt-4 border-t border-slate/30">
          <Button variant="outline" onClick={onClose} className="border-slate text-deep-blue hover:bg-light-bg">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

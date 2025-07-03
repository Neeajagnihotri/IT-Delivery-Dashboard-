
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Edit, User, Mail, Phone, MapPin, Briefcase, Calendar, Eye, X } from "lucide-react";

const mockEmployees = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Developer",
    location: "New York",
    joinDate: "2022-01-15",
    status: "Active",
    employeeId: "EMP001",
    experience: "5-8 years",
    salary: "$120,000",
    skills: ["React", "TypeScript", "Node.js", "AWS"]
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@company.com",
    phone: "+1 (555) 234-5678",
    department: "Design",
    position: "UX Designer",
    location: "San Francisco",
    joinDate: "2022-03-20",
    status: "Active",
    employeeId: "EMP002",
    experience: "3-5 years",
    salary: "$95,000",
    skills: ["Figma", "Sketch", "Prototyping", "User Research"]
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    phone: "+1 (555) 345-6789",
    department: "Engineering",
    position: "DevOps Engineer",
    location: "Austin",
    joinDate: "2021-11-10",
    status: "Active",
    employeeId: "EMP003",
    experience: "3-5 years",
    salary: "$110,000",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"]
  }
];

const availableSkills = [
  "React", "Node.js", "TypeScript", "JavaScript", "Python", "Java", "AWS", "Docker", 
  "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Git", "Jenkins",
  "Angular", "Vue.js", "Express.js", "Spring Boot", "Django", "Flask", "Redis",
  "Elasticsearch", "Microservices", "DevOps", "CI/CD", "Terraform", "Azure", "GCP",
  "Figma", "Sketch", "Prototyping", "User Research", "Adobe Creative Suite"
];

export const EmployeeProfileManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      location: '',
      employeeId: '',
      experience: '',
      salary: '',
      status: '',
      skills: []
    }
  });

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const onSubmit = (data: any) => {
    console.log('Employee data:', data);
    toast({
      title: "Employee Added Successfully",
      description: `${data.name} has been added to the system with ${data.skills.length} skills.`,
    });
    setIsAddModalOpen(false);
    form.reset();
  };

  const addSkill = (skill: string) => {
    const currentSkills = form.getValues('skills') || [];
    if (skill && !currentSkills.includes(skill)) {
      form.setValue('skills', [...currentSkills, skill]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue('skills', currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setIsDetailModalOpen(true);
  };

  const handleEditEmployee = (employee: any) => {
    setEditingEmployee(employee);
    form.reset({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      location: employee.location,
      employeeId: employee.employeeId,
      experience: employee.experience,
      salary: employee.salary,
      skills: employee.skills || []
    });
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white border border-deep-blue/20">
        <CardHeader>
          <CardTitle className="text-deep-blue">Employee Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate" />
              <Input
                placeholder="Search employees by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-soft-silver/40 focus:border-teal"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full md:w-48 border-soft-silver/40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-deep-blue hover:bg-deep-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-deep-blue">
                    {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter full name" className="border-soft-silver/40" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Department *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-soft-silver/40">
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="QA">Quality Assurance</SelectItem>
                                <SelectItem value="DevOps">DevOps</SelectItem>
                                <SelectItem value="Product">Product Management</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Role *</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., Senior Developer" className="border-soft-silver/40" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Experience Level *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-soft-silver/40">
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="0-1 years">0-1 years</SelectItem>
                                <SelectItem value="1-3 years">1-3 years</SelectItem>
                                <SelectItem value="3-5 years">3-5 years</SelectItem>
                                <SelectItem value="5-8 years">5-8 years</SelectItem>
                                <SelectItem value="8+ years">8+ years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Location *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-soft-silver/40">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Remote">Remote</SelectItem>
                                <SelectItem value="New York">New York</SelectItem>
                                <SelectItem value="San Francisco">San Francisco</SelectItem>
                                <SelectItem value="Austin">Austin</SelectItem>
                                <SelectItem value="Seattle">Seattle</SelectItem>
                                <SelectItem value="Chicago">Chicago</SelectItem>
                                <SelectItem value="Bangalore">Bangalore</SelectItem>
                                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Status *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-soft-silver/40">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="On Leave">On Leave</SelectItem>
                                <SelectItem value="Terminated">Terminated</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="employeeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Employee ID</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Auto-generated if empty" className="border-soft-silver/40" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="employee@company.com" className="border-soft-silver/40" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Phone</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="+1 (555) 123-4567" className="border-soft-silver/40" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-deep-blue">Annual Salary</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g., $120,000" className="border-soft-silver/40" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-3">
                      <Label className="text-deep-blue font-medium">Skills *</Label>
                      <div className="space-y-2">
                        <Select onValueChange={addSkill}>
                          <SelectTrigger className="border-soft-silver/40">
                            <SelectValue placeholder="Select skills" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-soft-silver/30 z-50">
                            {availableSkills.filter(skill => !(form.getValues('skills') || []).includes(skill)).map((skill) => (
                              <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
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
                            className="border-soft-silver/40"
                          />
                          <Button 
                            type="button" 
                            onClick={() => addSkill(skillInput)}
                            variant="outline"
                            size="sm"
                            className="border-soft-silver text-deep-blue hover:bg-light-bg"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                      
                      {(form.watch('skills') || []).length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                          {(form.watch('skills') || []).map((skill) => (
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
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => {
                        setIsAddModalOpen(false);
                        setEditingEmployee(null);
                        form.reset();
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-deep-blue hover:bg-deep-blue/90">
                        {editingEmployee ? 'Update Employee' : 'Add Employee'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Employee List */}
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="border border-soft-silver/30 hover:border-teal/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-deep-blue/10 rounded-lg">
                        <User className="h-6 w-6 text-deep-blue" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-deep-blue text-lg">{employee.name}</h3>
                          <Badge className="bg-teal text-white">{employee.employeeId}</Badge>
                          <Badge className="bg-light-bg text-deep-blue border border-soft-silver/30">
                            {employee.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{employee.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{employee.department} - {employee.position}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{employee.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate">
                          <Calendar className="h-4 w-4" />
                          <span>Joined: {employee.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewEmployee(employee)}
                        className="border-deep-blue text-deep-blue hover:bg-deep-blue/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditEmployee(employee)}
                        className="border-deep-blue text-deep-blue hover:bg-deep-blue/10"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-deep-blue">Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-deep-blue">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><strong>Full Name:</strong> {selectedEmployee.name}</div>
                    <div><strong>Employee ID:</strong> {selectedEmployee.employeeId}</div>
                    <div><strong>Email:</strong> {selectedEmployee.email}</div>
                    <div><strong>Phone:</strong> {selectedEmployee.phone}</div>
                    <div><strong>Join Date:</strong> {selectedEmployee.joinDate}</div>
                    <div><strong>Status:</strong> <Badge className="bg-teal text-white">{selectedEmployee.status}</Badge></div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-deep-blue">Professional Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div><strong>Department:</strong> {selectedEmployee.department}</div>
                    <div><strong>Position:</strong> {selectedEmployee.position}</div>
                    <div><strong>Location:</strong> {selectedEmployee.location}</div>
                    <div><strong>Experience:</strong> {selectedEmployee.experience}</div>
                    <div><strong>Salary:</strong> {selectedEmployee.salary}</div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-deep-blue">Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills?.map((skill, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 border-deep-blue text-deep-blue">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

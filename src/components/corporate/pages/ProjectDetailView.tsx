import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, Users, Target, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Mock project data - in real app this would come from API
const projectDetails: Record<string, {
  id: string;
  name: string;
  client: string;
  status: string;
  priority: string;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  description: string;
  projectManager: string;
  teamLead: string;
  resources: Array<{ name: string; role: string; allocation: string; }>;
  milestones: Array<{ name: string; date: string; status: string; }>;
  technologies: string[];
  deliverables: Array<{ name: string; status: string; dueDate: string; }>;
}> = {
  "1": {
    id: "1",
    name: "Project Alpha",
    client: "TechCorp Industries",
    status: "In Progress",
    priority: "High",
    progress: 92,
    budget: 450000,
    spent: 414000,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    description: "Complete development and deployment of Project Alpha with enhanced user experience, mobile responsiveness, and performance optimization.",
    projectManager: "Sarah Johnson",
    teamLead: "Michael Chen",
    resources: [
      { name: "Alex Rodriguez", role: "Frontend Developer", allocation: "100%" },
      { name: "Emily Davis", role: "Backend Developer", allocation: "80%" },
      { name: "James Wilson", role: "UI/UX Designer", allocation: "60%" },
      { name: "Lisa Brown", role: "QA Engineer", allocation: "50%" }
    ],
    milestones: [
      { name: "Requirements Analysis", date: "2024-02-01", status: "Completed" },
      { name: "Design Phase", date: "2024-03-15", status: "Completed" },
      { name: "Development Phase 1", date: "2024-05-01", status: "Completed" },
      { name: "Development Phase 2", date: "2024-06-15", status: "In Progress" },
      { name: "Testing & QA", date: "2024-07-01", status: "Pending" },
      { name: "Deployment", date: "2024-07-30", status: "Pending" }
    ],
    technologies: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"],
    deliverables: [
      { name: "Frontend Application", status: "In Progress", dueDate: "2024-06-30" },
      { name: "Backend API", status: "Completed", dueDate: "2024-06-15" },
      { name: "Database Design", status: "Completed", dueDate: "2024-03-30" },
      { name: "Documentation", status: "In Progress", dueDate: "2024-07-15" }
    ]
  },
  "2": {
    id: "2",
    name: "Beta Platform",
    client: "InnovateCorp",
    status: "In Progress",
    priority: "Medium",
    progress: 78,
    budget: 280000,
    spent: 218400,
    startDate: "2024-01-01",
    endDate: "2024-05-15",
    description: "Development of Beta Platform with advanced analytics and user management features.",
    projectManager: "Mike Chen",
    teamLead: "Sarah Wilson",
    resources: [
      { name: "John Smith", role: "Full Stack Developer", allocation: "100%" },
      { name: "Emma Johnson", role: "UI/UX Designer", allocation: "75%" },
      { name: "Robert Lee", role: "DevOps Engineer", allocation: "50%" }
    ],
    milestones: [
      { name: "Project Kickoff", date: "2024-01-15", status: "Completed" },
      { name: "MVP Development", date: "2024-03-01", status: "Completed" },
      { name: "Beta Testing", date: "2024-04-15", status: "In Progress" },
      { name: "Production Release", date: "2024-05-15", status: "Pending" }
    ],
    technologies: ["Vue.js", "Python", "PostgreSQL", "Docker"],
    deliverables: [
      { name: "Web Application", status: "In Progress", dueDate: "2024-05-01" },
      { name: "API Documentation", status: "Completed", dueDate: "2024-04-01" },
      { name: "Testing Suite", status: "In Progress", dueDate: "2024-04-30" }
    ]
  },
  "3": {
    id: "3",
    name: "Customer Portal",
    client: "GlobalTech",
    status: "In Progress",
    priority: "High",
    progress: 95,
    budget: 150000,
    spent: 142500,
    startDate: "2024-02-01",
    endDate: "2024-07-20",
    description: "Customer portal development with self-service capabilities and advanced reporting features.",
    projectManager: "Alex Rodriguez",
    teamLead: "Jennifer Martinez",
    resources: [
      { name: "David Chen", role: "Frontend Developer", allocation: "100%" },
      { name: "Maria Garcia", role: "Backend Developer", allocation: "80%" },
      { name: "Tom Wilson", role: "QA Engineer", allocation: "60%" }
    ],
    milestones: [
      { name: "Requirements Gathering", date: "2024-02-15", status: "Completed" },
      { name: "UI/UX Design", date: "2024-03-01", status: "Completed" },
      { name: "Development Phase", date: "2024-05-15", status: "Completed" },
      { name: "Testing Phase", date: "2024-06-30", status: "In Progress" },
      { name: "Deployment", date: "2024-07-20", status: "Pending" }
    ],
    technologies: ["React", "Express.js", "MySQL", "Redis"],
    deliverables: [
      { name: "Customer Dashboard", status: "Completed", dueDate: "2024-06-15" },
      { name: "Reporting Module", status: "In Progress", dueDate: "2024-07-01" },
      { name: "User Documentation", status: "In Progress", dueDate: "2024-07-15" }
    ]
  },
  "4": {
    id: "4",
    name: "Data Migration",
    client: "MegaCorp",
    status: "Planning",
    priority: "Low",
    progress: 45,
    budget: 320000,
    spent: 144000,
    startDate: "2024-03-01",
    endDate: "2024-08-15",
    description: "Large-scale data migration project with legacy system integration and data validation.",
    projectManager: "Emily Davis",
    teamLead: "Robert Johnson",
    resources: [
      { name: "Michael Brown", role: "Data Engineer", allocation: "100%" },
      { name: "Sarah Lee", role: "Database Admin", allocation: "80%" },
      { name: "Kevin Davis", role: "QA Engineer", allocation: "40%" }
    ],
    milestones: [
      { name: "Data Assessment", date: "2024-03-15", status: "Completed" },
      { name: "Migration Strategy", date: "2024-04-01", status: "In Progress" },
      { name: "Pilot Migration", date: "2024-06-01", status: "Pending" },
      { name: "Full Migration", date: "2024-07-15", status: "Pending" },
      { name: "Validation & Testing", date: "2024-08-01", status: "Pending" }
    ],
    technologies: ["Python", "Apache Spark", "PostgreSQL", "MongoDB"],
    deliverables: [
      { name: "Migration Scripts", status: "In Progress", dueDate: "2024-05-30" },
      { name: "Data Validation Tools", status: "Pending", dueDate: "2024-06-15" },
      { name: "Migration Documentation", status: "Pending", dueDate: "2024-07-30" }
    ]
  },
  "5": {
    id: "5",
    name: "E-commerce Platform",
    client: "RetailTech",
    status: "In Progress",
    priority: "Medium",
    progress: 85,
    budget: 200000,
    spent: 170000,
    startDate: "2024-01-10",
    endDate: "2024-03-30",
    description: "Modern e-commerce platform with payment integration and inventory management.",
    projectManager: "John Smith",
    teamLead: "Lisa Anderson",
    resources: [
      { name: "Daniel Rodriguez", role: "Full Stack Developer", allocation: "100%" },
      { name: "Amy Chen", role: "UI/UX Designer", allocation: "75%" },
      { name: "James Miller", role: "DevOps Engineer", allocation: "50%" }
    ],
    milestones: [
      { name: "Requirements Analysis", date: "2024-01-20", status: "Completed" },
      { name: "Design & Prototyping", date: "2024-02-05", status: "Completed" },
      { name: "Core Development", date: "2024-03-01", status: "Completed" },
      { name: "Payment Integration", date: "2024-03-15", status: "In Progress" },
      { name: "Testing & Launch", date: "2024-03-30", status: "Pending" }
    ],
    technologies: ["Next.js", "Node.js", "Stripe", "MongoDB"],
    deliverables: [
      { name: "E-commerce Frontend", status: "Completed", dueDate: "2024-03-01" },
      { name: "Payment Gateway", status: "In Progress", dueDate: "2024-03-20" },
      { name: "Admin Panel", status: "Completed", dueDate: "2024-03-10" }
    ]
  }
};

export const ProjectDetailView = () => {
  const navigate = useNavigate();
  const { projectId, projectName } = useParams();
  
  // Find project by ID or name
  let project = undefined;
  if (projectId) {
    project = projectDetails[projectId];
  } else if (projectName) {
    // Find project by name
    project = Object.values(projectDetails).find(p => 
      p.name.toLowerCase().replace(/\s+/g, '-') === projectName.toLowerCase()
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-light-bg p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4 text-deep-blue">Project Not Found</h1>
          <Button onClick={() => navigate('/active-projects')} className="bg-deep-blue text-white">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-teal text-white';
      case 'in progress': return 'bg-deep-blue text-white';
      case 'pending': return 'bg-slate text-white';
      default: return 'bg-charcoal text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-amber-500 text-white';
      case 'low': return 'bg-teal text-white';
      default: return 'bg-slate text-white';
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-deep-blue to-teal rounded-2xl shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue mb-2">{project.name}</h1>
              <p className="text-slate">Comprehensive project overview and management</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/active-projects')}
            className="border-slate text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="text-deep-blue">Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-teal" />
                    <div>
                      <p className="text-sm font-medium text-deep-blue">Client</p>
                      <p className="text-sm text-slate">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-teal" />
                    <div>
                      <p className="text-sm font-medium text-deep-blue">Duration</p>
                      <p className="text-sm text-slate">
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-deep-blue mb-2">Description</h4>
                  <p className="text-sm text-slate">{project.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-deep-blue mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} className="bg-teal/10 text-teal border-teal/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Resources */}
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="text-deep-blue">Team Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-teal" />
                        <div>
                          <p className="font-medium text-deep-blue">{resource.name}</p>
                          <p className="text-sm text-slate">{resource.role}</p>
                        </div>
                      </div>
                      <Badge className="bg-deep-blue/10 text-deep-blue border-deep-blue/20">
                        {resource.allocation}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="text-deep-blue">Project Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
                      <div className="flex items-center space-x-3">
                        {milestone.status === 'Completed' ? (
                          <CheckCircle className="h-5 w-5 text-teal" />
                        ) : milestone.status === 'In Progress' ? (
                          <AlertCircle className="h-5 w-5 text-deep-blue" />
                        ) : (
                          <Calendar className="h-5 w-5 text-slate" />
                        )}
                        <div>
                          <p className="font-medium text-deep-blue">{milestone.name}</p>
                          <p className="text-sm text-slate">{new Date(milestone.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="text-deep-blue">Project Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate">Progress</span>
                    <span className="text-sm font-medium text-deep-blue">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="mb-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate">Status:</span>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate">Priority:</span>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate">PM:</span>
                      <span className="text-sm font-medium text-deep-blue">{project.projectManager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate">Tech Lead:</span>
                      <span className="text-sm font-medium text-deep-blue">{project.teamLead}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget Information */}
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="text-deep-blue">Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-teal" />
                    <span className="text-sm text-slate">Total Budget</span>
                  </div>
                  <span className="text-lg font-bold text-deep-blue">${project.budget.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate">Spent</span>
                  <span className="text-lg font-bold text-charcoal">${project.spent.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate">Remaining</span>
                  <span className="text-lg font-bold text-teal">${(project.budget - project.spent).toLocaleString()}</span>
                </div>
                <Progress value={(project.spent / project.budget) * 100} className="mt-2" />
                <p className="text-xs text-slate text-center">
                  {((project.spent / project.budget) * 100).toFixed(1)}% of budget utilized
                </p>
              </CardContent>
            </Card>

            {/* Deliverables */}
            <Card className="bg-white rounded-2xl shadow-lg border border-deep-blue/20">
              <CardHeader>
                <CardTitle className="text-deep-blue">Deliverables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-light-bg rounded">
                      <div>
                        <p className="text-sm font-medium text-deep-blue">{deliverable.name}</p>
                        <p className="text-xs text-slate">Due: {new Date(deliverable.dueDate).toLocaleDateString()}</p>
                      </div>
                      <Badge className={getStatusColor(deliverable.status)} variant="outline">
                        {deliverable.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

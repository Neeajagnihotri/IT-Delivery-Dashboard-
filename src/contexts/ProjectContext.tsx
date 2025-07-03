
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  priority: string;
  progress: number;
  budget: number;
  spent: number;
  remaining: number;
  startDate: string;
  endDate: string;
  description: string;
  projectManager: string;
  teamLead: string;
  technologies: string[];
  resources: Array<{ name: string; role: string; allocation: string; }>;
  milestones: Array<{ name: string; date: string; status: string; }>;
  deliverables: Array<{ name: string; status: string; dueDate: string; }>;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  getProject: (id: string) => Project | undefined;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

const initialProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    client: "RetailTech",
    status: "In Progress",
    priority: "Medium",
    progress: 85,
    budget: 200000,
    spent: 170000,
    remaining: 30000,
    startDate: "2024-01-10",
    endDate: "2024-03-30",
    description: "Modern e-commerce platform with payment integration and inventory management.",
    projectManager: "John Smith",
    teamLead: "Lisa Anderson",
    technologies: ["Next.js", "Node.js", "Stripe", "MongoDB"],
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
    deliverables: [
      { name: "E-commerce Frontend", status: "Completed", dueDate: "2024-03-01" },
      { name: "Payment Gateway", status: "In Progress", dueDate: "2024-03-20" },
      { name: "Admin Panel", status: "Completed", dueDate: "2024-03-10" }
    ]
  }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const { toast } = useToast();

  const addProject = useCallback((projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    
    setProjects(prev => [...prev, newProject]);
    
    toast({
      title: "Project Created",
      description: `${projectData.name} has been successfully added.`,
      variant: "success",
    });
  }, [toast]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
    
    toast({
      title: "Project Updated",
      description: "Project details have been successfully updated.",
      variant: "success",
    });
  }, [toast]);

  const getProject = useCallback((id: string) => {
    return projects.find(project => project.id === id);
  }, [projects]);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    
    toast({
      title: "Project Deleted",
      description: "Project has been successfully removed.",
      variant: "success",
    });
  }, [toast]);

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      getProject,
      deleteProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

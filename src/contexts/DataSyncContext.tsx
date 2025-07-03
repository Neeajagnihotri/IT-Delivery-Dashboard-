
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthContext';

// Types for our data structures
export interface Project {
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
  technologies: string[];
  resources: Array<{ name: string; role: string; allocation: string; }>;
  milestones: Array<{ name: string; date: string; status: string; }>;
  deliverables: Array<{ name: string; status: string; dueDate: string; }>;
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  status: string;
  allocation: string;
  skills: string[];
  projectId?: string;
}

export interface KPIData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalResources: number;
  billableResources: number;
  benchedResources: number;
  resourceUtilization: number;
  averageHealthScore: number;
  financialHealth: number;
}

interface DataSyncContextType {
  projects: Project[];
  resources: Resource[];
  kpiData: KPIData;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (projectId: string) => void;
  updateResource: (resourceId: string, updates: Partial<Resource>) => void;
  addResource: (resource: Omit<Resource, 'id'>) => void;
  deleteResource: (resourceId: string) => void;
  refreshData: () => void;
  getProjectById: (id: string) => Project | undefined;
  getResourceById: (id: string) => Resource | undefined;
}

const DataSyncContext = createContext<DataSyncContextType | undefined>(undefined);

// Mock initial data
const initialProjects: Project[] = [
  {
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
    description: "Complete development and deployment of Project Alpha with enhanced user experience.",
    projectManager: "Sarah Johnson",
    teamLead: "Michael Chen",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"],
    resources: [
      { name: "Alex Rodriguez", role: "Frontend Developer", allocation: "100%" },
      { name: "Emily Davis", role: "Backend Developer", allocation: "80%" }
    ],
    milestones: [
      { name: "Requirements Analysis", date: "2024-02-01", status: "Completed" },
      { name: "Development Phase 2", date: "2024-06-15", status: "In Progress" }
    ],
    deliverables: [
      { name: "Frontend Application", status: "In Progress", dueDate: "2024-06-30" },
      { name: "Backend API", status: "Completed", dueDate: "2024-06-15" }
    ]
  }
];

const initialResources: Resource[] = [
  {
    id: "1",
    name: "Alex Rodriguez",
    role: "Frontend Developer",
    status: "Billable",
    allocation: "100%",
    skills: ["React", "TypeScript", "CSS"],
    projectId: "1"
  },
  {
    id: "2",
    name: "Emily Davis",
    role: "Backend Developer",
    status: "Billable",
    allocation: "80%",
    skills: ["Node.js", "MongoDB", "AWS"],
    projectId: "1"
  }
];

export const DataSyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [kpiData, setKpiData] = useState<KPIData>({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalResources: 0,
    billableResources: 0,
    benchedResources: 0,
    resourceUtilization: 0,
    averageHealthScore: 0,
    financialHealth: 0
  });

  const { toast } = useToast();
  const { user } = useAuth();

  // Role-based data filtering
  const getFilteredResources = useCallback(() => {
    if (!user) return [];
    
    // HR and Leadership can see all resource data
    if (user.role === 'hr' || user.role === 'leadership') {
      return resources;
    }
    
    // Resource managers see resources but not sensitive data
    if (user.role === 'resource_manager') {
      return resources.map(resource => ({
        ...resource,
        // Note: For future expansion, sensitive fields would be filtered here
      }));
    }
    
    return resources;
  }, [resources, user]);

  const getFilteredProjects = useCallback(() => {
    if (!user) return [];
    
    // All authenticated users can see basic project data
    // but financial details might be restricted
    if (user.role === 'leadership' || user.role === 'hr' || user.role === 'resource_manager') {
      return projects;
    }
    
    return projects.map(project => ({
      ...project,
      // Remove financial data for non-authorized roles
      budget: user.role === 'leadership' || user.role === 'hr' ? project.budget : 0,
      spent: user.role === 'leadership' || user.role === 'hr' ? project.spent : 0,
    }));
  }, [projects, user]);

  // Calculate KPIs based on current data
  const calculateKPIs = useCallback((projectsData: Project[], resourcesData: Resource[]) => {
    const totalProjects = projectsData.length;
    const activeProjects = projectsData.filter(p => p.status === 'In Progress').length;
    const completedProjects = projectsData.filter(p => p.status === 'Completed').length;
    const totalResources = resourcesData.length;
    const billableResources = resourcesData.filter(r => r.status === 'Billable').length;
    const benchedResources = resourcesData.filter(r => r.status === 'Benched').length;
    const resourceUtilization = totalResources > 0 ? (billableResources / totalResources) * 100 : 0;
    
    // Calculate average health score based on project progress
    const avgProgress = projectsData.length > 0 
      ? projectsData.reduce((sum, p) => sum + p.progress, 0) / projectsData.length 
      : 0;
    
    // Calculate financial health based on budget vs spent
    const totalBudget = projectsData.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projectsData.reduce((sum, p) => sum + p.spent, 0);
    const financialHealth = totalBudget > 0 ? ((totalBudget - totalSpent) / totalBudget) * 100 : 100;

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalResources,
      billableResources,
      benchedResources,
      resourceUtilization,
      averageHealthScore: avgProgress,
      financialHealth
    };
  }, []);

  // Update KPIs whenever projects or resources change
  useEffect(() => {
    const newKpiData = calculateKPIs(projects, resources);
    setKpiData(newKpiData);
  }, [projects, resources, calculateKPIs]);

  const updateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    // Check if user has permission to edit projects
    if (!user || (user.role !== 'resource_manager' && user.role !== 'hr')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to edit projects.",
        variant: "destructive",
      });
      return;
    }

    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ));
    
    toast({
      title: "Project Updated",
      description: "Changes have been synchronized across all dashboard views.",
    });
  }, [toast, user]);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    // Check if user has permission to add projects
    if (!user || (user.role !== 'resource_manager' && user.role !== 'hr')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to add projects.",
        variant: "destructive",
      });
      return;
    }

    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    
    setProjects(prev => [...prev, newProject]);
    
    toast({
      title: "Project Added",
      description: "New project has been synchronized across all dashboard views.",
    });
  }, [toast, user]);

  const deleteProject = useCallback((projectId: string) => {
    // Only resource managers and HR can delete projects
    if (!user || (user.role !== 'resource_manager' && user.role !== 'hr')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to delete projects.",
        variant: "destructive",
      });
      return;
    }

    setProjects(prev => prev.filter(project => project.id !== projectId));
    
    // Also update resources that were assigned to this project
    setResources(prev => prev.map(resource => 
      resource.projectId === projectId 
        ? { ...resource, projectId: undefined, status: 'Benched' }
        : resource
    ));
    
    toast({
      title: "Project Deleted",
      description: "Project and resource allocations have been updated across all views.",
    });
  }, [toast, user]);

  const updateResource = useCallback((resourceId: string, updates: Partial<Resource>) => {
    // Check permissions based on user role
    if (!user) {
      toast({
        title: "Access Denied",
        description: "You must be logged in to make changes.",
        variant: "destructive",
      });
      return;
    }

    // HR can edit everything, resource managers can edit basic data
    const canEdit = user.role === 'hr' || user.role === 'resource_manager';

    if (!canEdit) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to edit this resource information.",
        variant: "destructive",
      });
      return;
    }

    setResources(prev => prev.map(resource => 
      resource.id === resourceId ? { ...resource, ...updates } : resource
    ));
    
    toast({
      title: "Resource Updated",
      description: "Changes have been synchronized across all dashboard views.",
    });
  }, [toast, user]);

  const addResource = useCallback((resource: Omit<Resource, 'id'>) => {
    // HR and resource managers can add resources
    if (!user || (user.role !== 'hr' && user.role !== 'resource_manager')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to add resources.",
        variant: "destructive",
      });
      return;
    }

    const newResource: Resource = {
      ...resource,
      id: Date.now().toString()
    };
    
    setResources(prev => [...prev, newResource]);
    
    toast({
      title: "Resource Added",
      description: "New resource has been synchronized across all dashboard views.",
    });
  }, [toast, user]);

  const deleteResource = useCallback((resourceId: string) => {
    // Only HR can delete resources
    if (!user || user.role !== 'hr') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to delete resources.",
        variant: "destructive",
      });
      return;
    }

    setResources(prev => prev.filter(resource => resource.id !== resourceId));
    
    toast({
      title: "Resource Deleted",
      description: "Resource has been removed from all dashboard views.",
    });
  }, [toast, user]);

  const refreshData = useCallback(() => {
    // In a real app, this would fetch from an API
    console.log("Refreshing data...");
    toast({
      title: "Data Refreshed",
      description: "All dashboard data has been synchronized.",
    });
  }, [toast]);

  const getProjectById = useCallback((id: string) => {
    return projects.find(project => project.id === id);
  }, [projects]);

  const getResourceById = useCallback((id: string) => {
    return resources.find(resource => resource.id === id);
  }, [resources]);

  const value: DataSyncContextType = {
    projects: getFilteredProjects(),
    resources: getFilteredResources(),
    kpiData,
    updateProject,
    addProject,
    deleteProject,
    updateResource,
    addResource,
    deleteResource,
    refreshData,
    getProjectById,
    getResourceById
  };

  return (
    <DataSyncContext.Provider value={value}>
      {children}
    </DataSyncContext.Provider>
  );
};

export const useDataSync = () => {
  const context = useContext(DataSyncContext);
  if (context === undefined) {
    throw new Error('useDataSync must be used within a DataSyncProvider');
  }
  return context;
};

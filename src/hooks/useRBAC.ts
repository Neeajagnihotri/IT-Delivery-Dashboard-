
import { useAuth } from "@/components/auth/AuthContext";
import { UserRole } from "@/components/auth/AuthContext";

export interface RBACPermissions {
  // Resource Management
  canViewResources: boolean;
  canEditResources: boolean;
  canAddResources: boolean;
  canViewSalaryDetails: boolean;
  canEditSalaryDetails: boolean;
  canViewPersonalInfo: boolean;
  canEditPersonalInfo: boolean;
  
  // Project Management
  canViewProjects: boolean;
  canEditProjects: boolean;
  canAddProjects: boolean;
  canAllocateResources: boolean;
  canViewProjectMilestones: boolean;
  canEditProjectMilestones: boolean;
  
  // Dashboard Access
  canViewDashboard: boolean;
  canViewFinancialData: boolean;
  canViewAnalytics: boolean;
  canViewReports: boolean;
  
  // Administrative
  canAccessHRModule: boolean;
  canAccessSettings: boolean;
}

const rolePermissions: Record<UserRole, RBACPermissions> = {
  hr: {
    // HR has full access to personal info and salary details
    canViewResources: true,
    canEditResources: true,
    canAddResources: true,
    canViewSalaryDetails: true,
    canEditSalaryDetails: true,
    canViewPersonalInfo: true,
    canEditPersonalInfo: true,
    
    // Limited project access for HR
    canViewProjects: true,
    canEditProjects: false,
    canAddProjects: false,
    canAllocateResources: false,
    canViewProjectMilestones: true,
    canEditProjectMilestones: false,
    
    // Dashboard access
    canViewDashboard: true,
    canViewFinancialData: true,
    canViewAnalytics: true,
    canViewReports: true,
    
    // Administrative
    canAccessHRModule: true,
    canAccessSettings: true,
  },
  
  resource_manager: {
    // Resource Manager can manage resources (except sensitive data)
    canViewResources: true,
    canEditResources: true,
    canAddResources: true,
    canViewSalaryDetails: false,
    canEditSalaryDetails: false,
    canViewPersonalInfo: true,
    canEditPersonalInfo: false, // Only basic info, not sensitive personal details
    
    // Full project management capabilities
    canViewProjects: true,
    canEditProjects: true,
    canAddProjects: true,
    canAllocateResources: true,
    canViewProjectMilestones: true,
    canEditProjectMilestones: true,
    
    // Dashboard access
    canViewDashboard: true,
    canViewFinancialData: false,
    canViewAnalytics: true,
    canViewReports: true,
    
    // Administrative
    canAccessHRModule: false,
    canAccessSettings: false,
  },
  
  leadership: {
    // Leadership has view-only access to everything
    canViewResources: true,
    canEditResources: false,
    canAddResources: false,
    canViewSalaryDetails: true, // Leadership can see salary for strategic planning
    canEditSalaryDetails: false,
    canViewPersonalInfo: true,
    canEditPersonalInfo: false,
    
    // View-only project access
    canViewProjects: true,
    canEditProjects: false,
    canAddProjects: false,
    canAllocateResources: false,
    canViewProjectMilestones: true,
    canEditProjectMilestones: false,
    
    // Full dashboard access (view-only)
    canViewDashboard: true,
    canViewFinancialData: true,
    canViewAnalytics: true,
    canViewReports: true,
    
    // Administrative (view-only)
    canAccessHRModule: false,
    canAccessSettings: false,
  },
};

export const useRBAC = () => {
  const { user } = useAuth();
  
  const permissions = user ? rolePermissions[user.role] : {
    canViewResources: false,
    canEditResources: false,
    canAddResources: false,
    canViewSalaryDetails: false,
    canEditSalaryDetails: false,
    canViewPersonalInfo: false,
    canEditPersonalInfo: false,
    canViewProjects: false,
    canEditProjects: false,
    canAddProjects: false,
    canAllocateResources: false,
    canViewProjectMilestones: false,
    canEditProjectMilestones: false,
    canViewDashboard: false,
    canViewFinancialData: false,
    canViewAnalytics: false,
    canViewReports: false,
    canAccessHRModule: false,
    canAccessSettings: false,
  };

  const hasPermission = (permission: keyof RBACPermissions): boolean => {
    return permissions[permission];
  };

  const hasAnyPermission = (permissionsList: (keyof RBACPermissions)[]): boolean => {
    return permissionsList.some(permission => permissions[permission]);
  };

  const hasAllPermissions = (permissionsList: (keyof RBACPermissions)[]): boolean => {
    return permissionsList.every(permission => permissions[permission]);
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userRole: user?.role,
    isAuthenticated: !!user,
  };
};

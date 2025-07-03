
import React from 'react';
import { useRBAC, RBACPermissions } from '@/hooks/useRBAC';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

interface PermissionGateProps {
  children: React.ReactNode;
  requiredPermission?: keyof RBACPermissions;
  requiredPermissions?: (keyof RBACPermissions)[];
  requireAll?: boolean; // If true, requires all permissions, otherwise any
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  requiredPermission,
  requiredPermissions = [],
  requireAll = false,
  fallback,
  showFallback = true,
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useRBAC();

  let hasAccess = false;

  if (requiredPermission) {
    hasAccess = hasPermission(requiredPermission);
  } else if (requiredPermissions.length > 0) {
    hasAccess = requireAll 
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions);
  } else {
    hasAccess = true; // No requirements means public access
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    if (showFallback) {
      return (
        <div className="flex items-center justify-center min-h-[200px] p-6">
          <Alert className="max-w-md border-red-200 bg-red-50">
            <ShieldX className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              You don't have permission to access this content. Please contact your administrator if you believe this is an error.
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    
    return null;
  }

  return <>{children}</>;
};

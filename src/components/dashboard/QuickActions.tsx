
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, FolderPlus, Users } from "lucide-react";

interface QuickActionsProps {
  onAddResource: () => void;
  onAddProject: () => void;
  onProjectAllocation: () => void;
}

export const QuickActions = ({ onAddResource, onAddProject, onProjectAllocation }: QuickActionsProps) => {
  return (
    <Card className="mb-8 bg-white rounded-2xl shadow-lg border border-deep-blue/20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-deep-blue">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={onAddResource}
            className="h-16 bg-gradient-to-r from-deep-blue to-teal text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
            size="lg"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Resource
          </Button>
          <Button 
            onClick={onAddProject}
            className="h-16 bg-gradient-to-r from-teal to-deep-blue text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
            size="lg"
          >
            <FolderPlus className="h-5 w-5 mr-2" />
            Add Project
          </Button>
          <Button 
            onClick={onProjectAllocation}
            className="h-16 bg-gradient-to-r from-charcoal to-slate text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
            size="lg"
          >
            <Users className="h-5 w-5 mr-2" />
            Project Allocation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

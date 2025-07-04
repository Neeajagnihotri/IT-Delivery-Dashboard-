import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FolderOpen, Users, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useDataSync } from "@/contexts/DataSyncContext";
import { useNavigate } from "react-router-dom";
import { useRBAC } from "@/hooks/useRBAC";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return "bg-teal hover:bg-teal/90 text-white";
    case "planning":
      return "bg-deep-blue hover:bg-deep-blue/90 text-white";
    case "completed":
      return "bg-slate hover:bg-slate/90 text-white";
    case "pending":
      return "bg-charcoal hover:bg-charcoal/90 text-white";
    default:
      return "bg-slate hover:bg-slate/90 text-white";
  }
};

interface ProjectTableProps {
  onProjectClick?: (project: any) => void;
}

export const ProjectTable = ({ onProjectClick }: ProjectTableProps) => {
  const { projects } = useDataSync();
  const { hasPermission } = useRBAC();
  const navigate = useNavigate();

  const handleProjectClick = (project: any) => {
    if (onProjectClick) {
      onProjectClick(project);
    } else {
      // Navigate to project detail view with project ID
      navigate(`/project-detail-view/${project.id}`);
    }
  };

  const handleViewAllProjects = () => {
    navigate('/active-projects');
  };

  return (
    <Card className="modern-card bg-white border-soft-silver/30 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 border-b border-soft-silver/20">
        <CardTitle className="text-xl font-semibold flex items-center gap-3">
          <div className="p-2 bg-deep-blue rounded-xl">
            <FolderOpen className="h-6 w-6 text-white" />
          </div>
          <span className="text-deep-blue">
            Active Projects
          </span>
          <Badge variant="secondary" className="ml-auto bg-light-bg text-deep-blue border border-soft-silver/30">
            {projects.length} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {projects.slice(0, 5).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 bg-light-bg rounded-xl border border-soft-silver/40 hover:border-teal/40 cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-deep-blue text-lg">
                    {project.name}
                  </h4>
                  <p className="text-slate text-sm">
                    {project.client} • {project.projectManager || 'No PM assigned'}
                  </p>
                </div>
                <Badge className={`${getStatusColor(project.status)} border-0`}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate mb-3">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.resources.length} resources
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}
                </div>
                {hasPermission('canViewFinancialData') && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    ${project.budget.toLocaleString()}
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate">Progress</span>
                  <span className="font-semibold text-deep-blue">
                    {project.progress}%
                  </span>
                </div>
                <Progress 
                  value={project.progress} 
                  className="h-2"
                />
              </div>
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline" className="text-xs border-soft-silver text-deep-blue">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs border-soft-silver text-deep-blue">
                    +{project.technologies.length - 3} more
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full modern-button text-white font-semibold"
            onClick={handleViewAllProjects}
          >
            View All Projects
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

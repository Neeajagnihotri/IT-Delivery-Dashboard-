
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FolderOpen, Users, Calendar, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const mockProjects = [
  {
    id: 1,
    name: "E-commerce Platform Redesign",
    client: "TechCorp Inc.",
    manager: "Sarah Johnson",
    status: "Active",
    progress: 75,
    resourceCount: 8,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: "$250,000",
    skills: ["React", "Node.js", "AWS", "TypeScript"]
  },
  {
    id: 2,
    name: "Mobile Banking App",
    client: "FinanceHub",
    manager: "Michael Chen",
    status: "Active",
    progress: 45,
    resourceCount: 6,
    startDate: "2024-02-01",
    endDate: "2024-08-15",
    budget: "$180,000",
    skills: ["React Native", "Python", "PostgreSQL"]
  },
  {
    id: 3,
    name: "AI Analytics Dashboard",
    client: "DataCore",
    manager: "David Lee",
    status: "Planning",
    progress: 15,
    resourceCount: 3,
    startDate: "2024-04-01",
    endDate: "2024-10-30",
    budget: "$320,000",
    skills: ["Python", "TensorFlow", "React", "AWS"]
  },
  {
    id: 4,
    name: "IoT Management System",
    client: "SmartTech Ltd.",
    manager: "Lisa Wang",
    status: "Completed",
    progress: 100,
    resourceCount: 12,
    startDate: "2023-08-01",
    endDate: "2024-02-28",
    budget: "$450,000",
    skills: ["Java", "Microservices", "Kubernetes", "React"]
  },
  {
    id: 5,
    name: "Blockchain Wallet",
    client: "CryptoVenture",
    manager: "John Martinez",
    status: "On Hold",
    progress: 30,
    resourceCount: 4,
    startDate: "2024-01-01",
    endDate: "2024-09-30",
    budget: "$200,000",
    skills: ["Solidity", "Web3", "React", "Node.js"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-teal hover:bg-teal/90 text-white";
    case "Planning":
      return "bg-deep-blue hover:bg-deep-blue/90 text-white";
    case "Completed":
      return "bg-slate hover:bg-slate/90 text-white";
    case "On Hold":
      return "bg-charcoal hover:bg-charcoal/90 text-white";
    default:
      return "bg-slate hover:bg-slate/90 text-white";
  }
};

interface ProjectTableProps {
  onProjectClick?: (project: any) => void;
}

export const ProjectTable = ({ onProjectClick }: ProjectTableProps) => {
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
            {mockProjects.length} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {mockProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-4 bg-light-bg rounded-xl border border-soft-silver/40 hover:border-teal/40 cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => onProjectClick?.(project)}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-deep-blue text-lg">
                    {project.name}
                  </h4>
                  <p className="text-slate text-sm">
                    {project.client} • {project.manager}
                  </p>
                </div>
                <Badge className={`${getStatusColor(project.status)} border-0`}>
                  {project.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-slate mb-3">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {project.resourceCount} resources
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(project.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {project.budget}
                </div>
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
                {project.skills.slice(0, 3).map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="outline" className="text-xs border-soft-silver text-deep-blue">
                    {skill}
                  </Badge>
                ))}
                {project.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs border-soft-silver text-deep-blue">
                    +{project.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" size="sm" className="w-full modern-button text-white font-semibold">
            View All Projects
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

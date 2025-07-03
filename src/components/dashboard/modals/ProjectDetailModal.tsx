
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  FolderOpen, 
  Users, 
  Calendar, 
  DollarSign, 
  Target,
  Clock,
  TrendingUp,
  Building2,
  Mail,
  Phone,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

interface ProjectDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: any;
}

export const ProjectDetailModal = ({ open, onOpenChange, project }: ProjectDetailModalProps) => {
  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-teal text-white';
      case 'planning': return 'bg-deep-blue text-white';
      case 'completed': return 'bg-slate text-white';
      case 'on hold': return 'bg-charcoal text-white';
      default: return 'bg-slate text-white';
    }
  };

  const mockTeamMembers = [
    { id: 1, name: "Sarah Johnson", role: "Project Manager", avatar: "SJ" },
    { id: 2, name: "Mike Chen", role: "Lead Developer", avatar: "MC" },
    { id: 3, name: "Lisa Wang", role: "UI/UX Designer", avatar: "LW" },
    { id: 4, name: "David Lee", role: "Backend Developer", avatar: "DL" },
    { id: 5, name: "Anna Smith", role: "QA Engineer", avatar: "AS" }
  ];

  const mockMilestones = [
    { name: "Project Initiation", completed: true, date: "2024-01-15" },
    { name: "Requirements Gathering", completed: true, date: "2024-02-01" },
    { name: "Design Phase", completed: true, date: "2024-02-28" },
    { name: "Development Phase", completed: false, date: "2024-05-30" },
    { name: "Testing & QA", completed: false, date: "2024-06-15" },
    { name: "Deployment", completed: false, date: "2024-06-30" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-light-bg border-soft-silver/30">
        <DialogHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 p-6 rounded-t-lg border-b border-soft-silver/20">
          <DialogTitle className="text-2xl font-semibold flex items-center gap-3 text-deep-blue">
            <FolderOpen className="h-6 w-6 text-deep-blue" />
            Project Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {/* Header Section */}
          <Card className="modern-card bg-white border-soft-silver/30">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-deep-blue mb-2">
                    {project.name}
                  </h2>
                  <p className="text-lg text-slate mb-3">
                    {project.client}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      Project Manager: {project.manager}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={`${getStatusColor(project.status)} mb-2`}>
                    {project.status}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-slate">
                    <DollarSign className="h-4 w-4" />
                    {project.budget}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                  <div className="text-2xl font-bold text-deep-blue">{project.progress}%</div>
                  <div className="text-sm text-slate">Progress</div>
                </div>
                <div className="text-center p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                  <div className="text-2xl font-bold text-teal">{project.resourceCount}</div>
                  <div className="text-sm text-slate">Team Size</div>
                </div>
                <div className="text-center p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                  <div className="text-2xl font-bold text-deep-blue">4.2</div>
                  <div className="text-sm text-slate">Rating</div>
                </div>
                <div className="text-center p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                  <div className="text-2xl font-bold text-charcoal">85%</div>
                  <div className="text-sm text-slate">Efficiency</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Team Members */}
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTeamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-light-bg rounded-lg hover:bg-soft-silver/20 transition-colors"
                  >
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-deep-blue to-teal text-white font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-deep-blue">{member.name}</p>
                      <p className="text-sm text-slate">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Project Milestones */}
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <Target className="h-5 w-5" />
                  Project Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockMilestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-light-bg rounded-lg"
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      milestone.completed ? 'bg-teal' : 'bg-soft-silver'
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium ${
                        milestone.completed 
                          ? 'text-deep-blue' 
                          : 'text-slate'
                      }`}>
                        {milestone.name}
                      </p>
                      <p className="text-sm text-slate">{milestone.date}</p>
                    </div>
                    {milestone.completed && (
                      <Award className="h-4 w-4 text-teal" />
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Progress & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <TrendingUp className="h-5 w-5" />
                  Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-deep-blue">Overall Progress</span>
                    <span className="font-semibold text-deep-blue">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-deep-blue">Development</span>
                    <span className="font-semibold text-deep-blue">80%</span>
                  </div>
                  <Progress value={80} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-deep-blue">Testing</span>
                    <span className="font-semibold text-deep-blue">45%</span>
                  </div>
                  <Progress value={45} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-deep-blue">Deployment</span>
                    <span className="font-semibold text-deep-blue">10%</span>
                  </div>
                  <Progress value={10} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <Award className="h-5 w-5" />
                  Required Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {(project.skills || ['React', 'Node.js', 'AWS', 'TypeScript']).map((skill, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 border-soft-silver text-deep-blue">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                  <p className="text-sm text-slate">
                    <strong className="text-deep-blue">Note:</strong> This project requires expertise in modern web technologies 
                    and cloud infrastructure. Team members should have experience with agile methodologies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-soft-silver/30">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-soft-silver text-deep-blue hover:bg-light-bg">
              Close
            </Button>
            <Button className="bg-gradient-to-r from-deep-blue to-teal hover:from-deep-blue/90 hover:to-teal/90 text-white">
              Edit Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

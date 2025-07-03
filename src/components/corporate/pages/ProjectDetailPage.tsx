
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FolderOpen, 
  Users, 
  Calendar, 
  DollarSign, 
  Target,
  Clock,
  TrendingUp,
  Building2,
  ArrowLeft,
  Award,
  BarChart3,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

export const ProjectDetailPage = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const decodedProjectName = decodeURIComponent(projectName || '');

  const handleBackClick = () => {
    navigate('/active-projects');
  };

  // Mock project data - in real app, this would come from API
  const projectData = {
    name: decodedProjectName,
    client: "TechCorp Industries",
    manager: "Sarah Johnson",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    status: "Active",
    budget: "$450,000",
    progress: 85,
    resourceCount: 8,
    description: "Enterprise-level web application development with modern technologies and scalable architecture."
  };

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
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBackClick}
            className="mb-4 border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Active Projects
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-deep-blue rounded-xl">
              <FolderOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-deep-blue">{projectData.name}</h1>
              <p className="text-slate">Project Details & Management</p>
            </div>
          </div>
        </div>

        {/* Project Header */}
        <Card className="modern-card bg-white border-soft-silver/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-deep-blue mb-2">
                  {projectData.name}
                </h2>
                <p className="text-lg text-slate mb-3">
                  {projectData.client}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    Project Manager: {projectData.manager}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {projectData.startDate} - {projectData.endDate}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Badge className={`${getStatusColor(projectData.status)} mb-2`}>
                  {projectData.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-slate">
                  <DollarSign className="h-4 w-4" />
                  {projectData.budget}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                <div className="text-2xl font-bold text-deep-blue">{projectData.progress}%</div>
                <div className="text-sm text-slate">Progress</div>
              </div>
              <div className="text-center p-3 bg-light-bg rounded-lg border border-soft-silver/30">
                <div className="text-2xl font-bold text-teal">{projectData.resourceCount}</div>
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

        {/* Project Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-soft-silver/30 p-2 rounded-2xl shadow-lg h-16">
            <TabsTrigger 
              value="overview" 
              className="font-bold min-h-[48px] flex items-center gap-2 rounded-xl data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue"
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="font-bold min-h-[48px] flex items-center gap-2 rounded-xl data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue"
            >
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger 
              value="milestones" 
              className="font-bold min-h-[48px] flex items-center gap-2 rounded-xl data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue"
            >
              <Target className="h-4 w-4" />
              Milestones
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="font-bold min-h-[48px] flex items-center gap-2 rounded-xl data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue"
            >
              <Activity className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
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
                      <span className="font-semibold text-deep-blue">{projectData.progress}%</span>
                    </div>
                    <Progress value={projectData.progress} className="h-3" />
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
                    Project Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate mb-4">{projectData.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'AWS', 'TypeScript'].map((skill, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 border-soft-silver text-deep-blue">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="mt-8">
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTeamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-light-bg rounded-lg hover:bg-soft-silver/20 transition-colors"
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
          </TabsContent>

          <TabsContent value="milestones" className="mt-8">
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <Target className="h-5 w-5" />
                  Project Milestones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockMilestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-light-bg rounded-lg"
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
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-lg flex items-center gap-2 text-deep-blue">
                  <Activity className="h-5 w-5" />
                  Project Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate">Advanced project analytics and reporting will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

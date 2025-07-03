
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, Users, Target, TrendingUp, CheckCircle, AlertCircle, Edit } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useDataSync } from "@/contexts/DataSyncContext";
import { EditProjectModal } from "@/components/corporate/modals/EditProjectModal";

export const ProjectDetailView = () => {
  const navigate = useNavigate();
  const { projectId, projectName } = useParams();
  const { projects, getProjectById } = useDataSync();
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Find project by ID or name using DataSync context
  let project = undefined;
  if (projectId) {
    project = getProjectById(projectId);
  } else if (projectName) {
    // Find project by name
    project = projects.find(p => 
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
      case 'planning': return 'bg-slate text-white';
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
              <p className="text-slate">Real-time synchronized project overview</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowEditModal(true)}
              className="bg-teal hover:bg-teal/90 text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/active-projects')}
              className="border-slate text-deep-blue hover:bg-light-bg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </div>
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
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-deep-blue mb-2">Description</h4>
                  <p className="text-sm text-slate">{project.description || 'No description available'}</p>
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
                  {project.resources.length > 0 ? (
                    project.resources.map((resource, index) => (
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
                    ))
                  ) : (
                    <p className="text-slate text-center py-4">No resources assigned yet</p>
                  )}
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
                  {project.milestones.length > 0 ? (
                    project.milestones.map((milestone, index) => (
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
                    ))
                  ) : (
                    <p className="text-slate text-center py-4">No milestones defined yet</p>
                  )}
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
                      <span className="text-sm font-medium text-deep-blue">{project.projectManager || 'Not assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate">Tech Lead:</span>
                      <span className="text-sm font-medium text-deep-blue">{project.teamLead || 'Not assigned'}</span>
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
                  {project.budget > 0 ? ((project.spent / project.budget) * 100).toFixed(1) : 0}% of budget utilized
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
                  {project.deliverables.length > 0 ? (
                    project.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-light-bg rounded">
                        <div>
                          <p className="text-sm font-medium text-deep-blue">{deliverable.name}</p>
                          <p className="text-xs text-slate">Due: {new Date(deliverable.dueDate).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(deliverable.status)} variant="outline">
                          {deliverable.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate text-center py-4">No deliverables defined yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Project Modal */}
        <EditProjectModal 
          open={showEditModal}
          onOpenChange={setShowEditModal}
          project={project}
        />
      </div>
    </div>
  );
};

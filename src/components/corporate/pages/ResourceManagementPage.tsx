
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useProjects } from "@/contexts/ProjectContext";

const ResourceManagementPage = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-deep-blue">Resource Management</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/add-resource')}
              className="bg-teal hover:bg-teal/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
            <Button
              onClick={() => navigate('/add-project')}
              className="bg-deep-blue hover:bg-deep-blue/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white rounded-2xl shadow-lg border border-deep-blue/20 cursor-pointer hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-deep-blue">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate mb-2">Client: {project.client}</p>
                <p className="text-slate mb-2">Status: {project.status}</p>
                <p className="text-slate mb-4">Progress: {project.progress}%</p>
                <Button
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceManagementPage;

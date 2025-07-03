
import { useState, useContext, createContext } from "react";
import { KPICards } from "./KPICards";
import { AddResourceModal } from "./modals/AddResourceModal";
import { AddProjectModal } from "./modals/AddProjectModal";
import { ProjectAllocationModal } from "./modals/ProjectAllocationModal";
import { SettingsModal } from "./modals/SettingsModal";
import { KPIDetailModal } from "./modals/KPIDetailModal";
import { ResourceDetailModal } from "./modals/ResourceDetailModal";
import { ProjectDetailModal } from "./modals/ProjectDetailModal";
import { useAuth } from "@/components/auth/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wrench, AlertTriangle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Create a context for real-time updates
const DashboardContext = createContext<{
  updateResourceStatus: (resourceId: number, newStatus: string) => void;
  updateProjectAllocation: (projectId: number, resourceId: number) => void;
}>({
  updateResourceStatus: () => {},
  updateProjectAllocation: () => {},
});

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddResource, setShowAddResource] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showProjectAllocation, setShowProjectAllocation] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showKPIDetail, setShowKPIDetail] = useState(false);
  const [showResourceDetail, setShowResourceDetail] = useState(false);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<string>("");
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const canModify = user?.role === "resource_manager";

  // Real-time update functions
  const updateResourceStatus = (resourceId: number, newStatus: string) => {
    console.log(`Updating resource ${resourceId} status to ${newStatus}`);
  };

  const updateProjectAllocation = (projectId: number, resourceId: number) => {
    console.log(`Allocating resource ${resourceId} to project ${projectId}`);
  };

  const handleKPIClick = (kpiType: string) => {
    setSelectedKPI(kpiType);
    setShowKPIDetail(true);
  };

  const handleResourceClick = (resource: any) => {
    setSelectedResource(resource);
    setShowResourceDetail(true);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const handleCreateEscalation = () => {
    navigate('/create-escalation');
  };

  const handleEditEscalation = (escalationId: string) => {
    navigate(`/edit-escalation/${escalationId}`);
  };

  return (
    <DashboardContext.Provider value={{ updateResourceStatus, updateProjectAllocation }}>
      <div className="min-h-screen bg-light-bg">
        <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <KPICards onKPIClick={handleKPIClick} />

          {/* Engineering Metrics and Manage Escalations - Side by Side */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mt-6">
            <Card className="bg-white border border-deep-blue/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-deep-blue flex items-center gap-2">
                  <Wrench className="h-6 w-6" />
                  Engineering Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-light-bg rounded-xl border border-soft-silver/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate">Code Coverage</span>
                      <Badge className="bg-teal text-white text-xs">Excellent</Badge>
                    </div>
                    <div className="text-2xl font-bold text-deep-blue mb-1">91.4%</div>
                    <div className="text-xs text-slate">Based on SonarQube metrics</div>
                  </div>
                  
                  <div className="p-4 bg-light-bg rounded-xl border border-soft-silver/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate">Average PR Time</span>
                      <Badge className="bg-deep-blue text-white text-xs">Good</Badge>
                    </div>
                    <div className="text-2xl font-bold text-deep-blue mb-1">4.2h</div>
                    <div className="text-xs text-slate">Average merge time</div>
                  </div>
                  
                  <div className="p-4 bg-light-bg rounded-xl border border-soft-silver/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate">Test Coverage</span>
                      <Badge className="bg-slate text-white text-xs">87%</Badge>
                    </div>
                    <div className="text-2xl font-bold text-deep-blue mb-1">High</div>
                    <div className="text-xs text-slate">Unit & Integration tests</div>
                  </div>
                  
                  <div 
                    className="p-4 bg-light-bg rounded-xl border border-soft-silver/30 cursor-pointer hover:bg-slate/10 transition-colors"
                    onClick={() => navigate('/test-execution-rate')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate">Test Execution Rate</span>
                      <Badge className="bg-charcoal text-white text-xs">95%</Badge>
                    </div>
                    <div className="text-2xl font-bold text-deep-blue mb-1">Fast</div>
                    <div className="text-xs text-slate">Click for details</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Manage Escalations Card */}
            <Card className="bg-white border border-deep-blue/20 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold text-deep-blue flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Manage Escalations
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-deep-blue border-deep-blue">
                    3 Total
                  </Badge>
                  <Button 
                    className="bg-teal hover:bg-teal/90 text-white text-sm px-3 py-1 h-8"
                    onClick={handleCreateEscalation}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Create Escalation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-light-bg rounded-xl border border-soft-silver/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-deep-blue mb-1">
                          API Performance Issues
                        </h4>
                        <p className="text-sm text-slate mb-2">
                          Client: TechCorp Industries
                        </p>
                        <p className="text-sm text-slate">
                          Engineer: Alex Rodriguez
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-deep-blue text-white">
                          High Priority
                        </Badge>
                        <span className="text-xs text-slate">ETA 6/8/2024</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditEscalation('1')}
                          className="text-xs border-slate text-slate hover:bg-slate/10"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-light-bg rounded-xl border border-soft-silver/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-deep-blue mb-1">
                          Budget Overrun Discussion
                        </h4>
                        <p className="text-sm text-slate mb-2">
                          Client: InnovateCorp
                        </p>
                        <p className="text-sm text-slate">
                          Engineer: Sarah Johnson
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-teal text-white">
                          Medium Priority
                        </Badge>
                        <span className="text-xs text-slate">ETA 6/5/2024</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditEscalation('2')}
                          className="text-xs border-slate text-slate hover:bg-slate/10"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-light-bg rounded-xl border border-soft-silver/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-deep-blue mb-1">
                          Resource Allocation Conflict
                        </h4>
                        <p className="text-sm text-slate mb-2">
                          Client: GlobalTech
                        </p>
                        <p className="text-sm text-slate">
                          Engineer: Mike Chen
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-slate-800 text-white">
                          Critical Priority
                        </Badge>
                        <span className="text-xs text-slate">ETA 6/10/2024</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditEscalation('3')}
                          className="text-xs border-slate text-slate hover:bg-slate/10"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Modals */}
        <AddResourceModal 
          open={showAddResource} 
          onOpenChange={setShowAddResource} 
        />
        <AddProjectModal 
          open={showAddProject} 
          onOpenChange={setShowAddProject} 
        />
        <ProjectAllocationModal 
          open={showProjectAllocation} 
          onOpenChange={setShowProjectAllocation} 
        />
        <SettingsModal 
          open={showSettings} 
          onOpenChange={setShowSettings} 
        />
        <KPIDetailModal 
          open={showKPIDetail} 
          onOpenChange={setShowKPIDetail}
          kpiType={selectedKPI}
        />
        <ResourceDetailModal 
          open={showResourceDetail} 
          onOpenChange={setShowResourceDetail}
          resource={selectedResource}
        />
        <ProjectDetailModal 
          open={showProjectDetail} 
          onOpenChange={setShowProjectDetail}
          project={selectedProject}
        />
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);

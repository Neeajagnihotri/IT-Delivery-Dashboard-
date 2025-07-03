
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, FolderOpen, Target, DollarSign, TrendingUp } from "lucide-react";

interface KPIDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpiType: string;
}

export const KPIDetailModal = ({ open, onOpenChange, kpiType }: KPIDetailModalProps) => {
  const getKPIContent = () => {
    switch (kpiType) {
      case 'projects':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="modern-card bg-white border-soft-silver/30">
                <CardHeader className="pb-3 bg-light-bg">
                  <CardTitle className="text-sm text-deep-blue font-semibold">Active Projects</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-deep-blue">12</div>
                  <div className="text-xs text-slate font-medium">Currently running</div>
                </CardContent>
              </Card>
              <Card className="modern-card bg-white border-soft-silver/30">
                <CardHeader className="pb-3 bg-teal/5">
                  <CardTitle className="text-sm text-deep-blue font-semibold">Completed This Quarter</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-teal">8</div>
                  <div className="text-xs text-slate font-medium">On schedule</div>
                </CardContent>
              </Card>
              <Card className="modern-card bg-white border-soft-silver/30">
                <CardHeader className="pb-3 bg-deep-blue/5">
                  <CardTitle className="text-sm text-deep-blue font-semibold">Budget Variance</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-deep-blue">-2.3%</div>
                  <div className="text-xs text-slate font-medium">Under budget</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-deep-blue font-semibold">Project Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-light-bg rounded-lg">
                    <span className="text-sm font-medium text-deep-blue">Healthy Projects</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={67} className="w-32 h-3" />
                      <span className="text-sm font-bold text-teal">8/12</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-light-bg rounded-lg">
                    <span className="text-sm font-medium text-deep-blue">Projects Needing Attention</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={25} className="w-32 h-3" />
                      <span className="text-sm font-bold text-deep-blue">3/12</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-light-bg rounded-lg">
                    <span className="text-sm font-medium text-deep-blue">At Risk Projects</span>
                    <div className="flex items-center space-x-3">
                      <Progress value={8} className="w-32 h-3" />
                      <span className="text-sm font-bold text-charcoal">1/12</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'resources':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="modern-card bg-white border-soft-silver/30">
                <CardHeader className="pb-3 bg-light-bg">
                  <CardTitle className="text-sm text-deep-blue font-semibold">Total Resources</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-deep-blue">156</div>
                  <div className="text-xs text-slate font-medium">Active employees</div>
                </CardContent>
              </Card>
              <Card className="modern-card bg-white border-soft-silver/30">
                <CardHeader className="pb-3 bg-teal/5">
                  <CardTitle className="text-sm text-deep-blue font-semibold">Billable</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-teal">132</div>
                  <div className="text-xs text-slate font-medium">Currently assigned</div>
                </CardContent>
              </Card>
              <Card className="modern-card bg-white border-soft-silver/30">
                <CardHeader className="pb-3 bg-deep-blue/5">
                  <CardTitle className="text-sm text-deep-blue font-semibold">Benched</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-deep-blue">24</div>
                  <div className="text-xs text-slate font-medium">Available</div>
                </CardContent>
              </Card>
              <Card className="modern-card bg-white border-soft-silver/30">
                <CardHeader className="pb-3 bg-charcoal/5">
                  <CardTitle className="text-sm text-deep-blue font-semibold">Utilization Rate</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-charcoal">84.6%</div>
                  <div className="text-xs text-slate font-medium">Current period</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="modern-card bg-white border-soft-silver/30">
              <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5">
                <CardTitle className="text-deep-blue font-semibold">Department Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="h-64 p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: "Engineering", value: 85, fill: "#22356F" },
                      { name: "QA", value: 28, fill: "#008080" },
                      { name: "Design", value: 18, fill: "#23272F" },
                      { name: "Management", value: 15, fill: "#37474F" },
                      { name: "HR", value: 10, fill: "#B0BEC5" }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#B0BEC5" opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fill: '#22356F', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#22356F', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #B0BEC5',
                          borderRadius: '8px',
                          color: '#22356F'
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8 bg-white rounded-lg">
            <p className="text-slate font-medium">Select a KPI to view detailed information</p>
          </div>
        );
    }
  };

  const getModalTitle = () => {
    switch (kpiType) {
      case 'projects': return 'Project Health Details';
      case 'resources': return 'Resource Management Details';
      case 'deliverables': return 'Deliverables Analytics';
      case 'financial': return 'Financial Overview';
      default: return 'KPI Details';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-light-bg border-soft-silver/30">
        <DialogHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 p-6 rounded-t-lg border-b border-soft-silver/20">
          <DialogTitle className="flex items-center space-x-3 text-deep-blue text-xl font-bold">
            <div className="p-2 bg-deep-blue rounded-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <span>{getModalTitle()}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 p-6 bg-light-bg">
          {getKPIContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

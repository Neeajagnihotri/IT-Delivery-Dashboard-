
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Clock, User, ArrowRight, Edit, Save, X } from "lucide-react";

interface Escalation {
  id: number;
  title: string;
  project: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  assignee: string;
  created: string;
  description: string;
}

const mockEscalations: Escalation[] = [
  {
    id: 1,
    title: "API Performance Issues",
    project: "TechCorp Industries",
    priority: "High",
    assignee: "Alex Rodriguez",
    created: "6/8/2024",
    description: "API response times have increased significantly affecting user experience"
  },
  {
    id: 2,
    title: "Budget Overrun Discussion",
    project: "InnovateCorp",
    priority: "Medium",
    assignee: "Sarah Johnson",
    created: "6/5/2024",
    description: "Project budget has exceeded initial estimates, need to discuss next steps"
  },
  {
    id: 3,
    title: "Resource Allocation Conflict",
    project: "GlobalTech",
    priority: "Critical",
    assignee: "Mike Chen",
    created: "6/10/2024",
    description: "Multiple projects competing for the same key resources causing delays"
  }
];

export const EscalationManagement = () => {
  const [escalations, setEscalations] = useState<Escalation[]>(mockEscalations);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Escalation>>({});

  const getPriorityBadge = (priority: Escalation["priority"]) => {
    const variants = {
      Critical: 'bg-slate-800 text-white',
      High: 'bg-orange-500 text-white',
      Medium: 'bg-teal text-white',
      Low: 'bg-green-500 text-white'
    };
    return variants[priority];
  };

  const handleEdit = (escalation: Escalation) => {
    setEditingId(escalation.id);
    setEditForm(escalation);
  };

  const handleSave = () => {
    if (editingId && editForm) {
      setEscalations(prev => 
        prev.map(esc => 
          esc.id === editingId ? { ...esc, ...editForm } : esc
        )
      );
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const updateForm = (field: keyof Escalation, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
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
            <Button className="bg-teal hover:bg-teal/90 text-white text-sm px-3 py-1 h-8">
              + Create Escalation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {escalations.map((escalation) => (
              <div
                key={escalation.id}
                className="p-4 bg-light-bg rounded-xl border border-soft-silver/30 hover:shadow-md transition-shadow"
              >
                {editingId === escalation.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate mb-1 block">Title</label>
                        <Input
                          value={editForm.title || ''}
                          onChange={(e) => updateForm('title', e.target.value)}
                          className="border-soft-silver"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate mb-1 block">Project</label>
                        <Input
                          value={editForm.project || ''}
                          onChange={(e) => updateForm('project', e.target.value)}
                          className="border-soft-silver"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate mb-1 block">Priority</label>
                        <Select value={editForm.priority || ''} onValueChange={(value) => updateForm('priority', value)}>
                          <SelectTrigger className="border-soft-silver">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate mb-1 block">Assignee</label>
                        <Input
                          value={editForm.assignee || ''}
                          onChange={(e) => updateForm('assignee', e.target.value)}
                          className="border-soft-silver"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate mb-1 block">Description</label>
                      <Textarea
                        value={editForm.description || ''}
                        onChange={(e) => updateForm('description', e.target.value)}
                        className="border-soft-silver"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="border-soft-silver text-slate hover:bg-light-bg"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-teal hover:bg-teal/90 text-white"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-deep-blue mb-1">
                          {escalation.title}
                        </h4>
                        <p className="text-sm text-slate mb-2">
                          Client: {escalation.project}
                        </p>
                        <p className="text-sm text-slate line-clamp-2">
                          Engineer: {escalation.assignee}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getPriorityBadge(escalation.priority)}>
                          <span className="ml-1">{escalation.priority} Priority</span>
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate">ETA {escalation.created}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(escalation)}
                            className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate text-slate hover:bg-slate hover:text-white h-8 w-8 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

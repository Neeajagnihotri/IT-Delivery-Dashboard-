
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, TrendingUp, Target, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UpdateShadowProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: any;
  onUpdate: (resourceId: number, progress: number, status: string) => void;
}

export const UpdateShadowProgressModal = ({ isOpen, onClose, resource, onUpdate }: UpdateShadowProgressModalProps) => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Learning');

  useEffect(() => {
    if (resource && isOpen) {
      setProgress(resource.progress || 0);
      setStatus(resource.status || 'Learning');
    }
  }, [resource, isOpen]);

  const getStatusFromProgress = (progressValue: number) => {
    if (progressValue >= 90) return 'Completed';
    if (progressValue >= 70) return 'Transition';
    if (progressValue >= 40) return 'Learning';
    return 'Observation';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-teal text-white';
      case 'transition': return 'bg-deep-blue text-white';
      case 'learning': return 'bg-slate text-white';
      case 'observation': return 'bg-charcoal text-white';
      default: return 'bg-slate text-white';
    }
  };

  const handleProgressChange = (values: number[]) => {
    const newProgress = values[0];
    const newStatus = getStatusFromProgress(newProgress);
    setProgress(newProgress);
    setStatus(newStatus);
  };

  const handleSave = () => {
    try {
      onUpdate(resource.id, progress, status);
      toast({
        title: "Success",
        description: "Shadow resource progress updated successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'N/A';
  };

  if (!resource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-deep-blue flex items-center gap-3">
            <TrendingUp className="h-6 w-6" />
            Update Shadow Resource Progress
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resource Info */}
          <Card className="bg-light-bg border-slate/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-deep-blue to-teal text-white">
                    {getInitials(resource.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-deep-blue">{resource.name}</h3>
                  <p className="text-slate">{resource.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <User className="h-4 w-4 text-slate" />
                    <span className="text-sm text-slate">Mentor: {resource.mentor}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-slate" />
                    <span className="text-sm text-slate">Started: {new Date(resource.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue flex items-center gap-2">
                <Target className="h-5 w-5" />
                Training Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium text-deep-blue">Progress Level</Label>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-deep-blue">{progress}%</span>
                    <Badge className={getStatusColor(status)}>
                      {status}
                    </Badge>
                  </div>
                </div>
                
                <div className="px-2">
                  <Slider
                    value={[progress]}
                    onValueChange={handleProgressChange}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-xs text-slate mt-4">
                  <div className="text-center">
                    <div className="font-medium">0-39%</div>
                    <div>Observation</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">40-69%</div>
                    <div>Learning</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">70-89%</div>
                    <div>Transition</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">90-100%</div>
                    <div>Completed</div>
                  </div>
                </div>
              </div>

              {/* Progress Insights */}
              <div className="bg-light-bg p-4 rounded-lg border border-slate/30">
                <h4 className="font-medium text-deep-blue mb-2">Current Phase: {status}</h4>
                <p className="text-sm text-slate">
                  {status === 'Observation' && 'Resource is in the initial observation phase, learning the basics.'}
                  {status === 'Learning' && 'Resource is actively learning and developing skills with mentor guidance.'}
                  {status === 'Transition' && 'Resource is transitioning to independent work with minimal supervision.'}
                  {status === 'Completed' && 'Resource has successfully completed the shadow program and is ready for independent work.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate/30">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-deep-blue hover:bg-deep-blue/90 text-white">
              Update Progress
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

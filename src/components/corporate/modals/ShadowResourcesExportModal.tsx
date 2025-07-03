
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Users, Clock } from "lucide-react";

interface ShadowResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    totalResources: number;
    avgProgress: number;
    selectedPhase?: string;
  };
}

export const ShadowResourcesExportModal: React.FC<ShadowResourcesExportModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const handleDownloadPDF = () => {
    console.log('Downloading Shadow Resources PDF report...');
    // PDF generation logic would go here with a PDF library
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-deep-blue flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Shadow Resources Export Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-6 w-6 mx-auto mb-2 text-charcoal" />
                <div className="text-2xl font-bold text-deep-blue">{data.totalResources}</div>
                <div className="text-sm text-slate">Shadow Resources</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-teal" />
                <div className="text-2xl font-bold text-deep-blue">{data.avgProgress}%</div>
                <div className="text-sm text-slate">Avg Progress</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-slate" />
                <div className="text-2xl font-bold text-deep-blue">12</div>
                <div className="text-sm text-slate">Active Mentors</div>
              </CardContent>
            </Card>
          </div>
          
          {data.selectedPhase && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate">Filtered by Phase:</span>
              <Badge className="bg-deep-blue/10 text-deep-blue">{data.selectedPhase}</Badge>
            </div>
          )}
          
          <div className="bg-light-bg p-4 rounded-lg">
            <h3 className="font-semibold text-deep-blue mb-2">Report Contents:</h3>
            <ul className="text-sm text-slate space-y-1">
              <li>• Shadow resource progress tracking</li>
              <li>• Mentorship program analytics</li>
              <li>• Phase distribution breakdown</li>
              <li>• Individual performance metrics</li>
              <li>• Training completion rates</li>
            </ul>
          </div>
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-teal hover:bg-teal/90">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

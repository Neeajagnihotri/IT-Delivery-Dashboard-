
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Brain, Star, Trophy } from "lucide-react";

interface ZapmindsResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    totalResources: number;
    avgRating: string;
    selectedProject?: string;
  };
}

export const ZapmindsResourcesExportModal: React.FC<ZapmindsResourcesExportModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const handleDownloadPDF = () => {
    console.log('Downloading Zapminds Resources PDF report...');
    // PDF generation logic would go here with a PDF library
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-deep-blue flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Zapminds Initiative Export Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Brain className="h-6 w-6 mx-auto mb-2 text-teal" />
                <div className="text-2xl font-bold text-deep-blue">{data.totalResources}</div>
                <div className="text-sm text-slate">Assigned Resources</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold text-deep-blue">{data.avgRating}</div>
                <div className="text-sm text-slate">Avg Performance</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-slate" />
                <div className="text-2xl font-bold text-deep-blue">3</div>
                <div className="text-sm text-slate">Active Projects</div>
              </CardContent>
            </Card>
          </div>
          
          {data.selectedProject && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate">Filtered by Project:</span>
              <Badge className="bg-deep-blue/10 text-deep-blue">{data.selectedProject}</Badge>
            </div>
          )}
          
          <div className="bg-light-bg p-4 rounded-lg">
            <h3 className="font-semibold text-deep-blue mb-2">Report Contents:</h3>
            <ul className="text-sm text-slate space-y-1">
              <li>• Innovation project resource allocation</li>
              <li>• Performance ratings and assessments</li>
              <li>• Skills and expertise mapping</li>
              <li>• Project contribution analysis</li>
              <li>• Research and development metrics</li>
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

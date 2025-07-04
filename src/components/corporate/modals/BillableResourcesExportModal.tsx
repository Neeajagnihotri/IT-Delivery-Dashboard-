
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, DollarSign, Users, TrendingUp } from "lucide-react";
import jsPDF from 'jspdf';

interface BillableResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    totalRevenue: number;
    totalResources: number;
    avgUtilization: number;
    selectedClient?: string;
  };
}

export const BillableResourcesExportModal: React.FC<BillableResourcesExportModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const handleDownloadPDF = () => {
    console.log('Downloading Billable Resources PDF report...');
    
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Billable Resources Report', 20, 30);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Summary metrics
    doc.setFontSize(16);
    doc.text('Summary Metrics', 20, 65);
    
    doc.setFontSize(12);
    doc.text(`Total Revenue: $${data.totalRevenue.toLocaleString()}`, 20, 80);
    doc.text(`Total Resources: ${data.totalResources}`, 20, 95);
    doc.text(`Average Utilization: ${data.avgUtilization}%`, 20, 110);
    
    if (data.selectedClient) {
      doc.text(`Filter Applied: Client - ${data.selectedClient}`, 20, 125);
    }
    
    // Report contents
    doc.setFontSize(16);
    doc.text('Report Contents', 20, 145);
    
    doc.setFontSize(12);
    const contents = [
      '• Resource performance metrics',
      '• Revenue generation analysis',
      '• Utilization rates by resource',
      '• Client allocation breakdown',
      '• Monthly trends and projections'
    ];
    
    contents.forEach((item, index) => {
      doc.text(item, 20, 160 + (index * 15));
    });
    
    // Save the PDF
    doc.save('billable-resources-report.pdf');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-deep-blue flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Billable Resources Export Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-teal" />
                <div className="text-2xl font-bold text-deep-blue">${data.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-slate">Total Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-deep-blue" />
                <div className="text-2xl font-bold text-deep-blue">{data.totalResources}</div>
                <div className="text-sm text-slate">Total Resources</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-slate" />
                <div className="text-2xl font-bold text-deep-blue">{data.avgUtilization}%</div>
                <div className="text-sm text-slate">Avg Utilization</div>
              </CardContent>
            </Card>
          </div>
          
          {data.selectedClient && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate">Filtered by Client:</span>
              <Badge className="bg-deep-blue/10 text-deep-blue">{data.selectedClient}</Badge>
            </div>
          )}
          
          <div className="bg-light-bg p-4 rounded-lg">
            <h3 className="font-semibold text-deep-blue mb-2">Report Contents:</h3>
            <ul className="text-sm text-slate space-y-1">
              <li>• Resource performance metrics</li>
              <li>• Revenue generation analysis</li>
              <li>• Utilization rates by resource</li>
              <li>• Client allocation breakdown</li>
              <li>• Monthly trends and projections</li>
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

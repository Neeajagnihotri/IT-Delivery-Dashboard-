
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Building, Users, Calendar } from "lucide-react";
import jsPDF from 'jspdf';

interface InternalResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    totalResources: number;
    avgProjects: number;
    selectedDepartment?: string;
  };
}

export const InternalResourcesExportModal: React.FC<InternalResourcesExportModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const handleDownloadPDF = () => {
    console.log('Downloading Internal Resources PDF report...');
    
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Internal Resources Report', 20, 30);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Summary metrics
    doc.setFontSize(16);
    doc.text('Summary Metrics', 20, 65);
    
    doc.setFontSize(12);
    doc.text(`Total Internal Resources: ${data.totalResources}`, 20, 80);
    doc.text(`Average Projects: ${data.avgProjects}`, 20, 95);
    doc.text(`Departments: 3`, 20, 110);
    
    if (data.selectedDepartment) {
      doc.text(`Filter Applied: Department - ${data.selectedDepartment}`, 20, 125);
    }
    
    // Report contents
    doc.setFontSize(16);
    doc.text('Report Contents', 20, 145);
    
    doc.setFontSize(12);
    const contents = [
      '• Internal employee directory',
      '• Department-wise breakdown',
      '• Project involvement metrics',
      '• Role distribution analysis',
      '• Tenure and experience data'
    ];
    
    contents.forEach((item, index) => {
      doc.text(item, 20, 160 + (index * 15));
    });
    
    // Save the PDF
    doc.save('internal-resources-report.pdf');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-deep-blue flex items-center gap-2">
            <Building className="h-5 w-5" />
            Internal Resources Export Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Building className="h-6 w-6 mx-auto mb-2 text-deep-blue" />
                <div className="text-2xl font-bold text-deep-blue">{data.totalResources}</div>
                <div className="text-sm text-slate">Internal Resources</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-slate" />
                <div className="text-2xl font-bold text-deep-blue">{data.avgProjects}</div>
                <div className="text-sm text-slate">Avg Projects</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-teal" />
                <div className="text-2xl font-bold text-deep-blue">3</div>
                <div className="text-sm text-slate">Departments</div>
              </CardContent>
            </Card>
          </div>
          
          {data.selectedDepartment && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate">Filtered by Department:</span>
              <Badge className="bg-teal/10 text-teal">{data.selectedDepartment}</Badge>
            </div>
          )}
          
          <div className="bg-light-bg p-4 rounded-lg">
            <h3 className="font-semibold text-deep-blue mb-2">Report Contents:</h3>
            <ul className="text-sm text-slate space-y-1">
              <li>• Internal employee directory</li>
              <li>• Department-wise breakdown</li>
              <li>• Project involvement metrics</li>
              <li>• Role distribution analysis</li>
              <li>• Tenure and experience data</li>
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

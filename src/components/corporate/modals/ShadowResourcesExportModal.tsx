
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, X, Eye } from "lucide-react";
import jsPDF from 'jspdf';

interface ShadowResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shadowResources = [
  { id: 1, name: 'Emma Wilson', role: 'Junior Developer', mentor: 'John Smith', status: 'Learning', startDate: '2024-01-15', progress: 75 },
  { id: 2, name: 'Daniel Brown', role: 'QA Trainee', mentor: 'Mike Chen', status: 'Transition', startDate: '2024-02-01', progress: 60 },
  { id: 3, name: 'Sophie Davis', role: 'UI Designer', mentor: 'Sarah Johnson', status: 'Learning', startDate: '2024-01-20', progress: 85 },
  { id: 4, name: 'Ryan Taylor', role: 'Backend Developer', mentor: 'Alex Rodriguez', status: 'Observation', startDate: '2024-02-10', progress: 45 },
  { id: 5, name: 'Mia Garcia', role: 'DevOps Trainee', mentor: 'Jennifer Lee', status: 'Learning', startDate: '2024-01-25', progress: 70 }
];

export const ShadowResourcesExportModal: React.FC<ShadowResourcesExportModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    const pdf = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SHADOW RESOURCES REPORT', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${date}`, 20, 30);
    
    const avgProgress = Math.round(shadowResources.reduce((sum, resource) => sum + resource.progress, 0) / shadowResources.length);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SUMMARY STATISTICS', 20, 45);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Total Shadow Resources: 18', 20, 55);
    pdf.text('Active Mentors: 12', 20, 62);
    pdf.text(`Average Progress: ${avgProgress}%`, 20, 69);
    pdf.text('Average Duration: 8.5 weeks', 20, 76);
    
    let yPosition = 90;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SHADOW RESOURCES DETAILS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name', 20, yPosition);
    pdf.text('Role', 60, yPosition);
    pdf.text('Mentor', 100, yPosition);
    pdf.text('Status', 140, yPosition);
    pdf.text('Progress', 170, yPosition);
    yPosition += 7;
    
    pdf.setFont('helvetica', 'normal');
    shadowResources.forEach(resource => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(resource.name, 20, yPosition);
      pdf.text(resource.role, 60, yPosition);
      pdf.text(resource.mentor, 100, yPosition);
      pdf.text(resource.status, 140, yPosition);
      pdf.text(`${resource.progress}%`, 170, yPosition);
      yPosition += 7;
    });
    
    pdf.save(`shadow-resources-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const avgProgress = Math.round(shadowResources.reduce((sum, resource) => sum + resource.progress, 0) / shadowResources.length);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-deep-blue">
            <div className="p-2 bg-charcoal rounded-lg">
              <Eye className="h-5 w-5 text-white" />
            </div>
            Shadow Resources Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-charcoal/10">
                  <div className="text-2xl font-bold text-charcoal">18</div>
                  <div className="text-sm text-slate-600">Shadow Resources</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate/10">
                  <div className="text-2xl font-bold text-slate">12</div>
                  <div className="text-sm text-slate-600">Active Mentors</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-deep-blue/10">
                  <div className="text-2xl font-bold text-deep-blue">{avgProgress}%</div>
                  <div className="text-sm text-slate-600">Avg Progress</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-teal/10">
                  <div className="text-2xl font-bold text-teal">8.5</div>
                  <div className="text-sm text-slate-600">Avg Weeks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Shadow Resources Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-deep-blue">Resource</TableHead>
                      <TableHead className="text-deep-blue">Mentor</TableHead>
                      <TableHead className="text-deep-blue">Status</TableHead>
                      <TableHead className="text-deep-blue">Start Date</TableHead>
                      <TableHead className="text-deep-blue">Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shadowResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-deep-blue">{resource.name}</div>
                            <div className="text-sm text-slate">{resource.role}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate">{resource.mentor}</TableCell>
                        <TableCell>
                          <Badge className={`${
                            resource.status === 'Learning' ? 'bg-deep-blue/10 text-deep-blue border-deep-blue/20' :
                            resource.status === 'Transition' ? 'bg-teal/10 text-teal border-teal/20' :
                            'bg-slate/10 text-slate border-slate/20'
                          }`}>
                            {resource.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate">{new Date(resource.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-charcoal h-2 rounded-full" 
                                style={{ width: `${resource.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate">{resource.progress}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          <Button onClick={handleDownload} className="bg-teal hover:bg-teal/90 text-white">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

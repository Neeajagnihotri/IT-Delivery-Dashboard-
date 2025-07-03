
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, X, Building } from "lucide-react";
import jsPDF from 'jspdf';

interface InternalResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const internalResources = [
  { id: 1, name: 'Mark Johnson', role: 'Operations Manager', department: 'Operations', type: 'Internal', joinDate: '2020-05-15', projects: 8 },
  { id: 2, name: 'Lisa Chen', role: 'IT Support Lead', department: 'Support', type: 'Internal', joinDate: '2021-03-10', projects: 12 },
  { id: 3, name: 'Robert Williams', role: 'Admin Coordinator', department: 'Admin', type: 'Internal', joinDate: '2019-08-20', projects: 6 },
  { id: 4, name: 'Amanda Davis', role: 'Process Analyst', department: 'Operations', type: 'Internal', joinDate: '2022-01-15', projects: 4 },
  { id: 5, name: 'Kevin Martinez', role: 'System Administrator', department: 'Support', type: 'Internal', joinDate: '2020-11-30', projects: 10 }
];

export const InternalResourcesExportModal: React.FC<InternalResourcesExportModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    const pdf = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INTERNAL RESOURCES REPORT', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${date}`, 20, 30);
    
    const avgProjects = Math.round(internalResources.reduce((sum, resource) => sum + resource.projects, 0) / internalResources.length);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SUMMARY STATISTICS', 20, 45);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Total Internal Resources: 12', 20, 55);
    pdf.text('Departments: 3', 20, 62);
    pdf.text(`Average Projects: ${avgProjects}`, 20, 69);
    pdf.text('Average Tenure: 3.2 years', 20, 76);
    
    let yPosition = 90;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INTERNAL RESOURCES DETAILS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name', 20, yPosition);
    pdf.text('Role', 60, yPosition);
    pdf.text('Department', 110, yPosition);
    pdf.text('Join Date', 150, yPosition);
    pdf.text('Projects', 180, yPosition);
    yPosition += 7;
    
    pdf.setFont('helvetica', 'normal');
    internalResources.forEach(resource => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(resource.name, 20, yPosition);
      pdf.text(resource.role, 60, yPosition);
      pdf.text(resource.department, 110, yPosition);
      pdf.text(new Date(resource.joinDate).toLocaleDateString(), 150, yPosition);
      pdf.text(resource.projects.toString(), 180, yPosition);
      yPosition += 7;
    });
    
    pdf.save(`internal-resources-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const avgProjects = Math.round(internalResources.reduce((sum, resource) => sum + resource.projects, 0) / internalResources.length);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-deep-blue">
            <div className="p-2 bg-deep-blue rounded-lg">
              <Building className="h-5 w-5 text-white" />
            </div>
            Internal Resources Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-deep-blue/10">
                  <div className="text-2xl font-bold text-deep-blue">12</div>
                  <div className="text-sm text-slate-600">Internal Resources</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-teal/10">
                  <div className="text-2xl font-bold text-teal">3</div>
                  <div className="text-sm text-slate-600">Departments</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate/10">
                  <div className="text-2xl font-bold text-slate">{avgProjects}</div>
                  <div className="text-sm text-slate-600">Avg Projects</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-charcoal/10">
                  <div className="text-2xl font-bold text-charcoal">3.2</div>
                  <div className="text-sm text-slate-600">Avg Tenure (Years)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Internal Resources Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-deep-blue">Employee</TableHead>
                      <TableHead className="text-deep-blue">Department</TableHead>
                      <TableHead className="text-deep-blue">Role</TableHead>
                      <TableHead className="text-deep-blue">Join Date</TableHead>
                      <TableHead className="text-deep-blue">Projects</TableHead>
                      <TableHead className="text-deep-blue">Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {internalResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-deep-blue/10 rounded-lg">
                              <Building className="h-4 w-4 text-deep-blue" />
                            </div>
                            <div className="font-medium text-deep-blue">{resource.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-teal/10 text-teal border-teal/20">
                            {resource.department}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate">{resource.role}</TableCell>
                        <TableCell className="text-slate">{new Date(resource.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium text-deep-blue">{resource.projects}</TableCell>
                        <TableCell>
                          <Badge className="bg-deep-blue/10 text-deep-blue border-deep-blue/20">
                            {resource.type}
                          </Badge>
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

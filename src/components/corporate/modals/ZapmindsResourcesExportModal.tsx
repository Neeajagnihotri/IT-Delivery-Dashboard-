
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, X, Brain, Star } from "lucide-react";
import jsPDF from 'jspdf';

interface ZapmindsResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const zapmindsResources = [
  { 
    id: 1, 
    name: 'Dr. Sarah Thompson', 
    role: 'AI Research Lead', 
    project: 'AI Innovation Lab',
    assignment: 'Technical Leadership',
    rating: 9.5, 
    experience: '8+ years',
    skills: ['Machine Learning', 'Python', 'TensorFlow']
  },
  { 
    id: 2, 
    name: 'Michael Chen', 
    role: 'Data Scientist', 
    project: 'Data Analytics Platform',
    assignment: 'Analytics Development',
    rating: 9.2, 
    experience: '6+ years',
    skills: ['Big Data', 'SQL', 'R']
  },
  { 
    id: 3, 
    name: 'Elena Rodriguez', 
    role: 'ML Engineer', 
    project: 'AI Innovation Lab',
    assignment: 'Model Development',
    rating: 8.8, 
    experience: '4+ years',
    skills: ['Deep Learning', 'PyTorch', 'AWS']
  },
  { 
    id: 4, 
    name: 'James Wilson', 
    role: 'DevOps Engineer', 
    project: 'Automation Framework',
    assignment: 'Infrastructure Setup',
    rating: 9.0, 
    experience: '5+ years',
    skills: ['Docker', 'Kubernetes', 'CI/CD']
  },
  { 
    id: 5, 
    name: 'Priya Patel', 
    role: 'Data Analyst', 
    project: 'Data Analytics Platform',
    assignment: 'Data Processing',
    rating: 8.5, 
    experience: '3+ years',
    skills: ['Statistical Analysis', 'Tableau', 'Excel']
  },
  { 
    id: 6, 
    name: 'Alexander Kim', 
    role: 'System Architect', 
    project: 'Automation Framework',
    assignment: 'Architecture Design',
    rating: 9.7, 
    experience: '10+ years',
    skills: ['System Design', 'Microservices', 'Cloud']
  }
];

export const ZapmindsResourcesExportModal: React.FC<ZapmindsResourcesExportModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    const pdf = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ZAPMINDS INITIATIVE REPORT', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${date}`, 20, 30);
    
    const avgRating = (zapmindsResources.reduce((sum, resource) => sum + resource.rating, 0) / zapmindsResources.length).toFixed(1);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SUMMARY STATISTICS', 20, 45);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Assigned Resources: 6', 20, 55);
    pdf.text(`Average Performance: ${avgRating}`, 20, 62);
    pdf.text('Active Projects: 3', 20, 69);
    pdf.text('Allocation Rate: 100%', 20, 76);
    
    let yPosition = 90;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ZAPMINDS RESOURCES DETAILS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name', 20, yPosition);
    pdf.text('Role', 60, yPosition);
    pdf.text('Project', 110, yPosition);
    pdf.text('Rating', 150, yPosition);
    pdf.text('Experience', 170, yPosition);
    yPosition += 7;
    
    pdf.setFont('helvetica', 'normal');
    zapmindsResources.forEach(resource => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(resource.name, 20, yPosition);
      pdf.text(resource.role, 60, yPosition);
      pdf.text(resource.project, 110, yPosition);
      pdf.text(resource.rating.toString(), 150, yPosition);
      pdf.text(resource.experience, 170, yPosition);
      yPosition += 7;
    });
    
    pdf.save(`zapminds-resources-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const avgRating = (zapmindsResources.reduce((sum, resource) => sum + resource.rating, 0) / zapmindsResources.length).toFixed(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3" style={{ color: '#22356F' }}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#008080' }}>
              <Brain className="h-5 w-5 text-white" />
            </div>
            Zapminds Initiative Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#22356F' }}>Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#008080/10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>6</div>
                  <div className="text-sm text-slate-600">Assigned Resources</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#22356F/10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#22356F' }}>{avgRating}</div>
                  <div className="text-sm text-slate-600">Avg Performance</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#374B4F/10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#374B4F' }}>3</div>
                  <div className="text-sm text-slate-600">Active Projects</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#23272F/10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#23272F' }}>100%</div>
                  <div className="text-sm text-slate-600">Allocation Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#22356F' }}>Zapminds Resources Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead style={{ color: '#22356F' }}>Resource</TableHead>
                      <TableHead style={{ color: '#22356F' }}>Project</TableHead>
                      <TableHead style={{ color: '#22356F' }}>Assignment</TableHead>
                      <TableHead style={{ color: '#22356F' }}>Rating</TableHead>
                      <TableHead style={{ color: '#22356F' }}>Experience</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {zapmindsResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: '#008080/20' }}>
                              <Brain className="h-4 w-4" style={{ color: '#008080' }} />
                            </div>
                            <div>
                              <div className="font-medium" style={{ color: '#22356F' }}>{resource.name}</div>
                              <div className="text-sm" style={{ color: '#374B4F' }}>{resource.role}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge style={{ backgroundColor: '#22356F/10', color: '#22356F', borderColor: '#22356F/20' }}>
                            {resource.project}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ color: '#374B4F' }}>{resource.assignment}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium" style={{ color: '#22356F' }}>{resource.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: '#374B4F' }}>{resource.experience}</TableCell>
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
          <Button onClick={handleDownload} className="text-white hover:bg-opacity-90" style={{ backgroundColor: '#008080' }}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

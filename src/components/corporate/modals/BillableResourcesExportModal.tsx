
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, X, UserCheck, DollarSign } from "lucide-react";
import jsPDF from 'jspdf';

interface BillableResourcesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const billableResources = [
  { id: 1, name: 'Rajesh Kumar', role: 'Senior Developer', client: 'TechCorp Industries', billableRate: 85, hours: 160, revenue: 13600, utilization: 95 },
  { id: 2, name: 'Priya Sharma', role: 'QA Lead', client: 'FinanceHub', billableRate: 70, hours: 150, revenue: 10500, utilization: 88 },
  { id: 3, name: 'Kavitha Reddy', role: 'Backend Developer', client: 'DataCore', billableRate: 60, hours: 155, revenue: 9300, utilization: 91 },
  { id: 4, name: 'Sanjay Patel', role: 'Frontend Developer', client: 'RetailTech', billableRate: 95, hours: 165, revenue: 15675, utilization: 97 },
  { id: 5, name: 'John Smith', role: 'Architect', client: 'CorporateTech', billableRate: 110, hours: 170, revenue: 18700, utilization: 100 }
];

export const BillableResourcesExportModal: React.FC<BillableResourcesExportModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    const pdf = new jsPDF();
    const date = new Date().toLocaleDateString();
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BILLABLE RESOURCES REPORT', 20, 20);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${date}`, 20, 30);
    
    const totalRevenue = billableResources.reduce((sum, resource) => sum + resource.revenue, 0);
    const avgUtilization = Math.round(billableResources.reduce((sum, resource) => sum + resource.utilization, 0) / billableResources.length);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SUMMARY STATISTICS', 20, 45);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Total Billable Resources: 189', 20, 55);
    pdf.text(`Monthly Revenue: $${totalRevenue.toLocaleString()}`, 20, 62);
    pdf.text(`Average Utilization: ${avgUtilization}%`, 20, 69);
    pdf.text('Billability Rate: 76.5%', 20, 76);
    
    let yPosition = 90;
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BILLABLE RESOURCES DETAILS', 20, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name', 20, yPosition);
    pdf.text('Role', 60, yPosition);
    pdf.text('Client', 110, yPosition);
    pdf.text('Rate/Hr', 150, yPosition);
    pdf.text('Revenue', 180, yPosition);
    yPosition += 7;
    
    pdf.setFont('helvetica', 'normal');
    billableResources.forEach(resource => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.text(resource.name, 20, yPosition);
      pdf.text(resource.role, 60, yPosition);
      pdf.text(resource.client, 110, yPosition);
      pdf.text(`$${resource.billableRate}`, 150, yPosition);
      pdf.text(`$${resource.revenue.toLocaleString()}`, 180, yPosition);
      yPosition += 7;
    });
    
    pdf.save(`billable-resources-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const totalRevenue = billableResources.reduce((sum, resource) => sum + resource.revenue, 0);
  const avgUtilization = Math.round(billableResources.reduce((sum, resource) => sum + resource.utilization, 0) / billableResources.length);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-deep-blue">
            <div className="p-2 bg-teal rounded-lg">
              <UserCheck className="h-5 w-5 text-white" />
            </div>
            Billable Resources Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-teal/10">
                  <div className="text-2xl font-bold text-teal">189</div>
                  <div className="text-sm text-slate-600">Billable Resources</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-deep-blue/10">
                  <div className="text-2xl font-bold text-deep-blue">${totalRevenue.toLocaleString()}</div>
                  <div className="text-sm text-slate-600">Monthly Revenue</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-slate/10">
                  <div className="text-2xl font-bold text-slate">{avgUtilization}%</div>
                  <div className="text-sm text-slate-600">Avg Utilization</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-charcoal/10">
                  <div className="text-2xl font-bold text-charcoal">76.5%</div>
                  <div className="text-sm text-slate-600">Billability Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Billable Resources Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-deep-blue">Resource</TableHead>
                      <TableHead className="text-deep-blue">Client</TableHead>
                      <TableHead className="text-deep-blue">Rate/Hour</TableHead>
                      <TableHead className="text-deep-blue">Hours/Month</TableHead>
                      <TableHead className="text-deep-blue">Revenue</TableHead>
                      <TableHead className="text-deep-blue">Utilization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billableResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-deep-blue">{resource.name}</div>
                            <div className="text-sm text-slate">{resource.role}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-deep-blue/10 text-deep-blue border-deep-blue/20">
                            {resource.client}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-teal">${resource.billableRate}</TableCell>
                        <TableCell className="text-slate">{resource.hours}</TableCell>
                        <TableCell className="font-medium text-deep-blue">${resource.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-12 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-teal h-2 rounded-full" 
                                style={{ width: `${resource.utilization}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate">{resource.utilization}%</span>
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

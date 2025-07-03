
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, X, Users, MapPin } from "lucide-react";

interface ResourceExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resourcesByLocation = {
  'India': [
    { id: 1, employeeId: 'EMP001', name: 'Rajesh Kumar', role: 'Senior Developer', city: 'Bangalore', status: 'Billable' },
    { id: 2, employeeId: 'EMP002', name: 'Priya Sharma', role: 'QA Lead', city: 'Hyderabad', status: 'Billable' },
    { id: 3, employeeId: 'EMP003', name: 'Amit Singh', role: 'DevOps Engineer', city: 'Bangalore', status: 'Benched' },
    { id: 4, employeeId: 'EMP004', name: 'Sanjay Patel', role: 'Frontend Developer', city: 'Bangalore', status: 'Billable' },
    { id: 5, employeeId: 'EMP005', name: 'Kavitha Reddy', role: 'Backend Developer', city: 'Hyderabad', status: 'Billable' },
  ],
  'US': [
    { id: 6, employeeId: 'EMP006', name: 'John Smith', role: 'Architect', city: 'Texas', status: 'Billable' },
    { id: 7, employeeId: 'EMP007', name: 'Sarah Johnson', role: 'Project Manager', city: 'Texas', status: 'Billable' },
  ],
  'Canada': [
    { id: 8, employeeId: 'EMP008', name: 'Mike Chen', role: 'Full Stack Developer', city: 'Toronto', status: 'Billable' },
    { id: 9, employeeId: 'EMP009', name: 'Lisa Wang', role: 'UI/UX Designer', city: 'Vancouver', status: 'Benched' },
  ]
};

export const ResourceExportModal: React.FC<ResourceExportModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resource-overview-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReportContent = () => {
    const date = new Date().toLocaleDateString();
    let content = `RESOURCE OVERVIEW REPORT\nGenerated on: ${date}\n\n`;
    
    content += `SUMMARY STATISTICS\n`;
    content += `==================\n`;
    content += `Total Resources: 247\n`;
    content += `Billable Resources: 189\n`;
    content += `Benched Resources: 34\n`;
    content += `Shadow Resources: 24\n\n`;
    
    content += `LOCATION DISTRIBUTION\n`;
    content += `====================\n`;
    content += `India: 145 resources\n`;
    content += `US: 78 resources\n`;
    content += `Canada: 24 resources\n\n`;
    
    Object.entries(resourcesByLocation).forEach(([location, resources]) => {
      content += `${location.toUpperCase()} RESOURCES\n`;
      content += `${'='.repeat(location.length + 10)}\n`;
      resources.forEach(resource => {
        content += `${resource.employeeId} | ${resource.name} | ${resource.role} | ${resource.city} | ${resource.status}\n`;
      });
      content += `\n`;
    });
    
    return content;
  };

  const totalBillable = Object.values(resourcesByLocation).flat().filter(r => r.status === 'Billable').length;
  const totalBenched = Object.values(resourcesByLocation).flat().filter(r => r.status === 'Benched').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3" style={{ color: '#22356F' }}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#22356F', color: 'white' }}>
              <Users className="h-5 w-5" />
            </div>
            Resource Overview Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Statistics */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#22356F' }}>Summary Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#22356F10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#22356F' }}>247</div>
                  <div className="text-sm text-slate-600">Total Resources</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#00808010' }}>
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>189</div>
                  <div className="text-sm text-slate-600">Billable</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#374B4F10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#374B4F' }}>34</div>
                  <div className="text-sm text-slate-600">Benched</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#23272F10' }}>
                  <div className="text-2xl font-bold" style={{ color: '#23272F' }}>24</div>
                  <div className="text-sm text-slate-600">Shadow</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Distribution */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#22356F' }}>Location Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" style={{ color: '#22356F' }} />
                    <div>
                      <div className="font-semibold" style={{ color: '#22356F' }}>India</div>
                      <div className="text-sm text-slate-600">145 resources</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#22356F' }}>145</div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" style={{ color: '#008080' }} />
                    <div>
                      <div className="font-semibold" style={{ color: '#008080' }}>US</div>
                      <div className="text-sm text-slate-600">78 resources</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#008080' }}>78</div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" style={{ color: '#374B4F' }} />
                    <div>
                      <div className="font-semibold" style={{ color: '#374B4F' }}>Canada</div>
                      <div className="text-sm text-slate-600">24 resources</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#374B4F' }}>24</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Details by Location */}
          {Object.entries(resourcesByLocation).map(([location, resources]) => (
            <Card key={location}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: '#22356F' }}>
                  <MapPin className="h-5 w-5" />
                  {location} Resources ({resources.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead style={{ color: '#22356F' }}>Employee ID</TableHead>
                        <TableHead style={{ color: '#22356F' }}>Name</TableHead>
                        <TableHead style={{ color: '#22356F' }}>Role</TableHead>
                        <TableHead style={{ color: '#22356F' }}>City</TableHead>
                        <TableHead style={{ color: '#22356F' }}>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell className="font-medium">{resource.employeeId}</TableCell>
                          <TableCell>{resource.name}</TableCell>
                          <TableCell>{resource.role}</TableCell>
                          <TableCell>{resource.city}</TableCell>
                          <TableCell>
                            <Badge 
                              className="text-white"
                              style={{ 
                                backgroundColor: resource.status === 'Billable' ? '#008080' : '#374B4F'
                              }}
                            >
                              {resource.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          <Button onClick={handleDownload} style={{ backgroundColor: '#008080' }} className="text-white">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

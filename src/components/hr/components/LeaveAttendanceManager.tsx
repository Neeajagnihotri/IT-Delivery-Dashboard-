
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, UserCheck, UserX, Users, TrendingUp, Calendar, User } from "lucide-react";

const mockAbsentees = [
  { id: 'EMP001', name: 'John Smith', department: 'Engineering', reason: 'Sick Leave' },
  { id: 'EMP045', name: 'Sarah Wilson', department: 'Design', reason: 'Personal Leave' },
  { id: 'EMP089', name: 'Mike Johnson', department: 'QA', reason: 'Medical Leave' },
];

const mockLateCheckIns = [
  { id: 'EMP023', name: 'Alex Brown', checkInTime: '9:15 AM', department: 'Marketing' },
  { id: 'EMP067', name: 'Emma Davis', checkInTime: '9:30 AM', department: 'Engineering' },
  { id: 'EMP112', name: 'Tom Wilson', checkInTime: '9:45 AM', department: 'Sales' },
];

export const LeaveAttendanceManager = () => {
  const [isAbsenteesModalOpen, setIsAbsenteesModalOpen] = useState(false);
  const [isLateCheckInsModalOpen, setIsLateCheckInsModalOpen] = useState(false);

  const handleViewAbsentees = () => {
    setIsAbsenteesModalOpen(true);
  };

  const handleViewLateCheckIns = () => {
    setIsLateCheckInsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Attendance KPIs */}
      <Card className="bg-white border border-deep-blue/20">
        <CardHeader>
          <CardTitle className="text-deep-blue">Today's Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Today's Attendance */}
            <div className="bg-light-bg p-6 rounded-lg border border-soft-silver/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal rounded-lg">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate">Today's Attendance</p>
                  <p className="text-2xl font-bold text-teal">242</p>
                  <div className="flex items-center text-sm text-teal mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>96.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Absentees */}
            <div className="bg-light-bg p-6 rounded-lg border border-soft-silver/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-charcoal rounded-lg">
                  <UserX className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate">Absentees</p>
                  <p className="text-2xl font-bold text-charcoal">8</p>
                  <Button 
                    variant="link" 
                    className="text-deep-blue hover:text-teal p-0 h-auto text-sm mt-1"
                    onClick={handleViewAbsentees}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Late Check-ins */}
            <div className="bg-light-bg p-6 rounded-lg border border-soft-silver/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate">Late Check-ins</p>
                  <p className="text-2xl font-bold text-slate">5</p>
                  <Button 
                    variant="link" 
                    className="text-deep-blue hover:text-teal p-0 h-auto text-sm mt-1"
                    onClick={handleViewLateCheckIns}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Analytics */}
      <Card className="bg-white border border-deep-blue/20">
        <CardHeader>
          <CardTitle className="text-deep-blue">Attendance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-deep-blue">Weekly Trends</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate">Monday</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-light-bg rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    <span className="text-sm text-deep-blue font-medium">96%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Tuesday</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-light-bg rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                    <span className="text-sm text-deep-blue font-medium">98%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Wednesday</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-light-bg rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="text-sm text-deep-blue font-medium">95%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Thursday</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-light-bg rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                    <span className="text-sm text-deep-blue font-medium">97%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Friday</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-light-bg rounded-full h-2">
                      <div className="bg-teal h-2 rounded-full" style={{ width: '99%' }}></div>
                    </div>
                    <span className="text-sm text-deep-blue font-medium">99%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-deep-blue">Department Wise</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate">Engineering</span>
                  <Badge className="bg-teal text-white">97.2%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Design</span>
                  <Badge className="bg-teal text-white">96.1%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Marketing</span>
                  <Badge className="bg-teal text-white">95.7%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Sales</span>
                  <Badge className="bg-teal text-white">98.3%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">QA</span>
                  <Badge className="bg-teal text-white">96.8%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Absentees Modal */}
      <Dialog open={isAbsenteesModalOpen} onOpenChange={setIsAbsenteesModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-deep-blue">Today's Absentees</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {mockAbsentees.map((employee) => (
                <Card key={employee.id} className="border border-soft-silver/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-light-bg rounded-lg">
                          <User className="h-4 w-4 text-deep-blue" />
                        </div>
                        <div>
                          <h4 className="font-medium text-deep-blue">{employee.name}</h4>
                          <p className="text-sm text-slate">ID: {employee.id} | {employee.department}</p>
                        </div>
                      </div>
                      <Badge className="bg-charcoal text-white">
                        {employee.reason}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsAbsenteesModalOpen(false)}
                className="bg-deep-blue hover:bg-deep-blue/90"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Late Check-ins Modal */}
      <Dialog open={isLateCheckInsModalOpen} onOpenChange={setIsLateCheckInsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-deep-blue">Today's Late Check-ins</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {mockLateCheckIns.map((employee) => (
                <Card key={employee.id} className="border border-soft-silver/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-light-bg rounded-lg">
                          <Clock className="h-4 w-4 text-slate" />
                        </div>
                        <div>
                          <h4 className="font-medium text-deep-blue">{employee.name}</h4>
                          <p className="text-sm text-slate">ID: {employee.id} | {employee.department}</p>
                        </div>
                      </div>
                      <Badge className="bg-slate text-white">
                        {employee.checkInTime}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => setIsLateCheckInsModalOpen(false)}
                className="bg-deep-blue hover:bg-deep-blue/90"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

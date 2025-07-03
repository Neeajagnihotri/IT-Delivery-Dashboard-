
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Calendar, TrendingUp, Settings, Download, Upload } from "lucide-react";
import { EmployeeProfileManager } from './components/EmployeeProfileManager';
import { HRDashboard } from './components/HRDashboard';
import { DocumentManager } from './components/DocumentManager';
import { LeaveAttendanceManager } from './components/LeaveAttendanceManager';
import { HRAnalytics } from './components/HRAnalytics';
import { motion } from "framer-motion";

export const HRManagementView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFile(file);
        console.log('Importing HR data from file:', file.name);
        // Simulate file processing
        setTimeout(() => {
          alert(`Successfully imported data from ${file.name}`);
          setSelectedFile(null);
        }, 2000);
      }
    };
    input.click();
  };

  const handleBulkUpload = () => {
    console.log('Starting bulk upload process...');
    // Implementation for bulk upload functionality
    alert('Bulk upload functionality initiated');
  };

  return (
    <div className="min-h-screen bg-light-bg p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <Card className="mb-6 md:mb-8 bg-white border border-deep-blue/20 shadow-lg">
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="p-2 md:p-3 bg-deep-blue rounded-2xl">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-deep-blue">HR Management System</h1>
                  <p className="text-slate text-sm md:text-base">Comprehensive human resource management and analytics platform</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <Button 
                  className="bg-deep-blue hover:bg-deep-blue/90 text-sm md:text-base"
                  onClick={handleImportData}
                  disabled={selectedFile !== null}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {selectedFile ? 'Processing...' : 'Import Data'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white text-sm md:text-base"
                  onClick={handleBulkUpload}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border border-deep-blue/20 rounded-xl p-1 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue text-xs md:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue text-xs md:text-sm">
              Employees
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue text-xs md:text-sm">
              Documents
            </TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue text-xs md:text-sm">
              Attendance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white text-deep-blue text-xs md:text-sm">
              Analytics
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">
              <HRDashboard />
            </TabsContent>

            <TabsContent value="employees">
              <EmployeeProfileManager />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentManager />
            </TabsContent>

            <TabsContent value="attendance">
              <LeaveAttendanceManager />
            </TabsContent>

            <TabsContent value="analytics">
              <HRAnalytics />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

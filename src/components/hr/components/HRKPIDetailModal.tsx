
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface HRKPIDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpiType: string;
}

export const HRKPIDetailModal = ({ open, onOpenChange, kpiType }: HRKPIDetailModalProps) => {
  const getKPIDetails = (type: string) => {
    const kpiData = {
      headcount: {
        title: "Total Employee Headcount",
        value: "247",
        description: "Comprehensive overview of organizational headcount across all departments and locations.",
        metrics: [
          { label: "Full-time Employees", value: "235", percentage: 95.1 },
          { label: "Contract Workers", value: "12", percentage: 4.9 },
          { label: "Remote Workers", value: "89", percentage: 36.0 },
          { label: "On-site Workers", value: "158", percentage: 64.0 }
        ],
        chartData: [
          { month: 'Jan', headcount: 238 },
          { month: 'Feb', headcount: 241 },
          { month: 'Mar', headcount: 243 },
          { month: 'Apr', headcount: 245 },
          { month: 'May', headcount: 246 },
          { month: 'Jun', headcount: 247 }
        ],
        dataKey: 'headcount'
      },
      attrition: {
        title: "Employee Attrition Rate",
        value: "2.05%",
        description: "Monthly attrition rate tracking and analysis across different departments and tenure groups.",
        metrics: [
          { label: "Voluntary Departures", value: "4", percentage: 80.0 },
          { label: "Involuntary Departures", value: "1", percentage: 20.0 },
          { label: "Average Tenure", value: "3.2 years", percentage: null },
          { label: "Exit Interview Score", value: "4.1/5", percentage: 82.0 }
        ],
        chartData: [
          { month: 'Jan', rate: 2.1 },
          { month: 'Feb', rate: 1.8 },
          { month: 'Mar', rate: 2.5 },
          { month: 'Apr', rate: 1.9 },
          { month: 'May', rate: 2.3 },
          { month: 'Jun', rate: 2.05 }
        ],
        dataKey: 'rate'
      },
      attendance: {
        title: "Employee Attendance Rate",
        value: "96.4%",
        description: "Daily attendance tracking and trends across all departments and work arrangements.",
        metrics: [
          { label: "On-time Arrivals", value: "94.2%", percentage: 94.2 },
          { label: "Sick Leave Usage", value: "2.1%", percentage: 2.1 },
          { label: "Vacation Days Used", value: "1.3%", percentage: 1.3 },
          { label: "Average Work Hours", value: "40.2", percentage: null }
        ],
        chartData: [
          { day: 'Mon', attendance: 95.1 },
          { day: 'Tue', attendance: 97.2 },
          { day: 'Wed', attendance: 96.4 },
          { day: 'Thu', attendance: 98.0 },
          { day: 'Fri', attendance: 96.8 }
        ],
        dataKey: 'attendance'
      },
      retention: {
        title: "Employee Retention Rate",
        value: "94.2%",
        description: "Annual retention rate analysis by department, role level, and performance ratings.",
        metrics: [
          { label: "High Performers", value: "98.5%", percentage: 98.5 },
          { label: "Mid Performers", value: "92.1%", percentage: 92.1 },
          { label: "New Hires (1 year)", value: "89.3%", percentage: 89.3 },
          { label: "Senior Leadership", value: "100%", percentage: 100 }
        ],
        chartData: [
          { quarter: 'Q1', retention: 94.8 },
          { quarter: 'Q2', retention: 93.9 },
          { quarter: 'Q3', retention: 94.5 },
          { quarter: 'Q4', retention: 94.2 }
        ],
        dataKey: 'retention'
      },
      positions: {
        title: "Open Positions",
        value: "13",
        description: "Current job openings across all departments with priority levels and hiring timeline.",
        metrics: [
          { label: "Critical Priority", value: "4", percentage: 30.8 },
          { label: "High Priority", value: "5", percentage: 38.5 },
          { label: "Medium Priority", value: "4", percentage: 30.8 },
          { label: "Average Time to Fill", value: "28 days", percentage: null }
        ],
        chartData: [
          { dept: 'Engineering', openings: 6 },
          { dept: 'Design', openings: 2 },
          { dept: 'Marketing', openings: 3 },
          { dept: 'Sales', openings: 2 }
        ],
        dataKey: 'openings'
      },
      training: {
        title: "Training Programs",
        value: "91.5%",
        description: "Employee training completion rates and program effectiveness across all skill development areas.",
        metrics: [
          { label: "Technical Training", value: "89.2%", percentage: 89.2 },
          { label: "Soft Skills Training", value: "93.8%", percentage: 93.8 },
          { label: "Compliance Training", value: "97.1%", percentage: 97.1 },
          { label: "Leadership Development", value: "85.6%", percentage: 85.6 }
        ],
        chartData: [
          { program: 'Technical', completion: 89.2 },
          { program: 'Soft Skills', completion: 93.8 },
          { program: 'Compliance', completion: 97.1 },
          { program: 'Leadership', completion: 85.6 }
        ],
        dataKey: 'completion'
      }
    };

    return kpiData[type] || kpiData.headcount;
  };

  const details = getKPIDetails(kpiType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-deep-blue">
            {details.title}
          </DialogTitle>
          <p className="text-slate mt-2">{details.description}</p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {details.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate">{metric.label}</span>
                    <span className="font-medium text-deep-blue">{metric.value}</span>
                  </div>
                  {metric.percentage !== null && (
                    <Progress value={metric.percentage} className="h-2" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chart Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-deep-blue">Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {kpiType === 'attrition' ? (
                    <LineChart data={details.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey={details.dataKey}
                        stroke="#008080" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  ) : (
                    <BarChart data={details.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey={Object.keys(details.chartData[0] || {})[0]} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey={details.dataKey} fill="#22356F" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-4 bg-light-bg rounded-lg">
            <p className="text-2xl font-bold text-deep-blue">{details.value}</p>
            <p className="text-sm text-slate">Current Value</p>
          </div>
          <div className="text-center p-4 bg-light-bg rounded-lg">
            <p className="text-2xl font-bold text-teal">Target Met</p>
            <p className="text-sm text-slate">Performance</p>
          </div>
          <div className="text-center p-4 bg-light-bg rounded-lg">
            <p className="text-2xl font-bold text-deep-blue">+5.2%</p>
            <p className="text-sm text-slate">vs Last Month</p>
          </div>
          <div className="text-center p-4 bg-light-bg rounded-lg">
            <p className="text-2xl font-bold text-teal">Excellent</p>
            <p className="text-sm text-slate">Status</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

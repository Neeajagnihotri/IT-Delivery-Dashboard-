
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, MapPin, Calendar, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const benchedEmployees = [
  {
    id: "EMP001",
    name: "John Mitchell",
    designation: "Senior Full Stack Developer",
    experience: "7 years",
    skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
    location: "New York",
    benchedSince: "2024-01-15"
  },
  {
    id: "EMP002",
    name: "Sarah Connor",
    designation: "QA Engineer",
    experience: "4 years",
    skills: ["Selenium", "TestNG", "Cucumber", "API Testing", "Performance Testing"],
    location: "San Francisco",
    benchedSince: "2024-02-01"
  },
  {
    id: "EMP003",
    name: "Michael Zhang",
    designation: "DevOps Engineer",
    experience: "5 years",
    skills: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Azure"],
    location: "Toronto",
    benchedSince: "2024-01-20"
  },
  {
    id: "EMP004",
    name: "Emily Johnson",
    designation: "UI/UX Designer",
    experience: "3 years",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    location: "London",
    benchedSince: "2024-02-10"
  },
  {
    id: "EMP005",
    name: "David Kumar",
    designation: "Business Analyst",
    experience: "6 years",
    skills: ["Requirements Analysis", "Process Modeling", "SQL", "Tableau", "Jira"],
    location: "Mumbai",
    benchedSince: "2024-01-25"
  }
];

export const BenchedResourcesView = () => {
  const navigate = useNavigate();

  const getExperienceColor = (experience: string) => {
    const years = parseInt(experience);
    if (years >= 7) return "bg-teal text-white";
    if (years >= 5) return "bg-deep-blue text-white";
    if (years >= 3) return "bg-slate text-white";
    return "bg-charcoal text-white";
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-deep-blue mb-2">Benched Resources</h1>
            <p className="text-slate">Available resources ready for project allocation</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/resource-utilization')}
            className="border-soft-silver text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resource Utilization
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <User className="h-8 w-8 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-deep-blue">{benchedEmployees.length}</h3>
                  <p className="text-slate">Total Benched Resources</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate">Average Experience</p>
                <p className="text-lg font-semibold text-deep-blue">5.2 years</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {benchedEmployees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-deep-blue text-lg">{employee.name}</CardTitle>
                    <p className="text-slate text-sm mt-1">{employee.designation}</p>
                  </div>
                  <Badge className={getExperienceColor(employee.experience)}>
                    {employee.experience}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Employee Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate" />
                    <span className="text-sm text-slate">ID: {employee.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate" />
                    <span className="text-sm text-slate">{employee.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-slate" />
                    <span className="text-sm text-slate">{employee.experience} exp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate" />
                    <span className="text-sm text-slate">Since {new Date(employee.benchedSince).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-sm font-medium text-deep-blue mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-deep-blue text-deep-blue">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

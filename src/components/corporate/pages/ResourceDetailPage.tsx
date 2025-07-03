import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Award, Star, Briefcase, MessageSquare, Clock, Target } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

// Mock data - in real app this would come from API
const resourceDetails: Record<string, {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  experience: string;
  joinDate: string;
  status: string;
  employeeId: string;
  skills: string[];
  currentProjects: Array<{
    name: string;
    status: string;
    startDate: string;
    client: string;
    role: string;
  }>;
  upcomingEngagements: Array<{
    project: string;
    client: string;
    startDate: string;
    endDate: string;
    role: string;
    status: string;
  }>;
  performanceFeedback: Array<{
    reviewer: string;
    period: string;
    rating: number;
    feedback: string;
    strengths: string[];
    improvementAreas: string[];
    goals: string[];
  }>;
  utilizationRate: number;
  projectSuccessRate: number;
  performanceRating: number;
}> = {
  "1": {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@zapcom.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Developer',
    department: 'Engineering',
    location: 'New York',
    experience: '5+ years',
    joinDate: 'Jan 15, 2023',
    status: 'billable',
    employeeId: 'EMP0001',
    skills: ['React', 'Node.js', 'TypeScript'],
    currentProjects: [
      {
        name: 'E-commerce Platform Redesign',
        status: 'Active',
        startDate: 'Mar 1, 2024',
        client: 'TechCorp Inc',
        role: 'Leading the frontend development for the new customer portal'
      },
      {
        name: 'Mobile App Development',
        status: 'Support',
        startDate: 'Feb 15, 2024',
        client: 'StartupXY',
        role: 'Providing technical consultation and code reviews'
      }
    ],
    upcomingEngagements: [
      {
        project: 'AI Analytics Platform',
        client: 'DataTech Solutions',
        startDate: 'Aug 1, 2024',
        endDate: 'Dec 15, 2024',
        role: 'Senior Full Stack Developer',
        status: 'Confirmed'
      },
      {
        project: 'Cloud Migration Project',
        client: 'Enterprise Corp',
        startDate: 'Oct 1, 2024',
        endDate: 'Jan 30, 2025',
        role: 'Technical Lead',
        status: 'Tentative'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Sarah Johnson (Project Manager)',
        period: 'Q1 2024',
        rating: 4.5,
        feedback: 'John consistently delivers high-quality code and shows excellent problem-solving skills. His ability to mentor junior developers is particularly noteworthy.',
        strengths: ['Technical expertise', 'Leadership skills', 'Code quality', 'Mentoring abilities'],
        improvementAreas: ['Documentation', 'Time estimation'],
        goals: ['Lead a major project', 'Improve documentation practices', 'Enhance estimation accuracy']
      },
      {
        reviewer: 'Mike Chen (Tech Lead)',
        period: 'Q4 2023',
        rating: 4.3,
        feedback: 'Strong technical contributor with good collaboration skills. Consistently meets deadlines and produces clean, maintainable code.',
        strengths: ['Problem solving', 'Code quality', 'Reliability', 'Team collaboration'],
        improvementAreas: ['Public speaking', 'Process improvement'],
        goals: ['Present at tech conferences', 'Contribute to process optimization', 'Expand cloud skills']
      }
    ],
    utilizationRate: 85,
    projectSuccessRate: 92,
    performanceRating: 4.5
  },
  "2": {
    id: 2,
    name: 'Jane Doe',
    email: 'jane.doe@zapcom.com',
    phone: '+1 (555) 234-5678',
    role: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    experience: '3+ years',
    joinDate: 'Mar 10, 2023',
    status: 'billable',
    employeeId: 'EMP0002',
    skills: ['Figma', 'React', 'User Research'],
    currentProjects: [
      {
        name: 'Mobile Banking App',
        status: 'Active',
        startDate: 'Jan 15, 2024',
        client: 'FinanceHub',
        role: 'Lead UX designer for mobile interface design'
      }
    ],
    upcomingEngagements: [
      {
        project: 'Healthcare Portal Redesign',
        client: 'MedTech Inc',
        startDate: 'Jul 15, 2024',
        endDate: 'Nov 30, 2024',
        role: 'Senior UX Designer',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Alex Rodriguez (Design Director)',
        period: 'Q1 2024',
        rating: 4.2,
        feedback: 'Jane brings creative solutions and user-centered thinking to every project. Her design processes are thorough and well-documented.',
        strengths: ['User research', 'Design thinking', 'Attention to detail', 'Client communication'],
        improvementAreas: ['Prototyping speed', 'Cross-platform design'],
        goals: ['Master advanced prototyping tools', 'Lead design system creation', 'Mentor junior designers']
      }
    ],
    utilizationRate: 90,
    projectSuccessRate: 88,
    performanceRating: 4.2
  },
  "3": {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@zapcom.com',
    phone: '+1 (555) 345-6789',
    role: 'DevOps Engineer',
    department: 'Engineering',
    location: 'San Francisco',
    experience: '4+ years',
    joinDate: 'Aug 5, 2022',
    status: 'benched',
    employeeId: 'EMP0003',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    currentProjects: [],
    upcomingEngagements: [
      {
        project: 'Infrastructure Modernization',
        client: 'TechStart LLC',
        startDate: 'Aug 15, 2024',
        endDate: 'Dec 31, 2024',
        role: 'DevOps Lead',
        status: 'Pipeline'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Emily Davis (Engineering Manager)',
        period: 'Q1 2024',
        rating: 4.7,
        feedback: 'Mike is an outstanding DevOps engineer with deep expertise in cloud infrastructure. His automation scripts have significantly improved our deployment efficiency.',
        strengths: ['Infrastructure automation', 'Cloud expertise', 'Problem solving', 'Innovation'],
        improvementAreas: ['Documentation', 'Knowledge sharing'],
        goals: ['Develop internal training materials', 'Implement advanced monitoring', 'Obtain AWS certifications']
      }
    ],
    utilizationRate: 0,
    projectSuccessRate: 95,
    performanceRating: 4.7
  },
  "4": {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@zapcom.com',
    phone: '+1 (555) 456-7890',
    role: 'Frontend Developer',
    department: 'Engineering',
    location: 'Austin',
    experience: '2+ years',
    joinDate: 'Nov 20, 2023',
    status: 'shadow',
    employeeId: 'EMP0004',
    skills: ['React', 'TypeScript', 'CSS'],
    currentProjects: [
      {
        name: 'Internal Training Portal',
        status: 'Active',
        startDate: 'Feb 1, 2024',
        client: 'Internal',
        role: 'Shadow developer learning advanced React patterns'
      }
    ],
    upcomingEngagements: [
      {
        project: 'E-learning Platform',
        client: 'EduTech Solutions',
        startDate: 'Sep 1, 2024',
        endDate: 'Jan 15, 2025',
        role: 'Junior Frontend Developer',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'John Smith (Senior Developer)',
        period: 'Q1 2024',
        rating: 3.8,
        feedback: 'Sarah shows great enthusiasm for learning and has made significant progress. Her coding skills are improving rapidly with mentorship.',
        strengths: ['Learning agility', 'Attention to detail', 'Positive attitude', 'Collaboration'],
        improvementAreas: ['Technical depth', 'Independent problem solving'],
        goals: ['Complete advanced React certification', 'Lead a small feature development', 'Improve debugging skills']
      }
    ],
    utilizationRate: 60,
    projectSuccessRate: 80,
    performanceRating: 3.8
  },
  "5": {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@zapcom.com',
    phone: '+1 (555) 567-8901',
    role: 'Backend Developer',
    department: 'Engineering',
    location: 'Seattle',
    experience: '6+ years',
    joinDate: 'May 15, 2022',
    status: 'billable',
    employeeId: 'EMP0005',
    skills: ['Python', 'PostgreSQL', 'Django'],
    currentProjects: [
      {
        name: 'AI Analytics Dashboard',
        status: 'Active',
        startDate: 'Dec 1, 2023',
        client: 'DataCore',
        role: 'Backend architect for machine learning pipeline'
      },
      {
        name: 'API Gateway Migration',
        status: 'Active',
        startDate: 'Jan 10, 2024',
        client: 'TechFlow',
        role: 'Lead backend developer for microservices architecture'
      }
    ],
    upcomingEngagements: [
      {
        project: 'Blockchain Integration',
        client: 'CryptoTech Inc',
        startDate: 'Sep 15, 2024',
        endDate: 'Feb 28, 2025',
        role: 'Senior Backend Developer',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Lisa Anderson (Tech Lead)',
        period: 'Q1 2024',
        rating: 4.6,
        feedback: 'David is a highly skilled backend developer with excellent architectural thinking. His API designs are robust and scalable.',
        strengths: ['System architecture', 'API design', 'Performance optimization', 'Technical leadership'],
        improvementAreas: ['Frontend skills', 'Agile practices'],
        goals: ['Learn modern frontend frameworks', 'Become certified Scrum Master', 'Contribute to open source projects']
      }
    ],
    utilizationRate: 95,
    projectSuccessRate: 93,
    performanceRating: 4.6
  }
};

export const ResourceDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const resource = id ? resourceDetails[id] : undefined;

  if (!resource) {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#22356F' }}>Resource Not Found</h1>
          <Button onClick={() => navigate('/resource-management')} style={{ backgroundColor: '#22356F' }}>
            Back to Resource Management
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'billable':
        return { bg: '#008080', text: 'Billable' };
      case 'benched':
        return { bg: '#374B4F', text: 'Available' };
      case 'shadow':
        return { bg: '#22356F', text: 'Shadow' };
      default:
        return { bg: '#374B4F', text: status };
    }
  };

  const getEngagementStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-teal text-white';
      case 'tentative': return 'bg-deep-blue text-white';
      case 'pipeline': return 'bg-slate text-white';
      default: return 'bg-charcoal text-white';
    }
  };

  const statusBadge = getStatusBadge(resource.status);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-deep-blue to-teal rounded-2xl shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#22356F' }}>Resource Profile</h1>
              <p className="text-slate-600">Comprehensive employee overview and management</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-slate-300 text-deep-blue hover:bg-light-bg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Profile Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#008080' }}>
              {resource.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#22356F' }}>{resource.name}</h2>
              <p className="text-slate-600 mb-1">{resource.role}</p>
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{resource.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{resource.department}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{resource.experience}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className="mb-2 text-white" style={{ backgroundColor: statusBadge.bg }}>
              {statusBadge.text}
            </Badge>
            <p className="text-sm text-slate-500">Active Status</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <span className="text-sm">{resource.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-slate-400" />
                  <span className="text-sm">{resource.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-slate-400" />
                  <span className="text-sm">Employee ID: {resource.employeeId}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <span className="text-sm">Joined: {resource.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Expertise */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {resource.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="border-slate-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Engagements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: '#22356F' }}>
                  <Clock className="h-5 w-5" />
                  Upcoming Engagements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {resource.upcomingEngagements.length > 0 ? (
                  <div className="space-y-4">
                    {resource.upcomingEngagements.map((engagement, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold" style={{ color: '#22356F' }}>{engagement.project}</h4>
                          <Badge className={getEngagementStatusColor(engagement.status)}>
                            {engagement.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{engagement.role}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <span>Client: {engagement.client}</span>
                          <span>Duration: {engagement.startDate} - {engagement.endDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <p>No upcoming engagements scheduled</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle style={{ color: '#22356F' }}>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Utilization Rate</span>
                    <span className="font-semibold" style={{ color: '#008080' }}>{resource.utilizationRate}%</span>
                  </div>
                  <Progress value={resource.utilizationRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Project Success Rate</span>
                    <span className="font-semibold" style={{ color: '#008080' }}>{resource.projectSuccessRate}%</span>
                  </div>
                  <Progress value={resource.projectSuccessRate} className="h-2" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Performance Rating</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= resource.performanceRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: '#22356F' }}>
                  <MessageSquare className="h-5 w-5" />
                  Performance Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resource.performanceFeedback.map((feedback, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-sm" style={{ color: '#22356F' }}>{feedback.reviewer}</h4>
                          <p className="text-xs text-slate-500">{feedback.period}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{feedback.feedback}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <h5 className="text-xs font-medium text-slate-700 mb-1">Strengths:</h5>
                          <div className="flex flex-wrap gap-1">
                            {feedback.strengths.map((strength, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-teal text-teal">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-medium text-slate-700 mb-1">Areas for Improvement:</h5>
                          <div className="flex flex-wrap gap-1">
                            {feedback.improvementAreas.map((area, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-amber-500 text-amber-600">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-medium text-slate-700 mb-1">Goals:</h5>
                          <div className="flex flex-wrap gap-1">
                            {feedback.goals.map((goal, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs border-deep-blue text-deep-blue">
                                {goal}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Projects */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle style={{ color: '#22356F' }}>Current Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {resource.currentProjects.length > 0 ? (
              <div className="space-y-4">
                {resource.currentProjects.map((project, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold" style={{ color: '#22356F' }}>{project.name}</h4>
                      <Badge 
                        className="text-white"
                        style={{ backgroundColor: project.status === 'Active' ? '#008080' : '#374B4F' }}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{project.role}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>Started: {project.startDate}</span>
                      <span>Client: {project.client}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No current projects assigned</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button style={{ backgroundColor: '#008080' }} className="text-white">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

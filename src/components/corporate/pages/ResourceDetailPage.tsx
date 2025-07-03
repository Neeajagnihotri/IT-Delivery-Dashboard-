
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
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@zapcom.com',
    phone: '+91 9876543210',
    role: 'Senior Developer',
    department: 'Engineering',
    location: 'Bangalore',
    experience: '5+ years',
    joinDate: 'Jan 15, 2020',
    status: 'billable',
    employeeId: 'EMP001',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    currentProjects: [
      {
        name: 'E-commerce Platform Redesign',
        status: 'Active',
        startDate: 'Mar 1, 2024',
        client: 'TechCorp Inc',
        role: 'Leading the frontend development for the new customer portal'
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
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Amit Singh (Tech Lead)',
        period: 'Q1 2024',
        rating: 4.5,
        feedback: 'Rajesh consistently delivers high-quality code and shows excellent problem-solving skills.',
        strengths: ['Technical expertise', 'Leadership skills', 'Code quality'],
        improvementAreas: ['Documentation', 'Time estimation'],
        goals: ['Lead a major project', 'Improve documentation practices']
      }
    ],
    utilizationRate: 85,
    projectSuccessRate: 92,
    performanceRating: 4.5
  },
  "2": {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@zapcom.com',
    phone: '+91 9876543211',
    role: 'QA Lead',
    department: 'Quality Assurance',
    location: 'Hyderabad',
    experience: '4+ years',
    joinDate: 'Mar 10, 2021',
    status: 'billable',
    employeeId: 'EMP002',
    skills: ['Selenium', 'TestNG', 'API Testing', 'Performance Testing'],
    currentProjects: [
      {
        name: 'Mobile Banking App Testing',
        status: 'Active',
        startDate: 'Jan 15, 2024',
        client: 'FinanceHub',
        role: 'Lead QA engineer for comprehensive testing strategy'
      }
    ],
    upcomingEngagements: [
      {
        project: 'Healthcare Portal Testing',
        client: 'MedTech Inc',
        startDate: 'Jul 15, 2024',
        endDate: 'Nov 30, 2024',
        role: 'Senior QA Lead',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Kavitha Reddy (QA Manager)',
        period: 'Q1 2024',
        rating: 4.2,
        feedback: 'Priya brings excellent testing methodologies and quality assurance practices.',
        strengths: ['Test automation', 'Quality standards', 'Team coordination'],
        improvementAreas: ['Performance testing', 'Mobile testing'],
        goals: ['Master mobile testing tools', 'Lead automation framework']
      }
    ],
    utilizationRate: 90,
    projectSuccessRate: 88,
    performanceRating: 4.2
  },
  "3": {
    id: 3,
    name: 'Amit Singh',
    email: 'amit.singh@zapcom.com',
    phone: '+91 9876543212',
    role: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Bangalore',
    experience: '3+ years',
    joinDate: 'Aug 5, 2022',
    status: 'benched',
    employeeId: 'EMP003',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
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
        reviewer: 'Rajesh Kumar (Senior Developer)',
        period: 'Q1 2024',
        rating: 4.0,
        feedback: 'Amit shows strong DevOps skills and is eager to learn new technologies.',
        strengths: ['Infrastructure automation', 'Cloud services', 'Problem solving'],
        improvementAreas: ['Documentation', 'Knowledge sharing'],
        goals: ['Complete AWS certification', 'Lead infrastructure project']
      }
    ],
    utilizationRate: 0,
    projectSuccessRate: 85,
    performanceRating: 4.0
  },
  "4": {
    id: 4,
    name: 'Sanjay Patel',
    email: 'sanjay.patel@zapcom.com',
    phone: '+91 9876543213',
    role: 'Frontend Developer',
    department: 'Engineering',
    location: 'Bangalore',
    experience: '2+ years',
    joinDate: 'Nov 20, 2023',
    status: 'billable',
    employeeId: 'EMP004',
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    currentProjects: [
      {
        name: 'E-commerce Frontend',
        status: 'Active',
        startDate: 'Feb 1, 2024',
        client: 'RetailTech',
        role: 'Frontend developer for user interface development'
      }
    ],
    upcomingEngagements: [
      {
        project: 'Dashboard Redesign',
        client: 'AnalyticsCorp',
        startDate: 'Sep 1, 2024',
        endDate: 'Jan 15, 2025',
        role: 'Frontend Developer',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Rajesh Kumar (Senior Developer)',
        period: 'Q1 2024',
        rating: 3.8,
        feedback: 'Sanjay shows great enthusiasm for learning and has made good progress.',
        strengths: ['Learning agility', 'UI development', 'Positive attitude'],
        improvementAreas: ['Technical depth', 'Code optimization'],
        goals: ['Complete React certification', 'Lead a feature development']
      }
    ],
    utilizationRate: 80,
    projectSuccessRate: 75,
    performanceRating: 3.8
  },
  "5": {
    id: 5,
    name: 'Kavitha Reddy',
    email: 'kavitha.reddy@zapcom.com',
    phone: '+91 9876543214',
    role: 'Backend Developer',
    department: 'Engineering',
    location: 'Hyderabad',
    experience: '4+ years',
    joinDate: 'May 15, 2021',
    status: 'billable',
    employeeId: 'EMP005',
    skills: ['Python', 'PostgreSQL', 'Django', 'REST APIs'],
    currentProjects: [
      {
        name: 'API Development Project',
        status: 'Active',
        startDate: 'Dec 1, 2023',
        client: 'DataCore',
        role: 'Backend architect for API development'
      }
    ],
    upcomingEngagements: [
      {
        project: 'Microservices Migration',
        client: 'EnterpriseTech',
        startDate: 'Sep 15, 2024',
        endDate: 'Feb 28, 2025',
        role: 'Senior Backend Developer',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Priya Sharma (QA Lead)',
        period: 'Q1 2024',
        rating: 4.3,
        feedback: 'Kavitha is a skilled backend developer with excellent API design skills.',
        strengths: ['API architecture', 'Database design', 'Code quality'],
        improvementAreas: ['Frontend integration', 'Performance optimization'],
        goals: ['Learn microservices patterns', 'Improve system performance']
      }
    ],
    utilizationRate: 95,
    projectSuccessRate: 90,
    performanceRating: 4.3
  },
  "6": {
    id: 6,
    name: 'John Smith',
    email: 'john.smith@zapcom.com',
    phone: '+1 (555) 123-4567',
    role: 'Architect',
    department: 'Engineering',
    location: 'Texas',
    experience: '8+ years',
    joinDate: 'Jan 10, 2019',
    status: 'billable',
    employeeId: 'EMP006',
    skills: ['System Architecture', 'Microservices', 'Cloud Solutions', 'Team Leadership'],
    currentProjects: [
      {
        name: 'Enterprise Architecture Design',
        status: 'Active',
        startDate: 'Jan 1, 2024',
        client: 'CorporateTech',
        role: 'Lead architect for system design and implementation'
      }
    ],
    upcomingEngagements: [
      {
        project: 'Cloud Migration Strategy',
        client: 'TechGlobal',
        startDate: 'Aug 1, 2024',
        endDate: 'Dec 31, 2024',
        role: 'Chief Architect',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Sarah Johnson (Engineering Director)',
        period: 'Q1 2024',
        rating: 4.8,
        feedback: 'John is an exceptional architect with deep technical expertise.',
        strengths: ['System design', 'Leadership', 'Strategic thinking'],
        improvementAreas: ['Documentation', 'Mentoring junior staff'],
        goals: ['Develop architecture guidelines', 'Build center of excellence']
      }
    ],
    utilizationRate: 95,
    projectSuccessRate: 98,
    performanceRating: 4.8
  },
  "7": {
    id: 7,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@zapcom.com',
    phone: '+1 (555) 234-5678',
    role: 'Project Manager',
    department: 'Management',
    location: 'Texas',
    experience: '6+ years',
    joinDate: 'Mar 15, 2020',
    status: 'billable',
    employeeId: 'EMP007',
    skills: ['Project Management', 'Agile', 'Scrum', 'Stakeholder Management'],
    currentProjects: [
      {
        name: 'Digital Transformation Program',
        status: 'Active',
        startDate: 'Feb 1, 2024',
        client: 'FinanceCorpUS',
        role: 'Program manager overseeing multiple workstreams'
      }
    ],
    upcomingEngagements: [
      {
        project: 'Agile Transformation',
        client: 'ManufacturingInc',
        startDate: 'Jul 1, 2024',
        endDate: 'Dec 15, 2024',
        role: 'Senior Project Manager',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'John Smith (Architect)',
        period: 'Q1 2024',
        rating: 4.6,
        feedback: 'Sarah is an excellent project manager with strong leadership skills.',
        strengths: ['Team coordination', 'Risk management', 'Client communication'],
        improvementAreas: ['Technical depth', 'Agile coaching'],
        goals: ['Complete PMP certification', 'Develop agile expertise']
      }
    ],
    utilizationRate: 90,
    projectSuccessRate: 94,
    performanceRating: 4.6
  },
  "8": {
    id: 8,
    name: 'Mike Chen',
    email: 'mike.chen@zapcom.com',
    phone: '+1 (647) 123-4567',
    role: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Toronto',
    experience: '4+ years',
    joinDate: 'Jun 20, 2022',
    status: 'billable',
    employeeId: 'EMP008',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    currentProjects: [
      {
        name: 'Customer Portal Development',
        status: 'Active',
        startDate: 'Jan 10, 2024',
        client: 'RetailCanada',
        role: 'Full stack developer for web application development'
      }
    ],
    upcomingEngagements: [
      {
        project: 'E-learning Platform',
        client: 'EduTech Canada',
        startDate: 'Aug 15, 2024',
        endDate: 'Jan 30, 2025',
        role: 'Senior Full Stack Developer',
        status: 'Confirmed'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Lisa Wang (UI/UX Designer)',
        period: 'Q1 2024',
        rating: 4.1,
        feedback: 'Mike is a solid full stack developer with good technical skills.',
        strengths: ['Full stack development', 'Problem solving', 'Code quality'],
        improvementAreas: ['UI/UX understanding', 'Testing practices'],
        goals: ['Improve frontend skills', 'Learn automated testing']
      }
    ],
    utilizationRate: 85,
    projectSuccessRate: 87,
    performanceRating: 4.1
  },
  "9": {
    id: 9,
    name: 'Lisa Wang',
    email: 'lisa.wang@zapcom.com',
    phone: '+1 (604) 123-4567',
    role: 'UI/UX Designer',
    department: 'Design',
    location: 'Vancouver',
    experience: '3+ years',
    joinDate: 'Sep 10, 2023',
    status: 'benched',
    employeeId: 'EMP009',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    currentProjects: [],
    upcomingEngagements: [
      {
        project: 'Mobile App Design',
        client: 'StartupCanada',
        startDate: 'Aug 1, 2024',
        endDate: 'Nov 15, 2024',
        role: 'Lead UI/UX Designer',
        status: 'Pipeline'
      }
    ],
    performanceFeedback: [
      {
        reviewer: 'Mike Chen (Full Stack Developer)',
        period: 'Q1 2024',
        rating: 3.9,
        feedback: 'Lisa shows great design thinking and user-centered approach.',
        strengths: ['Design creativity', 'User research', 'Attention to detail'],
        improvementAreas: ['Prototyping speed', 'Design systems'],
        goals: ['Master advanced prototyping', 'Build design system expertise']
      }
    ],
    utilizationRate: 0,
    projectSuccessRate: 82,
    performanceRating: 3.9
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

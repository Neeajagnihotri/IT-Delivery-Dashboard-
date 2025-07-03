
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Award, 
  Calendar,
  DollarSign,
  BarChart3,
  Target,
  Clock,
  Star,
  BookOpen,
  Shield,
  Heart,
  Briefcase,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";

export const HRManagementView = () => {
  const [hrData, setHrData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHRData();
  }, []);

  const fetchHRData = async () => {
    try {
      setLoading(true);
      // Comprehensive HR data
      const mockData = {
        workforce: {
          total_employees: 187,
          new_hires_month: 8,
          departures_month: 3,
          retention_rate: 94.2,
          diversity_stats: {
            gender_balance: 67.3,
            age_distribution: {
              "20-30": 45,
              "31-40": 89,
              "41-50": 38,
              "50+": 15
            },
            department_diversity: 72.4
          }
        },
        performance: {
          avg_performance_score: 88.7,
          high_performers: 56,
          improvement_needed: 12,
          reviews_completed: 98.3,
          goal_completion: 91.5,
          peer_feedback_score: 87.2
        },
        compensation: {
          total_monthly_payroll: 2100000,
          avg_salary_increase: 12.5,
          bonus_distribution: 285000,
          benefits_cost: 420000,
          department_costs: {
            engineering: 1200000,
            qa: 320000,
            design: 240000,
            devops: 180000,
            management: 160000
          }
        },
        training: {
          completion_rate: 91.5,
          hours_completed: 2847,
          certifications_earned: 156,
          training_budget_used: 78.3,
          skills_development: {
            technical: 89.2,
            leadership: 76.8,
            communication: 84.1,
            project_management: 82.5
          }
        },
        engagement: {
          satisfaction_score: 88.9,
          work_life_balance: 87.3,
          career_growth: 85.7,
          recognition_program: 92.1,
          wellness_participation: 73.8,
          feedback_response: 89.4
        },
        recruitment: {
          open_positions: 12,
          applications_month: 234,
          interview_ratio: 18.5,
          offer_acceptance: 89.7,
          time_to_hire: 21.4,
          recruitment_cost: 125000
        }
      };
      
      setHrData(mockData);
    } catch (error) {
      console.error('Error fetching HR data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="pulse-glow rounded-full p-4 bg-teal">
          <RefreshCw className="h-8 w-8 animate-spin text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-light-bg min-h-screen">
      {/* Header */}
      <div className="dashboard-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 gradient-primary rounded-3xl shadow-lg">
              <Users className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-deep-blue">
                Human Resources Management
              </h1>
              <p className="text-slate text-lg mt-1">
                Workforce Analytics, Performance Tracking & Employee Engagement
              </p>
            </div>
          </div>
          <Button onClick={fetchHRData} className="modern-button">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Key HR Metrics */}
      <div className="kpi-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 gradient-primary rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate">Total Workforce</h3>
                <p className="text-3xl font-bold text-deep-blue">
                  {hrData?.workforce?.total_employees}
                </p>
              </div>
            </div>
            <Badge className="bg-teal text-white">
              +{hrData?.workforce?.new_hires_month} this month
            </Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-teal font-medium">Retention: {hrData?.workforce?.retention_rate}%</span>
            <span className="text-slate">Departures: {hrData?.workforce?.departures_month}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 gradient-accent rounded-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate">Performance Score</h3>
                <p className="text-3xl font-bold text-deep-blue">
                  {hrData?.performance?.avg_performance_score}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <Award className="h-5 w-5 text-teal" />
              <p className="text-xs text-slate">{hrData?.performance?.high_performers} high performers</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-teal font-medium">Reviews: {hrData?.performance?.reviews_completed}%</span>
            <span className="text-slate">Goals: {hrData?.performance?.goal_completion}%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 gradient-secondary rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate">Monthly Payroll</h3>
                <p className="text-3xl font-bold text-deep-blue">
                  ${(hrData?.compensation?.total_monthly_payroll / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
            <div className="text-right">
              <TrendingUp className="h-5 w-5 text-teal" />
              <p className="text-xs text-slate">+{hrData?.compensation?.avg_salary_increase}% avg increase</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-teal font-medium">Bonuses: ${(hrData?.compensation?.bonus_distribution / 1000).toFixed(0)}K</span>
            <span className="text-slate">Benefits: ${(hrData?.compensation?.benefits_cost / 1000).toFixed(0)}K</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-teal rounded-xl">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate">Employee Satisfaction</h3>
                <p className="text-3xl font-bold text-deep-blue">
                  {hrData?.engagement?.satisfaction_score}%
                </p>
              </div>
            </div>
            <Badge className="bg-deep-blue text-white">
              Excellent
            </Badge>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-teal font-medium">Work-Life: {hrData?.engagement?.work_life_balance}%</span>
            <span className="text-slate">Growth: {hrData?.engagement?.career_growth}%</span>
          </div>
        </motion.div>
      </div>

      {/* Detailed HR Analytics */}
      <Tabs defaultValue="workforce" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-white p-2 border border-soft-silver rounded-xl shadow-sm">
          <TabsTrigger value="workforce" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white rounded-lg font-medium">
            Workforce
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white rounded-lg font-medium">
            Performance
          </TabsTrigger>
          <TabsTrigger value="compensation" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white rounded-lg font-medium">
            Compensation
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white rounded-lg font-medium">
            Training
          </TabsTrigger>
          <TabsTrigger value="recruitment" className="data-[state=active]:bg-deep-blue data-[state=active]:text-white rounded-lg font-medium">
            Recruitment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workforce" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Diversity & Inclusion</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate">Gender Balance</span>
                  <Badge className="bg-teal text-white">{hrData?.workforce?.diversity_stats?.gender_balance}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate">Department Diversity</span>
                  <Badge className="bg-deep-blue text-white">{hrData?.workforce?.diversity_stats?.department_diversity}%</Badge>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-deep-blue mb-2">Age Distribution</h4>
                  {Object.entries(hrData?.workforce?.diversity_stats?.age_distribution || {}).map(([range, count]) => (
                    <div key={range} className="flex items-center justify-between mb-2">
                      <span className="text-slate">{range} years</span>
                      <span className="font-medium text-deep-blue">{String(count)} employees</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Workforce Trends</h3>
              <div className="space-y-4">
                <div className="p-4 bg-light-bg rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-deep-blue">New Hires</span>
                    <TrendingUp className="h-4 w-4 text-teal" />
                  </div>
                  <p className="text-2xl font-bold text-teal">{hrData?.workforce?.new_hires_month}</p>
                  <p className="text-sm text-slate">This month</p>
                </div>
                <div className="p-4 bg-light-bg rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-deep-blue">Retention Rate</span>
                    <Shield className="h-4 w-4 text-teal" />
                  </div>
                  <p className="text-2xl font-bold text-teal">{hrData?.workforce?.retention_rate}%</p>
                  <p className="text-sm text-slate">Annual average</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Performance Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-medium">High Performers</span>
                  <Badge className="bg-green-600 text-white">{hrData?.performance?.high_performers}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-800 font-medium">Needs Improvement</span>
                  <Badge className="bg-yellow-600 text-white">{hrData?.performance?.improvement_needed}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-800 font-medium">Reviews Completed</span>
                  <Badge className="bg-blue-600 text-white">{hrData?.performance?.reviews_completed}%</Badge>
                </div>
              </div>
            </div>

            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Goal Achievement</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal mb-2">
                  {hrData?.performance?.goal_completion}%
                </div>
                <p className="text-slate mb-4">Overall completion rate</p>
                <div className="bg-light-bg rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full gradient-accent rounded-full transition-all duration-500"
                    style={{ width: `${hrData?.performance?.goal_completion}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Peer Feedback</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-deep-blue mb-2">
                  {hrData?.performance?.peer_feedback_score}%
                </div>
                <p className="text-slate mb-4">Average peer rating</p>
                <Badge className="bg-teal text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Excellent
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compensation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Department Costs</h3>
              <div className="space-y-3">
                {Object.entries(hrData?.compensation?.department_costs || {}).map(([dept, cost]) => (
                  <div key={dept} className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
                    <span className="font-medium text-deep-blue capitalize">{dept}</span>
                    <Badge className="bg-charcoal text-white">
                      ${((cost as number) / 1000).toFixed(0)}K/month
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Compensation Breakdown</h3>
              <div className="space-y-4">
                <div className="p-4 bg-light-bg rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-deep-blue">Total Payroll</span>
                    <DollarSign className="h-4 w-4 text-teal" />
                  </div>
                  <p className="text-2xl font-bold text-deep-blue">
                    ${(hrData?.compensation?.total_monthly_payroll / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div className="p-4 bg-light-bg rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-deep-blue">Benefits Cost</span>
                    <Heart className="h-4 w-4 text-teal" />
                  </div>
                  <p className="text-2xl font-bold text-teal">
                    ${(hrData?.compensation?.benefits_cost / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Skills Development</h3>
              <div className="space-y-3">
                {Object.entries(hrData?.training?.skills_development || {}).map(([skill, score]) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-deep-blue capitalize">{skill.replace('_', ' ')}</span>
                      <span className="text-teal">{String(score)}%</span>
                    </div>
                    <div className="bg-light-bg rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full gradient-accent rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Training Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-light-bg rounded-xl">
                  <BookOpen className="h-8 w-8 text-teal mx-auto mb-2" />
                  <p className="text-2xl font-bold text-deep-blue">{hrData?.training?.hours_completed}</p>
                  <p className="text-sm text-slate">Hours Completed</p>
                </div>
                <div className="text-center p-4 bg-light-bg rounded-xl">
                  <Award className="h-8 w-8 text-teal mx-auto mb-2" />
                  <p className="text-2xl font-bold text-deep-blue">{hrData?.training?.certifications_earned}</p>
                  <p className="text-sm text-slate">Certifications</p>
                </div>
                <div className="text-center p-4 bg-light-bg rounded-xl">
                  <Target className="h-8 w-8 text-teal mx-auto mb-2" />
                  <p className="text-2xl font-bold text-deep-blue">{hrData?.training?.completion_rate}%</p>
                  <p className="text-sm text-slate">Completion Rate</p>
                </div>
                <div className="text-center p-4 bg-light-bg rounded-xl">
                  <TrendingUp className="h-8 w-8 text-teal mx-auto mb-2" />
                  <p className="text-2xl font-bold text-deep-blue">{hrData?.training?.training_budget_used}%</p>
                  <p className="text-sm text-slate">Budget Used</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Hiring Pipeline</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-light-bg rounded-xl">
                  <Briefcase className="h-8 w-8 text-teal mx-auto mb-2" />
                  <p className="text-2xl font-bold text-deep-blue">{hrData?.recruitment?.open_positions}</p>
                  <p className="text-sm text-slate">Open Positions</p>
                </div>
                <div className="text-center p-4 bg-light-bg rounded-xl">
                  <Users className="h-8 w-8 text-teal mx-auto mb-2" />
                  <p className="text-2xl font-bold text-deep-blue">{hrData?.recruitment?.applications_month}</p>
                  <p className="text-sm text-slate">Applications</p>
                </div>
              </div>
            </div>

            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Recruitment Efficiency</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate">Interview Ratio</span>
                  <Badge className="bg-teal text-white">{hrData?.recruitment?.interview_ratio}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate">Offer Acceptance</span>
                  <Badge className="bg-deep-blue text-white">{hrData?.recruitment?.offer_acceptance}%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate">Time to Hire</span>
                  <Badge className="bg-charcoal text-white">{hrData?.recruitment?.time_to_hire} days</Badge>
                </div>
              </div>
            </div>

            <div className="data-visualization">
              <h3 className="text-xl font-semibold text-deep-blue mb-4">Recruitment Cost</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-teal mb-2">
                  ${(hrData?.recruitment?.recruitment_cost / 1000).toFixed(0)}K
                </div>
                <p className="text-slate mb-4">Monthly budget</p>
                <Badge className="bg-green-600 text-white">
                  Within Budget
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

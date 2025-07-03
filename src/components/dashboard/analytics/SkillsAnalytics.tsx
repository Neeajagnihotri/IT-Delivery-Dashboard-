
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Brain, TrendingUp, Award, Target } from "lucide-react";
import { motion } from "framer-motion";

const skillsData = [
  { skill: "React", count: 65, demand: 85, proficiency: 88, growth: "+12%" },
  { skill: "Node.js", count: 52, demand: 75, proficiency: 82, growth: "+8%" },
  { skill: "Python", count: 48, demand: 90, proficiency: 85, growth: "+15%" },
  { skill: "Java", count: 42, demand: 70, proficiency: 80, growth: "+5%" },
  { skill: "AWS", count: 38, demand: 95, proficiency: 78, growth: "+20%" },
  { skill: "TypeScript", count: 55, demand: 88, proficiency: 90, growth: "+18%" },
  { skill: "Docker", count: 35, demand: 80, proficiency: 75, growth: "+10%" },
  { skill: "Kubernetes", count: 28, demand: 85, proficiency: 72, growth: "+25%" }
];

const skillCategories = [
  { category: "Frontend", count: 120, demand: 85, proficiency: 87 },
  { category: "Backend", count: 94, demand: 82, proficiency: 84 },
  { category: "DevOps", count: 63, demand: 90, proficiency: 79 },
  { category: "Mobile", count: 45, demand: 75, proficiency: 81 },
  { category: "Data Science", count: 38, demand: 95, proficiency: 88 },
  { category: "Cloud", count: 71, demand: 92, proficiency: 82 }
];

const topSkills = skillsData.slice(0, 5);

export const SkillsAnalytics = () => {
  const totalSkills = skillsData.reduce((sum, skill) => sum + skill.count, 0);
  const avgProficiency = Math.round(skillsData.reduce((sum, skill) => sum + skill.proficiency, 0) / skillsData.length);
  const highDemandSkills = skillsData.filter(skill => skill.demand >= 85).length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Skills</p>
                <p className="text-2xl font-bold text-purple-600">{totalSkills}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Proficiency</p>
                <p className="text-2xl font-bold text-emerald-600">{avgProficiency}%</p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Award className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">High Demand</p>
                <p className="text-2xl font-bold text-orange-600">{highDemandSkills}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-glass enterprise-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Skill Gap</p>
                <p className="text-2xl font-bold text-red-600">8.2%</p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Target className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills vs Demand */}
        <Card className="enterprise-glass">
          <CardHeader className="pb-4">
            <CardTitle className="enterprise-title text-xl">Skills vs Market Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSkills} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="#8b5cf6" name="Resource Count" />
                    <Bar dataKey="demand" fill="#f59e0b" name="Market Demand" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skills Radar */}
        <Card className="enterprise-glass">
          <CardHeader className="pb-4">
            <CardTitle className="enterprise-title text-xl">Skills Category Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillCategories} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Proficiency"
                      dataKey="proficiency"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Demand"
                      dataKey="demand"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Detail Table */}
      <Card className="enterprise-glass">
        <CardHeader className="pb-4">
          <CardTitle className="enterprise-title text-xl">Detailed Skills Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillsData.map((skill, index) => (
              <div key={index} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-6">
                  <Badge variant="outline" className="font-mono text-sm px-3 py-1">{skill.skill}</Badge>
                  <div>
                    <p className="font-medium enterprise-title text-lg">{skill.count} resources</p>
                    <p className="text-sm enterprise-subtitle">Growth: {skill.growth}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Demand</p>
                    <div className="flex items-center space-x-3">
                      <Progress value={skill.demand} className="w-20 h-3" />
                      <span className="text-sm font-medium w-12">{skill.demand}%</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Proficiency</p>
                    <div className="flex items-center space-x-3">
                      <Progress value={skill.proficiency} className="w-20 h-3" />
                      <span className="text-sm font-medium w-12">{skill.proficiency}%</span>
                    </div>
                  </div>
                  <Badge 
                    variant={skill.demand > skill.proficiency ? "destructive" : "default"}
                    className="ml-4"
                  >
                    {skill.demand > skill.proficiency ? "Gap" : "Strong"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

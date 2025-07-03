
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const mockResources = [
  { id: 1, name: "John Smith", role: "Senior Developer", department: "Engineering", status: "billable", location: "New York", experience: "5+ years", skills: ["React", "Node.js", "TypeScript"] },
  { id: 2, name: "Jane Doe", role: "UX Designer", department: "Design", status: "billable", location: "Remote", experience: "3+ years", skills: ["Figma", "React", "User Research"] },
  { id: 3, name: "Mike Johnson", role: "DevOps Engineer", department: "Engineering", status: "benched", location: "San Francisco", experience: "4+ years", skills: ["AWS", "Docker", "Kubernetes"] },
  { id: 4, name: "Sarah Wilson", role: "Frontend Developer", department: "Engineering", status: "shadow", location: "Austin", experience: "2+ years", skills: ["React", "TypeScript", "CSS"] },
  { id: 5, name: "David Brown", role: "Backend Developer", department: "Engineering", status: "billable", location: "Seattle", experience: "6+ years", skills: ["Python", "PostgreSQL", "Django"] }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'billable': return 'bg-teal text-white hover:bg-teal/90';
    case 'benched': return 'bg-soft-silver text-charcoal hover:bg-soft-silver/90';
    case 'shadow': return 'bg-deep-blue text-white hover:bg-deep-blue/90';
    case 'associate': return 'bg-charcoal text-white hover:bg-charcoal/90';
    default: return 'bg-slate text-white hover:bg-slate/90';
  }
};

interface ResourceTableProps {
  onResourceClick?: (resource: any) => void;
}

export const ResourceTable = ({ onResourceClick }: ResourceTableProps) => {
  return (
    <Card className="modern-card bg-white border-soft-silver/30 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-deep-blue/5 to-teal/5 border-b border-soft-silver/20">
        <CardTitle className="text-xl font-semibold flex items-center gap-3 text-deep-blue">
          <div className="p-2 bg-deep-blue rounded-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
          Active Resources
          <Badge className="ml-auto bg-teal text-white">
            {mockResources.length} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {mockResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="p-5 bg-white border border-soft-silver/40 rounded-xl hover:border-teal/40 cursor-pointer transition-all duration-300 hover:shadow-lg"
              onClick={() => onResourceClick?.(resource)}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-deep-blue text-lg">
                    {resource.name}
                  </h4>
                  <p className="text-slate text-sm font-medium">
                    {resource.role}
                  </p>
                </div>
                <Badge className={`${getStatusColor(resource.status)} border-0 font-medium`}>
                  {resource.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-slate mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-deep-blue/10 rounded">
                    <Briefcase className="h-3 w-3 text-deep-blue" />
                  </div>
                  <span className="font-medium">{resource.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-teal/10 rounded">
                    <MapPin className="h-3 w-3 text-teal" />
                  </div>
                  <span className="font-medium">{resource.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-charcoal/10 rounded">
                    <TrendingUp className="h-3 w-3 text-charcoal" />
                  </div>
                  <span className="font-medium">{resource.experience}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {resource.skills.slice(0, 3).map((skill, skillIndex) => (
                  <Badge key={skillIndex} className="bg-light-bg text-deep-blue border border-soft-silver/30 text-xs font-medium">
                    {skill}
                  </Badge>
                ))}
                {resource.skills.length > 3 && (
                  <Badge className="bg-light-bg text-deep-blue border border-soft-silver/30 text-xs font-medium">
                    +{resource.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button className="w-full modern-button text-white font-semibold">
            View All Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

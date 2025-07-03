
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, MapPin, Briefcase, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const mockResources = [
  { id: 1, name: "Rajesh Kumar", role: "Senior Developer", department: "Engineering", status: "billable", location: "Bangalore", experience: "5+ years", skills: ["React", "Node.js", "TypeScript"] },
  { id: 2, name: "Priya Sharma", role: "QA Lead", department: "Quality Assurance", status: "billable", location: "Hyderabad", experience: "4+ years", skills: ["Selenium", "TestNG", "API Testing"] },
  { id: 3, name: "Amit Singh", role: "DevOps Engineer", department: "Engineering", status: "benched", location: "Bangalore", experience: "3+ years", skills: ["AWS", "Docker", "Kubernetes"] },
  { id: 4, name: "Sanjay Patel", role: "Frontend Developer", department: "Engineering", status: "shadow", location: "Bangalore", experience: "2+ years", skills: ["React", "TypeScript", "CSS"] },
  { id: 5, name: "Kavitha Reddy", role: "Backend Developer", department: "Engineering", status: "billable", location: "Hyderabad", experience: "4+ years", skills: ["Python", "PostgreSQL", "Django"] }
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
  const navigate = useNavigate();

  const handleViewDetails = (resource: any, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/resource-detail/${resource.id}`);
  };

  const handleViewAllResources = () => {
    navigate('/resource-management');
  };

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
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(resource.status)} border-0 font-medium`}>
                    {resource.status}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={(e) => handleViewDetails(resource, e)}
                    className="bg-deep-blue hover:bg-deep-blue/90 text-white"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
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
          <Button 
            onClick={handleViewAllResources}
            className="w-full modern-button text-white font-semibold"
          >
            View All Resources
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

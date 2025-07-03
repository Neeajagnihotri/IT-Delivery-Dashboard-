
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Eye, GraduationCap, FolderOpen, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const kpiData = [
  {
    title: "Total Resources",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    color: "#22356F",
    type: "total_resources"
  },
  {
    title: "Billable",
    value: "189",
    change: "+8%",
    changeType: "positive" as const,
    icon: UserCheck,
    color: "#008080",
    type: "billable"
  },
  {
    title: "Benched",
    value: "34",
    change: "-5%",
    changeType: "negative" as const,
    icon: UserX,
    color: "#374B4F",
    type: "benched"
  },
  {
    title: "Shadow",
    value: "18",
    change: "+2%",
    changeType: "positive" as const,
    icon: Eye,
    color: "#23272F",
    type: "shadow"
  },
  {
    title: "Associates",
    value: "6",
    change: "0%",
    changeType: "neutral" as const,
    icon: GraduationCap,
    color: "#008080",
    type: "associates"
  },
  {
    title: "Total Projects",
    value: "42",
    change: "+15%",
    changeType: "positive" as const,
    icon: FolderOpen,
    color: "#22356F",
    type: "total_projects"
  }
];

interface KPICardsProps {
  onKPIClick: (kpiType: string) => void;
}

export const KPICards = ({ onKPIClick }: KPICardsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="cursor-pointer"
          onClick={() => onKPIClick(kpi.type)}
        >
          <Card className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-deep-blue/20 hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-5">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate leading-tight line-clamp-2 flex-1 pr-2">
                {kpi.title}
              </CardTitle>
              <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg" style={{ backgroundColor: kpi.color }}>
                <kpi.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-5 pt-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-deep-blue mb-1 truncate">
                {kpi.value}
              </div>
              <div className="flex items-center gap-1 min-h-[20px]">
                {kpi.changeType === 'positive' ? (
                  <TrendingUp className="h-3 w-3 text-teal flex-shrink-0" />
                ) : kpi.changeType === 'negative' ? (
                  <TrendingDown className="h-3 w-3 text-slate flex-shrink-0" />
                ) : null}
                <p className={`text-xs font-medium truncate ${
                  kpi.changeType === 'positive' ? 'text-teal' :
                  kpi.changeType === 'negative' ? 'text-slate' :
                  'text-slate'
                }`}>
                  {kpi.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

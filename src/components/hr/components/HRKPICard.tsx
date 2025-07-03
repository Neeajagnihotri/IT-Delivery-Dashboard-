
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface HRKPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    direction: "up" | "down" | "stable";
    value: string;
  };
  icon: React.ReactNode;
  status?: "excellent" | "good" | "warning" | "critical";
  onClick: () => void;
}

export const HRKPICard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon, 
  status = "good",
  onClick 
}: HRKPICardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-teal';
      case 'good': return 'text-deep-blue';
      case 'warning': return 'text-slate';
      case 'critical': return 'text-charcoal';
      default: return 'text-deep-blue';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="h-3 w-3 text-teal" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-charcoal" />;
      case 'stable': return <Minus className="h-3 w-3 text-slate" />;
      default: return null;
    }
  };

  return (
    <Card 
      className="bg-gradient-to-br from-white to-light-bg border border-deep-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate mb-1">{title}</p>
            <p className={`text-2xl md:text-3xl font-bold group-hover:text-teal transition-colors duration-300 ${getStatusColor(status)}`}>
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-slate font-medium mt-1">
                {subtitle}
              </p>
            )}
            {trend && (
              <p className="text-xs text-slate font-medium flex items-center mt-1">
                {getTrendIcon(trend.direction)}
                <span className="ml-1">{trend.value}</span>
              </p>
            )}
          </div>
          <div className="p-3 bg-deep-blue rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

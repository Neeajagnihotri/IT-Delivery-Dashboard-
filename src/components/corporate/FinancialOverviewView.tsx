import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign,
  BarChart3,
  RefreshCw,
  LineChart,
  PieChart,
  FileText,
  Calendar,
  Coins,
  TrendingDown,
  ListChecks,
  LayoutDashboard
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthContext";

interface FinancialData {
  overview: {
    total_revenue: number;
    monthly_revenue: number;
    quarterly_growth: number;
    profit_margin: number;
    operating_costs: number;
    net_profit: number;
    roi: number;
    cash_flow: number;
    burn_rate: number;
    runway_months: number;
  };
  revenue_streams: {
    services: number;
    products: number;
    subscriptions: number;
    consulting: number;
  };
  expenses: {
    salaries: number;
    marketing: number;
    infrastructure: number;
    office: number;
    licenses: number;
  };
  costs: {
    monthly_avg: number;
    quarterly_avg: number;
    annual_avg: number;
  };
  projections: {
    next_quarter: number;
    next_year: number;
    five_year: number;
  };
  key_ratios: {
    profit_margin: number;
    debt_equity: number;
    current_ratio: number;
    quick_ratio: number;
  };
  budget_allocations: {
    marketing: number;
    engineering: number;
    sales: number;
    operations: number;
  };
  cash_flow_analysis: {
    operating_activities: number;
    investing_activities: number;
    financing_activities: number;
  };
  assets_liabilities: {
    total_assets: number;
    total_liabilities: number;
    equity: number;
  };
}

export const FinancialOverviewView = () => {
  const { user } = useAuth();
  const [financialData, setFinancialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      // Enhanced comprehensive financial data
      const mockData = {
        revenue_streams: {
          services: 1800000,
          products: 1200000,
          subscriptions: 800000,
          consulting: 400000
        },
        expenses: {
          salaries: 1200000,
          marketing: 400000,
          infrastructure: 350000,
          office: 150000,
          licenses: 100000
        },
        costs: {
          monthly_avg: 220000,
          quarterly_avg: 660000,
          annual_avg: 2640000
        },
        projections: {
          next_quarter: 1100000,
          next_year: 4800000,
          five_year: 24000000
        },
        key_ratios: {
          profit_margin: 22.8,
          debt_equity: 0.45,
          current_ratio: 1.8,
          quick_ratio: 1.2
        },
        budget_allocations: {
          marketing: 0.15,
          engineering: 0.4,
          sales: 0.25,
          operations: 0.2
        },
        cash_flow_analysis: {
          operating_activities: 520000,
          investing_activities: -120000,
          financing_activities: 20000
        },
        assets_liabilities: {
          total_assets: 6800000,
          total_liabilities: 2400000,
          equity: 4400000
        },
        overview: {
          total_revenue: 4200000,
          monthly_revenue: 350000,
          quarterly_growth: 18.5,
          profit_margin: 22.8,
          operating_costs: 2650000,
          net_profit: 1550000,
          roi: 24.6,
          cash_flow: 420000,
          burn_rate: 485000,
          runway_months: 24
        }
      };
      
      setFinancialData(mockData);
    } catch (error) {
      console.error('Error fetching financial data:', error);
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
      {/* Enhanced Header */}
      <div className="dashboard-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-4 gradient-primary rounded-3xl shadow-lg">
              <DollarSign className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-deep-blue">
                Financial Overview
              </h1>
              <p className="text-slate text-lg mt-1">
                Comprehensive financial analytics, budget tracking, and cost optimization
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-teal text-white px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-2" />
              Revenue Growth: +{financialData?.overview?.quarterly_growth}%
            </Badge>
            <Button onClick={fetchFinancialData} className="modern-button">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="kpi-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card interactive-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 gradient-primary rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate">Total Revenue</h3>
                <p className="text-3xl font-bold text-deep-blue">
                  ${(financialData?.overview?.total_revenue / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
            <div className="text-right">
              <TrendingUp className="h-5 w-5 text-teal" />
              <p className="text-xs text-slate">+{financialData?.overview?.quarterly_growth}% growth</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-teal font-medium">Monthly: ${(financialData?.overview?.monthly_revenue / 1000).toFixed(0)}K</span>
            <span className="text-slate">Margin: {financialData?.overview?.profit_margin}%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card interactive-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 gradient-secondary rounded-xl">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate">Net Profit</h3>
                <p className="text-3xl font-bold text-deep-blue">
                  ${(financialData?.overview?.net_profit / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
            <div className="text-right">
              <TrendingUp className="h-5 w-5 text-teal" />
              <p className="text-xs text-slate">+{financialData?.overview?.profit_margin}% margin</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-teal font-medium">ROI: {financialData?.overview?.roi}%</span>
            <span className="text-slate">Cash Flow: ${(financialData?.overview?.cash_flow / 1000).toFixed(0)}K</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card interactive-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-teal rounded-xl">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate">Burn Rate</h3>
                <p className="text-3xl font-bold text-deep-blue">
                  ${(financialData?.overview?.burn_rate / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
            <div className="text-right">
              <Calendar className="h-5 w-5 text-teal" />
              <p className="text-xs text-slate">Runway: {financialData?.overview?.runway_months} months</p>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-teal font-medium">Op Costs: ${(financialData?.overview?.operating_costs / 1000000).toFixed(1)}M</span>
            <span className="text-slate">Efficiency: +8.2%</span>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Financial Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Average Costs Overview */}
        <div className="data-visualization">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-deep-blue">Average Costs Overview</h3>
            <Badge className="bg-deep-blue text-white">
              <BarChart3 className="h-4 w-4 mr-1" />
              Trending
            </Badge>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-light-bg rounded-xl">
                <p className="text-sm text-slate mb-1">Monthly Average</p>
                <p className="text-2xl font-bold text-deep-blue">
                  ${(financialData?.costs?.monthly_avg / 1000).toFixed(0)}K
                </p>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="h-4 w-4 text-teal mr-1" />
                  <span className="text-sm text-teal">+5.2%</span>
                </div>
              </div>
              <div className="text-center p-4 bg-light-bg rounded-xl">
                <p className="text-sm text-slate mb-1">Quarterly Average</p>
                <p className="text-2xl font-bold text-deep-blue">
                  ${(financialData?.costs?.quarterly_avg / 1000).toFixed(0)}K
                </p>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-500">+2.8%</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <p className="text-sm text-slate mb-2">6-Month Trend</p>
              <div className="h-24 bg-gradient-to-r from-teal/20 to-deep-blue/20 rounded-lg flex items-end justify-between p-2">
                {[65, 72, 68, 75, 82, 78].map((height, index) => (
                  <div 
                    key={index} 
                    className="bg-teal rounded-t flex-1 mx-1 transition-all duration-500 hover:bg-deep-blue"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Streams Analysis */}
        <div className="data-visualization">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-deep-blue">Revenue Streams Analysis</h3>
            <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white">
              <PieChart className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            {Object.entries(financialData?.revenue_streams || {}).map(([stream, value]) => (
              <div key={stream} className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
                <span className="font-medium text-deep-blue capitalize">{stream}</span>
                <Badge className="bg-teal text-white">
                  ${((value as number) / 1000).toFixed(0)}K
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="data-visualization">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-deep-blue">Expense Breakdown</h3>
            <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white">
              <ListChecks className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            {Object.entries(financialData?.expenses || {}).map(([expense, value]) => (
              <div key={expense} className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
                <span className="font-medium text-deep-blue capitalize">{expense}</span>
                <Badge className="bg-deep-blue text-white">
                  ${((value as number) / 1000).toFixed(0)}K
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Projections */}
        <div className="data-visualization">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-deep-blue">Financial Projections</h3>
            <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white">
              <LineChart className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
              <span className="font-medium text-deep-blue">Next Quarter</span>
              <Badge className="bg-teal text-white">
                ${(financialData?.projections?.next_quarter / 1000).toFixed(0)}K
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
              <span className="font-medium text-deep-blue">Next Year</span>
              <Badge className="bg-deep-blue text-white">
                ${(financialData?.projections?.next_year / 1000000).toFixed(1)}M
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
              <span className="font-medium text-deep-blue">5-Year Projection</span>
              <Badge className="bg-charcoal text-white">
                ${(financialData?.projections?.five_year / 1000000).toFixed(0)}M
              </Badge>
            </div>
          </div>
        </div>

        {/* Key Financial Ratios */}
        <div className="data-visualization">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-deep-blue">Key Financial Ratios</h3>
            <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white">
              <FileText className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
              <span className="font-medium text-deep-blue">Profit Margin</span>
              <Badge className="bg-teal text-white">{financialData?.key_ratios?.profit_margin}%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
              <span className="font-medium text-deep-blue">Debt/Equity Ratio</span>
              <Badge className="bg-deep-blue text-white">{financialData?.key_ratios?.debt_equity}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
              <span className="font-medium text-deep-blue">Current Ratio</span>
              <Badge className="bg-charcoal text-white">{financialData?.key_ratios?.current_ratio}</Badge>
            </div>
          </div>
        </div>

        {/* Budget Allocations */}
        <div className="data-visualization">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-deep-blue">Budget Allocations</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(financialData?.budget_allocations || {}).map(([allocation, value]) => (
              <div key={allocation} className="flex items-center justify-between p-3 bg-light-bg rounded-lg">
                <span className="font-medium text-deep-blue capitalize">{allocation}</span>
                <Badge className="bg-teal text-white">{(value as number) * 100}%</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

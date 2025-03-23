
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PerformanceData {
  [key: string]: any;
}

interface PerformanceOverviewProps {
  period: string;
  onPeriodChange: (period: string) => void;
  chartData: PerformanceData[];
  isLoading: boolean;
  onRefresh: () => void;
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({
  period,
  onPeriodChange,
  chartData,
  isLoading,
  onRefresh,
}) => {
  const getDataKey = () => {
    if (period === "year") return "year";
    if (period === "week") return "day";
    return "month";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Biểu đồ hiệu suất</CardTitle>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRefresh} 
            disabled={isLoading}
            className="h-8 w-8"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Tabs defaultValue="month" value={period} onValueChange={onPeriodChange} className="w-[250px]">
            <TabsList>
              <TabsTrigger value="week">Tuần</TabsTrigger>
              <TabsTrigger value="month">Tháng</TabsTrigger>
              <TabsTrigger value="year">Năm</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ChartContainer
            config={{
              profit: {
                label: "Profit",
                theme: {
                  light: "#10b981",
                  dark: "#34d399"
                }
              },
              loss: {
                label: "Loss",
                theme: {
                  light: "#ef4444",
                  dark: "#f87171"
                }
              },
              line: {
                label: "Performance Line",
                theme: {
                  light: "#60a5fa",
                  dark: "#3b82f6"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis 
                  dataKey={getDataKey()} 
                  className="text-xs font-medium" 
                />
                <YAxis className="text-xs font-medium" />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value: number) => [`${value.toFixed(2)}%`, 'Hiệu suất']}
                    />
                  } 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorPositive)" 
                  activeDot={{ r: 6 }} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;

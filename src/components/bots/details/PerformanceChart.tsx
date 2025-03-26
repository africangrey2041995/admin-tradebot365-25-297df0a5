
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface PerformanceChartProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  chartData: any[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  selectedPeriod, 
  onPeriodChange, 
  chartData 
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Biểu đồ hiệu suất</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant={selectedPeriod === "week" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => onPeriodChange("week")}
          >
            Tuần
          </Button>
          <Button 
            variant={selectedPeriod === "month" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => onPeriodChange("month")}
          >
            Tháng
          </Button>
          <Button 
            variant={selectedPeriod === "year" ? "secondary" : "outline"} 
            size="sm"
            onClick={() => onPeriodChange("year")}
          >
            Năm
          </Button>
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
                  dataKey={selectedPeriod === "year" ? "year" : (selectedPeriod === "week" ? "day" : "month")} 
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

export default React.memo(PerformanceChart);

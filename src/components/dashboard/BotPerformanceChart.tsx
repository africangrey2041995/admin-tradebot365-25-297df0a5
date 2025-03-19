
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { ChartLine, TrendingUp } from 'lucide-react';

interface BotPerformanceProps {
  data: {
    weekly: PerformanceData[];
    monthly: PerformanceData[];
    yearly: PerformanceData[];
  };
}

type PerformanceData = {
  name: string;
  value: number;
};

const BotPerformanceChart = ({ data }: BotPerformanceProps) => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const getChartData = () => {
    return data[timeframe] || [];
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400">
            <ChartLine className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg font-medium">Hiệu Suất Bot</CardTitle>
        </div>
        <Tabs 
          value={timeframe} 
          onValueChange={(value) => setTimeframe(value as 'weekly' | 'monthly' | 'yearly')}
          className="w-[250px]"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="weekly">Tuần</TabsTrigger>
            <TabsTrigger value="monthly">Tháng</TabsTrigger>
            <TabsTrigger value="yearly">Năm</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] mt-4">
          <ChartContainer
            config={{
              profit: {
                label: "Lợi nhuận",
                theme: {
                  light: "#10b981",
                  dark: "#34d399"
                }
              },
              loss: {
                label: "Lỗ",
                theme: {
                  light: "#ef4444",
                  dark: "#f87171"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={getChartData()}
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
                <XAxis dataKey="name" className="text-xs font-medium" />
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
                  stroke={(d) => (d && d.value >= 0) ? "#10b981" : "#ef4444"} 
                  fillOpacity={1} 
                  fill="url(#colorPositive)" 
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg border border-slate-100 dark:border-zinc-700">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-slate-500">Hiệu suất trung bình</span>
            </div>
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              +12.5%
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg border border-slate-100 dark:border-zinc-700">
            <div className="flex items-center gap-2 mb-1">
              <ChartLine className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-500">Tổng bot hoạt động</span>
            </div>
            <div className="text-2xl font-semibold text-slate-800 dark:text-white">
              8
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotPerformanceChart;

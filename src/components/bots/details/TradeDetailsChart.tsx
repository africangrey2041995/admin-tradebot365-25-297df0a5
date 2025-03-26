
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

interface TradeDetailsChartProps {
  tradePerformanceData: any[];
  statisticsData: any[];
}

const TradeDetailsChart: React.FC<TradeDetailsChartProps> = ({ 
  tradePerformanceData, 
  statisticsData 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chi tiết giao dịch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ChartContainer
            config={{
              profit: {
                label: "Profit",
                theme: {
                  light: "#10b981",
                  dark: "#34d399"
                }
              },
              trades: {
                label: "Trades",
                theme: {
                  light: "#60a5fa",
                  dark: "#3b82f6"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={tradePerformanceData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                <XAxis dataKey="name" scale="band" />
                <YAxis yAxisId="left" label={{ value: 'Profit (%)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Trades', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="right" dataKey="trades" fill="#3b82f6" barSize={20} />
                <Area yAxisId="left" type="monotone" dataKey="profit" fill="#34d399" stroke="#10b981" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 mb-2">
          {statisticsData.map((stat, index) => (
            <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 dark:bg-zinc-800/50 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {stat.icon}
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.name}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(TradeDetailsChart);

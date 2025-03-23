
import { Activity, TrendingUp, LineChart, PieChart } from 'lucide-react';
import React from 'react';

interface StatData {
  name: string;
  value: string;
  icon: React.ReactNode;
}

interface TradeData {
  name: string;
  profit: number;
  trades: number;
}

export const useBotStatistics = () => {
  const tradePerformanceData: TradeData[] = [
    { name: 'Jan', profit: 12.5, trades: 24 },
    { name: 'Feb', profit: 8.3, trades: 18 },
    { name: 'Mar', profit: -2.1, trades: 15 },
    { name: 'Apr', profit: 5.7, trades: 17 },
    { name: 'May', profit: 15.2, trades: 29 },
    { name: 'Jun', profit: 10.1, trades: 22 },
    { name: 'Jul', profit: 5.5, trades: 20 },
    { name: 'Aug', profit: -3.2, trades: 16 },
    { name: 'Sep', profit: 9.8, trades: 21 },
    { name: 'Oct', profit: 18.5, trades: 28 },
  ];

  const statisticsData: StatData[] = [
    { 
      name: 'Win Rate', 
      value: '65%', 
      icon: <Activity className="h-4 w-4 text-green-500" /> 
    },
    { 
      name: 'Avg Profit', 
      value: '2.7%', 
      icon: <TrendingUp className="h-4 w-4 text-green-500" /> 
    },
    { 
      name: 'Max Drawdown', 
      value: '8.5%', 
      icon: <LineChart className="h-4 w-4 text-red-500" /> 
    },
    { 
      name: 'Sharp Ratio', 
      value: '1.8', 
      icon: <PieChart className="h-4 w-4 text-blue-500" /> 
    },
  ];

  return {
    tradePerformanceData,
    statisticsData
  };
};


import { useState } from 'react';
import { Activity, TrendingUp, LineChart, PieChart } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

export const usePremiumBotDetail = (botId: string | undefined, userId: string) => {
  const [refreshLoading, setRefreshLoading] = useState(false);

  // Simple mock statistics data
  const statisticsData = [
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

  // Simple mock trade performance data
  const tradePerformanceData = [
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

  const refreshTabData = () => {
    setRefreshLoading(true);
    // Simulate API call with a timer
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success('Đã làm mới dữ liệu');
    }, 1000);
  };

  return {
    tradePerformanceData,
    statisticsData,
    refreshLoading,
    refreshTabData
  };
};

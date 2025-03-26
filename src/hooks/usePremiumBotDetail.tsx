
import { useState } from 'react';
import { Activity, TrendingUp, LineChart, PieChart } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { BotType, BotRiskLevel } from '@/constants/botTypes';

// Create a basic PremiumBot type for the hook
interface PremiumBot {
  id: string;
  botId: string;
  name: string;
  description: string;
  longDescription?: string;
  type: string;
  exchange: string;
  minCapital: string;
  risk: BotRiskLevel;
  performanceLastMonth: string;
  performanceAllTime: string;
  subscribers: number;
  features: string[];
  pairs: string[];
  createdDate: string;
  lastUpdated: string;
  status: 'active' | 'inactive';
}

export const usePremiumBotDetail = (botId: string | undefined, userId: string) => {
  // Basic states
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("1m");
  
  // Find bot by ID - mocked for now
  const mockBot: PremiumBot = {
    id: botId || '',
    botId: `PRE${Math.floor(Math.random() * 10000)}`,
    name: "Alpha Momentum",
    description: "Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.",
    longDescription: "Alpha Momentum Bot là một bot giao dịch tiên tiến sử dụng chiến lược momentum để giao dịch các cặp tiền điện tử.",
    type: BotType.PREMIUM_BOT,
    exchange: "Coinstart Pro",
    minCapital: "$500",
    risk: BotRiskLevel.MEDIUM,
    performanceLastMonth: "+18.5%",
    performanceAllTime: "+125.4%",
    subscribers: 86,
    features: [
      'Phân tích động lượng',
      'Bộ lọc tin hiệu',
      'Quản lý rủi ro'
    ],
    pairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'],
    createdDate: "2023-04-15",
    lastUpdated: "2023-10-01",
    status: 'active'
  };

  // Mock data
  const chartData = [
    { date: '2023-01-01', value: 12.5 },
    { date: '2023-02-01', value: 8.3 },
    { date: '2023-03-01', value: -2.1 },
    { date: '2023-04-01', value: 5.7 },
    { date: '2023-05-01', value: 15.2 },
  ];

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
  
  // Mock accounts data for admin section
  const accounts = [];
  const uniqueUsers = 24;
  const tradingAccountsCount = 38;
  const processedSignalsCount = 458;
  const tradingViewLogs = [];
  const coinstratLogs = [];
  const logsLoading = false;
  const availableUsers = [];

  const refreshTabData = () => {
    setRefreshLoading(true);
    // Simulate API call with a timer
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success('Đã làm mới dữ liệu');
    }, 1000);
  };

  // Admin-specific handlers
  const refreshAccounts = () => toast.success('Refreshed accounts');
  const handleEditAccount = () => toast.success('Edit account');
  const handleDeleteAccount = () => toast.success('Delete account');
  const handleToggleConnection = () => toast.success('Toggle connection');
  const handleUpdateDescription = () => toast.success('Update description');
  const handleUpdateTradingPairs = () => toast.success('Update trading pairs');
  const handleUpdateFeatures = () => toast.success('Update features');
  const handleUpdateStatistics = () => toast.success('Update statistics');
  const handleUpdateBotInfo = () => toast.success('Update bot info');
  const refreshSignalLogs = () => toast.success('Refresh signal logs');

  return {
    // Basic data
    tradePerformanceData,
    statisticsData,
    refreshLoading,
    refreshTabData,
    
    // Page states
    isLoading,
    isAuthorized,
    activeTab,
    setActiveTab,
    selectedPeriod,
    setSelectedPeriod,
    chartData,
    
    // Bot data
    bot: mockBot,
    
    // Admin-specific data
    accounts,
    uniqueUsers,
    tradingAccountsCount,
    processedSignalsCount,
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
    
    // Admin-specific handlers
    refreshAccounts,
    handleEditAccount,
    handleDeleteAccount,
    handleToggleConnection,
    handleUpdateDescription,
    handleUpdateTradingPairs,
    handleUpdateFeatures,
    handleUpdateStatistics,
    handleUpdateBotInfo,
    refreshSignalLogs
  };
};

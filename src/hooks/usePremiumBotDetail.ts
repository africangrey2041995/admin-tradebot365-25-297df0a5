
import { useState } from 'react';
import { toast } from 'sonner';
import { useBotAuthorization } from '@/hooks/useBotAuthorization';
import { useChartData } from '@/hooks/useChartData';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { Account } from '@/types';

export const usePremiumBotDetail = (botId: string | undefined, userId: string) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [refreshLoading, setRefreshLoading] = useState(false);
  
  // Use the existing hooks for bot authorization, chart data, and statistics
  const { isLoading, isAuthorized, bot } = useBotAuthorization({ 
    botId, 
    userId
  });
  
  const { selectedPeriod, setSelectedPeriod, chartData } = useChartData();
  const { tradePerformanceData, statisticsData } = useBotStatistics();
  
  // Get accounts data using the useBotAccounts hook
  const { accounts: accountsData = [] } = useBotAccounts(botId || '', userId);

  const refreshTabData = () => {
    setRefreshLoading(true);
    // Simulate API call with a timer
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "connected-accounts" ? "Tài khoản kết nối" : "Coinstrat Logs"
      }`);
    }, 1000);
  };

  return {
    activeTab,
    setActiveTab,
    refreshLoading,
    isLoading,
    isAuthorized,
    bot,
    selectedPeriod,
    setSelectedPeriod,
    chartData,
    tradePerformanceData,
    statisticsData,
    refreshTabData,
    accountsData
  };
};

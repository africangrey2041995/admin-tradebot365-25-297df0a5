
import { useState } from 'react';
import { toast } from 'sonner';
import { useBotAuthorization } from '@/hooks/useBotAuthorization';
import { useChartData } from '@/hooks/useChartData';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { Account } from '@/types';
import { PremiumBot } from '@/types/bot';

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

  // Use the combined signal logs hook
  const {
    tradingViewLogs,
    coinstratLogs,
    loading: logsLoading,
    availableUsers,
    refreshLogs: refreshSignalLogs
  } = useCombinedSignalLogs({
    botId: botId || '',
    userId
  });

  // Use the bot accounts hook
  const {
    accounts,
    handleRefresh: refreshAccounts,
    updateAccount,
    deleteAccount,
    toggleAccountStatus
  } = useBotAccounts(botId || '', userId);

  // Calculate statistics
  const uniqueUsers = (() => {
    const userIds = new Set(accounts.map(account => account.cspUserId));
    return userIds.size;
  })();

  const tradingAccountsCount = accounts.length;
  
  const processedSignalsCount = coinstratLogs.length;

  const refreshTabData = () => {
    setRefreshLoading(true);
    // Simulate API call with a timer
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "accounts" ? "Tài khoản kết nối" : "Signal Tracking"
      }`);
    }, 1000);
  };

  // Account management handlers
  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    toast.info(`Editing account: ${account.cspAccountName}`);
    updateAccount(account);
  };
  
  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    toast.info(`Deleting account: ${accountId}`);
    deleteAccount(accountId);
  };
  
  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    toggleAccountStatus(accountId);
  };

  // Handle update bot description
  const handleUpdateDescription = (description: string) => {
    toast.success("Bot description updated");
    console.log("Updated description:", description);
  };

  // Handle update trading pairs
  const handleUpdateTradingPairs = (pairs: string[]) => {
    toast.success("Trading pairs updated");
    console.log("Updated pairs:", pairs);
  };

  // Handle update features
  const handleUpdateFeatures = (features: string[]) => {
    toast.success("Bot features updated");
    console.log("Updated features:", features);
  };

  // Handle update statistics
  const handleUpdateStatistics = (updatedStats: { name: string; value: string; icon: React.ReactNode }[]) => {
    toast.success("Bot statistics updated");
    console.log("Updated statistics:", updatedStats);
  };

  // Handle update bot information
  const handleUpdateBotInfo = (info: {
    type: string;
    exchange: string;
    minCapital: string;
  }) => {
    toast.success("Bot information updated");
    console.log("Updated bot information:", info);
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
    accounts,
    uniqueUsers,
    tradingAccountsCount,
    processedSignalsCount,
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
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

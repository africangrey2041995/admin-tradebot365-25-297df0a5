
import { useBotAuthorization } from '@/hooks/useBotAuthorization';
import { useChartData } from '@/hooks/useChartData';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useTabManagement } from './useTabManagement';
import { useUserManagement } from './useUserManagement';
import { useContentManagement } from './useContentManagement';
import { useSignalManagement } from './useSignalManagement';
import { useRefreshData } from './useRefreshData';

/**
 * Main hook for Premium Bot detail pages
 * Combines multiple smaller hooks while maintaining the same API
 */
export const usePremiumBotDetail = (botId: string | undefined, userId: string) => {
  // Basic tab and refresh state management
  const {
    activeTab,
    setActiveTab,
    selectedPeriod,
    setSelectedPeriod,
    refreshLoading,
    startRefresh,
    stopRefresh
  } = useTabManagement();
  
  // Bot authorization, chart data, and statistics
  const { isLoading, isAuthorized, bot } = useBotAuthorization({ 
    botId, 
    userId
  });
  
  const { chartData } = useChartData();
  const { tradePerformanceData, statisticsData } = useBotStatistics();

  // User account management
  const {
    accounts,
    uniqueUsers,
    tradingAccountsCount,
    refreshAccounts,
    handleEditAccount,
    handleDeleteAccount,
    handleToggleConnection
  } = useUserManagement(botId || '', userId);

  // Signal logs management
  const {
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
    processedSignalsCount,
    refreshSignalLogs
  } = useSignalManagement(botId || '', userId);

  // Content update handlers
  const {
    handleUpdateDescription,
    handleUpdateTradingPairs,
    handleUpdateFeatures,
    handleUpdateStatistics,
    handleUpdateBotInfo
  } = useContentManagement();

  // Unified refresh function
  const { refreshTabData } = useRefreshData({
    startRefresh,
    stopRefresh,
    activeTab,
    refreshAccounts,
    refreshSignalLogs
  });

  // Return the exact same structure as the original hook
  // to maintain backward compatibility
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

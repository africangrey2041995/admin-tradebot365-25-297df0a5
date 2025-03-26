
import { useCallback } from 'react';
import { toast } from 'sonner';

interface UseRefreshDataProps {
  startRefresh: () => void;
  stopRefresh: () => void;
  activeTab: string;
  refreshAccounts?: () => void;
  refreshSignalLogs?: () => void;
}

export const useRefreshData = ({
  startRefresh,
  stopRefresh,
  activeTab,
  refreshAccounts,
  refreshSignalLogs
}: UseRefreshDataProps) => {
  
  const refreshTabData = useCallback(() => {
    startRefresh();
    
    // Determine which refresh function to call based on active tab
    if (activeTab === "connected-accounts" && refreshAccounts) {
      refreshAccounts();
    } else if (activeTab === "signal-tracking" && refreshSignalLogs) {
      refreshSignalLogs();
    }
    
    // Simulate API call with a timer
    setTimeout(() => {
      stopRefresh();
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "connected-accounts" ? "Tài khoản kết nối" : "Signal Tracking"
      }`);
    }, 1000);
  }, [activeTab, refreshAccounts, refreshSignalLogs, startRefresh, stopRefresh]);

  return {
    refreshTabData
  };
};

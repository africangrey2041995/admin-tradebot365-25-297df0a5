
import { useCallback, useRef } from 'react';
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
  
  // Add a ref to track last refresh time per tab
  const lastTabRefreshTimeRef = useRef<Record<string, number>>({});
  
  const refreshTabData = useCallback(() => {
    const now = Date.now();
    const lastRefreshForTab = lastTabRefreshTimeRef.current[activeTab] || 0;
    
    // Prevent refreshing if last refresh for this tab was less than 2 seconds ago
    if (now - lastRefreshForTab < 2000) {
      return;
    }
    
    // Update the last refresh time for this tab
    lastTabRefreshTimeRef.current[activeTab] = now;
    
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


import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import AdvancedSignalFilter from '@/components/bots/trading-view-logs/AdvancedSignalFilter';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import { useSignalFilters } from './useSignalFilters';
import { AlertTriangle } from 'lucide-react';

interface SignalTrackingTabProps {
  botId: string;
  userId: string;
  isAdminView?: boolean;
}

const SignalTrackingTab: React.FC<SignalTrackingTabProps> = ({
  botId,
  userId,
  isAdminView = false
}) => {
  // Use the combined logs hook to fetch both types of logs
  const {
    tradingViewLogs,
    coinstratLogs,
    loading,
    error,
    refreshLogs,
    availableUsers
  } = useCombinedSignalLogs({
    botId,
    userId
  });

  // Use our filter hook to handle log filtering
  const {
    filteredTradingViewLogs,
    filteredCoinstratLogs,
    handleFilterChange,
    errorStats
  } = useSignalFilters({
    tradingViewLogs,
    coinstratLogs
  });

  const handleRefresh = () => {
    refreshLogs();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="mb-2 flex items-center">
              {isAdminView ? "Signal Tracking (Admin)" : "Theo dõi tín hiệu giao dịch"}
              {errorStats.totalErrors > 0 && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {errorStats.totalErrors} lỗi
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Theo dõi hành trình tín hiệu từ TradingView đến các tài khoản giao dịch trên Coinstrat Pro
            </CardDescription>
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            className="min-w-[120px]"
          >
            {loading ? "Đang làm mới..." : "Làm mới"}
          </Button>
        </div>
        
        {/* Hiển thị thống kê lỗi chi tiết khi có lỗi */}
        {errorStats.totalErrors > 0 && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/20 rounded-md">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <h3 className="font-medium text-red-700 dark:text-red-300">Tổng quan lỗi</h3>
            </div>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-xs text-red-600 dark:text-red-400">Tổng lỗi</span>
                <span className="text-lg font-semibold text-red-700 dark:text-red-300">{errorStats.totalErrors}</span>
              </div>
              {errorStats.tradingViewErrors > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-red-600 dark:text-red-400">Lỗi TradingView</span>
                  <span className="text-lg font-semibold text-red-700 dark:text-red-300">{errorStats.tradingViewErrors}</span>
                </div>
              )}
              {errorStats.coinstratErrors > 0 && (
                <div className="flex flex-col">
                  <span className="text-xs text-red-600 dark:text-red-400">Lỗi Coinstrat Pro</span>
                  <span className="text-lg font-semibold text-red-700 dark:text-red-300">{errorStats.coinstratErrors}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Advanced filtering for signals */}
        <div className="mb-6">
          <AdvancedSignalFilter 
            onFilterChange={handleFilterChange} 
            availableUsers={isAdminView ? availableUsers : []}
            showExport={isAdminView}
          />
        </div>
        
        {/* Unified hierarchical signal view */}
        <UnifiedSignalView 
          tradingViewLogs={filteredTradingViewLogs} 
          coinstratLogs={filteredCoinstratLogs} 
          onRefresh={refreshLogs} 
          isLoading={loading} 
        />
      </CardContent>
    </Card>
  );
};

export default SignalTrackingTab;

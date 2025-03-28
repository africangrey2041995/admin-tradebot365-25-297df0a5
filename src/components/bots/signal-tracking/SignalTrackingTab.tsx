
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import { useSignalManagement } from '@/hooks/premium-bot/useSignalManagement';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { AdvancedSignalFilter } from '@/components/signals/tracking';
import SignalLoadingState from '@/components/signals/core/components/SignalLoadingState';

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
  console.log(`SignalTrackingTab rendered with botId: ${botId}, userId: ${userId}, isAdminView: ${isAdminView}`);
  
  const {
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
    refreshSignalLogs
  } = useSignalManagement(botId, userId);
  
  // Use a ref to track if initial load has happened
  const initialLoadRef = useRef(false);
  // Use a ref to prevent rapid successive refreshes
  const lastRefreshTimeRef = useRef(0);
  
  // Log the current state for debugging
  console.log(`SignalTrackingTab - tradingViewLogs: ${tradingViewLogs.length}, coinstratLogs: ${coinstratLogs.length}, logsLoading: ${logsLoading}`);
  
  // Only refresh on mount if we haven't loaded before
  useEffect(() => {
    // Only do the initial load once
    if (!initialLoadRef.current) {
      console.log('SignalTrackingTab - Performing initial load');
      initialLoadRef.current = true;
      refreshSignalLogs();
    }
  }, [refreshSignalLogs]);

  // Handler for manual refresh with cooldown
  const handleManualRefresh = () => {
    const now = Date.now();
    // Prevent refreshing if last refresh was less than 2 seconds ago
    if (now - lastRefreshTimeRef.current > 2000) {
      console.log('SignalTrackingTab - Manual refresh triggered');
      lastRefreshTimeRef.current = now;
      refreshSignalLogs();
    }
  };

  if (logsLoading && tradingViewLogs.length === 0 && coinstratLogs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <SignalLoadingState 
            message="Đang tải dữ liệu tín hiệu..."
            showProgress={true}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="mb-2">Signal Tracking</CardTitle>
            <CardDescription>
              Theo dõi hành trình tín hiệu từ TradingView đến các tài khoản giao dịch trên Coinstrat Pro
            </CardDescription>
          </div>
          <Button 
            onClick={handleManualRefresh}
            disabled={logsLoading}
            className="min-w-[120px]"
          >
            {logsLoading ? "Đang làm mới..." : "Làm mới"}
          </Button>
        </div>
        
        {/* Advanced filtering for signals */}
        <div className="mb-6">
          <AdvancedSignalFilter 
            onFilterChange={() => {/* Handle filter changes */}} 
            availableUsers={availableUsers}
            showExport={true}
            exportComponent={
              <ExportDataDropdown 
                data={[]} 
                headers={['ID', 'Signal', 'Action', 'Timestamp', 'Status']} 
                fileName={`bot-${botId}-signals`} 
              />
            }
          />
        </div>
        
        {/* Unified hierarchical signal view */}
        <UnifiedSignalView 
          tradingViewLogs={tradingViewLogs} 
          coinstratLogs={coinstratLogs} 
          onRefresh={handleManualRefresh} 
          isLoading={logsLoading} 
        />
      </CardContent>
    </Card>
  );
};

export default SignalTrackingTab;

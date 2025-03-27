
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import AdvancedSignalFilter from '@/components/bots/trading-view-logs/AdvancedSignalFilter';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import { useSignalFilters } from './useSignalFilters';

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

  // Use our new filter hook to handle log filtering
  const {
    filteredTradingViewLogs,
    filteredCoinstratLogs,
    handleFilterChange
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
            <CardTitle className="mb-2">
              {isAdminView ? "Signal Tracking (Admin)" : "Theo dõi tín hiệu giao dịch"}
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

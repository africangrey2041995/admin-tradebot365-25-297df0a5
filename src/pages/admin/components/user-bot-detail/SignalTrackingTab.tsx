
import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import AdvancedSignalFilter from '@/components/bots/trading-view-logs/AdvancedSignalFilter';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';

interface SignalTrackingTabProps {
  botId: string;
  userId: string;
  isAdminView?: boolean;
}

const SignalTrackingTab: React.FC<SignalTrackingTabProps> = ({
  botId,
  userId,
  isAdminView = true
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

  const handleRefresh = () => {
    refreshLogs();
  };

  // Prepare export data for signals
  const signalExportData = React.useMemo(() => {
    return coinstratLogs.map(log => [
      log.id,
      log.originalSignalId || '',
      log.instrument || '',
      log.action || '',
      new Date(log.timestamp).toLocaleString(),
      log.status || '',
      log.processedAccounts.length,
      log.failedAccounts.length,
      log.errorMessage || ''
    ]);
  }, [coinstratLogs]);

  const signalExportHeaders = [
    'ID',
    'Original Signal ID',
    'Symbol',
    'Action',
    'Timestamp',
    'Status',
    'Processed Accounts',
    'Failed Accounts',
    'Error Message'
  ];

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
            onFilterChange={() => {/* Handle filter changes */}} 
            availableUsers={availableUsers}
            showExport={true}
            exportComponent={
              <ExportDataDropdown 
                data={signalExportData} 
                headers={signalExportHeaders} 
                fileName={`user-bot-${botId}-signals`} 
              />
            }
          />
        </div>
        
        {/* Unified hierarchical signal view */}
        <UnifiedSignalView 
          tradingViewLogs={tradingViewLogs} 
          coinstratLogs={coinstratLogs} 
          onRefresh={refreshLogs} 
          isLoading={loading} 
        />
      </CardContent>
    </Card>
  );
};

export default SignalTrackingTab;

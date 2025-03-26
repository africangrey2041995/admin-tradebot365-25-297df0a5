
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import AdvancedSignalFilter from '@/components/bots/trading-view-logs/AdvancedSignalFilter';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

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

  // State for filtered logs
  const [filteredTradingViewLogs, setFilteredTradingViewLogs] = useState<TradingViewSignal[]>(tradingViewLogs);
  const [filteredCoinstratLogs, setFilteredCoinstratLogs] = useState<CoinstratSignal[]>(coinstratLogs);

  // Update filtered logs when original logs change
  React.useEffect(() => {
    setFilteredTradingViewLogs(tradingViewLogs);
    setFilteredCoinstratLogs(coinstratLogs);
  }, [tradingViewLogs, coinstratLogs]);

  const handleRefresh = () => {
    refreshLogs();
  };

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    console.log("Applying filters:", filters);
    
    // Filter TradingView logs
    const filteredTvLogs = tradingViewLogs.filter(log => {
      // Search text filter
      if (filters.search && !matchesSearchTerm(log, filters.search)) {
        return false;
      }
      
      // Signal source filter
      if (filters.signalSource !== 'all' && filters.signalSource !== 'tradingview') {
        return false;
      }
      
      // Status filter
      if (filters.status !== 'all') {
        const statusMatch = matchStatus(log.status, filters.status);
        if (!statusMatch) return false;
      }
      
      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const logDate = new Date(log.timestamp);
        if (filters.dateRange.from && logDate < filters.dateRange.from) return false;
        if (filters.dateRange.to) {
          // Add 1 day to the "to" date to include the selected end date
          const endDate = new Date(filters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          if (logDate > endDate) return false;
        }
      }
      
      return true;
    });
    
    // Filter Coinstrat logs
    const filteredCsLogs = coinstratLogs.filter(log => {
      // Search text filter
      if (filters.search && !matchesSearchTerm(log, filters.search)) {
        return false;
      }
      
      // Signal source filter
      if (filters.signalSource !== 'all' && filters.signalSource !== 'coinstrat') {
        return false;
      }
      
      // Status filter
      if (filters.status !== 'all') {
        const statusMatch = matchStatus(log.status, filters.status);
        if (!statusMatch) return false;
      }
      
      // User ID filter
      if (filters.userId && !matchesUserId(log, filters.userId)) {
        return false;
      }
      
      // Date range filter
      if (filters.dateRange.from || filters.dateRange.to) {
        const logDate = new Date(log.timestamp);
        if (filters.dateRange.from && logDate < filters.dateRange.from) return false;
        if (filters.dateRange.to) {
          // Add 1 day to the "to" date to include the selected end date
          const endDate = new Date(filters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          if (logDate > endDate) return false;
        }
      }
      
      return true;
    });
    
    setFilteredTradingViewLogs(filteredTvLogs);
    setFilteredCoinstratLogs(filteredCsLogs);
  };

  // Helper function to match search terms
  const matchesSearchTerm = (log: any, term: string): boolean => {
    const searchLower = term.toLowerCase();
    
    // Fields to search in
    const fieldsToSearch = [
      log.id,
      log.originalSignalId,
      log.instrument,
      log.action,
      log.status
    ];
    
    // For Coinstrat logs, search in account names too
    if (log.processedAccounts) {
      log.processedAccounts.forEach((account: any) => {
        fieldsToSearch.push(account.name);
      });
    }
    if (log.failedAccounts) {
      log.failedAccounts.forEach((account: any) => {
        fieldsToSearch.push(account.name);
      });
    }
    
    // Check if any field contains the search term
    return fieldsToSearch.some(field => 
      field && field.toString().toLowerCase().includes(searchLower)
    );
  };

  // Helper function to match user ID
  const matchesUserId = (log: CoinstratSignal, userId: string): boolean => {
    // Check processed accounts
    const processedMatch = log.processedAccounts.some(
      account => account.userId === userId
    );
    
    // Check failed accounts
    const failedMatch = log.failedAccounts.some(
      account => account.userId === userId
    );
    
    return processedMatch || failedMatch;
  };

  // Helper function to match status
  const matchStatus = (status: string | undefined, filterStatus: string): boolean => {
    if (!status) return false;
    
    const statusLower = status.toLowerCase();
    
    switch (filterStatus) {
      case 'success':
        return statusLower === 'processed' || statusLower === 'success';
      case 'failed':
        return statusLower === 'failed' || statusLower === 'error';
      case 'pending':
        return statusLower === 'pending' || statusLower === 'sent';
      default:
        return true;
    }
  };

  // Prepare export data for signals
  const signalExportData = React.useMemo(() => {
    return filteredCoinstratLogs.map(log => [
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
  }, [filteredCoinstratLogs]);

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
            onFilterChange={handleFilterChange} 
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

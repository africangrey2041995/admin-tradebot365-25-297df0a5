
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { CoinstratSignal } from '@/types/signal';
import SignalDetailModal from './signal-logs/SignalDetailModal';
import SignalLogsTable from './signal-logs/SignalLogsTable';
import LoadingSignalLogs from './signal-logs/LoadingSignalLogs';
import EmptySignalLogs from './signal-logs/EmptySignalLogs';
import ErrorState from './coinstrat-logs/ErrorState';
import { useCoinstratLogs } from './coinstrat-logs/useCoinstratLogs';
import LogsFilterBar from '@/components/admin/prop-bots/detail/LogsFilterBar';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';

interface CoinstratLogsProps {
  botId: string;
  userId: string;
  initialData?: CoinstratSignal[];
  signalSourceLabel?: string;
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  showFilters?: boolean;
  filters?: {
    search: string;
    status: string;
    time: string;
    accountId?: string;
    userId?: string;
    action?: string;
  };
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ 
  botId, 
  userId, 
  initialData = [],
  signalSourceLabel = "TradingView ID",
  refreshTrigger = false,
  botType = 'user',
  showFilters = true,
  filters
}) => {
  const { logs: allLogs, error, loading, fetchLogs } = useCoinstratLogs({
    botId,
    userId,
    initialData,
    refreshTrigger
  });
  
  const [selectedSignal, setSelectedSignal] = useState<CoinstratSignal | null>(null);
  const [signalDetailsOpen, setSignalDetailsOpen] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState<CoinstratSignal[]>([]);
  const [localFilters, setLocalFilters] = useState({ 
    search: filters?.search || '', 
    status: filters?.status || 'all', 
    time: filters?.time || 'all',
    ...(filters?.accountId && { accountId: filters.accountId }),
    ...(filters?.userId && { userId: filters.userId }),
    ...(filters?.action && { action: filters.action })
  });

  // Update local filters when external filters change
  useEffect(() => {
    if (filters) {
      setLocalFilters(prevFilters => ({
        ...prevFilters,
        ...filters
      }));
    }
  }, [filters]);

  // Initial filtering when logs or filters change
  useEffect(() => {
    applyFilters(localFilters);
  }, [allLogs, localFilters]);

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
  };

  const handleViewSignalDetails = (signal: CoinstratSignal) => {
    setSelectedSignal(signal);
    setSignalDetailsOpen(true);
  };

  const handleFilterChange = (newFilters: any) => {
    setLocalFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (newFilters: any) => {
    // Apply filters
    let filtered = [...allLogs];
    
    // Apply search filter
    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase();
      filtered = filtered.filter(log => 
        (log.originalSignalId?.toString().toLowerCase().includes(searchLower)) ||
        (log.instrument?.toLowerCase().includes(searchLower)) ||
        (log.action?.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply status filter
    if (newFilters.status !== 'all') {
      filtered = filtered.filter(log => log.status?.toLowerCase() === newFilters.status.toLowerCase());
    }
    
    // Apply time filter
    if (newFilters.time !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (newFilters.time) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'yesterday':
          startDate.setDate(now.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate;
      });
    }

    // Apply account filter if provided
    if (newFilters.accountId) {
      filtered = filtered.filter(log => {
        const hasProcessedAccount = log.processedAccounts.some(
          account => account.accountId === newFilters.accountId
        );
        const hasFailedAccount = log.failedAccounts.some(
          account => account.accountId === newFilters.accountId
        );
        return hasProcessedAccount || hasFailedAccount;
      });
    }

    // Apply user filter if provided (different from the main userId used for fetching)
    if (newFilters.userId) {
      filtered = filtered.filter(log => {
        const hasProcessedAccount = log.processedAccounts.some(
          account => account.userId === newFilters.userId
        );
        const hasFailedAccount = log.failedAccounts.some(
          account => account.userId === newFilters.userId
        );
        return hasProcessedAccount || hasFailedAccount;
      });
    }

    // Apply action filter if provided
    if (newFilters.action && newFilters.action !== 'all') {
      filtered = filtered.filter(log => 
        log.action.toLowerCase() === newFilters.action.toLowerCase()
      );
    }
    
    setFilteredLogs(filtered);
  };

  // Prepare logs for export
  const prepareLogsForExport = () => {
    return filteredLogs.map(log => ({
      'ID': log.originalSignalId || '',
      'Symbol': log.instrument || '',
      'Thời gian': new Date(log.timestamp).toLocaleString(),
      'Hành động': log.action || '',
      'Trạng thái': log.status || '',
      'Ghi chú': log.errorMessage || ''
    }));
  };

  const logsExportHeaders = ['ID', 'Symbol', 'Thời gian', 'Hành động', 'Trạng thái', 'Ghi chú'];

  if (loading) {
    return <LoadingSignalLogs />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  if (allLogs.length === 0) {
    return <EmptySignalLogs onRefresh={handleRefresh} botType={botType} />;
  }

  return (
    <div>
      {showFilters && (
        <LogsFilterBar 
          onFilterChange={handleFilterChange}
          showExport={true}
          exportComponent={
            <ExportDataDropdown 
              data={prepareLogsForExport()}
              headers={logsExportHeaders}
              fileName={`${botType}-bot-${botId}-logs`}
            />
          }
          filters={localFilters}
        />
      )}
      
      <SignalLogsTable
        logs={filteredLogs}
        userId={userId}
        onViewDetails={handleViewSignalDetails}
        signalSourceLabel={signalSourceLabel}
      />
      
      <div className="mt-4 flex justify-end">
        {!showFilters && (
          <ExportDataDropdown 
            data={prepareLogsForExport()}
            headers={logsExportHeaders}
            fileName={`${botType}-bot-${botId}-logs`}
          />
        )}
        <Button variant="outline" size="sm" onClick={handleRefresh} className="ml-2">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Logs
        </Button>
      </div>

      <SignalDetailModal 
        open={signalDetailsOpen}
        onOpenChange={setSignalDetailsOpen}
        signal={selectedSignal}
        userId={userId}
        botType={botType}
      />
    </div>
  );
};

export default CoinstratLogs;

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
import { LogsFilterBar } from '@/components/admin/prop-bots/detail/LogsFilterBar';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';

interface CoinstratLogsProps {
  botId: string;
  userId: string;
  initialData?: CoinstratSignal[];
  signalSourceLabel?: string;
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  showFilters?: boolean;
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ 
  botId, 
  userId, 
  initialData = [],
  signalSourceLabel = "TradingView ID",
  refreshTrigger = false,
  botType = 'user',
  showFilters = true
}) => {
  const [selectedSignal, setSelectedSignal] = useState<CoinstratSignal | null>(null);
  const [signalDetailsOpen, setSignalDetailsOpen] = useState(false);
  const [filteredLogs, setFilteredLogs] = useState<CoinstratSignal[]>([]);
  const [filters, setFilters] = useState({ search: '', status: 'all', time: 'all', accountId: '', userId: '', action: 'all' });

  const { logs: allLogs, error, loading, fetchLogs } = useCoinstratLogs({
    botId,
    userId,
    initialData,
    refreshTrigger
  });

  useEffect(() => {
    setFilteredLogs(allLogs);
  }, [allLogs]);

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
  };

  const handleViewSignalDetails = (signal: CoinstratSignal) => {
    setSelectedSignal(signal);
    setSignalDetailsOpen(true);
  };

  const handleFilterChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    let filtered = [...allLogs];
    
    if (updatedFilters.search) {
      const searchLower = updatedFilters.search.toLowerCase();
      filtered = filtered.filter(log => 
        (log.originalSignalId?.toString().toLowerCase().includes(searchLower)) ||
        (log.instrument?.toLowerCase().includes(searchLower)) ||
        (log.action?.toLowerCase().includes(searchLower))
      );
    }
    
    if (updatedFilters.status !== 'all') {
      filtered = filtered.filter(log => log.status?.toLowerCase() === updatedFilters.status.toLowerCase());
    }
    
    if (updatedFilters.time !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (updatedFilters.time) {
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
    
    setFilteredLogs(filtered);
  };

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
          filters={filters}
          showExport={true}
          exportComponent={
            <ExportDataDropdown 
              data={prepareLogsForExport()}
              headers={logsExportHeaders}
              fileName={`${botType}-bot-${botId}-logs`}
            />
          }
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

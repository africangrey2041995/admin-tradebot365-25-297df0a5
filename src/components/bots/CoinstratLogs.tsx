
import React, { useState } from 'react';
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
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';

interface CoinstratLogsProps {
  botId: string;
  userId: string;
  initialData?: CoinstratSignal[];
  signalSourceLabel?: string;
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  showFilters?: boolean;
  // Props for consolidated state management
  filteredLogs?: CoinstratSignal[];
  onSignalSelect?: (signal: CoinstratSignal) => void;
  onRefreshRequest?: () => void;
  // External loading state prop
  isLoading?: boolean;
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ 
  botId, 
  userId, 
  initialData = [],
  signalSourceLabel = "TradingView ID",
  refreshTrigger = false,
  botType = 'user',
  showFilters = true,
  // Use filtered logs from parent if provided
  filteredLogs: externalFilteredLogs,
  onSignalSelect,
  onRefreshRequest,
  // Use external loading state if provided
  isLoading: externalLoading
}) => {
  // Local state for signal details modal
  const [selectedSignal, setSelectedSignal] = useState<CoinstratSignal | null>(null);
  const [signalDetailsOpen, setSignalDetailsOpen] = useState(false);
  
  // Use the hook to fetch logs data - parent component can control this via refreshTrigger
  const { logs: allLogs, error, loading: internalLoading, fetchLogs } = useCoinstratLogs({
    botId,
    userId,
    initialData,
    refreshTrigger,
    skipLoadingState: externalLoading !== undefined // Skip internal loading if external loading is provided
  });

  // Use external loading state if provided, otherwise use internal loading state
  const loading = externalLoading !== undefined ? externalLoading : internalLoading;

  // Determine which logs to display - either from parent (if provided) or all logs from hook
  const displayLogs = externalFilteredLogs || allLogs;

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
    if (onRefreshRequest) {
      onRefreshRequest();
    }
  };

  const handleViewSignalDetails = (signal: CoinstratSignal) => {
    setSelectedSignal(signal);
    setSignalDetailsOpen(true);
    if (onSignalSelect) {
      onSignalSelect(signal);
    }
  };

  // Prepare logs for export
  const prepareLogsForExport = () => {
    return displayLogs.map(log => ({
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
    return <LoadingSignalLogs botType={botType} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleRefresh} />;
  }

  if (allLogs.length === 0) {
    return <EmptySignalLogs onRefresh={handleRefresh} botType={botType} />;
  }

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-300">
      <SignalLogsTable
        logs={displayLogs}
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

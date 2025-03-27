
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

export interface UseSignalLogsOptions {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  initialData?: any[];
  skipLoadingState?: boolean;
}

export interface UseSignalLogsResult<T> {
  logs: T[];
  loading: boolean;
  error: Error | null;
  fetchLogs: () => void;
}

export interface SignalFilters {
  search: string;
  signalSource: 'all' | 'tradingview' | 'coinstrat';
  status: 'all' | 'success' | 'failed' | 'pending';
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  userId: string;
}

export interface UseCombinedSignalLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
}

export interface UseCombinedSignalLogsResult {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
  loading: boolean;
  error: Error | null;
  refreshLogs: () => void;
  availableUsers: { id: string; name: string }[];
}

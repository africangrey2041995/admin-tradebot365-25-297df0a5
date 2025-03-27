import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

/**
 * Common properties for all signal log hook props
 */
export interface BaseSignalLogsProps {
  botId?: string;
  userId?: string;
  refreshTrigger?: boolean;
  skipLoadingState?: boolean;
  initialData?: any[]; // Adding initialData property to fix type errors
}

/**
 * Props for the TradingView logs hook
 */
export interface TradingViewLogsProps extends BaseSignalLogsProps {
  initialData?: TradingViewSignal[];
}

/**
 * Props for the Coinstrat logs hook
 */
export interface CoinstratLogsProps extends BaseSignalLogsProps {
  initialData?: CoinstratSignal[];
}

/**
 * Common return type for signal log hooks
 */
export interface BaseSignalLogsResult<T> {
  logs: T[];
  loading: boolean;
  error: Error | null;
  fetchLogs: () => void;
}

/**
 * Return type for TradingView logs hook
 */
export interface TradingViewLogsResult extends BaseSignalLogsResult<TradingViewSignal> {}

/**
 * Return type for Coinstrat logs hook
 */
export interface CoinstratLogsResult extends BaseSignalLogsResult<CoinstratSignal> {}

/**
 * Props for the combined signal logs hook
 */
export interface CombinedSignalLogsProps extends BaseSignalLogsProps {}

/**
 * Return type for combined signal logs hook
 */
export interface CombinedSignalLogsResult {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
  loading: boolean;
  error: Error | null;
  refreshLogs: () => void;
  availableUsers: { id: string; name: string }[];
}

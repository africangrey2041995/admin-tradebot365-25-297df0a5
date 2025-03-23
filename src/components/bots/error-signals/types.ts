
import { ExtendedSignal } from '@/types';

export interface ErrorSignalsProps {
  botId?: string;
  limit?: number;
  userId?: string;
}

export interface ErrorSignalsTableProps {
  errorSignals: ExtendedSignal[];
  unreadErrors: Set<string>;
  onMarkAsRead: (signalId: string) => void;
  loading: boolean;
  onRefresh?: () => void;
  error?: Error | null;
}

export interface ErrorSignalRowProps {
  signal: ExtendedSignal;
  isUnread: boolean;
  onMarkAsRead: (signalId: string) => void;
}

// Re-export ExtendedSignal to make it available to components importing from this file
export { ExtendedSignal };

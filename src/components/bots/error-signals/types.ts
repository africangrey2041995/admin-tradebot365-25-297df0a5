
import { ExtendedSignal } from '@/types/signal';

export interface ErrorSignalsProps {
  botId?: string;
  limit?: number;
  userId?: string;
}

export interface ErrorSignalsTableProps {
  errorSignals: ExtendedSignal[];
  unreadErrors: Set<string>;
  onMarkAsRead: (signalId: string) => void;
  onMarkAllAsRead?: () => void; // Added this property as optional
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
export type { ExtendedSignal };

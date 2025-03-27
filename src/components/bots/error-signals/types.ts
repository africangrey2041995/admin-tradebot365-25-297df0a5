import { ExtendedSignal } from '@/types/signal';
import { BotType } from '@/constants/botTypes';

export interface ErrorSignalsProps {
  botId?: string;
  limit?: number;
  userId?: string;
  botType?: BotType;
}

export interface ErrorSignalsTableProps {
  errorSignals: ExtendedSignal[];
  unreadErrors: Set<string>;
  onMarkAsRead: (signalId: string) => void;
  onMarkAllAsRead?: () => void;
  loading: boolean;
  onRefresh?: () => void;
  error?: Error | null;
}

export interface ErrorSignalRowProps {
  signal: ExtendedSignal;
  isUnread: boolean;
  onMarkAsRead: (signalId: string) => void;
  onViewDetails?: (signalId: string) => void;
  isAdmin?: boolean;
}

export type { ExtendedSignal };

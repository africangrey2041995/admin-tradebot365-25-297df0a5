
import { ExtendedSignal } from '@/types/signal';

/**
 * Interface cho thống kê lỗi bot
 */
export interface BotErrorStats {
  total: number;
  premium: number;
  prop: number;
  user: number;
  timeframe?: 'day' | 'week' | 'month';
  startDate?: string;
  endDate?: string;
}

/**
 * Interface cho filter lỗi bot
 */
export interface BotErrorFilter {
  botType?: string;
  severity?: string;
  timeRange?: 'today' | 'thisWeek' | 'thisMonth' | 'custom';
  startDate?: string;
  endDate?: string;
  userId?: string;
  errorCode?: string;
  resolved?: boolean;
  search?: string;
}

/**
 * Interface cho props component BotErrorList 
 */
export interface BotErrorListProps {
  signals: ExtendedSignal[];
  isLoading: boolean;
  onRefresh: () => void;
  onViewDetails: (errorId: string) => void;
}

/**
 * Interface cho props component BotErrorSummary
 */
export interface BotErrorSummaryProps {
  stats: BotErrorStats;
  isLoading: boolean;
  onRefresh: () => void;
}

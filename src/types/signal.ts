
import { BotType } from '@/constants/botTypes';

export type SignalStatus = 'pending' | 'success' | 'failure' | 'partial';
export type SignalAction = 'buy' | 'sell' | 'close' | 'target' | 'stoploss' | 'error';

// Base signal interface
export interface BaseSignal {
  id: string;
  timestamp: string;
  status?: SignalStatus;
  botId?: string;
  botName?: string;
  userId?: string;
  instrument?: string;
  action?: SignalAction;
  errorMessage?: string;
  errorCode?: string;
  errorSeverity?: 'critical' | 'high' | 'medium' | 'low';
  botType?: BotType;
}

// TradingView specific signal
export interface TradingViewSignal extends BaseSignal {
  source: 'tradingview';
  timeframe?: string;
  indicator?: string;
  price?: string;
  amount?: string;
}

// Coinstrat specific signal
export interface CoinstratSignal extends BaseSignal {
  source: 'coinstrat';
  exchange?: string;
  tradingAccountId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  coinstratLogId?: string;
  orderType?: string;
  executionPrice?: string;
  amount?: string;
}

// Extended signal for all signal types (for use in UI components)
export interface ExtendedSignal extends BaseSignal {
  source?: 'tradingview' | 'coinstrat' | 'system';
  timeframe?: string;
  indicator?: string;
  price?: string;
  exchange?: string;
  tradingAccountId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  coinstratLogId?: string;
  orderType?: string;
  executionPrice?: string;
  amount?: string;
}

// Account signal status
export interface AccountSignalStatus {
  accountId: string;
  accountName: string;
  userId: string;
  balance?: string;
  status: SignalStatus;
  timestamp: string;
  message?: string;
  orderType?: string;
  executionPrice?: string;
  tradingFee?: string;
}

// Signal statistics
export interface SignalStats {
  totalSignals: number;
  successCount: number;
  failureCount: number;
  pendingCount: number;
  partialCount: number;
  successRate: string;
  averageExecutionTime: string;
  lastProcessed: string;
  bySource: Record<string, number>;
  byAction: Record<string, number>;
  byInstrument: Record<string, number>;
}

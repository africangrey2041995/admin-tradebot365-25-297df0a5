
import { BotType } from '@/constants/botTypes';

// Extend signal status to include the UI string variants as well
export type SignalStatus = 'pending' | 'success' | 'failure' | 'partial' | 'Processed' | 'Failed' | 'Pending' | 'Sent';

// Extend signal action to include both lowercase format and uppercase formats used in UI
export type SignalAction = 
  | 'buy' | 'sell' | 'close' | 'target' | 'stoploss' | 'error' 
  | 'BUY' | 'SELL' | 'ENTER_LONG' | 'EXIT_LONG' | 'ENTER_SHORT' | 'EXIT_SHORT' | 'SYSTEM';

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
  botType?: BotType | string; // Add string to allow for 'user', 'premium', 'prop', 'system'
  amount?: string; // Common field needed across types
}

// TradingView specific signal
export interface TradingViewSignal extends BaseSignal {
  source: 'tradingview' | 'TradingView';
  timeframe?: string;
  indicator?: string;
  price?: string;
  amount?: string;
  signalToken?: string; // Add for UI components
  maxLag?: string; // Add for UI components
  investmentType?: string; // Add for mock data
  accountName?: string; // Add for signal tracking
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
  originalSignalId?: string; // Add for UI components
  signalToken?: string; // Add for UI components
  maxLag?: string; // Add for UI components
  investmentType?: string; // Add for UI components
  processedAccounts: AccountSignalStatus[]; // Add for UI components
  failedAccounts: AccountSignalStatus[]; // Add for UI components
}

// Extended signal for all signal types (for use in UI components)
export interface ExtendedSignal extends BaseSignal {
  source?: 'tradingview' | 'coinstrat' | 'system' | 'TradingView';
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
  originalSignalId?: string;
  signalToken?: string;
  maxLag?: string;
  type?: string; // For error signals
  quantity?: string; // For error signals
  accountId?: string; // For error signals
  signal?: string; // For error signals
  // Additional fields
  processedAccounts?: AccountSignalStatus[];
  failedAccounts?: AccountSignalStatus[];
}

// Account signal status with enhanced properties
export interface AccountSignalStatus {
  accountId: string;
  accountName?: string; // Add more flexibility
  userId: string;
  name?: string; // Add this property for UI components
  balance?: string;
  status: SignalStatus | string;
  timestamp: string;
  message?: string;
  reason?: string; // Add for error handling
  errorCode?: string; // Add for error handling
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

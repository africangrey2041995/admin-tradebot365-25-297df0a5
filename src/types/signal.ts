/**
 * Định nghĩa các types liên quan đến Signal
 */

// Loại hành động tín hiệu
export type SignalAction = 'ENTER_LONG' | 'EXIT_LONG' | 'ENTER_SHORT' | 'EXIT_SHORT';

// Trạng thái tín hiệu
export type SignalStatus = 'Pending' | 'Processed' | 'Failed' | 'Expired' | 'Sent';

// Tín hiệu TradingView
export interface TradingViewSignal {
  id: string;
  action: SignalAction;
  instrument: string;
  timestamp: string;
  signalToken: string;
  maxLag: string;
  investmentType: string;
  amount: string;
  status: string | SignalStatus;
  errorMessage?: string;
  source?: string;
  processingTime?: string;
  accountId?: string;
  accountName?: string;
  coinstratSignalId?: string;
}

// Trạng thái xử lý tín hiệu cho từng tài khoản
export interface AccountSignalStatus {
  accountId: string;
  userId?: string;
  name: string;
  timestamp: string;
  reason?: string;
  errorCode?: string;
  status: 'success' | 'failed' | 'pending';
}

// Tín hiệu Coinstrat
export interface CoinstratSignal {
  id: string;
  originalSignalId: string;
  action: SignalAction;
  instrument: string;
  timestamp: string;
  signalToken: string;
  maxLag: string;
  investmentType: string;
  amount: string;
  status: string | SignalStatus;
  processedAccounts: AccountSignalStatus[];
  failedAccounts: AccountSignalStatus[];
  errorMessage?: string;
  botId?: string;
  botName?: string;
}

// Tín hiệu mở rộng với thông tin người dùng và tài khoản
export interface ExtendedSignal extends TradingViewSignal {
  userId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  botId?: string;
  botType?: string;
  botName?: string;
  exchange?: string;
  errorCode?: string;
  errorSeverity?: 'low' | 'medium' | 'high' | 'critical';
}

// Lịch sử giao dịch
export interface TradeHistory {
  id: string;
  signalId: string;
  botId: string;
  accountId: string;
  action: SignalAction;
  instrument: string;
  entryPrice?: string;
  exitPrice?: string;
  quantity: string;
  timestamp: string;
  pnl?: string;
  status: 'open' | 'closed' | 'cancelled';
  duration?: string;
}

// Kỹ thuật giao dịch
export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  timeframe: string;
  indicators: string[];
  entryConditions: string[];
  exitConditions: string[];
  riskManagement: string[];
}

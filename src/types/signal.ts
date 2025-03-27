
/**
 * Định nghĩa các types liên quan đến tín hiệu
 */

export interface Signal {
  id: string;
  type: 'buy' | 'sell' | 'error' | 'info';
  timestamp: string;
  instrument: string;
  quantity: string;
  action: string;
  price: string;
  signal: 'tradingview' | 'coinstratpro' | 'system';
  botId?: string;
  botName?: string;
  userId?: string;
  accountId?: string;
  status?: 'pending' | 'success' | 'failure' | 'partial';
}

export interface ErrorSignal extends Signal {
  type: 'error';
  errorMessage?: string;
  errorCode?: string;
  errorSeverity?: 'critical' | 'high' | 'medium' | 'low';
  errorResolution?: string;
  errorDetails?: Record<string, any>;
}

export interface ExtendedSignal extends Signal {
  errorMessage?: string;
  errorCode?: string;
  errorSeverity?: 'critical' | 'high' | 'medium' | 'low';
  errorDetails?: Record<string, any>;
  errorResolution?: string;
  botType?: string;
  metadata?: Record<string, any>;
}

export interface TradeSignal extends Signal {
  type: 'buy' | 'sell';
  tradeId?: string;
  entry?: string;
  stopLoss?: string;
  takeProfit?: string;
  risk?: string;
  strategy?: string;
  status: 'pending' | 'success' | 'failure' | 'partial';
  duration?: string;
  closedAt?: string;
  closedPrice?: string;
  pnl?: string;
  pnlPercent?: string;
}

export interface SignalFilters {
  botId?: string;
  userId?: string;
  accountId?: string;
  instrument?: string;
  startDate?: string;
  endDate?: string;
  status?: 'pending' | 'success' | 'failure' | 'partial';
  type?: 'buy' | 'sell' | 'error' | 'info';
  signal?: 'tradingview' | 'coinstratpro' | 'system';
}

export interface SignalStats {
  total: number;
  success: number;
  failure: number;
  pending: number;
  partial: number;
  buy: number;
  sell: number;
  error: number;
  info: number;
}


import { ExtendedSignal } from '@/types';
import { BotType } from '@/constants/botTypes';

// Current date
const now = new Date();

// Helper to generate dates in the past
const daysAgo = (days: number) => {
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Helper to generate random hours ago
const hoursAgo = (hours: number) => {
  const date = new Date(now);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

// Mock data for error signals
export const mockErrorSignals: ExtendedSignal[] = [
  // User bot errors - Connection errors
  {
    id: 'ERR-001',
    action: 'ENTER_LONG',
    instrument: 'BTC/USDT',
    timestamp: hoursAgo(2),
    signalToken: 'abc123',
    maxLag: '500',
    investmentType: 'crypto',
    amount: '0.05 BTC',
    status: 'Failed',
    errorMessage: 'Insufficient funds in account',
    botId: 'MY-001',
    botName: 'My Bitcoin Strategy',
    userId: 'USR-001',
    tradingAccount: 'Binance-Main',
    tradingAccountType: 'Spot',
    errorSeverity: 'high',
    botType: BotType.USER_BOT,
  },
  {
    id: 'ERR-002',
    action: 'EXIT_SHORT',
    instrument: 'ETH/USDT',
    timestamp: hoursAgo(5),
    signalToken: 'def456',
    maxLag: '600',
    investmentType: 'crypto',
    amount: '2 ETH',
    status: 'Failed',
    errorMessage: 'API key expired or invalid',
    botId: 'MY-002',
    botName: 'Ethereum Scalper',
    userId: 'USR-001',
    tradingAccount: 'Bybit-Demo',
    tradingAccountType: 'Futures',
    errorSeverity: 'critical',
    botType: BotType.USER_BOT,
  },
  
  // User bot errors - Market errors
  {
    id: 'ERR-003',
    action: 'ENTER_SHORT',
    instrument: 'SOL/USDT',
    timestamp: hoursAgo(6),
    signalToken: 'sol123',
    maxLag: '300',
    investmentType: 'crypto',
    amount: '10 SOL',
    status: 'Failed',
    errorMessage: 'Order rejected: Market volatility too high',
    botId: 'MY-003',
    botName: 'Solana Alpha',
    userId: 'USR-001',
    tradingAccount: 'Binance-Futures',
    tradingAccountType: 'Futures',
    errorSeverity: 'medium',
    botType: BotType.USER_BOT,
  },
  
  // User bot errors - Software errors
  {
    id: 'ERR-004',
    action: 'ENTER_LONG',
    instrument: 'ADA/USDT',
    timestamp: hoursAgo(12),
    signalToken: 'ada123',
    maxLag: '200',
    investmentType: 'crypto',
    amount: '100 ADA',
    status: 'Failed',
    errorMessage: 'TradingView webhook format invalid',
    botId: 'MY-004',
    botName: 'ADA Momentum',
    userId: 'USR-001',
    tradingAccount: 'Kraken-Main',
    tradingAccountType: 'Spot',
    errorSeverity: 'low',
    botType: BotType.USER_BOT,
  },
  
  // Premium bot errors - Connection errors
  {
    id: 'ERR-005',
    action: 'ENTER_SHORT',
    instrument: 'AAPL',
    timestamp: hoursAgo(10),
    signalToken: 'ghi789',
    maxLag: '300',
    investmentType: 'stock',
    amount: '10 shares',
    status: 'Failed',
    errorMessage: 'Market closed, order rejected',
    botId: 'PRE-001',
    botName: 'Alpha Momentum',
    userId: 'USR-001',
    tradingAccount: 'Interactive Brokers',
    tradingAccountType: 'Margin',
    errorSeverity: 'medium',
    botType: BotType.PREMIUM_BOT,
  },
  {
    id: 'ERR-006',
    action: 'EXIT_LONG',
    instrument: 'MSFT',
    timestamp: daysAgo(1),
    signalToken: 'jkl012',
    maxLag: '700',
    investmentType: 'stock',
    amount: '5 shares',
    status: 'Failed',
    errorMessage: 'Position not found or already closed',
    botId: 'PRE-002',
    botName: 'Gamma Grid',
    userId: 'USR-001',
    tradingAccount: 'TradingView',
    tradingAccountType: 'Paper',
    errorSeverity: 'low',
    botType: BotType.PREMIUM_BOT,
  },
  
  // Premium bot errors - Account errors
  {
    id: 'ERR-007',
    action: 'ENTER_LONG',
    instrument: 'TSLA',
    timestamp: hoursAgo(14),
    signalToken: 'tsla123',
    maxLag: '400',
    investmentType: 'stock',
    amount: '2 shares',
    status: 'Failed',
    errorMessage: 'Margin requirements not met',
    botId: 'PRE-003',
    botName: 'Tech Momentum',
    userId: 'USR-001',
    tradingAccount: 'Alpaca',
    tradingAccountType: 'Margin',
    errorSeverity: 'high',
    botType: BotType.PREMIUM_BOT,
  },
  
  // Premium bot errors - Software errors
  {
    id: 'ERR-008',
    action: 'EXIT_SHORT',
    instrument: 'QQQ',
    timestamp: daysAgo(2),
    signalToken: 'qqq123',
    maxLag: '350',
    investmentType: 'stock',
    amount: '3 shares',
    status: 'Failed',
    errorMessage: 'Strategy execution timeout',
    botId: 'PRE-004',
    botName: 'ETF Strategy',
    userId: 'USR-001',
    tradingAccount: 'TD Ameritrade',
    tradingAccountType: 'Margin',
    errorSeverity: 'medium',
    botType: BotType.PREMIUM_BOT,
  },
  
  // Prop trading bot errors - Connection errors
  {
    id: 'ERR-009',
    action: 'ENTER_LONG',
    instrument: 'EUR/USD',
    timestamp: hoursAgo(18),
    signalToken: 'mno345',
    maxLag: '400',
    investmentType: 'forex',
    amount: '1 lot',
    status: 'Failed',
    errorMessage: 'Maximum daily drawdown reached',
    botId: 'PROP-001',
    botName: 'Prop Master',
    userId: 'USR-001',
    tradingAccount: 'FTMO Challenge',
    tradingAccountType: 'Prop',
    errorSeverity: 'high',
    botType: BotType.PROP_BOT,
  },
  {
    id: 'ERR-010',
    action: 'EXIT_SHORT',
    instrument: 'GBP/JPY',
    timestamp: daysAgo(2),
    signalToken: 'pqr678',
    maxLag: '350',
    investmentType: 'forex',
    amount: '0.5 lot',
    status: 'Failed',
    errorMessage: 'Connection timeout, order not confirmed',
    botId: 'PROP-002',
    botName: 'FX Scalper Pro',
    userId: 'USR-001',
    tradingAccount: 'MFF Evaluation',
    tradingAccountType: 'Prop',
    errorSeverity: 'critical',
    botType: BotType.PROP_BOT,
  },
  
  // Prop trading bot errors - Account errors
  {
    id: 'ERR-011',
    action: 'ENTER_SHORT',
    instrument: 'USD/CAD',
    timestamp: hoursAgo(8),
    signalToken: 'usdcad123',
    maxLag: '250',
    investmentType: 'forex',
    amount: '0.75 lot',
    status: 'Failed',
    errorMessage: 'Account locked: Risk management violation',
    botId: 'PROP-003',
    botName: 'Forex Navigator',
    userId: 'USR-001',
    tradingAccount: 'Topstep',
    tradingAccountType: 'Prop',
    errorSeverity: 'critical',
    botType: BotType.PROP_BOT,
  },
  
  // Prop trading bot errors - Market errors
  {
    id: 'ERR-012',
    action: 'EXIT_LONG',
    instrument: 'AUD/USD',
    timestamp: daysAgo(1),
    signalToken: 'audusd123',
    maxLag: '300',
    investmentType: 'forex',
    amount: '0.25 lot',
    status: 'Failed',
    errorMessage: 'Slippage exceeded allowed limit',
    botId: 'PROP-004',
    botName: 'Aussie Trend',
    userId: 'USR-001',
    tradingAccount: 'FTMO Live',
    tradingAccountType: 'Prop',
    errorSeverity: 'high',
    botType: BotType.PROP_BOT,
  },
  
  // Additional signals for Admin user - User Bots
  {
    id: 'ERR-013',
    action: 'ENTER_LONG',
    instrument: 'SOL/USDT',
    timestamp: hoursAgo(4),
    signalToken: 'stu901',
    maxLag: '250',
    investmentType: 'crypto',
    amount: '50 SOL',
    status: 'Failed',
    errorMessage: 'Order rejected due to market volatility',
    botId: 'MY-005',
    botName: 'Solana DCA Bot',
    userId: 'ADMIN-001',
    tradingAccount: 'Binance-Pro',
    tradingAccountType: 'Spot',
    errorSeverity: 'medium',
    botType: BotType.USER_BOT,
  },
  
  // Additional signals for Admin user - Premium Bots
  {
    id: 'ERR-014',
    action: 'EXIT_LONG',
    instrument: 'BNB/USDT',
    timestamp: daysAgo(3),
    signalToken: 'vwx234',
    maxLag: '450',
    investmentType: 'crypto',
    amount: '2 BNB',
    status: 'Failed',
    errorMessage: 'Exchange API rate limit exceeded',
    botId: 'PRE-005',
    botName: 'Delta Hedge',
    userId: 'ADMIN-001',
    tradingAccount: 'Kraken-Main',
    tradingAccountType: 'Margin',
    errorSeverity: 'high',
    botType: BotType.PREMIUM_BOT,
  },
  
  // Additional signals for Admin user - Prop Bots
  {
    id: 'ERR-015',
    action: 'ENTER_SHORT',
    instrument: 'USD/JPY',
    timestamp: hoursAgo(7),
    signalToken: 'usdjpy123',
    maxLag: '300',
    investmentType: 'forex',
    amount: '0.5 lot',
    status: 'Failed',
    errorMessage: 'Breaking news stop: High impact economic event',
    botId: 'PROP-005',
    botName: 'Yen Master',
    userId: 'ADMIN-001',
    tradingAccount: 'MFF Phase 2',
    tradingAccountType: 'Prop',
    errorSeverity: 'medium',
    botType: BotType.PROP_BOT,
  },
  
  // Critical system-wide errors - Admin visibility
  {
    id: 'ERR-016',
    action: 'ENTER_LONG',
    instrument: 'System',
    timestamp: hoursAgo(1),
    signalToken: 'system123',
    maxLag: '100',
    investmentType: 'system',
    amount: 'N/A',
    status: 'Failed',
    errorMessage: 'Database connection failure: Signal storage unavailable',
    botId: 'SYSTEM-001',
    botName: 'Signal Processor',
    userId: 'ADMIN-001',
    tradingAccount: 'System',
    tradingAccountType: 'System',
    errorSeverity: 'critical',
    botType: 'SYSTEM',
  },
];

// Create a types.ts file to support the component
export interface ErrorSignalsProps {
  botId?: string;
  limit?: number;
}

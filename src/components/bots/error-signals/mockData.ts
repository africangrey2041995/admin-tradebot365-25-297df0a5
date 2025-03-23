
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
  // User bot errors
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
    botId: 'USER-BOT-001',
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
    botId: 'USER-BOT-002',
    botName: 'Ethereum Scalper',
    userId: 'USR-001',
    tradingAccount: 'Bybit-Demo',
    tradingAccountType: 'Futures',
    errorSeverity: 'critical',
    botType: BotType.USER_BOT,
  },
  
  // Premium bot errors
  {
    id: 'ERR-003',
    action: 'ENTER_SHORT',
    instrument: 'AAPL',
    timestamp: hoursAgo(10),
    signalToken: 'ghi789',
    maxLag: '300',
    investmentType: 'stock',
    amount: '10 shares',
    status: 'Failed',
    errorMessage: 'Market closed, order rejected',
    botId: 'PREMIUM-BOT-001',
    botName: 'Alpha Momentum',
    userId: 'USR-001',
    tradingAccount: 'Interactive Brokers',
    tradingAccountType: 'Margin',
    errorSeverity: 'medium',
    botType: BotType.PREMIUM_BOT,
  },
  {
    id: 'ERR-004',
    action: 'EXIT_LONG',
    instrument: 'MSFT',
    timestamp: daysAgo(1),
    signalToken: 'jkl012',
    maxLag: '700',
    investmentType: 'stock',
    amount: '5 shares',
    status: 'Failed',
    errorMessage: 'Position not found or already closed',
    botId: 'PREMIUM-BOT-002',
    botName: 'Gamma Grid',
    userId: 'USR-001',
    tradingAccount: 'TradingView',
    tradingAccountType: 'Paper',
    errorSeverity: 'low',
    botType: BotType.PREMIUM_BOT,
  },
  
  // Prop trading bot errors
  {
    id: 'ERR-005',
    action: 'ENTER_LONG',
    instrument: 'EUR/USD',
    timestamp: hoursAgo(18),
    signalToken: 'mno345',
    maxLag: '400',
    investmentType: 'forex',
    amount: '1 lot',
    status: 'Failed',
    errorMessage: 'Maximum daily drawdown reached',
    botId: 'PROP-BOT-001',
    botName: 'Prop Master',
    userId: 'USR-001',
    tradingAccount: 'FTMO Challenge',
    tradingAccountType: 'Prop',
    errorSeverity: 'high',
    botType: BotType.PROP_BOT,
  },
  {
    id: 'ERR-006',
    action: 'EXIT_SHORT',
    instrument: 'GBP/JPY',
    timestamp: daysAgo(2),
    signalToken: 'pqr678',
    maxLag: '350',
    investmentType: 'forex',
    amount: '0.5 lot',
    status: 'Failed',
    errorMessage: 'Connection timeout, order not confirmed',
    botId: 'PROP-BOT-002',
    botName: 'FX Scalper Pro',
    userId: 'USR-001',
    tradingAccount: 'MFF Evaluation',
    tradingAccountType: 'Prop',
    errorSeverity: 'critical',
    botType: BotType.PROP_BOT,
  },
  
  // Additional signals for Admin user
  {
    id: 'ERR-007',
    action: 'ENTER_LONG',
    instrument: 'SOL/USDT',
    timestamp: hoursAgo(4),
    signalToken: 'stu901',
    maxLag: '250',
    investmentType: 'crypto',
    amount: '50 SOL',
    status: 'Failed',
    errorMessage: 'Order rejected due to market volatility',
    botId: 'USER-BOT-003',
    botName: 'Solana DCA Bot',
    userId: 'ADMIN-001',
    tradingAccount: 'Binance-Pro',
    tradingAccountType: 'Spot',
    errorSeverity: 'medium',
    botType: BotType.USER_BOT,
  },
  {
    id: 'ERR-008',
    action: 'EXIT_LONG',
    instrument: 'BNB/USDT',
    timestamp: daysAgo(3),
    signalToken: 'vwx234',
    maxLag: '450',
    investmentType: 'crypto',
    amount: '2 BNB',
    status: 'Failed',
    errorMessage: 'Exchange API rate limit exceeded',
    botId: 'PREMIUM-BOT-004',
    botName: 'Delta Hedge',
    userId: 'ADMIN-001',
    tradingAccount: 'Kraken-Main',
    tradingAccountType: 'Margin',
    errorSeverity: 'high',
    botType: BotType.PREMIUM_BOT,
  },
];

// Create a types.ts file to support the component
export interface ErrorSignalsProps {
  botId?: string;
  limit?: number;
}

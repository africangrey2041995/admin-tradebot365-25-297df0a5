
import { ExtendedSignal } from '@/types';
import { BotType } from '@/constants/botTypes';
import { daysAgo, hoursAgo, generateCoinstratLogId, generateAccountId } from './utils';

// Mock data for USER_BOT error signals
export const userBotErrors: ExtendedSignal[] = [
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
    userId: 'USR-001', // User who created this bot
    tradingAccount: 'Binance-Main',
    tradingAccountType: 'Spot',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '2500',
    errorSeverity: 'high',
    botType: BotType.USER_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-001', // User who created this bot
    tradingAccount: 'Bybit-Demo',
    tradingAccountType: 'Futures',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '5000',
    errorSeverity: 'critical',
    botType: BotType.USER_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-002', // User who created this bot (different user)
    tradingAccount: 'Binance-Futures',
    tradingAccountType: 'Futures',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '3200',
    errorSeverity: 'medium',
    botType: BotType.USER_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-003', // User who created this bot (different user)
    tradingAccount: 'Kraken-Main',
    tradingAccountType: 'Spot',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '1800',
    errorSeverity: 'low',
    botType: BotType.USER_BOT,
    coinstratLogId: generateCoinstratLogId(),
  }
];

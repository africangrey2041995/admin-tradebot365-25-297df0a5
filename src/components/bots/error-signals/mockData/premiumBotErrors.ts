
import { ExtendedSignal } from '@/types';
import { BotType } from '@/constants/botTypes';
import { daysAgo, hoursAgo, generateCoinstratLogId, generateAccountId } from './utils';

// Mock data for PREMIUM_BOT error signals
export const premiumBotErrors: ExtendedSignal[] = [
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
    userId: 'USR-001', // Bot owner
    connectedUserIds: ['USR-001', 'USR-003'], // Users with trading accounts connected
    tradingAccount: 'Interactive Brokers',
    tradingAccountType: 'Margin',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '10000',
    errorSeverity: 'medium',
    botType: BotType.PREMIUM_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-002', // Bot owner
    connectedUserIds: ['USR-001', 'USR-004'], // Users with trading accounts connected
    tradingAccount: 'TradingView',
    tradingAccountType: 'Paper',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '25000',
    errorSeverity: 'low',
    botType: BotType.PREMIUM_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-003', // Bot owner
    connectedUserIds: ['USR-002', 'USR-005'], // Users with trading accounts connected
    tradingAccount: 'Alpaca',
    tradingAccountType: 'Margin',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '8000',
    errorSeverity: 'high',
    botType: BotType.PREMIUM_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-004', // Bot owner
    connectedUserIds: ['USR-001', 'USR-003'], // Users with trading accounts connected
    tradingAccount: 'TD Ameritrade',
    tradingAccountType: 'Margin',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '12000',
    errorSeverity: 'medium',
    botType: BotType.PREMIUM_BOT,
    coinstratLogId: generateCoinstratLogId(),
  }
];

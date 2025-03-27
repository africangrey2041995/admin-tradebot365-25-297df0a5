
import { ExtendedSignal } from '@/types';
import { BotType } from '@/constants/botTypes';
import { daysAgo, hoursAgo, generateCoinstratLogId, generateAccountId } from './utils';

// Mock data for PROP_BOT error signals
export const propBotErrors: ExtendedSignal[] = [
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
    userId: 'USR-005', // Bot owner
    connectedUserIds: ['USR-001', 'USR-002'], // Users with trading accounts connected
    tradingAccount: 'FTMO Challenge',
    tradingAccountType: 'Prop',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '100000',
    errorSeverity: 'high',
    botType: BotType.PROP_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'ADMIN-001', // Bot owner (admin)
    connectedUserIds: ['USR-001', 'USR-003'], // Users with trading accounts connected
    tradingAccount: 'MFF Evaluation',
    tradingAccountType: 'Prop',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '50000',
    errorSeverity: 'critical',
    botType: BotType.PROP_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-002', // Bot owner
    connectedUserIds: ['USR-004', 'USR-005'], // Users with trading accounts connected
    tradingAccount: 'Topstep',
    tradingAccountType: 'Prop',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '150000',
    errorSeverity: 'critical',
    botType: BotType.PROP_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    userId: 'USR-003', // Bot owner
    connectedUserIds: ['USR-001'], // Users with trading accounts connected
    tradingAccount: 'FTMO Live',
    tradingAccountType: 'Prop',
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '200000',
    errorSeverity: 'high',
    botType: BotType.PROP_BOT,
    coinstratLogId: generateCoinstratLogId(),
  }
];


import { ExtendedSignal } from '@/types';
import { BotType } from '@/constants/botTypes';
import { daysAgo, hoursAgo, generateCoinstratLogId, generateAccountId } from './utils';

// Mock data for ADMIN-only error signals
export const adminErrors: ExtendedSignal[] = [
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
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '15000',
    errorSeverity: 'medium',
    botType: BotType.USER_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '25000',
    errorSeverity: 'high',
    botType: BotType.PREMIUM_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    tradingAccountId: generateAccountId(),
    tradingAccountBalance: '75000',
    errorSeverity: 'medium',
    botType: BotType.PROP_BOT,
    coinstratLogId: generateCoinstratLogId(),
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
    tradingAccountId: 'SYSTEM',
    errorSeverity: 'critical',
    botType: 'SYSTEM',
    coinstratLogId: generateCoinstratLogId('SYS'),
  }
];

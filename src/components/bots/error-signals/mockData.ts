
import { ExtendedSignal } from './types';
import { BotType } from '@/constants/botTypes';
import { determineBotType, normalizeBotId } from '@/utils/botUtils';

// Standardized mock data for error signals
export const mockErrorSignals: ExtendedSignal[] = [
  {
    id: 'ERR1001',
    action: 'ENTER_LONG',
    instrument: 'BTC/USDT',
    timestamp: '2024-03-22T10:15:30Z',
    signalToken: 'abcd1234',
    maxLag: '5000',
    investmentType: 'cryptocurrency',
    amount: '0.05',
    status: 'Failed',
    errorMessage: 'Insufficient balance',
    errorCode: 'ERR_INSUFFICIENT_BALANCE',
    errorSeverity: 'high',
    userId: 'USR-001',
    tradingAccount: '4056629',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$500',
    botId: 'PRE-001',
    botType: BotType.PREMIUM_BOT,
    botName: 'Alpha Momentum',
    exchange: 'Binance',
  },
  {
    id: 'ERR1002',
    action: 'EXIT_SHORT',
    instrument: 'ETH/USDT',
    timestamp: '2024-03-22T10:20:00Z',
    signalToken: 'efgh5678',
    maxLag: '3000',
    investmentType: 'cryptocurrency',
    amount: '0.1',
    status: 'Failed',
    errorMessage: 'Invalid API key',
    errorCode: 'ERR_INVALID_API_KEY',
    errorSeverity: 'critical',
    userId: 'USR-002',
    tradingAccount: '4056789',
    tradingAccountType: 'Demo',
    tradingAccountBalance: '$1000',
    botId: 'MY-002',
    botType: BotType.USER_BOT,
    botName: 'CryptoBot',
    exchange: 'Coinbase',
  },
  {
    id: 'ERR1003',
    action: 'ENTER_SHORT',
    instrument: 'LTC/USDT',
    timestamp: '2024-03-22T10:25:00Z',
    signalToken: 'ijkl9012',
    maxLag: '4000',
    investmentType: 'cryptocurrency',
    amount: '0.2',
    status: 'Failed',
    errorMessage: 'Order size too small',
    errorCode: 'ERR_ORDER_SIZE_TOO_SMALL',
    errorSeverity: 'medium',
    userId: 'USR-003',
    tradingAccount: '4044856',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$2000',
    botId: 'PROP-001',
    botType: BotType.PROP_BOT,
    botName: 'PropBot',
    exchange: 'FTX',
  },
  {
    id: 'ERR1004',
    action: 'EXIT_LONG',
    instrument: 'BTC/USDT',
    timestamp: '2024-03-22T10:30:00Z',
    signalToken: 'mnop3456',
    maxLag: '2000',
    investmentType: 'cryptocurrency',
    amount: '0.03',
    status: 'Failed',
    errorMessage: 'Connection timeout',
    errorCode: 'ERR_CONNECTION_TIMEOUT',
    errorSeverity: 'low',
    userId: 'USR-001',
    tradingAccount: '4056629',
    tradingAccountType: 'Live',
    tradingAccountBalance: '$500',
    botId: 'PRE-001',
    botType: BotType.PREMIUM_BOT,
    botName: 'Alpha Momentum',
    exchange: 'Binance',
  },
  {
    id: 'ERR1005',
    action: 'ENTER_LONG',
    instrument: 'ETH/USDT',
    timestamp: '2024-03-22T10:35:00Z',
    signalToken: 'qrst7890',
    maxLag: '6000',
    investmentType: 'cryptocurrency',
    amount: '0.08',
    status: 'Failed',
    errorMessage: 'Invalid trading pair',
    errorCode: 'ERR_INVALID_TRADING_PAIR',
    errorSeverity: 'high',
    userId: 'USR-002',
    tradingAccount: '4056789',
    tradingAccountType: 'Demo',
    tradingAccountBalance: '$1000',
    botId: 'MY-002',
    botType: BotType.USER_BOT,
    botName: 'CryptoBot',
    exchange: 'Coinbase',
  },
];

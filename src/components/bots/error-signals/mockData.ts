
import { ExtendedSignal } from './types';
import { BotType } from '@/constants/botTypes';

/**
 * Dữ liệu mẫu cho Error Signals với cấu trúc ID nhất quán
 */
export const mockErrorSignals: ExtendedSignal[] = [
  {
    id: 'sig-001',
    action: 'ENTER_LONG',
    instrument: 'BTC/USDT',
    timestamp: '2023-04-10T14:30:00Z',
    signalToken: 'tok_123',
    maxLag: '5s',
    investmentType: 'crypto',
    amount: '0.1',
    status: 'error',
    errorMessage: 'Insufficient balance in account',
    userId: 'user123',
    tradingAccount: 'Binance',
    tradingAccountType: 'spot',
    tradingAccountBalance: '$5,432',
    botId: 'PRE-001',
    botType: BotType.PREMIUM_BOT,
    errorCode: 'ERR_INSUFF_BALANCE',
    errorSeverity: 'high',
  },
  {
    id: 'sig-002',
    action: 'EXIT_SHORT',
    instrument: 'ETH/USDT',
    timestamp: '2023-04-11T10:15:00Z',
    signalToken: 'tok_456',
    maxLag: '3s',
    investmentType: 'crypto',
    amount: '2.5',
    status: 'error',
    errorMessage: 'API connection timeout',
    userId: 'user456',
    tradingAccount: 'ByBit',
    tradingAccountType: 'futures',
    tradingAccountBalance: '$12,300',
    botId: 'MY-002',
    botType: BotType.USER_BOT,
    errorCode: 'ERR_API_TIMEOUT',
    errorSeverity: 'medium',
  },
  {
    id: 'sig-003',
    action: 'ENTER_SHORT',
    instrument: 'SOL/USDT',
    timestamp: '2023-04-12T19:45:00Z',
    signalToken: 'tok_789',
    maxLag: '2s',
    investmentType: 'crypto',
    amount: '10',
    status: 'error',
    errorMessage: 'Symbol not supported on exchange',
    userId: 'user789',
    tradingAccount: 'Kraken',
    tradingAccountType: 'margin',
    tradingAccountBalance: '$8,750',
    botId: 'PROP-003',
    botType: BotType.PROP_BOT,
    errorCode: 'ERR_SYMBOL_NOT_SUPPORTED',
    errorSeverity: 'low',
  },
  {
    id: 'sig-004',
    action: 'EXIT_LONG',
    instrument: 'BNB/USDT',
    timestamp: '2023-04-13T08:30:00Z',
    signalToken: 'tok_101',
    maxLag: '4s',
    investmentType: 'crypto',
    amount: '5',
    status: 'error',
    errorMessage: 'Authentication failed',
    userId: 'user321',
    tradingAccount: 'Coinbase',
    tradingAccountType: 'spot',
    tradingAccountBalance: '$3,200',
    botId: 'PRE-004',
    botType: BotType.PREMIUM_BOT,
    errorCode: 'ERR_AUTH_FAILED',
    errorSeverity: 'critical',
  },
  {
    id: 'sig-005',
    action: 'ENTER_LONG',
    instrument: 'DOGE/USDT',
    timestamp: '2023-04-14T15:20:00Z',
    signalToken: 'tok_202',
    maxLag: '2s',
    investmentType: 'crypto',
    amount: '1000',
    status: 'error',
    errorMessage: 'Order size below minimum',
    userId: 'user654',
    tradingAccount: 'OKX',
    tradingAccountType: 'futures',
    tradingAccountBalance: '$6,800',
    botId: 'MY-005',
    botType: BotType.USER_BOT,
    errorCode: 'ERR_MIN_ORDER_SIZE',
    errorSeverity: 'low',
  }
];

// Mock data riêng cho admin view
export const adminMockErrorSignals: ExtendedSignal[] = [
  ...mockErrorSignals,
  {
    id: 'sig-006',
    action: 'EXIT_SHORT',
    instrument: 'ADA/USDT',
    timestamp: '2023-04-15T11:40:00Z',
    signalToken: 'tok_303',
    maxLag: '3s',
    investmentType: 'crypto',
    amount: '500',
    status: 'error',
    errorMessage: 'Trading temporarily disabled on exchange',
    userId: 'user777',
    tradingAccount: 'Huobi',
    tradingAccountType: 'spot',
    tradingAccountBalance: '$4,100',
    botId: 'PROP-006',
    botType: BotType.PROP_BOT,
    errorCode: 'ERR_TRADING_DISABLED',
    errorSeverity: 'critical',
  },
  {
    id: 'sig-007',
    action: 'ENTER_LONG',
    instrument: 'XRP/USDT',
    timestamp: '2023-04-16T13:25:00Z',
    signalToken: 'tok_404',
    maxLag: '4s',
    investmentType: 'crypto',
    amount: '100',
    status: 'error',
    errorMessage: 'Exchange rate limit exceeded',
    userId: 'user888',
    tradingAccount: 'Gate.io',
    tradingAccountType: 'margin',
    tradingAccountBalance: '$9,300',
    botId: 'PRE-007',
    botType: BotType.PREMIUM_BOT,
    errorCode: 'ERR_RATE_LIMIT',
    errorSeverity: 'medium',
  }
];

/**
 * Hàm helper để lấy dữ liệu mẫu dựa vào context
 * @param isAdmin flag để biết có đang ở admin context không
 * @param botId ID của bot nếu cần lọc theo bot
 */
export function getErrorSignals(isAdmin: boolean, botId?: string): ExtendedSignal[] {
  const signals = isAdmin ? adminMockErrorSignals : mockErrorSignals;
  
  if (botId) {
    return signals.filter(signal => signal.botId === botId);
  }
  
  return signals;
}

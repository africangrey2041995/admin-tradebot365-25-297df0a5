
import { TradingViewSignal } from '@/types';
import { BotType } from '@/constants/botTypes';

/**
 * Mở rộng signal để bao gồm thông tin người dùng và tài khoản
 */
export interface ExtendedSignal extends TradingViewSignal {
  userId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  botId?: string;
  botType?: BotType; // Thêm loại bot để dễ dàng điều hướng
  errorCode?: string; // Mã lỗi để phân loại
  errorSeverity?: 'low' | 'medium' | 'high' | 'critical'; // Mức độ nghiêm trọng của lỗi
}

export interface ErrorSignalsProps {
  botId: string;
}

/**
 * Thêm userId vào các đối tượng tài khoản trong CoinstratSignal
 */
export interface AccountWithUser {
  accountId: string;
  userId?: string;
  name: string;
  timestamp: string;
  reason?: string;
  errorCode?: string; // Mã lỗi
}

/**
 * Loại tài khoản giao dịch
 */
export enum TradingAccountType {
  SPOT = 'spot',
  FUTURES = 'futures',
  MARGIN = 'margin',
  OPTIONS = 'options'
}

/**
 * Interface để hiển thị lỗi với ngữ cảnh đầy đủ
 */
export interface ErrorContextData {
  message: string;
  timestamp: string;
  botId?: string;
  accountId?: string;
  userId?: string;
  errorCode?: string;
  action?: string;
  recommendedAction?: string;
}

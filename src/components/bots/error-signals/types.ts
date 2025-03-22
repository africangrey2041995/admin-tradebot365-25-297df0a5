
import { ExtendedSignal, AccountSignalStatus, TradingAccountType } from '@/types';
import { BotType } from '@/constants/botTypes';

/**
 * Types cho ErrorSignals component
 */

export interface ErrorSignalsProps {
  botId: string;
}

/**
 * Thêm userId vào các đối tượng tài khoản trong CoinstratSignal
 */
export interface AccountWithUser extends AccountSignalStatus {
  accountId: string;
  userId?: string;
  name: string;
  timestamp: string;
  reason?: string;
  errorCode?: string; // Mã lỗi
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

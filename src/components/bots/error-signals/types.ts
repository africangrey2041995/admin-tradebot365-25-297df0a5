
import { TradingViewSignal } from '@/types';

// Extended signal type to include user and account information
export interface ExtendedSignal extends TradingViewSignal {
  userId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  botId?: string;
  botName?: string;
  exchange?: string;
  processingTime?: string;
}

export interface ErrorSignalsProps {
  botId: string;
}

// Add userId to account objects in CoinstratSignal
export interface AccountWithUser {
  accountId: string;
  userId?: string;
  name: string;
  timestamp: string;
  reason?: string;
}

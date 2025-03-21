
import { TradingViewSignal } from '@/types';

// Extended signal type to include user and account information
export interface ExtendedSignal extends TradingViewSignal {
  userId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
  botId?: string;
}

export interface ErrorSignalsProps {
  botId: string;
}

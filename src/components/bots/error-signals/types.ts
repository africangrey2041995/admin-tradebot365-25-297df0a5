
import { ExtendedSignal } from '@/types/signal';

export interface ErrorSignalRowProps {
  signal: ExtendedSignal;
  isUnread: boolean;
  onMarkAsRead: (id: string) => void;
  onViewDetails?: (id: string) => void;
  isAdmin?: boolean;
}

export interface ErrorViewBaseProps {
  signal: ExtendedSignal;
  relatedSignals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

export interface UserBotErrorViewProps extends ErrorViewBaseProps {}
export interface PremiumBotErrorViewProps extends ErrorViewBaseProps {}
export interface PropTradingBotErrorViewProps extends ErrorViewBaseProps {}

/**
 * Interface for the ErrorSignals component props
 */
export interface ErrorSignalsProps {
  botId?: string;
  limit?: number;
  userId?: string;
}

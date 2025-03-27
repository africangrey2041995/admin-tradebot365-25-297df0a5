
import React from 'react';
import { ExtendedSignal } from '@/types/signal';
import UserBotErrorView from './UserBotErrorView';
import PremiumBotErrorView from './PremiumBotErrorView';
import PropTradingBotErrorView from './PropTradingBotErrorView';

interface BotErrorViewProps {
  signal: ExtendedSignal;
  relatedSignals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

const BotErrorView: React.FC<BotErrorViewProps> = ({
  signal,
  relatedSignals,
  onViewDetails
}) => {
  // Determine which component to use based on botType
  const getBotTypeFromSignal = (signal: ExtendedSignal): 'user_bot' | 'premium_bot' | 'prop_bot' => {
    if (!signal.botType) {
      // Try to infer bot type from botId if available
      if (signal.botId) {
        if (signal.botId.startsWith('MY-')) return 'user_bot';
        if (signal.botId.startsWith('PRE-')) return 'premium_bot';
        if (signal.botId.startsWith('PROP-')) return 'prop_bot';
      }
      
      // Default to user bot if we can't determine
      return 'user_bot';
    }
    
    const botTypeValue = signal.botType.toLowerCase();
    
    if (botTypeValue.includes('premium')) return 'premium_bot';
    if (botTypeValue.includes('prop')) return 'prop_bot';
    return 'user_bot'; // Default to user bot
  };
  
  const botType = getBotTypeFromSignal(signal);
  
  // Render the appropriate component based on bot type
  switch (botType) {
    case 'premium_bot':
      return (
        <PremiumBotErrorView
          signal={signal}
          relatedSignals={relatedSignals}
          onViewDetails={onViewDetails}
        />
      );
    case 'prop_bot':
      return (
        <PropTradingBotErrorView
          signal={signal}
          relatedSignals={relatedSignals}
          onViewDetails={onViewDetails}
        />
      );
    case 'user_bot':
    default:
      return (
        <UserBotErrorView
          signal={signal}
          relatedSignals={relatedSignals}
          onViewDetails={onViewDetails}
        />
      );
  }
};

export default BotErrorView;

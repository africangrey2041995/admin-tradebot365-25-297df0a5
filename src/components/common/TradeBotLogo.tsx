
import React from 'react';
import { cn } from '@/lib/utils';

interface TradeBotLogoProps {
  size?: 'small' | 'medium' | 'large';
  showBetaTag?: boolean;
  className?: string;
}

const TradeBotLogo: React.FC<TradeBotLogoProps> = ({ 
  size = 'medium', 
  showBetaTag = true,
  className
}) => {
  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return 'h-6';
      case 'large':
        return 'h-10';
      case 'medium':
      default:
        return 'h-8';
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex items-center">
        <span className={cn("font-extrabold text-white", 
          size === 'small' ? 'text-lg' : 
          size === 'medium' ? 'text-xl' : 
          'text-2xl')}>
          TRADE<span className="text-amber-500">BOT</span>365
        </span>
        {showBetaTag && (
          <span className="ml-1 px-1 text-xs bg-amber-500 text-black font-semibold rounded">BETA</span>
        )}
      </div>
    </div>
  );
};

export default TradeBotLogo;

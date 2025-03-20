
import React from 'react';
import BetaTag from './BetaTag';
import { useTheme } from 'next-themes';
import { useIsMobile } from '@/hooks/use-mobile';

interface TradeBotLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  variant?: 'default' | 'dark' | 'light';
  showBetaTag?: boolean;
}

const TradeBotLogo: React.FC<TradeBotLogoProps> = ({ 
  size = 'medium', 
  className = '',
  variant = 'default',
  showBetaTag = false
}) => {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  
  // Determine height based on size prop - increased for better visibility
  const height = isMobile 
    ? (size === 'small' ? 'h-9' : size === 'medium' ? 'h-14' : 'h-16') 
    : (size === 'small' ? 'h-8' : size === 'medium' ? 'h-12' : 'h-16');
  
  // Choose logo based on theme and device
  const logoSrc = isMobile && resolvedTheme === 'light'
    ? "/lovable-uploads/2355f2cc-b849-4578-8662-c64c468d11f4.png" // New logo for light mode on mobile
    : "/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png"; // Original logo for dark mode and desktop
  
  // Calculate appropriate width and height attributes
  const widthAttr = isMobile 
    ? (size === 'small' ? '36' : size === 'medium' ? '56' : '64') 
    : (size === 'small' ? '32' : size === 'medium' ? '48' : '64');
    
  const heightAttr = isMobile 
    ? (size === 'small' ? '36' : size === 'medium' ? '56' : '64') 
    : (size === 'small' ? '32' : size === 'medium' ? '48' : '64');

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="Trade Bot 365" 
        className={`w-auto ${height}`}
        loading="eager" 
        fetchPriority="high"
        decoding="async"
        width={widthAttr}
        height={heightAttr}
      />
      {showBetaTag && (
        <div className={`absolute ${isMobile 
          ? (size === 'small' ? '-right-5 -top-2' : '-right-7 -top-3') 
          : (size === 'small' ? '-right-5 -top-2' : '-right-6 -top-3')}`}>
          <BetaTag className={isMobile 
            ? (size === 'small' ? 'scale-70' : 'scale-90') 
            : (size === 'small' ? 'scale-70' : 'scale-80')} 
          />
        </div>
      )}
    </div>
  );
};

export default TradeBotLogo;

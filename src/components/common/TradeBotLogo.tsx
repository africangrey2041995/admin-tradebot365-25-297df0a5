
import React from 'react';
import BetaTag from './BetaTag';

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
  // Determine height based on size prop
  const height = size === 'small' ? 'h-8' : size === 'medium' ? 'h-12' : 'h-16';
  
  // Use the appropriate logo based on theme variant
  const logoSrc = "/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png";
  
  return (
    <div className="relative inline-flex items-center">
      <img 
        src={logoSrc} 
        alt="Trade Bot 365" 
        className={`w-auto ${height} ${className}`}
        loading="eager" 
        fetchPriority="high"
        decoding="async"
        // Add width attribute to help browser calculate layout faster 
        width={size === 'small' ? '32' : size === 'medium' ? '48' : '64'}
        // Add height attribute for the same reason
        height={size === 'small' ? '32' : size === 'medium' ? '48' : '64'}
      />
      {showBetaTag && (
        <div className="absolute -right-6 -top-2">
          <BetaTag className="scale-75" />
        </div>
      )}
    </div>
  );
};

export default TradeBotLogo;

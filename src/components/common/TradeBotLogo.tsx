
import React from 'react';

interface TradeBotLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const TradeBotLogo: React.FC<TradeBotLogoProps> = ({ size = 'medium', className = '' }) => {
  // Determine height based on size prop
  const height = size === 'small' ? 'h-8' : size === 'medium' ? 'h-12' : 'h-16';
  
  return (
    <img 
      src="/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png" 
      alt="Trade Bot 365" 
      className={`w-auto ${height} ${className}`}
      // Add loading="eager" to prioritize logo loading
      loading="eager"
    />
  );
};

export default TradeBotLogo;

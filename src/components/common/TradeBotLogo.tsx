
import React from 'react';

interface TradeBotLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  variant?: 'default' | 'dark' | 'light';
}

const TradeBotLogo: React.FC<TradeBotLogoProps> = ({ 
  size = 'medium', 
  className = '',
  variant = 'default'
}) => {
  // Determine height based on size prop
  const height = size === 'small' ? 'h-8' : size === 'medium' ? 'h-12' : 'h-16';
  
  // Use the appropriate logo based on theme variant
  const logoSrc = "/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png";
  
  return (
    <img 
      src={logoSrc} 
      alt="Trade Bot 365" 
      className={`w-auto ${height} ${className}`}
      loading="eager" 
      fetchpriority="high"
      decoding="async"
      // Add width attribute to help browser calculate layout faster 
      width={size === 'small' ? '32' : size === 'medium' ? '48' : '64'}
      // Add height attribute for the same reason
      height={size === 'small' ? '32' : size === 'medium' ? '48' : '64'}
    />
  );
};

export default TradeBotLogo;


import React, { useEffect, useState, memo } from 'react';
import BetaTag from './BetaTag';
import { useTheme } from 'next-themes';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/components/ui/sidebar';

interface TradeBotLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  variant?: 'default' | 'dark' | 'light';
  showBetaTag?: boolean;
  forceLightVersion?: boolean;
}

// Preload images to prevent flickering
const lightLogo = "/lovable-uploads/2355f2cc-b849-4578-8662-c64c468d11f4.png";
const darkLogo = "/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png";
const whiteLogo = "/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png";

// Preload the images on component mount
if (typeof window !== 'undefined') {
  const preloadImage = (src: string) => {
    const img = new Image();
    img.src = src;
  };
  preloadImage(lightLogo);
  preloadImage(darkLogo);
  preloadImage(whiteLogo);
}

const TradeBotLogo: React.FC<TradeBotLogoProps> = memo(({ 
  size = 'medium', 
  className = '',
  variant = 'default',
  showBetaTag = false,
  forceLightVersion = false
}) => {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  const { openMobile } = useSidebar();
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  // Determine height based on size prop - increased for better visibility
  const height = isMobile 
    ? (size === 'small' ? 'h-9' : size === 'medium' ? 'h-14' : 'h-16') 
    : (size === 'small' ? 'h-8' : size === 'medium' ? 'h-12' : 'h-16');
  
  // Choose logo based on theme, device, and sidebar state
  const shouldUseLightLogo = openMobile || forceLightVersion;
  
  const logoSrc = isMobile && resolvedTheme === 'light' && !shouldUseLightLogo
    ? lightLogo // Colored logo for light mode on mobile
    : shouldUseLightLogo 
      ? whiteLogo // White logo for dark backgrounds
      : darkLogo; // Original logo for dark mode and desktop
  
  // Calculate appropriate width and height attributes
  const widthAttr = isMobile 
    ? (size === 'small' ? '36' : size === 'medium' ? '56' : '64') 
    : (size === 'small' ? '32' : size === 'medium' ? '48' : '64');
    
  const heightAttr = isMobile 
    ? (size === 'small' ? '36' : size === 'medium' ? '56' : '64') 
    : (size === 'small' ? '32' : size === 'medium' ? '48' : '64');

  useEffect(() => {
    // Set loaded state to true after first render
    setLogoLoaded(true);
  }, []);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="Trade Bot 365" 
        className={`w-auto ${height} transition-opacity duration-200 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager" 
        width={widthAttr}
        height={heightAttr}
        decoding="async"
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
});

TradeBotLogo.displayName = 'TradeBotLogo';

export default TradeBotLogo;

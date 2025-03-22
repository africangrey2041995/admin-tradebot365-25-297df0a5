
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

// Define image paths as constants to avoid string repetition
const LOGOS = {
  LIGHT: "/lovable-uploads/2355f2cc-b849-4578-8662-c64c468d11f4.png",
  DARK: "/lovable-uploads/68a402c1-5eae-4c56-a88f-7135d455c4f9.png",
  WHITE: "/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png"
};

// Preload all logo images immediately to prevent flickering
if (typeof window !== 'undefined') {
  // Create and cache all logo images in advance
  Object.values(LOGOS).forEach(src => {
    const img = new Image();
    img.src = src;
  });
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
  
  // Determine height based on size prop
  const height = isMobile 
    ? (size === 'small' ? 'h-9' : size === 'medium' ? 'h-14' : 'h-16') 
    : (size === 'small' ? 'h-8' : size === 'medium' ? 'h-12' : 'h-16');
  
  // Choose logo based on theme, device, and sidebar state
  const shouldUseLightLogo = openMobile || forceLightVersion;
  
  const logoSrc = isMobile && resolvedTheme === 'light' && !shouldUseLightLogo
    ? LOGOS.LIGHT // Colored logo for light mode on mobile
    : shouldUseLightLogo 
      ? LOGOS.WHITE // White logo for dark backgrounds
      : LOGOS.DARK; // Original logo for dark mode and desktop
  
  // Calculate appropriate width and height attributes
  const widthAttr = isMobile 
    ? (size === 'small' ? '36' : size === 'medium' ? '56' : '64') 
    : (size === 'small' ? '32' : size === 'medium' ? '48' : '64');
    
  const heightAttr = isMobile 
    ? (size === 'small' ? '36' : size === 'medium' ? '56' : '64') 
    : (size === 'small' ? '32' : size === 'medium' ? '48' : '64');

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Using a static approach without opacity transitions which can cause flickering */}
      <img 
        src={logoSrc} 
        alt="Trade Bot 365" 
        className={`w-auto ${height}`}
        loading="eager" 
        width={widthAttr}
        height={heightAttr}
        decoding="sync" // Change to sync for immediate decoding
        style={{ backfaceVisibility: 'hidden' }} // Prevent flickering in some browsers
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

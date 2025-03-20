
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface BetaTagProps {
  className?: string;
}

const BetaTag: React.FC<BetaTagProps> = ({ className = '' }) => {
  const isMobile = useIsMobile();
  
  return (
    <span className={`inline-flex items-center justify-center ${isMobile ? 'text-2xs px-1.5 py-0.5 h-4' : 'text-xs px-2 py-0.5'} font-medium bg-amber-500/90 text-white rounded ${className}`}>
      BETA
    </span>
  );
};

export default BetaTag;


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface BetaTagProps {
  className?: string;
}

const BetaTag: React.FC<BetaTagProps> = ({ className = '' }) => {
  const isMobile = useIsMobile();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="info"
            className={`cursor-help transition-all hover:scale-105 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400 ${isMobile ? 'px-1.5 py-0.5 text-xs' : ''} ${className}`}
          >
            <Sparkles className={`${isMobile ? 'h-2.5 w-2.5 mr-0.5' : 'h-3 w-3 mr-1'}`} />
            BETA
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Đây là phiên bản beta, một số tính năng có thể chưa hoàn thiện.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BetaTag;

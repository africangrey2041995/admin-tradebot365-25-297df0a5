
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ErrorDetailsTooltipProps {
  errorMessage: string;
  children: React.ReactNode;
}

const ErrorDetailsTooltip: React.FC<ErrorDetailsTooltipProps> = ({ 
  errorMessage,
  children
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] text-sm bg-zinc-900 border-zinc-700 text-white">
          <p className="font-medium text-white">Error Details:</p>
          <p className="text-xs mt-1 break-words text-zinc-300">{errorMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ErrorDetailsTooltip;

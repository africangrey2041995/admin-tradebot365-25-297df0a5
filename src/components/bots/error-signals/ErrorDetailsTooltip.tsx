
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
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          className="max-w-[350px] text-sm bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 shadow-lg"
          side="right"
        >
          <p className="font-medium text-sm mb-1.5">Chi tiết lỗi:</p>
          <p className="text-xs mt-1 break-words text-red-600 dark:text-red-400 font-mono bg-red-50 dark:bg-red-900/20 p-2 rounded">
            {errorMessage}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ErrorDetailsTooltip;

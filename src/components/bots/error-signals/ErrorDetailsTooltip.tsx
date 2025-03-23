
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
        <TooltipContent className="max-w-[300px] text-sm bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
          <p className="font-medium">Chi tiết lỗi:</p>
          <p className="text-xs mt-1 break-words text-red-600 dark:text-red-400">{errorMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ErrorDetailsTooltip;

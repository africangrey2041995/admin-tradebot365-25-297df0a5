
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ExtendedSignal } from './types';

interface ErrorDetailsTooltipProps {
  signal: ExtendedSignal;
  onView: (signalId: string) => void;
}

const ErrorDetailsTooltip: React.FC<ErrorDetailsTooltipProps> = ({ signal, onView }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild onClick={() => onView(signal.id)}>
          <button className="flex items-center">
            <HelpCircle className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer" />
            <span className="ml-1 truncate max-w-[150px] text-xs">
              Details
            </span>
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          className="max-w-md p-4 bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-800/30 shadow-lg rounded-lg"
        >
          <h4 className="font-medium text-red-700 dark:text-red-400 mb-1">Error Details</h4>
          <p className="text-red-600 dark:text-red-300 mb-2">{signal.errorMessage}</p>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            <span className="block">Signal Token: {signal.signalToken}</span>
            <span className="block">Max Lag: {signal.maxLag}</span>
            <span className="block">Bot ID: {signal.botId}</span>
            <span className="block">User ID: {signal.userId}</span>
            <span className="block">Trading Account: {signal.tradingAccount} | {signal.tradingAccountType} | {signal.tradingAccountBalance}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ErrorDetailsTooltip;

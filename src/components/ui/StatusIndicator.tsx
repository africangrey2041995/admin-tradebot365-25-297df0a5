import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ConnectionStatus } from '@/types/connection';

interface StatusIndicatorProps {
  status: ConnectionStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
  lastUpdated?: string;
}

const StatusIndicator = ({ 
  status, 
  size = 'md', 
  showLabel = false, 
  className,
  lastUpdated
}: StatusIndicatorProps) => {
  const dotSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  
  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const statusConfig = {
    Connected: {
      icon: <CheckCircle className="h-4 w-4 text-success" />,
      label: 'Đã Kết Nối',
      className: 'connected'
    },
    Disconnected: {
      icon: <XCircle className="h-4 w-4 text-destructive" />,
      label: 'Mất Kết Nối',
      className: 'disconnected'
    },
    Pending: {
      icon: <AlertCircle className="h-4 w-4 text-warning" />,
      label: 'Đang Xử Lý',
      className: 'pending'
    }
  };

  const config = statusConfig[status];
  const tooltipContent = lastUpdated 
    ? `Trạng thái: ${config.label}\nCập nhật lần cuối: ${lastUpdated}`
    : `Trạng thái: ${config.label}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-2", className)}>
            <span className={cn("statusDot", dotSizes[size], config.className)}></span>
            {showLabel && (
              <span className={cn(labelSizes[size], "font-medium")}>{config.label}</span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            {config.icon}
            <p className="whitespace-pre-line">{tooltipContent}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StatusIndicator;

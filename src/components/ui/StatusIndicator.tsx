import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  WifiOff, 
  WifiHigh 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ConnectionStatus } from '@/types/connection';
import { Button } from '@/components/ui/button';
import { format, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface StatusIndicatorProps {
  status: ConnectionStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showControls?: boolean;
  className?: string;
  lastUpdated?: string;
  lastConnectionTime?: string;
  lastDisconnectionTime?: string;
  errorMessage?: string;
  reconnectAttempts?: number;
  onReconnect?: () => void;
  onDisconnect?: () => void;
  isReconnecting?: boolean;
  healthStatus?: 'healthy' | 'warning' | 'critical';
}

const StatusIndicator = ({ 
  status, 
  size = 'md', 
  showLabel = false, 
  showControls = false,
  className,
  lastUpdated,
  lastConnectionTime,
  lastDisconnectionTime,
  errorMessage,
  reconnectAttempts = 0,
  onReconnect,
  onDisconnect,
  isReconnecting = false,
  healthStatus
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
      actionIcon: <WifiOff className="h-4 w-4" />,
      actionLabel: 'Ngắt kết nối',
      label: 'Đã Kết Nối',
      className: 'bg-emerald-500 shadow-emerald-500/20',
      healthIcon: {
        healthy: <WifiHigh className="h-3 w-3 text-emerald-600" />,
        warning: <WifiHigh className="h-3 w-3 text-amber-600" />,
        critical: <WifiHigh className="h-3 w-3 text-red-600" />
      }
    },
    Disconnected: {
      icon: <XCircle className="h-4 w-4 text-destructive" />,
      actionIcon: <RefreshCw className="h-4 w-4" />,
      actionLabel: 'Kết nối lại',
      label: 'Mất Kết Nối',
      className: 'bg-red-500 shadow-red-500/20',
      healthIcon: null
    },
    Pending: {
      icon: <AlertCircle className="h-4 w-4 text-warning" />,
      actionIcon: <Clock className="h-4 w-4" />,
      actionLabel: 'Đang xử lý',
      label: 'Đang Xử Lý',
      className: 'bg-amber-500 shadow-amber-500/20',
      healthIcon: null
    }
  };

  const config = statusConfig[status];
  
  const formatTime = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'HH:mm:ss - dd/MM/yyyy', { locale: vi });
    } catch (e) {
      return dateString;
    }
  };
  
  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: vi });
    } catch (e) {
      return '';
    }
  };
  
  const buildTooltipContent = () => {
    const parts = [`Trạng thái: ${config.label}`];
    
    if (lastUpdated) {
      parts.push(`Cập nhật lần cuối: ${formatTime(lastUpdated)} (${formatTimeAgo(lastUpdated)})`);
    }
    
    if (status === 'Connected' && lastConnectionTime) {
      parts.push(`Kết nối từ: ${formatTime(lastConnectionTime)} (${formatTimeAgo(lastConnectionTime)})`);
    }
    
    if (status === 'Disconnected') {
      if (lastDisconnectionTime) {
        parts.push(`Mất kết nối từ: ${formatTime(lastDisconnectionTime)} (${formatTimeAgo(lastDisconnectionTime)})`);
      }
      if (errorMessage) {
        parts.push(`Lỗi: ${errorMessage}`);
      }
      if (reconnectAttempts > 0) {
        parts.push(`Số lần thử kết nối lại: ${reconnectAttempts}`);
      }
    }
    
    if (healthStatus && status === 'Connected') {
      const healthText = {
        healthy: 'Tốt',
        warning: 'Cảnh báo',
        critical: 'Nguy hiểm'
      };
      parts.push(`Tình trạng: ${healthText[healthStatus]}`);
    }
    
    return parts.join('\n');
  };

  const tooltipContent = buildTooltipContent();
  
  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === 'Connected' && onDisconnect && !isReconnecting) {
      onDisconnect();
    } else if (status === 'Disconnected' && onReconnect && !isReconnecting) {
      onReconnect();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex items-center gap-2", className)}>
            <div className="relative">
              <span 
                className={cn(
                  "inline-block rounded-full shadow-sm", 
                  dotSizes[size], 
                  config.className
                )}
              />
              {status === 'Connected' && healthStatus && (
                <span className="absolute -bottom-0.5 -right-0.5">
                  {config.healthIcon?.[healthStatus]}
                </span>
              )}
            </div>
            
            {showLabel && (
              <span className={cn(labelSizes[size], "font-medium")}>
                {config.label}
                {status === 'Connected' && lastConnectionTime && (
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    ({formatTimeAgo(lastConnectionTime)})
                  </span>
                )}
                {status === 'Disconnected' && lastDisconnectionTime && (
                  <span className="text-xs font-normal text-muted-foreground ml-1">
                    ({formatTimeAgo(lastDisconnectionTime)})
                  </span>
                )}
              </span>
            )}
            
            {showControls && (onReconnect || onDisconnect) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 ml-1"
                onClick={handleAction}
                disabled={isReconnecting || status === 'Pending'}
              >
                {isReconnecting ? (
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  config.actionIcon
                )}
                <span className="text-xs">
                  {isReconnecting ? 'Đang xử lý...' : config.actionLabel}
                </span>
              </Button>
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

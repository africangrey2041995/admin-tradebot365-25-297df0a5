
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import ActionBadge from './ActionBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ExternalLink, AlertTriangle } from 'lucide-react';
import { ExtendedSignal } from '@/types';
import ErrorDetailsTooltip from './ErrorDetailsTooltip';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';

interface ErrorSignalRowProps {
  signal: ExtendedSignal;
  isUnread: boolean;
  onMarkAsRead: (signalId: string) => void;
}

const ErrorSignalRow: React.FC<ErrorSignalRowProps> = ({ 
  signal, 
  isUnread, 
  onMarkAsRead 
}) => {
  const { navigateToBotDetail } = useNavigation();
  
  const handleBotClick = () => {
    if (signal.botId) {
      try {
        // Use botId for navigation to proper detail page
        navigateToBotDetail(signal.botId);
      } catch (error) {
        console.error('Error navigating to bot details:', error);
        toast.error('Không thể điều hướng đến trang bot. Vui lòng thử lại sau.');
      }
    } else {
      console.warn('Cannot navigate: Bot ID is missing from signal');
      toast.warning('Không thể điều hướng: ID bot không tồn tại trong tín hiệu');
    }
  };
  
  const handleMarkAsRead = () => {
    if (signal.id) {
      try {
        onMarkAsRead(signal.id);
      } catch (error) {
        console.error('Error marking signal as read:', error);
        toast.error('Không thể đánh dấu tín hiệu là đã đọc. Vui lòng thử lại sau.');
      }
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
    } catch (error) {
      console.error(`Error formatting date: ${dateString}`, error);
      return dateString;
    }
  };
  
  // Format trading account to show ID, type and balance without exchange name
  const formatTradingAccount = () => {
    const parts = [];
    
    if (signal.tradingAccountId) {
      parts.push(signal.tradingAccountId);
    }
    
    if (signal.tradingAccountType) {
      parts.push(signal.tradingAccountType);
    }
    
    if (signal.tradingAccountBalance) {
      parts.push(`$${signal.tradingAccountBalance}`);
    }
    
    return parts.length > 0 ? parts.join(' | ') : 'N/A';
  };
  
  // Generate a severity badge based on errorSeverity
  const renderSeverityBadge = () => {
    const severity = signal.errorSeverity || 'medium';
    const severityConfig = {
      low: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Low' },
      medium: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', label: 'Medium' },
      high: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'High' },
      critical: { bg: 'bg-red-200 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200', label: 'Critical' }
    };
    
    const config = severityConfig[severity];
    
    return (
      <Badge className={`${config.bg} ${config.text} border-none`}>
        <AlertTriangle className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };
  
  // Format structured error code
  const formatErrorCode = () => {
    if (signal.errorCode) {
      return (
        <span className="font-mono text-xs">
          {signal.errorCode}
        </span>
      );
    }
    
    // Generate structured error code based on bot type
    let botTypePrefix = 'ERR';
    if (signal.botType) {
      if (signal.botType.toLowerCase().includes('user')) {
        botTypePrefix = 'USR';
      } else if (signal.botType.toLowerCase().includes('premium')) {
        botTypePrefix = 'PRE';
      } else if (signal.botType.toLowerCase().includes('prop')) {
        botTypePrefix = 'PRP';
      }
    }
    
    // Generate error category based on error message
    let category = 'UNK';
    const errorMsg = signal.errorMessage?.toLowerCase() || '';
    if (errorMsg.includes('auth') || errorMsg.includes('token') || errorMsg.includes('permission')) {
      category = 'AUTH';
    } else if (errorMsg.includes('api') || errorMsg.includes('request') || errorMsg.includes('response')) {
      category = 'API';
    } else if (errorMsg.includes('exec') || errorMsg.includes('execution')) {
      category = 'EXE';
    } else if (errorMsg.includes('time') || errorMsg.includes('timeout')) {
      category = 'TIME';
    } else if (errorMsg.includes('connect') || errorMsg.includes('network')) {
      category = 'CONN';
    }
    
    // Extract numeric part from signal ID or generate sequential
    const numericPart = signal.id.match(/\d+$/) ? signal.id.match(/\d+$/)[0] : '001';
    
    return (
      <span className="font-mono text-xs">
        ERR-{botTypePrefix}-{category}-{numericPart.padStart(3, '0')}
      </span>
    );
  };
  
  return (
    <TableRow className={isUnread ? "bg-red-50/10" : ""}>
      <TableCell className="font-mono text-xs">
        {signal.id}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="font-medium">
          {signal.instrument}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">
        {formatDate(signal.timestamp)}
      </TableCell>
      <TableCell>
        {signal.amount}
      </TableCell>
      <TableCell>
        <ActionBadge action={signal.action} />
      </TableCell>
      <TableCell>
        <Badge variant="destructive" className="bg-red-600">
          Error
        </Badge>
      </TableCell>
      <TableCell 
        className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
        onClick={handleBotClick}
      >
        {signal.botId || 'N/A'}
      </TableCell>
      <TableCell>
        {signal.userId || 'N/A'}
      </TableCell>
      <TableCell>
        {formatTradingAccount()}
      </TableCell>
      <TableCell>
        {signal.coinstratLogId ? (
          <div className="flex items-center gap-1">
            <span className="font-mono text-xs">{signal.coinstratLogId}</span>
            <ExternalLink className="h-3 w-3 text-blue-500" />
          </div>
        ) : (
          <span className="text-gray-400 italic text-xs">No ID CPL</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {renderSeverityBadge()}
          <span className="font-mono text-xs text-slate-500">{formatErrorCode()}</span>
        </div>
        <ErrorDetailsTooltip errorMessage={signal.errorMessage || 'Unknown error'}>
          <span className="text-red-500 cursor-help">
            {signal.errorMessage 
              ? (signal.errorMessage.length > 25 
                ? `${signal.errorMessage.substring(0, 25)}...` 
                : signal.errorMessage)
              : 'Unknown error'
            }
          </span>
        </ErrorDetailsTooltip>
        {isUnread && (
          <Button
            size="sm" 
            variant="ghost" 
            onClick={handleMarkAsRead}
            className="ml-2 h-6 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Mark as read</span>
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ErrorSignalRow;

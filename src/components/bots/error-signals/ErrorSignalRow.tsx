
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ExternalLink, AlertTriangle, Info, User } from 'lucide-react';
import { ExtendedSignal } from '@/types';
import ErrorDetailsTooltip from './ErrorDetailsTooltip';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';
import { ErrorSignalRowProps } from './types';
import { formatUtils } from '@/utils/formatUtils';

const ErrorSignalRow: React.FC<ErrorSignalRowProps> = ({ 
  signal, 
  isUnread, 
  onMarkAsRead,
  onViewDetails,
  isAdmin = false
}) => {
  const { navigateToBotDetail } = useNavigation();
  
  const handleBotClick = () => {
    if (signal.botId) {
      try {
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

  const handleViewDetails = () => {
    if (onViewDetails && signal.id) {
      onViewDetails(signal.id);
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
  
  const renderSeverityBadge = () => {
    const severity = signal.errorSeverity || 'medium';
    const severityConfig = {
      low: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Thấp' },
      medium: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', label: 'Trung bình' },
      high: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'Cao' },
      critical: { bg: 'bg-red-200 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200', label: 'Nghiêm trọng' }
    };
    
    const config = severityConfig[severity];
    
    return (
      <Badge className={`${config.bg} ${config.text} border-none`}>
        <AlertTriangle className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getBotTypeBadge = () => {
    const botType = signal.botType || 'unknown';
    const typeConfig = {
      'USER_BOT': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'Bot Người Dùng' },
      'PREMIUM_BOT': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Bot Premium' },
      'PROP_BOT': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Bot Prop Trading' },
      'unknown': { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-300', label: 'Không xác định' }
    };
    
    const config = typeConfig[botType as keyof typeof typeConfig] || typeConfig.unknown;
    
    return (
      <Badge variant="outline" className={`${config.bg} ${config.text} font-medium`}>
        {config.label}
      </Badge>
    );
  };

  // Format error ID to be shorter and more readable
  const getFormattedId = (id: string) => {
    if (!id) return 'N/A';
    if (id.length > 8) {
      return `${id.substring(0, 8)}...`;
    }
    return id;
  };
  
  return (
    <TableRow className={`
      ${isUnread ? "bg-red-50/10 dark:bg-red-900/10" : ""}
      hover:bg-red-50/5 dark:hover:bg-red-900/5
      transition-colors
    `}>
      {/* ID */}
      <TableCell className="font-mono text-xs">
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          {getFormattedId(signal.id)}
        </span>
      </TableCell>
      
      {/* Severity Level */}
      <TableCell>
        {renderSeverityBadge()}
      </TableCell>
      
      {/* Error Description */}
      <TableCell>
        <div className="max-w-[250px] truncate font-medium">
          {signal.errorMessage || 'Không có thông tin lỗi'}
        </div>
      </TableCell>
      
      {/* Timestamp */}
      <TableCell className="text-sm">
        <div className="flex items-center text-muted-foreground">
          <span>{formatDate(signal.timestamp)}</span>
        </div>
      </TableCell>
      
      {/* Bot Name/ID */}
      <TableCell 
        className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
        onClick={handleBotClick}
      >
        <div className="flex items-center">
          <span>{signal.botName || signal.botId || 'N/A'}</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </div>
      </TableCell>
      
      {/* Bot Type */}
      <TableCell>
        {getBotTypeBadge()}
      </TableCell>
      
      {/* User ID */}
      <TableCell>
        <div className="flex items-center">
          <User className="h-3 w-3 mr-1 text-muted-foreground" />
          <span className="text-xs font-mono">{signal.userId || 'N/A'}</span>
        </div>
      </TableCell>
      
      {/* Actions */}
      <TableCell>
        <div className="flex items-center gap-2">
          <ErrorDetailsTooltip errorMessage={signal.errorMessage || 'Unknown error'}>
            <div className="flex items-center text-red-500 cursor-help">
              <Info className="h-4 w-4 mr-1" />
              <span className="text-xs">Chi tiết</span>
            </div>
          </ErrorDetailsTooltip>
          
          {isUnread && (
            <Button
              size="sm" 
              variant="ghost" 
              onClick={handleMarkAsRead}
              className="h-6 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span className="text-xs">Đã đọc</span>
            </Button>
          )}
          
          {!isAdmin && onViewDetails && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleViewDetails}
              className="h-6 px-2"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              <span className="text-xs">Xem chi tiết</span>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ErrorSignalRow;

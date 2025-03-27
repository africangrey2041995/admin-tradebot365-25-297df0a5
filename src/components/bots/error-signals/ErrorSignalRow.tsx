
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

  const getBotTypeBadge = () => {
    const botType = signal.botType || 'unknown';
    const typeConfig = {
      'USER_BOT': { bg: 'bg-green-100', text: 'text-green-700', label: 'Bot Người Dùng' },
      'PREMIUM_BOT': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Bot Premium' },
      'PROP_BOT': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Bot Prop Trading' },
      'unknown': { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Không xác định' }
    };
    
    const config = typeConfig[botType as keyof typeof typeConfig] || typeConfig.unknown;
    
    return (
      <Badge variant="outline" className={`${config.bg} ${config.text} font-medium`}>
        {config.label}
      </Badge>
    );
  };
  
  return (
    <TableRow className={isUnread ? "bg-red-50/10" : ""}>
      {/* ID */}
      <TableCell className="font-mono text-xs">
        {signal.id}
      </TableCell>
      
      {/* Severity Level */}
      <TableCell>
        {renderSeverityBadge()}
      </TableCell>
      
      {/* Error Description */}
      <TableCell>
        <div className="max-w-[250px] truncate">
          {signal.errorMessage || 'Không có thông tin lỗi'}
        </div>
      </TableCell>
      
      {/* Timestamp */}
      <TableCell className="text-sm">
        {formatDate(signal.timestamp)}
      </TableCell>
      
      {/* Bot Name/ID */}
      <TableCell 
        className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
        onClick={handleBotClick}
      >
        {signal.botName || signal.botId || 'N/A'}
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
              <span className="text-xs">Xem chi tiết</span>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ErrorSignalRow;

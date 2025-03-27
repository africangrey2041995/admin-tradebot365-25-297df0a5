
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ExternalLink, AlertTriangle, Info, User, HelpCircle } from 'lucide-react';
import { ExtendedSignal } from '@/types';
import ErrorDetailsTooltip from './ErrorDetailsTooltip';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';
import { ErrorSignalRowProps } from './types';
import { formatDate } from '@/utils/formatUtils';

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
  
  const formatDateTime = (dateString: string) => {
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
      low: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', label: 'Low', icon: <AlertTriangle className="h-3 w-3 mr-1" /> },
      medium: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', label: 'Medium', icon: <AlertTriangle className="h-3 w-3 mr-1" /> },
      high: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', label: 'High', icon: <AlertTriangle className="h-3 w-3 mr-1" /> },
      critical: { bg: 'bg-red-200 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-200 font-bold', label: 'Critical', icon: <AlertTriangle className="h-3 w-3 mr-1" /> }
    };
    
    const config = severityConfig[severity as keyof typeof severityConfig];
    
    return (
      <Badge className={`${config.bg} ${config.text} border-none`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const getBotTypeBadge = () => {
    const botType = signal.botType || 'unknown';
    const typeConfig = {
      'USER_BOT': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', label: 'User' },
      'PREMIUM_BOT': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', label: 'Premium' },
      'PROP_BOT': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', label: 'Prop' },
      'unknown': { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-300', label: 'N/A' }
    };
    
    const config = typeConfig[botType as keyof typeof typeConfig] || typeConfig.unknown;
    
    return (
      <Badge variant="outline" className={`${config.bg} ${config.text} font-medium`}>
        {config.label}
      </Badge>
    );
  };

  const getFormattedErrorDisplay = () => {
    const errorMessage = signal.errorMessage || 'Không có thông tin lỗi';
    const errorCode = signal.errorCode || `ERR-${signal.id?.substring(0, 6)}`;
    
    return (
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
          {errorCode}
        </span>
        <ErrorDetailsTooltip errorMessage={errorMessage}>
          <HelpCircle className="h-4 w-4 text-blue-500 cursor-help" />
        </ErrorDetailsTooltip>
      </div>
    );
  };

  const getFormattedBotId = () => {
    if (!signal.botId) return 'N/A';
    
    // Display the bot ID directly instead of name
    const displayId = signal.botId;
    
    return (
      <div className="flex items-center">
        <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-mono text-xs">
          {displayId}
        </span>
        <ErrorDetailsTooltip errorMessage={`Bot Name: ${signal.botName || 'Unknown'}`}>
          <HelpCircle className="h-3 w-3 ml-1 text-muted-foreground cursor-help" />
        </ErrorDetailsTooltip>
      </div>
    );
  };

  const getFormattedUserId = () => {
    if (!signal.userId) return 'N/A';
    
    const displayId = signal.userId.includes('-') 
      ? signal.userId.split('-')[1] 
      : signal.userId;
      
    return (
      <div className="flex items-center">
        <User className="h-3 w-3 mr-1 text-muted-foreground" />
        <span className="text-xs font-mono">{displayId}</span>
      </div>
    );
  };
  
  return (
    <TableRow className={`
      ${isUnread ? "bg-red-50/10 dark:bg-red-900/10" : ""}
      hover:bg-red-50/5 dark:hover:bg-red-900/5
      transition-colors
    `}>
      <TableCell className="font-mono text-xs">
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          {signal.id ? signal.id.substring(0, 8) : 'N/A'}
        </span>
      </TableCell>
      
      <TableCell>
        {renderSeverityBadge()}
      </TableCell>
      
      <TableCell>
        {getFormattedErrorDisplay()}
      </TableCell>
      
      <TableCell className="text-sm">
        <div className="flex items-center text-muted-foreground">
          <span>{formatDateTime(signal.timestamp)}</span>
        </div>
      </TableCell>
      
      <TableCell 
        className="cursor-pointer hover:text-blue-600"
        onClick={handleBotClick}
      >
        {getFormattedBotId()}
      </TableCell>
      
      <TableCell>
        {getBotTypeBadge()}
      </TableCell>
      
      <TableCell>
        {getFormattedUserId()}
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-2">
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
          
          {onViewDetails && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleViewDetails}
              className="h-6 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              <span className="text-xs">Chi tiết</span>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ErrorSignalRow;

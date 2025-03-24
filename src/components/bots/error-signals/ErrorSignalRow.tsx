
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import ActionBadge from './ActionBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
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
        {signal.tradingAccount || 'N/A'}
      </TableCell>
      <TableCell>
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


import React from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ErrorSignalRowProps {
  signal: ExtendedSignal;
  isUnread: boolean;
  onMarkAsRead: (signalId: string) => void;
  onViewDetails: (errorId: string) => void;
}

const ErrorSignalRow: React.FC<ErrorSignalRowProps> = ({
  signal,
  isUnread,
  onMarkAsRead,
  onViewDetails
}) => {
  const getSeverityColor = (severity: string | undefined) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300';
    }
  };

  const handleView = () => {
    if (isUnread) {
      onMarkAsRead(signal.id);
    }
    onViewDetails(signal.id);
  };

  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <TableRow className={isUnread ? 'bg-red-50/50 dark:bg-red-950/10' : undefined}>
      <TableCell className="font-mono text-xs">
        {isUnread && (
          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
        )}
        {signal.id.substring(0, 8)}...
      </TableCell>
      <TableCell>{signal.instrument}</TableCell>
      <TableCell>
        <span className="font-medium">{signal.botName || 'Unknown Bot'}</span>
        <div className="text-xs text-muted-foreground">{signal.botType || 'Unknown'}</div>
      </TableCell>
      <TableCell>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[200px] truncate">
              {signal.errorMessage || 'Unknown error'}
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-[300px]">
            <p>{signal.errorMessage || 'Unknown error'}</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getSeverityColor(signal.errorSeverity)}>
          {signal.errorSeverity || 'unknown'}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatTime(signal.timestamp)}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleView}
            className="h-8 px-2 text-blue-600 dark:text-blue-400"
          >
            <Eye className="h-4 w-4 mr-1" />
            Chi tiết
          </Button>
          {isUnread && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkAsRead(signal.id)}
              className="h-8 px-2 text-green-600 dark:text-green-400"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Đã đọc
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ErrorSignalRow;

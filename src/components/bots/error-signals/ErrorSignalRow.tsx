import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, ExternalLink } from 'lucide-react';
import { ExtendedSignal } from './types';
import ActionBadge from './ActionBadge';
import ErrorDetailsTooltip from './ErrorDetailsTooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ErrorSignalRowProps {
  signal: ExtendedSignal;
  isUnread: boolean;
  onMarkAsRead: (signalId: string) => void;
}

const ErrorSignalRow: React.FC<ErrorSignalRowProps> = ({ signal, isUnread, onMarkAsRead }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const navigateToBotDetail = (botId: string) => {
    console.log("Navigating to bot with ID:", botId);
    
    if (!botId) {
      console.error("No bot ID provided for navigation");
      return;
    }
    
    // Check if we're in admin area
    const isAdminArea = location.pathname.startsWith('/admin');
    console.log("Current path:", location.pathname, "Is admin area:", isAdminArea);
    
    // Handle different bot ID prefixes for routing
    try {
      // Strip MY- prefix if it exists
      const actualBotId = botId.startsWith("MY-") ? botId.replace("MY-", "") : botId;
      
      if (botId.includes("BOT") || botId.startsWith("BOT")) {
        const targetPath = isAdminArea ? `/admin/user-bots/${actualBotId}` : `/bots/${actualBotId}`;
        console.log("Navigating to user bot:", targetPath);
        navigate(targetPath);
      } 
      else if (botId.includes("PREMIUM") || botId.startsWith("PREMIUM")) {
        const targetPath = isAdminArea ? `/admin/premium-bots/${actualBotId}` : `/integrated-premium-bots/${actualBotId}`;
        console.log("Navigating to premium bot:", targetPath);
        navigate(targetPath);
      } 
      else if (botId.includes("PROP") || botId.startsWith("PROP")) {
        const targetPath = isAdminArea ? `/admin/prop-bots/${actualBotId}` : `/integrated-prop-bots/${actualBotId}`;
        console.log("Navigating to prop bot:", targetPath);
        navigate(targetPath);
      } 
      else {
        console.log("Unknown bot type for ID:", botId);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: `Không thể xác định loại bot: ${botId}`
        });
      }
    } catch (error) {
      console.error("Error navigating to bot:", error);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Có lỗi khi chuyển hướng đến trang chi tiết bot"
      });
    }
  };

  return (
    <TableRow 
      className={`border-b border-red-100 dark:border-red-800/20 ${
        isUnread ? 'bg-red-50/50 dark:bg-red-900/20' : ''
      }`}
    >
      <TableCell className="font-medium text-red-700 dark:text-red-400">
        <div className="flex items-center">
          {signal.id}
          {isUnread && (
            <span className="ml-2 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </div>
      </TableCell>
      <TableCell>{signal.instrument}</TableCell>
      <TableCell>
        {new Date(signal.timestamp).toLocaleString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </TableCell>
      <TableCell>{signal.amount}</TableCell>
      <TableCell><ActionBadge action={signal.action} /></TableCell>
      <TableCell>
        <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400">
          {signal.status}
        </Badge>
      </TableCell>
      <TableCell>
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateToBotDetail(signal.botId || '');
          }}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          {signal.botName || signal.botId}
          <ExternalLink className="h-3 w-3" />
        </button>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="flex items-center gap-1 mb-1">
            <CircleDollarSign className="h-3 w-3 text-slate-500" />
            {signal.tradingAccount} | {signal.tradingAccountType} | {signal.tradingAccountBalance}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-sm text-red-600 dark:text-red-400">
        <ErrorDetailsTooltip signal={signal} onView={onMarkAsRead} />
      </TableCell>
    </TableRow>
  );
};

export default ErrorSignalRow;

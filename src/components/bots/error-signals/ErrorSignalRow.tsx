
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, ExternalLink } from 'lucide-react';
import { ExtendedSignal } from './types';
import ActionBadge from './ActionBadge';
import ErrorDetailsTooltip from './ErrorDetailsTooltip';
import { useNavigate } from 'react-router-dom';

interface ErrorSignalRowProps {
  signal: ExtendedSignal;
  isUnread: boolean;
  onMarkAsRead: (signalId: string) => void;
}

const ErrorSignalRow: React.FC<ErrorSignalRowProps> = ({ signal, isUnread, onMarkAsRead }) => {
  const navigate = useNavigate();

  const navigateToBotDetail = (botId: string) => {
    console.log("Navigating to bot with ID:", botId);
    
    if (botId) {
      // Route to the appropriate bot detail page based on the bot ID prefix
      if (botId.startsWith("BOT")) {
        console.log("Navigating to user bot:", `/bots/${botId}`);
        navigate(`/bots/${botId}`);
      } else if (botId.startsWith("PREMIUM")) {
        console.log("Navigating to premium bot:", `/integrated-premium-bots/${botId}`);
        navigate(`/integrated-premium-bots/${botId}`);
      } else if (botId.startsWith("PROP")) {
        console.log("Navigating to prop bot:", `/integrated-prop-bots/${botId}`);
        navigate(`/integrated-prop-bots/${botId}`);
      } else if (botId.startsWith("MY")) {
        // Handle "MY-" prefixed bots by removing the "MY-" prefix and redirecting accordingly
        const actualBotId = botId.replace("MY-", "");
        if (botId.includes("USER")) {
          console.log("Navigating to user bot from MY prefix:", `/bots/${actualBotId}`);
          navigate(`/bots/${actualBotId}`);
        } else if (botId.includes("PREMIUM")) {
          console.log("Navigating to premium bot from MY prefix:", `/integrated-premium-bots/${actualBotId}`);
          navigate(`/integrated-premium-bots/${actualBotId}`);
        } else if (botId.includes("PROP")) {
          console.log("Navigating to prop bot from MY prefix:", `/integrated-prop-bots/${actualBotId}`);
          navigate(`/integrated-prop-bots/${actualBotId}`);
        } else {
          console.log("Unknown MY- bot type for ID:", botId);
        }
      } else {
        console.log("Unknown bot type for ID:", botId);
      }
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


import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, HelpCircle, User, CircleDollarSign } from 'lucide-react';
import { TradingViewSignal } from '@/types';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ErrorSignalsProps {
  botId: string;
}

// Extended signal type to include user and account information
interface ExtendedSignal extends TradingViewSignal {
  userId?: string;
  tradingAccount?: string;
  tradingAccountType?: string;
  tradingAccountBalance?: string;
}

const ErrorSignals: React.FC<ErrorSignalsProps> = ({ botId }) => {
  const [errorSignals, setErrorSignals] = useState<ExtendedSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Mock data loading
    const fetchErrorSignals = () => {
      setLoading(true);
      setTimeout(() => {
        // Mock error signals data with added user ID and account information
        const mockErrorSignals: ExtendedSignal[] = [
          {
            id: 'CS-20354',
            action: 'ENTER_LONG',
            instrument: 'BTCUSDT',
            timestamp: new Date().toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '1.5',
            status: 'Failed',
            errorMessage: 'API Authentication Error: Invalid credentials',
            userId: 'user_01HJKLMNOP',
            tradingAccount: '4056629',
            tradingAccountType: 'Live',
            tradingAccountBalance: '$500'
          },
          {
            id: 'CS-20347',
            action: 'EXIT_SHORT',
            instrument: 'ETHUSDT',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '0.8',
            status: 'Failed',
            errorMessage: 'Insufficient balance for operation',
            userId: 'user_01HQRSTUV',
            tradingAccount: '65784123',
            tradingAccountType: 'Demo',
            tradingAccountBalance: '$10,000'
          },
          {
            id: 'CS-20321',
            action: 'ENTER_SHORT',
            instrument: 'SOLUSDT',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '10.2',
            status: 'Failed',
            errorMessage: 'Exchange rejected order: Market closed',
            userId: 'user_01HWXYZABC',
            tradingAccount: '98452367',
            tradingAccountType: 'Live',
            tradingAccountBalance: '$2,450'
          },
          {
            id: 'CS-20318',
            action: 'EXIT_LONG',
            instrument: 'ADAUSDT',
            timestamp: new Date(Date.now() - 10800000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '150',
            status: 'Failed',
            errorMessage: 'Position not found or already closed',
            userId: 'user_01HDEFGHIJ',
            tradingAccount: '32541698',
            tradingAccountType: 'Live',
            tradingAccountBalance: '$1,750'
          },
        ];
        
        setErrorSignals(mockErrorSignals);
        
        // Set the first 3 errors as unread for demonstration
        const newUnreadSet = new Set<string>();
        mockErrorSignals.slice(0, 3).forEach(signal => {
          newUnreadSet.add(signal.id);
        });
        setUnreadErrors(newUnreadSet);
        
        setLoading(false);
      }, 800);
    };

    fetchErrorSignals();
  }, [botId]);

  const markAsRead = (signalId: string) => {
    setUnreadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(signalId);
      return newSet;
    });
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'ENTER_LONG':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">{action}</Badge>;
      case 'EXIT_LONG':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{action}</Badge>;
      case 'ENTER_SHORT':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">{action}</Badge>;
      case 'EXIT_SHORT':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200">{action}</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading error signals...</div>;
  }

  if (errorSignals.length === 0) {
    return (
      <div className="py-10 text-center">
        <AlertTriangle className="h-10 w-10 text-green-500 mx-auto mb-3" />
        <p className="text-green-600 font-medium">No error signals to fix!</p>
        <p className="text-muted-foreground mt-1">All your signals are processing correctly.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-red-50 dark:bg-red-900/20">
            <TableHead className="text-red-700 dark:text-red-400">ID</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Symbol</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Date</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Quantity</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Action</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Status</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">User ID</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Account</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {errorSignals.map((signal) => (
            <TableRow 
              key={signal.id} 
              className={`border-b border-red-100 dark:border-red-800/20 ${
                unreadErrors.has(signal.id) ? 'bg-red-50/50 dark:bg-red-900/20' : ''
              }`}
            >
              <TableCell className="font-medium text-red-700 dark:text-red-400">
                <div className="flex items-center">
                  {signal.id}
                  {unreadErrors.has(signal.id) && (
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
              <TableCell>{getActionBadge(signal.action)}</TableCell>
              <TableCell>
                <Badge className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400">
                  {signal.status}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 text-slate-500" />
                  {signal.userId}
                </div>
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild onClick={() => markAsRead(signal.id)}>
                      <button className="flex items-center" type="button">
                        <HelpCircle className="h-4 w-4 text-red-500 hover:text-red-700 cursor-pointer" />
                        <span className="ml-1 truncate max-w-[150px] text-xs">
                          Details
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="max-w-md p-4 bg-white dark:bg-zinc-900 border border-red-200 dark:border-red-800/30 shadow-lg rounded-lg"
                    >
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-1">Error Details</h4>
                      <p className="text-red-600 dark:text-red-300 mb-2">{signal.errorMessage}</p>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        <span className="block">Signal Token: {signal.signalToken}</span>
                        <span className="block">Max Lag: {signal.maxLag}</span>
                        <span className="block">User ID: {signal.userId}</span>
                        <span className="block">Trading Account: {signal.tradingAccount} | {signal.tradingAccountType} | {signal.tradingAccountBalance}</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800/30">
        <p className="text-sm text-red-700 dark:text-red-400 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <strong>Important:</strong> These error signals require immediate attention to ensure proper functioning of your trading system.
        </p>
      </div>
    </div>
  );
};

export default ErrorSignals;


import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TradingViewSignal } from '@/types';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { useSafeLoading } from '@/hooks/useSafeLoading';
import BotEmptyState from './common/BotEmptyState';

interface TradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
  botType?: 'premium' | 'prop' | 'user';
}

interface ExtendedTradingViewSignal extends TradingViewSignal {
  userId?: string;
}

const TradingViewLogs: React.FC<TradingViewLogsProps> = ({ 
  botId, 
  userId, 
  refreshTrigger = false,
  botType = 'user'
}) => {
  const [logs, setLogs] = useState<ExtendedTradingViewSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Use our safe loading hook instead of raw useState
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 3000,
    debugComponent: 'TradingViewLogs'
  });

  const fetchLogs = () => {
    console.log(`TradingViewLogs - Fetching logs for userId: ${userId}`);
    startLoading();
    setError(null);
    
    setTimeout(() => {
      try {
        const mockLogs: ExtendedTradingViewSignal[] = [
          {
            id: 'SIG001',
            action: 'ENTER_LONG',
            instrument: 'BTCUSDT',
            timestamp: new Date().toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '1.5',
            status: 'Processed',
            userId: 'USR-001' // Standardized to USR-001 format with dash
          },
          {
            id: 'SIG002',
            action: 'EXIT_LONG',
            instrument: 'ETHUSDT',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '2.3',
            status: 'Processed',
            userId: 'USR-001' // Standardized to USR-001 format with dash
          },
          {
            id: 'SIG003',
            action: 'ENTER_SHORT',
            instrument: 'SOLUSDT',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '3.7',
            status: 'Failed',
            errorMessage: 'Invalid account configuration',
            userId: 'USR-002' // Standardized to USR-002 format with dash
          },
        ];
        
        try {
          // Use normalizeUserId for consistent comparison
          const normalizedInputUserId = normalizeUserId(userId);
          console.log(`TradingViewLogs - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
          
          const filteredLogs = mockLogs.filter(log => {
            const normalizedLogUserId = normalizeUserId(log.userId || '');
            const match = normalizedLogUserId === normalizedInputUserId;
            console.log(`TradingViewLogs - Comparing: ${log.userId} (${normalizedLogUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
            return match;
          });
          
          console.log(`TradingViewLogs - Filtered logs: ${filteredLogs.length} of ${mockLogs.length}`);
          setLogs(filteredLogs);
        } catch (filterErr) {
          console.error('Error filtering logs:', filterErr);
          setError(filterErr instanceof Error ? filterErr : new Error('Error filtering logs data'));
          setLogs([]);
        }
      } catch (error) {
        console.error('Error processing logs:', error);
        setError(error instanceof Error ? error : new Error('Error processing logs data'));
        setLogs([]);
      } finally {
        stopLoading();
      }
    }, 800);
  };

  useEffect(() => {
    fetchLogs();
  }, [botId, userId]);

  // Handle refresh trigger from parent
  useEffect(() => {
    if (refreshTrigger) {
      fetchLogs();
    }
  }, [refreshTrigger]);

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Processed':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">{status}</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">{status}</Badge>;
      case 'Failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
        <p>Loading logs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 rounded-md text-center border border-red-200 bg-red-50/30 dark:border-red-800/30 dark:bg-red-900/10">
        <div className="max-w-md mx-auto">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2 text-red-700">Đã xảy ra lỗi khi tải dữ liệu</h3>
          <p className="text-sm text-red-600 mb-4">{error.message}</p>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            className="border-red-300 hover:bg-red-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <BotEmptyState
        botType={botType}
        dataType="logs"
        onRefresh={handleRefresh}
        title="Không có TradingView logs"
        message="Chưa có log TradingView nào được ghi nhận cho bot này"
      />
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.id}</TableCell>
              <TableCell>{log.instrument}</TableCell>
              <TableCell>
                {new Date(log.timestamp).toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
              <TableCell>{log.amount}</TableCell>
              <TableCell>{getActionBadge(log.action)}</TableCell>
              <TableCell>{getStatusBadge(log.status)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {log.errorMessage || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Logs
        </Button>
      </div>
    </div>
  );
};

export default TradingViewLogs;

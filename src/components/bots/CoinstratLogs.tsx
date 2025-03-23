import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { CoinstratSignal } from '@/types/signal';
import SignalActionBadge from './signal-logs/SignalActionBadge';
import SignalStatusBadge from './signal-logs/SignalStatusBadge';
import AccountStatusSummary from './signal-logs/AccountStatusSummary';
import FormatDateTime from './signal-logs/FormatDateTime';
import SignalDetailModal from './signal-logs/SignalDetailModal';

interface CoinstratLogsProps {
  botId: string;
  userId: string;
  initialData?: CoinstratSignal[];
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ botId, userId, initialData = [] }) => {
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState<CoinstratSignal | null>(null);
  const [signalDetailsOpen, setSignalDetailsOpen] = useState(false);

  const fetchLogs = () => {
    setLoading(true);
    
    if (initialData && initialData.length > 0) {
      const filteredLogs = initialData.filter(log => {
        const processedAccountsForUser = log.processedAccounts.filter(account => account.userId === userId);
        const failedAccountsForUser = log.failedAccounts.filter(account => account.userId === userId);
        
        return processedAccountsForUser.length > 0 || failedAccountsForUser.length > 0;
      });
      
      setLogs(filteredLogs);
      setLoading(false);
      return;
    }
    
    setTimeout(() => {
      const mockLogs: CoinstratSignal[] = [
        {
          id: 'CSP-78952364',
          originalSignalId: 'SIG001',
          action: 'ENTER_LONG',
          instrument: 'BTCUSDT',
          timestamp: new Date().toISOString(),
          signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
          maxLag: '5s',
          investmentType: 'crypto',
          amount: '1.5',
          status: 'Processed',
          processedAccounts: [
            {
              accountId: 'ACC-001',
              userId: 'USR-001',
              name: 'Binance Spot Account',
              timestamp: new Date().toISOString(),
              status: 'success'
            },
            {
              accountId: 'ACC-002',
              userId: 'USR-001',
              name: 'Coinstart Pro Account',
              timestamp: new Date().toISOString(),
              status: 'success'
            }
          ],
          failedAccounts: []
        },
        {
          id: 'CSP-78956789',
          originalSignalId: 'SIG002',
          action: 'EXIT_LONG',
          instrument: 'ETHUSDT',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
          maxLag: '5s',
          investmentType: 'crypto',
          amount: '2.3',
          status: 'Processed',
          processedAccounts: [
            {
              accountId: 'ACC-001',
              userId: 'USR-001',
              name: 'Binance Spot Account',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              status: 'success'
            }
          ],
          failedAccounts: []
        },
        {
          id: 'CSP-78959012',
          originalSignalId: 'SIG003',
          action: 'ENTER_SHORT',
          instrument: 'SOLUSDT',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
          maxLag: '5s',
          investmentType: 'crypto',
          amount: '3.7',
          status: 'Failed',
          processedAccounts: [],
          failedAccounts: [
            {
              accountId: 'ACC-003',
              userId: 'USR-001',
              name: 'FTX Account',
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              reason: 'Invalid account configuration',
              errorCode: 'ACC_CONFIG_ERROR',
              status: 'failed'
            },
            {
              accountId: 'ACC-004',
              userId: 'USR-001',
              name: 'Bybit Account',
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              reason: 'API key expired',
              errorCode: 'API_KEY_EXPIRED',
              status: 'failed'
            }
          ],
          errorMessage: 'Invalid account configuration'
        },
      ];
      
      const filteredLogs = mockLogs.filter(log => {
        const processedAccountsForUser = log.processedAccounts.filter(account => account.userId === userId);
        const failedAccountsForUser = log.failedAccounts.filter(account => account.userId === userId);
        
        return processedAccountsForUser.length > 0 || failedAccountsForUser.length > 0;
      });
      
      setLogs(filteredLogs);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchLogs();
  }, [botId, userId, initialData]);

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
  };

  const handleViewSignalDetails = (signal: CoinstratSignal) => {
    setSelectedSignal(signal);
    setSignalDetailsOpen(true);
  };

  if (loading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
        <p>Loading logs...</p>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground mb-4">No logs available for this bot yet.</p>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>TradingView ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Accounts</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.originalSignalId}</TableCell>
              <TableCell>{log.instrument}</TableCell>
              <TableCell>
                <FormatDateTime timestamp={log.timestamp} />
              </TableCell>
              <TableCell>{log.amount}</TableCell>
              <TableCell>
                <SignalActionBadge action={log.action} />
              </TableCell>
              <TableCell>
                <SignalStatusBadge status={log.status as string} />
              </TableCell>
              <TableCell>
                <AccountStatusSummary signal={log} userId={userId} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {log.errorMessage || '-'}
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleViewSignalDetails(log)}
                  title="View Signal Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
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

      <SignalDetailModal 
        open={signalDetailsOpen}
        onOpenChange={setSignalDetailsOpen}
        signal={selectedSignal}
        userId={userId}
      />
    </div>
  );
};

export default CoinstratLogs;


import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CoinstratSignal } from '@/types';
import { Check, X, Info } from 'lucide-react';

interface CoinstratLogsProps {
  botId: string;
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ botId }) => {
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const fetchLogs = () => {
      setLoading(true);
      setTimeout(() => {
        // Mock Coinstrat signal logs
        const mockLogs: CoinstratSignal[] = [
          {
            id: 'CST001',
            originalSignalId: 'SIG001',
            action: 'ENTER_LONG',
            instrument: 'BTCUSDT',
            timestamp: new Date().toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '100%',
            status: 'Processed',
            processedAccounts: [
              { accountId: 'acc001', name: 'Account 1', timestamp: new Date().toISOString() },
              { accountId: 'acc002', name: 'Account 2', timestamp: new Date().toISOString() }
            ],
            failedAccounts: []
          },
          {
            id: 'CST002',
            originalSignalId: 'SIG002',
            action: 'EXIT_LONG',
            instrument: 'ETHUSDT',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '50%',
            status: 'Sent',
            processedAccounts: [
              { accountId: 'acc001', name: 'Account 1', timestamp: new Date(Date.now() - 3600000).toISOString() }
            ],
            failedAccounts: [
              { 
                accountId: 'acc003', 
                name: 'Account 3', 
                timestamp: new Date(Date.now() - 3590000).toISOString(),
                reason: 'Connection timeout'
              }
            ]
          },
          {
            id: 'CST003',
            originalSignalId: 'SIG003',
            action: 'ENTER_SHORT',
            instrument: 'SOLUSDT',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '25%',
            status: 'Failed',
            processedAccounts: [],
            failedAccounts: [
              { 
                accountId: 'acc001', 
                name: 'Account 1', 
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                reason: 'Invalid account configuration'
              },
              { 
                accountId: 'acc002', 
                name: 'Account 2', 
                timestamp: new Date(Date.now() - 7190000).toISOString(),
                reason: 'Invalid account configuration'
              }
            ],
            errorMessage: 'Signal processing failed for all accounts'
          },
        ];
        
        setLogs(mockLogs);
        setLoading(false);
      }, 800);
    };

    fetchLogs();
  }, [botId]);

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
      case 'Sent':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">{status}</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">{status}</Badge>;
      case 'Failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (log: CoinstratSignal) => {
    if (log.status === 'Processed' || log.status === 'Sent') {
      return <Check className="h-5 w-5 text-green-500" />;
    } else if (log.status === 'Failed') {
      return <X className="h-5 w-5 text-red-500" />;
    } else {
      return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading logs...</div>;
  }

  if (logs.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">No logs available for this bot yet.</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>ID TV</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Accounts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                {getStatusIcon(log)}
              </TableCell>
              <TableCell className="font-medium">{log.id}</TableCell>
              <TableCell>{log.originalSignalId}</TableCell>
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
              <TableCell>
                <div className="flex items-center space-x-1">
                  <span className="text-green-600 font-medium">{log.processedAccounts.length}</span>
                  <span>/</span>
                  <span className="text-red-600 font-medium">{log.failedAccounts.length}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoinstratLogs;

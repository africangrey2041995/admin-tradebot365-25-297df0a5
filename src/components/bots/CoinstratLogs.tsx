
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TradingViewSignal } from '@/types';
import { RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CoinstratLogsProps {
  botId: string;
  userId: string; // Add userId prop
}

interface ExtendedTradingViewSignal extends TradingViewSignal {
  userId?: string;
  accountId?: string;
  accountName?: string;
  coinstratSignalId?: string;
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ botId, userId }) => {
  const [logs, setLogs] = useState<ExtendedTradingViewSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState<ExtendedTradingViewSignal | null>(null);
  const [signalDetailsOpen, setSignalDetailsOpen] = useState(false);

  const fetchLogs = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock data for Coinstrat logs
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
          userId: 'USR-001',
          accountId: 'ACC-001',
          accountName: 'Binance Spot Account',
          coinstratSignalId: 'CSP-78952364'
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
          userId: 'USR-001',
          accountId: 'ACC-002',
          accountName: 'Coinstart Pro Account',
          coinstratSignalId: 'CSP-78956789'
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
          userId: 'USR-002',
          accountId: 'ACC-003',
          accountName: 'FTX Account',
          coinstratSignalId: 'CSP-78959012'
        },
      ];
      
      // Filter logs by userId
      const filteredLogs = mockLogs.filter(log => log.userId === userId);
      
      setLogs(filteredLogs);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchLogs();
  }, [botId, userId]);

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

  const handleRefresh = () => {
    toast.info('Refreshing logs...');
    fetchLogs();
  };

  const handleViewSignalDetails = (signal: ExtendedTradingViewSignal) => {
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
            <TableHead>ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Account</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Details</TableHead>
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
              <TableCell>{getStatusBadge(log.status as string)}</TableCell>
              <TableCell>{log.accountName || '-'}</TableCell>
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

      <Dialog open={signalDetailsOpen} onOpenChange={setSignalDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Signal Details</DialogTitle>
            <DialogDescription>
              Detailed information about the signal and associated account
            </DialogDescription>
          </DialogHeader>
          
          {selectedSignal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">TradingView ID</h3>
                  <p className="text-sm font-semibold">{selectedSignal.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Coinstrat Pro ID</h3>
                  <p className="text-sm font-semibold">{selectedSignal.coinstratSignalId}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Account Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs text-muted-foreground">Account ID</h4>
                    <p className="text-sm font-medium">{selectedSignal.accountId}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground">Account Name</h4>
                    <p className="text-sm font-medium">{selectedSignal.accountName}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2">Signal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs text-muted-foreground">Instrument</h4>
                    <p className="text-sm font-medium">{selectedSignal.instrument}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground">Action</h4>
                    <p className="text-sm font-medium">{selectedSignal.action}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground">Amount</h4>
                    <p className="text-sm font-medium">{selectedSignal.amount}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground">Status</h4>
                    <p className="text-sm font-medium">{selectedSignal.status}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground">Signal Token</h4>
                    <p className="text-sm font-medium break-all">{selectedSignal.signalToken}</p>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground">Max Lag</h4>
                    <p className="text-sm font-medium">{selectedSignal.maxLag}</p>
                  </div>
                </div>
              </div>
              
              {selectedSignal.errorMessage && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium text-red-600 mb-2">Error Information</h3>
                  <p className="text-sm text-red-600">{selectedSignal.errorMessage}</p>
                </div>
              )}
              
              <div className="border-t pt-4">
                <h4 className="text-xs text-muted-foreground">Timestamp</h4>
                <p className="text-sm font-medium">
                  {new Date(selectedSignal.timestamp).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoinstratLogs;

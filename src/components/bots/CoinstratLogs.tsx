
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CoinstratSignal, AccountSignalStatus } from '@/types/signal';
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
  userId: string;
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ botId, userId }) => {
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState<CoinstratSignal | null>(null);
  const [signalDetailsOpen, setSignalDetailsOpen] = useState(false);

  const fetchLogs = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock data for Coinstrat logs - using CoinstratSignal structure
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
              status: 'failed'
            },
            {
              accountId: 'ACC-004',
              userId: 'USR-001',
              name: 'Bybit Account',
              timestamp: new Date(Date.now() - 7200000).toISOString(),
              reason: 'API key expired',
              status: 'failed'
            }
          ],
          errorMessage: 'Invalid account configuration'
        },
      ];
      
      // Filter logs by userId
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

  const getAccountStatusSummary = (signal: CoinstratSignal) => {
    // Filter accounts for current user
    const userProcessedAccounts = signal.processedAccounts.filter(account => account.userId === userId);
    const userFailedAccounts = signal.failedAccounts.filter(account => account.userId === userId);
    
    const total = userProcessedAccounts.length + userFailedAccounts.length;
    const succeeded = userProcessedAccounts.length;
    const failed = userFailedAccounts.length;
    
    return (
      <div className="flex flex-col gap-2">
        {succeeded > 0 && (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">
            {succeeded} tài khoản thành công
          </Badge>
        )}
        {failed > 0 && (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">
            {failed} tài khoản thất bại
          </Badge>
        )}
        {total === 0 && (
          <span className="text-muted-foreground text-sm">Không có tài khoản</span>
        )}
      </div>
    );
  };

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
              <TableCell>{getAccountStatusSummary(log)}</TableCell>
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
              Detailed information about the signal and associated accounts
            </DialogDescription>
          </DialogHeader>
          
          {selectedSignal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">TradingView ID</h3>
                  <p className="text-sm font-semibold">{selectedSignal.originalSignalId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Coinstrat Pro ID</h3>
                  <p className="text-sm font-semibold">{selectedSignal.id}</p>
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
              
              {/* Processed Accounts Section */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2 text-emerald-600">Processed Accounts</h3>
                {selectedSignal.processedAccounts.filter(account => account.userId === userId).length > 0 ? (
                  <div className="space-y-3">
                    {selectedSignal.processedAccounts
                      .filter(account => account.userId === userId)
                      .map((account, index) => (
                        <div key={`processed-${account.accountId}-${index}`} className="bg-emerald-50 border border-emerald-100 p-3 rounded-md">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <h4 className="text-xs text-muted-foreground">Account Name</h4>
                              <p className="text-sm font-medium">{account.name}</p>
                            </div>
                            <div>
                              <h4 className="text-xs text-muted-foreground">Account ID</h4>
                              <p className="text-sm font-medium">{account.accountId}</p>
                            </div>
                            <div>
                              <h4 className="text-xs text-muted-foreground">Processing Time</h4>
                              <p className="text-sm font-medium">
                                {new Date(account.timestamp).toLocaleString('en-US', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                                })}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs text-muted-foreground">Status</h4>
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 mt-1">
                                Success
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No processed accounts found</p>
                )}
              </div>
              
              {/* Failed Accounts Section */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2 text-red-600">Failed Accounts</h3>
                {selectedSignal.failedAccounts.filter(account => account.userId === userId).length > 0 ? (
                  <div className="space-y-3">
                    {selectedSignal.failedAccounts
                      .filter(account => account.userId === userId)
                      .map((account, index) => (
                        <div key={`failed-${account.accountId}-${index}`} className="bg-red-50 border border-red-100 p-3 rounded-md">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <h4 className="text-xs text-muted-foreground">Account Name</h4>
                              <p className="text-sm font-medium">{account.name}</p>
                            </div>
                            <div>
                              <h4 className="text-xs text-muted-foreground">Account ID</h4>
                              <p className="text-sm font-medium">{account.accountId}</p>
                            </div>
                            <div>
                              <h4 className="text-xs text-muted-foreground">Processing Time</h4>
                              <p className="text-sm font-medium">
                                {new Date(account.timestamp).toLocaleString('en-US', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                                })}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs text-muted-foreground">Status</h4>
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 mt-1">
                                Failed
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-2">
                            <h4 className="text-xs text-muted-foreground">Error Reason</h4>
                            <p className="text-sm text-red-600 mt-1">{account.reason || 'Unknown error'}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No failed accounts found</p>
                )}
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

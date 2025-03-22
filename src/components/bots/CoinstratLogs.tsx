import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CoinstratSignal, ExtendedSignal } from '@/types';
import { Check, X, Info, Eye, List, User } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

interface CoinstratLogsProps {
  botId: string;
}

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ botId }) => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<CoinstratSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<CoinstratSignal | null>(null);
  const [accountsDialogOpen, setAccountsDialogOpen] = useState(false);

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
            amount: '1.5',
            status: 'Processed',
            processedAccounts: [
              { 
                accountId: 'acc001', 
                userId: 'USR001',
                name: '24958130 | Live | $500', 
                timestamp: new Date().toISOString(),
                status: 'success'
              },
              { 
                accountId: 'acc002', 
                userId: 'USR002',
                name: '24958131 | Live | $500', 
                timestamp: new Date().toISOString(),
                status: 'success'
              }
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
            amount: '2.3',
            status: 'Sent',
            processedAccounts: [
              { 
                accountId: 'acc001', 
                userId: 'USR001',
                name: '24958130 | Live | $500', 
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                status: 'success'
              }
            ],
            failedAccounts: [
              { 
                accountId: 'acc003', 
                userId: 'USR003',
                name: '24958132 | Demo | $10000', 
                timestamp: new Date(Date.now() - 3590000).toISOString(),
                reason: 'Connection timeout',
                status: 'failed'
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
            amount: '3.7',
            status: 'Failed',
            processedAccounts: [],
            failedAccounts: [
              { 
                accountId: 'acc001', 
                userId: 'USR001',
                name: '24958130 | Live | $500', 
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                reason: 'Invalid account configuration',
                status: 'failed'
              },
              { 
                accountId: 'acc002', 
                userId: 'USR002',
                name: '24958131 | Live | $500', 
                timestamp: new Date(Date.now() - 7190000).toISOString(),
                reason: 'Invalid account configuration',
                status: 'failed'
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

  const showAccountsDialog = (log: CoinstratSignal) => {
    setSelectedLog(log);
    setAccountsDialogOpen(true);
  };

  const handleViewUser = (userId: string) => {
    navigate(`/admin/users/${userId}`);
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
            <TableHead>Note</TableHead>
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
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-green-600 font-medium">{log.processedAccounts.length}</span>
                    <span>/</span>
                    <span className="text-red-600 font-medium">{log.failedAccounts.length}</span>
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => showAccountsDialog(log)}
                          className="ml-1 p-1 hover:bg-slate-100 rounded-full"
                        >
                          <Eye className="h-4 w-4 text-slate-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View accounts</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell>
                {log.errorMessage && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="inline-flex items-center justify-center rounded-full border p-1 text-red-600 hover:bg-red-50">
                        <Info className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Error Details</h4>
                        <p className="text-sm text-red-600">{log.errorMessage}</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={accountsDialogOpen} onOpenChange={setAccountsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Accounts for Signal {selectedLog?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4">
              {selectedLog.processedAccounts.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-green-600 mb-2 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> 
                    Processed Accounts ({selectedLog.processedAccounts.length})
                  </h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedLog.processedAccounts.map((account) => (
                          <TableRow key={account.accountId}>
                            <TableCell className="font-medium">{account.name}</TableCell>
                            <TableCell>
                              <Button 
                                variant="link" 
                                className="p-0 h-auto font-medium text-primary flex items-center gap-1"
                                onClick={() => handleViewUser(account.userId || '')}
                              >
                                <User className="h-3 w-3" />
                                {account.userId}
                              </Button>
                            </TableCell>
                            <TableCell>
                              {new Date(account.timestamp).toLocaleString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              {selectedLog.failedAccounts.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <X className="h-4 w-4 mr-1" />
                    Failed Accounts ({selectedLog.failedAccounts.length})
                  </h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>User ID</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedLog.failedAccounts.map((account) => (
                          <TableRow key={account.accountId}>
                            <TableCell className="font-medium">{account.name}</TableCell>
                            <TableCell>
                              <Button 
                                variant="link" 
                                className="p-0 h-auto font-medium text-primary flex items-center gap-1"
                                onClick={() => handleViewUser(account.userId || '')}
                              >
                                <User className="h-3 w-3" />
                                {account.userId}
                              </Button>
                            </TableCell>
                            <TableCell>
                              {new Date(account.timestamp).toLocaleString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </TableCell>
                            <TableCell className="text-red-600">{account.reason}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoinstratLogs;


import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  AlertTriangle, 
  ArrowDown, 
  ArrowUp, 
  CheckCircle, 
  Clock, 
  Eye,
  Filter, 
  RefreshCw, 
  XCircle 
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock type for Coinstrat logs
type CoinstratLog = {
  id: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
  signalId: string;
  idTv: string;
  instrument: string;
  action: string;
  quantity: string;
  message?: string;
  accountsTotal: number;
  accountsSuccess: number;
};

type AccountForSignal = {
  id: string;
  accountName: string;
  status: 'executed' | 'pending' | 'failed';
  tradingAccount: string;
  exchange: string;
  executionTime?: string;
  errorMessage?: string;
};

type CoinstratLogsProps = {
  botId: string;
};

const CoinstratLogs: React.FC<CoinstratLogsProps> = ({ botId }) => {
  const [logs, setLogs] = useState<CoinstratLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [accountsForSignal, setAccountsForSignal] = useState<AccountForSignal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchLogs = () => {
      setLoading(true);
      setTimeout(() => {
        const mockLogs: CoinstratLog[] = [
          {
            id: 'CST001',
            status: 'success',
            timestamp: '2025-03-22T07:27:00',
            signalId: 'CST001',
            idTv: 'SIG001',
            instrument: 'BTCUSDT',
            action: 'ENTER_LONG',
            quantity: '1.5',
            accountsTotal: 2,
            accountsSuccess: 2
          },
          {
            id: 'CST002',
            status: 'success',
            timestamp: '2025-03-22T06:27:00',
            signalId: 'CST002',
            idTv: 'SIG002',
            instrument: 'ETHUSDT',
            action: 'EXIT_LONG',
            quantity: '2.3',
            accountsTotal: 2,
            accountsSuccess: 1
          },
          {
            id: 'CST003',
            status: 'failed',
            timestamp: '2025-03-22T05:27:00',
            signalId: 'CST003',
            idTv: 'SIG003',
            instrument: 'SOLUSDT',
            action: 'ENTER_SHORT',
            quantity: '3.7',
            message: 'Insufficient balance',
            accountsTotal: 2,
            accountsSuccess: 0
          }
        ];
        
        setLogs(mockLogs);
        setLoading(false);
      }, 1000);
    };

    fetchLogs();
  }, [botId]);

  const handleViewAccounts = (signalId: string) => {
    const mockAccounts: AccountForSignal[] = [
      {
        id: 'ACC-001',
        accountName: 'Binance Main',
        status: 'executed',
        tradingAccount: '78459213',
        exchange: 'Binance',
        executionTime: new Date(Date.now() - 3540000).toISOString(),
      },
      {
        id: 'ACC-002',
        accountName: 'Bybit Demo',
        status: 'pending',
        tradingAccount: '65784123',
        exchange: 'Bybit',
      },
      {
        id: 'ACC-003',
        accountName: 'OKX Account',
        status: 'failed',
        tradingAccount: '98732145',
        exchange: 'OKX',
        errorMessage: 'API rate limit exceeded',
      },
    ];

    setSelectedSignal(signalId);
    setAccountsForSignal(mockAccounts);
    setIsDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'executed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
      case 'executed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {status === 'success' ? 'Thành công' : 'Đã thực hiện'}</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center gap-1"><Clock className="h-3 w-3" /> Đang xử lý</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1"><XCircle className="h-3 w-3" /> Thất bại</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'ENTER_LONG':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200 dark:bg-green-900/20 dark:text-green-400 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> {action}</Badge>;
      case 'EXIT_LONG':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-1"><ArrowDown className="h-3 w-3" /> {action}</Badge>;
      case 'ENTER_SHORT':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 flex items-center gap-1"><ArrowDown className="h-3 w-3" /> {action}</Badge>;
      case 'EXIT_SHORT':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> {action}</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const refreshLogs = () => {
    setLogs([]);
    setLoading(true);
    setTimeout(() => {
      const mockLogs: CoinstratLog[] = [
        {
          id: 'CST001',
          status: 'success',
          timestamp: '2025-03-22T07:27:00',
          signalId: 'CST001',
          idTv: 'SIG001',
          instrument: 'BTCUSDT',
          action: 'ENTER_LONG',
          quantity: '1.5',
          accountsTotal: 2,
          accountsSuccess: 2
        },
        {
          id: 'CST002',
          status: 'success',
          timestamp: '2025-03-22T06:27:00',
          signalId: 'CST002',
          idTv: 'SIG002',
          instrument: 'ETHUSDT',
          action: 'EXIT_LONG',
          quantity: '2.3',
          accountsTotal: 2,
          accountsSuccess: 1
        },
        {
          id: 'CST003',
          status: 'failed',
          timestamp: '2025-03-22T05:27:00',
          signalId: 'CST003',
          idTv: 'SIG003',
          instrument: 'SOLUSDT',
          action: 'ENTER_SHORT',
          quantity: '3.7',
          message: 'Insufficient balance',
          accountsTotal: 2,
          accountsSuccess: 0
        }
      ];
      setLogs(mockLogs);
      setLoading(false);
    }, 1000);
  };

  if (loading && logs.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4 py-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={refreshLogs} className="h-8">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Làm mới
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <Filter className="h-3.5 w-3.5 mr-1" /> Lọc
          </Button>
        </div>
        <span className="text-sm text-muted-foreground">
          Hiển thị {logs.length} bản ghi gần nhất
        </span>
      </div>

      {logs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
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
                <TableCell>{getStatusIcon(log.status)}</TableCell>
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>{log.idTv}</TableCell>
                <TableCell>{log.instrument}</TableCell>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>{log.quantity}</TableCell>
                <TableCell>{getActionBadge(log.action)}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="px-2 py-1 h-auto text-blue-600 font-medium"
                    onClick={() => handleViewAccounts(log.signalId)}
                  >
                    {log.accountsSuccess} / {log.accountsTotal} <Eye className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </TableCell>
                <TableCell>
                  {log.message && (
                    <div className="text-red-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span className="text-xs">{log.message}</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Không có dữ liệu log nào.</p>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Chi tiết thực thi tín hiệu {selectedSignal}
            </DialogTitle>
            <DialogDescription>
              Danh sách các tài khoản thực thi tín hiệu
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tài khoản</TableHead>
                <TableHead>Tài khoản giao dịch</TableHead>
                <TableHead>Sàn</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountsForSignal.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.accountName}</TableCell>
                  <TableCell>{account.tradingAccount}</TableCell>
                  <TableCell>{account.exchange}</TableCell>
                  <TableCell>{getStatusBadge(account.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter className="sm:justify-start">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setIsDialogOpen(false)}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoinstratLogs;

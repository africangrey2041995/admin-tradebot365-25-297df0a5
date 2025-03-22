import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  instrument: string;
  action: string;
  price: string;
  volume: string;
  message?: string;
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
            id: 'CSTLOG-001',
            status: 'success',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            signalId: 'CST001',
            instrument: 'BTCUSDT',
            action: 'ENTER_LONG',
            price: '65,892.45',
            volume: '0.025',
          },
          {
            id: 'CSTLOG-002',
            status: 'pending',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            signalId: 'CST002',
            instrument: 'ETHUSDT',
            action: 'EXIT_LONG',
            price: '3,456.78',
            volume: '0.15',
          },
          {
            id: 'CSTLOG-003',
            status: 'failed',
            timestamp: new Date(Date.now() - 10800000).toISOString(),
            signalId: 'CST003',
            instrument: 'SOLUSDT',
            action: 'ENTER_SHORT',
            price: '142.35',
            volume: '1.5',
            message: 'Insufficient balance',
          }
        ];
        
        setLogs(mockLogs);
        setLoading(false);
      }, 1000);
    };

    fetchLogs();
  }, [botId]);

  const handleViewAccounts = (signalId: string) => {
    // Simulate fetching accounts for this signal
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
          id: 'CSTLOG-001',
          status: 'success',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          signalId: 'CST001',
          instrument: 'BTCUSDT',
          action: 'ENTER_LONG',
          price: '65,892.45',
          volume: '0.025',
        },
        {
          id: 'CSTLOG-002',
          status: 'pending',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          signalId: 'CST002',
          instrument: 'ETHUSDT',
          action: 'EXIT_LONG',
          price: '3,456.78',
          volume: '0.15',
        },
        {
          id: 'CSTLOG-003',
          status: 'failed',
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          signalId: 'CST003',
          instrument: 'SOLUSDT',
          action: 'ENTER_SHORT',
          price: '142.35',
          volume: '1.5',
          message: 'Insufficient balance',
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
              <TableHead>ID</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Signal ID</TableHead>
              <TableHead>Cặp tiền</TableHead>
              <TableHead>Hành động</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>KL</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.id}</TableCell>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>{log.signalId}</TableCell>
                <TableCell>{log.instrument}</TableCell>
                <TableCell>{getActionBadge(log.action)}</TableCell>
                <TableCell>{log.price}</TableCell>
                <TableCell>{log.volume}</TableCell>
                <TableCell>{getStatusBadge(log.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewAccounts(log.signalId)}>
                    <Eye className="h-4 w-4" />
                  </Button>
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

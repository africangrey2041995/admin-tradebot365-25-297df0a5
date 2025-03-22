
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, ArrowUpRight, ArrowUpLeft, ArrowDownRight, ArrowDownLeft, AlertTriangle } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { TradingViewSignal, CoinstratSignal, SignalAction } from '@/types';

const Signals = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockTradingViewSignals: TradingViewSignal[] = [
    {
      id: '1',
      action: 'ENTER_LONG' as SignalAction,
      instrument: 'BTCUSDT.P',
      timestamp: '2023-06-20T14:45:00Z',
      signalToken: 'Bot_number_1',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.1',
      status: 'Processed',
    },
    {
      id: '2',
      action: 'EXIT_LONG' as SignalAction,
      instrument: 'BTCUSDT.P',
      timestamp: '2023-06-22T10:30:00Z',
      signalToken: 'Bot_number_1',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.1',
      status: 'Processed',
    },
    {
      id: '3',
      action: 'ENTER_SHORT' as SignalAction,
      instrument: 'ETHUSDT.P',
      timestamp: '2023-06-22T16:15:00Z',
      signalToken: 'Bot_number_2',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.5',
      status: 'Pending',
    },
    {
      id: '4',
      action: 'ENTER_LONG' as SignalAction,
      instrument: 'XAUUSD',
      timestamp: '2023-06-23T09:45:00Z',
      signalToken: 'Bot_number_3',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.01',
      status: 'Failed',
      errorMessage: 'Ký hiệu công cụ không hợp lệ',
    }
  ];

  const mockCoinstratSignals: CoinstratSignal[] = [
    {
      id: '101',
      originalSignalId: '1',
      action: 'ENTER_LONG' as SignalAction,
      instrument: 'BTCUSDT.P',
      timestamp: '2023-06-20T14:45:10Z',
      signalToken: 'Bot_number_1',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.1',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'client123',
          name: 'Tài Khoản Giao Dịch BTC',
          timestamp: '2023-06-20T14:45:15Z'
        }
      ],
      failedAccounts: []
    },
    {
      id: '102',
      originalSignalId: '2',
      action: 'EXIT_LONG' as SignalAction,
      instrument: 'BTCUSDT.P',
      timestamp: '2023-06-22T10:30:10Z',
      signalToken: 'Bot_number_1',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.1',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'client123',
          name: 'Tài Khoản Giao Dịch BTC',
          timestamp: '2023-06-22T10:30:15Z'
        }
      ],
      failedAccounts: []
    },
    {
      id: '103',
      originalSignalId: '3',
      action: 'ENTER_SHORT' as SignalAction,
      instrument: 'ETHUSDT.P',
      timestamp: '2023-06-22T16:15:10Z',
      signalToken: 'Bot_number_2',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.5',
      status: 'Sent',
      processedAccounts: [],
      failedAccounts: []
    },
    {
      id: '104',
      originalSignalId: '4',
      action: 'ENTER_LONG' as SignalAction,
      instrument: 'XAUUSD',
      timestamp: '2023-06-23T09:45:10Z',
      signalToken: 'Bot_number_3',
      maxLag: '3600',
      investmentType: 'contract',
      amount: '0.01',
      status: 'Failed',
      processedAccounts: [],
      failedAccounts: [
        {
          accountId: 'client789',
          name: 'Tài Khoản Giao Dịch Vàng',
          timestamp: '2023-06-23T09:45:15Z',
          reason: 'Ký hiệu công cụ không hợp lệ'
        }
      ],
      errorMessage: 'Ký hiệu công cụ không hợp lệ'
    }
  ];

  const filteredTradingViewSignals = mockTradingViewSignals.filter(signal => 
    signal.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
    signal.signalToken.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCoinstratSignals = mockCoinstratSignals.filter(signal => 
    signal.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
    signal.signalToken.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getActionIcon = (action: SignalAction) => {
    switch (action) {
      case 'ENTER_LONG':
        return <ArrowUpRight className="h-4 w-4 text-success" />;
      case 'EXIT_LONG':
        return <ArrowUpLeft className="h-4 w-4 text-muted-foreground" />;
      case 'ENTER_SHORT':
        return <ArrowDownRight className="h-4 w-4 text-destructive" />;
      case 'EXIT_SHORT':
        return <ArrowDownLeft className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActionLabel = (action: SignalAction) => {
    switch (action) {
      case 'ENTER_LONG':
        return 'MUA VÀO';
      case 'EXIT_LONG':
        return 'ĐÓNG MUA';
      case 'ENTER_SHORT':
        return 'BÁN RA';
      case 'EXIT_SHORT':
        return 'ĐÓNG BÁN';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Processed':
        return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Đã Xử Lý</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Đang Xử Lý</Badge>;
      case 'Sent':
        return <Badge variant="outline" className="bg-info/10 text-info border-info/20">Đã Gửi</Badge>;
      case 'Failed':
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Thất Bại</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <MainLayout title="Nhật Ký Tín Hiệu">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm tín hiệu..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="tradingview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="tradingview" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/baec666a-ccac-4ef0-bb3e-8468d891488b.png" 
              alt="Trading View" 
              className="w-4 h-4"
            />
            Tín Hiệu TradingView
          </TabsTrigger>
          <TabsTrigger value="coinstrat" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/8107dc0b-de72-421f-b369-5277cc2f8361.png" 
              alt="Coinstart Pro" 
              className="w-4 h-4 rounded-full"
            />
            Tín Hiệu Coinstrat
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tradingview">
          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <img 
                  src="/lovable-uploads/baec666a-ccac-4ef0-bb3e-8468d891488b.png" 
                  alt="Trading View" 
                  className="w-5 h-5"
                />
                Tín Hiệu TradingView
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hành Động</TableHead>
                    <TableHead>Công Cụ</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead>Khối Lượng</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Thời Gian</TableHead>
                    <TableHead>Lỗi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTradingViewSignals.length > 0 ? (
                    filteredTradingViewSignals.map((signal) => (
                      <TableRow key={signal.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getActionIcon(signal.action)}
                            <span>{getActionLabel(signal.action)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{signal.instrument}</TableCell>
                        <TableCell>{signal.signalToken}</TableCell>
                        <TableCell>{signal.amount}</TableCell>
                        <TableCell>{getStatusBadge(signal.status)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{formatDate(signal.timestamp)}</TableCell>
                        <TableCell className="max-w-[200px]">
                          {signal.errorMessage && (
                            <div className="flex items-start gap-2 text-destructive text-sm">
                              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">{signal.errorMessage}</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Không tìm thấy tín hiệu nào. Vui lòng thử tìm kiếm khác.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coinstrat">
          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg flex items-center gap-2">
                <img 
                  src="/lovable-uploads/8107dc0b-de72-421f-b369-5277cc2f8361.png" 
                  alt="Coinstart Pro" 
                  className="w-5 h-5 rounded-full"
                />
                Tín Hiệu Coinstrat.pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hành Động</TableHead>
                    <TableHead>Công Cụ</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead>Trạng Thái</TableHead>
                    <TableHead>Tài Khoản Xử Lý</TableHead>
                    <TableHead>Tài Khoản Thất Bại</TableHead>
                    <TableHead>Thời Gian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCoinstratSignals.length > 0 ? (
                    filteredCoinstratSignals.map((signal) => (
                      <TableRow key={signal.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getActionIcon(signal.action)}
                            <span>{getActionLabel(signal.action)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{signal.instrument}</TableCell>
                        <TableCell>{signal.signalToken}</TableCell>
                        <TableCell>{getStatusBadge(signal.status)}</TableCell>
                        <TableCell>
                          {signal.processedAccounts.length > 0 ? (
                            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                              {signal.processedAccounts.length} tài khoản
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Không có</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {signal.failedAccounts.length > 0 ? (
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                              {signal.failedAccounts.length} tài khoản
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Không có</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{formatDate(signal.timestamp)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Không tìm thấy tín hiệu nào. Vui lòng thử tìm kiếm khác.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Signals;

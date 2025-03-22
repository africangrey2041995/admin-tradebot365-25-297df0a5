
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BarChart3, Settings, Info, PlayCircle, PauseCircle, RefreshCw, Users, Clock, Calendar, LineChart, Webhook, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CoinstratLogs from '@/components/bots/CoinstratLogs';

// Mock data for the integrated prop trading bot
const propBotData = {
  id: 'ptb-001',
  name: 'Prop Master',
  description: 'Bot đặc biệt thiết kế để vượt qua các bài kiểm tra của Coinstrat Pro Prop Trading với tỷ lệ thành công cao.',
  exchange: 'Coinstrat Pro',
  type: 'prop',
  performanceLastMonth: '+11.2%',
  performanceAllTime: '+45.8%',
  risk: 'low' as 'medium' | 'low' | 'high',
  minCapital: '$500',
  status: 'active',
  subscribers: 120,
  imageUrl: null,
  colorScheme: 'blue',
  isIntegrated: true,
  botId: 'PROP001',
  createdAt: '2023-09-15',
  updatedAt: '2023-11-22',
  phase: 'Challenge Phase 1',
  challengeProgress: 68,
  accountBalance: '$10,000',
  profitTarget: '$1,000 (10%)',
  maxDrawdown: '5%',
  currentDrawdown: '2.3%',
  timeRemaining: '14 days',
  tradesMade: 56,
  winRate: '64%',
  profitFactor: '1.8',
  sharpeRatio: '1.6',
  accounts: [
    {
      id: 'acc-001',
      name: 'Coinstrat Prop Demo',
      status: 'Connected',
      createdDate: '2023-10-15',
      lastUpdated: '2023-11-10',
      volumeMultiplier: '1.5',
      balance: '$10,000',
      equity: '$10,245',
      profit: '+$245',
      profitPercentage: '+2.45%',
      apiName: 'Coinstrat API',
      apiId: 'CST-001',
      tradingAccount: '78459213',
      tradingAccountType: 'Demo',
      tradingAccountBalance: '$10,000',
      userId: 'USR-123456'
    }
  ],
  recentTrades: [
    { 
      id: 'trade-001', 
      pair: 'BTC/USDT', 
      type: 'Long', 
      entry: '$41,250', 
      exit: '$41,780', 
      profit: '+$53', 
      date: '2023-11-20', 
      time: '14:23',
      status: 'closed'
    },
    { 
      id: 'trade-002', 
      pair: 'ETH/USDT', 
      type: 'Short', 
      entry: '$2,340', 
      exit: '$2,310', 
      profit: '+$30', 
      date: '2023-11-20', 
      time: '16:45',
      status: 'closed'
    },
    { 
      id: 'trade-003', 
      pair: 'SOL/USDT', 
      type: 'Long', 
      entry: '$62.5', 
      exit: null, 
      profit: '-$12', 
      date: '2023-11-21', 
      time: '09:15',
      status: 'open'
    }
  ],
  rules: [
    'Minimum 10 trading days required',
    'Maximum daily drawdown: 4%',
    'Maximum total drawdown: 8%',
    'Profit target: 10% to advance to next phase',
    'No weekend trading allowed',
    'No holding positions overnight',
    'Maximum position size: 2% of account'
  ]
};

const IntegratedPropBotDetail = () => {
  const { botId } = useParams();
  const navigate = useNavigate();
  const [botRunning, setBotRunning] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState('1d');

  // Find the bot data based on the botId
  const bot = propBotData; // In a real app, you'd filter based on botId

  if (!bot) {
    return (
      <MainLayout title="Bot Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Bot không tồn tại</h2>
          <Button onClick={() => navigate('/integrated-prop-bots')}>
            Quay lại danh sách Bot
          </Button>
        </div>
      </MainLayout>
    );
  }

  const toggleBotStatus = () => {
    setBotRunning(!botRunning);
    toast(botRunning ? "Bot đã tạm dừng" : "Bot đã được kích hoạt", {
      description: botRunning 
        ? `Đã tạm dừng bot ${bot.name}` 
        : `Bot ${bot.name} đang hoạt động`,
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast("Đã làm mới dữ liệu", {
        description: "Dữ liệu bot đã được cập nhật thành công",
      });
    }, 1500);
  };

  const handleAddAccount = (accountData: any) => {
    console.log('Adding account:', accountData);
    toast.success('Tài khoản đã được thêm thành công!');
  };

  const handleRemoveAccount = (accountId: string) => {
    console.log('Removing account:', accountId);
    toast.success('Tài khoản đã được gỡ bỏ khỏi bot thành công!');
  };

  return (
    <MainLayout title={`Chi tiết Bot - ${bot.name}`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/integrated-prop-bots')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{bot.name}</h1>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {bot.botId}
                </Badge>
                {botRunning ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Đang Hoạt Động
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-slate-500 border-slate-300 dark:border-slate-600">
                    Tạm Dừng
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                <span>Prop Trading Bot</span>
                <ChevronRight className="h-3 w-3" />
                <span>{bot.exchange}</span>
                <ChevronRight className="h-3 w-3" />
                <span>{bot.phase}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={botRunning ? "outline" : "default"}
              onClick={toggleBotStatus}
              className="gap-1"
            >
              {botRunning ? (
                <>
                  <PauseCircle className="h-4 w-4" />
                  <span>Tạm Dừng</span>
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  <span>Kích Hoạt</span>
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
              className="gap-1"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Đang làm mới' : 'Làm mới'}</span>
            </Button>
          </div>
        </div>

        {/* Challenge Progress Card */}
        <Card className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Tiến Độ Challenge
            </CardTitle>
            <CardDescription>
              {bot.phase} - Tiến độ hoàn thành để chuyển sang giai đoạn tiếp theo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Tiến Độ</span>
                <span className="font-bold text-blue-600">{bot.challengeProgress}%</span>
              </div>
              <Progress value={bot.challengeProgress} className="h-2" />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-white/80 dark:bg-zinc-800/80 p-3 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Số Dư Tài Khoản</span>
                  </div>
                  <div className="font-semibold">{bot.accountBalance}</div>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-3 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    <span>Mục Tiêu Lợi Nhuận</span>
                  </div>
                  <div className="font-semibold">{bot.profitTarget}</div>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-3 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Rút Vốn Tối Đa</span>
                  </div>
                  <div className="font-semibold">{bot.maxDrawdown}</div>
                </div>
                <div className="bg-white/80 dark:bg-zinc-800/80 p-3 rounded-lg">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Thời Gian Còn Lại</span>
                  </div>
                  <div className="font-semibold">{bot.timeRemaining}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs - REMOVED "trades" and "settings" tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="accounts">Tài Khoản</TabsTrigger>
            <TabsTrigger value="coinstrat-logs">Coinstrat Pro Logs</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Performance Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Biểu Đồ Hiệu Suất</CardTitle>
                      <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Khung thời gian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1d">1 Ngày</SelectItem>
                          <SelectItem value="1w">1 Tuần</SelectItem>
                          <SelectItem value="1m">1 Tháng</SelectItem>
                          <SelectItem value="all">Tất cả</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-zinc-800/50 rounded-md">
                      <LineChart className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                      <span className="ml-2 text-slate-500">Biểu đồ hiệu suất</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Rules Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Info className="h-5 w-5" />
                      Quy Tắc Challenge
                    </CardTitle>
                    <CardDescription>
                      Các quy tắc bắt buộc để vượt qua thử thách Prop Trading
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {bot.rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs mr-2">{index + 1}</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Stats Column */}
              <div className="space-y-6">
                {/* Stats Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thống Kê Bot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Số Giao Dịch</span>
                      <span className="font-semibold">{bot.tradesMade}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Tỷ Lệ Thắng</span>
                      <span className="font-semibold">{bot.winRate}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Hệ Số Lợi Nhuận</span>
                      <span className="font-semibold">{bot.profitFactor}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Tỷ Lệ Sharpe</span>
                      <span className="font-semibold">{bot.sharpeRatio}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Drawdown Hiện Tại</span>
                      <span className="font-semibold">{bot.currentDrawdown}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Alert Card */}
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Cảnh Báo</AlertTitle>
                  <AlertDescription>
                    Việc không tuân thủ các quy tắc challenge có thể dẫn đến việc thất bại trong chương trình Prop Trading.
                  </AlertDescription>
                </Alert>
                
                {/* Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thông Tin Bot</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Ngày Tạo</span>
                      <span className="font-semibold">{bot.createdAt}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Cập Nhật Lần Cuối</span>
                      <span className="font-semibold">{bot.updatedAt}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-500">Mã Bot</span>
                      <span className="font-semibold">{bot.botId}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Accounts Tab - Updated with the new column structure */}
          <TabsContent value="accounts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tài khoản đã kết nối</CardTitle>
                <Button onClick={() => handleAddAccount({})}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm tài khoản
                </Button>
              </CardHeader>
              <CardContent>
                {bot.accounts && bot.accounts.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên tài khoản</TableHead>
                        <TableHead>API</TableHead>
                        <TableHead>Tài khoản giao dịch</TableHead>
                        <TableHead>Hệ số KL</TableHead>
                        <TableHead>Ngày tích hợp</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bot.accounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.name}</TableCell>
                          <TableCell>{account.apiName}</TableCell>
                          <TableCell>
                            <div>
                              <div>{account.tradingAccount}</div>
                              <div className="text-xs text-muted-foreground">{account.tradingAccountType} | {account.tradingAccountBalance}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                              x{account.volumeMultiplier}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(account.createdDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0"
                                onClick={() => navigate(`/accounts/${account.id}`)}
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleRemoveAccount(account.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-muted-foreground mb-4">Chưa có tài khoản nào được kết nối với bot này</p>
                    <Button onClick={() => handleAddAccount({})}>
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm tài khoản
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Coinstrat Pro Logs Tab - New tab */}
          <TabsContent value="coinstrat-logs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Coinstrat Pro Logs</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh} 
                  disabled={refreshing} 
                  className="h-8"
                >
                  <RefreshCw className={`h-3.5 w-3.5 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Đang làm mới...' : 'Làm mới'}
                </Button>
              </CardHeader>
              <CardContent>
                <CoinstratLogs botId={bot.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;

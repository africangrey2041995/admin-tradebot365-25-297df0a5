
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BarChart3, Settings, Info, PlayCircle, PauseCircle, RefreshCw, Users, Clock, Calendar, LineChart, Webhook, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

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
      profitPercentage: '+2.45%'
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

  const handleSettingsChange = (value: string) => {
    toast("Cài đặt đã được thay đổi", {
      description: `Thay đổi cài đặt ${value}`,
    });
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-[400px]">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="trades">Giao Dịch</TabsTrigger>
            <TabsTrigger value="accounts">Tài Khoản</TabsTrigger>
            <TabsTrigger value="settings">Cài Đặt</TabsTrigger>
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
          
          {/* Trades Tab */}
          <TabsContent value="trades">
            <Card>
              <CardHeader>
                <CardTitle>Giao Dịch Gần Đây</CardTitle>
                <CardDescription>
                  Lịch sử các giao dịch được thực hiện bởi bot trong thời gian gần đây
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 dark:bg-zinc-800">
                        <th className="py-3 px-4 text-left font-medium">Cặp</th>
                        <th className="py-3 px-4 text-left font-medium">Loại</th>
                        <th className="py-3 px-4 text-left font-medium">Giá Vào</th>
                        <th className="py-3 px-4 text-left font-medium">Giá Ra</th>
                        <th className="py-3 px-4 text-left font-medium">Lợi Nhuận</th>
                        <th className="py-3 px-4 text-left font-medium">Thời Gian</th>
                        <th className="py-3 px-4 text-left font-medium">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bot.recentTrades.map((trade) => (
                        <tr key={trade.id} className="border-b">
                          <td className="py-3 px-4 font-medium">{trade.pair}</td>
                          <td className="py-3 px-4">
                            <Badge className={`${trade.type === 'Long' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{trade.entry}</td>
                          <td className="py-3 px-4">{trade.exit || '-'}</td>
                          <td className={`py-3 px-4 ${trade.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {trade.profit}
                          </td>
                          <td className="py-3 px-4">{trade.date}, {trade.time}</td>
                          <td className="py-3 px-4">
                            <Badge variant={trade.status === 'open' ? 'outline' : 'default'} className={trade.status === 'open' ? 'border-blue-300 text-blue-600' : ''}>
                              {trade.status === 'open' ? 'Đang Mở' : 'Đã Đóng'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Giao dịch trước đó</Button>
                <Button variant="outline" size="sm">Giao dịch tiếp theo</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Accounts Tab */}
          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle>Tài Khoản Đã Kết Nối</CardTitle>
                <CardDescription>
                  Các tài khoản đã được kết nối với bot này
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 dark:bg-zinc-800">
                        <th className="py-3 px-4 text-left font-medium">Tên</th>
                        <th className="py-3 px-4 text-left font-medium">Trạng Thái</th>
                        <th className="py-3 px-4 text-left font-medium">Số Dư</th>
                        <th className="py-3 px-4 text-left font-medium">Vốn</th>
                        <th className="py-3 px-4 text-left font-medium">Lợi Nhuận</th>
                        <th className="py-3 px-4 text-left font-medium">Ngày Tạo</th>
                        <th className="py-3 px-4 text-left font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bot.accounts.map((account) => (
                        <tr key={account.id} className="border-b">
                          <td className="py-3 px-4 font-medium">{account.name}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              {account.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{account.balance}</td>
                          <td className="py-3 px-4">{account.equity}</td>
                          <td className={`py-3 px-4 ${account.profit.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {account.profit} ({account.profitPercentage})
                          </td>
                          <td className="py-3 px-4">{account.createdDate}</td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/accounts/${account.id}`)}>
                              Chi Tiết
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/accounts')}>
                  Kết Nối Tài Khoản Mới
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Cài Đặt Bot
                  </CardTitle>
                  <CardDescription>
                    Điều chỉnh cài đặt cho bot Prop Trading của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Kích Thước Vị Thế Tối Đa</label>
                    <Select defaultValue="2" onValueChange={(v) => handleSettingsChange('Kích thước vị thế: ' + v + '%')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kích thước" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1% tài khoản</SelectItem>
                        <SelectItem value="2">2% tài khoản</SelectItem>
                        <SelectItem value="3">3% tài khoản</SelectItem>
                        <SelectItem value="5">5% tài khoản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rủi Ro Mỗi Giao Dịch</label>
                    <Select defaultValue="1" onValueChange={(v) => handleSettingsChange('Rủi ro mỗi giao dịch: ' + v + '%')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn mức rủi ro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">0.5% tài khoản</SelectItem>
                        <SelectItem value="1">1% tài khoản</SelectItem>
                        <SelectItem value="1.5">1.5% tài khoản</SelectItem>
                        <SelectItem value="2">2% tài khoản</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Thời Gian Giao Dịch</label>
                    <Select defaultValue="market" onValueChange={(v) => handleSettingsChange('Thời gian giao dịch: ' + v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thời gian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="market">Giờ thị trường (9:30 - 16:00)</SelectItem>
                        <SelectItem value="extended">Giờ mở rộng (4:00 - 20:00)</SelectItem>
                        <SelectItem value="24h">24 giờ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cặp Tiền Được Phép</label>
                    <Select defaultValue="major" onValueChange={(v) => handleSettingsChange('Cặp tiền được phép: ' + v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cặp tiền" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="major">Chỉ các cặp chính</SelectItem>
                        <SelectItem value="all">Tất cả các cặp</SelectItem>
                        <SelectItem value="custom">Tùy chỉnh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Lưu Cài Đặt</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="h-5 w-5" />
                    Tích Hợp và Thông Báo
                  </CardTitle>
                  <CardDescription>
                    Quản lý cách bot giao tiếp và gửi thông báo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Thông Báo Email</label>
                    <Select defaultValue="all" onValueChange={(v) => handleSettingsChange('Thông báo email: ' + v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tần suất" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Mọi giao dịch</SelectItem>
                        <SelectItem value="important">Chỉ giao dịch quan trọng</SelectItem>
                        <SelectItem value="daily">Tóm tắt hàng ngày</SelectItem>
                        <SelectItem value="none">Tắt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        placeholder="https://your-webhook-url.com" 
                        className="flex-1"
                        disabled 
                      />
                      <Button variant="outline" size="sm">Kiểm Tra</Button>
                    </div>
                    <p className="text-xs text-slate-500">Nhận thông báo thông qua webhook để tích hợp với các dịch vụ khác</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Telegram Bot</label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        placeholder="Bot Token" 
                        className="flex-1"
                        disabled
                      />
                      <Button variant="outline" size="sm">Kết Nối</Button>
                    </div>
                    <p className="text-xs text-slate-500">Kết nối với Telegram để nhận thông báo trực tiếp</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Lưu Thông Báo</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;

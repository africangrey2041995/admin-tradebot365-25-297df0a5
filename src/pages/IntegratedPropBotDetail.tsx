
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BarChart3, Info, PlayCircle, PauseCircle, RefreshCw, Users, Clock, Calendar, LineChart, Webhook, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import BotAccountsTable from '@/components/bots/BotAccountsTable';

const CURRENT_USER_ID = 'USR-123456';

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
      userId: 'USR-123456'
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
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchBotData = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const bot = propBotData;
        
        const ownerId = bot.accounts[0]?.userId;
        
        if (ownerId === CURRENT_USER_ID) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          toast.error("Bạn không có quyền truy cập bot này");
        }
        
        setIsLoading(false);
      }, 500);
    };
    
    fetchBotData();
  }, [botId]);

  if (isLoading) {
    return (
      <MainLayout title="Đang tải...">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </MainLayout>
    );
  }

  if (!isAuthorized) {
    return (
      <MainLayout title="Không có quyền truy cập">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Bạn không có quyền truy cập bot này</h2>
          <Button onClick={() => navigate('/integrated-prop-bots')}>
            Quay lại danh sách Bot
          </Button>
        </div>
      </MainLayout>
    );
  }

  const bot = propBotData;

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

  return (
    <MainLayout title={`Chi tiết Bot - ${bot.name}`}>
      <div className="space-y-6">
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

        <Tabs defaultValue="overview" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
            <TabsTrigger value="coinstrat-logs">Coinstrat Pro Logs</TabsTrigger>
            <TabsTrigger value="connected-accounts">Tài khoản kết nối</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
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
              
              <div className="space-y-6">
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
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Cảnh Báo</AlertTitle>
                  <AlertDescription>
                    Việc không tuân thủ các quy tắc challenge có thể dẫn đến việc thất bại trong chương trình Prop Trading.
                  </AlertDescription>
                </Alert>
                
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
          
          <TabsContent value="coinstrat-logs">
            <Card>
              <CardHeader>
                <CardTitle>Coinstrat Pro Logs</CardTitle>
                <CardDescription>
                  Xem lịch sử các tín hiệu đã được xử lý bởi Coinstrat Pro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CoinstratLogs botId={botId || ""} userId={CURRENT_USER_ID} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="connected-accounts">
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản kết nối</CardTitle>
                <CardDescription>
                  Quản lý các tài khoản được kết nối với bot này
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BotAccountsTable botId={botId || ""} userId={CURRENT_USER_ID} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;

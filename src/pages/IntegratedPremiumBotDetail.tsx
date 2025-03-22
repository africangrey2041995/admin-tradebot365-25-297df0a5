
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { 
  ChartLine, 
  Users, 
  Gauge, 
  Wallet, 
  Bot, 
  TrendingUp, 
  Clock, 
  CircuitBoard, 
  BarChart4, 
  LineChart, 
  Sparkles,
  CheckCircle,
  Calendar,
  ArrowRight,
  ChevronLeft,
  CircleDollarSign,
  Activity,
  PieChart,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Bar,
  ComposedChart,
  Legend
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Account, PremiumBot, TradingViewSignal } from '@/types';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import AddAccountDialog from '@/components/bots/AddAccountDialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BotProfileTabs from '@/components/bots/BotProfileTabs';

const integratedPremiumBots: PremiumBot[] = [
  {
    id: 'pb-001',
    name: 'Alpha Momentum',
    description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.',
    exchange: 'Coinstart Pro',
    type: 'momentum',
    performanceLastMonth: '+18.5%',
    performanceAllTime: '+125.4%',
    risk: 'medium',
    minCapital: '$500',
    status: 'active',
    subscribers: 86,
    imageUrl: null,
    colorScheme: 'green',
    isIntegrated: true,
    botId: 'PRE7459',
    accounts: [
      {
        id: 'acc-001',
        name: 'Binance Main',
        status: 'Connected',
        createdDate: '2023-10-15',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '2',
        apiName: 'Binance API',
        apiId: 'BIN-001',
        tradingAccount: '78459213',
        tradingAccountType: 'Live',
        tradingAccountBalance: '$1,245.50'
      },
      {
        id: 'acc-002',
        name: 'Bybit Demo',
        status: 'Connected',
        createdDate: '2023-10-20',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '1',
        apiName: 'Bybit API',
        apiId: 'BYB-002',
        tradingAccount: '65784123',
        tradingAccountType: 'Demo',
        tradingAccountBalance: '$10,000.00'
      }
    ]
  },
  {
    id: 'pb-004',
    name: 'Gamma Grid',
    description: 'Bot grid trading với chiến lược phân bổ thanh khoản thông minh dựa trên biến động thị trường.',
    exchange: 'Coinstart Pro',
    type: 'grid',
    performanceLastMonth: '+7.6%',
    performanceAllTime: '+52.3%',
    risk: 'low',
    minCapital: '$300',
    status: 'active',
    subscribers: 98,
    imageUrl: null,
    colorScheme: 'purple',
    isIntegrated: true,
    botId: 'PRE8932',
    accounts: [
      {
        id: 'acc-003',
        name: 'Binance Main',
        status: 'Connected',
        createdDate: '2023-11-05',
        lastUpdated: '2023-11-10',
        volumeMultiplier: '1',
        apiName: 'Binance API',
        apiId: 'BIN-001',
        tradingAccount: '78459213',
        tradingAccountType: 'Live',
        tradingAccountBalance: '$1,245.50'
      }
    ]
  }
];

const tradePerformanceData = [
  { name: 'Jan', profit: 12.5, trades: 24 },
  { name: 'Feb', profit: 8.3, trades: 18 },
  { name: 'Mar', profit: -2.1, trades: 15 },
  { name: 'Apr', profit: 5.7, trades: 17 },
  { name: 'May', profit: 15.2, trades: 29 },
  { name: 'Jun', profit: 10.1, trades: 22 },
  { name: 'Jul', profit: 5.5, trades: 20 },
  { name: 'Aug', profit: -3.2, trades: 16 },
  { name: 'Sep', profit: 9.8, trades: 21 },
  { name: 'Oct', profit: 18.5, trades: 28 },
];

const monthlyPerformance = [
  { month: 'Jan', value: 12.5 },
  { month: 'Feb', value: 8.3 },
  { name: 'Mar', value: -2.1 },
  { name: 'Apr', value: 5.7 },
  { name: 'May', value: 15.2 },
  { name: 'Jun', value: 10.1 },
  { name: 'Jul', value: 5.5 },
  { name: 'Aug', value: -3.2 },
  { name: 'Sep', value: 9.8 },
  { name: 'Oct', value: 18.5 },
  { name: 'Nov', value: 0 },
  { name: 'Dec', value: 0 },
];

const IntegratedPremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<string>("month");
  const [isLoading, setIsLoading] = useState(false);

  const bot = integratedPremiumBots.find(b => b.id === botId);

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Thấp';
      case 'medium': return 'Trung bình';
      case 'high': return 'Cao';
      default: return risk;
    }
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'momentum': return 'Momentum';
      case 'scalping': return 'Scalping';
      case 'swing': return 'Swing';
      case 'grid': return 'Grid';
      case 'trend': return 'Trend';
      default: return type;
    }
  };

  const generateChartData = () => {
    if (selectedChartPeriod === "month") {
      return monthlyPerformance;
    } else if (selectedChartPeriod === "week") {
      return [
        { day: 'Mon', value: 5.7 },
        { day: 'Tue', value: 7.3 },
        { day: 'Wed', value: -2.1 },
        { day: 'Thu', value: 4.2 },
        { day: 'Fri', value: 8.5 },
        { day: 'Sat', value: 2.1 },
        { day: 'Sun', value: 3.8 }
      ];
    } else {
      return [
        { year: '2020', value: 28.5 },
        { year: '2021', value: 42.3 },
        { year: '2022', value: 37.8 },
        { year: '2023', value: 125.4 }
      ];
    }
  };

  const statisticsData = [
    { name: 'Win Rate', value: '65%', icon: <Activity className="h-4 w-4 text-green-500" /> },
    { name: 'Avg Profit', value: '2.7%', icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
    { name: 'Max Drawdown', value: '8.5%', icon: <ChartLine className="h-4 w-4 text-red-500" /> },
    { name: 'Sharp Ratio', value: '1.8', icon: <PieChart className="h-4 w-4 text-blue-500" /> },
  ];

  const handleAddAccount = (accountData: any) => {
    console.log('Adding account:', accountData, 'to premium bot:', botId);
    toast.success('Tài khoản đã được thêm thành công!');
  };

  const handleRemoveAccount = (accountId: string) => {
    toast.success('Tài khoản đã được gỡ khỏi bot');
  };

  const refreshTabData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "accounts" ? "Tài khoản" : 
        activeTab === "trading-logs" ? "TB365 Logs" : "Coinstrat Logs"
      }`);
    }, 1000);
  };

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

  return (
    <MainLayout title={`${bot.name} - Chi tiết Bot Tích hợp`}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/integrated-premium-bots')}
              className="mr-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Button>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
              {bot.name}
              <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
            </h1>
            <Badge className={getRiskColor(bot.risk)}>
              Rủi ro: {getRiskLabel(bot.risk)}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
              {bot.botId}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="default" onClick={() => setIsAddAccountDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm tài khoản
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="accounts">Tài khoản ({bot.accounts?.length || 0})</TabsTrigger>
            <TabsTrigger value="trading-logs">TB365 Logs</TabsTrigger>
            <TabsTrigger value="coinstrat-logs">Coinstrat Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Biểu đồ hiệu suất</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={refreshTabData} 
                        disabled={isLoading}
                        className="h-8 w-8"
                      >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      </Button>
                      <Tabs defaultValue="month" value={selectedChartPeriod} onValueChange={setSelectedChartPeriod} className="w-[250px]">
                        <TabsList>
                          <TabsTrigger value="week">Tuần</TabsTrigger>
                          <TabsTrigger value="month">Tháng</TabsTrigger>
                          <TabsTrigger value="year">Năm</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px] w-full">
                      <ChartContainer
                        config={{
                          profit: {
                            label: "Profit",
                            theme: {
                              light: "#10b981",
                              dark: "#34d399"
                            }
                          },
                          loss: {
                            label: "Loss",
                            theme: {
                              light: "#ef4444",
                              dark: "#f87171"
                            }
                          },
                          line: {
                            label: "Performance Line",
                            theme: {
                              light: "#60a5fa",
                              dark: "#3b82f6"
                            }
                          }
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={generateChartData()}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                            <XAxis 
                              dataKey={selectedChartPeriod === "year" ? "year" : (selectedChartPeriod === "week" ? "day" : "month")} 
                              className="text-xs font-medium" 
                            />
                            <YAxis className="text-xs font-medium" />
                            <ChartTooltip 
                              content={
                                <ChartTooltipContent 
                                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'Hiệu suất']}
                                />
                              } 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#10b981" 
                              fillOpacity={1} 
                              fill="url(#colorPositive)" 
                              activeDot={{ r: 6 }} 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Chi tiết giao dịch</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={refreshTabData} 
                      disabled={isLoading}
                      className="h-8 w-8"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ChartContainer
                        config={{
                          profit: {
                            label: "Profit",
                            theme: {
                              light: "#10b981",
                              dark: "#34d399"
                            }
                          },
                          trades: {
                            label: "Trades",
                            theme: {
                              light: "#60a5fa",
                              dark: "#3b82f6"
                            }
                          }
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart
                            data={tradePerformanceData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                          >
                            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                            <XAxis dataKey="name" scale="band" />
                            <YAxis yAxisId="left" label={{ value: 'Profit (%)', angle: -90, position: 'insideLeft' }} />
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'Trades', angle: 90, position: 'insideRight' }} />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="right" dataKey="trades" fill="#3b82f6" barSize={20} />
                            <Area yAxisId="left" type="monotone" dataKey="profit" fill="#34d399" stroke="#10b981" />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-6 mb-2">
                      {statisticsData.map((stat, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 dark:bg-zinc-800/50 dark:border-gray-800 shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            {stat.icon}
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              {stat.name}
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Thông tin chung</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={refreshTabData} 
                      disabled={isLoading}
                      className="h-8 w-8"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">Loại Bot</span>
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{getTypeLabel(bot.type)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <CircuitBoard className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">Sàn giao dịch</span>
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{bot.exchange}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">Vốn tối thiểu</span>
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{bot.minCapital}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">Bot ID</span>
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{bot.botId}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">Tài khoản kết nối</span>
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{bot.accounts?.length || 0}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Hiệu suất</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={refreshTabData} 
                      disabled={isLoading}
                      className="h-8 w-8"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-500">Hiệu suất tháng này</span>
                      </div>
                      <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                        {bot.performanceLastMonth}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <BarChart4 className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-500">Hiệu suất tổng thời gian</span>
                      </div>
                      <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                        {bot.performanceAllTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Quản lý tài khoản</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                      Bot này đã được tích hợp với {bot.accounts?.length || 0} tài khoản
                    </p>
                    <Button 
                      onClick={() => setActiveTab("accounts")} 
                      className="w-full mb-2"
                    >
                      Xem tài khoản đã tích hợp
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setIsAddAccountDialogOpen(true)} 
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm tài khoản mới
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="accounts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Tài khoản đã tích hợp với {bot.name}</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={refreshTabData} 
                    disabled={isLoading} 
                    className="h-8"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Đang làm mới...' : 'Làm mới'}
                  </Button>
                  <Button size="sm" onClick={() => setIsAddAccountDialogOpen(true)} className="h-8">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Thêm tài khoản
                  </Button>
                </div>
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
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
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
                    <p className="text-muted-foreground mb-4">Chưa có tài khoản nào được tích hợp với bot này.</p>
                    <Button onClick={() => setIsAddAccountDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Thêm tài khoản
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trading-logs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>TB365 Signal Logs ({bot.botId})</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshTabData} 
                  disabled={isLoading} 
                  className="h-8"
                >
                  <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Đang làm mới...' : 'Làm mới'}
                </Button>
              </CardHeader>
              <CardContent>
                <TradingViewLogs botId={bot.id} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="coinstrat-logs">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Coinstrat Pro Logs</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshTabData} 
                  disabled={isLoading} 
                  className="h-8"
                >
                  <RefreshCw className={`h-3.5 w-3.5 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Đang làm mới...' : 'Làm mới'}
                </Button>
              </CardHeader>
              <CardContent>
                <CoinstratLogs botId={bot.id} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      
        <AddAccountDialog 
          open={isAddAccountDialogOpen}
          onOpenChange={setIsAddAccountDialogOpen}
          botId={bot.id}
          onAddAccount={handleAddAccount}
        />
      </div>
    </MainLayout>
  );
};

export default IntegratedPremiumBotDetail;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Info, 
  ArrowLeft, 
  Bot,
  TrendingUp,
  CircuitBoard,
  Wallet,
  Users,
  BarChart4,
  Activity,
  PieChart,
  LineChart,
  Settings,
  Table
} from 'lucide-react';
import { PremiumBot } from '@/types';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BotType, BotStatus, BotRiskLevel } from '@/constants/botTypes';
import { USER_ROUTES } from '@/constants/routes';

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
  { name: 'Feb', value: 8.3 },
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

const statisticsData = [
  { name: 'Win Rate', value: '65%', icon: <Activity className="h-4 w-4 text-green-500" /> },
  { name: 'Avg Profit', value: '2.7%', icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
  { name: 'Max Drawdown', value: '8.5%', icon: <LineChart className="h-4 w-4 text-red-500" /> },
  { name: 'Sharp Ratio', value: '1.8', icon: <PieChart className="h-4 w-4 text-blue-500" /> },
];

const recentTradesData = [
  { id: 1, pair: 'BTC/USDT', type: 'Long', entry: '41250.00', exit: '42100.50', profit: '+2.06%', date: '2023-11-22 14:30' },
  { id: 2, pair: 'ETH/USDT', type: 'Short', entry: '2250.75', exit: '2180.25', profit: '+3.13%', date: '2023-11-21 09:45' },
  { id: 3, pair: 'SOL/USDT', type: 'Long', entry: '105.50', exit: '112.25', profit: '+6.40%', date: '2023-11-20 16:15' },
  { id: 4, pair: 'BNB/USDT', type: 'Long', entry: '235.75', exit: '230.50', profit: '-2.23%', date: '2023-11-19 11:30' },
  { id: 5, pair: 'XRP/USDT', type: 'Short', entry: '0.6150', exit: '0.5975', profit: '+2.85%', date: '2023-11-18 19:20' },
];

const IntegratedPremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState<PremiumBot | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<string>("month");
  
  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const mockBot: PremiumBot = {
          id: botId || 'pb-001',
          name: 'Alpha Momentum',
          description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.',
          exchange: 'Coinstart Pro',
          type: BotType.PREMIUM_BOT,
          performanceLastMonth: '+18.5%',
          performanceAllTime: '+125.4%',
          risk: BotRiskLevel.MEDIUM,
          minCapital: '$500',
          status: BotStatus.ACTIVE,
          subscribers: 86,
          imageUrl: null,
          colorScheme: 'green',
          isIntegrated: true,
          botId: 'PRE7459',
          createdDate: '2023-10-15',
          lastUpdated: '2023-11-10'
        };
        
        setBot(mockBot);
        setIsLoading(false);
      }, 500);
    };
    
    fetchBotDetails();
  }, [botId]);

  const goBack = () => {
    navigate(USER_ROUTES.INTEGRATED_PREMIUM_BOTS);
  };

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
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
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

  const refreshTabData = () => {
    setIsLoading(true);
    // Simulate API call with a timer
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "trades" ? "Giao dịch" : 
        activeTab === "connected-accounts" ? "Tài khoản kết nối" : "Cài đặt"
      }`);
    }, 1000);
  };

  if (isLoading) {
    return (
      <MainLayout title="Chi tiết Bot tích hợp">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </MainLayout>
    );
  }

  if (!bot) {
    return (
      <MainLayout title="Bot không tồn tại">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Info className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Không Tìm Thấy Bot</h2>
          <p className="text-muted-foreground mb-6">Chúng tôi không thể tìm thấy bot bạn đang tìm kiếm.</p>
          <Button onClick={goBack}>Quay Lại Danh Sách Bot</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Bot tích hợp: ${bot.name}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Button>
            <h2 className="text-xl font-bold">
              {bot.name}
            </h2>
            <Badge className={getRiskColor(bot.risk)}>
              Rủi ro: {getRiskLabel(bot.risk)}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
              {bot.botId}
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="trades">Giao dịch</TabsTrigger>
            <TabsTrigger value="connected-accounts">Tài khoản kết nối</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
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
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Thông tin Bot</CardTitle>
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
                        <Users className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-300">Ngày tích hợp</span>
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{bot.createdDate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Hiệu suất</CardTitle>
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
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trades">
            <Card>
              <CardHeader>
                <CardTitle>Giao dịch gần đây</CardTitle>
                <CardDescription>Các giao dịch được thực hiện bởi bot trong thời gian gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Cặp giao dịch</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Kiểu</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Giá vào</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Giá ra</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Lợi nhuận</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-slate-500 dark:text-slate-400">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recentTradesData.map((trade) => (
                        <tr key={trade.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-sm font-medium">{trade.pair}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="outline" className={trade.type === 'Long' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400'}>
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{trade.entry}</td>
                          <td className="px-4 py-3 text-sm">{trade.exit}</td>
                          <td className="px-4 py-3 text-sm font-medium" style={{ color: trade.profit.startsWith('+') ? '#10b981' : '#ef4444' }}>
                            {trade.profit}
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{trade.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" size="sm" className="gap-1">
                  <Table className="h-4 w-4 mr-1" />
                  Xem tất cả giao dịch
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="connected-accounts">
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản kết nối</CardTitle>
                <CardDescription>Quản lý các tài khoản được kết nối với bot này</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-slate-500 dark:text-slate-400 mb-4">Không có tài khoản nào được kết nối với bot này</p>
                  <Button size="sm">
                    Kết nối tài khoản
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt Bot</CardTitle>
                <CardDescription>Quản lý các thiết lập cho bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Cài đặt giao dịch
                  </h3>
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <span>Thông báo giao dịch</span>
                      <Badge variant="outline">Đang bật</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <span>Báo cáo hiệu suất hàng tuần</span>
                      <Badge variant="outline">Đang bật</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                      <span>Giao dịch tự động</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">Đang hoạt động</Badge>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button size="sm">
                        Chỉnh sửa cài đặt
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default IntegratedPremiumBotDetail;

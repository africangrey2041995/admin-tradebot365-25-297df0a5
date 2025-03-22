import React, { useState, useRef } from 'react';
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
  Plus
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
import SubscribePremiumBotDialog from '@/components/premium/SubscribePremiumBotDialog';

const premiumBots = [
  {
    id: 'pb-001',
    name: 'Alpha Momentum',
    description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao.',
    longDescription: `Alpha Momentum Bot là một bot giao dịch tiên tiến sử dụng chiến lược momentum để giao dịch các cặp tiền điện tử.

Bot hoạt động bằng cách phân tích động lượng (momentum) của giá và khối lượng giao dịch để xác định các xu hướng mạnh. Khi một xu hướng được xác định, bot sẽ mở vị thế và đặt các mức take profit và stop loss thích hợp.

Các tính năng chính:
- Phân tích động lượng giá và khối lượng
- Bộ lọc xu hướng thị trường
- Quản lý rủi ro tự động
- Đa dạng cặp giao dịch
- Báo cáo hiệu suất theo thời gian thực

Bot này phù hợp cho các nhà đầu tư muốn tận dụng các xu hướng mạnh trong thị trường tiền điện tử.`,
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
    botId: 'PRE7459', // Updated botId to follow PRE#### format
    monthlyPerformance: [
      { month: 'Jan', value: 12.5 },
      { month: 'Feb', value: 8.3 },
      { month: 'Mar', value: -2.1 },
      { month: 'Apr', value: 5.7 },
      { month: 'May', value: 15.2 },
      { month: 'Jun', value: 10.1 },
      { month: 'Jul', value: 5.5 },
      { month: 'Aug', value: -3.2 },
      { month: 'Sep', value: 9.8 },
      { month: 'Oct', value: 18.5 },
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 },
    ],
    pairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'XRP/USDT'],
    features: [
      'Phân tích động lượng',
      'Bộ lọc tin hiệu',
      'Quản lý rủi ro',
      'Báo cáo thời gian thực',
      'Cài đặt tùy chỉnh',
      'Hỗ trợ đa sàn',
      'Đa dạng cặp tiền'
    ],
    createdDate: '2023-04-15',
    isIntegrated: false
  },
  // ... other premium bots
];

const PremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<string>("month");
  
  const bot = premiumBots.find(b => b.id === botId);

  if (!bot) {
    return (
      <MainLayout title="Không tìm thấy Bot">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Không tìm thấy Bot
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Bot bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button onClick={() => navigate('/premium-bots')}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại danh sách Bot
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleSubscribe = () => {
    setSubscribeDialogOpen(true);
  };

  const confirmSubscription = (subscriptionData: any) => {
    toast.success(`Đăng ký thành công!`, {
      description: `Bạn đã đăng ký sử dụng ${bot.name} cho tài khoản đã chọn với hệ số khối lượng x${subscriptionData.volumeMultiplier}.`,
    });
    
    setTimeout(() => {
      navigate('/premium-bots');
    }, 500);
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
      return bot?.monthlyPerformance || [];
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

  const statisticsData = [
    { name: 'Win Rate', value: '65%', icon: <Activity className="h-4 w-4 text-green-500" /> },
    { name: 'Avg Profit', value: '2.7%', icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
    { name: 'Max Drawdown', value: '8.5%', icon: <ChartLine className="h-4 w-4 text-red-500" /> },
    { name: 'Sharp Ratio', value: '1.8', icon: <PieChart className="h-4 w-4 text-blue-500" /> },
  ];

  return (
    <MainLayout title={bot?.name || "Premium Bot Detail"}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/premium-bots')}
              className="mr-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Quay lại
            </Button>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center">
              {bot?.name}
              <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
            </h1>
            <Badge className={getRiskColor(bot?.risk)}>
              Rủi ro: {getRiskLabel(bot?.risk)}
            </Badge>
            {/* Add Bot ID badge */}
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
              {bot.botId}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSubscribe}>
              Đăng Ký Sử Dụng
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Giới thiệu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none dark:prose-invert">
                  <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
                    {bot?.longDescription}
                  </p>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Các cặp tiền giao dịch</h4>
                  <div className="flex flex-wrap gap-2">
                    {bot?.pairs.map((pair, index) => (
                      <Badge key={index} variant="outline">{pair}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Biểu đồ hiệu suất</CardTitle>
                <Tabs defaultValue="month" value={selectedChartPeriod} onValueChange={setSelectedChartPeriod} className="w-[250px]">
                  <TabsList>
                    <TabsTrigger value="week">Tuần</TabsTrigger>
                    <TabsTrigger value="month">Tháng</TabsTrigger>
                    <TabsTrigger value="year">Năm</TabsTrigger>
                  </TabsList>
                </Tabs>
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
              <CardHeader>
                <CardTitle>Chi tiết giao dịch</CardTitle>
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

            <Card>
              <CardHeader>
                <CardTitle>Tính năng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bot?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">Loại Bot</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{getTypeLabel(bot?.type)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <CircuitBoard className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">Sàn giao dịch</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{bot?.exchange}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">Vốn tối thiểu</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{bot?.minCapital}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">Người dùng</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{bot?.subscribers}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">Ngày tạo</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{bot?.createdDate}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-500">Hiệu suất tháng này</span>
                  </div>
                  <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                    {bot?.performanceLastMonth}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart4 className="h-4 w-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-500">Hiệu suất tổng thời gian</span>
                  </div>
                  <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                    {bot?.performanceAllTime}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Đăng ký sử dụng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Đăng ký sử dụng {bot?.name} cho tài khoản của bạn để bắt đầu giao dịch tự động
                </p>
                <Button onClick={handleSubscribe} className="w-full">
                  Đăng Ký Ngay
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <SubscribePremiumBotDialog
        open={subscribeDialogOpen}
        onOpenChange={setSubscribeDialogOpen}
        botId={bot?.id || ''}
        botName={bot?.name || ''}
        onSubscribe={confirmSubscription}
      />
    </MainLayout>
  );
};

export default PremiumBotDetail;

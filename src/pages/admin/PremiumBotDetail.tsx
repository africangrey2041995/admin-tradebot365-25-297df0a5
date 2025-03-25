
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Info, 
  ArrowLeft, 
  Webhook, 
  Key, 
  ExternalLink,
  Edit,
  Check,
  X,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Bot,
  CircuitBoard,
  Wallet,
  Calendar,
  Users,
  BarChart4,
  LineChart,
  Activity,
  PieChart,
  Plus,
  Pencil,
  Save,
  CircleDollarSign
} from 'lucide-react';
import { PremiumBot } from '@/types';
import { BotType, BotRiskLevel, BotStatus } from '@/constants/botTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BotProfileTabs from '@/components/bots/BotProfileTabs';
import { toast } from 'sonner';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import EditableFeaturesCard from '@/components/admin/prop-bots/detail/EditableFeaturesCard';
import EditableDescriptionCard from '@/components/admin/premium-bots/detail/EditableDescriptionCard';
import EditableTradingPairsCard from '@/components/admin/premium-bots/detail/EditableTradingPairsCard';

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

const AdminPremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState<PremiumBot | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<string>("month");
  
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editableBot, setEditableBot] = useState<Partial<PremiumBot>>({});
  
  // New state for features and trading pairs
  const [features, setFeatures] = useState<string[]>([]);
  const [tradingPairs, setTradingPairs] = useState<string[]>([]);
  
  const fromUserDetail = location.state?.from === 'userDetail';
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const mockBot: PremiumBot = {
          botId: botId || 'pb-001',
          name: 'Alpha Momentum',
          description: 'Bot giao dịch sử dụng chiến lược momentum cho thị trường tiền điện tử với tỷ lệ thành công cao. Được thiết kế để tận dụng các thời điểm biến động mạnh của thị trường và tối ưu lợi nhuận trong các giai đoạn tăng trưởng. Bot sử dụng kết hợp nhiều chỉ báo kỹ thuật để đưa ra quyết định mua/bán chính xác.',
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
          createdDate: '2023-01-15T10:20:30Z',
          lastUpdated: '2023-09-18T16:55:33Z',
          users: 86,
          profit: '+18.5%'
        };
        
        setBot(mockBot);
        setEditableBot(mockBot);
        
        // Initialize features and trading pairs
        setFeatures([
          'Giao dịch tự động dựa trên tín hiệu',
          'Phân tích kỹ thuật theo xu hướng',
          'Tối ưu hóa vào lệnh theo momentum',
          'Quản lý rủi ro động',
          'Báo cáo hiệu suất chi tiết'
        ]);
        
        setTradingPairs([
          'BTC/USDT',
          'ETH/USDT',
          'BNB/USDT',
          'SOL/USDT',
          'XRP/USDT'
        ]);
        
        setIsLoading(false);
      }, 500);
    };
    
    fetchBotDetails();
  }, [botId]);

  const goBack = () => {
    if (fromUserDetail && userId) {
      navigate(`/admin/users/${userId}`);
    } else {
      navigate('/admin/premium-bots');
    }
  };

  const viewPublicBotProfile = () => {
    window.open(`/premium-bots/${botId}`, '_blank');
  };

  const handleEditSection = (section: string) => {
    setEditingSection(section);
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditableBot(bot || {});
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setBot({...bot, ...editableBot} as PremiumBot);
      setEditingSection(null);
      setIsLoading(false);
      
      toast.success('Thông tin bot đã được cập nhật!');
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableBot(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditableBot(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateFeatures = (updatedFeatures: string[]) => {
    setFeatures(updatedFeatures);
    toast.success('Đã cập nhật tính năng bot');
  };

  const handleUpdateDescription = (updatedDescription: string) => {
    setEditableBot(prev => ({ ...prev, description: updatedDescription }));
    // We don't need to show toast here since EditableDescriptionCard already does that
  };

  const handleUpdateTradingPairs = (updatedPairs: string[]) => {
    setTradingPairs(updatedPairs);
    // We don't need to show toast here since EditableTradingPairsCard already does that
  };

  const refreshTabData = () => {
    setIsLoading(true);
    // Simulate API call with a timer
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "accounts" ? "Tài khoản" : 
        activeTab === "trading-logs" ? "TB365 Logs" : "Coinstrat Logs"
      }`);
    }, 1000);
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Info className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Không Tìm Thấy Bot</h2>
          <p className="text-muted-foreground mb-6">Chúng tôi không thể tìm thấy bot bạn đang tìm kiếm.</p>
          <Button onClick={goBack}>Quay Lại Danh Sách Bot</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="white" size="sm" onClick={goBack}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Quay lại
          </Button>
          <h1 className="text-2xl font-bold text-white flex items-center">
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
          <Button variant="outline" onClick={viewPublicBotProfile}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Xem trang người dùng
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
          <TabsTrigger value="trading-logs">TB365 Logs</TabsTrigger>
          <TabsTrigger value="coinstrat-logs">Coinstrat Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Description Card */}
              <EditableDescriptionCard 
                description={editableBot.description || ''}
                onUpdate={handleUpdateDescription}
              />
              
              {/* Features Card */}
              <EditableFeaturesCard 
                features={features}
                onUpdate={handleUpdateFeatures}
              />
              
              {/* Trading Pairs Card */}
              <EditableTradingPairsCard 
                tradingPairs={tradingPairs}
                onUpdate={handleUpdateTradingPairs}
              />
              
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
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Thông tin chung</CardTitle>
                  {editingSection === 'general-info' ? (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Hủy
                      </Button>
                      <Button size="sm" onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-1" />
                        Lưu
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditSection('general-info')}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Chỉnh sửa
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === 'general-info' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Tên Bot</label>
                        <Input 
                          name="name" 
                          value={editableBot.name || ''} 
                          onChange={handleInputChange} 
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Loại Bot</label>
                          <Select 
                            value={editableBot.type || ''}
                            onValueChange={(value) => handleSelectChange('type', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Chọn loại bot" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="momentum">Momentum</SelectItem>
                              <SelectItem value="scalping">Scalping</SelectItem>
                              <SelectItem value="swing">Swing</SelectItem>
                              <SelectItem value="grid">Grid</SelectItem>
                              <SelectItem value="trend">Trend</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Sàn giao dịch</label>
                          <Input 
                            name="exchange" 
                            value={editableBot.exchange || ''} 
                            onChange={handleInputChange} 
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Mức độ rủi ro</label>
                          <Select 
                            value={editableBot.risk || ''}
                            onValueChange={(value) => handleSelectChange('risk', value as 'low' | 'medium' | 'high')}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Chọn mức độ rủi ro" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Thấp</SelectItem>
                              <SelectItem value="medium">Trung bình</SelectItem>
                              <SelectItem value="high">Cao</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Bot ID</label>
                          <Input 
                            name="botId" 
                            value={editableBot.botId || ''} 
                            onChange={handleInputChange} 
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Vốn tối thiểu</label>
                          <Input 
                            name="minCapital" 
                            value={editableBot.minCapital || ''} 
                            onChange={handleInputChange} 
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Trạng thái</label>
                          <Select 
                            value={editableBot.status || ''}
                            onValueChange={(value) => handleSelectChange('status', value as 'active' | 'inactive')}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Chọn trạng thái" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Hoạt động</SelectItem>
                              <SelectItem value="inactive">Không hoạt động</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
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
                          <span className="text-slate-600 dark:text-slate-300">Subscribers</span>
                        </div>
                        <span className="font-medium text-slate-800 dark:text-white">{bot.subscribers}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Hiệu suất</CardTitle>
                  {editingSection === 'performance' ? (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Hủy
                      </Button>
                      <Button size="sm" onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-1" />
                        Lưu
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditSection('performance')}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Chỉnh sửa
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingSection === 'performance' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Hiệu suất tháng này</label>
                        <Input 
                          name="performanceLastMonth" 
                          value={editableBot.performanceLastMonth || ''} 
                          onChange={handleInputChange} 
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Hiệu suất tổng thời gian</label>
                        <Input 
                          name="performanceAllTime" 
                          value={editableBot.performanceAllTime || ''} 
                          onChange={handleInputChange} 
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>API Tích hợp</CardTitle>
                  {editingSection === 'api' ? (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-1" />
                        Hủy
                      </Button>
                      <Button size="sm" onClick={handleSaveChanges}>
                        <Save className="h-4 w-4 mr-1" />
                        Lưu
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditSection('api')}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Chỉnh sửa
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                      <Webhook className="h-4 w-4 text-primary" />
                      Webhook URL
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="bg-slate-50 p-3 rounded-md text-sm w-full font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        https://api.tradebot365.com/webhook/premium/{bot.botId.toLowerCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2">
                      <Key className="h-4 w-4 text-red-400" />
                      Signal Token
                    </h3>
                    {editingSection === 'api' ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          type="text"
                          className="font-mono"
                          value="CSTYSPMEV8C-PREMIUM-TOKEN"
                          readOnly={false}
                        />
                        <Button variant="outline" size="sm">
                          Tạo mới
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="bg-slate-50 p-3 rounded-md text-sm w-full font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          ************************
                        </div>
                      </div>
                    )}
                    {!editingSection && <p className="text-xs text-slate-500 mt-1">Token đã được ẩn đi vì lý do bảo mật</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="accounts">
          <BotProfileTabs botId={bot.botId} onAddAccount={() => {
            console.log("Add account to premium bot", bot.botId);
            toast.success("Chức năng thêm tài khoản đang được phát triển");
          }} />
        </TabsContent>
        
        <TabsContent value="trading-logs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>TB365 Signal Logs</CardTitle>
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
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Hành động</th>
                      <th className="text-left py-3 px-4 font-medium">Cặp tiền</th>
                      <th className="text-left py-3 px-4 font-medium">Trạng thái</th>
                      <th className="text-left py-3 px-4 font-medium">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4 font-mono text-xs">SIG-{10000 + i}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${
                            i % 2 === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {i % 2 === 0 ? 'ENTER_LONG' : 'EXIT_LONG'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">BTC/USDT</td>
                        <td className="py-3 px-4">
                          <Badge className={`${
                            i % 4 === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          }`}>
                            {i % 4 === 0 ? 'Pending' : 'Processed'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {new Date().toLocaleString('vi-VN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coinstrat-logs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Coinstart Signal Logs</CardTitle>
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
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Hành động</th>
                      <th className="text-left py-3 px-4 font-medium">Cặp tiền</th>
                      <th className="text-left py-3 px-4 font-medium">Trạng thái</th>
                      <th className="text-left py-3 px-4 font-medium">Tài khoản</th>
                      <th className="text-left py-3 px-4 font-medium">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4 font-mono text-xs">CS-{20000 + i}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${
                            i % 2 === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {i % 2 === 0 ? 'ENTER_LONG' : 'EXIT_LONG'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">BTC/USDT</td>
                        <td className="py-3 px-4">
                          <Badge className={`${
                            i % 5 === 0 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          }`}>
                            {i % 5 === 0 ? 'Failed' : 'Processed'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">ACC-{1000 + i}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {new Date().toLocaleString('vi-VN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPremiumBotDetail;

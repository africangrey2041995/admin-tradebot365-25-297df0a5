import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { 
  ChartLineUp, 
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
  CircleDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { Account } from '@/types';

// Mocking premium bot data
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
    createdDate: '2023-04-15'
  },
  // ... other premium bots
];

// Mock accounts for subscription
const mockAccounts: Account[] = [
  {
    id: "acc1",
    name: "Trading Account 1",
    status: "Connected",
    lastUpdated: "2023-11-05",
    createdDate: "2023-10-01",
    tradingAccountBalance: "$10,500.25",
    tradingAccount: "CTrader Pro",
    tradingAccountType: "Live",
  },
  {
    id: "acc2",
    name: "Trading Account 2",
    status: "Connected",
    lastUpdated: "2023-11-10",
    createdDate: "2023-09-15",
    tradingAccountBalance: "$5,890.50",
    tradingAccount: "CTrader Standard",
    tradingAccountType: "Demo",
  },
  {
    id: "acc3",
    name: "Trading Account 3",
    status: "Disconnected",
    lastUpdated: "2023-10-28",
    createdDate: "2023-08-20",
    tradingAccountBalance: "$2,100.75",
    tradingAccount: "CTrader Basic",
    tradingAccountType: "Live",
  }
];

const PremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>("");

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

  const confirmSubscription = () => {
    if (!selectedAccount) {
      toast.error("Vui lòng chọn tài khoản để đăng ký sử dụng bot", {
        description: "Bạn cần chọn một tài khoản đã kết nối để tiếp tục."
      });
      return;
    }

    toast.success(`Đăng ký thành công!`, {
      description: `Bạn đã đăng ký sử dụng ${bot.name} cho tài khoản đã chọn.`,
    });
    setSubscribeDialogOpen(false);
    
    // In a real app, we would make an API call to register the subscription
    // For now, we'll just simulate success and redirect
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

  return (
    <MainLayout title={bot.name}>
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
              {bot.name}
              <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
            </h1>
            <Badge className={getRiskColor(bot.risk)}>
              Rủi ro: {getRiskLabel(bot.risk)}
            </Badge>
          </div>
          <Button onClick={handleSubscribe}>
            Đăng Ký Sử Dụng
          </Button>
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
                    {bot.longDescription}
                  </p>
                </div>
                <div className="mt-6">
                  <h4 className="font-medium text-slate-800 dark:text-white mb-2">Các cặp tiền giao dịch</h4>
                  <div className="flex flex-wrap gap-2">
                    {bot.pairs.map((pair, index) => (
                      <Badge key={index} variant="outline">{pair}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tính năng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bot.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biểu đồ hiệu suất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-slate-500">
                    [Biểu đồ hiệu suất sẽ được hiển thị ở đây]
                  </p>
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
                    <span className="text-slate-600 dark:text-slate-300">Người dùng</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{bot.subscribers}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600 dark:text-slate-300">Ngày tạo</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-white">{bot.createdDate}</span>
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
                <CardTitle>Đăng ký sử dụng</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Đăng ký sử dụng {bot.name} cho tài khoản của bạn để bắt đầu giao dịch tự động
                </p>
                <Button onClick={handleSubscribe} className="w-full">
                  Đăng Ký Ngay
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={subscribeDialogOpen} onOpenChange={setSubscribeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Đăng ký sử dụng {bot.name}</DialogTitle>
            <DialogDescription>
              Chọn tài khoản mà bạn muốn kết nối với premium bot này
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Chọn tài khoản
              </label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tài khoản cần kết nối" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.map((account) => (
                    <SelectItem 
                      key={account.id} 
                      value={account.id}
                      disabled={account.status !== "Connected"}
                    >
                      <div className="flex items-center gap-2">
                        <span>{account.name}</span>
                        {account.status !== "Connected" && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Chưa kết nối
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-800 p-4 rounded-lg border border-slate-200 dark:border-zinc-700">
              <h4 className="font-medium text-slate-800 dark:text-white flex items-center mb-2">
                <CircleDollarSign className="h-4 w-4 mr-1" /> Chi phí sử dụng
              </h4>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-slate-600 dark:text-slate-300">Phí đăng ký:</span>
                <span className="font-medium text-slate-800 dark:text-white">Free</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hiện tại bot này được cung cấp miễn phí trong giai đoạn thử nghiệm.
              </p>
            </div>
            
            {!selectedAccount && (
              <div className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Bạn cần chọn tài khoản đã kết nối để tiếp tục</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSubscribeDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={confirmSubscription} disabled={!selectedAccount}>
              Xác nhận đăng ký
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default PremiumBotDetail;

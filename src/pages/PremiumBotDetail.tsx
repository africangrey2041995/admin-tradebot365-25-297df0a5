import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import SubscribePremiumBotDialog from '@/components/premium/SubscribePremiumBotDialog';
import { toast } from 'sonner';
import PremiumBotDetailTabs from '@/components/bots/details/PremiumBotDetailTabs';
import BotHeader from '@/components/bots/details/BotHeader';
import BotDescription from '@/components/bots/details/BotDescription';
import PerformanceChart from '@/components/bots/details/PerformanceChart';
import TradeDetailsChart from '@/components/bots/details/TradeDetailsChart';
import FeaturesList from '@/components/bots/details/FeaturesList';
import BotInfoCard from '@/components/bots/details/BotInfoCard';
import PerformanceCard from '@/components/bots/details/PerformanceCard';
import { usePremiumBotDetail } from '@/hooks/usePremiumBotDetail';

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
    isIntegrated: false,
    accounts: []
  },
  {
    id: 'pb-002',
    name: 'Dynamic Scalper Pro',
    description: 'Bot chuyên giao dịch scalping với khả năng thích ứng cao với biến động thị trường.',
    longDescription: `Dynamic Scalper Pro là một bot giao dịch scalping được thiết kế để tận dụng các biến động giá nhỏ trong thị trường tiền điện tử.

Bot sử dụng các chỉ báo kỹ thuật và thuật toán phức tạp để xác định các cơ hội giao dịch ngắn hạn. Khi một cơ hội được xác định, bot sẽ mở và đóng vị thế trong vài giây hoặc phút để kiếm lợi nhuận nhỏ.

Các tính năng chính:
- Xác định cơ hội giao dịch ngắn hạn
- Quản lý rủi ro nâng cao
- Tốc độ giao dịch cực nhanh
- Hoạt động 24/7
- Báo cáo chi tiết

Bot này phù hợp cho các nhà đầu tư muốn kiếm lợi nhuận từ các biến động giá nhỏ và có khả năng chấp nhận rủi ro cao.`,
    exchange: 'Binance',
    type: 'scalping',
    performanceLastMonth: '+22.1%',
    performanceAllTime: '+148.9%',
    risk: 'high',
    minCapital: '$300',
    status: 'active',
    subscribers: 62,
    imageUrl: null,
    colorScheme: 'red',
    botId: 'PRE8261',
    monthlyPerformance: [
      { month: 'Jan', value: 15.2 },
      { month: 'Feb', value: 11.5 },
      { month: 'Mar', value: -3.8 },
      { month: 'Apr', value: 7.9 },
      { month: 'May', value: 18.7 },
      { month: 'Jun', value: 12.3 },
      { month: 'Jul', value: 6.8 },
      { month: 'Aug', value: -4.5 },
      { month: 'Sep', value: 11.2 },
      { month: 'Oct', value: 22.1 },
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 },
    ],
    pairs: ['BTC/USDT', 'ETH/USDT', 'LTC/USDT', 'XRP/USDT', 'ADA/USDT'],
    features: [
      'Phân tích kỹ thuật nâng cao',
      'Quản lý rủi ro tự động',
      'Tốc độ giao dịch cực nhanh',
      'Hoạt động 24/7',
      'Báo cáo chi tiết',
      'Cài đặt tùy chỉnh',
      'Hỗ trợ đa sàn'
    ],
    createdDate: '2023-05-20',
    isIntegrated: false,
    accounts: []
  },
  {
    id: 'pb-003',
    name: 'Trend Follower Elite',
    description: 'Bot giao dịch theo xu hướng dài hạn, phù hợp cho nhà đầu tư kiên nhẫn.',
    longDescription: `Trend Follower Elite là một bot giao dịch theo xu hướng được thiết kế để xác định và tận dụng các xu hướng dài hạn trong thị trường tiền điện tử.

Bot sử dụng các chỉ báo kỹ thuật và phân tích cơ bản để xác định các xu hướng mạnh. Khi một xu hướng được xác định, bot sẽ mở vị thế và giữ nó trong vài tuần hoặc tháng để kiếm lợi nhuận lớn.

Các tính năng chính:
- Xác định xu hướng dài hạn
- Quản lý vốn thông minh
- Giao dịch tự động
- Hoạt động 24/7
- Báo cáo toàn diện

Bot này phù hợp cho các nhà đầu tư muốn kiếm lợi nhuận từ các xu hướng dài hạn và có khả năng chấp nhận rủi ro trung bình.`,
    exchange: 'Coinbase Pro',
    type: 'trend',
    performanceLastMonth: '+15.8%',
    performanceAllTime: '+98.2%',
    risk: 'medium',
    minCapital: '$1000',
    status: 'active',
    subscribers: 48,
    imageUrl: null,
    colorScheme: 'purple',
    botId: 'PRE9147',
    monthlyPerformance: [
      { month: 'Jan', value: 10.2 },
      { month: 'Feb', value: 7.5 },
      { month: 'Mar', value: -1.2 },
      { month: 'Apr', value: 4.8 },
      { month: 'May', value: 12.3 },
      { month: 'Jun', value: 8.9 },
      { month: 'Jul', value: 4.2 },
      { month: 'Aug', value: -2.5 },
      { month: 'Sep', value: 7.6 },
      { month: 'Oct', value: 15.8 },
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 },
    ],
    pairs: ['BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD', 'BCH/USD'],
    features: [
      'Phân tích xu hướng dài hạn',
      'Quản lý vốn thông minh',
      'Giao dịch tự động',
      'Hoạt động 24/7',
      'Báo cáo toàn diện',
      'Cài đặt tùy chỉnh',
      'Hỗ trợ đa sàn'
    ],
    createdDate: '2023-06-10',
    isIntegrated: false,
    accounts: []
  },
  {
    id: 'pb-004',
    name: 'Grid Master Bot',
    description: 'Bot giao dịch lưới, tối ưu hóa lợi nhuận trong thị trường đi ngang.',
    longDescription: `Grid Master Bot là một bot giao dịch lưới được thiết kế để tạo ra lợi nhuận trong thị trường đi ngang hoặc ít biến động.

Bot hoạt động bằng cách đặt một loạt các lệnh mua và bán ở các mức giá khác nhau, tạo thành một "lưới". Khi giá dao động trong lưới, bot sẽ tự động mua ở mức giá thấp và bán ở mức giá cao, tạo ra lợi nhuận nhỏ từ mỗi giao dịch.

Các tính năng chính:
- Tạo lợi nhuận trong thị trường đi ngang
- Tự động hóa hoàn toàn
- Quản lý rủi ro tích hợp
- Hoạt động 24/7
- Báo cáo chi tiết

Bot này phù hợp cho các nhà đầu tư muốn kiếm lợi nhuận từ thị trường đi ngang và có khả năng chấp nhận rủi ro thấp.`,
    exchange: 'KuCoin',
    type: 'grid',
    performanceLastMonth: '+9.5%',
    performanceAllTime: '+62.7%',
    risk: 'low',
    minCapital: '$200',
    status: 'active',
    subscribers: 35,
    imageUrl: null,
    colorScheme: 'blue',
    botId: 'PRE6529',
    monthlyPerformance: [
      { month: 'Jan', value: 6.8 },
      { month: 'Feb', value: 5.2 },
      { month: 'Mar', value: -0.5 },
      { month: 'Apr', value: 3.1 },
      { month: 'May', value: 8.4 },
      { month: 'Jun', value: 6.2 },
      { month: 'Jul', value: 3.5 },
      { month: 'Aug', value: -1.8 },
      { month: 'Sep', value: 5.9 },
      { month: 'Oct', value: 9.5 },
      { month: 'Nov', value: 0 },
      { month: 'Dec', value: 0 },
    ],
    pairs: ['BTC/USDT', 'ETH/USDT', 'LTC/USDT', 'XRP/USDT', 'ADA/USDT'],
    features: [
      'Tạo lợi nhuận trong thị trường đi ngang',
      'Tự động hóa hoàn toàn',
      'Quản lý rủi ro tích hợp',
      'Hoạt động 24/7',
      'Báo cáo chi tiết',
      'Cài đặt tùy chỉnh',
      'Hỗ trợ đa sàn'
    ],
    createdDate: '2023-07-01',
    isIntegrated: false,
    accounts: []
  }
];

const PremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<string>("month");

  const bot = premiumBots.find(b => b.id === botId);

  const { 
    tradePerformanceData, 
    statisticsData 
  } = usePremiumBotDetail(botId, 'user-001');

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
            Quay lại danh sách Bot
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

  return (
    <MainLayout title={bot?.name || "Premium Bot Detail"}>
      <div className="space-y-6">
        <BotHeader
          name={bot.name}
          risk={bot.risk}
          botId={bot.botId}
          onBack={() => navigate('/premium-bots')}
        />

        <div className="flex justify-end">
          <Button onClick={handleSubscribe}>
            Đăng Ký Sử Dụng
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <BotDescription 
              description={bot.longDescription} 
              pairs={bot.pairs} 
            />

            <PerformanceChart
              selectedPeriod={selectedChartPeriod}
              onPeriodChange={setSelectedChartPeriod}
              chartData={generateChartData()}
            />

            <TradeDetailsChart
              tradePerformanceData={tradePerformanceData}
              statisticsData={statisticsData}
            />

            <FeaturesList features={bot.features} />
          </div>

          <div className="space-y-6">
            <BotInfoCard
              type={bot.type}
              exchange={bot.exchange}
              minCapital={bot.minCapital}
              createdDate={bot.createdDate}
              subscribers={bot.subscribers}
            />

            <PerformanceCard
              performanceLastMonth={bot.performanceLastMonth}
              performanceAllTime={bot.performanceAllTime}
            />

            <div className="card border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-zinc-900">
                <h3 className="font-semibold mb-2">Đăng ký sử dụng</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Đăng ký sử dụng {bot.name} cho tài khoản của bạn để bắt đầu giao dịch tự động
                </p>
                <Button onClick={handleSubscribe} className="w-full">
                  Đăng Ký Ngay
                </Button>
              </div>
            </div>
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

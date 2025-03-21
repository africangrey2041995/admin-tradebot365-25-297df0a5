
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bot, CheckCircle2, CircleAlert, Users, DollarSign, BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import ErrorSignals from '@/components/bots/ErrorSignals';
import SubscribePremiumBotDialog from '@/components/premium/SubscribePremiumBotDialog';

const propTradingBots = [
  {
    id: 'ptb-001',
    name: 'Prop Master',
    description: 'Bot đặc biệt thiết kế để vượt qua các bài kiểm tra của Coinstrat Pro Prop Trading với tỷ lệ thành công cao.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+11.2%',
    performanceAllTime: '+45.8%',
    risk: 'low',
    minCapital: '$500',
    status: 'active',
    subscribers: 120,
    imageUrl: null,
    colorScheme: 'blue',
    features: [
      'Tối ưu hóa để vượt qua các bài kiểm tra Prop Trading',
      'Quản lý rủi ro tự động theo yêu cầu của Coinstrat Pro',
      'Báo cáo hiệu suất chi tiết theo các tiêu chí đánh giá Prop Trading',
      'Chiến lược giao dịch nhất quán với tỷ lệ win cao'
    ],
    requirements: [
      'Vốn tối thiểu $500',
      'Tài khoản Coinstrat Pro đã xác minh',
      'Phù hợp với giai đoạn Challenger hoặc Verification'
    ]
  },
  {
    id: 'ptb-002',
    name: 'Risk Manager Pro',
    description: 'Bot tối ưu quản lý rủi ro để đáp ứng các yêu cầu nghiêm ngặt của Prop Trading, giúp giữ tỷ lệ drawdown thấp.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+8.5%',
    performanceAllTime: '+38.9%',
    risk: 'low',
    minCapital: '$700',
    status: 'active',
    subscribers: 95,
    imageUrl: null,
    colorScheme: 'green',
    features: [
      'Kiểm soát chặt chẽ tỷ lệ rủi ro trên từng giao dịch',
      'Giữ mức drawdown tối đa dưới 5%',
      'Tự động điều chỉnh kích thước vị thế dựa trên biến động thị trường',
      'Báo cáo phân tích rủi ro chi tiết'
    ],
    requirements: [
      'Vốn tối thiểu $700',
      'Tài khoản Coinstrat Pro đã xác minh',
      'Phù hợp cho giai đoạn Verification hoặc Funded'
    ]
  },
  {
    id: 'ptb-003',
    name: 'Consistent Trader',
    description: 'Bot tập trung vào tính nhất quán trong giao dịch, điều kiện cần thiết để vượt qua các vòng thử thách Prop Trading.',
    exchange: 'Coinstrat Pro',
    type: 'prop',
    performanceLastMonth: '+9.7%',
    performanceAllTime: '+42.3%',
    risk: 'medium',
    status: 'active',
    minCapital: '$600',
    subscribers: 83,
    imageUrl: null,
    colorScheme: 'purple',
    features: [
      'Tính nhất quán cao trong mọi điều kiện thị trường',
      'Tỷ lệ win/loss ổn định trên 65%',
      'Thời gian nắm giữ giao dịch tối ưu',
      'Cơ chế tự động tránh các sự kiện thị trường biến động mạnh'
    ],
    requirements: [
      'Vốn tối thiểu $600',
      'Tài khoản Coinstrat Pro đã xác minh',
      'Phù hợp với tất cả các giai đoạn Prop Trading'
    ]
  }
];

const PropTradingBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [unreadErrorCount, setUnreadErrorCount] = useState(3);
  
  const bot = propTradingBots.find(b => b.id === botId);
  
  if (!bot) {
    return (
      <MainLayout title="Bot Not Found">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Bot không tồn tại
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Bot trading bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button onClick={() => navigate('/premium-bots')}>
            Quay lại danh sách Bot
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const getColorByRisk = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400';
      case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };
  
  const riskLabel = {
    'low': 'Thấp',
    'medium': 'Trung bình',
    'high': 'Cao'
  }[bot.risk];
  
  const riskColor = getColorByRisk(bot.risk);
  
  const colorSchemeClasses = {
    blue: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      icon: 'text-blue-500 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800/30'
    },
    green: {
      badge: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/10',
      icon: 'text-green-500 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800/30'
    },
    purple: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/10',
      icon: 'text-purple-500 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800/30'
    },
    red: {
      badge: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/10',
      icon: 'text-red-500 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800/30'
    },
    default: {
      badge: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400',
      bg: 'bg-slate-50 dark:bg-slate-900/10',
      icon: 'text-slate-500 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-800/30'
    }
  };
  
  const colors = colorSchemeClasses[bot.colorScheme as keyof typeof colorSchemeClasses] || colorSchemeClasses.default;
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Mark errors as read when viewing the error section
  useEffect(() => {
    // In a real app, this would be an API call to mark errors as read
    const markErrorsAsRead = () => {
      const errorSection = document.getElementById('error-signals');
      if (errorSection && errorSection.getBoundingClientRect().top <= window.innerHeight) {
        setUnreadErrorCount(0);
      }
    };

    window.addEventListener('scroll', markErrorsAsRead);
    
    // Check on initial load too
    markErrorsAsRead();
    
    return () => {
      window.removeEventListener('scroll', markErrorsAsRead);
    };
  }, []);
  
  return (
    <MainLayout title={bot.name}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/premium-bots')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {bot.name}
          </h1>
        </div>
        
        {/* Main content area with grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <Avatar className={`h-14 w-14 ${colors.bg} ${colors.border} border-2`}>
                      <AvatarFallback className={colors.icon}>
                        <Bot className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{bot.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {bot.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className={riskColor}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Rủi ro: {riskLabel}
                  </Badge>
                  <Badge variant="outline" className={colors.badge}>
                    <DollarSign className="h-3 w-3 mr-1" />
                    Vốn tối thiểu: {bot.minCapital}
                  </Badge>
                  <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400">
                    <Users className="h-3 w-3 mr-1" />
                    {bot.subscribers} người đăng ký
                  </Badge>
                </div>
                
                <Tabs 
                  defaultValue="overview" 
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                    <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
                    <TabsTrigger value="tb365-logs">TB365 Logs</TabsTrigger>
                    <TabsTrigger value="coinstrat-logs">Coinstrat Logs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="pt-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Tính năng
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            {bot.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center">
                            <CircleAlert className="h-4 w-4 mr-2 text-amber-500" />
                            Yêu cầu
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                            {bot.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
                          Hiệu suất
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Hiệu suất tháng trước</div>
                            <div className="text-2xl font-bold mt-1 flex items-center">
                              {bot.performanceLastMonth}
                              <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                            </div>
                          </div>
                          
                          <div className={`p-4 rounded-md ${colors.bg} ${colors.border} border`}>
                            <div className="text-sm text-slate-600 dark:text-slate-400">Hiệu suất từ đầu</div>
                            <div className="text-2xl font-bold mt-1 flex items-center">
                              {bot.performanceAllTime}
                              <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="accounts" className="pt-4">
                    <BotAccountsTable botId={botId || ''} />
                    <div className="text-center py-8">
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        Bạn chưa tích hợp bot này với tài khoản nào
                      </p>
                      <Button onClick={() => setIsSubscribeDialogOpen(true)}>
                        Tích hợp với tài khoản
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tb365-logs" className="pt-4">
                    <TradingViewLogs botId={botId || ''} />
                  </TabsContent>
                  
                  <TabsContent value="coinstrat-logs" className="pt-4">
                    <CoinstratLogs botId={botId || ''} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Đăng ký Bot</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={() => setIsSubscribeDialogOpen(true)}
                >
                  Tích hợp với tài khoản
                </Button>
                
                <div className="text-sm text-slate-500 dark:text-slate-400 space-y-2">
                  <p>Khi tích hợp bot này, bạn sẽ nhận được:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Tín hiệu giao dịch tự động 24/7</li>
                    <li>Quản lý rủi ro theo tiêu chuẩn Prop Trading</li>
                    <li>Báo cáo hiệu suất chi tiết</li>
                    <li>Hỗ trợ kỹ thuật ưu tiên</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Thông tin Bot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Sàn giao dịch
                  </div>
                  <div className="mt-1">{bot.exchange}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Loại bot
                  </div>
                  <div className="mt-1">Prop Trading</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Trạng thái
                  </div>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    {bot.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    ID Bot
                  </div>
                  <code className="mt-1 block bg-slate-50 dark:bg-slate-800 p-1.5 rounded text-xs">
                    {bot.id}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Error Signals Section - Now full width outside of the grid */}
        <div id="error-signals" className="w-full">
          {unreadErrorCount > 0 && (
            <div className="flex items-center gap-2 mb-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/30 p-3 rounded-md">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-400 font-medium">
                Có {unreadErrorCount} tín hiệu lỗi mới cần khắc phục
              </span>
            </div>
          )}
          
          <Card className="border-red-200 dark:border-red-800/30 bg-red-50/20 dark:bg-red-900/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Tín Hiệu Lỗi Cần Khắc Phục
              </CardTitle>
              <CardDescription className="text-red-600/80 dark:text-red-400/80">
                Các tín hiệu lỗi cần được xử lý để đảm bảo hệ thống hoạt động chính xác
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorSignals botId={botId || ''} />
            </CardContent>
          </Card>
        </div>
      </motion.div>
      
      <SubscribePremiumBotDialog 
        botId={botId || ''}
        botName={bot.name}
        open={isSubscribeDialogOpen}
        onOpenChange={setIsSubscribeDialogOpen}
        onSubscribe={(data) => console.log('Subscribe data:', data)}
      />
    </MainLayout>
  );
};

export default PropTradingBotDetail;

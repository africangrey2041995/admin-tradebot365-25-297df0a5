
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bot, CheckCircle2, CircleAlert, Users, DollarSign, BarChart2, TrendingUp, AlertTriangle, BriefcaseIcon } from 'lucide-react';
import SubscribePremiumBotDialog from '@/components/premium/SubscribePremiumBotDialog';
import { mockPropBots } from '@/mocks/propBotsMock';
import { BotStatus, BotRiskLevel } from '@/constants/botTypes';
import PropTradingBotTabs from '@/components/bots/details/prop/PropTradingBotTabs';

// Update user ID format to use the standardized 'USR-001' format with dash
const CURRENT_USER_ID = 'USR-001';

const propTradingBots = mockPropBots.map(bot => ({
  ...bot,
  id: bot.botId,
  features: [
    'Tối ưu hóa để vượt qua các bài kiểm tra Prop Trading',
    'Quản lý rủi ro tự động theo yêu cầu của Prop Firm',
    'Báo cáo hiệu suất chi tiết theo các tiêu chí đánh giá Prop Trading',
    'Chiến lược giao dịch nhất quán với tỷ lệ win cao'
  ],
  requirements: [
    `Vốn tối thiểu ${bot.minCapital}`,
    'Tài khoản Coinstrat Pro đã xác minh',
    'Phù hợp với giai đoạn Challenger hoặc Verification'
  ],
  subscribers: bot.users,
  colorScheme: bot.botId === 'PROP-001' ? 'blue' : 
               bot.botId === 'PROP-002' ? 'green' : 
               bot.botId === 'PROP-003' ? 'purple' : 
               bot.botId === 'PROP-004' ? 'red' : 'default'
}));

const PropTradingBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshLoading, setRefreshLoading] = useState(false);
  
  const bot = propTradingBots.find(b => b.botId === botId || b.id === botId);
  
  // Mock challenge data
  const challengeData = {
    phase: "Challenge Phase 1",
    progress: 68,
    accountBalance: "$10,000",
    profitTarget: "$1,000 (10%)",
    maxDrawdown: "5%",
    daysRemaining: "14 days",
    description: "Tiến độ hoàn thành để chuyển sang giai đoạn tiếp theo"
  };

  // Mock stats data
  const botStats = {
    totalTrades: 56,
    winRate: "64%",
    profitFactor: 1.8,
    sharpeRatio: 1.6,
    currentDrawdown: "2.3%"
  };

  // Mock bot info
  const botInfo = {
    createdDate: "2023-09-15",
    lastUpdated: "2023-11-22",
    botId: bot?.botId || "PROP001"
  };

  // Challenge rules
  const challengeRules = [
    "Minimum 10 trading days required",
    "Maximum daily drawdown: 4%",
    "Maximum total drawdown: 8%",
    "Profit target: 10% to advance to next phase",
    "No weekend trading allowed",
    "No holding positions overnight",
    "Maximum position size: 2% of account"
  ];

  const handleRefresh = () => {
    setRefreshLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setRefreshLoading(false);
    }, 1000);
  };
  
  // Prepare the overview content
  const overviewContent = (
    <PropBotOverviewTab 
      challengeData={challengeData}
      botStats={botStats}
      botInfo={botInfo}
      challengeRules={challengeRules}
    />
  );
  
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
  
  const getColorByRisk = (risk: BotRiskLevel) => {
    switch (risk) {
      case BotRiskLevel.LOW: return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case BotRiskLevel.MEDIUM: return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400';
      case BotRiskLevel.HIGH: return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };
  
  const riskLabel = {
    [BotRiskLevel.LOW]: 'Thấp',
    [BotRiskLevel.MEDIUM]: 'Trung bình',
    [BotRiskLevel.HIGH]: 'Cao'
  }[bot.risk as BotRiskLevel];
  
  const riskColor = getColorByRisk(bot.risk as BotRiskLevel);
  
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-6">
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
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={riskColor}>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Rủi ro: {riskLabel}
                    </Badge>
                    <Badge variant="outline" className={colors.badge}>
                      <DollarSign className="h-3 w-3 mr-1" />
                      Vốn tối thiểu: {bot.minCapital}
                    </Badge>
                    <Button 
                      className="ml-4" 
                      onClick={() => setIsSubscribeDialogOpen(true)}
                    >
                      Tích hợp với tài khoản
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Use our new PropTradingBotTabs component */}
                <PropTradingBotTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  userId={CURRENT_USER_ID}
                  botId={botId || ""}
                  refreshLoading={refreshLoading}
                  accounts={[]} // Will be fetched inside the component
                  logs={[]} // Will be fetched inside the component
                  overviewContent={overviewContent}
                  refreshTabData={handleRefresh}
                />
              </CardContent>
            </Card>
          </div>
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

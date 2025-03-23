
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot, BarChart, AlertTriangle, DollarSign, Users, Clock, Target, Info } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { USER_ROUTES } from '@/constants/routes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import NotFoundOrUnauthorized from '@/components/bots/details/NotFoundOrUnauthorized';
import LoadingBotDetail from '@/components/bots/details/LoadingBotDetail';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { useBotAuthorization } from '@/hooks/useBotAuthorization';
import { useChartData } from '@/hooks/useChartData';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useIntegratedBot } from '@/hooks/useIntegratedBot';

// Update user ID format to use the standardized 'USR-001' format with dash
const CURRENT_USER_ID = 'USR-001'; 

const IntegratedPropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  
  // Use the hooks to manage logic
  const { isLoading, isAuthorized, bot } = useBotAuthorization({ 
    botId, 
    userId: CURRENT_USER_ID 
  });
  
  const { selectedPeriod, setSelectedPeriod, chartData } = useChartData();
  const { tradePerformanceData, statisticsData } = useBotStatistics();
  
  // Use specific hook for integrated bot management
  const { 
    activeTab, 
    setActiveTab, 
    refreshLoading, 
    mockAccounts, 
    mockLogs, 
    refreshTabData 
  } = useIntegratedBot("overview");

  const goBack = () => {
    navigate(USER_ROUTES.INTEGRATED_PREMIUM_BOTS);
  };

  if (isLoading) {
    return <LoadingBotDetail />;
  }

  if (!isAuthorized || !bot) {
    return (
      <NotFoundOrUnauthorized 
        backPath={USER_ROUTES.INTEGRATED_PREMIUM_BOTS}
        onBack={goBack}
      />
    );
  }

  // Mock challenge data (would come from API in a real implementation)
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
    botId: "PROP001"
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

  return (
    <MainLayout title={`Chi Tiết Prop Trading Bot: ${bot.name}`}>
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
            onClick={() => navigate(USER_ROUTES.INTEGRATED_PREMIUM_BOTS)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <span className="hover:underline cursor-pointer" onClick={() => navigate(USER_ROUTES.INTEGRATED_PREMIUM_BOTS)}>
              Prop Trading Bot
            </span>
            <span className="mx-2">›</span>
            <span className="hover:underline cursor-pointer">
              Coinstrat Pro
            </span>
            <span className="mx-2">›</span>
            <span className="text-slate-800 dark:text-white">
              {challengeData.phase}
            </span>
          </div>
        </div>
        
        {/* Challenge Progress Card */}
        <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-xl font-bold text-blue-800 dark:text-blue-400">
                Tiến Độ Challenge
              </CardTitle>
            </div>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              {challengeData.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                  <span>Tiến Độ</span>
                  <span>{challengeData.progress}%</span>
                </div>
                <Progress value={challengeData.progress} className="h-2 bg-blue-200 dark:bg-blue-800/50" indicatorClassName="bg-green-500" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    <Users className="h-3 w-3" /> Số Dư Tài Khoản
                  </div>
                  <div className="text-xl font-bold text-blue-900 dark:text-white">
                    {challengeData.accountBalance}
                  </div>
                </div>
                <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    <Target className="h-3 w-3" /> Mục Tiêu Lợi Nhuận
                  </div>
                  <div className="text-xl font-bold text-blue-900 dark:text-white">
                    {challengeData.profitTarget}
                  </div>
                </div>
                <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Rút Vốn Tối Đa
                  </div>
                  <div className="text-xl font-bold text-blue-900 dark:text-white">
                    {challengeData.maxDrawdown}
                  </div>
                </div>
                <div className="bg-white dark:bg-blue-950/30 rounded-lg p-3 border border-blue-100 dark:border-blue-800/20">
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Thời Gian Còn Lại
                  </div>
                  <div className="text-xl font-bold text-blue-900 dark:text-white">
                    {challengeData.daysRemaining}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 p-0 h-auto rounded-none">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6"
            >
              Tổng Quan
            </TabsTrigger>
            <TabsTrigger 
              value="accounts" 
              className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6"
            >
              Tài Khoản
            </TabsTrigger>
            <TabsTrigger 
              value="logs" 
              className="data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent py-3 px-6"
            >
              Coinstrat Pro Logs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="lg:col-span-2">
                <Card className="h-full border-gray-200 dark:border-gray-800">
                  <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-blue-500" />
                        Biểu Đồ Hiệu Suất
                      </CardTitle>
                      <select 
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-sm"
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                      >
                        <option value="day">1 Ngày</option>
                        <option value="week">1 Tuần</option>
                        <option value="month">1 Tháng</option>
                      </select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900/20 rounded border border-dashed border-gray-200 dark:border-gray-700">
                      <div className="text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                        <BarChart className="h-8 w-8 mb-2 opacity-50" />
                        <p>Biểu đồ hiệu suất</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column */}
              <div className="space-y-6">
                {/* Bot stats */}
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
                    <CardTitle className="text-lg font-medium">Thống Kê Bot</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Số Giao Dịch</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{botStats.totalTrades}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Tỷ Lệ Thắng</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{botStats.winRate}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Hệ Số Lợi Nhuận</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{botStats.profitFactor}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Tỷ Lệ Sharpe</span>
                        <span className="font-semibold text-blue-600 dark:text-blue-400">{botStats.sharpeRatio}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Drawdown Hiện Tại</span>
                        <span className="font-semibold text-red-600 dark:text-red-400">{botStats.currentDrawdown}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Warning */}
                <Card className="border-amber-200 dark:border-amber-800/30 bg-amber-50 dark:bg-amber-950/10">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-400 mb-1">Cảnh Báo</h4>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                          Việc không tuân thủ các quy tắc challenge có thể dẫn đến việc thất bại trong chương trình Prop Trading.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Bot Info */}
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
                    <CardTitle className="text-lg font-medium">Thông Tin Bot</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Ngày Tạo</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{botInfo.createdDate}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Cập Nhật Lần Cuối</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{botInfo.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between items-center p-4">
                        <span className="text-gray-600 dark:text-gray-300">Mã Bot</span>
                        <span className="font-mono text-sm bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded">{botInfo.botId}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Challenge Rules */}
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Quy Tắc Challenge
                </CardTitle>
                <CardDescription>
                  Các quy tắc bắt buộc để vượt qua thử thách Prop Trading
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {challengeRules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accounts" className="mt-6">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
                <CardTitle className="text-lg font-medium">Tài Khoản Kết Nối</CardTitle>
                <CardDescription>
                  Quản lý các tài khoản được kết nối với Prop Trading Bot
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <BotAccountsTable 
                  botId={botId || ""} 
                  userId={CURRENT_USER_ID} 
                  initialData={mockAccounts}
                  botType="prop"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="logs" className="mt-6">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 pb-3">
                <CardTitle className="text-lg font-medium">Coinstrat Pro Logs</CardTitle>
                <CardDescription>
                  Xem lịch sử các tín hiệu đã được xử lý bởi Prop Trading Bot
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <CoinstratLogs 
                  botId={botId || ""} 
                  userId={CURRENT_USER_ID}
                  initialData={mockLogs}
                  signalSourceLabel="TB365 ID"
                  botType="prop"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;

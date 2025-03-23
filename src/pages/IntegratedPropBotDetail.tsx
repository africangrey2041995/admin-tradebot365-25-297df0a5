
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bot, BarChart, AlertTriangle, DollarSign, Users } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { USER_ROUTES } from '@/constants/routes';
import BotDetailTabs from '@/components/bots/details/BotDetailTabs';
import NotFoundOrUnauthorized from '@/components/bots/details/NotFoundOrUnauthorized';
import LoadingBotDetail from '@/components/bots/details/LoadingBotDetail';
import PerformanceOverview from '@/components/bots/details/PerformanceOverview';
import TradeDetails from '@/components/bots/details/TradeDetails';
import BotInformation from '@/components/bots/details/BotInformation';
import PerformanceStats from '@/components/bots/details/PerformanceStats';
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
  } = useIntegratedBot();

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

  // Define color scheme for prop bots (blue theme)
  const colors = {
    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    icon: 'text-blue-500 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800/30'
  };

  // Get proper risk label and color
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
      case 'low': return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400';
      case 'high': return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const riskLabel = getRiskLabel(bot.risk);
  const riskColor = getRiskColor(bot.risk);

  // Create content for the Overview tab
  const overviewContent = (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className={`pb-3 ${colors.bg} ${colors.border} border-b`}>
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
                    Bot đặc biệt thiết kế để vượt qua các bài kiểm tra của Coinstrat Pro Prop Trading với tỷ lệ thành công cao.
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className={riskColor}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Rủi ro: {riskLabel}
              </Badge>
              <Badge variant="outline" className={colors.badge}>
                <DollarSign className="h-3 w-3 mr-1" />
                Vốn tối thiểu: {bot.minCapital || "$500"}
              </Badge>
              <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400">
                <Users className="h-3 w-3 mr-1" />
                {bot.botId || bot.id}
              </Badge>
            </div>
            
            <div className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-blue-200 dark:border-blue-800/30">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
                    <CardTitle className="text-base">Tính năng</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Tối ưu hóa để vượt qua các bài kiểm tra Prop Trading</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Quản lý rủi ro tự động theo yêu cầu của Coinstrat Pro</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Báo cáo hiệu suất chi tiết theo các tiêu chí đánh giá Prop Trading</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>Chiến lược giao dịch nhất quán với tỷ lệ win cao</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-amber-200 dark:border-amber-800/30">
                  <CardHeader className="bg-amber-50 dark:bg-amber-900/10 pb-3">
                    <CardTitle className="text-base">Yêu cầu</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Vốn tối thiểu $500</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Tài khoản Coinstrat Pro đã xác minh</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Phù hợp với giai đoạn Challenger hoặc Verification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 border-blue-200 dark:border-blue-800/30">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
                  <CardTitle className="text-base flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                    Hiệu suất
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 dark:bg-blue-900/5 rounded-lg p-4">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Hiệu suất tháng trước</div>
                      <div className="text-2xl font-semibold text-green-600 dark:text-green-400 flex items-center">
                        +11.2% <span className="text-green-500 ml-1">↗</span>
                      </div>
                    </div>
                    <div className="bg-blue-50/50 dark:bg-blue-900/5 rounded-lg p-4">
                      <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Hiệu suất từ đầu</div>
                      <div className="text-2xl font-semibold text-green-600 dark:text-green-400 flex items-center">
                        +45.8% <span className="text-green-500 ml-1">↗</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <PerformanceOverview 
              period={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              chartData={chartData}
              isLoading={refreshLoading}
              onRefresh={refreshTabData}
            />

            <TradeDetails 
              tradeData={tradePerformanceData}
              statData={statisticsData}
              isLoading={refreshLoading}
              onRefresh={refreshTabData}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-blue-200 dark:border-blue-800/30">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
            <CardTitle className="text-base">Đăng ký Bot</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Tích hợp với tài khoản
            </Button>
            
            <div className="mt-4 space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Khi tích hợp bot này, bạn sẽ nhận được:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Tín hiệu giao dịch tự động 24/7</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Quản lý rủi ro theo tiêu chuẩn Prop Trading</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Báo cáo hiệu suất chi tiết</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Hỗ trợ kỹ thuật ưu tiên</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 dark:border-blue-800/30">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/10 pb-3">
            <CardTitle className="text-base">Thông tin Bot</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Sàn giao dịch</span>
              <span className="font-medium">Coinstrat Pro</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Loại bot</span>
              <span className="font-medium">Prop Trading</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">Trạng thái</span>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium">Đang hoạt động</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600 dark:text-slate-400">ID Bot</span>
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {bot.botId || bot.id}
              </code>
            </div>
          </CardContent>
        </Card>

        <BotInformation 
          botType={bot.type}
          exchange={bot.exchange || 'Coinstrat Pro'}
          minCapital={bot.minCapital || "$500"}
          integrationDate={bot.createdDate}
        />

        <PerformanceStats 
          lastMonthPerformance={bot.performanceLastMonth}
          allTimePerformance={bot.performanceAllTime}
        />
      </div>
    </div>
  );

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
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {bot.name}
          </h1>
        </div>
        
        <BotDetailTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userId={CURRENT_USER_ID}
          botId={botId || ""}
          onRefresh={refreshTabData}
          isLoading={refreshLoading}
          overviewContent={overviewContent}
          accountsData={mockAccounts}
          logsData={mockLogs}
          // Change "TB365 ID" label for the source column in logs
          signalSourceLabel="TB365 ID"
          botType="prop" // Set botType to "prop" to get proper styling
        />
      </motion.div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;

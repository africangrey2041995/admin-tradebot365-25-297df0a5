
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
                    Bot đã tích hợp cho tài khoản Prop Trading của bạn
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
        
        <Card className={`${colors.border} border`}>
          <CardHeader className={`${colors.bg} border-b ${colors.border}`}>
            <CardTitle className="text-base flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-blue-500" />
              Thông tin Bot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Sàn giao dịch
              </div>
              <div className="mt-1">{bot.exchange || 'Coinstrat Pro'}</div>
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
                Đang hoạt động
              </div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                ID Bot
              </div>
              <code className="mt-1 block bg-slate-50 dark:bg-slate-800 p-1.5 rounded text-xs">
                {bot.botId || bot.id}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <MainLayout title={`Bot tích hợp: ${bot.name}`}>
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
          // Use "TB365 ID" label for the source column in logs
          signalSourceLabel="TB365 ID"
          botType="prop" // Set botType to "prop" to get proper styling
        />
      </motion.div>
    </MainLayout>
  );
};

export default IntegratedPropBotDetail;

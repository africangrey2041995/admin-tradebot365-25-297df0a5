
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ADMIN_ROUTES } from '@/constants/routes';
import LoadingState from '@/components/admin/prop-bots/detail/LoadingState';
import PremiumBotStatsCards from '@/components/admin/premium-bots/detail/PremiumBotStatsCards';
import PremiumBotDetailHeader from '@/components/admin/premium-bots/detail/PremiumBotDetailHeader';
import PremiumBotOverviewTab from '@/components/admin/premium-bots/detail/tabs/PremiumBotOverviewTab';
import AccountsTab from '@/components/admin/premium-bots/detail/tabs/AccountsTab';
import SignalTrackingTab from '@/components/admin/premium-bots/detail/tabs/SignalTrackingTab';
import { usePremiumBotDetail } from '@/hooks/usePremiumBotDetail';
import BotIntegrationInfo from '@/pages/admin/components/BotIntegrationInfo';
import { Webhook } from 'lucide-react';
import { BotRiskLevel } from '@/constants/botTypes';
import { toast } from 'sonner';

const PremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  
  // Define goBackToList function - the issue was this function wasn't available in the scope where it was being used
  const goBackToList = () => {
    navigate(ADMIN_ROUTES.PREMIUM_BOTS);
  };
  
  // Use our custom hook to manage all the data and logic
  const {
    isLoading,
    activeTab,
    setActiveTab,
    bot,
    accounts,
    uniqueUsers,
    tradingAccountsCount,
    processedSignalsCount,
    statisticsData,
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
    refreshAccounts,
    handleEditAccount,
    handleDeleteAccount,
    handleToggleConnection,
    handleUpdateDescription,
    handleUpdateTradingPairs,
    handleUpdateFeatures,
    handleUpdateStatistics,
    handleUpdateBotInfo,
    refreshSignalLogs
  } = usePremiumBotDetail(botId, 'admin');

  // Handle risk level update
  const handleUpdateRisk = (newRisk: BotRiskLevel) => {
    // In a real app, you would call an API to update the risk level
    if (bot) {
      handleUpdateBotInfo({ risk: newRisk });
      toast.success(`Đã cập nhật mức độ rủi ro thành: ${newRisk}`);
    }
  };
  
  // Handle name update
  const handleUpdateName = (newName: string) => {
    if (bot) {
      // In a real app, you would call an API to update the name
      toast.success(`Đã cập nhật tên bot thành: ${newName}`);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!bot) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-2xl font-bold">Bot Not Found</h1>
        <p className="text-gray-500 mt-2">The premium bot you're looking for doesn't exist.</p>
        <Button onClick={goBackToList} className="mt-4">Back to Premium Bots</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Bot Detail Header */}
      <PremiumBotDetailHeader
        name={bot.name}
        status={bot.status}
        risk={bot.risk}
        id={bot.botId}
        onUpdateRisk={handleUpdateRisk}
        onUpdateName={handleUpdateName}
      />

      {/* Stats Cards */}
      <PremiumBotStatsCards 
        registeredUsers={uniqueUsers}
        tradingAccounts={tradingAccountsCount}
        processedSignals={processedSignalsCount}
      />

      {/* Bot Detail Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="accounts">Tài Khoản Kết Nối</TabsTrigger>
          <TabsTrigger value="signal-tracking">Signal Tracking</TabsTrigger>
          <TabsTrigger value="integration">
            <Webhook className="h-4 w-4 mr-1" />
            Tích Hợp TradingView
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <PremiumBotOverviewTab
            bot={{
              id: bot.botId || '', 
              longDescription: bot.description || '',
              pairs: bot.pairs || [],
              features: bot.features || [],
              type: bot.type,
              exchange: bot.exchange || '',
              minCapital: bot.minCapital || '',
              subscribers: bot.subscribers || 0,
              createdAt: bot.createdDate || '',
              updatedAt: bot.lastUpdated || ''
            }}
            statisticsData={statisticsData}
            onUpdateDescription={handleUpdateDescription}
            onUpdateTradingPairs={handleUpdateTradingPairs}
            onUpdateFeatures={handleUpdateFeatures}
            onUpdateStatistics={handleUpdateStatistics}
            onUpdateBotInfo={handleUpdateBotInfo}
          />
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts">
          <AccountsTab
            accounts={accounts}
            botId={botId}
            onRefresh={refreshAccounts}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            onToggleConnection={handleToggleConnection}
          />
        </TabsContent>

        {/* Signal Tracking Tab */}
        <TabsContent value="signal-tracking">
          <SignalTrackingTab
            botId={botId}
            tradingViewLogs={tradingViewLogs}
            coinstratLogs={coinstratLogs}
            isLoading={logsLoading}
            availableUsers={availableUsers}
            onRefresh={refreshSignalLogs}
          />
        </TabsContent>
        
        {/* TradingView Integration Tab */}
        <TabsContent value="integration">
          <Card>
            <CardContent className="p-6">
              <BotIntegrationInfo botId={botId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PremiumBotDetail;

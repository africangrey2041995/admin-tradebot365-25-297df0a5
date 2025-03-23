import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import { BotType } from '@/constants/botTypes';
import { Star, Target, User, Crown, BarChart, Settings } from 'lucide-react';
import EmptyAccountsState from '@/components/bots/accounts/EmptyAccountsState';
import LoadingAccounts from '@/components/bots/accounts/LoadingAccounts';
import ErrorState from '@/components/bots/accounts/ErrorState';

interface BotDetailTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  userId: string;
  botId: string;
  onRefresh: () => void;
  isLoading: boolean;
  overviewContent: React.ReactNode;
  accountsData?: Account[];
  logsData?: CoinstratSignal[];
  signalSourceLabel?: string;
  botType: 'premium' | 'prop' | 'user'; // Required prop for bot type
}

const BotDetailTabs: React.FC<BotDetailTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  overviewContent,
  accountsData,
  logsData,
  signalSourceLabel = "TradingView ID",
  botType = 'user', // Default to 'user' for backward compatibility
}) => {
  const getTabLabels = () => {
    switch (botType) {
      case 'premium':
        return {
          overview: "Tổng quan",
          accounts: "Tài khoản kết nối",
          logs: "Premium Bot Logs",
          accountsDescription: "Quản lý các tài khoản được kết nối với Premium Bot",
          logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Premium Bot"
        };
      case 'prop':
        return {
          overview: "Tổng quan",
          accounts: "Tài khoản kết nối",
          logs: "Prop Trading Logs",
          accountsDescription: "Quản lý các tài khoản được kết nối với Prop Trading Bot",
          logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Prop Trading Bot"
        };
      case 'user':
      default:
        return {
          overview: "Tổng quan",
          accounts: "Tài khoản kết nối",
          logs: "Coinstrat Pro Logs",
          accountsDescription: "Quản lý các tài khoản được kết nối với bot này",
          logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Coinstrat Pro"
        };
    }
  };

  const tabLabels = getTabLabels();
  
  const getBotIcon = () => {
    switch (botType) {
      case 'premium':
        return <Crown className="h-4 w-4 mr-2 text-yellow-500" />;
      case 'prop':
        return <BarChart className="h-4 w-4 mr-2 text-blue-500" />;
      case 'user':
      default:
        return <User className="h-4 w-4 mr-2 text-gray-500" />;
    }
  };

  const getTabIcon = (tab: string) => {
    if (tab === 'overview') {
      switch (botType) {
        case 'premium':
          return <Star className="h-4 w-4 mr-1 text-yellow-500" />;
        case 'prop':
          return <Target className="h-4 w-4 mr-1 text-blue-500" />;
        case 'user':
        default:
          return <Settings className="h-4 w-4 mr-1 text-gray-500" />;
      }
    }
    return null;
  };
  
  const getContainerClassName = () => {
    switch (botType) {
      case 'premium':
        return "space-y-4 premium-bot-container"; 
      case 'prop':
        return "space-y-4 prop-bot-container";
      case 'user':
      default:
        return "space-y-4";
    }
  };

  const getCardHeaderClassName = () => {
    switch (botType) {
      case 'premium':
        return "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800/30";
      case 'prop':
        return "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-b border-blue-200 dark:border-blue-800/30";
      case 'user':
      default:
        return "";
    }
  };

  const getCardClassName = () => {
    switch (botType) {
      case 'premium':
        return "border-yellow-200 dark:border-yellow-800/30";
      case 'prop':
        return "border-blue-200 dark:border-blue-800/30";
      case 'user':
      default:
        return "";
    }
  };

  const getTabsListClassName = () => {
    switch (botType) {
      case 'premium':
        return "bg-yellow-100/50 dark:bg-yellow-900/20";
      case 'prop':
        return "bg-blue-100/50 dark:bg-blue-900/20";
      case 'user':
      default:
        return "";
    }
  };

  const getTabTriggerClassName = () => {
    switch (botType) {
      case 'premium':
        return "data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-900 dark:data-[state=active]:bg-yellow-900/30 dark:data-[state=active]:text-yellow-100";
      case 'prop':
        return "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900/30 dark:data-[state=active]:text-blue-100";
      case 'user':
      default:
        return "";
    }
  };

  const getEmptyStateComponent = () => {
    return <EmptyAccountsState botType={botType} />;
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={getContainerClassName()}>
      <TabsList className={`grid w-full grid-cols-3 ${getTabsListClassName()}`}>
        <TabsTrigger value="overview" className={getTabTriggerClassName()}>
          {getTabIcon('overview')}
          {tabLabels.overview}
        </TabsTrigger>
        <TabsTrigger value="connected-accounts" className={getTabTriggerClassName()}>
          {tabLabels.accounts}
        </TabsTrigger>
        <TabsTrigger value="coinstrat-logs" className={getTabTriggerClassName()}>
          {tabLabels.logs}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <Card className={getCardClassName()}>
          <CardHeader className={getCardHeaderClassName()}>
            <CardTitle className="flex items-center">
              {getBotIcon()}
              {tabLabels.accounts}
            </CardTitle>
            <CardDescription>{tabLabels.accountsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <LoadingAccounts message={`Đang tải tài khoản cho ${botType === 'premium' ? 'Premium Bot' : botType === 'prop' ? 'Prop Trading Bot' : 'bot'}...`} />
            ) : !accountsData || accountsData.length === 0 ? (
              getEmptyStateComponent()
            ) : (
              <BotAccountsTable 
                botId={botId} 
                userId={userId} 
                initialData={accountsData}
                botType={botType}
              />
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <Card className={getCardClassName()}>
          <CardHeader className={getCardHeaderClassName()}>
            <CardTitle className="flex items-center">
              {getBotIcon()}
              {tabLabels.logs}
            </CardTitle>
            <CardDescription>{tabLabels.logsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <CoinstratLogs 
              botId={botId} 
              userId={userId}
              initialData={logsData}
              signalSourceLabel={signalSourceLabel}
              botType={botType}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BotDetailTabs;

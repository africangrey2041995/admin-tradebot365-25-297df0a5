
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import PropBotOverviewTab from '@/components/bots/details/prop/PropBotOverviewTab';
import SignalTrackingTab from '@/components/bots/signal-tracking/SignalTrackingTab';

interface PropBotDetailTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  userId: string;
  botId: string;
  onRefresh: () => void;
  isLoading: boolean;
  challengeData: {
    phase: string;
    progress: number;
    accountBalance: string;
    profitTarget: string;
    maxDrawdown: string;
    daysRemaining: string;
    description: string;
  };
  botStats: {
    totalTrades: number;
    winRate: string;
    profitFactor: number;
    sharpeRatio: number;
    currentDrawdown: string;
  };
  botInfo: {
    createdDate: string;
    lastUpdated: string;
    botId: string;
  };
  challengeRules: string[];
}

const PropBotDetailTabs: React.FC<PropBotDetailTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  challengeData,
  botStats,
  botInfo,
  challengeRules
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="connected-accounts">Tài khoản kết nối</TabsTrigger>
        <TabsTrigger value="coinstrat-logs">Prop Trading Logs</TabsTrigger>
        <TabsTrigger value="signal-tracking">Signal Tracking</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <PropBotOverviewTab 
          challengeData={challengeData}
          botStats={botStats}
          botInfo={botInfo}
          challengeRules={challengeRules}
        />
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <Card>
          <CardHeader>
            <CardTitle>Tài khoản kết nối</CardTitle>
            <CardDescription>Quản lý các tài khoản được kết nối với Prop Trading Bot</CardDescription>
          </CardHeader>
          <CardContent>
            <BotAccountsTable 
              botId={botId} 
              userId={userId}
              botType="prop"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <Card>
          <CardHeader>
            <CardTitle>Prop Trading Logs</CardTitle>
            <CardDescription>Xem lịch sử các tín hiệu đã được xử lý bởi Prop Trading Bot</CardDescription>
          </CardHeader>
          <CardContent>
            <CoinstratLogs 
              botId={botId} 
              userId={userId}
              signalSourceLabel="TB365 ID"
              botType="prop"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="signal-tracking">
        <Card>
          <CardHeader>
            <CardTitle>Signal Tracking</CardTitle>
            <CardDescription>Theo dõi tín hiệu giao dịch và cách chúng được xử lý trên các tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <SignalTrackingTab 
              botId={botId} 
              userId={userId}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PropBotDetailTabs;

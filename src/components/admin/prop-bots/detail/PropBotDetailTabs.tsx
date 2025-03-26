
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import SignalTrackingTab from '@/components/bots/signal-tracking/SignalTrackingTab';
import AdminPropBotOverviewTab from './AdminPropBotOverviewTab';
import { BotType, BotStatus } from '@/constants/botTypes';

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
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="connected-accounts">Tài khoản kết nối</TabsTrigger>
        <TabsTrigger value="signal-tracking">Signal Tracking</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <AdminPropBotOverviewTab 
          propBot={{
            botId: botId,
            type: BotType.PROP_BOT,
            name: '',
            description: '',
            status: BotStatus.ACTIVE,
            createdDate: botInfo.createdDate,
            lastUpdated: botInfo.lastUpdated,
            performanceLastMonth: '',
            performanceAllTime: '',
            minCapital: '',
            users: 0,
            profit: '',
            propFirm: 'Coinstrat Pro'
          }}
          botStats={botStats}
          botInfo={botInfo}
          challengeRules={{ "Coinstrat Pro": challengeRules }}
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
      
      <TabsContent value="signal-tracking">
        <Card>
          <CardHeader>
            <CardTitle>Signal Tracking</CardTitle>
            <CardDescription>Theo dõi các tín hiệu giao dịch và trạng thái xử lý</CardDescription>
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

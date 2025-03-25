
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, BarChart, Cog, List, Users } from 'lucide-react';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import PropBotOverviewTab from './PropBotOverviewTab';
import PropBotUsersTab from './PropBotUsersTab';
import PropBotSettingsTab from './PropBotSettingsTab';
import { BotRiskLevel, BotStatus } from '@/constants/botTypes';
import { PropBot } from '@/types/bot';

interface PropBotEnhancedTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  userId: string;
  botId: string;
  onRefresh: () => void;
  isLoading: boolean;
  propBot: PropBot;
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
  onUpdateBot?: (updatedData: Partial<PropBot>) => void;
}

const PropBotEnhancedTabs: React.FC<PropBotEnhancedTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  propBot,
  challengeData,
  botStats,
  botInfo,
  challengeRules,
  onUpdateBot = () => {}
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">
          <BarChart className="h-4 w-4 mr-2" />
          Tổng quan
        </TabsTrigger>
        <TabsTrigger value="connected-accounts">
          <List className="h-4 w-4 mr-2" />
          Tài khoản kết nối
        </TabsTrigger>
        <TabsTrigger value="coinstrat-logs">
          <Activity className="h-4 w-4 mr-2" />
          Prop Trading Logs
        </TabsTrigger>
        <TabsTrigger value="users">
          <Users className="h-4 w-4 mr-2" />
          Người dùng
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Cog className="h-4 w-4 mr-2" />
          Cài đặt
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <PropBotOverviewTab 
          propBot={propBot}
          challengeData={challengeData}
          botStats={botStats}
          botInfo={botInfo}
          challengeRules={challengeRules}
          onUpdateBot={onUpdateBot}
        />
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <Card>
          <CardContent className="p-6">
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
          <CardContent className="p-6">
            <CoinstratLogs 
              botId={botId} 
              userId={userId}
              signalSourceLabel="TB365 ID"
              botType="prop"
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="users">
        <PropBotUsersTab botId={botId} />
      </TabsContent>
      
      <TabsContent value="settings">
        <PropBotSettingsTab 
          botId={botId} 
          initialData={{
            name: propBot.name,
            description: propBot.description || '',
            exchange: propBot.exchange,
            propFirm: propBot.propFirm,
            risk: propBot.risk || BotRiskLevel.MEDIUM,
            status: propBot.status || BotStatus.ACTIVE,
            isPromoted: false,
            isArchived: false,
            adminNotes: ''
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PropBotEnhancedTabs;

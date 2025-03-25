
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BotRiskLevel, BotStatus } from '@/constants/botTypes';
import { PropBot } from '@/types/bot';
import { Account } from '@/types';
import AdminPropBotOverviewTab from './AdminPropBotOverviewTab';
import PropBotUsersTab from './PropBotUsersTab';
import PropBotSettingsTab from './PropBotSettingsTab';
import AdminPropBotLogs from './logs/AdminPropBotLogs';
import PropBotTabList from './tabs/PropBotTabList';
import ConnectedAccountsTab from './tabs/ConnectedAccountsTab';

interface PropBotEnhancedTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  userId: string;
  botId: string;
  onRefresh: () => void;
  isLoading: boolean;
  propBot: PropBot;
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
  challengeRules: Record<string, string[]>;
  onUpdateBot?: (updatedData: Partial<PropBot>) => void;
  onUpdateChallengeRules?: (propFirm: string, rules: string[]) => void;
  connectedAccounts?: Account[];
}

const PropBotEnhancedTabs: React.FC<PropBotEnhancedTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  propBot,
  botStats,
  botInfo,
  challengeRules,
  onUpdateBot = () => {},
  onUpdateChallengeRules = () => {},
  connectedAccounts = []
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <PropBotTabList />
      
      <TabsContent value="overview" className="space-y-4">
        <AdminPropBotOverviewTab 
          propBot={propBot}
          botStats={botStats}
          botInfo={botInfo}
          challengeRules={challengeRules}
          onUpdateBot={onUpdateBot}
          onUpdateChallengeRules={onUpdateChallengeRules}
        />
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <ConnectedAccountsTab 
          connectedAccounts={connectedAccounts}
          onRefresh={onRefresh}
          botId={botId}
        />
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <AdminPropBotLogs botId={botId} userId={userId} />
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

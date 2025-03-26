
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import AccountsTabContent from './tabs/AccountsTabContent';
import LogsTabContent from './tabs/LogsTabContent';
import { getTabLabels } from './tabs/TabLabels';
import { 
  getTabsListClassName, 
  getTabTriggerClassName, 
  getContainerClassName,
  getTabIcon
} from './tabs/TabStyles';

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
  botType: 'premium' | 'prop' | 'user';
  isAdminView?: boolean; // New prop for admin view
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
  botType = 'user',
  isAdminView = false // Default to false
}) => {
  const tabLabels = getTabLabels(botType);
  
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={getContainerClassName(botType)}>
      <TabsList className={`grid w-full grid-cols-3 ${getTabsListClassName(botType)}`}>
        <TabsTrigger value="overview" className={getTabTriggerClassName(botType)}>
          {getTabIcon('overview', botType)}
          {tabLabels.overview}
        </TabsTrigger>
        <TabsTrigger value="connected-accounts" className={getTabTriggerClassName(botType)}>
          {tabLabels.accounts}
        </TabsTrigger>
        <TabsTrigger value="coinstrat-logs" className={getTabTriggerClassName(botType)}>
          {tabLabels.logs}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <AccountsTabContent 
          botId={botId}
          userId={userId}
          botType={botType}
          accountsData={accountsData}
          isLoading={isLoading}
          title={tabLabels.accounts}
          description={tabLabels.accountsDescription}
          isAdminView={isAdminView}
        />
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <LogsTabContent
          botId={botId}
          userId={userId}
          botType={botType}
          logsData={logsData}
          signalSourceLabel={signalSourceLabel}
          title={tabLabels.logs}
          description={tabLabels.logsDescription}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BotDetailTabs;

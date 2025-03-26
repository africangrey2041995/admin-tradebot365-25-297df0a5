
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogsTabContent from '../tabs/LogsTabContent';
import AccountsTabContent from '../tabs/AccountsTabContent';
import UserAccountsTabContent from '../../accounts/UserAccountsTabContent';
import { getTabsListClassName, getTabTriggerClassName, getTabIcon } from '../tabs/TabStyles';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import SignalTrackingTab from '@/components/bots/signal-tracking/SignalTrackingTab';

interface PremiumBotTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  userId: string;
  botId: string;
  onRefresh: () => void;
  isLoading: boolean;
  overviewContent: React.ReactNode;
  accountsData?: Account[];
  logsData?: CoinstratSignal[];
  logsLoading?: boolean;
  signalSourceLabel?: string;
}

const PremiumBotTabs: React.FC<PremiumBotTabsProps> = ({
  activeTab,
  onTabChange,
  userId,
  botId,
  onRefresh,
  isLoading,
  overviewContent,
  accountsData,
  logsData,
  logsLoading = false,
  signalSourceLabel = "TB365 ID"
}) => {
  return <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className={`grid w-full grid-cols-3 ${getTabsListClassName('premium')}`}>
        <TabsTrigger value="overview" className={getTabTriggerClassName('premium')}>
          {getTabIcon('overview', 'premium')}
          Tổng quan
        </TabsTrigger>
        <TabsTrigger value="connected-accounts" className={getTabTriggerClassName('premium')}>
          Tài khoản kết nối
        </TabsTrigger>
        <TabsTrigger value="signal-tracking" className={getTabTriggerClassName('premium')}>Signal Tracking</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <UserAccountsTabContent 
          botId={botId} 
          userId={userId} 
          botType="premium" 
          title="Tài khoản kết nối" 
          description="Quản lý các tài khoản được kết nối với Premium Bot" 
          accountsData={accountsData} 
          isLoading={isLoading}
        />
      </TabsContent>
      
      <TabsContent value="signal-tracking">
        <SignalTrackingTab 
          botId={botId} 
          userId={userId} 
        />
      </TabsContent>
    </Tabs>;
};

export default PremiumBotTabs;

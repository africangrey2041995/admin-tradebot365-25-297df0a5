
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogsTabContent from '../tabs/LogsTabContent';
import AccountsTabContent from '../tabs/AccountsTabContent';
import { getTabsListClassName, getTabTriggerClassName, getTabIcon } from '../tabs/TabStyles';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';

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
  signalSourceLabel = "TB365 ID"
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className={`grid w-full grid-cols-3 ${getTabsListClassName('premium')}`}>
        <TabsTrigger value="overview" className={getTabTriggerClassName('premium')}>
          {getTabIcon('overview', 'premium')}
          Tổng quan
        </TabsTrigger>
        <TabsTrigger value="connected-accounts" className={getTabTriggerClassName('premium')}>
          Tài khoản kết nối
        </TabsTrigger>
        <TabsTrigger value="coinstrat-logs" className={getTabTriggerClassName('premium')}>
          Premium Logs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <AccountsTabContent
          botId={botId}
          userId={userId}
          botType="premium"
          title="Tài khoản kết nối"
          description="Quản lý các tài khoản được kết nối với Premium Bot"
          accountsData={accountsData}
        />
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <LogsTabContent
          botId={botId}
          userId={userId}
          botType="premium"
          logsData={logsData}
          signalSourceLabel={signalSourceLabel}
          title="Premium Trading Logs"
          description="Xem lịch sử các tín hiệu đã được xử lý bởi Premium Bot"
        />
      </TabsContent>
    </Tabs>
  );
};

export default PremiumBotTabs;

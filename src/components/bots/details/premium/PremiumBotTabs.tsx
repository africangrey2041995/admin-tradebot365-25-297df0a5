
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountsTabContent from "../tabs/AccountsTabContent";
import LogsTabContent from "../tabs/LogsTabContent";
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import TabHeader from '../tabs/TabHeader';

interface PremiumBotTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  userId: string;
  botId: string;
  onRefresh: () => void;
  isLoading: boolean;
  overviewContent: React.ReactNode;
  accountsData: Account[];
  logsData: CoinstratSignal[];
  logsLoading?: boolean;
  signalSourceLabel?: string;
  accountsActions?: React.ReactNode;
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
  signalSourceLabel = "TradingView ID",
  accountsActions
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="accounts">Tài khoản kết nối</TabsTrigger>
        <TabsTrigger value="signals">Signal Tracking</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        {overviewContent}
      </TabsContent>

      <TabsContent value="accounts">
        <TabHeader 
          title="Tài khoản kết nối"
          onRefresh={onRefresh}
          isLoading={isLoading}
          actions={accountsActions}
        />
        <AccountsTabContent 
          accounts={accountsData}
          botId={botId}
          userId={userId}
          botType="premium"
        />
      </TabsContent>

      <TabsContent value="signals">
        <LogsTabContent 
          logs={logsData}
          isLoading={logsLoading}
          onRefresh={onRefresh}
          title="Signal Tracking"
          signalSourceLabel={signalSourceLabel}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PremiumBotTabs;

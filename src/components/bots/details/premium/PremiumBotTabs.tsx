
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogsTabContent from '../tabs/LogsTabContent';
import AccountsTabContent from '../tabs/AccountsTabContent';
import { getTabsListClassName, getTabTriggerClassName, getTabIcon } from '../tabs/TabStyles';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';

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
        <div className="card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tài khoản kết nối</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Quản lý các tài khoản được kết nối với Premium Bot
            </p>
            
            {accountsData && accountsData.length > 0 ? (
              <HierarchicalAccountsTable 
                accounts={accountsData}
                onRefresh={onRefresh}
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                Không có tài khoản nào được kết nối với bot này
              </div>
            )}
          </div>
        </div>
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


import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import TabContentWrapper from './tabs/TabContentWrapper';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import { useQueryClient } from '@tanstack/react-query';
import { accountsQueryKeys } from '@/hooks/accounts/useAccountsQuery';
import { useTradingViewLogs } from './trading-view-logs/useTradingViewLogs';
import { useCoinstratLogs } from './coinstrat-logs/useCoinstratLogs';
import AccountsTabContent from './details/tabs/AccountsTabContent';

interface UserBotDetailTabsProps {
  userId: string;
  botId: string;
  accountsData?: Account[];
  logsData?: CoinstratSignal[];
  onRefresh?: () => void;
  isLoading?: boolean;
  signalSourceLabel?: string;
  botType?: 'premium' | 'prop' | 'user';
  isAdminView?: boolean; // New prop to determine if this is admin view
}

const UserBotDetailTabs: React.FC<UserBotDetailTabsProps> = ({
  userId,
  botId,
  accountsData,
  logsData,
  onRefresh,
  isLoading = false,
  signalSourceLabel = "TradingView ID",
  botType = 'user',
  isAdminView = false // Default to false
}) => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const queryClient = useQueryClient();

  // Centralized loading state
  const [refreshLoading, setRefreshLoading] = useState(isLoading);

  // Update loading state based on parent isLoading
  useEffect(() => {
    setRefreshLoading(isLoading);
  }, [isLoading]);

  // Centralized logs state using hooks with skipLoadingState=true
  const { 
    logs: tradingViewLogs, 
    fetchLogs: fetchTvLogs 
  } = useTradingViewLogs({
    botId,
    userId,
    refreshTrigger: refreshTrigger > 0,
    skipLoadingState: true
  });

  const {
    logs: coinstratLogs,
    fetchLogs: fetchCsLogs
  } = useCoinstratLogs({
    botId,
    userId,
    initialData: logsData,
    refreshTrigger: refreshTrigger > 0,
    skipLoadingState: true
  });

  console.log(`UserBotDetailTabs - userId: ${userId}, botId: ${botId}, isLoading: ${isLoading}, refreshLoading: ${refreshLoading}, isAdminView: ${isAdminView}`);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // When there's an onRefresh handler provided, call it when changing tabs
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleRefresh = () => {
    console.log("UserBotDetailTabs - handleRefresh called");
    // Set loading state to true
    setRefreshLoading(true);
    setRefreshTrigger(prev => prev + 1);
    
    // Invalidate React Query cache for this bot's accounts
    queryClient.invalidateQueries({ queryKey: accountsQueryKeys.byBot(botId) });
    
    if (onRefresh) {
      onRefresh();
    }

    // Set a timeout to reset loading state after a consistent delay
    setTimeout(() => {
      setRefreshLoading(false);
    }, 800);
  };

  return (
    <TabContentWrapper 
      title="Quản lý Bot"
      description="Thông tin về tài khoản, tín hiệu và lịch sử xử lý"
      onRefresh={handleRefresh}
      refreshLoading={refreshLoading}
    >
      <Tabs defaultValue="accounts" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="accounts">Tài khoản kết nối</TabsTrigger>
          <TabsTrigger value="tradingview-logs">TradingView Logs</TabsTrigger>
          <TabsTrigger value="coinstrat-logs">Coinstrat Pro Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="accounts" className="animate-in fade-in-50 duration-200">
          {isAdminView ? (
            <AccountsTabContent 
              botId={botId}
              userId={userId}
              botType={botType}
              title="Tài khoản kết nối"
              description="Danh sách tài khoản được kết nối với bot này"
              accountsData={accountsData}
              isLoading={refreshLoading}
              isAdminView={true}
            />
          ) : (
            <BotAccountsTable 
              botId={botId} 
              userId={userId} 
              initialData={accountsData} 
              refreshTrigger={refreshTrigger > 0}
            />
          )}
        </TabsContent>
        
        <TabsContent value="tradingview-logs" className="animate-in fade-in-50 duration-200">
          <TradingViewLogs 
            botId={botId} 
            userId={userId}
            refreshTrigger={refreshTrigger > 0}
            botType={botType}
            isLoading={refreshLoading} // Pass the consolidated loading state
          />
        </TabsContent>
        
        <TabsContent value="coinstrat-logs" className="animate-in fade-in-50 duration-200">
          <CoinstratLogs 
            botId={botId} 
            userId={userId} 
            initialData={logsData}
            signalSourceLabel={signalSourceLabel}
            refreshTrigger={refreshTrigger > 0}
            botType={botType}
            isLoading={refreshLoading} // Pass the consolidated loading state
          />
        </TabsContent>
      </Tabs>
    </TabContentWrapper>
  );
};

export default UserBotDetailTabs;

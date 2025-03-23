
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';

interface UserBotDetailTabsProps {
  userId: string;
  botId: string;
  accountsData?: Account[];
  logsData?: CoinstratSignal[];
  onRefresh?: () => void;
  isLoading?: boolean;
  signalSourceLabel?: string;
}

const UserBotDetailTabs: React.FC<UserBotDetailTabsProps> = ({
  userId,
  botId,
  accountsData,
  logsData,
  onRefresh,
  isLoading = false,
  signalSourceLabel = "TradingView ID",
}) => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [refreshLoading, setRefreshLoading] = useState(false);

  useEffect(() => {
    // Sync refreshLoading with parent isLoading
    setRefreshLoading(isLoading);
    
    // Safety timeout to ensure refreshLoading is eventually reset
    if (isLoading) {
      const timer = setTimeout(() => {
        setRefreshLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  console.log(`UserBotDetailTabs - userId: ${userId}, botId: ${botId}, isLoading: ${isLoading}, refreshLoading: ${refreshLoading}`);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // When there's an onRefresh handler provided, call it when changing tabs
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleRefresh = () => {
    console.log("UserBotDetailTabs - handleRefresh called, setting refreshLoading to true");
    setRefreshLoading(true);
    if (onRefresh) {
      onRefresh();
    }
    // In case the parent doesn't reset the loading state
    setTimeout(() => {
      console.log("UserBotDetailTabs - Resetting refreshLoading to false after timeout");
      setRefreshLoading(false);
    }, 1500);
  };

  return (
    <Card className="border border-border bg-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Quản lý Bot</CardTitle>
          <CardDescription>
            Thông tin về tài khoản, tín hiệu và lịch sử xử lý
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={refreshLoading}
          onClick={handleRefresh}
        >
          {refreshLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Làm mới
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accounts" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="accounts">Tài khoản kết nối</TabsTrigger>
            <TabsTrigger value="tradingview-logs">TradingView Logs</TabsTrigger>
            <TabsTrigger value="coinstrat-logs">Coinstrat Pro Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts">
            <BotAccountsTable 
              botId={botId} 
              userId={userId} 
              initialData={accountsData} 
              refreshTrigger={refreshLoading}
            />
          </TabsContent>
          
          <TabsContent value="tradingview-logs">
            <TradingViewLogs 
              botId={botId} 
              userId={userId}
              refreshTrigger={refreshLoading}
            />
          </TabsContent>
          
          <TabsContent value="coinstrat-logs">
            <CoinstratLogs 
              botId={botId} 
              userId={userId} 
              initialData={logsData}
              signalSourceLabel={signalSourceLabel}
              refreshTrigger={refreshLoading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserBotDetailTabs;

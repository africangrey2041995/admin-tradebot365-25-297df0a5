
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import { BotType } from '@/constants/botTypes';

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
  botType: 'premium' | 'prop' | 'user'; // New required prop for bot type
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
  botType = 'user', // Default to 'user' for backward compatibility
}) => {
  // Conditional tab labels and descriptions based on botType
  const getTabLabels = () => {
    switch (botType) {
      case 'premium':
        return {
          overview: "Tổng quan",
          accounts: "Tài khoản kết nối",
          logs: "Premium Bot Logs",
          accountsDescription: "Quản lý các tài khoản được kết nối với Premium Bot",
          logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Premium Bot"
        };
      case 'prop':
        return {
          overview: "Tổng quan",
          accounts: "Tài khoản kết nối",
          logs: "Prop Trading Logs",
          accountsDescription: "Quản lý các tài khoản được kết nối với Prop Trading Bot",
          logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Prop Trading Bot"
        };
      case 'user':
      default:
        return {
          overview: "Tổng quan",
          accounts: "Tài khoản kết nối",
          logs: "Coinstrat Pro Logs",
          accountsDescription: "Quản lý các tài khoản được kết nối với bot này",
          logsDescription: "Xem lịch sử các tín hiệu đã được xử lý bởi Coinstrat Pro"
        };
    }
  };

  // Get the appropriate labels based on botType
  const tabLabels = getTabLabels();
  
  // Optional: subtle background color or class variations based on bot type
  const getContainerClassName = () => {
    switch (botType) {
      case 'premium':
        return "space-y-4"; // Same as default for now
      case 'prop':
        return "space-y-4"; // Same as default for now
      case 'user':
      default:
        return "space-y-4";
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={getContainerClassName()}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">{tabLabels.overview}</TabsTrigger>
        <TabsTrigger value="connected-accounts">{tabLabels.accounts}</TabsTrigger>
        <TabsTrigger value="coinstrat-logs">{tabLabels.logs}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        {overviewContent}
      </TabsContent>
      
      <TabsContent value="connected-accounts">
        <Card>
          <CardHeader>
            <CardTitle>Tài khoản kết nối</CardTitle>
            <CardDescription>{tabLabels.accountsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <BotAccountsTable 
              botId={botId} 
              userId={userId} 
              initialData={accountsData} 
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <Card>
          <CardHeader>
            <CardTitle>{tabLabels.logs}</CardTitle>
            <CardDescription>{tabLabels.logsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <CoinstratLogs 
              botId={botId} 
              userId={userId}
              initialData={logsData}
              signalSourceLabel={signalSourceLabel}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BotDetailTabs;

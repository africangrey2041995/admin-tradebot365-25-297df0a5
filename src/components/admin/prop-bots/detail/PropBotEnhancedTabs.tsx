
import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, BarChart2, Cog, List, Users } from 'lucide-react';
import { toast } from "sonner";
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import AdminPropBotOverviewTab from './AdminPropBotOverviewTab';
import PropBotUsersTab from './PropBotUsersTab';
import PropBotSettingsTab from './PropBotSettingsTab';
import { BotRiskLevel, BotStatus } from '@/constants/botTypes';
import { PropBot } from '@/types/bot';
import { Account } from '@/types';
import LogsFilterBar from './LogsFilterBar';
import ExportDataDropdown from './ExportDataDropdown';
import HierarchicalAccountsTable from './components/HierarchicalAccountsTable';
import { CoinstratSignal } from '@/types/signal';
import { useCoinstratLogs } from '@/components/bots/coinstrat-logs/useCoinstratLogs';

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
  // Centralized state for logs
  const [logsFilters, setLogsFilters] = useState({ search: '', status: 'all', time: 'all' });
  const [refreshLogsCounter, setRefreshLogsCounter] = useState(0);

  // Use the hook to fetch all logs with skipLoadingState=true to use parent's loading state
  const { logs: allLogs, fetchLogs } = useCoinstratLogs({
    botId,
    userId,
    refreshTrigger: refreshLogsCounter > 0,
    skipLoadingState: true // Skip internal loading state management
  });

  // Use a consolidated loading state that reflects the parent component's loading state
  const [logsLoading, setLogsLoading] = useState(isLoading);

  // Update logsLoading when parent isLoading changes
  useEffect(() => {
    setLogsLoading(isLoading);
  }, [isLoading]);

  // Memoized filtered logs to prevent unnecessary recalculations
  const filteredLogs = useMemo(() => {
    // Start with all logs
    let filtered = [...allLogs];
    
    // Apply search filter
    if (logsFilters.search) {
      const searchLower = logsFilters.search.toLowerCase();
      filtered = filtered.filter(log => 
        (log.originalSignalId?.toString().toLowerCase().includes(searchLower)) ||
        (log.instrument?.toLowerCase().includes(searchLower)) ||
        (log.action?.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply status filter
    if (logsFilters.status !== 'all') {
      filtered = filtered.filter(log => log.status?.toLowerCase() === logsFilters.status.toLowerCase());
    }
    
    // Apply time filter
    if (logsFilters.time !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (logsFilters.time) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'yesterday':
          startDate.setDate(now.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= startDate;
      });
    }
    
    return filtered;
  }, [allLogs, logsFilters]);

  // Central state for accounts data
  const [accountsExportData, setAccountsExportData] = useState<(string | number)[][]>([]);
  
  // Memoized logs export data
  const logsExportData = useMemo(() => {
    return filteredLogs.map(log => [
      log.originalSignalId || '',
      log.instrument || '',
      new Date(log.timestamp).toLocaleString(),
      log.action || '',
      log.status || '',
      log.errorMessage || ''
    ]);
  }, [filteredLogs]);

  useEffect(() => {
    if (connectedAccounts && connectedAccounts.length > 0) {
      const exportData = connectedAccounts.map(account => [
        account.cspAccountName || '',
        account.cspUserEmail || '',
        account.apiName || '',
        account.tradingAccountType || '',
        account.status || '',
        account.tradingAccountBalance || ''
      ]);
      setAccountsExportData(exportData);
    }
  }, [connectedAccounts]);

  const handleLogsFilterChange = (filters: any) => {
    console.log("Applied filters:", filters);
    setLogsFilters(filters);
  };

  const handleSignalSelect = (signal: CoinstratSignal) => {
    console.log("Selected signal:", signal.id);
  };

  const handleRefreshLogs = () => {
    // Set loading state to true before refreshing
    setLogsLoading(true);
    setRefreshLogsCounter(prev => prev + 1);
    fetchLogs();
    
    // Set a timeout to ensure loading state is shown for at least 500ms
    setTimeout(() => {
      setLogsLoading(false);
    }, 500);
  };

  const accountsExportHeaders = [
    'Tên tài khoản',
    'Email',
    'API',
    'Loại tài khoản',
    'Trạng thái',
    'Số dư'
  ];

  const logsExportHeaders = [
    'ID',
    'Symbol',
    'Thời gian',
    'Hành động',
    'Trạng thái',
    'Ghi chú'
  ];

  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    toast.info(`Editing account: ${account.cspAccountName}`);
  };

  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    toast.info(`Deleting account: ${accountId}`);
  };

  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    toast.info(`Toggling connection for account: ${accountId}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">
          <BarChart2 className="h-4 w-4 mr-2" />
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
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-end mb-4">
              <ExportDataDropdown 
                data={accountsExportData}
                headers={accountsExportHeaders}
                fileName={`prop-bot-${botId}-accounts`}
              />
            </div>
            {connectedAccounts && connectedAccounts.length > 0 ? (
              <HierarchicalAccountsTable 
                accounts={connectedAccounts}
                onRefresh={onRefresh}
                onEdit={handleEditAccount}
                onDelete={handleDeleteAccount}
                onToggleConnection={handleToggleConnection}
              />
            ) : (
              <div className="text-center py-10 text-gray-500">
                No connected accounts found for this bot.
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="coinstrat-logs">
        <Card>
          <CardContent className="p-6">
            <LogsFilterBar 
              onFilterChange={handleLogsFilterChange}
              showExport={true}
              exportComponent={
                <ExportDataDropdown 
                  data={logsExportData}
                  headers={logsExportHeaders}
                  fileName={`prop-bot-${botId}-logs`}
                />
              }
            />
            <CoinstratLogs 
              botId={botId} 
              userId={userId}
              signalSourceLabel="TB365 ID"
              botType="prop"
              showFilters={false}
              filteredLogs={filteredLogs}
              onSignalSelect={handleSignalSelect}
              onRefreshRequest={handleRefreshLogs}
              refreshTrigger={refreshLogsCounter > 0}
              isLoading={logsLoading} // Pass the consolidated loading state
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


import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, BarChart2, Cog, List, Users } from 'lucide-react';
import { toast } from "sonner"; // Import toast from sonner
import AdminPropBotOverviewTab from './AdminPropBotOverviewTab';
import PropBotUsersTab from './PropBotUsersTab';
import PropBotSettingsTab from './PropBotSettingsTab';
import { BotRiskLevel, BotStatus } from '@/constants/botTypes';
import { PropBot } from '@/types/bot';
import { Account } from '@/types';
import LogsFilterBar from './LogsFilterBar';
import ExportDataDropdown from './ExportDataDropdown';
import HierarchicalAccountsTable from './components/HierarchicalAccountsTable';
import AdminPropBotLogs from './logs/AdminPropBotLogs';

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
  const [logsFilters, setLogsFilters] = useState({ search: '', status: 'all', time: 'all' });
  const [filteredLogs, setFilteredLogs] = useState<any[]>([]);
  const [accountsExportData, setAccountsExportData] = useState<(string | number)[][]>([]);
  const [logsExportData, setLogsExportData] = useState<(string | number)[][]>([]);

  // Handler for logs filter changes
  const handleLogsFilterChange = (filters: any) => {
    console.log("Applied filters:", filters);
    setLogsFilters(filters);
    // The actual filtering will be done in the CoinstratLogs component
  };

  // Prepare export data for accounts
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

  // Prepare export data for logs
  // Note: In a real implementation, this would be populated from actual log data
  useEffect(() => {
    // Mock data for logs export
    const mockLogsExport = [
      ['LOG-001', 'BTC/USDT', '2023-11-01 14:30:22', 'BUY', 'Completed', 'Entry at $35,400'],
      ['LOG-002', 'ETH/USDT', '2023-11-02 09:15:45', 'SELL', 'Completed', 'Exit at $1,890'],
      ['LOG-003', 'BNB/USDT', '2023-11-03 11:22:33', 'BUY', 'Failed', 'Insufficient balance'],
    ];
    setLogsExportData(mockLogsExport);
  }, []);

  // Define headers for export
  const accountsExportHeaders = ['Tên tài khoản', 'Email', 'API', 'Loại tài khoản', 'Trạng thái', 'Số dư'];
  const logsExportHeaders = ['ID', 'Symbol', 'Thời gian', 'Hành động', 'Trạng thái', 'Ghi chú'];

  // Handler for account actions
  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    // In a real implementation, this would open an edit dialog
    // For now, just show a toast
    toast.info(`Editing account: ${account.cspAccountName}`);
  };

  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    // In a real implementation, this would show a confirmation dialog
    // For now, just show a toast
    toast.info(`Deleting account: ${accountId}`);
  };

  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    // In a real implementation, this would make an API call
    // For now, just show a toast
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

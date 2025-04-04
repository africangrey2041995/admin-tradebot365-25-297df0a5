
import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, List, NetworkIcon, Webhook } from 'lucide-react';
import { toast } from "sonner";
import AdminPropBotOverviewTab from './AdminPropBotOverviewTab';
import { PropBot } from '@/types/bot';
import { Account } from '@/types';
import LogsFilterBar from './LogsFilterBar';
import ExportDataDropdown from './ExportDataDropdown';
import HierarchicalAccountsTable from './components/HierarchicalAccountsTable';
import { CoinstratSignal } from '@/types/signal';
import { useCoinstratLogs } from '@/components/bots/coinstrat-logs/useCoinstratLogs';
import UnifiedSignalLogsTab from './UnifiedSignalLogsTab';
import BotIntegrationInfo from '@/pages/admin/components/BotIntegrationInfo';
import { TradingAccount } from './types/account-types'; 
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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
  const [refreshLogsCounter, setRefreshLogsCounter] = useState(0);
  
  // State cho quản lý tài khoản hàng loạt
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<'delete' | 'disconnect' | null>(null);

  const { logs: allLogs, fetchLogs } = useCoinstratLogs({
    botId,
    userId,
    refreshTrigger: refreshLogsCounter > 0,
    skipLoadingState: true
  });

  const [logsLoading, setLogsLoading] = useState(isLoading);

  useEffect(() => {
    setLogsLoading(isLoading);
  }, [isLoading]);

  // Xử lý chọn/bỏ chọn tài khoản
  const handleToggleSelect = (accountId: string) => {
    setSelectedAccounts(prev => {
      if (prev.includes(accountId)) {
        return prev.filter(id => id !== accountId);
      } else {
        return [...prev, accountId];
      }
    });
  };

  // Xử lý xóa tài khoản hàng loạt
  const handleBulkDelete = () => {
    setDialogAction('delete');
    setConfirmDialogOpen(true);
  };

  // Xử lý ngắt kết nối tài khoản hàng loạt
  const handleBulkDisconnect = () => {
    setDialogAction('disconnect');
    setConfirmDialogOpen(true);
  };

  // Xử lý xác nhận hành động hàng loạt
  const handleConfirmAction = () => {
    if (dialogAction === 'delete') {
      // Thực hiện xóa tài khoản
      toast.success(`Đã xóa ${selectedAccounts.length} tài khoản`);
      // Thực tế cần gọi API xóa tài khoản ở đây
    } else if (dialogAction === 'disconnect') {
      // Thực hiện ngắt kết nối tài khoản
      toast.success(`Đã ngắt kết nối ${selectedAccounts.length} tài khoản`);
      // Thực tế cần gọi API ngắt kết nối tài khoản ở đây
    }
    
    // Reset state sau khi hoàn tất
    setSelectedAccounts([]);
    setConfirmDialogOpen(false);
    setDialogAction(null);
  };

  const filteredLogs = useMemo(() => {
    let filtered = [...allLogs];
    
    if (logsFilters.search) {
      const searchLower = logsFilters.search.toLowerCase();
      filtered = filtered.filter(log => 
        (log.originalSignalId?.toString().toLowerCase().includes(searchLower)) ||
        (log.instrument?.toLowerCase().includes(searchLower)) ||
        (log.action?.toLowerCase().includes(searchLower))
      );
    }
    
    if (logsFilters.status !== 'all') {
      filtered = filtered.filter(log => log.status?.toLowerCase() === logsFilters.status.toLowerCase());
    }
    
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

  const [accountsExportData, setAccountsExportData] = useState<(string | number)[][]>([]);
  
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
    setLogsLoading(true);
    setRefreshLogsCounter(prev => prev + 1);
    fetchLogs();
    
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
    <>
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BarChart2 className="h-4 w-4 mr-2" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="connected-accounts">
            <List className="h-4 w-4 mr-2" />
            Tài khoản kết nối
          </TabsTrigger>
          <TabsTrigger value="signal-tracking">
            <NetworkIcon className="h-4 w-4 mr-2" />
            Signal Tracking
          </TabsTrigger>
          <TabsTrigger value="integration">
            <Webhook className="h-4 w-4 mr-2" />
            Tích hợp TradingView
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
                  selectedAccounts={selectedAccounts}
                  onToggleSelect={handleToggleSelect}
                />
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No connected accounts found for this bot.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="signal-tracking">
          <UnifiedSignalLogsTab
            botId={botId}
            userId={userId}
          />
        </TabsContent>
        
        <TabsContent value="integration">
          <Card>
            <CardContent className="p-6">
              <BotIntegrationInfo botId={botId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog xác nhận hành động hàng loạt */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogAction === 'delete' ? 'Xác nhận xóa tài khoản' : 'Xác nhận ngắt kết nối'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dialogAction === 'delete'
                ? `Bạn có chắc chắn muốn xóa ${selectedAccounts.length} tài khoản đã chọn không?`
                : `Bạn có chắc chắn muốn ngắt kết nối ${selectedAccounts.length} tài khoản đã chọn không?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {dialogAction === 'delete' ? 'Xóa' : 'Ngắt kết nối'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PropBotEnhancedTabs;

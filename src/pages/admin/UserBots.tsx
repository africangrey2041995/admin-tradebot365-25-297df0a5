
import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { BotStatus, BotType } from '@/constants/botTypes';
import { UserBot } from '@/types/bot';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useNavigation } from '@/hooks/useNavigation';
import { UserBotStatsCards } from '@/components/admin/user-bots/UserBotStatsCards';
import { UserBotsActions } from '@/components/admin/user-bots/UserBotsActions';
import { BulkActionDialog } from '@/components/admin/user-bots/BulkActionDialog';
import { exportToCSV, exportToExcel, exportToJSON } from '@/utils/exportUtils';

interface UserBotColumn {
  accessorKey: string;
  header: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

const mockUserBots: UserBot[] = [
  {
    botId: 'MY-001',
    name: 'My First Bot',
    description: 'A simple bot for testing purposes',
    status: BotStatus.ACTIVE,
    type: BotType.USER_BOT,
    createdDate: '2023-08-15',
    lastUpdated: '2023-08-15',
    owner: 'John Doe',
    ownerId: 'user-001',
    accounts: 2,
    strategy: 'DCA',
    isActive: true
  },
  {
    botId: 'MY-002',
    name: 'BTC Trader',
    description: 'Trades BTC based on RSI',
    status: BotStatus.ACTIVE,
    type: BotType.USER_BOT,
    createdDate: '2023-09-10',
    lastUpdated: '2023-09-10',
    owner: 'Jane Smith',
    ownerId: 'user-002',
    accounts: 1,
    strategy: 'RSI',
    isActive: true
  },
  {
    botId: 'MY-003',
    name: 'ETH Grid Bot',
    description: 'Grid trading bot for ETH',
    status: BotStatus.INACTIVE,
    type: BotType.USER_BOT,
    createdDate: '2023-07-22',
    lastUpdated: '2023-08-01',
    owner: 'Robert Johnson',
    ownerId: 'user-003',
    accounts: 1,
    strategy: 'Grid',
    isActive: false
  },
  {
    botId: 'MY-004',
    name: 'Auto Trader Pro',
    description: 'Advanced auto trading bot',
    status: BotStatus.ACTIVE,
    type: BotType.USER_BOT,
    createdDate: '2023-06-30',
    lastUpdated: '2023-07-15',
    owner: 'Emma Wilson',
    ownerId: 'user-004',
    accounts: 3,
    strategy: 'AI',
    isActive: true
  },
  {
    botId: 'MY-005',
    name: 'Altcoin Hunter',
    description: 'Hunts for promising altcoins',
    status: BotStatus.ACTIVE,
    type: BotType.USER_BOT,
    createdDate: '2023-05-12',
    lastUpdated: '2023-06-20',
    owner: 'Michael Brown',
    ownerId: 'user-005',
    accounts: 2,
    strategy: 'Momentum',
    isActive: true
  }
];

const AdminUserBots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [userBots, setUserBots] = useState<UserBot[]>([]);
  const { navigateToBotDetail, navigateTo } = useNavigation();
  
  // New state variables for filtering, selection, and bulk actions
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedBotIds, setSelectedBotIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | 'delete' | null>(null);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  
  // Updated columns to display User ID and make it clickable with white text headers
  const columns: UserBotColumn[] = [
    {
      accessorKey: 'botId',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === BotStatus.ACTIVE ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      accessorKey: 'createdDate',
      header: 'Created Date',
    },
    {
      accessorKey: 'ownerId',
      header: 'User ID',
      cell: (value, row) => (
        <button 
          className="text-blue-400 hover:text-blue-500 hover:underline"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering row click
            handleUserClick(value);
          }}
        >
          {value}
        </button>
      )
    },
    {
      accessorKey: 'accounts',
      header: 'Accounts',
    },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const fetchUserBots = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      setTimeout(() => {
        try {
          // 10% chance of error for demonstration
          if (Math.random() < 0.1) {
            throw new Error("Lỗi kết nối máy chủ khi lấy dữ liệu User Bots");
          }
          setUserBots(mockUserBots);
          setIsLoading(false);
        } catch (innerError) {
          console.error('Error processing user bots data:', innerError);
          setError(innerError instanceof Error ? innerError : new Error('Unknown error processing data'));
          setIsLoading(false);
          toast.error('Đã xảy ra lỗi khi xử lý dữ liệu User Bots');
        }
      }, 1000);
    } catch (err) {
      console.error('Error fetching user bots:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setIsLoading(false);
      toast.error('Đã xảy ra lỗi khi tải dữ liệu User Bots');
    }
  }, []);
  
  // Load data when component mounts
  useEffect(() => {
    fetchUserBots();
  }, [fetchUserBots]);

  // Filter bots based on search term and filter status
  const filteredBots = userBots.filter(bot => {
    // Search filter
    const matchesSearch = 
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.botId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.ownerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    let matchesStatus = true;
    if (filterStatus === 'active') {
      matchesStatus = bot.status === BotStatus.ACTIVE;
    } else if (filterStatus === 'inactive') {
      matchesStatus = bot.status === BotStatus.INACTIVE;
    }
    
    return matchesSearch && matchesStatus;
  });

  const addUserBot = () => {
    try {
      toast.success("Chức năng thêm User Bot đang được phát triển");
    } catch (error) {
      console.error('Error in addUserBot function:', error);
      toast.error('Đã xảy ra lỗi khi thực hiện chức năng thêm User Bot');
    }
  };
  
  const handleRowClick = useCallback((row: UserBot) => {
    try {
      navigateToBotDetail(row.botId);
    } catch (error) {
      console.error('Error navigating to bot detail:', error);
      toast.error('Không thể chuyển đến trang chi tiết bot');
    }
  }, [navigateToBotDetail]);
  
  // Handle click on User ID to navigate to user details
  const handleUserClick = useCallback((userId: string) => {
    try {
      navigateTo(`/admin/users/${userId}`);
    } catch (error) {
      console.error('Error navigating to user detail:', error);
      toast.error('Không thể chuyển đến trang chi tiết người dùng');
    }
  }, [navigateTo]);
  
  const handleRefreshData = useCallback(() => {
    toast.info('Đang làm mới dữ liệu User Bots...');
    fetchUserBots();
  }, [fetchUserBots]);

  // Handle filter toggle
  const handleFilterClick = () => {
    if (filterStatus === null) {
      setFilterStatus('active');
    } else if (filterStatus === 'active') {
      setFilterStatus('inactive');
    } else {
      setFilterStatus(null);
    }
  };

  // Handle selection clearing
  const handleClearSelections = () => {
    setSelectedBotIds([]);
  };

  // Handle bulk action click
  const handleBulkActionClick = (action: 'activate' | 'deactivate' | 'delete') => {
    setBulkAction(action);
    setIsBulkDialogOpen(true);
  };

  // Handle bulk action confirmation
  const handleConfirmBulkAction = () => {
    if (!bulkAction) return;

    try {
      // In a real implementation, this would make API calls to perform the actions
      const actionMessages = {
        activate: 'kích hoạt',
        deactivate: 'tạm dừng',
        delete: 'xóa'
      };

      // Simulate action
      setTimeout(() => {
        // For demo purposes, we'll just update the local state for activate/deactivate
        if (bulkAction === 'activate' || bulkAction === 'deactivate') {
          const newStatus = bulkAction === 'activate' ? BotStatus.ACTIVE : BotStatus.INACTIVE;
          
          setUserBots(prevBots => 
            prevBots.map(bot => 
              selectedBotIds.includes(bot.botId) 
                ? { ...bot, status: newStatus } 
                : bot
            )
          );
        } else if (bulkAction === 'delete') {
          // For delete, we'll remove the bots from the list
          setUserBots(prevBots => 
            prevBots.filter(bot => !selectedBotIds.includes(bot.botId))
          );
        }

        // Clear selections after action
        setSelectedBotIds([]);
        
        // Show success message
        toast.success(`Đã ${actionMessages[bulkAction]} ${selectedBotIds.length} User Bot thành công`);
      }, 1000);

    } catch (error) {
      console.error(`Error performing bulk ${bulkAction}:`, error);
      toast.error(`Có lỗi xảy ra khi thực hiện ${bulkAction} hàng loạt`);
    }

    // Close dialog
    setIsBulkDialogOpen(false);
    setBulkAction(null);
  };

  // Export functions
  const handleExportToCSV = () => {
    try {
      const selectedBots = selectedBotIds.length > 0 
        ? userBots.filter(bot => selectedBotIds.includes(bot.botId))
        : filteredBots;
        
      const headers = ['Bot ID', 'Name', 'Status', 'Created Date', 'Owner ID', 'Accounts'];
      const data = selectedBots.map(bot => [
        bot.botId,
        bot.name,
        bot.status,
        bot.createdDate,
        bot.ownerId,
        bot.accounts.toString()
      ]);
      
      exportToCSV(headers, data, 'user-bots-export');
      toast.success('Đã xuất dữ liệu CSV thành công');
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      toast.error('Có lỗi xảy ra khi xuất dữ liệu CSV');
    }
  };
  
  const handleExportToExcel = () => {
    try {
      const selectedBots = selectedBotIds.length > 0 
        ? userBots.filter(bot => selectedBotIds.includes(bot.botId))
        : filteredBots;
        
      const headers = ['Bot ID', 'Name', 'Status', 'Created Date', 'Owner ID', 'Accounts'];
      const data = selectedBots.map(bot => [
        bot.botId,
        bot.name,
        bot.status,
        bot.createdDate,
        bot.ownerId,
        bot.accounts.toString()
      ]);
      
      exportToExcel(headers, data, 'user-bots-export', 'User Bots');
      toast.success('Đã xuất dữ liệu Excel thành công');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Có lỗi xảy ra khi xuất dữ liệu Excel');
    }
  };
  
  const handleExportToJSON = () => {
    try {
      const selectedBots = selectedBotIds.length > 0 
        ? userBots.filter(bot => selectedBotIds.includes(bot.botId))
        : filteredBots;
      
      exportToJSON(selectedBots, 'user-bots-export');
      toast.success('Đã xuất dữ liệu JSON thành công');
    } catch (error) {
      console.error('Error exporting to JSON:', error);
      toast.error('Có lỗi xảy ra khi xuất dữ liệu JSON');
    }
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/bots">Bots</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/user-bots">User Bots</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">Quản lý User Bots</h1>
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white"
            onClick={addUserBot}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm User Bot mới
          </Button>
        </div>

        <UserBotStatsCards bots={userBots} />

        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardHeader>
            <CardTitle>Danh sách User Bots</CardTitle>
            <CardDescription className="text-zinc-400">
              Quản lý tất cả User Bots trong hệ thống Trade Bot 365.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserBotsActions 
              searchTerm={searchTerm}
              filterStatus={filterStatus}
              selectedBots={selectedBotIds}
              onSearchChange={handleSearchChange}
              onFilterClick={handleFilterClick}
              clearSelections={handleClearSelections}
              exportToCSV={handleExportToCSV}
              exportToExcel={handleExportToExcel}
              exportToJSON={handleExportToJSON}
              openBulkActionDialog={handleBulkActionClick}
            />
            
            <DataTable 
              columns={columns} 
              data={filteredBots} 
              isLoading={isLoading}
              error={error}
              onRetry={handleRefreshData}
              onRowClick={handleRowClick}
              emptyMessage="Không tìm thấy User Bot nào phù hợp với tiêu chí tìm kiếm."
              selectable={true}
              selectedRows={selectedBotIds}
              onSelectedRowsChange={setSelectedBotIds}
              rowIdentifier="botId"
            />
          </CardContent>
        </Card>
        
        <BulkActionDialog 
          open={isBulkDialogOpen}
          onOpenChange={setIsBulkDialogOpen}
          selectedCount={selectedBotIds.length}
          action={bulkAction}
          onConfirm={handleConfirmBulkAction}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AdminUserBots;

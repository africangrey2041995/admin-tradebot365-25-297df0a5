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

interface UserBotColumn {
  accessorKey: string;
  header: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

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
    accessorKey: 'owner',
    header: 'Owner',
  },
  {
    accessorKey: 'accounts',
    header: 'Accounts',
  },
];

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
  const { navigateToBotDetail } = useNavigation();
  
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

  const filteredBots = userBots.filter(bot =>
    bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.botId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  
  const handleRefreshData = useCallback(() => {
    toast.info('Đang làm mới dữ liệu User Bots...');
    fetchUserBots();
  }, [fetchUserBots]);

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
            <div className="flex items-center justify-between py-2 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <UserCircle className="h-5 w-5 text-amber-500" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm User Bots..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="max-w-md"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
            </div>
            
            <DataTable 
              columns={columns} 
              data={filteredBots} 
              isLoading={isLoading}
              error={error}
              onRetry={handleRefreshData}
              onRowClick={handleRowClick}
              emptyMessage="Không tìm thấy User Bot nào phù hợp với tiêu chí tìm kiếm."
            />
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default AdminUserBots;

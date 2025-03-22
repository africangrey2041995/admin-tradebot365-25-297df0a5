
import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, RefreshCw, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { BotStatus } from '@/constants/botTypes';
import { UserBot } from '@/types/bot';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useNavigation } from '@/hooks/useNavigation';

interface UserBotColumn {
  accessorKey: string;
  header: string;
  cell?: (value: any, row: any) => React.ReactNode;
}

const columns: UserBotColumn[] = [
  {
    accessorKey: 'id',
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

const mockUserBots = [
  {
    id: 'ub-001',
    name: 'My First Bot',
    status: BotStatus.ACTIVE,
    createdDate: '2023-08-15',
    owner: 'John Doe',
    accounts: 2,
    description: 'A simple bot for testing purposes',
    strategy: 'DCA',
    isActive: true,
    ownerId: 'user-001',
  },
  {
    id: 'ub-002',
    name: 'BTC Trader',
    status: BotStatus.ACTIVE,
    createdDate: '2023-09-10',
    owner: 'Jane Smith',
    accounts: 1,
    description: 'Trades BTC based on RSI',
    strategy: 'RSI',
    isActive: true,
    ownerId: 'user-002',
  },
  {
    id: 'ub-003',
    name: 'ETH Grid Bot',
    status: BotStatus.INACTIVE,
    createdDate: '2023-07-22',
    owner: 'Robert Johnson',
    accounts: 1,
    description: 'Grid trading bot for ETH',
    strategy: 'Grid',
    isActive: false,
    ownerId: 'user-003',
  },
  {
    id: 'ub-004',
    name: 'Auto Trader Pro',
    status: BotStatus.ACTIVE,
    createdDate: '2023-06-30',
    owner: 'Emma Wilson',
    accounts: 3,
    description: 'Advanced auto trading bot',
    strategy: 'AI',
    isActive: true,
    ownerId: 'user-004',
  },
  {
    id: 'ub-005',
    name: 'Altcoin Hunter',
    status: BotStatus.ACTIVE,
    createdDate: '2023-05-12',
    owner: 'Michael Brown',
    accounts: 2,
    description: 'Hunts for promising altcoins',
    strategy: 'Momentum',
    isActive: true,
    ownerId: 'user-005',
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
    bot.id.toLowerCase().includes(searchTerm.toLowerCase())
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
      navigateToBotDetail(row.id);
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

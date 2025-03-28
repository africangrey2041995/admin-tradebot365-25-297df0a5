
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { RefreshCw, UserPlus, MoreVertical, Edit3, Link2, Link2Off, Trash2 } from "lucide-react";
import { UsersFilter } from '../UsersFilter';
import { useUserManagement } from '@/hooks/premium-bot/useUserManagement';
import { Account } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import BulkActionBar from "@/components/floating/BulkActionBar";
import StatusIndicator from "@/components/ui/StatusIndicator";
import { toast } from "sonner";

interface UserAccountsTabProps {
  userId: string;
}

export const UserAccountsTab: React.FC<UserAccountsTabProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  
  // State for selected accounts
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [bulkConfirmDialogOpen, setBulkConfirmDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'connect' | 'disconnect' | null>(null);

  // Use the existing hook to manage accounts for this user
  const { 
    accounts,
    refreshAccounts,
    handleEditAccount,
    handleDeleteAccount,
    handleToggleConnection
  } = useUserManagement('all', userId);

  const handleRefresh = () => {
    setIsLoading(true);
    refreshAccounts();
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterClick = (status: string | null) => {
    setStatusFilter(status);
  };

  const handleTypeFilterChange = (value: string | null) => {
    setTypeFilter(value);
  };

  const handleDeleteClick = (account: Account) => {
    setAccountToDelete(account);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (accountToDelete) {
      setIsDeletingAccount(true);
      try {
        await handleDeleteAccount(accountToDelete.cspAccountId);
      } finally {
        setIsDeletingAccount(false);
        setAccountToDelete(null);
        setIsDeleteDialogOpen(false);
      }
    }
  };

  const handleToggleStatusClick = async (account: Account) => {
    setIsTogglingStatus(true);
    try {
      await handleToggleConnection(account.cspAccountId);
    } finally {
      setIsTogglingStatus(false);
    }
  };

  // Account selection handlers
  const handleSelectAccount = (accountId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedAccounts(prev => [...prev, accountId]);
    } else {
      setSelectedAccounts(prev => prev.filter(id => id !== accountId));
    }
  };

  const handleSelectAllAccounts = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedAccounts(filteredAccounts.map(acc => acc.cspAccountId));
    } else {
      setSelectedAccounts([]);
    }
  };

  // Bulk actions handlers
  const handleBulkConnectClick = () => {
    setBulkAction('connect');
    setBulkConfirmDialogOpen(true);
  };

  const handleBulkDisconnectClick = () => {
    setBulkAction('disconnect');
    setBulkConfirmDialogOpen(true);
  };

  const executeBulkAction = async () => {
    if (!bulkAction || selectedAccounts.length === 0) return;
    
    setIsBulkProcessing(true);
    const actionText = bulkAction === 'connect' ? 'kết nối' : 'ngắt kết nối';
    
    try {
      // Process accounts in sequence to avoid overwhelming the API
      for (const accountId of selectedAccounts) {
        await handleToggleConnection(accountId);
        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      toast.success(`Đã ${actionText} ${selectedAccounts.length} tài khoản thành công`);
      setSelectedAccounts([]);
    } catch (error) {
      console.error(`Error performing bulk ${bulkAction}:`, error);
      toast.error(`Đã xảy ra lỗi khi ${actionText} tài khoản`);
    } finally {
      setIsBulkProcessing(false);
      setBulkConfirmDialogOpen(false);
      setBulkAction(null);
    }
  };

  const handleCloseActionBar = () => {
    setSelectedAccounts([]);
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = searchTerm === '' || 
      account.cspAccountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.cspUserEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.cspAccountId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === null || 
      (statusFilter === 'connected' && account.status.toLowerCase() === 'connected') ||
      (statusFilter === 'disconnected' && account.status.toLowerCase() === 'disconnected');
    
    const matchesType = typeFilter === null || typeFilter === 'all' ||
      (typeFilter === 'live' && account.isLive) ||
      (typeFilter === 'demo' && !account.isLive);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats
  const totalCSPAccounts = (() => {
    const uniqueCspIds = new Set(accounts.map(acc => acc.cspAccountId));
    return uniqueCspIds.size;
  })();

  const totalTradingAccounts = accounts.length;
  const allAccountsSelected = filteredAccounts.length > 0 && selectedAccounts.length === filteredAccounts.length;
  const someAccountsSelected = selectedAccounts.length > 0 && selectedAccounts.length < filteredAccounts.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Tài khoản giao dịch</h2>
          <p className="text-zinc-400">Quản lý các tài khoản CSP, API và tài khoản giao dịch của người dùng</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 border-zinc-700 gap-1"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <UserPlus className="h-3.5 w-3.5" />
            <span>Thêm tài khoản</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{totalCSPAccounts}</div>
              <div className="text-sm text-zinc-400">Tổng Tài Khoản CSP</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">{totalTradingAccounts}</div>
              <div className="text-sm text-zinc-400">Tổng Tài Khoản Giao Dịch</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <UsersFilter
        searchTerm={searchTerm}
        filterStatus={statusFilter}
        planFilter={typeFilter}
        onSearchChange={handleSearchChange}
        onFilterClick={handleStatusFilterClick}
        onPlanFilterChange={handleTypeFilterChange}
      />

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách tài khoản</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả các tài khoản giao dịch của người dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAccounts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800">
                    <TableHead className="w-[40px] text-zinc-400">
                      <Checkbox 
                        checked={allAccountsSelected}
                        ref={input => {
                          if (input) {
                            input.indeterminate = someAccountsSelected;
                          }
                        }}
                        onCheckedChange={handleSelectAllAccounts}
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </TableHead>
                    <TableHead className="text-zinc-400">Tài khoản CSP</TableHead>
                    <TableHead className="text-zinc-400">ID CSP</TableHead>
                    <TableHead className="text-zinc-400">API</TableHead>
                    <TableHead className="text-zinc-400">Tài khoản giao dịch</TableHead>
                    <TableHead className="text-zinc-400">Loại</TableHead>
                    <TableHead className="text-zinc-400">Trạng thái</TableHead>
                    <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account: Account) => (
                    <TableRow key={account.cspAccountId} className="border-zinc-800">
                      <TableCell className="w-[40px]">
                        <Checkbox 
                          checked={selectedAccounts.includes(account.cspAccountId)}
                          onCheckedChange={(checked) => handleSelectAccount(account.cspAccountId, !!checked)}
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{account.cspAccountName}</div>
                          <div className="text-xs text-zinc-400">{account.cspUserEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-xs text-zinc-300">{account.cspAccountId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{account.apiName}</div>
                        <div className="text-xs text-zinc-400">{account.apiId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{account.tradingAccountNumber}</div>
                        <div className="text-xs text-zinc-400">{account.brokerName || 'Unknown Broker'}</div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`${account.isLive ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'} hover:${account.isLive ? 'bg-amber-500/30' : 'bg-blue-500/30'}`}
                        >
                          {account.isLive ? 'Live' : 'Demo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusIndicator 
                          status={account.status.toLowerCase() === 'connected' ? 'Connected' : 'Disconnected'} 
                          showLabel={true}
                          lastConnectionTime={account.lastConnectionTime}
                          lastDisconnectionTime={account.lastDisconnectionTime}
                          errorMessage={account.errorMessage}
                          showControls={false}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                disabled={isTogglingStatus || isDeletingAccount}
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700 text-white">
                              <DropdownMenuLabel>Tùy chọn tài khoản</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-zinc-700" />
                              <DropdownMenuItem 
                                onClick={() => handleEditAccount(account)} 
                                disabled={isTogglingStatus || isDeletingAccount}
                                className="hover:bg-zinc-700 focus:bg-zinc-700"
                              >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Chỉnh sửa
                              </DropdownMenuItem>
                              
                              {account.status.toLowerCase() === 'connected' ? (
                                <DropdownMenuItem 
                                  onClick={() => handleToggleStatusClick(account)} 
                                  disabled={isTogglingStatus}
                                  className="hover:bg-zinc-700 focus:bg-zinc-700"
                                >
                                  <Link2Off className="h-4 w-4 mr-2" />
                                  {isTogglingStatus ? 'Đang xử lý...' : 'Ngắt kết nối'}
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem 
                                  onClick={() => handleToggleStatusClick(account)} 
                                  disabled={isTogglingStatus}
                                  className="hover:bg-zinc-700 focus:bg-zinc-700"
                                >
                                  <Link2 className="h-4 w-4 mr-2" />
                                  {isTogglingStatus ? 'Đang xử lý...' : 'Kết nối lại'}
                                </DropdownMenuItem>
                              )}
                              
                              <DropdownMenuSeparator className="bg-zinc-700" />
                              <DropdownMenuItem 
                                className="text-red-500 hover:bg-zinc-700 focus:bg-zinc-700" 
                                onClick={() => handleDeleteClick(account)}
                                disabled={isDeletingAccount}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {isDeletingAccount ? 'Đang xóa...' : 'Xóa tài khoản'}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-zinc-400">
              {searchTerm || statusFilter || typeFilter ? 
                "Không tìm thấy tài khoản nào phù hợp với bộ lọc" : 
                "Người dùng chưa có tài khoản nào."}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk action floating bar */}
      <BulkActionBar
        selectedCount={selectedAccounts.length}
        onClose={handleCloseActionBar}
        onConnectAll={handleBulkConnectClick}
        onDisconnectAll={handleBulkDisconnectClick}
        isProcessing={isBulkProcessing}
      />

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tài khoản</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Bạn có chắc chắn muốn xóa tài khoản này? Thao tác này không thể hoàn tác và sẽ ngắt kết nối tài khoản khỏi bot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700" 
              disabled={isDeletingAccount}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? (
                <>
                  <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Đang xóa...
                </>
              ) : (
                'Xác nhận xóa'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk action confirmation dialog */}
      <AlertDialog open={bulkConfirmDialogOpen} onOpenChange={setBulkConfirmDialogOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bulkAction === 'connect' ? 'Xác nhận kết nối hàng loạt' : 'Xác nhận ngắt kết nối hàng loạt'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              {bulkAction === 'connect' 
                ? `Bạn có chắc chắn muốn kết nối ${selectedAccounts.length} tài khoản đã chọn?`
                : `Bạn có chắc chắn muốn ngắt kết nối ${selectedAccounts.length} tài khoản đã chọn?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700" 
              disabled={isBulkProcessing}
            >
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={executeBulkAction} 
              className={`${bulkAction === 'connect' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}
              disabled={isBulkProcessing}
            >
              {isBulkProcessing ? (
                <>
                  <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  Đang xử lý...
                </>
              ) : (
                bulkAction === 'connect' ? 'Xác nhận kết nối' : 'Xác nhận ngắt kết nối'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserAccountsTab;

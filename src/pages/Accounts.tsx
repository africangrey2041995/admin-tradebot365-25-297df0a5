
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, WifiHigh, WifiOff } from 'lucide-react';
import { toast } from 'sonner';
import { Account } from '@/types';
import { ConnectionStatus } from '@/types/connection';
import AccountCard from '@/components/accounts/AccountCard';
import EditAccountDialog from '@/components/accounts/EditAccountDialog';
import AccountsHeader from '@/components/accounts/AccountsHeader';
import AccountsList from '@/components/accounts/AccountsList';
import useAccounts from '@/hooks/useAccounts';
import AddAccountDialog from '@/components/accounts/AddAccountDialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [statusFilter, setStatusFilter] = useState<ConnectionStatus | 'all'>('all');
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'connect' | 'disconnect'>('connect');
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  
  const { 
    accounts, 
    addAccount, 
    updateAccount, 
    deleteAccount, 
    reconnectAccount,
    disconnectAccount,
    bulkReconnect,
    bulkDisconnect
  } = useAccounts();

  // First filter by status if filter is active
  const statusFilteredAccounts = accounts.filter(account => 
    statusFilter === 'all' ? true : account.status === statusFilter
  );
  
  // Then filter by search term
  const filteredAccounts = statusFilteredAccounts.filter(account => 
    account.cspAccountName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.ctidTraderAccountId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.cspUserEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats
  const accountStats = {
    total: accounts.length,
    connected: accounts.filter(account => account.status === 'Connected').length,
    disconnected: accounts.filter(account => account.status === 'Disconnected').length,
    pending: accounts.filter(account => account.status === 'Pending').length
  };

  const handleAddAccount = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditAccount = (clientId: string) => {
    const account = accounts.find(a => a.clientId === clientId);
    if (account) {
      setSelectedAccount(account);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEditedAccount = (updatedAccount: Partial<Account>) => {
    if (!selectedAccount) return;
    updateAccount(selectedAccount.clientId || '', updatedAccount);
  };

  const handleDeleteAccount = (clientId: string) => {
    deleteAccount(clientId);
  };

  const handleReconnect = (clientId: string) => {
    reconnectAccount(clientId);
  };

  const handleDisconnect = (clientId: string) => {
    disconnectAccount(clientId);
  };

  const handleStatusFilterChange = (status: ConnectionStatus | 'all') => {
    setStatusFilter(status);
  };

  const handleBulkAction = (action: 'connect' | 'disconnect') => {
    setBulkAction(action);
    
    // Get IDs of accounts that match the action we want to perform
    const eligibleAccountIds = accounts
      .filter(account => {
        if (action === 'connect') return account.status === 'Disconnected';
        if (action === 'disconnect') return account.status === 'Connected';
        return false;
      })
      .map(account => account.clientId || '')
      .filter(Boolean);
    
    setSelectedAccountIds(eligibleAccountIds);
    
    if (eligibleAccountIds.length === 0) {
      toast.info('Không có tài khoản phù hợp để thực hiện hành động này');
      return;
    }
    
    setIsBulkActionDialogOpen(true);
  };

  const confirmBulkAction = () => {
    if (bulkAction === 'connect') {
      bulkReconnect(selectedAccountIds);
    } else {
      bulkDisconnect(selectedAccountIds);
    }
    setIsBulkActionDialogOpen(false);
  };

  return (
    <MainLayout title="Quản Lý Tài Khoản">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Tìm kiếm tài khoản..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={statusFilter === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleStatusFilterChange('all')}
            >
              Tất cả ({accountStats.total})
            </Button>
            <Button 
              variant={statusFilter === 'Connected' ? 'default' : 'outline'} 
              size="sm"
              className={statusFilter === 'Connected' ? '' : 'text-emerald-600'}
              onClick={() => handleStatusFilterChange('Connected')}
            >
              <WifiHigh className="mr-1 h-4 w-4" />
              Đã kết nối ({accountStats.connected})
            </Button>
            <Button 
              variant={statusFilter === 'Disconnected' ? 'default' : 'outline'} 
              size="sm"
              className={statusFilter === 'Disconnected' ? '' : 'text-red-600'}
              onClick={() => handleStatusFilterChange('Disconnected')}
            >
              <WifiOff className="mr-1 h-4 w-4" />
              Mất kết nối ({accountStats.disconnected})
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Thao tác hàng loạt</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Thao tác hàng loạt</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  onClick={() => handleBulkAction('connect')}
                  disabled={accountStats.disconnected === 0}
                >
                  <WifiHigh className="mr-2 h-4 w-4" />
                  <span>Kết nối tất cả</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleBulkAction('disconnect')}
                  disabled={accountStats.connected === 0}
                >
                  <WifiOff className="mr-2 h-4 w-4" />
                  <span>Ngắt kết nối tất cả</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={handleAddAccount}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Thêm Tài Khoản
          </Button>
        </div>
      </div>

      <AccountsList 
        accounts={filteredAccounts}
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
        onReconnect={handleReconnect}
        onDisconnect={handleDisconnect}
      />

      <AddAccountDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAccount={addAccount}
      />

      <EditAccountDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        account={selectedAccount}
        onSave={handleSaveEditedAccount}
      />
      
      <AlertDialog open={isBulkActionDialogOpen} onOpenChange={setIsBulkActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bulkAction === 'connect' ? 'Kết nối tất cả tài khoản' : 'Ngắt kết nối tất cả tài khoản'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bulkAction === 'connect' 
                ? `Bạn có chắc chắn muốn kết nối lại ${selectedAccountIds.length} tài khoản đang mất kết nối không?`
                : `Bạn có chắc chắn muốn ngắt kết nối ${selectedAccountIds.length} tài khoản đang kết nối không?`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkAction}>
              {bulkAction === 'connect' ? 'Kết nối tất cả' : 'Ngắt kết nối tất cả'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
};

export default Accounts;


import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, UserPlus } from "lucide-react";
import { UsersFilter } from '../UsersFilter';
import { useUserManagement } from '@/hooks/premium-bot/useUserManagement';
import { useAccountsTransform } from '@/hooks/accounts/useAccountsTransform';
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';
import { Account } from '@/types';
import { toast } from 'sonner';

interface UserAccountsTabProps {
  userId: string;
}

export const UserAccountsTab: React.FC<UserAccountsTabProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  // Use the existing hook to manage accounts for this user
  const { 
    accounts,
    refreshAccounts,
    handleEditAccount,
    handleDeleteAccount,
    handleToggleConnection,
    uniqueUsers,
    uniqueCSPAccounts,
    tradingAccountsCount
  } = useUserManagement('all', userId);

  // Get hierarchical account structure 
  const { users: hierarchicalUsers } = useAccountsTransform(accounts);

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
              <div className="text-3xl font-bold text-white">{uniqueCSPAccounts}</div>
              <div className="text-sm text-zinc-400">Tổng Tài Khoản CSP</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">{tradingAccountsCount}</div>
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
          <CardTitle>Tài khoản người dùng</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả các tài khoản và kết nối cho người dùng này
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HierarchicalAccountsTable
            accounts={accounts}
            onRefresh={refreshAccounts}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            onToggleConnection={handleToggleConnection}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAccountsTab;

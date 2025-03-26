
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
import { Eye, ExternalLink, Search, RefreshCw, UserPlus } from "lucide-react";
import { UsersFilter } from '../UsersFilter';
import { useUserManagement } from '@/hooks/premium-bot/useUserManagement';
import { Account } from '@/types';

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

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = searchTerm === '' || 
      account.cspAccountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.cspUserEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.apiName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === null || 
      (statusFilter === 'connected' && account.status === 'Connected') ||
      (statusFilter === 'disconnected' && account.status === 'Disconnected');
    
    const matchesType = typeFilter === null || typeFilter === 'all' ||
      (typeFilter === 'live' && account.isLive) ||
      (typeFilter === 'demo' && !account.isLive);
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalAccounts = accounts.length;
  const connectedAccounts = accounts.filter(acc => acc.status === 'Connected').length;
  const liveAccounts = accounts.filter(acc => acc.isLive).length;

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{totalAccounts}</div>
              <div className="text-sm text-zinc-400">Tổng số tài khoản</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{connectedAccounts}</div>
              <div className="text-sm text-zinc-400">Đang kết nối</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">{liveAccounts}</div>
              <div className="text-sm text-zinc-400">Tài khoản Live</div>
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
                    <TableHead className="text-zinc-400">Tên tài khoản</TableHead>
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
                      <TableCell>
                        <div>
                          <div className="font-medium">{account.cspAccountName}</div>
                          <div className="text-xs text-zinc-400">{account.cspUserEmail}</div>
                        </div>
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
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${account.status === 'Connected' ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                          <span className={account.status === 'Connected' ? 'text-green-500' : 'text-red-500'}>
                            {account.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            title="Xem trong Bot"
                            onClick={() => console.log("View in bot")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
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
    </div>
  );
};

export default UserAccountsTab;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, UsersIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useUsers } from '@/hooks/admin/useUsers';
import { UsersSearchAndFilters } from '@/components/admin/users/UsersSearchAndFilters';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { AddUserButton } from '@/components/admin/users/AddUserButton';
import { UserActions } from '@/components/admin/users/UserActions';
import { UsersFilter } from '@/components/admin/users/UsersFilter';
import { BulkActionDialog } from '@/components/admin/users/BulkActionDialog';
import { toast } from "sonner";
import { exportToCSV, exportToExcel } from '@/utils/exportUtils';
import AccountsStatsCards from '@/components/admin/accounts/AccountsStatsCards';
import { useBotAccounts } from '@/hooks/useBotAccounts';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | 'delete' | null>(null);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const { users, totalUsers } = useUsers();

  const { 
    accounts, 
    hierarchicalData,
    loading: accountsLoading,
    handleRefresh
  } = useBotAccounts('all', 'all');
  
  const connectedAccounts = accounts.filter(acc => acc.status === 'connected').length;
  const disconnectedAccounts = accounts.length - connectedAccounts;
  const liveAccounts = accounts.filter(acc => acc.isLive).length;
  const demoAccounts = accounts.length - liveAccounts;

  const handleRefreshStats = () => {
    handleRefresh();
    toast.success("Đã làm mới dữ liệu thống kê");
  };

  const filteredUsers = mockUsers.filter(user => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(user.name) || searchRegex.test(user.email);

    const matchesStatus = !filterStatus || user.status === filterStatus;
    const matchesPlan = !planFilter || planFilter === 'all' || user.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterClick = (status: string | null) => {
    setFilterStatus(status === filterStatus ? null : status);
  };
  
  const handlePlanFilterChange = (value: string | null) => {
    setPlanFilter(value);
  };
  
  const viewUserDetail = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleAddUser = () => {
    console.log("Add user clicked");
  };

  const handleSelectUser = (userId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAllUsers = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for users:`, selectedUsers);
    
    switch (action) {
      case 'activate':
        setBulkAction('activate');
        break;
      case 'suspend':
        setBulkAction('deactivate');
        break;
      case 'delete':
        setBulkAction('delete');
        break;
      default:
        toast.info(`Đã thực hiện hành động "${action}" cho ${selectedUsers.length} người dùng`);
        return;
    }
    
    setBulkActionDialogOpen(true);
  };

  const handleConfirmBulkAction = () => {
    console.log(`Confirmed bulk action ${bulkAction} for users:`, selectedUsers);
    
    setSelectedUsers([]);
    setBulkAction(null);
    toast.success("Thao tác hàng loạt thành công!");
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Gói', 'Ngày tham gia'];
    const data = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status,
      user.plan,
      user.joinDate
    ]);
    
    exportToCSV(headers, data, 'danh-sach-nguoi-dung');
    toast.success("Đã xuất dữ liệu ra file CSV");
  };

  const handleExportExcel = () => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Gói', 'Ngày tham gia'];
    const data = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status,
      user.plan,
      user.joinDate
    ]);
    
    exportToExcel(headers, data, 'danh-sach-nguoi-dung', 'Người dùng');
    toast.success("Đã xuất dữ liệu ra file Excel");
  };

  const mockUsers = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john.doe@example.com",
      status: "active",
      plan: "premium",
      createdAt: "2023-01-15T10:20:30Z",
      updatedAt: "2023-09-18T16:55:33Z",
      emailVerified: true,
      twoFactorEnabled: true,
      bots: 3,
      joinDate: "2023-01-15"
    },
    {
      id: "user-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "inactive",
      plan: "free",
      createdAt: "2023-02-20T14:30:45Z",
      updatedAt: "2023-08-10T09:15:22Z",
      emailVerified: true,
      twoFactorEnabled: false,
      bots: 1,
      joinDate: "2023-02-20"
    },
    {
      id: "user-003",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      status: "active",
      plan: "premium",
      createdAt: "2023-03-10T08:45:12Z",
      updatedAt: "2023-09-01T11:20:33Z",
      emailVerified: true,
      twoFactorEnabled: true,
      bots: 5,
      joinDate: "2023-03-10"
    },
    {
      id: "user-004",
      name: "Alice Williams",
      email: "alice.williams@example.com",
      status: "active",
      plan: "free",
      createdAt: "2023-04-05T16:22:58Z",
      updatedAt: "2023-07-25T14:58:17Z",
      emailVerified: false,
      twoFactorEnabled: false,
      bots: 0,
      joinDate: "2023-04-05"
    },
    {
      id: "user-005",
      name: "David Brown",
      email: "david.brown@example.com",
      status: "inactive",
      plan: "premium",
      createdAt: "2023-05-12T09:55:04Z",
      updatedAt: "2023-08-18T10:30:29Z",
      emailVerified: true,
      twoFactorEnabled: true,
      bots: 2,
      joinDate: "2023-05-12"
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Thống kê tài khoản</h2>
          <button 
            className="flex items-center text-sm text-indigo-400 hover:text-indigo-300"
            onClick={handleRefreshStats}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Làm mới thống kê
          </button>
        </div>
        
        <AccountsStatsCards 
          data={hierarchicalData}
          connectedAccounts={connectedAccounts}
          disconnectedAccounts={disconnectedAccounts}
          liveAccounts={liveAccounts}
          demoAccounts={demoAccounts}
        />
      </div>
      
      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Quản lý Người dùng</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý và chỉnh sửa thông tin người dùng hệ thống.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersFilter 
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            planFilter={planFilter}
            onSearchChange={handleSearch}
            onFilterClick={handleFilterClick}
            onPlanFilterChange={handlePlanFilterChange}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <AddUserButton onClick={handleAddUser} />
            
            <UserActions 
              selectedUsers={selectedUsers}
              onBulkAction={handleBulkAction}
              onExportCSV={handleExportCSV}
              onExportExcel={handleExportExcel}
            />
          </div>

          <UsersTable 
            users={filteredUsers}
            onViewUserDetail={viewUserDetail}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            onSelectAllUsers={handleSelectAllUsers}
          />
          
          <BulkActionDialog
            open={bulkActionDialogOpen}
            onOpenChange={setBulkActionDialogOpen}
            selectedUsersCount={selectedUsers.length}
            bulkAction={bulkAction}
            onConfirm={handleConfirmBulkAction}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;

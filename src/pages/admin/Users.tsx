
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, UsersIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { UsersStatsCards } from '@/components/admin/users/UsersStatsCards';
import { useUsers } from '@/hooks/admin/useUsers';
import { UsersSearchAndFilters } from '@/components/admin/users/UsersSearchAndFilters';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { AddUserButton } from '@/components/admin/users/AddUserButton';
import { UserActions } from '@/components/admin/users/UserActions';
import { UsersFilter } from '@/components/admin/users/UsersFilter';
import { BulkActionDialog } from '@/components/admin/users/BulkActionDialog';
import { toast } from "sonner";
import { exportToCSV, exportToExcel } from '@/utils/exportUtils';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | 'delete' | null>(null);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const { totalUsers } = useUsers();

  const statsData = {
    totalUsers: 5,
    activeUsers: 3,
    inactiveUsers: 2,
    suspendedUsers: 0,
    newUsersThisMonth: 2,
    newUsersThisWeek: 1,
    newUsersToday: 0
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
    // Logic to add a new user
    console.log("Add user clicked");
  };

  // Chọn người dùng
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

  // Thao tác hàng loạt
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
        // Xử lý các hành động khác (nâng cấp premium, v.v.)
        toast.info(`Đã thực hiện hành động "${action}" cho ${selectedUsers.length} người dùng`);
        return;
    }
    
    setBulkActionDialogOpen(true);
  };

  const handleConfirmBulkAction = () => {
    console.log(`Confirmed bulk action ${bulkAction} for users:`, selectedUsers);
    
    // Sau khi xác nhận, làm mới danh sách và bỏ chọn người dùng
    setSelectedUsers([]);
    setBulkAction(null);
    toast.success("Thao tác hàng loạt thành công!");
  };

  // Xuất dữ liệu
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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <UsersStatsCards 
          totalUsers={statsData.totalUsers}
          activeUsers={statsData.activeUsers}
          inactiveUsers={statsData.inactiveUsers}
          suspendedUsers={statsData.suspendedUsers}
          newUsersThisMonth={statsData.newUsersThisMonth}
          newUsersThisWeek={statsData.newUsersThisWeek}
          newUsersToday={statsData.newUsersToday}
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
          {/* Bộ lọc nâng cao */}
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

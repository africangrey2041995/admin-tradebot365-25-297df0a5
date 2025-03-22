
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { UserActions } from '@/components/admin/users/UserActions';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { UsersFilter } from '@/components/admin/users/UsersFilter';
import { UsersPagination } from '@/components/admin/users/UsersPagination';
import { UsersStatsCards } from '@/components/admin/users/UsersStatsCards';
import { BulkActionDialog } from '@/components/admin/premium-bots/BulkActionDialog';
import { useUsers } from '@/hooks/admin/useUsers';
import { exportToCSV, exportToExcel } from '@/utils/exportUtils';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<string>('');
  
  const {
    users,
    filteredUsers,
    selectedUsers,
    setSelectedUsers,
    isLoading,
    userStats,
    toggleUserSelection,
    filterUsers,
  } = useUsers();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterUsers(e.target.value, statusFilter, roleFilter, planFilter);
  };
  
  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
    filterUsers(searchTerm, status, roleFilter, planFilter);
  };
  
  const handleRoleFilterChange = (role: string | null) => {
    setRoleFilter(role);
    filterUsers(searchTerm, statusFilter, role, planFilter);
  };
  
  const handlePlanFilterChange = (plan: string | null) => {
    setPlanFilter(plan);
    filterUsers(searchTerm, statusFilter, roleFilter, plan);
  };
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  const handleBulkAction = (action: string) => {
    setBulkAction(action);
    setBulkActionDialogOpen(true);
  };
  
  const handleConfirmBulkAction = () => {
    console.log(`Performing ${bulkAction} action on users:`, selectedUsers);
    
    // Clear selections after action
    setSelectedUsers([]);
    setBulkActionDialogOpen(false);
  };

  const handleExportCSV = () => {
    exportToCSV(
      filteredUsers,
      'users-export',
      ['id', 'name', 'email', 'role', 'status', 'plan', 'bots', 'joinDate']
    );
  };

  const handleExportExcel = () => {
    exportToExcel(
      filteredUsers,
      'users-export',
      ['id', 'name', 'email', 'role', 'status', 'plan', 'bots', 'joinDate']
    );
  };
  
  return (
    <AdminLayout title="Quản lý người dùng" subtitle="Quản lý tất cả người dùng trên hệ thống">
      <UsersStatsCards stats={userStats} />
      
      <div className="flex flex-col gap-1.5 mt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-2">
          <UsersFilter 
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            roleFilter={roleFilter}
            planFilter={planFilter}
            onSearchChange={handleSearchChange}
            onStatusFilterChange={handleStatusFilterChange}
            onRoleFilterChange={handleRoleFilterChange}
            onPlanFilterChange={handlePlanFilterChange}
          />
          
          <UserActions 
            selectedUsers={selectedUsers}
            onBulkAction={handleBulkAction}
            onExportCSV={handleExportCSV}
            onExportExcel={handleExportExcel}
          />
        </div>
        
        <UsersTable 
          users={filteredUsers}
          selectedUsers={selectedUsers}
          onUserSelect={toggleUserSelection}
          isLoading={isLoading}
          page={page}
        />
        
        <UsersPagination 
          totalItems={filteredUsers.length} 
          currentPage={page} 
          onPageChange={handlePageChange} 
        />
      </div>
      
      <BulkActionDialog
        open={bulkActionDialogOpen}
        onOpenChange={setBulkActionDialogOpen}
        title={`${bulkAction === 'activate' ? 'Kích hoạt' : 
               bulkAction === 'suspend' ? 'Tạm khóa' : 
               bulkAction === 'premium' ? 'Nâng cấp lên Premium' : 
               'Chuyển về Basic'} tài khoản`}
        description={`Bạn có chắc chắn muốn ${bulkAction === 'activate' ? 'kích hoạt' : 
                    bulkAction === 'suspend' ? 'tạm khóa' : 
                    bulkAction === 'premium' ? 'nâng cấp lên Premium' : 
                    'chuyển về Basic'} ${selectedUsers.length} tài khoản đã chọn?`}
        actionText={bulkAction === 'activate' ? 'Kích hoạt' : 
                  bulkAction === 'suspend' ? 'Tạm khóa' : 
                  bulkAction === 'premium' ? 'Nâng cấp' : 'Chuyển đổi'}
        actionVariant={bulkAction === 'activate' ? 'default' : 
                      bulkAction === 'suspend' ? 'destructive' : 'default'}
        onAction={handleConfirmBulkAction}
      />
    </AdminLayout>
  );
};

export default Users;

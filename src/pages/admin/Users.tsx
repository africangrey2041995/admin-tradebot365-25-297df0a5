
import React, { useState } from 'react';
import { UserActions } from '@/components/admin/users/UserActions';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { UsersFilter } from '@/components/admin/users/UsersFilter';
import { UsersPagination } from '@/components/admin/users/UsersPagination';
import { UsersStatsCards } from '@/components/admin/users/UsersStatsCards';
import { BulkActionDialog } from '@/components/admin/premium-bots/BulkActionDialog';
import { useUsers } from '@/hooks/admin/useUsers';
import { exportToCSV, exportToExcel } from '@/utils/exportUtils';

// We're removing the AdminLayout import as we're not directly using it here
// The parent route should have the AdminLayout which renders the Outlet component

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const {
    users,
    totalUsers,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    newUsersThisMonth,
    searchTerm: hookSearchTerm,
    filterStatus,
    planFilter: hookPlanFilter,
    handleSearchChange,
    handleFilterClick,
    handleUserCheckbox,
    handleSelectAll,
    handleBulkAction: hookHandleBulkAction,
    selectAll,
    exportToCSV: hookExportToCSV
  } = useUsers();
  
  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
    handleFilterClick(status);
  };
  
  const handleRoleFilterChange = (role: string | null) => {
    setRoleFilter(role);
    // Role filtering is not implemented in the hook, but we keep the UI consistent
  };
  
  const handlePlanFilterChange = (plan: string | null) => {
    setPlanFilter(plan);
    // We need to implement this in the useUsers hook if needed
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
    
    // Use the bulk action handler from the hook
    hookHandleBulkAction(bulkAction);
    
    // Clear selections after action
    setSelectedUsers([]);
    setBulkActionDialogOpen(false);
  };

  const handleExportCSV = () => {
    // Convert users to the format expected by exportToCSV
    const data = users.map(user => [
      user.id,
      user.name,
      user.email,
      user.role || 'user',
      user.status,
      user.plan,
      user.bots.toString(),
      user.joinDate
    ]);
    
    exportToCSV(
      ['ID', 'Name', 'Email', 'Role', 'Status', 'Plan', 'Bots', 'Join Date'],
      data,
      'users-export'
    );
  };

  const handleExportExcel = () => {
    // Convert users to the format expected by exportToExcel
    const data = users.map(user => [
      user.id,
      user.name,
      user.email,
      user.role || 'user',
      user.status,
      user.plan,
      user.bots.toString(),
      user.joinDate
    ]);
    
    exportToExcel(
      ['ID', 'Name', 'Email', 'Role', 'Status', 'Plan', 'Bots', 'Join Date'],
      data,
      'users-export'
    );
  };
  
  return (
    // Removed AdminLayout wrapper since it should be in the parent route component
    <div>
      <h1 className="text-2xl font-semibold mb-4">Quản lý người dùng</h1>
      <p className="text-zinc-400 mb-6">Quản lý tất cả người dùng trên hệ thống</p>
      
      <UsersStatsCards 
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        suspendedUsers={suspendedUsers}
        newUsersThisMonth={newUsersThisMonth}
      />
      
      <div className="flex flex-col gap-1.5 mt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-2">
          <UsersFilter 
            searchTerm={searchTerm}
            filterStatus={statusFilter}
            onSearchChange={handleSearchChange}
            onFilterClick={handleFilterClick}
            onPlanFilterChange={handlePlanFilterChange}
            planFilter={planFilter}
          />
          
          <UserActions 
            selectedUsers={selectedUsers}
            onBulkAction={handleBulkAction}
            onExportCSV={handleExportCSV}
            onExportExcel={handleExportExcel}
          />
        </div>
        
        <UsersTable 
          users={users}
          selectedUsers={selectedUsers}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSelectUser={handleUserCheckbox}
          onViewUserDetails={(userId) => console.log('View user details', userId)}
        />
        
        <UsersPagination 
          currentPage={page} 
          totalUsers={users.length}
          usersPerPage={10}
          onPageChange={handlePageChange} 
        />
      </div>
      
      <BulkActionDialog
        open={bulkActionDialogOpen}
        onOpenChange={setBulkActionDialogOpen}
        selectedBotsCount={selectedUsers.length}
        bulkAction={bulkAction === 'activate' ? 'activate' : 'deactivate'}
        onConfirm={handleConfirmBulkAction}
      />
    </div>
  );
};

export default Users;

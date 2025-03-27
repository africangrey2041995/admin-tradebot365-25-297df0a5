
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUserButton } from '@/components/admin/users/AddUserButton';
import { UsersFilter } from '@/components/admin/users/UsersFilter';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { UserActions } from '@/components/admin/users/UserActions';
import { BulkActionDialog } from '@/components/admin/users/BulkActionDialog';
import { useUsersManagement } from '@/hooks/admin/useUsersManagement';

interface UsersManagementProps {
  onViewUserDetail: (userId: string) => void;
  onAddUser: () => void;
}

export const UsersManagement: React.FC<UsersManagementProps> = ({ 
  onViewUserDetail,
  onAddUser
}) => {
  const {
    searchTerm,
    filterStatus,
    planFilter,
    selectedUsers,
    bulkAction,
    bulkActionDialogOpen,
    filteredUsers,
    handleSearch,
    handleFilterClick,
    handlePlanFilterChange,
    handleSelectUser,
    handleSelectAllUsers,
    handleBulkAction,
    handleConfirmBulkAction,
    handleUserUpdated,
    handleUserDeleted,
    handleUserStatusChange,
    setBulkActionDialogOpen,
    handleExportCSV,
    handleExportExcel
  } = useUsersManagement();

  return (
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
          <AddUserButton onClick={onAddUser} />
          
          <UserActions 
            selectedUsers={selectedUsers}
            onBulkAction={handleBulkAction}
            onExportCSV={handleExportCSV}
            onExportExcel={handleExportExcel}
          />
        </div>

        <UsersTable 
          users={filteredUsers}
          onViewUserDetail={onViewUserDetail}
          selectedUsers={selectedUsers}
          onSelectUser={handleSelectUser}
          onSelectAllUsers={handleSelectAllUsers}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
          onUserStatusChange={handleUserStatusChange}
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
  );
};

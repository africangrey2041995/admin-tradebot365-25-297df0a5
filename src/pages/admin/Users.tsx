
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { UsersTable } from '@/components/admin/users/UsersTable';
import { UsersPagination } from '@/components/admin/users/UsersPagination';
import { BulkActionDialog } from '@/components/admin/users/BulkActionDialog';
import { AddUserDialog } from '@/components/admin/users/AddUserDialog';
import { useUsers } from '@/hooks/admin/useUsers';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'activate' | 'deactivate' | 'delete' | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Stats
  const activeUsers = 50;
  const inactiveUsers = 20;
  const suspendedUsers = 5;
  const newUsersThisMonth = 10;
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  
  const {
    users,
    totalUsers,
    currentPage,
    pageSize,
    loading,
    selectedUser,
    fetchUsers,
    handlePageChange,
    getUserDetails,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (status: string | null) => {
    setFilterStatus(status);
  };

  const handleUserCheckbox = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedUsers(users.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    setBulkAction(action);
    setIsBulkActionDialogOpen(true);
  };

  const confirmBulkAction = () => {
    // Logic for bulk actions would go here
    toast.success(`Bulk action applied to ${selectedUsers.length} users`);
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const exportToCSV = () => {
    toast.success("Exported users data to CSV");
  };

  const exportToExcel = () => {
    toast.success("Exported users data to Excel");
  };

  const handleUserAdded = () => {
    fetchUsers(1);
    toast.success("User added successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Người dùng</h1>
        <Button 
          className="bg-amber-500 hover:bg-amber-600 text-white"
          onClick={() => setIsAddUserDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm Người dùng mới
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách Người dùng</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả người dùng trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable
            users={users}
            loading={loading}
            selectedUser={selectedUser}
            activeUsers={activeUsers}
            inactiveUsers={inactiveUsers}
            suspendedUsers={suspendedUsers}
            newUsersThisMonth={newUsersThisMonth}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            planFilter={planFilter}
            selectedUsers={selectedUsers}
            selectAll={selectAll}
            usersPerPage={pageSize}
            handleSearchChange={handleSearchChange}
            handleFilterClick={handleFilterClick}
            handleUserCheckbox={handleUserCheckbox}
            handleSelectAll={handleSelectAll}
            handleBulkAction={handleBulkAction}
            exportToCSV={exportToCSV}
            exportToExcel={exportToExcel}
            setPlanFilter={setPlanFilter}
            setCurrentPage={handlePageChange}
          />

          <UsersPagination
            totalUsers={totalUsers}
            visibleUsers={users.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
      
      <AddUserDialog 
        open={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        onUserAdded={handleUserAdded}
      />
      
      <BulkActionDialog 
        open={isBulkActionDialogOpen}
        onOpenChange={setIsBulkActionDialogOpen}
        selectedUsersCount={selectedUsers.length}
        bulkAction={bulkAction}
        onConfirm={confirmBulkAction}
      />
    </div>
  );
};

export default AdminUsers;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsers } from '@/hooks/admin/useUsers';
import { UsersStatsCards } from '@/components/admin/users/UsersStatsCards';
import { UsersFilter } from '@/components/admin/users/UsersFilter';
import { UserActions } from '@/components/admin/users/UserActions';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { UsersPagination } from '@/components/admin/users/UsersPagination';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { 
    users, 
    totalUsers, 
    activeUsers, 
    inactiveUsers, 
    suspendedUsers,
    newUsersThisMonth,
    searchTerm,
    filterStatus,
    planFilter,
    selectedUsers,
    selectAll,
    currentPage,
    usersPerPage,
    handleSearchChange,
    handleFilterClick,
    handleUserCheckbox,
    handleSelectAll,
    handleBulkAction,
    exportToCSV,
    exportToExcel,
    setPlanFilter,
    setCurrentPage
  } = useUsers();

  const viewUserDetails = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý người dùng</h1>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      <UsersStatsCards 
        totalUsers={totalUsers}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        suspendedUsers={suspendedUsers}
        newUsersThisMonth={newUsersThisMonth}
      />

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả người dùng trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UsersFilter 
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            planFilter={planFilter}
            onSearchChange={handleSearchChange}
            onFilterClick={handleFilterClick}
            onPlanFilterChange={setPlanFilter}
          />
          
          <div className="flex justify-end mb-4">
            <UserActions 
              selectedUsers={selectedUsers}
              onBulkAction={handleBulkAction}
              onExportCSV={exportToCSV}
              onExportExcel={exportToExcel}
            />
          </div>

          <UsersTable 
            users={users}
            selectedUsers={selectedUsers}
            selectAll={selectAll}
            onSelectAll={handleSelectAll}
            onSelectUser={handleUserCheckbox}
            onViewUserDetails={viewUserDetails}
          />

          <UsersPagination 
            currentPage={currentPage}
            totalUsers={users.length}
            usersPerPage={usersPerPage}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, UsersIcon } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { UsersStatsCards } from '@/components/admin/users/UsersStatsCards';
import { useUsers } from '@/hooks/admin/useUsers';
import { UsersSearchAndFilters } from '@/components/admin/users/UsersSearchAndFilters';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { AddUserButton } from '@/components/admin/users/AddUserButton';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
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

    const matchesStatus = filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };
  
  const viewUserDetail = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleAddUser = () => {
    // Logic to add a new user
    console.log("Add user clicked");
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
          <UsersSearchAndFilters
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSearchChange={handleSearch}
            onFilterChange={handleFilterChange}
          />

          <div className="mt-4">
            <AddUserButton onClick={handleAddUser} />
          </div>

          <UsersTable 
            users={filteredUsers}
            onViewUserDetail={viewUserDetail}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;

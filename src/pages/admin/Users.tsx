import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, RefreshCw, MoreHorizontal, UsersIcon, UserCheck, UserX, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate } from 'react-router-dom';
import { UsersStatsCards } from '@/components/admin/users/UsersStatsCards';
import { useUsers } from '@/hooks/admin/useUsers';

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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center">
              <Search className="w-4 h-4 mr-2 text-zinc-500" />
              <Input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="flex items-center">
              <Label htmlFor="status" className="text-sm text-zinc-400 mr-2">
                Lọc theo trạng thái:
              </Label>
              <Select value={filterStatus} onValueChange={handleFilterChange}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-amber-500 focus:border-amber-500">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                <UserPlus className="w-4 h-4 mr-2" />
                Thêm người dùng
              </Button>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Gói</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.plan}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => viewUserDetail(user.id)}>
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem>Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;

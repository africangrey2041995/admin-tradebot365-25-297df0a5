
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Filter, MoreHorizontal, Check, X, Eye } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const users = [
    { 
      id: 'USR-24051', 
      name: 'Nguyễn Văn A', 
      email: 'nguyenvana@example.com', 
      role: 'user', 
      status: 'active',
      bots: 3,
      joinDate: '15/08/2023'
    },
    { 
      id: 'USR-24052', 
      name: 'Trần Thị B', 
      email: 'tranthib@example.com', 
      role: 'user', 
      status: 'active',
      bots: 1,
      joinDate: '03/10/2023'
    },
    { 
      id: 'USR-24053', 
      name: 'Lê Minh C', 
      email: 'leminhc@example.com', 
      role: 'user', 
      status: 'inactive',
      bots: 0,
      joinDate: '22/11/2023'
    },
    { 
      id: 'USR-24054', 
      name: 'Phạm Đức D', 
      email: 'phamducd@example.com', 
      role: 'user', 
      status: 'active',
      bots: 5,
      joinDate: '05/01/2024'
    },
    { 
      id: 'USR-24055', 
      name: 'Vũ Văn F', 
      email: 'vuvanf@example.com', 
      role: 'user', 
      status: 'suspended',
      bots: 0,
      joinDate: '30/03/2024'
    },
    { 
      id: 'USR-24056', 
      name: 'Đỗ Thị G', 
      email: 'dothig@example.com', 
      role: 'user', 
      status: 'active',
      bots: 1,
      joinDate: '12/04/2024'
    }
  ];

  const viewUserDetails = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (status: string | null) => {
    setFilterStatus(status === filterStatus ? null : status);
  };

  const filteredUsers = users
    .filter(user => 
      (searchTerm === '' || 
       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.id.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(user => 
      (filterStatus === null || user.status === filterStatus)
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý người dùng</h1>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Thêm người dùng
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả người dùng trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full sm:max-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input 
                placeholder="Tìm kiếm người dùng..." 
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`border-zinc-700 ${filterStatus === 'active' ? 'bg-green-500/20 text-green-500' : 'text-zinc-400'}`}
                onClick={() => handleFilterClick('active')}
              >
                <Check className="h-4 w-4 mr-2" />
                Hoạt động
              </Button>
              <Button 
                variant="outline" 
                className={`border-zinc-700 ${filterStatus === 'inactive' ? 'bg-yellow-500/20 text-yellow-500' : 'text-zinc-400'}`}
                onClick={() => handleFilterClick('inactive')}
              >
                <X className="h-4 w-4 mr-2" />
                Không hoạt động
              </Button>
              <Button 
                variant="outline" 
                className={`border-zinc-700 ${filterStatus === 'suspended' ? 'bg-red-500/20 text-red-500' : 'text-zinc-400'}`}
                onClick={() => handleFilterClick('suspended')}
              >
                <X className="h-4 w-4 mr-2" />
                Đã khóa
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-zinc-400 w-28">ID</TableHead>
                  <TableHead className="text-zinc-400">Tên</TableHead>
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Trạng thái</TableHead>
                  <TableHead className="text-zinc-400 text-center">Bots</TableHead>
                  <TableHead className="text-zinc-400">Ngày tham gia</TableHead>
                  <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-zinc-800">
                      <TableCell className="font-mono text-xs text-zinc-400">{user.id}</TableCell>
                      <TableCell className="max-w-[150px] truncate font-medium">{user.name}</TableCell>
                      <TableCell className="max-w-[180px] truncate">{user.email}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell className="text-center">{user.bots}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                            <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem 
                              className="focus:bg-zinc-800 cursor-pointer"
                              onClick={() => viewUserDetails(user.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Xem chi tiết</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-800">
                              {user.status === 'active' ? (
                                <>
                                  <X className="mr-2 h-4 w-4" />
                                  <span>Tạm khóa</span>
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Kích hoạt</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500">
                              <span>Xóa tài khoản</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Không tìm thấy kết quả phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-zinc-400">
              Hiển thị <span className="font-medium text-white">1-{filteredUsers.length}</span> trong <span className="font-medium text-white">{filteredUsers.length}</span> người dùng
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                Trước
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                Sau
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Role Badge Component
export const RoleBadge = ({ role }: { role: string }) => {
  switch(role) {
    case 'superadmin':
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Super Admin
        </Badge>
      );
    case 'admin':
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border-0">
          Người dùng
        </Badge>
      );
  }
};

// Status Badge Component
export const StatusBadge = ({ status }: { status: string }) => {
  switch(status) {
    case 'active':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-green-500">Hoạt động</span>
        </div>
      );
    case 'inactive':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-yellow-500">Không hoạt động</span>
        </div>
      );
    case 'suspended':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
          <span className="text-red-500">Đã khóa</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-zinc-500 mr-2"></div>
          <span className="text-zinc-500">Không xác định</span>
        </div>
      );
  }
};

export default AdminUsers;

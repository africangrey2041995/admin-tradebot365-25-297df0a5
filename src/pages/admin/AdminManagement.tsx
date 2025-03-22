import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { UserWithRole } from '@/types/admin-types';
import { UserStatus, UserPlan } from '@/constants/userConstants';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AdminUser extends Omit<UserWithRole, 'role' | 'permissions'> {
  role: 'admin' | 'superadmin';
  permissions: {
    manageUsers: boolean;
    manageBots: boolean;
    manageDatabase: boolean;
    viewLogs: boolean;
    manageNotifications: boolean;
    manageEmail: boolean;
    manageSettings: boolean;
    manageAdmins: boolean;
  };
  lastLogin?: string;
}

const mockAdminUsers: AdminUser[] = [
  {
    id: "admin-001",
    name: "John Doe",
    email: "john.doe@example.com",
    status: UserStatus.ACTIVE,
    plan: UserPlan.ENTERPRISE,
    createdAt: "2023-01-15T10:20:30Z",
    updatedAt: "2023-09-18T16:55:33Z",
    emailVerified: true,
    twoFactorEnabled: true,
    joinDate: "2023-01-15",
    roleDescription: "Super Admin",
    permissions: {
      manageUsers: true,
      manageBots: true,
      manageDatabase: true,
      viewLogs: true,
      manageNotifications: true,
      manageEmail: true,
      manageSettings: true,
      manageAdmins: true
    }
  },
  {
    id: "admin-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: UserStatus.ACTIVE,
    plan: UserPlan.ENTERPRISE,
    createdAt: "2023-02-20T14:30:45Z",
    updatedAt: "2023-08-10T09:15:22Z",
    emailVerified: true,
    twoFactorEnabled: false,
    joinDate: "2023-02-20",
    roleDescription: "Bot Manager",
    permissions: {
      manageUsers: false,
      manageBots: true,
      manageDatabase: false,
      viewLogs: true,
      manageNotifications: false,
      manageEmail: false,
      manageSettings: false,
      manageAdmins: false
    }
  },
  {
    id: "admin-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: UserStatus.ACTIVE,
    plan: UserPlan.ENTERPRISE,
    createdAt: "2023-03-10T08:45:12Z",
    updatedAt: "2023-09-01T11:20:33Z",
    emailVerified: true,
    twoFactorEnabled: true,
    joinDate: "2023-03-10",
    roleDescription: "User Manager",
    permissions: {
      manageUsers: true,
      manageBots: false,
      manageDatabase: false,
      viewLogs: true,
      manageNotifications: true,
      manageEmail: true,
      manageSettings: false,
      manageAdmins: false
    }
  }
];

const AdminManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [isEditAdminDialogOpen, setIsEditAdminDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);
  const [filterStatus, setFilterStatus] = useState('');

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(mockAdminUsers);

  const filteredAdmins = adminUsers.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (filterStatus && admin.status === filterStatus)
  );

  const handleAddAdmin = () => {
    setIsAddAdminDialogOpen(true);
  };

  const handleEditAdmin = (admin: AdminUser) => {
    setSelectedAdmin(admin);
    setIsEditAdminDialogOpen(true);
  };

  const handleDeleteAdmin = (adminId: string) => {
    setAdminUsers(adminUsers.filter(admin => admin.id !== adminId));
    toast.success('Admin deleted successfully');
  };

  const handleSaveAdmin = (newAdmin: AdminUser) => {
    setAdminUsers([...adminUsers, newAdmin]);
    toast.success('Admin added successfully');
    setIsAddAdminDialogOpen(false);
  };

  const handleUpdateAdmin = (updatedAdmin: AdminUser) => {
    setAdminUsers(adminUsers.map(admin => admin.id === updatedAdmin.id ? updatedAdmin : admin));
    toast.success('Admin updated successfully');
    setIsEditAdminDialogOpen(false);
  };

  const handlePermissionChange = (adminId: string, permission: keyof AdminUser['permissions'], value: boolean) => {
    setAdminUsers(adminUsers.map(admin => {
      if (admin.id === adminId) {
        return {
          ...admin,
          permissions: {
            ...admin.permissions,
            [permission]: value
          }
        };
      }
      return admin;
    }));
  };

  const handleViewUserDetails = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Quản trị viên</h1>
        <Button onClick={handleAddAdmin}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm Quản trị viên
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách Quản trị viên</CardTitle>
          <CardDescription>Quản lý và chỉnh sửa các quản trị viên của hệ thống.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-72 mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm quản trị viên..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Thông tin</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Quyền</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmins.map(admin => (
                  <TableRow key={admin.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarFallback>{admin.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-muted-foreground text-sm">{admin.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{admin.roleDescription}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(admin.permissions).map(([permission, value]) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <Label htmlFor={permission} className="text-sm capitalize">{permission.replace(/([A-Z])/g, ' $1')}</Label>
                            <Switch
                              id={permission}
                              checked={value}
                              onCheckedChange={(checked) => handlePermissionChange(admin.id, permission as keyof AdminUser['permissions'], checked)}
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditAdmin(admin)}>
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewUserDetails(admin.id)}>
                            Xem chi tiết người dùng
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteAdmin(admin.id)} className="text-destructive focus:text-destructive">
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAdmins.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Không tìm thấy quản trị viên nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Add Admin Dialog */}
      <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm Quản trị viên Mới</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết của quản trị viên mới.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label htmlFor="name">Tên</Label>
              <Input id="name" placeholder="Tên quản trị viên" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Email quản trị viên" type="email" />
            </div>
            <div>
              <Label htmlFor="role">Vai trò</Label>
              <Input id="role" placeholder="Vai trò quản trị viên" />
            </div>
            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Input id="status" placeholder="Trạng thái quản trị viên" />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input id="password" placeholder="Mật khẩu" type="password" />
            </div>
            <div>
              <Label htmlFor="joinDate">Ngày tham gia</Label>
              <Input id="joinDate" placeholder="Ngày tham gia" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Thêm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={isEditAdminDialogOpen} onOpenChange={() => setIsEditAdminDialogOpen(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Quản trị viên</DialogTitle>
            <DialogDescription>Chỉnh sửa thông tin chi tiết của quản trị viên.</DialogDescription>
          </DialogHeader>
          {selectedAdmin && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <Label htmlFor="name">Tên</Label>
                <Input id="name" placeholder="Tên quản trị viên" defaultValue={selectedAdmin.name} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email quản trị viên" type="email" defaultValue={selectedAdmin.email} />
              </div>
              <div>
                <Label htmlFor="role">Vai trò</Label>
                <Input id="role" placeholder="Vai trò quản trị viên" defaultValue={selectedAdmin.role} />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Input id="status" placeholder="Trạng thái quản trị viên" defaultValue={selectedAdmin.status} />
              </div>
              <div>
                <Label htmlFor="joinDate">Ngày tham gia</Label>
                <Input id="joinDate" placeholder="Ngày tham gia" defaultValue={selectedAdmin.joinDate} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminManagement;

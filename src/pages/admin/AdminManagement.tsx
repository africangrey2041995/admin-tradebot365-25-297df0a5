import React, { useState } from 'react';
import { UserWithRole } from '@/types/admin-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Shield, Filter, MoreHorizontal, Check, X, UserPlus, Edit, Key } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/hooks/use-admin";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "@/components/ui/switch";

// Define a more specific admin role type that excludes "user"
type AdminRoleType = "admin" | "superadmin";

// Schema for add/edit admin form
const adminFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  role: z.enum(["admin", "superadmin"], {
    required_error: "Vui lòng chọn vai trò.",
  }),
  permissions: z.object({
    manageUsers: z.boolean().default(false),
    manageBots: z.boolean().default(false),
    manageDatabase: z.boolean().default(false),
    viewLogs: z.boolean().default(false),
    manageNotifications: z.boolean().default(false),
    manageEmail: z.boolean().default(false),
    manageSettings: z.boolean().default(false),
    manageAdmins: z.boolean().default(false),
  }),
});

type AdminFormValues = z.infer<typeof adminFormSchema>;

// Define an admin user type that extends UserWithRole but ensures role is AdminRoleType
interface AdminUser extends Omit<UserWithRole, 'role'> {
  role: AdminRoleType;
  name: string; // Add name property
  fullName: string; // Keep fullName property
  permissions: {
    manageUsers: boolean;
    manageBots: boolean;
    manageDatabase: boolean;
    viewLogs: boolean;
    manageNotifications: boolean;
    manageEmail: boolean;
    manageSettings: boolean;
    manageAdmins: boolean;
  }
}

const AdminManagement = () => {
  const { isAdmin, isSuperAdmin } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);

  // Mock admin data
  const adminUsers: AdminUser[] = [
    { 
      id: '1', 
      name: 'Nguyễn Văn Admin',
      fullName: 'Nguyễn Văn Admin', 
      email: 'admin@example.com', 
      role: 'superadmin', 
      status: 'active',
      createdAt: '15/01/2024',
      lastLogin: '20/04/2024',
      permissions: {
        manageUsers: true,
        manageBots: true,
        manageDatabase: true,
        viewLogs: true,
        manageNotifications: true,
        manageEmail: true,
        manageSettings: true,
        manageAdmins: true,
      }
    },
    { 
      id: '2', 
      name: 'Trần Thị Quản Lý',
      fullName: 'Trần Thị Quản Lý', 
      email: 'manager@example.com', 
      role: 'admin', 
      status: 'active',
      createdAt: '05/02/2024',
      lastLogin: '19/04/2024',
      permissions: {
        manageUsers: true,
        manageBots: true,
        manageDatabase: false,
        viewLogs: true,
        manageNotifications: true,
        manageEmail: false,
        manageSettings: false,
        manageAdmins: false,
      }
    },
    { 
      id: '3', 
      name: 'Lê Minh Hỗ Trợ',
      fullName: 'Lê Minh Hỗ Trợ', 
      email: 'support@example.com', 
      role: 'admin', 
      status: 'active',
      createdAt: '12/03/2024',
      lastLogin: '18/04/2024',
      permissions: {
        manageUsers: true,
        manageBots: false,
        manageDatabase: false,
        viewLogs: true,
        manageNotifications: true,
        manageEmail: true,
        manageSettings: false,
        manageAdmins: false,
      }
    },
  ];

  // React Hook Form setup
  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "admin",
      permissions: {
        manageUsers: false,
        manageBots: false,
        manageDatabase: false,
        viewLogs: false,
        manageNotifications: false,
        manageEmail: false,
        manageSettings: false,
        manageAdmins: false,
      },
    },
  });

  // Handle form submission
  const onSubmit = (values: AdminFormValues) => {
    console.log(values);
    
    // Show success message
    toast({
      title: editingAdmin ? "Cập nhật thành công" : "Thêm admin thành công",
      description: editingAdmin 
        ? `Đã cập nhật thông tin cho ${values.fullName}` 
        : `Đã thêm ${values.fullName} làm quản trị viên`,
      duration: 3000,
    });
    
    // Close dialog and reset
    setAddDialogOpen(false);
    setEditingAdmin(null);
    form.reset();
  };

  // Handle edit admin
  const handleEditAdmin = (admin: AdminUser) => {
    setEditingAdmin(admin);
    
    // Set form values
    form.reset({
      fullName: admin.fullName || "",
      email: admin.email || "",
      role: admin.role,
      permissions: {
        ...admin.permissions
      }
    });
    
    setAddDialogOpen(true);
  };

  // Redirect non-superadmin users
  React.useEffect(() => {
    if (!isSuperAdmin) {
      toast({
        variant: "destructive",
        title: "Truy cập bị từ chối",
        description: "Bạn không có quyền truy cập vào trang quản lý admin.",
      });
      navigate('/admin');
    }
  }, [isSuperAdmin, navigate, toast]);

  if (!isSuperAdmin) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Admin</h1>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Thêm admin mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle>{editingAdmin ? "Cập nhật Admin" : "Thêm Admin Mới"}</DialogTitle>
              <DialogDescription className="text-zinc-400">
                {editingAdmin 
                  ? "Chỉnh sửa thông tin và phân quyền cho admin." 
                  : "Thêm admin mới và phân quyền truy cập hệ thống."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ tên</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Nhập họ tên đầy đủ" 
                            className="bg-zinc-800 border-zinc-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="admin@example.com" 
                            className="bg-zinc-800 border-zinc-700 text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-700 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Super Admin</FormLabel>
                          <FormDescription className="text-zinc-500">
                            Cấp quyền Super Admin (toàn quyền quản trị hệ thống)
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value === "superadmin"}
                            onCheckedChange={(checked) =>
                              field.onChange(checked ? "superadmin" : "admin")
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-white">Phân quyền</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="permissions.manageUsers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Quản lý người dùng</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="permissions.manageBots"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Quản lý Bot</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="permissions.manageDatabase"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Quản lý cơ sở dữ liệu</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="permissions.viewLogs"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Xem nhật ký hệ thống</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="permissions.manageNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Quản lý thông báo</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="permissions.manageEmail"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Quản lý email</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="permissions.manageSettings"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Quản lý cài đặt</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="permissions.manageAdmins"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-zinc-700 p-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Quản lý admin</FormLabel>
                              <FormDescription className="text-xs text-amber-500">
                                Chỉ dành cho Super Admin
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setAddDialogOpen(false);
                      setEditingAdmin(null);
                      form.reset();
                    }}
                    className="border-zinc-700 text-zinc-400"
                  >
                    Hủy
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    {editingAdmin ? "Cập nhật" : "Thêm admin"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách quản trị viên</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý và phân quyền cho các quản trị viên trong hệ thống.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:max-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input 
                placeholder="Tìm kiếm admin..." 
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-zinc-700 text-zinc-400">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-400">Tên</TableHead>
                <TableHead className="text-zinc-400">Email</TableHead>
                <TableHead className="text-zinc-400">Vai trò</TableHead>
                <TableHead className="text-zinc-400 hidden md:table-cell">Trạng thái</TableHead>
                <TableHead className="text-zinc-400 hidden md:table-cell">Ngày tạo</TableHead>
                <TableHead className="text-zinc-400 hidden md:table-cell">Đăng nhập gần nhất</TableHead>
                <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminUsers.map((admin) => (
                <TableRow key={admin.id} className="border-zinc-800">
                  <TableCell className="font-medium">{admin.fullName}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <RoleBadge role={admin.role} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <StatusBadge status={admin.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{admin.createdAt}</TableCell>
                  <TableCell className="hidden md:table-cell">{admin.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-zinc-400 hover:text-white"
                        onClick={() => handleEditAdmin(admin)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                          <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer">
                            <Key className="mr-2 h-4 w-4" />
                            <span>Reset mật khẩu</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer">
                            {admin.status === 'active' ? (
                              <>
                                <X className="mr-2 h-4 w-4" />
                                <span>Tạm khóa tài khoản</span>
                              </>
                            ) : (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                <span>Kích hoạt tài khoản</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          {admin.id !== '1' && ( // Don't allow deleting the first superadmin account
                            <>
                              <DropdownMenuSeparator className="bg-zinc-800" />
                              <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500 cursor-pointer">
                                <span>Xóa tài khoản</span>
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Nhật ký hoạt động</CardTitle>
          <CardDescription className="text-zinc-400">
            Lịch sử các thay đổi về quản trị viên và phân quyền gần đây.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-400">Thời gian</TableHead>
                <TableHead className="text-zinc-400">Hành động</TableHead>
                <TableHead className="text-zinc-400">Quản trị viên</TableHead>
                <TableHead className="text-zinc-400">Thực hiện bởi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { 
                  time: '20/04/2024 14:32', 
                  action: 'Cập nhật quyền', 
                  admin: 'Trần Thị Quản Lý', 
                  by: 'Nguyễn Văn Admin' 
                },
                { 
                  time: '15/04/2024 09:15', 
                  action: 'Thêm admin mới', 
                  admin: 'Lê Minh Hỗ Trợ', 
                  by: 'Nguyễn Văn Admin' 
                },
                { 
                  time: '05/02/2024 10:22', 
                  action: 'Thêm admin mới', 
                  admin: 'Trần Thị Quản Lý', 
                  by: 'Nguyễn Văn Admin' 
                },
              ].map((log, index) => (
                <TableRow key={index} className="border-zinc-800">
                  <TableCell>{log.time}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.admin}</TableCell>
                  <TableCell>{log.by}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Role Badge Component
const RoleBadge = ({ role }: { role: string }) => {
  switch(role) {
    case 'superadmin':
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
          <Shield className="h-3 w-3 mr-1" />
          Super Admin
        </Badge>
      );
    case 'admin':
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          <Shield className="h-3 w-3 mr-1" />
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
const StatusBadge = ({ status }: { status: string }) => {
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

export default AdminManagement;

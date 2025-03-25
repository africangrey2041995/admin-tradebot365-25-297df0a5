
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw, UserPlus, MoreHorizontal, UserX, UserCheck, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PropBotUser {
  id: string;
  name: string;
  email: string;
  integrationDate: string;
  status: 'active' | 'inactive' | 'suspended';
  performance: string;
}

// Mock data for demo
const MOCK_USERS: PropBotUser[] = [
  { 
    id: 'user-001', 
    name: 'Nguyen Van A', 
    email: 'nguyenvana@example.com', 
    integrationDate: '2023-10-15', 
    status: 'active',
    performance: '+12.5%'
  },
  { 
    id: 'user-002', 
    name: 'Tran Thi B', 
    email: 'tranthib@example.com', 
    integrationDate: '2023-11-05', 
    status: 'active',
    performance: '+8.2%'
  },
  { 
    id: 'user-003', 
    name: 'Le Van C', 
    email: 'levanc@example.com', 
    integrationDate: '2023-10-22', 
    status: 'inactive',
    performance: '-2.1%'
  },
  { 
    id: 'user-004', 
    name: 'Pham Thi D', 
    email: 'phamthid@example.com', 
    integrationDate: '2023-12-01', 
    status: 'suspended',
    performance: '+0.0%'
  },
];

interface PropBotUsersTabProps {
  botId: string;
}

const PropBotUsersTab: React.FC<PropBotUsersTabProps> = ({ botId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [users, setUsers] = useState<PropBotUser[]>(MOCK_USERS);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState<PropBotUser | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<'active' | 'inactive' | 'suspended'>('active');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Đã làm mới danh sách người dùng');
    }, 1000);
  };

  const handleAddUser = () => {
    if (!newUserEmail.trim() || !newUserEmail.includes('@')) {
      toast.error('Vui lòng nhập email hợp lệ');
      return;
    }
    
    // Check if user already exists
    if (users.some(user => user.email === newUserEmail)) {
      toast.error('Người dùng với email này đã tồn tại');
      return;
    }
    
    // Simulate API call to add user
    const newUser: PropBotUser = {
      id: `user-${Math.floor(Math.random() * 1000)}`,
      name: newUserEmail.split('@')[0], // Use part of email as name for demo
      email: newUserEmail,
      integrationDate: new Date().toISOString().split('T')[0],
      status: 'active',
      performance: '0.0%'
    };
    
    setUsers([...users, newUser]);
    setNewUserEmail('');
    setIsAddUserDialogOpen(false);
    toast.success('Đã thêm người dùng mới');
  };

  const handleRemoveUser = () => {
    if (!selectedUser) return;
    
    // Filter out the selected user
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    toast.success(`Đã xóa người dùng: ${selectedUser.name}`);
    setSelectedUser(null);
  };

  const handleUpdateUserStatus = () => {
    if (!selectedUser || !newStatus) return;
    
    // Update the status of the selected user
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, status: newStatus }
        : user
    ));
    
    setIsStatusDialogOpen(false);
    toast.success(`Đã cập nhật trạng thái của ${selectedUser.name} thành ${newStatus}`);
    setSelectedUser(null);
  };

  const openStatusDialog = (user: PropBotUser, status: 'active' | 'inactive' | 'suspended') => {
    setSelectedUser(user);
    setNewStatus(status);
    setIsStatusDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">Hoạt động</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">Không hoạt động</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">Đã khóa</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  const getPerformanceBadge = (performance: string) => {
    if (performance.startsWith('+')) {
      return <span className="text-green-500 font-medium">{performance}</span>;
    } else if (performance.startsWith('-')) {
      return <span className="text-red-500 font-medium">{performance}</span>;
    }
    return <span className="text-gray-500 font-medium">{performance}</span>;
  };

  const viewUserDetails = (user: PropBotUser) => {
    toast.info(`Xem thông tin chi tiết của ${user.name}`, {
      description: "Tính năng này đang được phát triển"
    });
  };

  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Người dùng đã tích hợp</CardTitle>
            <CardDescription>Danh sách người dùng đã tích hợp với Prop Trading Bot này</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsAddUserDialogOpen(true)}>
              <UserPlus className="h-4 w-4 mr-1" />
              Thêm người dùng
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm người dùng..."
            className="pl-9 bg-gray-900 border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow>
                <TableHead className="text-gray-400">Tên</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Ngày tích hợp</TableHead>
                <TableHead className="text-gray-400">Trạng thái</TableHead>
                <TableHead className="text-gray-400">Hiệu suất</TableHead>
                <TableHead className="text-gray-400 text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-gray-700/30">
                    <TableCell className="font-medium text-white">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.integrationDate}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getPerformanceBadge(user.performance)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => viewUserDetails(user)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Xem chi tiết
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => openStatusDialog(user, 'active')}
                            disabled={user.status === 'active'}
                          >
                            <UserCheck className="mr-2 h-4 w-4" />
                            Kích hoạt
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openStatusDialog(user, 'inactive')}
                            disabled={user.status === 'inactive'}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Vô hiệu hóa
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openStatusDialog(user, 'suspended')}
                            disabled={user.status === 'suspended'}
                            className="text-red-600"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Khóa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Xóa người dùng
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                    Không tìm thấy người dùng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
            <DialogDescription>
              Nhập email của người dùng để thêm họ vào bot này.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <Input
                id="email"
                placeholder="email@example.com"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAddUser}>Thêm người dùng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove User Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa người dùng</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser && (
                <>
                  Bạn có chắc chắn muốn xóa người dùng <strong>{selectedUser.name}</strong> khỏi bot này?
                  Người dùng sẽ mất quyền truy cập và không thể sử dụng bot.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveUser} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change User Status Dialog */}
      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thay đổi trạng thái người dùng</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser && (
                <>
                  Bạn có chắc chắn muốn thay đổi trạng thái của người dùng <strong>{selectedUser.name}</strong> thành <strong>{
                    newStatus === 'active' ? 'Hoạt động' : 
                    newStatus === 'inactive' ? 'Không hoạt động' : 
                    'Khóa'
                  }</strong>?
                  
                  {newStatus === 'active' && (
                    <p className="mt-2">Người dùng sẽ có thể sử dụng bot bình thường.</p>
                  )}
                  
                  {newStatus === 'inactive' && (
                    <p className="mt-2">Bot sẽ ngừng thực hiện giao dịch cho người dùng này.</p>
                  )}
                  
                  {newStatus === 'suspended' && (
                    <p className="mt-2 text-red-500">Người dùng sẽ bị khóa và không thể sử dụng bot cho đến khi được kích hoạt lại.</p>
                  )}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleUpdateUserStatus}
              className={newStatus === 'suspended' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default PropBotUsersTab;

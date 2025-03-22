
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, UserPlus, Filter, MoreHorizontal, Check, X, Eye, 
  Download, UserCog, Shield, Users, Bot, Package
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [planFilter, setPlanFilter] = useState<string | null>(null);
  const [botTypeFilter, setBotTypeFilter] = useState<string | null>(null);
  const [activityFilter, setActivityFilter] = useState<string | null>(null);
  
  // User statistics data
  const totalUsers = 6;
  const activeUsers = 4;
  const inactiveUsers = 1;
  const suspendedUsers = 1;
  const newUsersThisMonth = 2;
  
  const users = [
    { 
      id: 'USR-24051', 
      name: 'Nguyễn Văn A', 
      email: 'nguyenvana@example.com', 
      role: 'user', 
      status: 'active',
      plan: 'premium',
      bots: 3,
      botTypes: ['trading', 'crypto'],
      activity: 'high',
      joinDate: '15/08/2023'
    },
    { 
      id: 'USR-24052', 
      name: 'Trần Thị B', 
      email: 'tranthib@example.com', 
      role: 'user', 
      status: 'active',
      plan: 'basic',
      bots: 1,
      botTypes: ['forex'],
      activity: 'medium',
      joinDate: '03/10/2023'
    },
    { 
      id: 'USR-24053', 
      name: 'Lê Minh C', 
      email: 'leminhc@example.com', 
      role: 'user', 
      status: 'inactive',
      plan: 'basic',
      bots: 0,
      botTypes: [],
      activity: 'low',
      joinDate: '22/11/2023'
    },
    { 
      id: 'USR-24054', 
      name: 'Phạm Đức D', 
      email: 'phamducd@example.com', 
      role: 'user', 
      status: 'active',
      plan: 'premium',
      bots: 5,
      botTypes: ['trading', 'crypto', 'forex'],
      activity: 'high',
      joinDate: '05/01/2024'
    },
    { 
      id: 'USR-24055', 
      name: 'Vũ Văn F', 
      email: 'vuvanf@example.com', 
      role: 'user', 
      status: 'suspended',
      plan: 'basic',
      bots: 0,
      botTypes: [],
      activity: 'none',
      joinDate: '30/03/2024'
    },
    { 
      id: 'USR-24056', 
      name: 'Đỗ Thị G', 
      email: 'dothig@example.com', 
      role: 'user', 
      status: 'active',
      plan: 'trial',
      bots: 1,
      botTypes: ['crypto'],
      activity: 'medium',
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

  const handleUserCheckbox = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      toast.error("Vui lòng chọn ít nhất một người dùng");
      return;
    }

    switch (action) {
      case 'activate':
        toast.success(`Đã kích hoạt ${selectedUsers.length} tài khoản người dùng`);
        break;
      case 'suspend':
        toast.success(`Đã tạm khóa ${selectedUsers.length} tài khoản người dùng`);
        break;
      case 'premium':
        toast.success(`Đã nâng cấp ${selectedUsers.length} tài khoản lên gói Premium`);
        break;
      case 'basic':
        toast.success(`Đã chuyển ${selectedUsers.length} tài khoản sang gói Basic`);
        break;
      default:
        break;
    }
    
    // Đặt lại danh sách người dùng đã chọn sau khi thực hiện hành động
    setSelectedUsers([]);
    setSelectAll(false);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Tên', 'Email', 'Trạng thái', 'Gói dịch vụ', 'Số lượng bot', 'Ngày tham gia'];
    
    // Chuyển đổi dữ liệu người dùng thành định dạng CSV
    const userDataCSV = filteredUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.status === 'active' ? 'Hoạt động' : user.status === 'inactive' ? 'Không hoạt động' : 'Đã khóa',
      user.plan,
      user.bots.toString(),
      user.joinDate
    ]);
    
    // Kết hợp headers và dữ liệu
    const csvContent = [
      headers.join(','),
      ...userDataCSV.map(row => row.join(','))
    ].join('\n');
    
    // Tạo và tải xuống file CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `user_data_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Đã xuất dữ liệu người dùng thành công');
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
    )
    .filter(user => 
      (planFilter === null || user.plan === planFilter)
    )
    .filter(user => 
      (botTypeFilter === null || user.botTypes.includes(botTypeFilter))
    )
    .filter(user => 
      (activityFilter === null || user.activity === activityFilter)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-6">
            <p className="text-zinc-400 text-sm">Tổng người dùng</p>
            <h2 className="text-4xl font-bold mt-2 mb-4">{totalUsers}</h2>
            
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-green-500">Hoạt động</p>
                <p className="text-2xl font-semibold mt-1">{activeUsers}</p>
              </div>
              <div>
                <p className="text-yellow-500">Không hoạt động</p>
                <p className="text-2xl font-semibold mt-1">{inactiveUsers}</p>
              </div>
              <div>
                <p className="text-red-500">Đã khóa</p>
                <p className="text-2xl font-semibold mt-1">{suspendedUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-6">
            <p className="text-zinc-400 text-sm">Người dùng mới</p>
            <h2 className="text-4xl font-bold mt-2 mb-4">{newUsersThisMonth}</h2>
            
            <div>
              <p className="text-zinc-400 text-sm">Tháng này</p>
              <p className="text-2xl font-semibold mt-1 text-green-500">+{Math.round((newUsersThisMonth/totalUsers)*100)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả người dùng trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Bộ lọc bổ sung */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:max-w-[600px]">
                <Select value={planFilter || ""} onValueChange={(value) => setPlanFilter(value || null)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Gói dịch vụ" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="">Tất cả gói</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={botTypeFilter || ""} onValueChange={(value) => setBotTypeFilter(value || null)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Loại bot" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="">Tất cả loại</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={activityFilter || ""} onValueChange={(value) => setActivityFilter(value || null)}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Mức độ hoạt động" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="">Tất cả mức độ</SelectItem>
                    <SelectItem value="high">Cao</SelectItem>
                    <SelectItem value="medium">Trung bình</SelectItem>
                    <SelectItem value="low">Thấp</SelectItem>
                    <SelectItem value="none">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Các nút hành động hàng loạt */}
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-zinc-700 text-zinc-400"
                      disabled={selectedUsers.length === 0}
                    >
                      <UserCog className="h-4 w-4 mr-2" />
                      Thao tác ({selectedUsers.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900 text-white">
                    <DropdownMenuLabel>Hành động hàng loạt</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem 
                      className="focus:bg-zinc-800 cursor-pointer"
                      onClick={() => handleBulkAction('activate')}
                    >
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Kích hoạt tài khoản</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="focus:bg-zinc-800 cursor-pointer"
                      onClick={() => handleBulkAction('suspend')}
                    >
                      <X className="mr-2 h-4 w-4 text-red-500" />
                      <span>Tạm khóa tài khoản</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem 
                      className="focus:bg-zinc-800 cursor-pointer"
                      onClick={() => handleBulkAction('premium')}
                    >
                      <Package className="mr-2 h-4 w-4 text-amber-500" />
                      <span>Nâng cấp lên Premium</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="focus:bg-zinc-800 cursor-pointer"
                      onClick={() => handleBulkAction('basic')}
                    >
                      <Package className="mr-2 h-4 w-4 text-blue-500" />
                      <span>Chuyển sang Basic</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button 
                  variant="outline" 
                  className="border-zinc-700 text-zinc-400"
                  onClick={exportToCSV}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Xuất CSV
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-zinc-400 w-10">
                    <Checkbox 
                      className="border-zinc-600"
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="text-zinc-400 w-28">ID</TableHead>
                  <TableHead className="text-zinc-400">Tên</TableHead>
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Trạng thái</TableHead>
                  <TableHead className="text-zinc-400">Gói</TableHead>
                  <TableHead className="text-zinc-400 text-center">Bots</TableHead>
                  <TableHead className="text-zinc-400">Ngày tham gia</TableHead>
                  <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-zinc-800">
                      <TableCell>
                        <Checkbox
                          className="border-zinc-600"
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleUserCheckbox(user.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-zinc-400">{user.id}</TableCell>
                      <TableCell className="max-w-[150px] truncate font-medium">{user.name}</TableCell>
                      <TableCell className="max-w-[180px] truncate">{user.email}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell>
                        <PlanBadge plan={user.plan} />
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
                            <DropdownMenuItem className="focus:bg-zinc-800 cursor-pointer">
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
                            <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500 cursor-pointer">
                              <span>Xóa tài khoản</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
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

// Plan Badge Component
export const PlanBadge = ({ plan }: { plan: string }) => {
  switch(plan) {
    case 'premium':
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
          <Shield className="h-3 w-3 mr-1" />
          Premium
        </Badge>
      );
    case 'basic':
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          <Users className="h-3 w-3 mr-1" />
          Basic
        </Badge>
      );
    case 'trial':
      return (
        <Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border-0">
          <Bot className="h-3 w-3 mr-1" />
          Trial
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border-0">
          Không xác định
        </Badge>
      );
  }
};

export default AdminUsers;

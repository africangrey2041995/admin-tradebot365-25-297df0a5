
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, RefreshCw, UserPlus, UserCheck, ShieldAlert, FileEdit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Sample log data - focused on user and admin activities
  const logs = [
    { 
      id: 'LOG1001',
      type: 'user_registration',
      action: 'Đăng ký người dùng mới',
      userId: 'user_5892',
      userName: 'Nguyễn Văn A',
      userEmail: 'nguyenvana@example.com',
      ipAddress: '123.45.67.89',
      timestamp: '22/03/2024 15:45:23',
      details: 'Đăng ký qua email',
    },
    { 
      id: 'LOG1002',
      type: 'user_login',
      action: 'Đăng nhập',
      userId: 'user_4231',
      userName: 'Trần Thị B',
      userEmail: 'tranthib@example.com',
      ipAddress: '123.45.67.90',
      timestamp: '22/03/2024 15:42:18',
      details: 'Đăng nhập thành công',
    },
    { 
      id: 'LOG1003',
      type: 'admin_login',
      action: 'Admin đăng nhập',
      userId: 'admin_001',
      userName: 'Admin System',
      userEmail: 'admin@cointradebot.com',
      ipAddress: '123.45.67.91',
      timestamp: '22/03/2024 15:30:05',
      details: 'Đăng nhập thành công',
    },
    { 
      id: 'LOG1004',
      type: 'admin_action',
      action: 'Cập nhật thông tin bot',
      userId: 'admin_002',
      userName: 'Lê Admin',
      userEmail: 'le.admin@cointradebot.com',
      ipAddress: '123.45.67.92',
      timestamp: '22/03/2024 15:00:00',
      details: 'Đã cập nhật thông tin cho PRE-002',
    },
    { 
      id: 'LOG1005',
      type: 'user_login',
      action: 'Đăng nhập',
      userId: 'user_3451',
      userName: 'Phạm Văn C',
      userEmail: 'phamvanc@gmail.com',
      ipAddress: '123.45.67.93',
      timestamp: '22/03/2024 14:58:32',
      details: 'Đăng nhập thành công',
    },
    { 
      id: 'LOG1006',
      type: 'user_registration',
      action: 'Đăng ký người dùng mới',
      userId: 'user_5893',
      userName: 'Hoàng Thị D',
      userEmail: 'hoangthid@example.com',
      ipAddress: '123.45.67.94',
      timestamp: '22/03/2024 14:45:12',
      details: 'Đăng ký qua Google',
    },
    { 
      id: 'LOG1007',
      type: 'admin_action',
      action: 'Xóa bot người dùng',
      userId: 'admin_001',
      userName: 'Admin System',
      userEmail: 'admin@cointradebot.com',
      ipAddress: '123.45.67.95',
      timestamp: '22/03/2024 14:30:44',
      details: 'Đã xóa BOT1267 do vi phạm điều khoản',
    },
    { 
      id: 'LOG1008',
      type: 'user_login',
      action: 'Đăng nhập',
      userId: 'user_2983',
      userName: 'Vũ Minh E',
      userEmail: 'vuminhe@example.com',
      ipAddress: '123.45.67.96',
      timestamp: '22/03/2024 14:28:19',
      details: 'Đăng nhập thành công',
    },
    { 
      id: 'LOG1009',
      type: 'admin_action',
      action: 'Tạo bot premium mới',
      userId: 'admin_002',
      userName: 'Lê Admin',
      userEmail: 'le.admin@cointradebot.com',
      ipAddress: '123.45.67.97',
      timestamp: '22/03/2024 14:15:01',
      details: 'Đã tạo PRE-005',
    },
    { 
      id: 'LOG1010',
      type: 'user_registration',
      action: 'Đăng ký người dùng mới',
      userId: 'user_5894',
      userName: 'Đặng Văn F',
      userEmail: 'dangvanf@example.com',
      ipAddress: '123.45.67.98',
      timestamp: '22/03/2024 14:10:23',
      details: 'Đăng ký qua email',
    },
  ];

  // Filter logs based on search term, activity type, and active tab
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActivityType = activityTypeFilter === 'all' || log.type === activityTypeFilter;
    
    // Filter based on active tab
    const isUserActivity = log.type === 'user_registration' || log.type === 'user_login';
    const isAdminActivity = log.type === 'admin_login' || log.type === 'admin_action';
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'user' && isUserActivity) ||
      (activeTab === 'admin' && isAdminActivity);
    
    return matchesSearch && matchesActivityType && matchesTab;
  });

  const handleRefresh = () => {
    // In a real implementation, this would fetch fresh logs from the server
    console.log('Refreshing logs...');
    // For now, just show a message to the user
    alert('Đã làm mới nhật ký hoạt động');
  };

  const navigateToUserDetail = (userId: string) => {
    if (userId.startsWith('user_')) {
      navigate(`/admin/users/${userId.replace('user_', '')}`);
    } else if (userId.startsWith('admin_')) {
      navigate(`/admin/users/${userId.replace('admin_', '')}`);
    }
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'user_registration':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'user_login':
        return <UserCheck className="h-4 w-4 text-blue-500" />;
      case 'admin_login':
        return <ShieldAlert className="h-4 w-4 text-purple-500" />;
      case 'admin_action':
        return <FileEdit className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getActivityBadge = (type: string) => {
    switch(type) {
      case 'user_registration':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Đăng ký mới
          </Badge>
        );
      case 'user_login':
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
            Đăng nhập
          </Badge>
        );
      case 'admin_login':
        return (
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            Admin đăng nhập
          </Badge>
        );
      case 'admin_action':
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">
            Hành động Admin
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {type}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Nhật ký hoạt động hệ thống</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Download className="h-4 w-4 mr-2" />
            Xuất nhật ký
          </Button>
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Nhật ký người dùng & quản trị viên</CardTitle>
          <CardDescription className="text-zinc-400">
            Theo dõi hoạt động của người dùng và quản trị viên trên hệ thống.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-zinc-800 border-zinc-700">
              <TabsTrigger value="all">Tất cả hoạt động</TabsTrigger>
              <TabsTrigger value="user">Hoạt động người dùng</TabsTrigger>
              <TabsTrigger value="admin">Hoạt động quản trị</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:max-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input 
                placeholder="Tìm kiếm theo người dùng, email, hoặc hành động..." 
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={activityTypeFilter} onValueChange={setActivityTypeFilter}>
              <SelectTrigger className="w-[220px] bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Loại hoạt động" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="all">Tất cả hoạt động</SelectItem>
                <SelectItem value="user_registration">Đăng ký mới</SelectItem>
                <SelectItem value="user_login">Người dùng đăng nhập</SelectItem>
                <SelectItem value="admin_login">Admin đăng nhập</SelectItem>
                <SelectItem value="admin_action">Hành động của Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="text-zinc-400 w-[140px]">Loại hoạt động</TableHead>
                  <TableHead className="text-zinc-400">Hành động</TableHead>
                  <TableHead className="text-zinc-400 w-[140px]">ID người dùng</TableHead>
                  <TableHead className="text-zinc-400 w-[180px]">Tên người dùng</TableHead>
                  <TableHead className="text-zinc-400 w-[200px]">Email</TableHead>
                  <TableHead className="text-zinc-400 w-[150px]">Địa chỉ IP</TableHead>
                  <TableHead className="text-zinc-400 w-[180px]">Thời gian</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id} className="border-zinc-800">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActivityIcon(log.type)}
                          {getActivityBadge(log.type)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="font-medium">{log.action}</div>
                        <div className="text-xs text-zinc-400 mt-1">{log.details}</div>
                      </TableCell>
                      <TableCell>
                        <button 
                          onClick={() => navigateToUserDetail(log.userId)}
                          className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-md border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          {log.userId}
                        </button>
                      </TableCell>
                      <TableCell className="text-sm">{log.userName}</TableCell>
                      <TableCell className="text-sm text-zinc-400">{log.userEmail}</TableCell>
                      <TableCell className="text-sm font-mono text-zinc-400">{log.ipAddress}</TableCell>
                      <TableCell className="text-sm text-zinc-400">{log.timestamp}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-zinc-500">
                      Không tìm thấy nhật ký phù hợp với bộ lọc.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-zinc-400">
              Hiển thị <span className="font-medium text-white">1-{filteredLogs.length}</span> trong <span className="font-medium text-white">{logs.length}</span> mục
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                Trước
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                2
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

export default AdminLogs;

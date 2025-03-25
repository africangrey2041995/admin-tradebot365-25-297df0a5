
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

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
  
  const filteredUsers = MOCK_USERS.filter(user => 
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
    toast.info('Thêm người dùng mới', {
      description: 'Tính năng này đang được phát triển',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Hoạt động</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Không hoạt động</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Đã khóa</Badge>;
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

  return (
    <Card className="border-gray-700 bg-gray-800/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Người dùng đã tích hợp</CardTitle>
            <CardDescription>Danh sách người dùng đã tích hợp với Prop Trading Bot này</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAddUser}>
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
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-400">
                    Không tìm thấy người dùng nào
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropBotUsersTab;

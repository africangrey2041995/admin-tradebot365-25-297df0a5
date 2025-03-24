
import React, { useState } from 'react';
import { 
  PlusCircle, 
  Download, 
  Search, 
  RefreshCw, 
  Play, 
  Pause,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BotStatusBadge } from "@/components/admin/premium-bots/BotStatusBadge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { PropBot } from '@/types';
import { BotStatus, BotRiskLevel } from '@/constants/botTypes';
import { mockPropBots } from '@/mocks/propBotsMock';

const PropBotStatsCards = () => {
  // Calculate stats from mock data
  const totalBots = mockPropBots.length;
  const totalAccounts = mockPropBots.reduce((sum, bot) => sum + bot.users, 0);
  const activeBots = mockPropBots.filter(bot => bot.status === BotStatus.ACTIVE).length;
  const performanceRate = Math.round((activeBots / totalBots) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng Prop Bots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBots}</div>
          <p className="text-xs text-muted-foreground">
            {activeBots} bot đang hoạt động, {totalBots - activeBots} tạm dừng
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAccounts}</div>
          <p className="text-xs text-muted-foreground">
            Tài khoản người dùng đang sử dụng prop bots
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hiệu suất tổng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{performanceRate}%</div>
          <p className="text-xs text-muted-foreground">
            Tỷ lệ bots đang hoạt động hiệu quả
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

const PropBots: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Filter and pagination logic
  const filteredBots = mockPropBots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bot.botId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bot.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBots = filteredBots.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBots.length / itemsPerPage);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Prop Trading Bots</h1>
          <p className="text-muted-foreground">
            Quản lý và cấu hình các Prop Trading Bots trong hệ thống
          </p>
        </div>
        <Button onClick={() => console.log('Add new prop bot')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Thêm Prop Bot mới
        </Button>
      </div>

      <PropBotStatsCards />

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên Bot hoặc ID..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value={BotStatus.ACTIVE}>Đang hoạt động</SelectItem>
              <SelectItem value={BotStatus.INACTIVE}>Không hoạt động</SelectItem>
              <SelectItem value={BotStatus.MAINTENANCE}>Đang bảo trì</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Xuất dữ liệu
          </Button>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          <Play className="h-4 w-4 mr-2" />
          Kích hoạt
        </Button>
        <Button variant="outline" size="sm">
          <Pause className="h-4 w-4 mr-2" />
          Tạm dừng
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Danh sách Prop Trading Bots</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên Bot</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Tài khoản</TableHead>
                <TableHead>Lợi nhuận</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Tác vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBots.map((bot) => (
                <TableRow key={bot.botId}>
                  <TableCell className="font-medium">
                    <Badge variant="outline">{bot.botId}</Badge>
                  </TableCell>
                  <TableCell>{bot.name}</TableCell>
                  <TableCell>
                    <BotStatusBadge status={bot.status} />
                  </TableCell>
                  <TableCell>{bot.users}</TableCell>
                  <TableCell className={`${parseFloat(bot.profit) >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                    {bot.profit}
                  </TableCell>
                  <TableCell>{formatDate(bot.createdDate)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('View details', bot.botId)}>
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit', bot.botId)}>
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete', bot.botId)}>
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {currentBots.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Không tìm thấy bot nào phù hợp với tìm kiếm
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropBots;

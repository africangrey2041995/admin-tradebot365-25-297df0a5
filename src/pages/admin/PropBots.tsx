
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
import { PremiumBotStatsCards } from "@/components/admin/premium-bots/PremiumBotStatsCards";

const PropBotStatsCards = () => {
  // Calculate stats from mock data
  const totalBots = mockPropBots.length;
  const totalAccounts = mockPropBots.reduce((sum, bot) => sum + bot.users, 0);
  const activeBots = mockPropBots.filter(bot => bot.status === BotStatus.ACTIVE).length;
  const performanceRate = Math.round((activeBots / totalBots) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng Prop Bots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalBots}</div>
          <p className="text-xs text-zinc-400">
            {activeBots} bot đang hoạt động, {totalBots - activeBots} tạm dừng
          </p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Tổng tài khoản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalAccounts}</div>
          <p className="text-xs text-zinc-400">
            Tài khoản người dùng đang sử dụng prop bots
          </p>
        </CardContent>
      </Card>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-zinc-200">Hiệu suất tổng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">{performanceRate}%</div>
          <p className="text-xs text-zinc-400">
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
          <h1 className="text-2xl font-bold text-white">Quản lý Prop Trading Bots</h1>
          <p className="text-zinc-400">
            Quản lý và cấu hình các Prop Trading Bots trong hệ thống
          </p>
        </div>
        <Button className="bg-tradebot text-zinc-900 hover:bg-tradebot/90" onClick={() => console.log('Add new prop bot')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Thêm Prop Bot mới
        </Button>
      </div>

      <PropBotStatsCards />

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Tìm kiếm theo tên Bot hoặc ID..."
              className="pl-8 bg-zinc-800 border-zinc-700 text-white"
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
            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value={BotStatus.ACTIVE}>Đang hoạt động</SelectItem>
              <SelectItem value={BotStatus.INACTIVE}>Không hoạt động</SelectItem>
              <SelectItem value={BotStatus.MAINTENANCE}>Đang bảo trì</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            <Download className="h-4 w-4 mr-2" />
            Xuất dữ liệu
          </Button>
        </div>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="border-zinc-700 text-green-500 hover:bg-zinc-800">
          <Play className="h-4 w-4 mr-2" />
          Kích hoạt
        </Button>
        <Button variant="outline" size="sm" className="border-zinc-700 text-yellow-500 hover:bg-zinc-800">
          <Pause className="h-4 w-4 mr-2" />
          Tạm dừng
        </Button>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2 border-b border-zinc-800">
          <CardTitle className="text-lg text-white">Danh sách Prop Trading Bots</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="border-zinc-800">
            <TableHeader className="bg-zinc-950">
              <TableRow className="hover:bg-zinc-900/50 border-zinc-800">
                <TableHead className="text-zinc-400">ID</TableHead>
                <TableHead className="text-zinc-400">Tên Bot</TableHead>
                <TableHead className="text-zinc-400">Trạng thái</TableHead>
                <TableHead className="text-zinc-400">Tài khoản</TableHead>
                <TableHead className="text-zinc-400">Lợi nhuận</TableHead>
                <TableHead className="text-zinc-400">Ngày tạo</TableHead>
                <TableHead className="text-right text-zinc-400">Tác vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBots.map((bot) => (
                <TableRow key={bot.botId} className="hover:bg-zinc-800/50 border-zinc-800">
                  <TableCell className="font-medium text-zinc-300">
                    <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-300">{bot.botId}</Badge>
                  </TableCell>
                  <TableCell className="text-white">{bot.name}</TableCell>
                  <TableCell>
                    <BotStatusBadge status={bot.status} />
                  </TableCell>
                  <TableCell className="text-zinc-300">{bot.users}</TableCell>
                  <TableCell className={`${parseFloat(bot.profit) >= 0 ? 'text-green-500' : 'text-red-500'} font-medium`}>
                    {bot.profit}
                  </TableCell>
                  <TableCell className="text-zinc-300">{formatDate(bot.createdDate)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-white">
                        <DropdownMenuItem onClick={() => console.log('View details', bot.botId)} className="hover:bg-zinc-800 cursor-pointer">
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit', bot.botId)} className="hover:bg-zinc-800 cursor-pointer">
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Delete', bot.botId)} className="text-red-500 hover:bg-zinc-800 hover:text-red-400 cursor-pointer">
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {currentBots.length === 0 && (
                <TableRow className="border-zinc-800">
                  <TableCell colSpan={7} className="h-24 text-center text-zinc-400">
                    Không tìm thấy bot nào phù hợp với tìm kiếm
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="mt-4 p-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} text-zinc-400 hover:text-white`}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} text-zinc-400 hover:text-white`}
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

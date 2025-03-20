
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Play, Pause, Settings, Trash2, Plus } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const AdminBots = () => {
  const bots = [
    { 
      id: '1', 
      name: 'DCA Bot Premium', 
      type: 'premium',
      status: 'active',
      users: 48,
      profit: '+18.5%',
      createdDate: '10/02/2024'
    },
    { 
      id: '2', 
      name: 'Grid Trading Bot', 
      type: 'standard',
      status: 'active',
      users: 124,
      profit: '+12.3%',
      createdDate: '15/12/2023'
    },
    { 
      id: '3', 
      name: 'Martingale Bot V2', 
      type: 'premium',
      status: 'inactive',
      users: 12,
      profit: '-2.1%',
      createdDate: '05/03/2024'
    },
    { 
      id: '4', 
      name: 'Arbitrage Bot', 
      type: 'prop',
      status: 'active',
      users: 37,
      profit: '+9.7%',
      createdDate: '22/01/2024'
    },
    { 
      id: '5', 
      name: 'Trend Following Bot', 
      type: 'standard',
      status: 'maintenance',
      users: 72,
      profit: '+5.2%',
      createdDate: '18/11/2023'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Bot</h1>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Thêm Bot mới
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Danh sách Bot</CardTitle>
          <CardDescription className="text-zinc-400">
            Quản lý tất cả Bot trong hệ thống Trade Bot 365.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:max-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input 
                placeholder="Tìm kiếm Bot..." 
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
                <TableHead className="text-zinc-400">Tên Bot</TableHead>
                <TableHead className="text-zinc-400">Loại</TableHead>
                <TableHead className="text-zinc-400">Trạng thái</TableHead>
                <TableHead className="text-zinc-400 text-right">Người dùng</TableHead>
                <TableHead className="text-zinc-400 text-right">Lợi nhuận</TableHead>
                <TableHead className="text-zinc-400">Ngày tạo</TableHead>
                <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bots.map((bot) => (
                <TableRow key={bot.id} className="border-zinc-800">
                  <TableCell className="font-medium">{bot.name}</TableCell>
                  <TableCell>
                    <BotTypeBadge type={bot.type} />
                  </TableCell>
                  <TableCell>
                    <BotStatusBadge status={bot.status} />
                  </TableCell>
                  <TableCell className="text-right">{bot.users}</TableCell>
                  <TableCell className={`text-right ${bot.profit.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {bot.profit}
                  </TableCell>
                  <TableCell>{bot.createdDate}</TableCell>
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
                        <DropdownMenuItem className="focus:bg-zinc-800">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-800">
                          {bot.status === 'active' ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              <span>Tạm dừng</span>
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              <span>Kích hoạt</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Xóa Bot</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-zinc-400">
              Hiển thị <span className="font-medium text-white">1-5</span> trong <span className="font-medium text-white">5</span> Bot
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

// Bot Type Badge Component
const BotTypeBadge = ({ type }: { type: string }) => {
  switch(type) {
    case 'premium':
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
          Premium
        </Badge>
      );
    case 'prop':
      return (
        <Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border-0">
          Prop Trading
        </Badge>
      );
    default:
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          Tiêu chuẩn
        </Badge>
      );
  }
};

// Bot Status Badge Component
const BotStatusBadge = ({ status }: { status: string }) => {
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
    case 'maintenance':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-blue-500">Bảo trì</span>
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

export default AdminBots;

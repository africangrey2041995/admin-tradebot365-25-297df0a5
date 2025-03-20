
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Database, ArrowUpDown, Clock, RefreshCw, Server, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AdminDatabase = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Cơ sở dữ liệu</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-400">
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Database className="h-4 w-4 mr-2" />
            Sao lưu ngay
          </Button>
        </div>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Kích thước cơ sở dữ liệu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8 GB</div>
            <div className="text-xs text-zinc-400 mt-1">Tăng 1.2 GB trong 30 ngày qua</div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Sử dụng</span>
                <span className="text-zinc-300">65%</span>
              </div>
              <Progress value={65} className="h-1 bg-zinc-800" indicatorClassName="bg-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Thời gian phản hồi truy vấn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185 ms</div>
            <div className="text-xs text-green-500 mt-1">Giảm 12% so với tháng trước</div>
            <div className="mt-6 flex items-center">
              <Clock className="h-4 w-4 text-zinc-500 mr-2" />
              <span className="text-xs text-zinc-400">Trung bình trong 24h qua</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Sao lưu gần nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/04/2024</div>
            <div className="text-xs text-zinc-400 mt-1">2 ngày trước, kích thước: 22.4 GB</div>
            <div className="mt-6 flex items-center">
              <Server className="h-4 w-4 text-zinc-500 mr-2" />
              <span className="text-xs text-zinc-400">Đồng bộ hóa với máy chủ dự phòng</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Database Tables */}
      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle>Bảng dữ liệu</CardTitle>
          <CardDescription className="text-zinc-400">
            Danh sách các bảng và cấu trúc trong cơ sở dữ liệu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:max-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input 
                placeholder="Tìm kiếm bảng..." 
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
                <TableHead className="text-zinc-400">
                  <div className="flex items-center">
                    Tên bảng
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-zinc-400">Kích thước</TableHead>
                <TableHead className="text-zinc-400 text-right">Số dòng</TableHead>
                <TableHead className="text-zinc-400">Cập nhật cuối</TableHead>
                <TableHead className="text-zinc-400">Trạng thái</TableHead>
                <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { name: 'users', size: '520 MB', rows: '1,248', lastUpdate: '5 phút trước', status: 'healthy' },
                { name: 'bots', size: '340 MB', rows: '324', lastUpdate: '20 phút trước', status: 'healthy' },
                { name: 'transactions', size: '12.3 GB', rows: '2,456,789', lastUpdate: '2 phút trước', status: 'healthy' },
                { name: 'bot_logs', size: '8.7 GB', rows: '1,856,452', lastUpdate: '1 phút trước', status: 'healthy' },
                { name: 'accounts', size: '780 MB', rows: '3,567', lastUpdate: '15 phút trước', status: 'warning' },
                { name: 'settings', size: '120 KB', rows: '48', lastUpdate: '2 giờ trước', status: 'healthy' },
              ].map((table, index) => (
                <TableRow key={index} className="border-zinc-800">
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2 text-zinc-500" />
                      {table.name}
                    </div>
                  </TableCell>
                  <TableCell>{table.size}</TableCell>
                  <TableCell className="text-right">{table.rows}</TableCell>
                  <TableCell>{table.lastUpdate}</TableCell>
                  <TableCell>
                    <DatabaseStatusBadge status={table.status} />
                  </TableCell>
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
                          <span>Xem cấu trúc</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-800">
                          <span>Tối ưu hóa</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-800">
                          <span>Sao lưu</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Database Status Badge
const DatabaseStatusBadge = ({ status }: { status: string }) => {
  switch(status) {
    case 'healthy':
      return (
        <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0">
          Tốt
        </Badge>
      );
    case 'warning':
      return (
        <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-0">
          Cần chú ý
        </Badge>
      );
    case 'critical':
      return (
        <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-0">
          Nghiêm trọng
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30 border-0">
          Không xác định
        </Badge>
      );
  }
};

export default AdminDatabase;

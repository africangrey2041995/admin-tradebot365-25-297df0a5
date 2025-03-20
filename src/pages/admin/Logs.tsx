
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, RefreshCw, AlertCircle, Info, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminLogs = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Nhật ký hệ thống</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-400">
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
          <CardTitle>Nhật ký hoạt động</CardTitle>
          <CardDescription className="text-zinc-400">
            Xem nhật ký hệ thống để theo dõi và khắc phục sự cố.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full sm:max-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
              <Input 
                placeholder="Tìm kiếm nhật ký..." 
                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="all">Tất cả mức độ</SelectItem>
                <SelectItem value="error">Lỗi</SelectItem>
                <SelectItem value="warning">Cảnh báo</SelectItem>
                <SelectItem value="info">Thông tin</SelectItem>
                <SelectItem value="success">Thành công</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-zinc-700 text-zinc-400">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead className="text-zinc-400 w-[100px]">Mức độ</TableHead>
                <TableHead className="text-zinc-400">Thông điệp</TableHead>
                <TableHead className="text-zinc-400 w-[200px]">Nguồn</TableHead>
                <TableHead className="text-zinc-400 w-[180px]">Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { 
                  level: 'error', 
                  message: 'Không thể kết nối đến sàn Binance API: Connection timed out',
                  source: 'ExchangeConnector',
                  timestamp: '14/04/2024 15:45:23'
                },
                { 
                  level: 'warning', 
                  message: 'Bot DCA Premium tự động khởi động lại sau khi phát hiện lỗi',
                  source: 'BotManager',
                  timestamp: '14/04/2024 15:42:18'
                },
                { 
                  level: 'info', 
                  message: 'Người dùng mới đăng ký: nguyenvana@example.com',
                  source: 'UserService',
                  timestamp: '14/04/2024 15:30:05'
                },
                { 
                  level: 'success', 
                  message: 'Sao lưu cơ sở dữ liệu tự động hoàn tất thành công',
                  source: 'DatabaseService',
                  timestamp: '14/04/2024 15:00:00'
                },
                { 
                  level: 'info', 
                  message: 'Bot Grid Trading đã mở lệnh mua BTC tại giá $62,450',
                  source: 'TradingEngine',
                  timestamp: '14/04/2024 14:58:32'
                },
                { 
                  level: 'error', 
                  message: 'Lỗi xác thực API key cho tài khoản #2456',
                  source: 'AccountService',
                  timestamp: '14/04/2024 14:45:12'
                },
                { 
                  level: 'warning', 
                  message: 'Tài nguyên CPU đạt ngưỡng 85% trong 5 phút',
                  source: 'SystemMonitor',
                  timestamp: '14/04/2024 14:30:44'
                },
                { 
                  level: 'success', 
                  message: 'Bot Arbitrage đã hoàn tất giao dịch với lợi nhuận +0.8%',
                  source: 'TradingEngine',
                  timestamp: '14/04/2024 14:28:19'
                },
                { 
                  level: 'info', 
                  message: 'Cập nhật phiên bản hệ thống thành v2.5.1 đã sẵn sàng',
                  source: 'UpdateService',
                  timestamp: '14/04/2024 14:15:01'
                },
              ].map((log, index) => (
                <TableRow key={index} className="border-zinc-800">
                  <TableCell>
                    <LogLevelBadge level={log.level} />
                  </TableCell>
                  <TableCell className="text-sm">{log.message}</TableCell>
                  <TableCell className="text-sm text-zinc-400">{log.source}</TableCell>
                  <TableCell className="text-sm text-zinc-400">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-zinc-400">
              Hiển thị <span className="font-medium text-white">1-9</span> trong <span className="font-medium text-white">2,458</span> mục
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
                3
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                ...
              </Button>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                273
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

// Log Level Badge
const LogLevelBadge = ({ level }: { level: string }) => {
  switch(level) {
    case 'error':
      return (
        <div className="flex items-center">
          <XCircle className="h-4 w-4 text-red-500 mr-1" />
          <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-0">
            Lỗi
          </Badge>
        </div>
      );
    case 'warning':
      return (
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
          <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-0">
            Cảnh báo
          </Badge>
        </div>
      );
    case 'info':
      return (
        <div className="flex items-center">
          <Info className="h-4 w-4 text-blue-500 mr-1" />
          <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
            Thông tin
          </Badge>
        </div>
      );
    case 'success':
      return (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
          <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0">
            Thành công
          </Badge>
        </div>
      );
    default:
      return (
        <Badge className="bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30 border-0">
          {level}
        </Badge>
      );
  }
};

export default AdminLogs;

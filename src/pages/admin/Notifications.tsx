
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Plus, Send, Edit, Trash2, Bell, Target } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminNotifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý thông báo</h1>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Tạo thông báo mới
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="scheduled">Đã lên lịch</TabsTrigger>
          <TabsTrigger value="sent">Đã gửi</TabsTrigger>
          <TabsTrigger value="draft">Bản nháp</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Danh sách thông báo</CardTitle>
              <CardDescription className="text-zinc-400">
                Quản lý và theo dõi tất cả thông báo trong hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative w-full sm:max-w-[400px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                  <Input 
                    placeholder="Tìm kiếm thông báo..." 
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
                    <TableHead className="text-zinc-400">Tiêu đề</TableHead>
                    <TableHead className="text-zinc-400">Loại</TableHead>
                    <TableHead className="text-zinc-400">Đối tượng</TableHead>
                    <TableHead className="text-zinc-400">Trạng thái</TableHead>
                    <TableHead className="text-zinc-400">Thời gian</TableHead>
                    <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      title: 'Cập nhật hệ thống v2.5.1', 
                      type: 'system',
                      target: 'all',
                      status: 'scheduled',
                      time: '15/04/2024 10:00',
                    },
                    { 
                      title: 'Bot Premium DCA V2 đã ra mắt', 
                      type: 'marketing',
                      target: 'free_users',
                      status: 'sent',
                      time: '12/04/2024 08:30',
                    },
                    { 
                      title: 'Bảo trì hệ thống theo lịch', 
                      type: 'system',
                      target: 'all',
                      status: 'sent',
                      time: '10/04/2024 22:00',
                    },
                    { 
                      title: 'Khuyến mãi giảm giá 20% cho gói Premium', 
                      type: 'marketing',
                      target: 'selected',
                      status: 'draft',
                      time: 'Chưa lên lịch',
                    },
                    { 
                      title: 'Cảnh báo về sự cố API Binance', 
                      type: 'alert',
                      target: 'binance_users',
                      status: 'sent',
                      time: '08/04/2024 14:15',
                    },
                    { 
                      title: 'Hướng dẫn cài đặt bot mới', 
                      type: 'guide',
                      target: 'new_users',
                      status: 'draft',
                      time: 'Chưa lên lịch',
                    },
                  ].map((notification, index) => (
                    <TableRow key={index} className="border-zinc-800">
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>
                        <NotificationTypeBadge type={notification.type} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Target className="h-3 w-3 text-zinc-500 mr-1" />
                          <span className="text-sm">{getTargetLabel(notification.target)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <NotificationStatusBadge status={notification.status} />
                      </TableCell>
                      <TableCell className="text-sm text-zinc-400">{notification.time}</TableCell>
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
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                            {notification.status !== 'sent' && (
                              <DropdownMenuItem className="focus:bg-zinc-800">
                                <Send className="mr-2 h-4 w-4" />
                                <span>Gửi ngay</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-800 text-red-500 focus:text-red-500">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Xóa</span>
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
                  Hiển thị <span className="font-medium text-white">1-6</span> trong <span className="font-medium text-white">6</span> thông báo
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

          {/* Notification Stats Card */}
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 text-amber-500 mr-2" />
                Thống kê thông báo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Tổng số thông báo</div>
                  <div className="text-2xl font-bold">48</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Đã gửi (30 ngày)</div>
                  <div className="text-2xl font-bold">32</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Tỷ lệ mở</div>
                  <div className="text-2xl font-bold text-green-500">68%</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Tỷ lệ tương tác</div>
                  <div className="text-2xl font-bold text-amber-500">42%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab thông báo đã lên lịch sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
        
        <TabsContent value="sent">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab thông báo đã gửi sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
        
        <TabsContent value="draft">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab thông báo bản nháp sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get target label
const getTargetLabel = (target: string): string => {
  switch(target) {
    case 'all':
      return 'Tất cả người dùng';
    case 'free_users':
      return 'Người dùng miễn phí';
    case 'premium_users':
      return 'Người dùng premium';
    case 'new_users':
      return 'Người dùng mới';
    case 'binance_users':
      return 'Người dùng Binance';
    case 'selected':
      return 'Đối tượng đã chọn';
    default:
      return target;
  }
};

// Notification Type Badge
const NotificationTypeBadge = ({ type }: { type: string }) => {
  switch(type) {
    case 'system':
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          Hệ thống
        </Badge>
      );
    case 'marketing':
      return (
        <Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border-0">
          Marketing
        </Badge>
      );
    case 'alert':
      return (
        <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-0">
          Cảnh báo
        </Badge>
      );
    case 'guide':
      return (
        <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0">
          Hướng dẫn
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30 border-0">
          {type}
        </Badge>
      );
  }
};

// Notification Status Badge
const NotificationStatusBadge = ({ status }: { status: string }) => {
  switch(status) {
    case 'sent':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-green-500">Đã gửi</span>
        </div>
      );
    case 'scheduled':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
          <span className="text-amber-500">Đã lên lịch</span>
        </div>
      );
    case 'draft':
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-blue-500">Bản nháp</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-zinc-500 mr-2"></div>
          <span className="text-zinc-500">{status}</span>
        </div>
      );
  }
};

export default AdminNotifications;

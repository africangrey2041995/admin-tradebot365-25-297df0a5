
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, MoreHorizontal, Copy, Edit, Eye, Trash2, Mail } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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

const AdminEmail = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Quản lý Email</h1>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Tạo mẫu email mới
        </Button>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="templates">Mẫu email</TabsTrigger>
          <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
          <TabsTrigger value="stats">Thống kê</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4 mt-6">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Danh sách mẫu email</CardTitle>
              <CardDescription className="text-zinc-400">
                Quản lý các mẫu email được sử dụng trong hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative w-full sm:max-w-[400px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                  <Input 
                    placeholder="Tìm kiếm mẫu email..." 
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
                    <TableHead className="text-zinc-400">Tên mẫu</TableHead>
                    <TableHead className="text-zinc-400">Chủ đề</TableHead>
                    <TableHead className="text-zinc-400">Danh mục</TableHead>
                    <TableHead className="text-zinc-400 text-right">Tỷ lệ mở</TableHead>
                    <TableHead className="text-zinc-400">Cập nhật</TableHead>
                    <TableHead className="text-zinc-400 text-right">Tác vụ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      name: 'Chào mừng', 
                      subject: 'Chào mừng bạn đến với Trade Bot 365',
                      category: 'onboarding',
                      openRate: '82%',
                      updated: '05/04/2024',
                    },
                    { 
                      name: 'Quên mật khẩu', 
                      subject: 'Đặt lại mật khẩu tài khoản Trade Bot 365',
                      category: 'account',
                      openRate: '76%',
                      updated: '10/03/2024',
                    },
                    { 
                      name: 'Bot trading mới', 
                      subject: 'Khám phá bot trading mới từ Trade Bot 365',
                      category: 'marketing',
                      openRate: '58%',
                      updated: '22/03/2024',
                    },
                    { 
                      name: 'Xác nhận đăng ký', 
                      subject: 'Xác nhận đăng ký tài khoản Trade Bot 365',
                      category: 'account',
                      openRate: '91%',
                      updated: '15/01/2024',
                    },
                    { 
                      name: 'Báo cáo hiệu suất', 
                      subject: 'Báo cáo hiệu suất bot hàng tuần',
                      category: 'report',
                      openRate: '64%',
                      updated: '12/04/2024',
                    },
                    { 
                      name: 'Thông báo thanh toán', 
                      subject: 'Xác nhận thanh toán thành công',
                      category: 'billing',
                      openRate: '88%',
                      updated: '01/04/2024',
                    },
                  ].map((template, index) => (
                    <TableRow key={index} className="border-zinc-800">
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell className="text-sm">{template.subject}</TableCell>
                      <TableCell>
                        <EmailCategoryBadge category={template.category} />
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-500">{template.openRate}</span>
                      </TableCell>
                      <TableCell className="text-sm text-zinc-400">{template.updated}</TableCell>
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
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Xem trước</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-800">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Chỉnh sửa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-800">
                              <Copy className="mr-2 h-4 w-4" />
                              <span>Nhân bản</span>
                            </DropdownMenuItem>
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
                  Hiển thị <span className="font-medium text-white">1-6</span> trong <span className="font-medium text-white">12</span> mẫu
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

          {/* Test Email Card */}
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-2" />
                Gửi email kiểm tra
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Gửi email kiểm tra để xác nhận mẫu email hoạt động chính xác.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Địa chỉ email</label>
                  <Input 
                    placeholder="email@example.com" 
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Chọn mẫu</label>
                  <select className="w-full h-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white">
                    <option value="">Chọn mẫu email</option>
                    <option value="welcome">Chào mừng</option>
                    <option value="password-reset">Quên mật khẩu</option>
                    <option value="verification">Xác nhận đăng ký</option>
                    <option value="report">Báo cáo hiệu suất</option>
                    <option value="payment">Thông báo thanh toán</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Ghi chú (tùy chọn)</label>
                <Textarea 
                  placeholder="Nhập ghi chú về việc kiểm tra..." 
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="flex justify-end">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Mail className="h-4 w-4 mr-2" />
                  Gửi email kiểm tra
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab chiến dịch email sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab thống kê email sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Email Category Badge
const EmailCategoryBadge = ({ category }: { category: string }) => {
  switch(category) {
    case 'onboarding':
      return (
        <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0">
          Onboarding
        </Badge>
      );
    case 'account':
      return (
        <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-0">
          Tài khoản
        </Badge>
      );
    case 'marketing':
      return (
        <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 border-0">
          Marketing
        </Badge>
      );
    case 'report':
      return (
        <Badge className="bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500/30 border-0">
          Báo cáo
        </Badge>
      );
    case 'billing':
      return (
        <Badge className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border-0">
          Thanh toán
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/30 border-0">
          {category}
        </Badge>
      );
  }
};

export default AdminEmail;

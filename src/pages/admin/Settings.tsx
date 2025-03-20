
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Shield, 
  Bell, 
  Database, 
  Server, 
  Cloud, 
  Key, 
  Gauge, 
  Zap, 
  Save
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Cài đặt hệ thống</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:w-auto">
          <TabsTrigger value="general" className="text-xs md:text-sm">
            <Settings className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Chung</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs md:text-sm">
            <Shield className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Bảo mật</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm">
            <Bell className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Thông báo</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="text-xs md:text-sm">
            <Database className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Cơ sở dữ liệu</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="text-xs md:text-sm">
            <Key className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">API</span>
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Cài đặt chung</CardTitle>
              <CardDescription className="text-zinc-400">
                Điều chỉnh các cài đặt chung cho toàn bộ hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Tên ứng dụng</label>
                  <Input 
                    defaultValue="Trade Bot 365" 
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Logo URL</label>
                  <Input 
                    defaultValue="/logo.png" 
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Mô tả ngắn</label>
                  <Textarea 
                    defaultValue="Nền tảng giao dịch bot tiền điện tử tự động hàng đầu Việt Nam" 
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>

              <Separator className="bg-zinc-800" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Hiệu suất và Tính năng</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Chế độ bảo trì</div>
                    <div className="text-sm text-zinc-400">Chuyển hệ thống sang chế độ bảo trì</div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Đăng ký người dùng mới</div>
                    <div className="text-sm text-zinc-400">Cho phép người dùng mới đăng ký tài khoản</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Tự động sao lưu</div>
                    <div className="text-sm text-zinc-400">Sao lưu tự động hàng ngày</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4 mt-6">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
              <CardDescription className="text-zinc-400">
                Cấu hình các tùy chọn bảo mật cho hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cài đặt xác thực</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Yêu cầu 2FA cho Admin</div>
                    <div className="text-sm text-zinc-400">Buộc tất cả tài khoản admin sử dụng 2FA</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Giới hạn đăng nhập thất bại</div>
                    <div className="text-sm text-zinc-400">Tạm khóa tài khoản sau 5 lần đăng nhập thất bại</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Thời gian hết hạn phiên</label>
                  <select className="w-full h-10 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white">
                    <option value="15">15 phút</option>
                    <option value="30">30 phút</option>
                    <option value="60" selected>60 phút</option>
                    <option value="120">2 giờ</option>
                    <option value="240">4 giờ</option>
                  </select>
                </div>
              </div>

              <Separator className="bg-zinc-800" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Bảo mật nâng cao</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Bảo vệ CSRF</div>
                    <div className="text-sm text-zinc-400">Bảo vệ chống tấn công Cross-Site Request Forgery</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Rate limiting</div>
                    <div className="text-sm text-zinc-400">Giới hạn số lượng yêu cầu từ cùng một IP</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Ghi nhật ký bảo mật chi tiết</div>
                    <div className="text-sm text-zinc-400">Ghi lại tất cả các hoạt động nhạy cảm</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab thông báo sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
        
        {/* Database Settings */}
        <TabsContent value="database">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab cơ sở dữ liệu sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
        
        {/* API Settings */}
        <TabsContent value="api">
          <div className="text-zinc-400 text-sm mt-6">
            Nội dung cho tab API sẽ được hiển thị ở đây.
          </div>
        </TabsContent>
      </Tabs>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-zinc-400">Tài nguyên CPU</CardTitle>
              <div className="bg-zinc-800 p-2 rounded-md">
                <Gauge className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <div className="text-xs text-green-500 mt-1">Ổn định</div>
            <div className="w-full h-2 bg-zinc-800 rounded-full mt-4">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-zinc-400">Bộ nhớ RAM</CardTitle>
              <div className="bg-zinc-800 p-2 rounded-md">
                <Server className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="text-xs text-yellow-500 mt-1">Cao</div>
            <div className="w-full h-2 bg-zinc-800 rounded-full mt-4">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900 text-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-zinc-400">Tốc độ máy chủ</CardTitle>
              <div className="bg-zinc-800 p-2 rounded-md">
                <Zap className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120ms</div>
            <div className="text-xs text-green-500 mt-1">Tốt</div>
            <div className="flex items-center justify-between mt-4 text-xs text-zinc-400">
              <span>0ms</span>
              <span>250ms</span>
              <span>500ms</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full mt-1">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;

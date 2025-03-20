
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Users, Bot, TrendingUp, Bell, Calendar, ArrowUpRight } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Bảng điều khiển</h1>
        <span className="text-sm text-zinc-400">
          Cập nhật cuối: {new Date().toLocaleDateString('vi-VN', { 
            day: '2-digit', 
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Tổng người dùng" 
          value="1,248" 
          change="+12.5%" 
          trend="up"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard 
          title="Bots đang hoạt động" 
          value="324" 
          change="+18.2%" 
          trend="up"
          icon={<Bot className="h-4 w-4" />}
        />
        <StatsCard 
          title="Lợi nhuận tháng" 
          value="14.6%" 
          change="+3.2%" 
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard 
          title="Thông báo mới" 
          value="32" 
          change="-5.4%" 
          trend="down"
          icon={<Bell className="h-4 w-4" />}
        />
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
          <TabsTrigger value="bots">Bot</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-500" />
                <span>Hoạt động hệ thống</span>
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Tổng quan hoạt động của hệ thống trong 30 ngày qua.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed border-zinc-700 rounded-lg">
                <span className="text-zinc-500">Biểu đồ hoạt động</span>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-800 text-zinc-400 text-sm">
              <div className="flex justify-between w-full">
                <span>Cập nhật gần đây nhất: 5 phút trước</span>
                <span className="flex items-center text-amber-500 hover:text-amber-400 cursor-pointer">
                  <span className="mr-1">Xem chi tiết</span>
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-500" />
                  <span>Sự kiện hôm nay</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-6">
                  <EventItem
                    time="09:00"
                    title="Bảo trì hệ thống"
                    description="Nâng cấp cơ sở dữ liệu"
                  />
                  <EventItem
                    time="11:30"
                    title="Phát hành Bot mới"
                    description="Bot Premium DCA V2"
                  />
                  <EventItem
                    time="14:00"
                    title="Họp với đối tác"
                    description="Tích hợp sàn Binance mới"
                  />
                  <EventItem
                    time="16:30"
                    title="Đánh giá hiệu suất"
                    description="Báo cáo tuần"
                    isLast={true}
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-zinc-800 text-zinc-400 text-sm">
                <div className="flex justify-between w-full">
                  <span>4 sự kiện hôm nay</span>
                  <span className="flex items-center text-amber-500 hover:text-amber-400 cursor-pointer">
                    <span className="mr-1">Xem lịch đầy đủ</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-500" />
                  <span>Người dùng mới gần đây</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-zinc-400">Tên</TableHead>
                      <TableHead className="text-zinc-400">Đăng ký</TableHead>
                      <TableHead className="text-zinc-400 text-right">Bots</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Nguyễn Văn A", date: "Hôm nay", bots: 2 },
                      { name: "Trần Thị B", date: "Hôm nay", bots: 0 },
                      { name: "Lê Minh C", date: "Hôm qua", bots: 1 },
                      { name: "Phạm Đức D", date: "Hôm qua", bots: 3 },
                      { name: "Hoàng Thị E", date: "2 ngày trước", bots: 0 }
                    ].map((user, i) => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell className="text-right">{user.bots}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t border-zinc-800 text-zinc-400 text-sm">
                <div className="flex justify-between w-full">
                  <span>5 người dùng mới nhất</span>
                  <span className="flex items-center text-amber-500 hover:text-amber-400 cursor-pointer">
                    <span className="mr-1">Xem tất cả người dùng</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Người dùng gần đây</CardTitle>
              <CardDescription className="text-zinc-400">
                Danh sách người dùng mới đăng ký trong 7 ngày qua.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-zinc-400 text-sm">
                Nội dung chi tiết về người dùng sẽ được hiển thị ở đây.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bots">
          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Tổng quan Bot</CardTitle>
              <CardDescription className="text-zinc-400">
                Thống kê về hoạt động của các bot trong hệ thống.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-zinc-400 text-sm">
                Nội dung chi tiết về Bot sẽ được hiển thị ở đây.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, change, trend, icon }: StatsCardProps) => {
  return (
    <Card className="border-zinc-800 bg-zinc-900 text-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
          <div className="bg-zinc-800 p-2 rounded-md">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`text-xs flex items-center mt-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
          <span className="inline-block ml-1">
            {trend === 'up' ? '↑' : '↓'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Event Item Component
interface EventItemProps {
  time: string;
  title: string;
  description: string;
  isLast?: boolean;
}

const EventItem = ({ time, title, description, isLast = false }: EventItemProps) => {
  return (
    <div className={`py-3 ${!isLast ? 'border-b border-zinc-800' : ''}`}>
      <div className="flex items-start">
        <div className="min-w-[50px] text-zinc-500 text-sm">{time}</div>
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-zinc-400 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

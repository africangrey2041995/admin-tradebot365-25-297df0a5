
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, Users, Bot, DollarSign, LifeBuoy, ArrowUpRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const systemActivityData = [
  { name: '01/05', value: 12 },
  { name: '02/05', value: 19 },
  { name: '03/05', value: 15 },
  { name: '04/05', value: 22 },
  { name: '05/05', value: 18 },
  { name: '06/05', value: 29 },
  { name: '07/05', value: 31 },
  { name: '08/05', value: 35 },
  { name: '09/05', value: 42 },
  { name: '10/05', value: 38 },
  { name: '11/05', value: 44 },
  { name: '12/05', value: 48 },
  { name: '13/05', value: 52 },
  { name: '14/05', value: 49 },
  { name: '15/05', value: 53 },
];

const recentBots = [
  { id: 'BOT-24051', name: 'Bot Trading BTC', owner: 'Nguyễn Văn A', createdAt: 'Hôm nay', status: 'Active' },
  { id: 'BOT-24049', name: 'DCA Bot Pro', owner: 'Trần Thị B', createdAt: 'Hôm nay', status: 'Active' },
  { id: 'BOT-24048', name: 'ETH Scalping Bot', owner: 'Lê Minh C', createdAt: 'Hôm qua', status: 'Inactive' },
  { id: 'BOT-24044', name: 'Grid Trading SOL', owner: 'Phạm Đức D', createdAt: 'Hôm qua', status: 'Active' },
  { id: 'BOT-24038', name: 'Futures Bot', owner: 'Hoàng Thị E', createdAt: '2 ngày trước', status: 'Active' },
];

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
          title="Doanh thu tháng" 
          value="$700K" 
          change="+4.8%" 
          trend="up"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatsCard 
          title="Hỗ trợ" 
          value="32" 
          change="-5.4%" 
          trend="down"
          icon={<LifeBuoy className="h-4 w-4" />}
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
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={systemActivityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#222', 
                        border: '1px solid #444',
                        borderRadius: '4px',
                        color: '#fff'
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorActivity)" 
                      activeDot={{ r: 5, stroke: '#fff', strokeWidth: 1 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
                  <Bot className="h-5 w-5 text-amber-500" />
                  <span>Bot mới tạo gần đây</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead className="text-zinc-400">ID</TableHead>
                      <TableHead className="text-zinc-400">Tên Bot</TableHead>
                      <TableHead className="text-zinc-400">Chủ sở hữu</TableHead>
                      <TableHead className="text-zinc-400">Tạo</TableHead>
                      <TableHead className="text-zinc-400 text-right">Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBots.map((bot, i) => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell className="font-mono text-xs text-zinc-400">{bot.id}</TableCell>
                        <TableCell>{bot.name}</TableCell>
                        <TableCell>{bot.owner}</TableCell>
                        <TableCell>{bot.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            bot.status === 'Active' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-zinc-500/20 text-zinc-400'
                          }`}>
                            {bot.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t border-zinc-800 text-zinc-400 text-sm">
                <div className="flex justify-between w-full">
                  <span>5 bot mới nhất</span>
                  <span className="flex items-center text-amber-500 hover:text-amber-400 cursor-pointer">
                    <span className="mr-1">Xem tất cả bot</span>
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
                      <TableHead className="text-zinc-400">ID</TableHead>
                      <TableHead className="text-zinc-400">Tên</TableHead>
                      <TableHead className="text-zinc-400">Đăng ký</TableHead>
                      <TableHead className="text-zinc-400 text-right">Bots</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "USER-2405", name: "Nguyễn Văn A", date: "Hôm nay", bots: 2 },
                      { id: "USER-2404", name: "Trần Thị B", date: "Hôm nay", bots: 0 },
                      { id: "USER-2402", name: "Lê Minh C", date: "Hôm qua", bots: 1 },
                      { id: "USER-2401", name: "Phạm Đức D", date: "Hôm qua", bots: 3 },
                      { id: "USER-2398", name: "Hoàng Thị E", date: "2 ngày trước", bots: 0 }
                    ].map((user, i) => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell className="font-mono text-xs text-zinc-400">{user.id}</TableCell>
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

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  ChevronLeft, 
  BarChart2, 
  Users, 
  DollarSign, 
  Settings, 
  ExternalLink,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ErrorSignals from '@/components/bots/ErrorSignals';

const propBots = [
  {
    id: 'PROP-001',
    name: 'Prop Trading Master',
    description: 'Bot đặc biệt thiết kế để vượt qua các bài kiểm tra của Coinstrat Pro Prop Trading với tỷ lệ thành công cao.',
    status: 'active',
    users: 12,
    profit: '+22.5%',
    createdDate: '05/01/2024',
    colorScheme: 'blue'
  },
  {
    id: 'PROP-002',
    name: 'Prop FTMO Winner',
    description: 'Bot được thiết kế để giúp người dùng vượt qua các thử thách FTMO.',
    status: 'active',
    users: 8,
    profit: '+17.3%',
    createdDate: '20/02/2024',
    colorScheme: 'green'
  },
  {
    id: 'PROP-003',
    name: 'Prop Trading Elite',
    description: 'Bot tập trung vào việc cung cấp các tín hiệu giao dịch chất lượng cao cho các nhà giao dịch chuyên nghiệp.',
    status: 'maintenance',
    users: 5,
    profit: '+9.1%',
    createdDate: '15/03/2024',
    colorScheme: 'purple'
  },
  {
    id: 'PROP-004',
    name: 'Prop 100K Challenge',
    description: 'Bot được thiết kế để giúp người dùng quản lý rủi ro và đạt được mục tiêu lợi nhuận trong các thử thách giao dịch 100K.',
    status: 'inactive',
    users: 0,
    profit: '0.0%',
    createdDate: '05/04/2024',
    colorScheme: 'red'
  }
];

const PropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [bot, setBot] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadErrorCount, setUnreadErrorCount] = useState(3);
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Mark errors as read when error tab is clicked
    if (value === 'error-signals') {
      setUnreadErrorCount(0);
    }
  };
  
  useEffect(() => {
    // Fetch bot details based on botId
    setIsLoading(true);
    const foundBot = propBots.find(b => b.id === botId);
    
    setTimeout(() => {
      setBot(foundBot || null);
      setIsLoading(false);
    }, 500);
  }, [botId]);
  
  const goBack = () => {
    navigate('/admin/prop-bots');
  };
  
  if (isLoading) {
    return (
      <AdminLayout title="Loading...">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </AdminLayout>
    );
  }
  
  if (!bot) {
    return (
      <AdminLayout title="Bot Not Found">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
            Bot không tồn tại
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Bot trading bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button onClick={goBack}>
            Quay lại danh sách Bot
          </Button>
        </div>
      </AdminLayout>
    );
  }
  
  const getBotStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'text-green-500';
      case 'inactive': return 'text-yellow-500';
      case 'maintenance': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };
  
  const getBotStatusText = (status: string) => {
    switch(status) {
      case 'active': return 'Hoạt động';
      case 'inactive': return 'Không hoạt động';
      case 'maintenance': return 'Bảo trì';
      default: return 'Không xác định';
    }
  };
  
  return (
    <AdminLayout title={`Bot: ${bot.name}`}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-white">
              Chi tiết Prop Trading Bot
            </h1>
          </div>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Xem trang bot
          </Button>
        </div>
        
        <Card className="border-zinc-800 bg-zinc-900">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-${bot.colorScheme || 'blue'}-950 text-${bot.colorScheme || 'blue'}-500`}>
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">{bot.name}</CardTitle>
                  <CardDescription className="text-zinc-400 mt-1">
                    {bot.description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className={`flex items-center ${getBotStatusColor(bot.status)}`}>
                  <span className={`inline-block w-2 h-2 rounded-full bg-current mr-2`}></span>
                  <span>{getBotStatusText(bot.status)}</span>
                </div>
                <div className="text-sm text-zinc-400 mt-1">ID: {bot.id}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    Người dùng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bot.users}</div>
                </CardContent>
              </Card>
              
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400 flex items-center">
                    <BarChart2 className="h-4 w-4 mr-2 text-green-500" />
                    Lợi nhuận
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{bot.profit}</div>
                </CardContent>
              </Card>
              
              <Card className="border-zinc-800 bg-zinc-950">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-400 flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-amber-500" />
                    Ngày tạo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bot.createdDate}</div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs 
              defaultValue="overview" 
              value={activeTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
                <TabsTrigger value="signals">Tín hiệu</TabsTrigger>
                <TabsTrigger 
                  value="error-signals" 
                  className="flex items-center gap-1 relative"
                >
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Tín hiệu lỗi
                  {unreadErrorCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-red-500 text-white rounded-full">
                      {unreadErrorCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Thông tin chi tiết</h3>
                  <p className="text-zinc-400">
                    {bot.description}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="accounts">
                
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardHeader>
                    <CardTitle className="text-white">Tài khoản được liên kết</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Danh sách các tài khoản được liên kết với bot này
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-zinc-400">
                      <p>Chức năng đang được cập nhật</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="signals">
                
                <Card className="border-zinc-800 bg-zinc-900">
                  <CardHeader>
                    <CardTitle className="text-white">Tín hiệu giao dịch</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Lịch sử tín hiệu giao dịch từ bot này
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-zinc-400">
                      <p>Chức năng đang được cập nhật</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="error-signals">
                <Card className="border-red-800/30 bg-red-900/10">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Tín Hiệu Lỗi Cần Khắc Phục
                    </CardTitle>
                    <CardDescription className="text-red-400/80">
                      Các tín hiệu giao dịch gặp lỗi cần được xử lý
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ErrorSignals botId={botId || ''} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PropBotDetail;

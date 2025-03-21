import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Info, ExternalLink, ArrowLeft, Webhook, Key, Link2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { BotCardProps } from '@/components/bots/BotCard';
import BotInfoCard from '@/components/bots/BotInfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminUserBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState<BotCardProps | null>(null);
  
  const fromUserDetail = location.state?.from === 'userDetail';
  const userId = location.state?.userId;
  
  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const mockBot: BotCardProps = {
          title: botId === 'BOT7459' ? 'Ultra 2in1' : 
                 botId === 'BOT8932' ? 'Long Master' :
                 botId === 'BOT2734' ? 'Gold Trading' :
                 'Bot ' + botId,
          subtitle: botId === 'BOT7459' ? 'Bot cho chiến lược giao dịch kết hợp với phân tích thị trường kép' :
                    botId === 'BOT8932' ? 'Chuyên về chiến lược giao dịch vị thế dài hạn' :
                    botId === 'BOT2734' ? 'Hệ thống giao dịch thuật toán tập trung vào kim loại quý' :
                    'Bot giao dịch cho chiến lược tự động',
          botId: botId || 'Unknown',
          accountCount: '12/30',
          lastUpdated: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'numeric', year: 'numeric' }),
          colorScheme: botId === 'BOT7459' ? 'red' :
                      botId === 'BOT8932' ? 'blue' :
                      botId === 'BOT2734' ? 'green' :
                      'default',
          avatarIcon: <Info className="h-5 w-5" />,
          exchange: 'coinstart_pro',
          botForm: 'trading_view',
          status: 'Active',
        };
        
        setBot(mockBot);
        setIsLoading(false);
      }, 500);
    };
    
    fetchBotDetails();
  }, [botId]);

  const goBack = () => {
    if (fromUserDetail && userId) {
      navigate(`/admin/users/${userId}`);
    } else {
      navigate('/admin/user-bots');
    }
  };

  const viewPublicBotProfile = () => {
    window.open(`/bots/${botId}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Info className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Không Tìm Thấy Bot</h2>
          <p className="text-muted-foreground mb-6">Chúng tôi không thể tìm thấy bot bạn đang tìm kiếm.</p>
          <Button onClick={goBack}>Quay Lại Danh Sách Bot</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Chi tiết Bot Người Dùng</h1>
        </div>
        <Button variant="outline" onClick={viewPublicBotProfile}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Xem trang người dùng
        </Button>
      </div>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl text-white">{bot.title}</CardTitle>
            <CardDescription className="text-zinc-400">{bot.subtitle}</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              bot.status === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
            }`}>
              {bot.status === 'Active' ? 'Hoạt động' : 'Không hoạt động'}
            </div>
            <div className="text-lg font-bold text-white">ID: {bot.botId}</div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="lg:col-span-5">
              <BotInfoCard bot={bot} />
            </div>
            
            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle className="text-white">Thông tin Tích hợp</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Thông tin tích hợp API của bot này (chỉ hiển thị cho Admin)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                      <Webhook className="h-4 w-4 text-primary" />
                      Webhook URL
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="bg-zinc-800 p-3 rounded-md text-sm w-full font-mono text-gray-200 border border-zinc-700">
                        https://api.tradebot365.com/webhook/{botId?.toLowerCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
                      <Key className="h-4 w-4 text-red-400" />
                      Signal Token <span className="text-xs text-red-400">(Đã ẩn)</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="bg-zinc-800 p-3 rounded-md text-sm w-full font-mono text-gray-200 border border-zinc-700">
                        ************************
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Token đã được ẩn đi vì lý do bảo mật</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="accounts">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="accounts" className="text-white">Tài khoản (12)</TabsTrigger>
              <TabsTrigger value="trading-view" className="text-white">TradingView Logs</TabsTrigger>
              <TabsTrigger value="coinstart" className="text-white">Coinstart Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="accounts">
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-white">Tài khoản đã kết nối</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Danh sách tài khoản đã kết nối với bot này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-3 px-4 font-medium text-white">ID</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Tài khoản</th>
                          <th className="text-left py-3 px-4 font-medium text-white">API</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Trạng thái</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Ngày tạo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i} className="border-b border-zinc-800">
                            <td className="py-3 px-4 font-mono text-xs text-gray-200">ACC-{1000 + i}</td>
                            <td className="py-3 px-4 text-gray-200">trader{i}@example.com</td>
                            <td className="py-3 px-4 text-gray-200">Coinstart API</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                i % 3 === 0 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                              }`}>
                                {i % 3 === 0 ? 'Disconnected' : 'Connected'}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {new Date(2024, 0, i).toLocaleDateString('vi-VN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trading-view">
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-white">TradingView Signal Logs</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Lịch sử tín hiệu giao dịch từ TradingView
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-3 px-4 font-medium text-white">ID</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Hành động</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Cặp tiền</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Trạng thái</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Thời gian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i} className="border-b border-zinc-800">
                            <td className="py-3 px-4 font-mono text-xs text-gray-200">SIG-{10000 + i}</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                i % 2 === 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                              }`}>
                                {i % 2 === 0 ? 'ENTER_LONG' : 'EXIT_LONG'}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-200">BTC/USDT</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                i % 4 === 0 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'
                              }`}>
                                {i % 4 === 0 ? 'Pending' : 'Processed'}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">
                              {new Date().toLocaleString('vi-VN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="coinstart">
              <Card className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <CardTitle className="text-white">Coinstart Signal Logs</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Lịch sử tín hiệu được gửi đến Coinstart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800">
                          <th className="text-left py-3 px-4 font-medium text-white">ID</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Hành động</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Cặp tiền</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Trạng thái</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Tài khoản</th>
                          <th className="text-left py-3 px-4 font-medium text-white">Thời gian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <tr key={i} className="border-b border-zinc-800">
                            <td className="py-3 px-4 font-mono text-xs text-gray-200">CS-{20000 + i}</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                i % 2 === 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                              }`}>
                                {i % 2 === 0 ? 'ENTER_LONG' : 'EXIT_LONG'}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-200">BTC/USDT</td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                i % 5 === 0 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                              }`}>
                                {i % 5 === 0 ? 'Failed' : 'Processed'}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-200">ACC-{1000 + i}</td>
                            <td className="py-3 px-4 text-gray-300">
                              {new Date().toLocaleString('vi-VN')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserBotDetail;

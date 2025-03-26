
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronLeft, Settings, Users, Activity, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditableDescriptionCard from '@/components/admin/premium-bots/detail/EditableDescriptionCard';
import EditableTradingPairsCard from '@/components/admin/premium-bots/detail/EditableTradingPairsCard';
import { useBotAuthorization } from '@/hooks/useBotAuthorization';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useChartData } from '@/hooks/useChartData';
import BotDetailHeader from '@/components/bots/details/BotDetailHeader';
import PremiumBotTabs from '@/components/bots/details/premium/PremiumBotTabs';
import PremiumBotOverviewTab from '@/components/bots/details/premium/PremiumBotOverviewTab';
import LoadingBotDetail from '@/components/bots/details/LoadingBotDetail';
import NotFoundOrUnauthorized from '@/components/bots/details/NotFoundOrUnauthorized';
import { BotType } from '@/constants/botTypes';

const ADMIN_USER_ID = 'ADMIN-001';

const AdminPremiumBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshLoading, setRefreshLoading] = useState(false);

  // Sử dụng các hooks hiện có
  const { isLoading, isAuthorized, bot } = useBotAuthorization({
    botId,
    userId: ADMIN_USER_ID
  });
  
  const { selectedPeriod, setSelectedPeriod, chartData } = useChartData();
  const { tradePerformanceData, statisticsData } = useBotStatistics();

  const goBack = () => {
    navigate('/admin/premium-bots');
  };

  const refreshTabData = () => {
    setRefreshLoading(true);
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success(`Đã làm mới dữ liệu tab ${
        activeTab === "overview" ? "Tổng quan" : 
        activeTab === "accounts" ? "Tài khoản" : 
        activeTab === "settings" ? "Cài đặt" : "Logs"
      }`);
    }, 1000);
  };

  const handleDescriptionUpdate = (newDescription: string) => {
    // Trong thực tế, gọi API để cập nhật mô tả
    console.log('Cập nhật mô tả:', newDescription);
    // Bot state sẽ được cập nhật từ response của API
  };

  const handleTradingPairsUpdate = (newPairs: string[]) => {
    // Trong thực tế, gọi API để cập nhật cặp giao dịch
    console.log('Cập nhật cặp giao dịch:', newPairs);
    // Bot state sẽ được cập nhật từ response của API
  };

  if (isLoading) {
    return <LoadingBotDetail />;
  }

  if (!isAuthorized || !bot) {
    return (
      <NotFoundOrUnauthorized 
        backPath="/admin/premium-bots"
        onBack={goBack}
      />
    );
  }

  // Tạo đối tượng bot đơn giản phù hợp với interface cần thiết
  const simplifiedBot = {
    type: bot.type === BotType.PREMIUM_BOT ? 'premium' : 'user',
    exchange: bot.exchange || '',
    minCapital: bot.minCapital,
    createdDate: bot.createdDate,
    performanceLastMonth: bot.performanceLastMonth,
    performanceAllTime: bot.performanceAllTime,
  };

  return (
    <AdminLayout title={`Quản lý Premium Bot: ${bot.name}`}>
      <div className="space-y-6">
        <BotDetailHeader 
          botName={bot.name}
          botId={bot.botId}
          risk={bot.risk}
          backPath="/admin/premium-bots"
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Cài đặt
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PremiumBotOverviewTab
              period={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
              chartData={chartData}
              refreshLoading={refreshLoading}
              onRefresh={refreshTabData}
              tradePerformanceData={tradePerformanceData}
              statisticsData={statisticsData}
              bot={simplifiedBot}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6 md:col-span-1">
                <EditableDescriptionCard 
                  description={bot.description} 
                  onUpdate={handleDescriptionUpdate}
                />
                
                <EditableTradingPairsCard 
                  tradingPairs={bot.markets || []} 
                  onUpdate={handleTradingPairsUpdate}
                />
              </div>
              
              <div className="space-y-6 md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Cài đặt Premium Bot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Trạng thái</label>
                          <div className="mt-1">
                            <select className="w-full rounded-md border border-gray-300 p-2">
                              <option>Hoạt động</option>
                              <option>Tạm dừng</option>
                              <option>Bảo trì</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Mức độ rủi ro</label>
                          <div className="mt-1">
                            <select className="w-full rounded-md border border-gray-300 p-2">
                              <option>Thấp</option>
                              <option>Trung bình</option>
                              <option>Cao</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Vốn tối thiểu</label>
                        <div className="mt-1">
                          <input type="text" className="w-full rounded-md border border-gray-300 p-2" defaultValue={bot.minCapital} />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button>Lưu thay đổi</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle>Tài khoản kết nối</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Danh sách tài khoản đang kết nối với Premium Bot này.</p>
                <div className="my-4">
                  <Button variant="outline" size="sm" onClick={refreshTabData} disabled={refreshLoading}>
                    {refreshLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Đang làm mới...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Làm mới danh sách
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Không có tài khoản nào kết nối với bot này.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Premium Bot Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Lịch sử hoạt động và tín hiệu của Premium Bot.</p>
                <div className="my-4">
                  <Button variant="outline" size="sm" onClick={refreshTabData} disabled={refreshLoading}>
                    {refreshLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Đang làm mới...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Làm mới logs
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Không có logs nào được tìm thấy.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminPremiumBotDetail;

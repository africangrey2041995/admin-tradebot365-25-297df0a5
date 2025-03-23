import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Info, ExternalLink, Webhook, Key, Mail, Phone, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { BotCardProps } from '@/components/bots/BotCard';
import BotInfoCard from '@/components/bots/BotInfoCard';
import UserBotDetailTabs from '@/components/bots/UserBotDetailTabs';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';

const AdminUserBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const { goBack, navigateTo } = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [bot, setBot] = useState<BotCardProps | null>(null);
  const [userInfo, setUserInfo] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive' | 'suspended';
  } | null>(null);
  
  const mockAccounts: Account[] = [
    {
      id: 'ACC001',
      name: 'Trading Account 1',
      userAccount: 'Primary Account',
      userEmail: 'user@example.com',
      apiName: 'Binance API',
      apiId: 'API001',
      tradingAccount: '4056629',
      tradingAccountType: 'Live',
      tradingAccountBalance: '$500',
      status: 'Connected',
      createdDate: new Date(2023, 5, 15).toISOString(),
      lastUpdated: new Date(2023, 11, 20).toISOString(),
      userId: 'USR001'
    },
    {
      id: 'ACC002',
      name: 'Trading Account 2',
      userAccount: 'Secondary Account',
      userEmail: 'user@example.com',
      apiName: 'Binance API',
      apiId: 'API001',
      tradingAccount: '4056789',
      tradingAccountType: 'Live',
      tradingAccountBalance: '$1000',
      status: 'Connected',
      createdDate: new Date(2023, 6, 22).toISOString(),
      lastUpdated: new Date(2023, 10, 5).toISOString(),
      userId: 'USR001'
    }
  ];

  const mockLogs: CoinstratSignal[] = [
    {
      id: 'CSP-78952364',
      originalSignalId: 'SIG001',
      action: 'ENTER_LONG',
      instrument: 'BTCUSDT',
      timestamp: new Date().toISOString(),
      signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '1.5',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-001',
          userId: 'USR001',
          name: 'Binance Spot Account',
          timestamp: new Date().toISOString(),
          status: 'success'
        }
      ],
      failedAccounts: []
    },
    {
      id: 'CSP-78956789',
      originalSignalId: 'SIG002',
      action: 'EXIT_LONG',
      instrument: 'ETHUSDT',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}BOT`,
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '2.3',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-001',
          userId: 'USR001',
          name: 'Binance Spot Account',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'success'
        }
      ],
      failedAccounts: []
    }
  ];
  
  useEffect(() => {
    const fetchBotDetails = () => {
      setIsLoading(true);
      
      try {
        setTimeout(() => {
          try {
            const mockBot: BotCardProps = {
              title: botId === 'BOT-3201' ? 'BTC Long' : 
                    botId === 'BOT-8932' ? 'Long Master' :
                    botId === 'BOT-2734' ? 'Gold Trading' :
                    'Bot ' + botId,
              subtitle: botId === 'BOT-3201' ? 'Bot cho chiến lược giao dịch kết hợp với phân tích thị trường kép' :
                        botId === 'BOT-8932' ? 'Chuyên về chiến lược giao dịch vị thế dài hạn' :
                        botId === 'BOT-2734' ? 'Hệ thống giao dịch thuật toán tập trung vào kim loại quý' :
                        'Bot giao dịch cho chiến lược tự động',
              botId: botId || 'Unknown',
              accountCount: '12/30',
              lastUpdated: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'numeric', year: 'numeric' }),
              colorScheme: botId === 'BOT-3201' ? 'red' :
                          botId === 'BOT-8932' ? 'blue' :
                          botId === 'BOT-2734' ? 'green' :
                          'default',
              avatarIcon: <Info className="h-5 w-5" />,
              exchange: 'coinstart_pro',
              botForm: 'trading_view',
              status: 'Active',
            };
            
            const mockUserInfo = {
              id: 'USR001',
              name: 'Nguyễn Văn A',
              email: 'dbtcompany17@gmail.com',
              phone: '+84 912 345 678',
              status: 'active' as const,
            };
            
            setBot(mockBot);
            setUserInfo(mockUserInfo);
            setIsLoading(false);
          } catch (innerError) {
            console.error('Error processing bot details:', innerError);
            setIsLoading(false);
            toast.error('Đã xảy ra lỗi khi xử lý thông tin bot');
          }
        }, 500);
      } catch (error) {
        console.error('Error fetching bot details:', error);
        setIsLoading(false);
        toast.error('Đã xảy ra lỗi khi tải thông tin bot');
      }
    };
    
    fetchBotDetails();
  }, [botId]);

  const handleBackClick = () => {
    goBack();
  };

  const refreshData = () => {
    setRefreshLoading(true);
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success('Đã làm mới dữ liệu');
    }, 1000);
  };

  const viewPublicBotProfile = () => {
    try {
      window.open(`/bots/${botId}`, '_blank');
    } catch (error) {
      console.error('Error opening public bot profile:', error);
      toast.error('Không thể mở trang công khai của bot');
    }
  };

  const viewUserDetails = () => {
    if (userInfo) {
      try {
        navigateTo(`/admin/users/${userInfo.id}`);
      } catch (error) {
        console.error('Error navigating to user details:', error);
        toast.error('Không thể chuyển đến trang chi tiết người dùng');
      }
    }
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
          <Button onClick={handleBackClick}>Quay Lại Danh Sách Bot</Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleBackClick}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Chi tiết Bot Người Dùng</h1>
          </div>
          <Button variant="outline" onClick={viewPublicBotProfile}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Xem trang người dùng
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="pt-6">
                <BotInfoCard bot={bot} />
              </CardContent>
            </Card>
          </div>
                
          <div className="lg:col-span-7">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle>Thông tin Người Dùng</CardTitle>
                <CardDescription>
                  Thông tin về người dùng sở hữu bot này
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Người dùng ID</p>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto font-medium text-primary"
                              onClick={viewUserDetails}
                            >
                              {userInfo.id}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <User className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Tên</p>
                            <p className="font-medium">{userInfo.name}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                            <p className="font-medium">{userInfo.email}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Số điện thoại</p>
                            <p className="font-medium">{userInfo.phone}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 md:col-span-2">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${
                            userInfo.status === 'active' ? 'bg-green-500' : 
                            userInfo.status === 'inactive' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Trạng thái</p>
                            <p className="font-medium">
                              {userInfo.status === 'active' ? 'Hoạt động' : 
                              userInfo.status === 'inactive' ? 'Không hoạt động' : 'Đã khóa'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle>Thông tin Tích hợp</CardTitle>
            <CardDescription>
              Thông tin tích hợp API của bot này (chỉ hiển thị cho Admin)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                <Webhook className="h-4 w-4 text-primary" />
                Webhook URL
              </h3>
              <div className="flex items-center gap-2">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md text-sm w-full font-mono border border-slate-200 dark:border-slate-700">
                  https://api.tradebot365.com/webhook/{botId?.toLowerCase()}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
                <Key className="h-4 w-4 text-red-400" />
                Signal Token <span className="text-xs text-red-400">(Đã ẩn)</span>
              </h3>
              <div className="flex items-center gap-2">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md text-sm w-full font-mono border border-slate-200 dark:border-slate-700">
                  ************************
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Token đã được ẩn đi vì lý do bảo mật</p>
            </div>
          </CardContent>
        </Card>

        <UserBotDetailTabs 
          botId={botId || ''} 
          userId={userInfo?.id || ''}
          accountsData={mockAccounts}
          logsData={mockLogs}
          onRefresh={refreshData}
          isLoading={refreshLoading}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AdminUserBotDetail;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import BotInfoCard from '@/components/bots/BotInfoCard';
import UserBotDetailTabs from '@/components/bots/UserBotDetailTabs';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useNavigation } from '@/hooks/useNavigation';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import UserBotDetailHeader from './components/UserBotDetailHeader';
import UserInfoCard from './components/UserInfoCard';
import BotIntegrationInfo from './components/BotIntegrationInfo';
import { useAdminBotDetail } from './hooks/useAdminBotDetail';
import { toast } from 'sonner';

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

const AdminUserBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const { goBack, navigateTo } = useNavigation();
  
  const { 
    isLoading, 
    refreshLoading, 
    bot, 
    userInfo, 
    handleRefresh 
  } = useAdminBotDetail(botId);

  const handleBackClick = () => {
    goBack();
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
        <UserBotDetailHeader 
          title="Chi tiết Bot Người Dùng"
          onBack={handleBackClick}
          onViewPublicProfile={viewPublicBotProfile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="pt-6">
                <BotInfoCard bot={bot} />
              </CardContent>
            </Card>
          </div>
                
          <div className="lg:col-span-7">
            {userInfo && (
              <UserInfoCard 
                userInfo={userInfo}
                onViewUserDetails={viewUserDetails}
              />
            )}
          </div>
        </div>

        <BotIntegrationInfo botId={botId || ''} />

        <UserBotDetailTabs 
          botId={botId || ''} 
          userId={userInfo?.id || ''}
          accountsData={mockAccounts}
          logsData={mockLogs}
          onRefresh={handleRefresh}
          isLoading={refreshLoading}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AdminUserBotDetail;

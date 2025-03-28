import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BotCardProps } from '@/components/bots/BotCard';
import BotProfileHeader from '@/components/bots/BotProfileHeader';
import BotInfoCard from '@/components/bots/BotInfoCard';
import ConnectionSettingsCard from '@/components/bots/ConnectionSettingsCard';
import UserBotDetailTabs from '@/components/bots/UserBotDetailTabs';
import { toast } from 'sonner';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';
import { normalizeUserId } from '@/utils/normalizeUserId';

const generateSignalToken = (botId: string) => {
  return `tb365_${botId?.toLowerCase()}_${Math.random().toString(36).substring(2, 10)}`;
};

const BotProfile = () => {
  const { botId } = useParams<{ botId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [bot, setBot] = useState<BotCardProps | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  
  const mockAccounts: Account[] = [
    {
      cspAccountId: 'ACC001',
      cspAccountName: 'Trading Account 1',
      userAccount: 'Primary Account',
      cspUserEmail: 'user@example.com',
      apiName: 'Binance API',
      apiId: 'API001',
      tradingAccountNumber: '4056629',
      tradingAccountId: '40819726',
      tradingAccountType: 'HEDGED',
      tradingAccountBalance: '$500',
      status: 'Connected',
      createdDate: new Date(2023, 5, 15).toISOString(),
      lastUpdated: new Date(2023, 11, 20).toISOString(),
      cspUserId: 'USR-001',
      isLive: false
    },
    {
      cspAccountId: 'ACC002',
      cspAccountName: 'Trading Account 2',
      userAccount: 'Secondary Account',
      cspUserEmail: 'user@example.com',
      apiName: 'Binance API',
      apiId: 'API001',
      tradingAccountNumber: '4056789',
      tradingAccountId: '40819727',
      tradingAccountType: 'HEDGED',
      tradingAccountBalance: '$1000',
      status: 'Connected',
      createdDate: new Date(2023, 6, 22).toISOString(),
      lastUpdated: new Date(2023, 10, 5).toISOString(),
      cspUserId: 'USR-001',
      isLive: true
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
          userId: 'USR-001',
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
          userId: 'USR-001',
          name: 'Binance Spot Account',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'success'
        }
      ],
      failedAccounts: []
    }
  ];
  
  const [webhookUrl] = useState(`https://api.tradebot365.com/webhook/${botId?.toLowerCase()}`);
  const [signalToken] = useState(() => generateSignalToken(botId || ''));
  
  const userId = normalizeUserId('USR-001');
  
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
          signalToken: signalToken,
          webhookUrl: webhookUrl,
        };
        
        setBot(mockBot);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchBotDetails();
  }, [botId, signalToken, webhookUrl]);

  const handleAddAccount = (accountData: any) => {
    console.log('Adding account:', accountData, 'to bot:', botId);
    toast.success('Thêm tài khoản thành công!');
  };

  const handleUpdateBot = (updatedBot: Partial<BotCardProps>) => {
    if (bot) {
      setBot({
        ...bot,
        ...updatedBot
      });
    }
  };

  const refreshData = () => {
    console.log("BotProfile - Starting refresh data");
    setRefreshLoading(true);
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success('Đã làm mới dữ liệu');
      console.log("BotProfile - Finished refresh data");
    }, 1000);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </MainLayout>
    );
  }

  if (!bot) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Info className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Không Tìm Thấy Bot</h2>
          <p className="text-muted-foreground mb-6">Chúng tôi không thể tìm thấy bot bạn đang tìm kiếm.</p>
          <Button onClick={() => window.location.href = '/bots'}>Quay Lại Trang Bot</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Hồ Sơ Bot">
      <div className="flex flex-col">
        <BotProfileHeader 
          botId={bot.botId}
          status={bot.status} 
          botDetails={bot}
          onUpdateBot={handleUpdateBot}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          <div className="lg:col-span-5">
            <BotInfoCard bot={bot} />
          </div>
          
          <div className="lg:col-span-7">
            <ConnectionSettingsCard 
              webhookUrl={webhookUrl} 
              signalToken={signalToken} 
              isOwner={true}
            />
          </div>
        </div>
        
        <UserBotDetailTabs 
          botId={bot.botId}
          userId={userId}
          onRefresh={refreshData}
          isLoading={refreshLoading}
          signalSourceLabel="TradingView ID"
          accountsData={mockAccounts}
          logsData={mockLogs}
          botType="user"
        />
      </div>
    </MainLayout>
  );
};

export default BotProfile;

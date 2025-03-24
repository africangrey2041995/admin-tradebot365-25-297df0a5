
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Share, Copy, CheckCircle2, Edit, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ADMIN_ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import { CoinstratSignal } from '@/types/signal';
import { PropBot } from '@/types';
import { BotRiskLevel, BOT_RISK_DISPLAY, BotStatus, BOT_STATUS_DISPLAY } from '@/constants/botTypes';
import { Account } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import PropBotOverviewTab from '@/components/bots/details/prop/PropBotOverviewTab';
import PropTradingBotTabs from '@/components/bots/details/prop/PropTradingBotTabs';

// Mock data for the bot details
const getMockPropBot = (botId: string): PropBot => {
  return {
    botId,
    name: 'FTMO Challenger Pro',
    description: 'Bot đặc biệt thiết kế để vượt qua FTMO Challenge với tỷ lệ thành công cao.',
    type: 'prop',
    status: BotStatus.ACTIVE,
    exchange: 'FTMO',
    risk: BotRiskLevel.MEDIUM,
    performanceLastMonth: '+8.5%',
    performanceAllTime: '+32.7%',
    users: 42,
    minCapital: '$5,000',
    profit: '+8.5%',
    propFirm: 'FTMO',
    createdDate: '2023-08-15',
    lastUpdated: '2023-10-05',
    maxDrawdown: '4.2%',
    challengeDuration: '30 ngày',
    accountSizes: ['$10K', '$25K', '$50K', '$100K']
  };
};

// Mock accounts
const mockAccounts: Account[] = [
  {
    id: 'acc-001',
    name: 'FTMO Challenge Account',
    exchange: 'FTMO',
    status: 'active',
    exchangeType: 'spot',
    createdAt: '2023-09-15T10:30:00Z',
    updatedAt: '2023-11-10T14:45:00Z',
    apiKey: '***************',
    balance: '$25,000',
    equity: '$25,240',
    pnl: '+$240'
  },
  {
    id: 'acc-002',
    name: 'FTMO Verification Account',
    exchange: 'FTMO',
    status: 'active',
    exchangeType: 'futures',
    createdAt: '2023-10-05T09:15:00Z',
    updatedAt: '2023-11-12T16:20:00Z',
    apiKey: '***************',
    balance: '$25,000',
    equity: '$26,180',
    pnl: '+$1,180'
  }
];

// Mock logs
const mockLogs: CoinstratSignal[] = [
  {
    id: 'signal-001',
    originalSignalId: 'orig-001',
    botId: 'bot-001',
    status: 'completed',
    instrument: 'EURUSD',
    action: 'buy',
    amount: '0.1',
    signalToken: 'token123',
    timestamp: new Date().toISOString(),
    processedAccounts: [
      {
        id: 'acc-001',
        name: 'FTMO Challenge Account',
        status: 'success',
        exchangeResponse: 'Order placed successfully',
        orderId: '12345',
        exchange: 'FTMO'
      }
    ],
    failedAccounts: [],
    maxLag: '5000',
    errorMessage: ''
  },
  {
    id: 'signal-002',
    originalSignalId: 'orig-002',
    botId: 'bot-001',
    status: 'partial',
    instrument: 'USDJPY',
    action: 'sell',
    amount: '0.2',
    signalToken: 'token456',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    processedAccounts: [
      {
        id: 'acc-001',
        name: 'FTMO Challenge Account',
        status: 'success',
        exchangeResponse: 'Order placed successfully',
        orderId: '12346',
        exchange: 'FTMO'
      }
    ],
    failedAccounts: [
      {
        id: 'acc-002',
        name: 'FTMO Verification Account',
        status: 'failed',
        exchangeResponse: 'Insufficient margin',
        orderId: '',
        exchange: 'FTMO'
      }
    ],
    maxLag: '5000',
    errorMessage: 'Partial execution due to insufficient margin on one account'
  }
];

// Mock challenge data
const mockChallengeData = {
  phase: 'Challenge Phase',
  progress: 65,
  accountBalance: '$25,240',
  profitTarget: '$2,500 (10%)',
  maxDrawdown: '$1,250 (5%)',
  daysRemaining: '15 days',
  description: 'Successfully complete the challenge phase by reaching the profit target without exceeding the maximum drawdown.'
};

// Mock bot stats
const mockBotStats = {
  totalTrades: 42,
  winRate: '68.5%',
  profitFactor: 2.4,
  sharpeRatio: 1.8,
  currentDrawdown: '1.2%'
};

// Mock challenge rules
const mockChallengeRules = [
  'Reach a profit target of 10% within 30 days',
  'Maximum daily drawdown: 5%',
  'Maximum total drawdown: 10%',
  'No overnight or weekend trades allowed',
  'Minimum 10 trading days required',
  'No news trading'
];

const PropBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const navigate = useNavigate();
  const [bot, setBot] = useState<PropBot | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState<string | null>(null);
  
  // Mock API integration details
  const webhookUrl = `https://api.coinstratbot.com/webhook/prop/${botId}`;
  const apiToken = 'prop_tk_' + (botId || '').split('-').join('') + '_' + Math.random().toString(36).substring(2, 10);

  useEffect(() => {
    // Simulate fetching bot data
    const fetchBot = async () => {
      setLoading(true);
      setTimeout(() => {
        if (botId) {
          const mockBot = getMockPropBot(botId);
          setBot(mockBot);
        }
        setLoading(false);
      }, 800);
    };
    
    fetchBot();
  }, [botId]);

  const handleRefresh = () => {
    setRefreshLoading(true);
    toast.info('Đang làm mới dữ liệu...');
    
    setTimeout(() => {
      setRefreshLoading(false);
      toast.success('Dữ liệu đã được cập nhật!');
    }, 1000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`Đã sao chép ${label}`, {
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };
  
  const handleBackClick = () => {
    navigate(ADMIN_ROUTES.PROP_BOTS);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Đang tải thông tin bot...</span>
        </div>
      </AdminLayout>
    );
  }

  if (!bot) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Bot không tồn tại</h2>
          <p className="text-muted-foreground mb-4">
            Không tìm thấy thông tin cho bot với ID: {botId}
          </p>
          <Button onClick={handleBackClick}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const getBotRiskBadge = (risk: BotRiskLevel) => {
    let className = '';
    switch (risk) {
      case BotRiskLevel.LOW:
        className = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        break;
      case BotRiskLevel.MEDIUM:
        className = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        break;
      case BotRiskLevel.HIGH:
        className = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        break;
    }
    
    return (
      <Badge variant="outline" className={className}>
        {BOT_RISK_DISPLAY[risk]}
      </Badge>
    );
  };

  const getBotStatusBadge = (status: BotStatus) => {
    const className = status === BotStatus.ACTIVE 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400';
    
    return (
      <Badge variant="outline" className={className}>
        {BOT_STATUS_DISPLAY[status]}
      </Badge>
    );
  };

  const botInfo = {
    createdDate: bot.createdDate,
    lastUpdated: bot.lastUpdated,
    botId: bot.botId
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleBackClick}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{bot.name}</h1>
                <div className="flex items-center gap-2">
                  {getBotStatusBadge(bot.status)}
                  {getBotRiskBadge(bot.risk)}
                </div>
              </div>
              <p className="text-muted-foreground mt-1">{bot.description}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info("Tính năng đang phát triển")}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
            <Button onClick={handleRefresh} disabled={refreshLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${refreshLoading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
          </div>
        </div>

        {/* API Integration Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share className="h-5 w-5 mr-2 text-primary" />
              API Integration
            </CardTitle>
            <CardDescription>
              Thông tin tích hợp API cho Prop Bot này
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Webhook URL</div>
              <div className="flex items-center">
                <div className="bg-muted p-2 rounded-md flex-1 text-sm font-mono truncate">
                  {webhookUrl}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => handleCopy(webhookUrl, 'Webhook URL')}
                >
                  {copied === 'Webhook URL' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">API Token</div>
              <div className="flex items-center">
                <div className="bg-muted p-2 rounded-md flex-1 text-sm font-mono truncate">
                  {apiToken}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="ml-2"
                  onClick={() => handleCopy(apiToken, 'API Token')}
                >
                  {copied === 'API Token' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Sử dụng token này để xác thực khi gửi request tới webhook URL.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bot Content Tabs */}
        <PropTradingBotTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userId="admin"
          botId={bot.botId}
          refreshLoading={refreshLoading}
          accounts={mockAccounts}
          logs={mockLogs}
          overviewContent={
            <PropBotOverviewTab
              challengeData={mockChallengeData}
              botStats={mockBotStats}
              botInfo={botInfo}
              challengeRules={mockChallengeRules}
            />
          }
          refreshTabData={handleRefresh}
        />
      </div>
    </AdminLayout>
  );
};

export default PropBotDetail;

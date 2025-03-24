
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ADMIN_ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import { CoinstratSignal } from '@/types/signal';
import { PropBot } from '@/types';
import { BotRiskLevel, BotStatus, BotType } from '@/constants/botTypes';
import { Account } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';
import PropBotDetailHeader from '@/components/admin/headers/PropBotDetailHeader';
import PropBotApiIntegrationCard from '@/components/admin/cards/PropBotApiIntegrationCard';
import PropBotDetailTabs from '@/components/admin/tabs/PropBotDetailTabs';
import PropBotOverviewTab from '@/components/admin/tabs/PropBotOverviewTab';
import { validateBotId } from '@/utils/normalizeUserId';

// Mock data for the bot details
const getMockPropBot = (botId: string): PropBot => {
  return {
    botId,
    name: 'FTMO Challenger Pro',
    description: 'Bot đặc biệt thiết kế để vượt qua FTMO Challenge với tỷ lệ thành công cao.',
    type: BotType.PROP_BOT,
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
    cspAccountId: 'acc-001',
    cspAccountName: 'FTMO Challenge Account',
    status: 'active',
    createdDate: '2023-09-15T10:30:00Z',
    lastUpdated: '2023-11-10T14:45:00Z',
    apiName: 'FTMO API',
    apiId: '***************',
    tradingAccountNumber: '25000',
    tradingAccountId: 'ftmo-123',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$25,000',
    isLive: true,
    cspUserId: 'USR-001'
  },
  {
    cspAccountId: 'acc-002',
    cspAccountName: 'FTMO Verification Account',
    status: 'active',
    createdDate: '2023-10-05T09:15:00Z',
    lastUpdated: '2023-11-12T16:20:00Z',
    apiName: 'FTMO API',
    apiId: '***************',
    tradingAccountNumber: '25000',
    tradingAccountId: 'ftmo-124',
    tradingAccountType: 'HEDGED',
    tradingAccountBalance: '$25,000',
    isLive: true,
    cspUserId: 'USR-001'
  }
];

// Mock logs with corrected types
const mockLogs: CoinstratSignal[] = [
  {
    id: 'signal-001',
    originalSignalId: 'orig-001',
    botId: 'bot-001',
    status: 'completed',
    instrument: 'EURUSD',
    action: 'ENTER_LONG',
    amount: '0.1',
    signalToken: 'token123',
    timestamp: new Date().toISOString(),
    investmentType: 'forex',
    processedAccounts: [
      {
        accountId: 'acc-001',
        name: 'FTMO Challenge Account',
        status: 'success',
        reason: 'Order placed successfully',
        timestamp: new Date().toISOString(),
        userId: 'USR-001'
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
    action: 'ENTER_SHORT',
    amount: '0.2',
    signalToken: 'token456',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    investmentType: 'forex',
    processedAccounts: [
      {
        accountId: 'acc-001',
        name: 'FTMO Challenge Account',
        status: 'success',
        reason: 'Order placed successfully',
        timestamp: new Date().toISOString(),
        userId: 'USR-001'
      }
    ],
    failedAccounts: [
      {
        accountId: 'acc-002',
        name: 'FTMO Verification Account',
        status: 'failed',
        reason: 'Insufficient margin',
        errorCode: 'ERR-MARGIN',
        timestamp: new Date().toISOString(),
        userId: 'USR-001'
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
  
  const handleBackClick = () => {
    navigate(ADMIN_ROUTES.PROP_BOTS);
  };

  const handleEditClick = () => {
    toast.info("Tính năng đang phát triển");
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
          <button 
            className="flex items-center px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleBackClick}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách
          </button>
        </div>
      </AdminLayout>
    );
  }

  const botInfo = {
    createdDate: bot.createdDate,
    lastUpdated: bot.lastUpdated,
    botId: bot.botId
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header section */}
        <PropBotDetailHeader
          botName={bot.name}
          botDescription={bot.description}
          botStatus={bot.status}
          botRisk={bot.risk}
          isRefreshing={refreshLoading}
          onBackClick={handleBackClick}
          onRefreshClick={handleRefresh}
          onEditClick={handleEditClick}
        />

        {/* API Integration Card */}
        <PropBotApiIntegrationCard
          webhookUrl={webhookUrl}
          apiToken={apiToken}
        />

        {/* Bot Content Tabs */}
        <PropBotDetailTabs
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

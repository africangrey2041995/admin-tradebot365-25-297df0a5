import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, MoreVertical, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import LoadingState from '@/components/admin/prop-bots/detail/LoadingState';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import BotIntegrationInfo from '@/pages/admin/components/BotIntegrationInfo';

// Import the hierarchical accounts table component and its utilities
import HierarchicalAccountsTable from '@/components/admin/prop-bots/detail/components/HierarchicalAccountsTable';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { Account } from '@/types';
import { ADMIN_ROUTES } from '@/constants/routes';
import EditableDescriptionCard from '@/components/admin/premium-bots/detail/EditableDescriptionCard';
import EditableTradingPairsCard from '@/components/admin/premium-bots/detail/EditableTradingPairsCard';
import EditableFeaturesCard from '@/components/admin/prop-bots/detail/EditableFeaturesCard';
import EditableStatisticsCard from '@/components/admin/premium-bots/detail/EditableStatisticsCard';

// Import components from user view to enhance admin view
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { Activity, TrendingUp, LineChart, PieChart } from 'lucide-react';

// Mock Premium Bot data
const mockPremiumBots = [{
  id: 'PRE-001',
  name: 'Alpha Edge',
  description: 'High performance bot for experienced traders with advanced risk management.',
  longDescription: `Alpha Edge is our flagship premium bot designed for experienced traders who want to maximize their trading potential.

This bot utilizes advanced algorithms to identify and capitalize on market inefficiencies, with sophisticated risk management systems to protect your capital.

The Alpha Edge bot has consistently delivered excellent performance over various market conditions, with robust backtesting results and real-world performance.`,
  type: 'premium',
  status: 'active',
  risk: 'medium',
  subscribers: 128,
  minCapital: '$1000',
  exchange: 'Binance',
  performanceLastMonth: '+18.7%',
  performanceAllTime: '+145.3%',
  pairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'BNB/USDT', 'XRP/USDT'],
  price: {
    monthly: 49.99,
    quarterly: 129.99,
    yearly: 459.99
  },
  features: ['Advanced algorithm', 'Real-time market analysis', 'Smart risk management', 'Multi-exchange support', '24/7 operation', 'Performance reports', 'Priority support'],
  createdAt: '2023-05-15T10:30:00Z',
  updatedAt: '2023-11-10T15:45:00Z'
}, {
  id: 'PRE-002',
  name: 'Momentum Master',
  description: 'Capitalizing on market momentum with trend identification and precise entries.',
  longDescription: `Momentum Master is a premium bot that specializes in identifying and capitalizing on market momentum.

Using a combination of technical indicators and price action analysis, this bot excels at identifying trends early and executing precise entries and exits to maximize profit.

The Momentum Master bot is particularly effective in trending markets, with risk management features to mitigate drawdowns during consolidation periods.`,
  type: 'premium',
  status: 'active',
  risk: 'high',
  subscribers: 87,
  minCapital: '$500',
  exchange: 'KuCoin',
  performanceLastMonth: '+24.2%',
  performanceAllTime: '+188.5%',
  pairs: ['BTC/USDT', 'ETH/USDT', 'MATIC/USDT', 'DOGE/USDT', 'ADA/USDT'],
  price: {
    monthly: 59.99,
    quarterly: 149.99,
    yearly: 539.99
  },
  features: ['Momentum detection', 'Trend strength analysis', 'Dynamic take profit levels', 'Adaptive stop-loss', 'Market condition filter', 'Performance tracking', 'VIP support channel'],
  createdAt: '2023-06-20T09:15:00Z',
  updatedAt: '2023-10-28T12:30:00Z'
}];

// Utility function to get bot status badge UI
const getBotStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return <Badge className="bg-green-500">Active</Badge>;
    case 'paused':
      return <Badge className="bg-yellow-500">Paused</Badge>;
    case 'draft':
      return <Badge variant="outline">Draft</Badge>;
    case 'archived':
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// Utility function to get risk level badge UI
const getRiskBadge = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'low':
      return <Badge className="bg-blue-500">Low Risk</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-500">Medium Risk</Badge>;
    case 'high':
      return <Badge className="bg-red-500">High Risk</Badge>;
    default:
      return <Badge variant="outline">{risk}</Badge>;
  }
};

// Mock accounts data for the bot
const mockAccounts: Account[] = [{
  cspAccountId: 'csp-001',
  cspAccountName: 'Binance Account 1',
  status: 'Connected',
  createdDate: '2023-01-15',
  lastUpdated: '2023-11-01',
  cspUserId: 'user-001',
  apiName: 'Binance',
  apiId: 'api-001',
  tradingAccountNumber: '12345678',
  tradingAccountId: 'trading-001',
  tradingAccountType: 'HEDGED',
  tradingAccountBalance: '$5,420.50',
  isLive: true,
  cspUserEmail: 'user1@example.com',
  userAccount: 'John Doe'
}, {
  cspAccountId: 'csp-002',
  cspAccountName: 'KuCoin Account',
  status: 'Connected',
  createdDate: '2023-02-10',
  lastUpdated: '2023-10-15',
  cspUserId: 'user-001',
  apiName: 'KuCoin',
  apiId: 'api-002',
  tradingAccountNumber: '87654321',
  tradingAccountId: 'trading-002',
  tradingAccountType: 'HEDGED',
  tradingAccountBalance: '$1,250.30',
  isLive: true,
  cspUserEmail: 'user1@example.com',
  userAccount: 'John Doe'
}, {
  cspAccountId: 'csp-003',
  cspAccountName: 'Binance Demo',
  status: 'Connected',
  createdDate: '2023-03-05',
  lastUpdated: '2023-09-20',
  cspUserId: 'user-001',
  apiName: 'Binance',
  apiId: 'api-003',
  tradingAccountNumber: '11223344',
  tradingAccountId: 'trading-003',
  tradingAccountType: 'NETTED',
  tradingAccountBalance: '$10,000.00',
  isLive: false,
  cspUserEmail: 'user1@example.com',
  userAccount: 'John Doe'
}, {
  cspAccountId: 'csp-004',
  cspAccountName: 'Bybit Main',
  status: 'Disconnected',
  createdDate: '2023-01-20',
  lastUpdated: '2023-08-15',
  cspUserId: 'user-002',
  apiName: 'Bybit',
  apiId: 'api-004',
  tradingAccountNumber: '98765432',
  tradingAccountId: 'trading-004',
  tradingAccountType: 'HEDGED',
  tradingAccountBalance: '$3,750.60',
  isLive: true,
  cspUserEmail: 'user2@example.com',
  userAccount: 'Jane Smith'
}, {
  cspAccountId: 'csp-005',
  cspAccountName: 'OKX Account',
  status: 'Connected',
  createdDate: '2023-04-25',
  lastUpdated: '2023-10-30',
  cspUserId: 'user-002',
  apiName: 'OKX',
  apiId: 'api-005',
  tradingAccountNumber: '55667788',
  tradingAccountId: 'trading-005',
  tradingAccountType: 'HEDGED',
  tradingAccountBalance: '$8,210.25',
  isLive: true,
  cspUserEmail: 'user2@example.com',
  userAccount: 'Jane Smith'
}, {
  cspAccountId: 'csp-006',
  cspAccountName: 'Binance Pro',
  status: 'Connected',
  createdDate: '2023-05-18',
  lastUpdated: '2023-11-02',
  cspUserId: 'user-003',
  apiName: 'Binance',
  apiId: 'api-006',
  tradingAccountNumber: '13579246',
  tradingAccountId: 'trading-006',
  tradingAccountType: 'HEDGED',
  tradingAccountBalance: '$15,420.80',
  isLive: true,
  cspUserEmail: 'user3@example.com',
  userAccount: 'Robert Johnson'
}];

const PremiumBotDetail = () => {
  const {
    botId
  } = useParams<{
    botId: string;
  }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Get statistics data from the hook
  const {
    statisticsData
  } = useBotStatistics();

  // Get bot data
  const bot = mockPremiumBots.find(b => b.id === botId);

  // Set up accounts data for the selected bot using the same hook as prop bots
  const {
    accounts,
    loading: accountsLoading,
    handleRefresh: refreshAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus
  } = useBotAccounts(botId || '', 'admin', mockAccounts);

  // Export data headers
  const accountsExportHeaders = ['Tên tài khoản', 'Email', 'API', 'Loại tài khoản', 'Trạng thái', 'Số dư'];

  // Memoized accounts export data
  const accountsExportData = React.useMemo(() => {
    return accounts.map(account => [account.cspAccountName || '', account.cspUserEmail || '', account.apiName || '', account.tradingAccountType || '', account.status || '', account.tradingAccountBalance || '']);
  }, [accounts]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle account operations
  const handleEditAccount = (account: Account) => {
    console.log("Edit account:", account);
    toast.info(`Editing account: ${account.cspAccountName}`);
    // In production, this would open an edit dialog and then call updateAccount()
  };
  const handleDeleteAccount = (accountId: string) => {
    console.log("Delete account:", accountId);
    toast.info(`Deleting account: ${accountId}`);
    // In production, this would show a confirmation dialog and then call deleteAccount()
  };
  const handleToggleConnection = (accountId: string) => {
    console.log("Toggle connection:", accountId);
    toggleAccountStatus(accountId);
  };

  // Go back to premium bots list
  const goBackToList = () => {
    navigate(ADMIN_ROUTES.PREMIUM_BOTS);
  };

  // Handle update bot description
  const handleUpdateDescription = (description: string) => {
    toast.success("Bot description updated");
    console.log("Updated description:", description);
  };

  // Handle update trading pairs
  const handleUpdateTradingPairs = (pairs: string[]) => {
    toast.success("Trading pairs updated");
    console.log("Updated pairs:", pairs);
  };

  // Handle update features
  const handleUpdateFeatures = (features: string[]) => {
    toast.success("Bot features updated");
    console.log("Updated features:", features);
  };

  // Handle update statistics
  const handleUpdateStatistics = (updatedStats: { name: string; value: string; icon: React.ReactNode }[]) => {
    toast.success("Bot statistics updated");
    console.log("Updated statistics:", updatedStats);
  };

  // Handle update bot information
  const handleUpdateBotInfo = (info: {
    type: string;
    exchange: string;
    minCapital: string;
  }) => {
    toast.success("Bot information updated");
    console.log("Updated bot information:", info);
  };

  if (isLoading) {
    return <LoadingState />;
  }
  if (!bot) {
    return <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-2xl font-bold">Bot Not Found</h1>
        <p className="text-gray-500 mt-2">The premium bot you're looking for doesn't exist.</p>
        <Button onClick={goBackToList} className="mt-4">Back to Premium Bots</Button>
      </div>;
  }
  return <div className="space-y-6">
      {/* Bot Detail Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={goBackToList} className="text-white hover:text-white/80 hover:bg-white/10">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-white">{bot.name}</h1>
          {getBotStatusBadge(bot.status)}
          {getRiskBadge(bot.risk)}
          <Badge variant="outline" className="ml-2 text-white border-white/20">{`ID: ${bot.id}`}</Badge>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Bot
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Bot Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Preview Bot</DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>Clone Bot</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Delete Bot</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Bot Detail Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="accounts">Tài Khoản Kết Nối</TabsTrigger>
          <TabsTrigger value="trading-logs">TB365 Logs</TabsTrigger>
          <TabsTrigger value="coinstrat-logs">Coinstrat Logs</TabsTrigger>
        </TabsList>

        {/* Overview Tab - Enhanced with charts and visualizations */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <EditableDescriptionCard description={bot.longDescription} onUpdate={handleUpdateDescription} />
              
              {/* Trade Statistics - Now using the editable component */}
              <EditableStatisticsCard 
                statistics={statisticsData} 
                onUpdate={handleUpdateStatistics} 
              />
              
              <EditableTradingPairsCard tradingPairs={bot.pairs} onUpdate={handleUpdateTradingPairs} />
              
              {/* Features List - Now using the editable component */}
              {bot.features && <EditableFeaturesCard features={bot.features} onUpdate={handleUpdateFeatures} />}
            </div>
            <div className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Thông tin Bot</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4 mr-1" />
                    Chỉnh sửa
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Loại Bot</h3>
                    <p>{bot.type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Sàn giao dịch</h3>
                    <p>{bot.exchange}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vốn tối thiểu</h3>
                    <p>{bot.minCapital}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Số người đăng ký</h3>
                    <p>{bot.subscribers}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ngày tạo</h3>
                    <p>{new Date(bot.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Cập nhật lần cuối</h3>
                    <p>{new Date(bot.updatedAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Bot Integration Info - Moved up to replace the performance card */}
              <BotIntegrationInfo botId={bot.id} />
            </div>
          </div>
        </TabsContent>

        {/* Accounts Tab - Now using the hierarchical accounts table */}
        <TabsContent value="accounts">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <CardTitle>Tài Khoản Kết Nối</CardTitle>
                <ExportDataDropdown data={accountsExportData} headers={accountsExportHeaders} fileName={`premium-bot-${botId}-accounts`} />
              </div>
              <CardDescription className="mb-6">
                Quản lý tài khoản người dùng được kết nối với Premium Bot
              </CardDescription>
              
              <HierarchicalAccountsTable accounts={accounts} onRefresh={refreshAccounts} onEdit={handleEditAccount} onDelete={handleDeleteAccount} onToggleConnection={handleToggleConnection} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trading Logs Tab */}
        <TabsContent value="trading-logs">
          <Card>
            <CardHeader>
              <CardTitle>TB365 Signal Logs</CardTitle>
              <CardDescription>
                Tracking of all signals from TB365 platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TradingViewLogs botId={botId || ''} userId="admin" signalSourceLabel="TB365 ID" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coinstrat Logs Tab */}
        <TabsContent value="coinstrat-logs">
          <Card>
            <CardHeader>
              <CardTitle>Coinstrat Logs</CardTitle>
              <CardDescription>
                Logs of all processed signals in the Coinstrat platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CoinstratLogs botId={botId || ''} userId="admin" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>;
};
export default PremiumBotDetail;

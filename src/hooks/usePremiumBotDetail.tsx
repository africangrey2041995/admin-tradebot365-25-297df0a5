import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { useBotStatistics } from '@/hooks/useBotStatistics';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import { Account, PremiumBot } from '@/types';

// Mock Premium Bot data
const mockPremiumBots = [{
  id: 'PRE-001',
  botId: 'PRE-001',
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
  features: ['Advanced algorithm', 'Real-time market analysis', 'Smart risk management', 'Multi-exchange support', '24/7 operation', 'Performance reports', 'Priority support'],
  createdDate: '2023-05-15T10:30:00Z',
  lastUpdated: '2023-11-10T15:45:00Z'
}, {
  id: 'PRE-002',
  botId: 'PRE-002',
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
  features: ['Momentum detection', 'Trend strength analysis', 'Dynamic take profit levels', 'Adaptive stop-loss', 'Market condition filter', 'Performance tracking', 'VIP support channel'],
  createdDate: '2023-06-20T09:15:00Z',
  lastUpdated: '2023-10-28T12:30:00Z'
}];

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

export const usePremiumBotDetail = (botId: string | undefined, userId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Get statistics data from the hook
  const { statisticsData } = useBotStatistics();

  // Get bot data
  const bot = mockPremiumBots.find(b => b.id === botId || b.botId === botId);

  // Get signal logs data for signal count and Signal Tracking tab
  const { 
    coinstratLogs,
    tradingViewLogs,
    refreshLogs,
    loading: logsLoading,
    availableUsers: userList 
  } = useCombinedSignalLogs({
    botId: botId || '',
    userId: userId
  });

  // Transform availableUsers from array of strings to array of objects with id and name
  const availableUsers = userList.map(user => ({
    id: `user-${user.id || user.name.toLowerCase().replace(/\s+/g, '-')}`,
    name: user.name
  }));

  // Set up accounts data for the selected bot using the same hook as prop bots
  const {
    accounts,
    loading: accountsLoading,
    handleRefresh: refreshAccounts,
    toggleAccountStatus
  } = useBotAccounts(botId || '', 'admin', mockAccounts);

  // Calculate statistics
  const uniqueUsers = React.useMemo(() => {
    const userIds = new Set(accounts.map(account => account.cspUserId));
    return userIds.size;
  }, [accounts]);

  const tradingAccountsCount = accounts.length;
  
  const processedSignalsCount = React.useMemo(() => {
    return coinstratLogs.length;
  }, [coinstratLogs]);

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

  // Centralized function for refreshing tab data
  const refreshTabData = () => {
    if (activeTab === 'overview') {
      // Refresh overview data if needed
    } else if (activeTab === 'accounts') {
      refreshAccounts();
    } else if (activeTab === 'signal-tracking') {
      refreshLogs();
    }
  };

  return {
    isLoading,
    activeTab,
    setActiveTab,
    bot,
    accounts,
    uniqueUsers,
    tradingAccountsCount,
    processedSignalsCount,
    statisticsData,
    tradingViewLogs,
    coinstratLogs,
    logsLoading,
    availableUsers,
    refreshAccounts,
    handleEditAccount: (account: Account) => {
      console.log("Edit account:", account);
      toast.info(`Editing account: ${account.cspAccountName}`);
    },
    handleDeleteAccount: (accountId: string) => {
      console.log("Delete account:", accountId);
      toast.info(`Deleting account: ${accountId}`);
    },
    handleToggleConnection: toggleAccountStatus,
    handleUpdateDescription: (description: string) => {
      toast.success("Bot description updated");
      console.log("Updated description:", description);
    },
    handleUpdateTradingPairs: (pairs: string[]) => {
      toast.success("Trading pairs updated");
      console.log("Updated pairs:", pairs);
    },
    handleUpdateFeatures: (features: string[]) => {
      toast.success("Bot features updated");
      console.log("Updated features:", features);
    },
    handleUpdateStatistics: (updatedStats: { name: string; value: string; icon: React.ReactNode }[]) => {
      toast.success("Bot statistics updated");
      console.log("Updated statistics:", updatedStats);
    },
    handleUpdateBotInfo: (info: {
      type: string;
      exchange: string;
      minCapital: string;
    }) => {
      toast.success("Bot information updated");
      console.log("Updated bot information:", info);
    },
    refreshSignalLogs: refreshLogs,
    refreshLoading: logsLoading || accountsLoading,
    refreshTabData
  };
};


import { useState, useCallback, useEffect } from 'react';
import { Account } from '@/types';
import { toast } from 'sonner';

// Enhanced mock data for accounts with additional user information
const mockAccounts: Account[] = [
  // User 1: John Doe
  {
    cspAccountId: 'acc-001',
    cspAccountName: 'Main Trading Account',
    cspUserEmail: 'john@example.com',
    apiName: 'Binance API',
    tradingAccountType: 'Standard',
    tradingAccountNumber: '123456',
    tradingAccountBalance: '$5,240.50',
    isLive: true,
    status: 'Connected',
    userAccount: 'John Doe',
    createdDate: '2023-10-15',
    lastUpdated: '2023-11-10',
    cspUserId: 'user-001',
    apiId: 'api-001',
    tradingAccountId: 'trade-001'
  },
  {
    cspAccountId: 'acc-002',
    cspAccountName: 'Demo Testing Account',
    cspUserEmail: 'john@example.com',
    apiName: 'Bybit API',
    tradingAccountType: 'Pro',
    tradingAccountNumber: '654321',
    tradingAccountBalance: '$12,750.25',
    isLive: false,
    status: 'Connected',
    userAccount: 'John Doe',
    createdDate: '2023-09-20',
    lastUpdated: '2023-11-05',
    cspUserId: 'user-001',
    apiId: 'api-002',
    tradingAccountId: 'trade-002'
  },
  {
    cspAccountId: 'acc-003',
    cspAccountName: 'Challenge Account',
    cspUserEmail: 'john@example.com',
    apiName: 'Coinstrat Pro API',
    tradingAccountType: 'VIP',
    tradingAccountNumber: '789012',
    tradingAccountBalance: '$50,000.00',
    isLive: true,
    status: 'Disconnected',
    userAccount: 'John Doe',
    createdDate: '2023-11-01',
    lastUpdated: '2023-11-15',
    cspUserId: 'user-001',
    apiId: 'api-003',
    tradingAccountId: 'trade-003'
  },
  
  // User 2: Jane Smith
  {
    cspAccountId: 'acc-004',
    cspAccountName: 'Jane Main Account',
    cspUserEmail: 'jane@example.com',
    apiName: 'Binance API',
    tradingAccountType: 'Standard',
    tradingAccountNumber: '111222',
    tradingAccountBalance: '$8,120.75',
    isLive: true,
    status: 'Connected',
    userAccount: 'Jane Smith',
    createdDate: '2023-10-05',
    lastUpdated: '2023-11-12',
    cspUserId: 'user-002',
    apiId: 'api-004',
    tradingAccountId: 'trade-004'
  },
  {
    cspAccountId: 'acc-005',
    cspAccountName: 'Jane Prop Account',
    cspUserEmail: 'jane@example.com',
    apiName: 'Coinstrat Pro API',
    tradingAccountType: 'Challenge',
    tradingAccountNumber: '333444',
    tradingAccountBalance: '$100,000.00',
    isLive: true,
    status: 'Connected',
    userAccount: 'Jane Smith',
    createdDate: '2023-11-01',
    lastUpdated: '2023-11-20',
    cspUserId: 'user-002',
    apiId: 'api-005',
    tradingAccountId: 'trade-005'
  },
  
  // User 3: Alex Wong
  {
    cspAccountId: 'acc-006',
    cspAccountName: 'Alex Trading Account',
    cspUserEmail: 'alex@example.com',
    apiName: 'MT4 API',
    tradingAccountType: 'Premium',
    tradingAccountNumber: '555666',
    tradingAccountBalance: '$15,340.20',
    isLive: true,
    status: 'Connected',
    userAccount: 'Alex Wong',
    createdDate: '2023-09-15',
    lastUpdated: '2023-11-15',
    cspUserId: 'user-003',
    apiId: 'api-006',
    tradingAccountId: 'trade-006'
  },
  {
    cspAccountId: 'acc-007',
    cspAccountName: 'Alex Demo Account',
    cspUserEmail: 'alex@example.com',
    apiName: 'MT5 API',
    tradingAccountType: 'Standard',
    tradingAccountNumber: '777888',
    tradingAccountBalance: '$10,000.00',
    isLive: false,
    status: 'Connected',
    userAccount: 'Alex Wong',
    createdDate: '2023-09-20',
    lastUpdated: '2023-10-30',
    cspUserId: 'user-003',
    apiId: 'api-007',
    tradingAccountId: 'trade-007'
  },
  {
    cspAccountId: 'acc-008',
    cspAccountName: 'Alex Prop Account',
    cspUserEmail: 'alex@example.com',
    apiName: 'Coinstrat Pro API',
    tradingAccountType: 'Challenge Plus',
    tradingAccountNumber: '999000',
    tradingAccountBalance: '$200,000.00',
    isLive: true,
    status: 'Disconnected',
    userAccount: 'Alex Wong',
    createdDate: '2023-10-25',
    lastUpdated: '2023-11-18',
    cspUserId: 'user-003',
    apiId: 'api-008',
    tradingAccountId: 'trade-008'
  }
];

// Define better types for our hierarchical structure
interface TradingAccount {
  tradingAccountId: string;
  tradingAccountNumber: string;
  tradingAccountType: string;
  tradingAccountBalance: string;
  isLive: boolean;
  status: string;
}

interface CSPAccount {
  cspAccountId: string;
  cspAccountName: string;
  apiName: string;
  status: string;
  email: string;
  tradingAccounts: TradingAccount[];
}

interface UserAccount {
  userId: string;
  name: string;
  email: string;
  cspAccounts: CSPAccount[];
}

interface HierarchicalData {
  users: UserAccount[];
  totalUsers: number;
  totalCSPAccounts: number;
  totalTradingAccounts: number;
}

interface UseBotAccountsReturn {
  accounts: Account[];
  loading: boolean;
  error: Error | null;
  fetchAccounts: () => void;
  handleRefresh: () => void;
  addAccount: (account: Account) => void;
  updateAccount: (updatedAccount: Account) => void;
  deleteAccount: (accountId: string) => void;
  toggleAccountStatus: (accountId: string) => void;
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  hierarchicalAccounts: UserAccount[];
  hierarchicalData: HierarchicalData;
}

export const useBotAccounts = (
  botId: string, 
  userId: string, 
  initialData: Account[] = []
): UseBotAccountsReturn => {
  const [accounts, setAccounts] = useState<Account[]>(initialData.length > 0 ? initialData : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Use mockAccounts for now, in a real app, this would be an API call
        setAccounts(mockAccounts);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    }, 800);
  }, []);

  // Initial fetch
  useEffect(() => {
    if (initialData.length === 0) {
      fetchAccounts();
    }
  }, [fetchAccounts, initialData.length]);

  // Group accounts by user, CSP account, and trading account with improved type safety
  const getHierarchicalData = (): HierarchicalData => {
    const userMap = new Map<string, UserAccount>();
    
    accounts.forEach(account => {
      const userId = account.cspUserId;
      const cspAccountId = account.cspAccountId;
      
      if (!userId || !cspAccountId) {
        console.warn('Account is missing required fields:', account);
        return;
      }
      
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          userId,
          name: account.userAccount || '',
          email: account.cspUserEmail || '',
          cspAccounts: []
        });
      }
      
      const user = userMap.get(userId)!;
      
      // Find the CSP account in this user's accounts
      let cspAccount = user.cspAccounts.find(csp => csp.cspAccountId === cspAccountId);
      
      if (!cspAccount) {
        cspAccount = {
          cspAccountId: account.cspAccountId,
          cspAccountName: account.cspAccountName || '',
          apiName: account.apiName || '',
          status: account.status || '',
          email: account.cspUserEmail || '',
          tradingAccounts: []
        };
        user.cspAccounts.push(cspAccount);
      }
      
      // Add the trading account to this CSP account
      cspAccount.tradingAccounts.push({
        tradingAccountId: account.tradingAccountId || '',
        tradingAccountNumber: account.tradingAccountNumber || '',
        tradingAccountType: account.tradingAccountType || '',
        tradingAccountBalance: account.tradingAccountBalance || '',
        isLive: account.isLive || false,
        status: account.status || ''
      });
    });
    
    // Transform map to array
    const users = Array.from(userMap.values());
    
    // Calculate totals
    const totalUsers = users.length;
    const totalCSPAccounts = users.reduce((sum, user) => sum + user.cspAccounts.length, 0);
    const totalTradingAccounts = users.reduce(
      (sum, user) => sum + user.cspAccounts.reduce(
        (cspSum, csp) => cspSum + csp.tradingAccounts.length, 0
      ), 0
    );
    
    return {
      users,
      totalUsers,
      totalCSPAccounts,
      totalTradingAccounts
    };
  };

  const hierarchicalData = getHierarchicalData();

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    handleRefresh: fetchAccounts, // Use fetchAccounts as the refresh handler for simplicity
    addAccount: (account: Account) => {
      setAccounts(prev => [...prev, account]);
      toast.success('Tài khoản đã được thêm thành công');
    },
    updateAccount: (updatedAccount: Account) => {
      setAccounts(prev => 
        prev.map(acc => acc.cspAccountId === updatedAccount.cspAccountId ? updatedAccount : acc)
      );
      toast.success('Tài khoản đã được cập nhật');
    },
    deleteAccount: (accountId: string) => {
      setAccounts(prev => prev.filter(acc => acc.cspAccountId !== accountId));
      toast.success('Tài khoản đã được xóa');
    },
    toggleAccountStatus: (accountId: string) => {
      setAccounts(prev => 
        prev.map(acc => {
          if (acc.cspAccountId === accountId) {
            const newStatus = acc.status === 'Connected' ? 'Disconnected' : 'Connected';
            return { ...acc, status: newStatus };
          }
          return acc;
        })
      );
      
      const account = accounts.find(acc => acc.cspAccountId === accountId);
      const actionText = account?.status === 'Connected' ? 'ngắt kết nối' : 'kết nối';
      toast.success(`Tài khoản đã được ${actionText}`);
    },
    setAccounts,
    hierarchicalAccounts: hierarchicalData.users,
    hierarchicalData
  };
};

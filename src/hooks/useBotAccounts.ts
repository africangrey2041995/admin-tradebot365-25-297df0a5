
import { useState, useCallback } from 'react';
import { Account } from '@/types';
import { toast } from 'sonner';

// Mock data for accounts
const mockAccounts: Account[] = [
  {
    cspAccountId: 'acc-001',
    cspAccountName: 'Main Trading Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Binance API',
    tradingAccountType: 'Standard',
    tradingAccountNumber: '123456',
    tradingAccountBalance: '$5,240.50',
    isLive: true,
    status: 'Connected',
    userAccount: 'John Doe',
  },
  {
    cspAccountId: 'acc-002',
    cspAccountName: 'Demo Testing Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Bybit API',
    tradingAccountType: 'Pro',
    tradingAccountNumber: '654321',
    tradingAccountBalance: '$12,750.25',
    isLive: false,
    status: 'Connected',
    userAccount: 'John Doe',
  },
  {
    cspAccountId: 'acc-003',
    cspAccountName: 'Challenge Account',
    cspUserEmail: 'user@example.com',
    apiName: 'Coinstrat Pro API',
    tradingAccountType: 'VIP',
    tradingAccountNumber: '789012',
    tradingAccountBalance: '$50,000.00',
    isLive: true,
    status: 'Disconnected',
    userAccount: 'John Doe',
  }
];

export const useBotAccounts = (botId: string, userId: string, initialData: Account[] = []) => {
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

  const handleRefresh = () => {
    toast.info('Đang làm mới danh sách tài khoản...');
    fetchAccounts();
  };

  const addAccount = (account: Account) => {
    setAccounts(prev => [...prev, account]);
    toast.success('Tài khoản đã được thêm thành công');
  };

  const updateAccount = (updatedAccount: Account) => {
    setAccounts(prev => 
      prev.map(acc => acc.cspAccountId === updatedAccount.cspAccountId ? updatedAccount : acc)
    );
    toast.success('Tài khoản đã được cập nhật');
  };

  const deleteAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(acc => acc.cspAccountId !== accountId));
    toast.success('Tài khoản đã được xóa');
  };

  const toggleAccountStatus = (accountId: string) => {
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
  };

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    handleRefresh,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus,
    setAccounts
  };
};

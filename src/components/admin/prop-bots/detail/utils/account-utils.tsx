
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Account } from '@/types';
import { TradingAccount, UserAccount, CSPAccount, AccountsFilterParams } from '../types/account-types';

/**
 * Tạo và trả về badge phù hợp với trạng thái
 */
export const getStatusBadge = (status?: string) => {
  if (!status) {
    return <Badge variant="outline">Unknown</Badge>;
  }

  switch (status.toLowerCase()) {
    case 'connected':
      return <Badge className="bg-green-500 hover:bg-green-600">Connected</Badge>;
    case 'disconnected':
      return <Badge variant="secondary">Disconnected</Badge>;
    case 'error':
      return <Badge variant="destructive">Error</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

/**
 * Trích xuất trading accounts từ một account
 */
export const extractTradingAccounts = (account: Account): TradingAccount[] => {
  // Nếu account có tradingAccounts, sử dụng nó
  if (account.tradingAccounts && Array.isArray(account.tradingAccounts)) {
    return account.tradingAccounts.map(ta => ({
      ...ta,
      tradingAccountId: ta.tradingAccountId || '',
      tradingAccountNumber: ta.tradingAccountNumber || 'Unknown',
      tradingAccountType: ta.tradingAccountType || 'Unknown',
      tradingAccountBalance: ta.tradingAccountBalance || '$0.00',
      isLive: ta.isLive || false,
      status: ta.status || 'Disconnected',
    }));
  }
  
  // Nếu không có tradingAccounts, tạo một mảng trống
  return [];
};

/**
 * Nhóm tài khoản theo CSP
 */
export const groupAccountsByCSP = (accounts: Account[]): Record<string, Account> => {
  return accounts.reduce((grouped, account) => {
    if (account.cspAccountId) {
      grouped[account.cspAccountId] = account;
    }
    return grouped;
  }, {} as Record<string, Account>);
};

/**
 * Transform flat account list into hierarchical structure
 * @param accounts - Flat array of accounts
 * @returns Array of user accounts with nested CSP and trading accounts
 */
export const organizeAccountsHierarchically = (accounts: Account[]): UserAccount[] => {
  const userMap = new Map<string, UserAccount>();
  
  // First pass: organize accounts by user
  accounts.forEach(account => {
    // Skip accounts without required fields
    if (!account.cspUserId || !account.cspUserEmail) return;
    
    // Get or create user
    if (!userMap.has(account.cspUserId)) {
      userMap.set(account.cspUserId, {
        userId: account.cspUserId,
        userName: account.cspUserName || account.cspUserEmail.split('@')[0],
        userEmail: account.cspUserEmail,
        cspAccounts: []
      });
    }
    
    const user = userMap.get(account.cspUserId)!;
    
    // Find or create CSP account
    let cspAccount = user.cspAccounts.find(csp => csp.cspAccountId === account.cspAccountId);
    
    if (!cspAccount) {
      cspAccount = {
        cspAccountId: account.cspAccountId || '',
        cspAccountName: account.cspAccountName || '',
        cspUserName: account.cspUserName || '',
        cspUserEmail: account.cspUserEmail || '',
        apiName: account.apiName || '',
        apiId: account.apiId || '',
        status: account.status || '',
        tradingAccounts: []
      };
      user.cspAccounts.push(cspAccount);
    }
    
    // Add trading account
    if (account.tradingAccountId) {
      const tradingAccount: TradingAccount = {
        tradingAccountId: account.tradingAccountId || '',
        tradingAccountNumber: account.tradingAccountNumber || '',
        tradingAccountType: account.tradingAccountType || '',
        tradingAccountBalance: account.tradingAccountBalance || '',
        isLive: account.isLive || false,
        status: account.status || ''
      };
      
      cspAccount.tradingAccounts.push(tradingAccount);
    }
  });
  
  return Array.from(userMap.values());
};

/**
 * Tìm tài khoản gốc dựa trên thông tin
 */
export const findOriginalAccount = (
  accounts: Account[],
  userId: string,
  cspAccountId: string,
  tradingAccountId: string
): Account | undefined => {
  return accounts.find(account => 
    account.cspUserId === userId &&
    account.cspAccountId === cspAccountId &&
    account.tradingAccounts?.some(ta => ta.tradingAccountId === tradingAccountId)
  );
};

/**
 * Lấy tài khoản CSP từ accounts dựa trên cspAccountId
 */
export const getCSPAccountById = (accounts: Account[], cspAccountId: string): Account | undefined => {
  return accounts.find(account => account.cspAccountId === cspAccountId);
};

/**
 * Lấy trading account từ accounts dựa trên tradingAccountId
 */
export const getTradingAccountById = (accounts: Account[], tradingAccountId: string): TradingAccount | undefined => {
  for (const account of accounts) {
    if (account.tradingAccounts) {
      const tradingAccount = account.tradingAccounts.find(ta => ta.tradingAccountId === tradingAccountId);
      if (tradingAccount) {
        return tradingAccount;
      }
    }
  }
  return undefined;
};

/**
 * Apply filtering to hierarchical account data
 * @param data - Hierarchical user accounts data
 * @param filters - Filter parameters for searching and filtering
 * @returns Filtered user accounts data
 */
export const filterAccountData = (
  data: UserAccount[],
  filters: AccountsFilterParams
): UserAccount[] => {
  // If no filters are applied, return the original data
  if (!filters.searchQuery && filters.filterStatus === 'all' && filters.filterLiveDemo === 'all') {
    return data;
  }
  
  return data.filter(user => {
    // Apply search filtering
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      
      // Check if user data matches search
      const matchesUser = 
        user.userName.toLowerCase().includes(searchLower) || 
        user.userEmail.toLowerCase().includes(searchLower) || 
        user.userId.toLowerCase().includes(searchLower);
      
      // Check if any CSP account matches search  
      const matchesCSP = user.cspAccounts.some(csp => 
        (csp.cspAccountName?.toLowerCase() || '').includes(searchLower) ||
        (csp.apiName?.toLowerCase() || '').includes(searchLower)
      );
      
      // Check if any trading account matches search
      const matchesTrading = user.cspAccounts.some(csp => 
        csp.tradingAccounts.some(trading => 
          (trading.tradingAccountNumber?.toLowerCase() || '').includes(searchLower)
        )
      );
      
      // If nothing matches the search, exclude this user
      if (!(matchesUser || matchesCSP || matchesTrading)) {
        return false;
      }
    }
    
    // Filter by status if not 'all'
    if (filters.filterStatus !== 'all') {
      const statusMatches = user.cspAccounts.some(csp => 
        (csp.status || '').toLowerCase() === filters.filterStatus ||
        csp.tradingAccounts.some(account => (account.status || '').toLowerCase() === filters.filterStatus)
      );
      
      if (!statusMatches) return false;
    }
    
    // Filter by live/demo if not 'all'
    if (filters.filterLiveDemo !== 'all') {
      const isLive = filters.filterLiveDemo === 'live';
      const liveStatusMatches = user.cspAccounts.some(csp => 
        csp.tradingAccounts.some(account => account.isLive === isLive)
      );
      
      if (!liveStatusMatches) return false;
    }
    
    return true;
  });
};

/**
 * Calculate total counts for users, CSP accounts, and trading accounts
 * @param data - Hierarchical user accounts data
 * @returns Object with total counts
 */
export const getTotalCounts = (data: UserAccount[]): {totalUsers: number, totalCSP: number, totalTrading: number} => {
  const totalUsers = data.length;
  
  const totalCSP = data.reduce((sum, user) => 
    sum + user.cspAccounts.length, 0
  );
  
  const totalTrading = data.reduce((sum, user) => 
    sum + user.cspAccounts.reduce((cspSum, csp) => 
      cspSum + csp.tradingAccounts.length, 0
    ), 0
  );
  
  return { totalUsers, totalCSP, totalTrading };
};


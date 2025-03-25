
import { Account } from '@/types';
import { UserAccount, CSPAccount, TradingAccount } from '../types/account-types';
import { Badge } from '@/components/ui/badge';
import React from 'react';

/**
 * Transforms flat account list into hierarchical structure
 */
export const organizeAccountsHierarchically = (accounts: Account[]): UserAccount[] => {
  const userMap = new Map<string, UserAccount>();
  
  accounts.forEach(account => {
    // Skip accounts without required fields
    if (!account.cspUserId || !account.cspUserEmail) return;
    
    // Get or create user
    if (!userMap.has(account.cspUserId)) {
      userMap.set(account.cspUserId, {
        userId: account.cspUserId,
        email: account.cspUserEmail,
        name: account.userAccount || account.cspUserEmail.split('@')[0],
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
        apiName: account.apiName || '',
        status: account.status || '',
        email: account.cspUserEmail || '',
        tradingAccounts: []
      };
      user.cspAccounts.push(cspAccount);
    }
    
    // Add trading account
    cspAccount.tradingAccounts.push({
      tradingAccountId: account.tradingAccountId || '',
      tradingAccountNumber: account.tradingAccountNumber || '',
      tradingAccountType: account.tradingAccountType || '',
      tradingAccountBalance: account.tradingAccountBalance || '',
      isLive: account.isLive || false,
      status: account.status || ''
    });
  });
  
  return Array.from(userMap.values());
};

/**
 * Apply filtering to hierarchical data
 */
export const filterAccountData = (
  data: UserAccount[], 
  filters: { searchQuery: string; filterStatus: string; filterLiveDemo: string; }
): UserAccount[] => {
  return data.filter(user => {
    // Search functionality across all levels
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesUser = 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) || 
        user.userId.toLowerCase().includes(searchLower);
        
      const matchesCSP = user.cspAccounts.some(csp => 
        (csp.cspAccountName?.toLowerCase() || '').includes(searchLower) ||
        (csp.apiName?.toLowerCase() || '').includes(searchLower)
      );
      
      const matchesTrading = user.cspAccounts.some(csp => 
        csp.tradingAccounts.some(trading => 
          (trading.tradingAccountNumber?.toLowerCase() || '').includes(searchLower)
        )
      );
      
      if (!(matchesUser || matchesCSP || matchesTrading)) {
        return false;
      }
    }
    
    // Filter by status if not 'all'
    if (filters.filterStatus !== 'all') {
      const statusMatches = user.cspAccounts.some(csp => 
        csp.status.toLowerCase() === filters.filterStatus ||
        csp.tradingAccounts.some(account => account.status.toLowerCase() === filters.filterStatus)
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
 */
export const getTotalCounts = (data: UserAccount[]) => {
  const totalUsers = data.length;
  const totalCSP = data.reduce((sum, user) => sum + user.cspAccounts.length, 0);
  const totalTrading = data.reduce((sum, user) => 
    sum + user.cspAccounts.reduce((cspSum, csp) => cspSum + csp.tradingAccounts.length, 0), 0
  );
  
  return { totalUsers, totalCSP, totalTrading };
};

/**
 * Get styled status badge based on connection status
 */
export const getStatusBadge = (status: string) => {
  if (status.toLowerCase() === 'connected') {
    return React.createElement(Badge, { 
      variant: "outline", 
      className: "bg-green-50 text-green-700 border-green-200" 
    }, "Connected");
  } else {
    return React.createElement(Badge, { 
      variant: "outline", 
      className: "bg-red-50 text-red-700 border-red-200" 
    }, "Disconnected");
  }
};

/**
 * Find the original account from flat list
 */
export const findOriginalAccount = (
  accounts: Account[],
  userId: string, 
  cspAccountId: string, 
  tradingAccountId?: string
): Account | undefined => {
  return accounts.find(acc => 
    acc.cspUserId === userId && 
    acc.cspAccountId === cspAccountId && 
    (tradingAccountId ? acc.tradingAccountId === tradingAccountId : true)
  );
};

/**
 * Prepare account data for export
 */
export const prepareExportData = (data: UserAccount[]): (string | number)[][] => {
  const exportData: (string | number)[][] = [];
  
  data.forEach(user => {
    user.cspAccounts.forEach(cspAccount => {
      cspAccount.tradingAccounts.forEach(tradingAccount => {
        exportData.push([
          tradingAccount.tradingAccountNumber,
          user.email,
          cspAccount.apiName,
          tradingAccount.tradingAccountType,
          tradingAccount.status,
          tradingAccount.tradingAccountBalance
        ]);
      });
    });
  });
  
  return exportData;
};

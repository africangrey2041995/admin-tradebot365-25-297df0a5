
import { useState, useMemo } from 'react';
import { Account } from '@/types';

// Define types for hierarchical structure
export interface TradingAccount {
  tradingAccountId: string;
  tradingAccountNumber: string;
  tradingAccountType: string;
  tradingAccountBalance: string;
  isLive: boolean;
  status: string;
}

export interface CSPAccount {
  cspAccountId: string;
  cspAccountName: string;
  apiName: string;
  status: string;
  email: string;
  tradingAccounts: TradingAccount[];
}

export interface UserAccount {
  userId: string;
  name: string;
  email: string;
  cspAccounts: CSPAccount[];
}

export interface HierarchicalData {
  users: UserAccount[];
  totalUsers: number;
  totalCSPAccounts: number;
  totalTradingAccounts: number;
}

/**
 * Custom hook for transforming flat account data into hierarchical structure
 * @param accounts Flat array of account objects
 * @returns Hierarchical data structure and statistics
 */
export const useAccountsTransform = (accounts: Account[]): HierarchicalData => {
  // Memoize the hierarchical data transformation for performance
  return useMemo(() => {
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
      if (account.tradingAccountId) {
        cspAccount.tradingAccounts.push({
          tradingAccountId: account.tradingAccountId || '',
          tradingAccountNumber: account.tradingAccountNumber || '',
          tradingAccountType: account.tradingAccountType || '',
          tradingAccountBalance: account.tradingAccountBalance || '',
          isLive: account.isLive || false,
          status: account.status || ''
        });
      }
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
  }, [accounts]);
};

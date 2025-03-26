
import { Account } from '@/types';
import { UserAccount, CSPAccount, TradingAccount, AccountsFilterParams } from '../types/account-types';
import { Badge } from '@/components/ui/badge';
import React from 'react';

/**
 * SECTION: Hierarchical Data Structure Transformation
 */

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
    const tradingAccount: TradingAccount = {
      tradingAccountId: account.tradingAccountId || '',
      tradingAccountNumber: account.tradingAccountNumber || '',
      tradingAccountType: account.tradingAccountType || '',
      tradingAccountBalance: account.tradingAccountBalance || '',
      isLive: account.isLive || false,
      status: account.status || ''
    };
    
    cspAccount.tradingAccounts.push(tradingAccount);
  });
  
  return Array.from(userMap.values());
};

/**
 * SECTION: Filtering Functionality
 */

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
  console.log('Filtering accounts with:', filters);
  
  // If no filters are applied, return the original data
  if (!filters.searchQuery && filters.filterStatus === 'all' && filters.filterLiveDemo === 'all') {
    return data;
  }
  
  return data.filter(user => {
    // Apply search filtering
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      console.log(`Searching for: "${searchLower}" in user: ${user.name}`);
      
      // Check if user data matches search
      const matchesUser = 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) || 
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
        console.log(`No match found for user: ${user.name}`);
        return false;
      }
      
      console.log(`Match found for user: ${user.name}`);
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
 * SECTION: Statistics and Aggregation
 */

/**
 * Calculate total counts for users, CSP accounts, and trading accounts
 * @param data - Hierarchical user accounts data
 * @returns Object with total counts
 */
export const getTotalCounts = (data: UserAccount[]) => {
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

/**
 * SECTION: UI Components and Display Utils
 */

/**
 * Get styled status badge based on connection status
 * @param status - Connection status string
 * @returns React Badge component with appropriate styling
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
 * SECTION: Data Management and Lookup Utils
 */

/**
 * Find the original account from flat list based on identifiers
 * @param accounts - Flat array of accounts
 * @param userId - User ID to match
 * @param cspAccountId - CSP account ID to match
 * @param tradingAccountId - Optional trading account ID to match
 * @returns Matching account or undefined
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
 * SECTION: Export and Data Transformation
 */

/**
 * Prepare account data for export to CSV/Excel
 * @param data - Hierarchical user accounts data
 * @returns 2D array suitable for export
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

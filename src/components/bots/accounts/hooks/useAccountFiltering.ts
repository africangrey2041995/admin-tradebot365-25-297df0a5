
import { useState, useEffect, useMemo } from 'react';
import { CSPAccount } from '@/hooks/accounts/useAccountsTransform';

export const useAccountFiltering = (accounts: CSPAccount[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Accounts filtered by status and search term
  const filteredAccounts = useMemo(() => {
    return accounts.filter(account => {
      // Filter CSP accounts that have trading accounts matching our criteria
      const filteredTradingAccounts = account.tradingAccounts.filter(tradingAccount => {
        // Apply status filter if selected
        const statusMatches = !statusFilter || tradingAccount.status.toLowerCase() === statusFilter.toLowerCase();
        
        // Apply search term filter if provided
        const searchMatches = !searchTerm || 
          account.cspAccountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.apiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tradingAccount.tradingAccountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tradingAccount.tradingAccountType.toLowerCase().includes(searchTerm.toLowerCase());
          
        return statusMatches && searchMatches;
      });
      
      // Create a copy of the account with only filtered trading accounts
      if (filteredTradingAccounts.length > 0) {
        return {
          ...account,
          tradingAccounts: filteredTradingAccounts
        };
      }
      
      return false;
    }) as CSPAccount[];
  }, [accounts, searchTerm, statusFilter]);
  
  // Function to handle filter changes
  const handleFilterChange = (filter: { search?: string; status?: string | null }) => {
    if (filter.search !== undefined) {
      setSearchTerm(filter.search);
    }
    if (filter.status !== undefined) {
      setStatusFilter(filter.status);
    }
  };
  
  return {
    filteredAccounts,
    handleFilterChange,
    searchTerm,
    statusFilter
  };
};

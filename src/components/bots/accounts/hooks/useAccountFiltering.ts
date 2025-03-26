
import { useState, useMemo } from 'react';
import { CSPAccount } from '@/hooks/accounts/useAccountsTransform';
import { AccountsFilterParams, filterAccounts } from '../utils/accountFilterUtils';

export const useAccountFiltering = (cspAccounts: CSPAccount[]) => {
  const [filters, setFilters] = useState<AccountsFilterParams>({
    searchQuery: '',
    filterStatus: 'all',
    filterLiveDemo: 'all'
  });

  const filteredAccounts = useMemo(() => 
    filterAccounts(cspAccounts, filters), 
    [cspAccounts, filters]
  );

  const handleFilterChange = (newFilters: AccountsFilterParams) => {
    setFilters(newFilters);
  };

  return {
    filters,
    filteredAccounts,
    handleFilterChange
  };
};

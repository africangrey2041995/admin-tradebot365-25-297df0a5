
import { CSPAccount } from '@/hooks/accounts/useAccountsTransform';

export interface AccountsFilterParams {
  searchQuery: string;
  filterStatus: string;
  filterLiveDemo: string;
}

/**
 * Filter accounts based on search query and filters
 * @param cspAccounts Array of CSP accounts to filter
 * @param filters Filter parameters
 * @returns Filtered array of CSP accounts
 */
export const filterAccounts = (
  cspAccounts: CSPAccount[],
  filters: AccountsFilterParams
): CSPAccount[] => {
  if (!filters.searchQuery && filters.filterStatus === 'all' && filters.filterLiveDemo === 'all') {
    return cspAccounts;
  }

  return cspAccounts.filter(cspAccount => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      
      if (!cspAccount.cspAccountName.toLowerCase().includes(query) &&
          !cspAccount.apiName.toLowerCase().includes(query) &&
          !cspAccount.email.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    if (filters.filterStatus !== 'all') {
      const statusMatches = 
        cspAccount.status.toLowerCase() === filters.filterStatus.toLowerCase() ||
        cspAccount.tradingAccounts.some(ta => 
          ta.status.toLowerCase() === filters.filterStatus.toLowerCase()
        );
      
      if (!statusMatches) {
        return false;
      }
    }
    
    if (filters.filterLiveDemo !== 'all') {
      const isLive = filters.filterLiveDemo === 'live';
      const liveMatches = cspAccount.tradingAccounts.some(ta => ta.isLive === isLive);
      
      if (!liveMatches) {
        return false;
      }
    }
    
    return true;
  });
};

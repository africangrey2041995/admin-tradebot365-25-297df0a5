
import { Account } from '@/types';
import { CSPAccount } from '@/hooks/accounts/useAccountsTransform';

/**
 * Organizes flat account list into hierarchical CSP account structure
 * @param accounts Flat array of account objects
 * @returns Array of organized CSP accounts with trading accounts
 */
export const organizeAccounts = (accounts: Account[]): CSPAccount[] => {
  const cspAccountsMap = new Map<string, CSPAccount>();
  
  accounts.forEach(account => {
    const cspAccountId = account.cspAccountId;
    
    if (!cspAccountsMap.has(cspAccountId)) {
      cspAccountsMap.set(cspAccountId, {
        cspAccountId: account.cspAccountId,
        cspAccountName: account.cspAccountName,
        apiName: account.apiName || '',
        status: account.status || '',
        email: account.cspUserEmail || '',
        tradingAccounts: []
      });
    }
    
    const cspAccount = cspAccountsMap.get(cspAccountId)!;
    
    cspAccount.tradingAccounts.push({
      tradingAccountId: account.tradingAccountId || '',
      tradingAccountNumber: account.tradingAccountNumber || '',
      tradingAccountType: account.tradingAccountType || '',
      tradingAccountBalance: account.tradingAccountBalance || '',
      isLive: account.isLive || false,
      status: account.status || ''
    });
  });
  
  return Array.from(cspAccountsMap.values());
};

/**
 * Generate a status badge with appropriate styling
 * @param status Status value to display
 * @returns Styled badge configuration
 */
export const getStatusColorClass = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'connected':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'disconnected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

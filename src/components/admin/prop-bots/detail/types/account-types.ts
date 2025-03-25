
/**
 * Type definitions for account hierarchical structure
 */

import { Account } from '@/types';

// Type definitions for hierarchical structure
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
  email: string;
  name: string;
  cspAccounts: CSPAccount[];
}

export interface AccountsCount {
  totalUsers: number;
  totalCSP: number;
  totalTrading: number;
}

export interface AccountsFilterParams {
  searchQuery: string;
  filterStatus: string;
  filterLiveDemo: string;
}

export interface AccountsActionHandlers {
  onRefresh: () => void;
  onEdit?: (account: Account) => void;
  onDelete?: (accountId: string) => void;
  onToggleConnection?: (accountId: string) => void;
}

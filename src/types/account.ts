
import { ConnectionStatus, TradingAccountType } from './connection';

/**
 * Definition of account-related types
 */
export interface Account {
  id: string;
  name: string;
  status: ConnectionStatus | string;
  createdDate: string;
  lastUpdated: string;
  userId: string;
  apiName: string;
  apiId: string;
  tradingAccount: string;
  tradingAccountType: string;
  tradingAccountBalance: string;
  volumeMultiplier?: string;
  clientId?: string;
  secretId?: string;
  accessToken?: string;
  ctidTraderAccountId?: string;
  expireDate?: string;
  userAccount?: string;
  userEmail?: string;
}

// Admin-specific account interface with extended properties
export interface AdminAccount extends Account {
  adminNotes?: string;
  isVerified?: boolean;
  verificationDate?: string;
  lastActivityDate?: string;
  activeSignals?: number;
  errorSignals?: number;
  totalTransactions?: number;
}

// Type guard for admin account
export function isAdminAccount(account: Account | AdminAccount): account is AdminAccount {
  return 'adminNotes' in account || 'isVerified' in account;
}

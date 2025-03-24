
import { ConnectionStatus, TradingAccountType } from './connection';

/**
 * Definition of account-related types with standardized CSP (Coinstrat Pro) naming
 */
export interface Account {
  cspAccountId: string;         // renamed from id
  cspAccountName: string;       // renamed from name
  status: ConnectionStatus | string;
  createdDate: string;
  lastUpdated: string;
  cspUserId: string;            // renamed from userId
  apiName: string;
  apiId: string;
  tradingAccount: string;       // keeping as requested
  tradingAccountType: string;
  tradingAccountBalance: string;
  volumeMultiplier?: string;
  clientId?: string;
  secretId?: string;
  accessToken?: string;
  ctidTraderAccountId?: string; // keeping as requested
  expireDate?: string;
  userAccount?: string;         // legacy field, will phase out
  cspUserEmail?: string;        // renamed from userEmail
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

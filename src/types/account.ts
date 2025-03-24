
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
  tradingAccountNumber: string; // formerly tradingAccount, now represents accountNumber from Ctrader
  tradingAccountId: string;     // New field to store Ctrader's accountId
  tradingAccountType: string;   // Will store traderAccountType value
  tradingAccountBalance: string;
  isLive: boolean;              // New field to represent live/demo status
  volumeMultiplier?: string;
  clientId?: string;
  secretId?: string;
  accessToken?: string;
  ctidTraderAccountId?: string; // keeping as requested
  expireDate?: string;
  userAccount?: string;         // legacy field, will phase out
  cspUserEmail?: string;        // renamed from userEmail
  brokerName?: string;          // New field from Ctrader structure
  brokerTitle?: string;         // New field from Ctrader structure
  depositCurrency?: string;     // New field from Ctrader structure
  leverage?: number;            // New field from Ctrader structure
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

// Trading account types enum (based on Ctrader values)
export enum TraderAccountType {
  HEDGED = 'HEDGED',
  NETTED = 'NETTED',
}

// Account status enum (based on Ctrader values)
export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  CLOSED = 'CLOSED',
}

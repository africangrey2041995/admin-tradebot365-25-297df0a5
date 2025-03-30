
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Account } from '@/types';
import { TradingAccount } from '../types/account-types';

/**
 * Tạo và trả về badge phù hợp với trạng thái
 */
export const getStatusBadge = (status?: string) => {
  if (!status) {
    return <Badge variant="outline">Unknown</Badge>;
  }

  switch (status.toLowerCase()) {
    case 'connected':
      return <Badge className="bg-green-500 hover:bg-green-600">Connected</Badge>;
    case 'disconnected':
      return <Badge variant="secondary">Disconnected</Badge>;
    case 'error':
      return <Badge variant="destructive">Error</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500 hover:bg-amber-600">Pending</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

/**
 * Trích xuất trading accounts từ một account
 */
export const extractTradingAccounts = (account: Account): TradingAccount[] => {
  // Nếu account có tradingAccounts, sử dụng nó
  if (account.tradingAccounts && Array.isArray(account.tradingAccounts)) {
    return account.tradingAccounts.map(ta => ({
      ...ta,
      tradingAccountId: ta.tradingAccountId,
      tradingAccountNumber: ta.tradingAccountNumber || 'Unknown',
      tradingAccountType: ta.tradingAccountType || 'Unknown',
      tradingAccountBalance: ta.tradingAccountBalance || '$0.00',
      isLive: ta.isLive || false,
      status: ta.status || 'Disconnected',
    }));
  }
  
  // Nếu không có tradingAccounts, tạo một mảng trống
  return [];
};

/**
 * Nhóm tài khoản theo CSP
 */
export const groupAccountsByCSP = (accounts: Account[]): Record<string, Account> => {
  return accounts.reduce((grouped, account) => {
    if (account.cspAccountId) {
      grouped[account.cspAccountId] = account;
    }
    return grouped;
  }, {} as Record<string, Account>);
};

/**
 * Tìm tài khoản gốc dựa trên thông tin
 */
export const findOriginalAccount = (
  accounts: Account[],
  userId: string,
  cspAccountId: string,
  tradingAccountId: string
): Account | undefined => {
  return accounts.find(account => 
    account.userId === userId &&
    account.cspAccountId === cspAccountId &&
    account.tradingAccounts?.some(ta => ta.tradingAccountId === tradingAccountId)
  );
};

/**
 * Lấy tài khoản CSP từ accounts dựa trên cspAccountId
 */
export const getCSPAccountById = (accounts: Account[], cspAccountId: string): Account | undefined => {
  return accounts.find(account => account.cspAccountId === cspAccountId);
};

/**
 * Lấy trading account từ accounts dựa trên tradingAccountId
 */
export const getTradingAccountById = (accounts: Account[], tradingAccountId: string): TradingAccount | undefined => {
  for (const account of accounts) {
    if (account.tradingAccounts) {
      const tradingAccount = account.tradingAccounts.find(ta => ta.tradingAccountId === tradingAccountId);
      if (tradingAccount) {
        return tradingAccount;
      }
    }
  }
  return undefined;
};

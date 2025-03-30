
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Account } from '@/types';
import { TradingAccount, UserAccount, CSPAccount, AccountsFilterParams } from '../types/account-types';

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

// Export các hàm từ file .ts để duy trì tính nhất quán
export { 
  organizeAccountsHierarchically,
  filterAccountData,
  getTotalCounts,
  findOriginalAccount,
  extractTradingAccounts,
  groupAccountsByCSP,
  getCSPAccountById,
  getTradingAccountById,
  prepareExportData
} from './account-utils';

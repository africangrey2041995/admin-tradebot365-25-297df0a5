
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { Account } from '@/types';
import { TradingAccount } from '../../types/account-types';
import { findOriginalAccount } from '../../utils/account-utils';
import TradingAccountRow from './TradingAccountRow';

interface TradingAccountsTableProps {
  tradingAccounts: TradingAccount[];
  userId: string;
  cspAccountId: string;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
}

const TradingAccountsTable: React.FC<TradingAccountsTableProps> = ({
  tradingAccounts,
  userId,
  cspAccountId,
  accounts,
  onEdit,
  onDelete,
  onToggleConnection
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account Number</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tradingAccounts.map((tradingAccount, tradingIndex) => {
          const originalAccount = findOriginalAccount(
            accounts,
            userId, 
            cspAccountId, 
            tradingAccount.tradingAccountId
          );
          
          return (
            <TradingAccountRow
              key={`trading-${tradingAccount.tradingAccountId}-${tradingIndex}`}
              tradingAccount={tradingAccount}
              userId={userId}
              cspAccountId={cspAccountId}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleConnection={onToggleConnection}
              originalAccount={originalAccount}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TradingAccountsTable;

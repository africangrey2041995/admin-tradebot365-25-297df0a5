
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/ui/table';
import { Account } from '@/types';
import { CSPAccount, TradingAccount } from '@/hooks/accounts/useAccountsTransform';
import TradingAccountRow from './TradingAccountRow';

interface TradingAccountsTableProps {
  cspAccount: CSPAccount;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleStatus: (accountId: string) => void;
}

const TradingAccountsTable: React.FC<TradingAccountsTableProps> = ({
  cspAccount,
  accounts,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const findOriginalAccount = (tradingAccountId: string): Account | undefined => {
    return accounts.find(acc => 
      acc.cspAccountId === cspAccount.cspAccountId && 
      acc.tradingAccountId === tradingAccountId
    );
  };
  
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tài khoản</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Số dư</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cspAccount.tradingAccounts.map((tradingAccount) => {
            const originalAccount = findOriginalAccount(tradingAccount.tradingAccountId);
            
            return (
              <TradingAccountRow
                key={tradingAccount.tradingAccountId}
                accountNumber={tradingAccount.tradingAccountNumber}
                accountType={tradingAccount.tradingAccountType}
                isLive={tradingAccount.isLive}
                balance={tradingAccount.tradingAccountBalance}
                status={tradingAccount.status}
                accountId={tradingAccount.tradingAccountId}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleStatus={onToggleStatus}
                originalAccount={originalAccount}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradingAccountsTable;

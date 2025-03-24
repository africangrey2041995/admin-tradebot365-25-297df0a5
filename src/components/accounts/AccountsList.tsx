
import React from 'react';
import { Search } from 'lucide-react';
import { Account } from '@/types';
import AccountCard from './AccountCard';

interface AccountsListProps {
  accounts: Account[];
  onEdit: (clientId: string) => void;
  onDelete: (clientId: string) => void;
  onReconnect: (clientId: string) => void;
}

const AccountsList: React.FC<AccountsListProps> = ({
  accounts,
  onEdit,
  onDelete,
  onReconnect
}) => {
  if (accounts.length === 0) {
    return (
      <div className="text-center p-12 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <div className="mx-auto w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4">
          <Search className="h-6 w-6 text-slate-500 dark:text-slate-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">Không tìm thấy tài khoản</h3>
        <p className="text-muted-foreground">
          Không tìm thấy tài khoản nào. Vui lòng thử tìm kiếm khác hoặc thêm tài khoản mới.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {accounts.map((account) => (
        <AccountCard
          key={account.clientId || account.cspAccountId}
          account={account}
          onEdit={onEdit}
          onDelete={onDelete}
          onReconnect={onReconnect}
        />
      ))}
    </div>
  );
};

export default AccountsList;

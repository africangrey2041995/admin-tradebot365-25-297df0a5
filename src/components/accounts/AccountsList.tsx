
import React from 'react';
import { Account } from '@/types';
import AccountCard from './AccountCard';

interface AccountsListProps {
  accounts: Account[];
  onEdit?: (clientId: string) => void;
  onDelete?: (clientId: string) => void;
  onReconnect?: (clientId: string) => void;
  onDisconnect?: (clientId: string) => void;
}

const AccountsList: React.FC<AccountsListProps> = ({
  accounts,
  onEdit = () => {},
  onDelete = () => {},
  onReconnect = () => {},
  onDisconnect = () => {},
}) => {
  if (!accounts || accounts.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700">Không có tài khoản nào</h3>
        <p className="text-gray-500 mt-2">Thêm tài khoản để bắt đầu.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map((account) => (
        <AccountCard
          key={account.clientId}
          account={account}
          onEdit={onEdit}
          onDelete={onDelete}
          onReconnect={onReconnect}
          onDisconnect={onDisconnect}
        />
      ))}
    </div>
  );
};

export default AccountsList;

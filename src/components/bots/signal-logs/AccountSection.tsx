
import React from 'react';
import { AccountSignalStatus } from '@/types/signal';
import AccountListItem from './AccountListItem';

interface AccountSectionProps {
  accounts: AccountSignalStatus[];
  title: string;
  type: 'success' | 'failed';
  titleClassName?: string;
  userId: string;
}

const AccountSection: React.FC<AccountSectionProps> = ({ 
  accounts, 
  title, 
  type, 
  titleClassName = '',
  userId
}) => {
  // Filter accounts by userId
  const userAccounts = accounts.filter(account => account.userId === userId);
  
  return (
    <div className="border-t pt-4">
      <h3 className={`text-sm font-medium mb-2 ${titleClassName}`}>{title}</h3>
      {userAccounts.length > 0 ? (
        <div className="space-y-3">
          {userAccounts.map((account, index) => (
            <AccountListItem 
              key={`${type}-${account.accountId}-${index}`} 
              account={account} 
              type={type} 
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No {type === 'success' ? 'processed' : 'failed'} accounts found</p>
      )}
    </div>
  );
};

export default AccountSection;

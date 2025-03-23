
import React from 'react';
import { AccountSignalStatus } from '@/types/signal';
import AccountListItem from './AccountListItem';
import { normalizeUserId } from '@/utils/normalizeUserId';

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
  // Use the centralized normalizeUserId utility for consistent userId handling
  const normalizedInputUserId = normalizeUserId(userId);
  
  // Filter accounts by userId with normalized comparison
  const userAccounts = accounts.filter(account => {
    const normalizedAccountUserId = normalizeUserId(account.userId);
    const match = normalizedAccountUserId === normalizedInputUserId;
    console.log(`AccountSection - Comparing: ${account.userId} (${normalizedAccountUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
    return match;
  });
  
  console.log(`AccountSection - Filtering accounts for userId: ${userId} (normalized: ${normalizedInputUserId})`);
  console.log(`AccountSection - Found ${userAccounts.length} matching accounts out of ${accounts.length} total`);
  
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

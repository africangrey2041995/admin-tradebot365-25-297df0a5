
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CoinstratSignal } from '@/types/signal';

type ProcessedAccount = {
  accountId: string;
  name: string;
  timestamp: string;
  status: string;
  userId?: string;
};

type FailedAccount = {
  accountId: string;
  name: string;
  timestamp: string;
  status: string;
  reason: string;
  userId?: string;
};

interface AccountSectionProps {
  signal: CoinstratSignal;
  showAccounts?: boolean;
}

export const AccountSection: React.FC<AccountSectionProps> = ({ signal, showAccounts = true }) => {
  const { processedAccounts = [], failedAccounts = [] } = signal;
  
  if (!showAccounts || (processedAccounts.length === 0 && failedAccounts.length === 0)) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Execution Summary</h4>
      <div className="space-y-2">
        {processedAccounts.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {processedAccounts.length} successful
            </Badge>
            {!showAccounts && processedAccounts.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {processedAccounts.map(acc => acc.name).join(', ')}
              </span>
            )}
          </div>
        )}
        
        {failedAccounts.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              {failedAccounts.length} failed
            </Badge>
            {!showAccounts && failedAccounts.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {failedAccounts.map(acc => acc.name).join(', ')}
              </span>
            )}
          </div>
        )}
        
        {showAccounts && (
          <div className="space-y-3 mt-3">
            {processedAccounts.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1">Processed Accounts:</h5>
                <ul className="space-y-1">
                  {processedAccounts.map((account) => (
                    <li key={account.accountId} className="text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      <span>{account.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {failedAccounts.length > 0 && (
              <div>
                <h5 className="text-xs font-medium text-muted-foreground mb-1">Failed Accounts:</h5>
                <ul className="space-y-1">
                  {failedAccounts.map((account) => (
                    <li key={account.accountId} className="text-xs flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-destructive mt-1 flex-shrink-0" />
                      <div>
                        <span>{account.name}</span>
                        {account.reason && (
                          <p className="text-xs text-destructive/80">{account.reason}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSection;

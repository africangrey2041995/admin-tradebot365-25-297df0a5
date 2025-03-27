
import React from 'react';
import { ProcessedAccount, FailedAccount } from '@/types';
import { Circle, CheckCircle, XCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { UserStatusBadge } from '@/components/signals/core/badges';

interface AccountSectionProps {
  title: string;
  titleClassName?: string;
  type: 'success' | 'failed';
  processedAccounts?: ProcessedAccount[];
  failedAccounts?: FailedAccount[];
  accounts?: ProcessedAccount[] | FailedAccount[];
  userId: string;
}

const AccountSection: React.FC<AccountSectionProps> = ({
  title,
  titleClassName = "",
  type,
  processedAccounts,
  failedAccounts,
  accounts,
  userId
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  
  // Determine which accounts to display
  const accountsToShow = accounts 
    ? accounts 
    : type === 'success' 
      ? processedAccounts 
      : failedAccounts;
      
  // If no accounts to show, return null
  if (!accountsToShow || accountsToShow.length === 0) {
    return null;
  }

  // Icon based on account type
  const Icon = type === 'success' ? CheckCircle : XCircle;
  
  // Color classes based on account type
  const colorClass = type === 'success' 
    ? 'text-emerald-600 dark:text-emerald-400' 
    : 'text-red-600 dark:text-red-400';

  return (
    <div className="mt-4">
      <h3 className={`text-sm font-medium mb-2 ${titleClassName}`}>
        <div className="flex items-center">
          <Icon className={`h-4 w-4 mr-1.5 ${colorClass}`} />
          {title} ({accountsToShow.length})
        </div>
      </h3>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs mb-2"
          >
            {isOpen ? 'Hide' : 'Show'} accounts
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="space-y-2 pl-2">
            {accountsToShow.map((account, index) => {
              const isHighlighted = account.userId === userId;
              
              return (
                <div 
                  key={`${account.accountId}-${index}`}
                  className={`
                    flex items-center justify-between p-2 rounded-md text-sm
                    ${isHighlighted ? 'bg-primary/5 border border-primary/10' : 'bg-muted/30'}
                  `}
                >
                  <div className="flex items-center">
                    <Circle className="h-2 w-2 mr-2 text-primary" />
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {account.accountId}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {'status' in account && (
                      <UserStatusBadge status={account.status} size="sm" />
                    )}
                    {'reason' in account && account.reason && (
                      <span className="text-xs text-muted-foreground">
                        {account.reason}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AccountSection;

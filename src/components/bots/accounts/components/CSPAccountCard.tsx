
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CSPAccount } from '@/hooks/accounts/useAccountsTransform';
import { Account } from '@/types';
import { getStatusColorClass } from '../utils/accountTransformUtils';
import TradingAccountsTable from './TradingAccountsTable';

interface CSPAccountCardProps {
  cspAccount: CSPAccount;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleStatus: (accountId: string) => void;
}

const CSPAccountCard: React.FC<CSPAccountCardProps> = ({
  cspAccount,
  accounts,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const statusColorClass = getStatusColorClass(cspAccount.status);
  
  return (
    <AccordionItem 
      value={cspAccount.cspAccountId}
      className="border rounded-lg px-4"
    >
      <AccordionTrigger className="hover:no-underline py-3">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <span className="font-medium text-base">{cspAccount.cspAccountName}</span>
              <span className="ml-2 text-muted-foreground">({cspAccount.apiName})</span>
            </div>
            {cspAccount.email && (
              <span className="text-sm text-muted-foreground">{cspAccount.email}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={statusColorClass}>
              {cspAccount.status}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {cspAccount.tradingAccounts.length} Tài khoản giao dịch
            </Badge>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-2 pb-4">
        <TradingAccountsTable 
          cspAccount={cspAccount}
          accounts={accounts}
          onEdit={onEdit} 
          onDelete={onDelete} 
          onToggleStatus={onToggleStatus}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default CSPAccountCard;

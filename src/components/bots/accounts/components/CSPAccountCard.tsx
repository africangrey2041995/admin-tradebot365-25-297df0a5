
import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Account } from '@/types';
import { CSPAccount } from '@/hooks/accounts/useAccountsTransform';
import TradingAccountsTable from './TradingAccountsTable';
import { RefreshCw, Server, ExternalLink, Checkbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox as UICheckbox } from '@/components/ui/checkbox';

interface CSPAccountCardProps {
  cspAccount: CSPAccount;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleStatus: (accountId: string) => void;
  selectedAccounts?: string[];
  onToggleSelect?: (accountId: string) => void;
}

const CSPAccountCard: React.FC<CSPAccountCardProps> = ({
  cspAccount,
  accounts,
  onEdit,
  onDelete,
  onToggleStatus,
  selectedAccounts = [],
  onToggleSelect
}) => {
  // Hàm kiểm tra tất cả tài khoản của CSP này có được chọn không
  const areAllAccountsSelected = () => {
    return cspAccount.tradingAccounts.every(
      account => selectedAccounts.includes(account.tradingAccountId)
    );
  };

  // Hàm kiểm tra có ít nhất một tài khoản của CSP này được chọn
  const isSomeAccountSelected = () => {
    return cspAccount.tradingAccounts.some(
      account => selectedAccounts.includes(account.tradingAccountId)
    );
  };

  // Xử lý chọn/bỏ chọn tất cả tài khoản của CSP này
  const handleToggleAllAccounts = () => {
    if (!onToggleSelect) return;
    
    if (areAllAccountsSelected()) {
      // Bỏ chọn tất cả
      cspAccount.tradingAccounts.forEach(
        account => onToggleSelect(account.tradingAccountId)
      );
    } else {
      // Chọn tất cả các tài khoản chưa được chọn
      cspAccount.tradingAccounts.forEach(account => {
        if (!selectedAccounts.includes(account.tradingAccountId)) {
          onToggleSelect(account.tradingAccountId);
        }
      });
    }
  };

  return (
    <AccordionItem value={cspAccount.cspAccountId} className="border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden">
      <AccordionTrigger className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            {onToggleSelect && (
              <div onClick={(e) => {
                e.stopPropagation();
                handleToggleAllAccounts();
              }}>
                <UICheckbox 
                  checked={areAllAccountsSelected()} 
                  className={isSomeAccountSelected() && !areAllAccountsSelected() ? "bg-primary/50" : ""}
                />
              </div>
            )}
            <Server className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <div className="text-left">
              <h3 className="font-medium text-base">{cspAccount.cspAccountName}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{cspAccount.apiName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              {cspAccount.tradingAccounts.length} tài khoản
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-white dark:bg-slate-950 pt-4">
        <TradingAccountsTable 
          cspAccount={cspAccount}
          accounts={accounts}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          selectedAccounts={selectedAccounts}
          onToggleSelect={onToggleSelect}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

export default CSPAccountCard;

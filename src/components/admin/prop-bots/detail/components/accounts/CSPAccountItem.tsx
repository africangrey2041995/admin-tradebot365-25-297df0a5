
import React, { useState, useEffect } from 'react';
import { Account } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Server } from 'lucide-react';
import { extractTradingAccounts } from '../../utils/account-utils';
import TradingAccountsTable from './TradingAccountsTable';

interface CSPAccountItemProps {
  userId: string;
  cspAccount: Account;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
  selectedAccounts?: string[];
  onToggleSelect?: (accountId: string) => void;
}

const CSPAccountItem: React.FC<CSPAccountItemProps> = ({
  userId,
  cspAccount,
  accounts,
  onEdit,
  onDelete,
  onToggleConnection,
  selectedAccounts = [],
  onToggleSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  
  // Extract trading accounts
  const tradingAccounts = extractTradingAccounts(cspAccount);
  const tradingAccountIds = tradingAccounts.map(ta => ta.tradingAccountId);
  
  // Cập nhật trạng thái chọn
  useEffect(() => {
    if (tradingAccountIds.length === 0) {
      setIsAllSelected(false);
      setIsIndeterminate(false);
      return;
    }
    
    const selectedCount = tradingAccountIds.filter(id => selectedAccounts.includes(id)).length;
    
    if (selectedCount === 0) {
      setIsAllSelected(false);
      setIsIndeterminate(false);
    } else if (selectedCount === tradingAccountIds.length) {
      setIsAllSelected(true);
      setIsIndeterminate(false);
    } else {
      setIsAllSelected(false);
      setIsIndeterminate(true);
    }
  }, [selectedAccounts, tradingAccountIds]);

  // Xử lý chọn tất cả
  const handleSelectAll = () => {
    if (!onToggleSelect) return;
    
    if (isAllSelected) {
      // Bỏ chọn tất cả
      tradingAccountIds.forEach(id => {
        if (selectedAccounts.includes(id)) {
          onToggleSelect(id);
        }
      });
    } else {
      // Chọn tất cả
      tradingAccountIds.forEach(id => {
        if (!selectedAccounts.includes(id)) {
          onToggleSelect(id);
        }
      });
    }
  };

  // Toggle expand/collapse
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/20 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-3">
          {onToggleSelect && (
            <div onClick={(e) => {
              e.stopPropagation();
              handleSelectAll();
            }}>
              <Checkbox 
                checked={isAllSelected}
                className={isIndeterminate ? "bg-primary/50" : ""}
              />
            </div>
          )}
          <Server className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          <div>
            <h4 className="font-medium">{cspAccount.cspAccountName}</h4>
            <p className="text-sm text-slate-500">{cspAccount.apiName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
            {tradingAccounts.length} trading {tradingAccounts.length > 1 ? 'accounts' : 'account'}
          </span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-white dark:bg-slate-950">
          <TradingAccountsTable 
            tradingAccounts={tradingAccounts}
            userId={userId}
            cspAccountId={cspAccount.cspAccountId || ''}
            accounts={accounts}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleConnection={onToggleConnection}
            selectedAccounts={selectedAccounts}
            onToggleSelect={onToggleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default CSPAccountItem;


import React, { useState, useEffect } from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Account } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Users } from 'lucide-react';
import { extractTradingAccounts, groupAccountsByCSP } from '../../utils/account-utils';
import CSPAccountItem from './CSPAccountItem';

interface AccountsAccordionGroupProps {
  userId: string;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
  selectedAccounts?: string[];
  onToggleSelect?: (accountId: string) => void;
}

const AccountsAccordionGroup: React.FC<AccountsAccordionGroupProps> = ({
  userId,
  accounts,
  onEdit,
  onDelete,
  onToggleConnection,
  selectedAccounts = [],
  onToggleSelect
}) => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  
  // Lấy thông tin người dùng từ tài khoản đầu tiên
  const userInfo = accounts[0] ? {
    userName: accounts[0].cspUserName || 'Unknown User',
    userEmail: accounts[0].cspUserEmail || 'unknown@example.com'
  } : { userName: 'Unknown User', userEmail: 'unknown@example.com' };
  
  // Nhóm tài khoản theo CSP
  const cspGroups = groupAccountsByCSP(accounts);

  // Lấy danh sách tất cả trading account IDs
  const allTradingAccountIds = accounts.flatMap(account => {
    const tradingAccounts = extractTradingAccounts(account);
    return tradingAccounts.map(ta => ta.tradingAccountId);
  });
  
  // Cập nhật trạng thái chọn
  useEffect(() => {
    if (allTradingAccountIds.length === 0) {
      setIsAllSelected(false);
      setIsIndeterminate(false);
      return;
    }
    
    const selectedCount = allTradingAccountIds.filter(id => selectedAccounts.includes(id)).length;
    
    if (selectedCount === 0) {
      setIsAllSelected(false);
      setIsIndeterminate(false);
    } else if (selectedCount === allTradingAccountIds.length) {
      setIsAllSelected(true);
      setIsIndeterminate(false);
    } else {
      setIsAllSelected(false);
      setIsIndeterminate(true);
    }
  }, [selectedAccounts, allTradingAccountIds]);

  // Xử lý chọn tất cả
  const handleSelectAll = () => {
    if (!onToggleSelect) return;
    
    if (isAllSelected) {
      // Bỏ chọn tất cả
      allTradingAccountIds.forEach(id => {
        if (selectedAccounts.includes(id)) {
          onToggleSelect(id);
        }
      });
    } else {
      // Chọn tất cả
      allTradingAccountIds.forEach(id => {
        if (!selectedAccounts.includes(id)) {
          onToggleSelect(id);
        }
      });
    }
  };

  return (
    <AccordionItem value={userId} className="border rounded-md my-2">
      <AccordionTrigger className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800">
        <div className="flex flex-1 items-center justify-between">
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
            <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <div className="text-left">
              <h3 className="font-medium">{userInfo.userName}</h3>
              <p className="text-sm text-slate-500">{userInfo.userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-xs px-2 py-1 rounded-full">
              {Object.keys(cspGroups).length} CSP {Object.keys(cspGroups).length > 1 ? 'Accounts' : 'Account'}
            </span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4 bg-white dark:bg-slate-950 space-y-4">
        {Object.entries(cspGroups).map(([cspAccountId, cspAccount]) => (
          <CSPAccountItem
            key={cspAccountId}
            userId={userId}
            cspAccount={cspAccount}
            accounts={accounts}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleConnection={onToggleConnection}
            selectedAccounts={selectedAccounts}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccountsAccordionGroup;

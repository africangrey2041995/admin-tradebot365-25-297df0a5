
import React from 'react';
import { UserAccount } from '../../types/account-types';
import { Account } from '@/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Check } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import CSPAccountItem from './CSPAccountItem';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserAccountItemProps {
  user: UserAccount;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
  selectedAccounts?: string[];
  onToggleSelect?: (accountId: string) => void;
}

const UserAccountItem: React.FC<UserAccountItemProps> = ({
  user,
  accounts,
  onEdit,
  onDelete,
  onToggleConnection,
  selectedAccounts = [],
  onToggleSelect
}) => {
  // Kiểm tra nếu tất cả tài khoản của user này được chọn
  const areAllAccountsSelected = () => {
    if (!onToggleSelect) return false;
    
    // Lấy tất cả tradingAccountId từ user này
    const allTradingAccountIds = user.cspAccounts.flatMap(
      csp => csp.tradingAccounts.map(acc => acc.tradingAccountId)
    );
    
    return allTradingAccountIds.length > 0 && 
           allTradingAccountIds.every(id => selectedAccounts.includes(id));
  };
  
  // Kiểm tra nếu ít nhất một tài khoản được chọn
  const isSomeAccountSelected = () => {
    if (!onToggleSelect) return false;
    
    const allTradingAccountIds = user.cspAccounts.flatMap(
      csp => csp.tradingAccounts.map(acc => acc.tradingAccountId)
    );
    
    return allTradingAccountIds.some(id => selectedAccounts.includes(id));
  };
  
  // Xử lý khi chọn/bỏ chọn tất cả tài khoản của user này
  const handleToggleAllAccounts = () => {
    if (!onToggleSelect) return;
    
    const allTradingAccountIds = user.cspAccounts.flatMap(
      csp => csp.tradingAccounts.map(acc => acc.tradingAccountId)
    );
    
    if (areAllAccountsSelected()) {
      // Bỏ chọn tất cả
      allTradingAccountIds.forEach(id => onToggleSelect(id));
    } else {
      // Chọn tất cả chưa được chọn
      allTradingAccountIds.forEach(id => {
        if (!selectedAccounts.includes(id)) {
          onToggleSelect(id);
        }
      });
    }
  };

  return (
    <AccordionItem value={`user-${user.userId}`} key={`user-${user.userId}`}>
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center justify-between w-full text-left">
          <div className="flex items-center gap-3">
            {onToggleSelect && (
              <div onClick={(e) => {
                e.stopPropagation();
                handleToggleAllAccounts();
              }}>
                <Checkbox 
                  checked={areAllAccountsSelected()} 
                  className={isSomeAccountSelected() && !areAllAccountsSelected() ? "bg-primary/50" : ""}
                />
              </div>
            )}
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
              {user.cspAccounts.length} CSP Accounts
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info(`View all accounts for ${user.name}`)}>
                  View All Accounts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info(`Contact ${user.name}`)}>
                  Contact User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </AccordionTrigger>
      
      <AccordionContent className="px-4 pb-2">
        <div className="pl-4 border-l">
          <div className="space-y-2">
            {user.cspAccounts.map((cspAccount) => (
              <CSPAccountItem
                key={`csp-${cspAccount.cspAccountId}`}
                cspAccount={cspAccount}
                userId={user.userId}
                accounts={accounts}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleConnection={onToggleConnection}
                selectedAccounts={selectedAccounts}
                onToggleSelect={onToggleSelect}
              />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default UserAccountItem;

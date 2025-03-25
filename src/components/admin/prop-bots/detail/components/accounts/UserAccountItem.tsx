
import React from 'react';
import { UserAccount } from '../../types/account-types';
import { Account } from '@/types';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import CSPAccountItem from './CSPAccountItem';
import { toast } from 'sonner';
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
}

const UserAccountItem: React.FC<UserAccountItemProps> = ({
  user,
  accounts,
  onEdit,
  onDelete,
  onToggleConnection
}) => {
  return (
    <AccordionItem value={`user-${user.userId}`} key={`user-${user.userId}`}>
      <AccordionTrigger className="px-4 py-3 hover:no-underline">
        <div className="flex items-center justify-between w-full text-left">
          <div className="flex items-center">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500 ml-2">({user.email})</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
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
              />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default UserAccountItem;

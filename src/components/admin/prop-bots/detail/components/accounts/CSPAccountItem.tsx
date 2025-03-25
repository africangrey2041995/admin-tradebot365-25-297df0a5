
import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash, Link, Link2Off } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CSPAccount } from '../../types/account-types';
import { getStatusBadge, findOriginalAccount } from '../../utils/account-utils';
import { Account } from '@/types';
import { Badge } from '@/components/ui/badge';
import TradingAccountsTable from './TradingAccountsTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CSPAccountItemProps {
  cspAccount: CSPAccount;
  userId: string;
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
}

const CSPAccountItem: React.FC<CSPAccountItemProps> = ({
  cspAccount,
  userId,
  accounts,
  onEdit,
  onDelete,
  onToggleConnection
}) => {
  return (
    <Collapsible key={`csp-${cspAccount.cspAccountId}`} className="border rounded-md">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left">
        <div className="flex items-center">
          <div className="font-medium">{cspAccount.cspAccountName}</div>
          <div className="text-sm text-gray-500 ml-2">({cspAccount.apiName})</div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(cspAccount.status)}
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {cspAccount.tradingAccounts.length} Trading Accounts
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>CSP Account Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                const originalAccount = findOriginalAccount(accounts, userId, cspAccount.cspAccountId);
                if (originalAccount) onEdit(originalAccount);
              }}>
                <Pencil className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(cspAccount.cspAccountId)}>
                <Trash className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggleConnection(cspAccount.cspAccountId)}>
                {cspAccount.status === 'Connected' ? (
                  <><Link2Off className="h-4 w-4 mr-2" /> Disconnect</>
                ) : (
                  <><Link className="h-4 w-4 mr-2" /> Connect</>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="px-3 pb-3">
        <div className="pl-4 border-l">
          <TradingAccountsTable 
            tradingAccounts={cspAccount.tradingAccounts}
            userId={userId}
            cspAccountId={cspAccount.cspAccountId}
            accounts={accounts}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleConnection={onToggleConnection}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CSPAccountItem;

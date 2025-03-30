
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash, Link, Link2Off } from 'lucide-react';
import { Account } from '@/types';
import { TradingAccount } from '../../types/account-types';
import { getStatusBadge } from '../../utils/account-utils.tsx';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TradingAccountRowProps {
  tradingAccount: TradingAccount;
  userId: string;
  cspAccountId: string;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
  originalAccount?: Account;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

const TradingAccountRow: React.FC<TradingAccountRowProps> = ({
  tradingAccount,
  userId,
  cspAccountId,
  onEdit,
  onDelete,
  onToggleConnection,
  originalAccount,
  isSelected = false,
  onToggleSelect
}) => {
  return (
    <TableRow key={`trading-${tradingAccount.tradingAccountId}`}>
      {onToggleSelect && (
        <TableCell>
          <Checkbox 
            checked={isSelected}
            onCheckedChange={onToggleSelect}
          />
        </TableCell>
      )}
      <TableCell>{tradingAccount.tradingAccountNumber}</TableCell>
      <TableCell>
        {tradingAccount.tradingAccountType} - {tradingAccount.isLive ? 'Live' : 'Demo'}
      </TableCell>
      <TableCell>{tradingAccount.tradingAccountBalance}</TableCell>
      <TableCell>{getStatusBadge(tradingAccount.status)}</TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Trading Account Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              if (originalAccount) onEdit(originalAccount);
            }}>
              <Pencil className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(tradingAccount.tradingAccountId)}>
              <Trash className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleConnection(tradingAccount.tradingAccountId)}>
              {tradingAccount.status === 'Connected' ? (
                <><Link2Off className="h-4 w-4 mr-2" /> Disconnect</>
              ) : (
                <><Link className="h-4 w-4 mr-2" /> Connect</>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TradingAccountRow;

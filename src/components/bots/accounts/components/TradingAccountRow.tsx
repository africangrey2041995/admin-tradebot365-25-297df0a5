
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Link, Link2 } from 'lucide-react';
import { Account } from '@/types';
import { getStatusColorClass } from '../utils/accountTransformUtils';

interface TradingAccountRowProps {
  accountNumber: string;
  accountType: string;
  isLive: boolean;
  balance: string;
  status: string;
  accountId: string;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleStatus: (accountId: string) => void;
  originalAccount?: Account;
}

const TradingAccountRow: React.FC<TradingAccountRowProps> = ({
  accountNumber,
  accountType,
  isLive,
  balance,
  status,
  accountId,
  onEdit,
  onDelete,
  onToggleStatus,
  originalAccount
}) => {
  const statusColorClass = getStatusColorClass(status);
  
  const handleEdit = () => {
    if (originalAccount) {
      onEdit(originalAccount);
    }
  };
  
  const handleDelete = () => {
    onDelete(accountId);
  };
  
  const handleToggleStatus = () => {
    onToggleStatus(accountId);
  };
  
  return (
    <TableRow>
      <TableCell>{accountNumber}</TableCell>
      <TableCell>
        {accountType} - {isLive ? 'Live' : 'Demo'}
      </TableCell>
      <TableCell>{balance}</TableCell>
      <TableCell>
        <Badge variant="outline" className={statusColorClass}>{status}</Badge>
      </TableCell>
      <TableCell className="text-right space-x-1">
        {originalAccount && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleStatus}
            >
              {status === 'Connected' 
                ? <Link2 className="h-4 w-4" /> 
                : <Link className="h-4 w-4" />
              }
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TradingAccountRow;

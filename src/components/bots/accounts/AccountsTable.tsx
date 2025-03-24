
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3 } from 'lucide-react';
import { Account } from '@/types';
import { ConnectionStatus } from '@/types/connection';

interface AccountsTableProps {
  accounts: Account[];
}

const AccountsTable: React.FC<AccountsTableProps> = ({ accounts }) => {
  const getStatusBadge = (status: ConnectionStatus) => {
    switch (status) {
      case 'Connected':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Connected</Badge>;
      case 'Disconnected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Disconnected</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50 border-orange-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatAccountType = (account: Account) => {
    const accountTypeLabel = account.tradingAccountType || 'Unknown';
    const liveStatus = account.isLive ? 'Live' : 'Demo';
    return `${accountTypeLabel} - ${liveStatus}`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account Profile</TableHead>
          <TableHead>Api</TableHead>
          <TableHead>Account Trading</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.cspAccountId}>
            <TableCell>
              <div>
                <div className="font-medium">{account.userAccount || account.cspAccountName}</div>
                <div className="text-xs text-muted-foreground">{account.cspUserEmail}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{account.apiName}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">
                {account.tradingAccountNumber} | {formatAccountType(account)} | {account.tradingAccountBalance}
              </div>
            </TableCell>
            <TableCell>
              {getStatusBadge(account.status as ConnectionStatus)}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountsTable;

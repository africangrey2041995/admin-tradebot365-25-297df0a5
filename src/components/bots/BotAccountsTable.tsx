
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Account, ConnectionStatus } from '@/types';

interface BotAccountsTableProps {
  botId: string;
}

const BotAccountsTable = ({ botId }: BotAccountsTableProps) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const fetchAccounts = () => {
      setLoading(true);
      setTimeout(() => {
        const mockAccounts: Account[] = [
          {
            id: '1',
            name: 'Tài Khoản 1',
            userAccount: 'Tài Khoản 1',
            userEmail: 'dbtcompany17@gmail.com',
            apiName: 'API 1',
            apiId: 'API001',
            tradingAccount: '4056629',
            tradingAccountType: 'Live',
            tradingAccountBalance: '$500',
            status: 'Connected',
            createdDate: new Date(2023, 5, 15).toISOString(),
            lastUpdated: new Date(2023, 11, 20).toISOString(),
            userId: 'USR-001'
          },
          {
            id: '2',
            name: 'Tài Khoản 2',
            userAccount: 'Tài Khoản 1',
            userEmail: 'dbtcompany17@gmail.com',
            apiName: 'API 1',
            apiId: 'API001',
            tradingAccount: '4056789',
            tradingAccountType: 'Live',
            tradingAccountBalance: '$1000',
            status: 'Connected',
            createdDate: new Date(2023, 6, 22).toISOString(),
            lastUpdated: new Date(2023, 10, 5).toISOString(),
            userId: 'USR-001'
          },
          {
            id: '3',
            name: 'Tài Khoản 3',
            userAccount: 'Tài Khoản 1',
            userEmail: 'dbtcompany17@gmail.com',
            apiName: 'API 1',
            apiId: 'API001',
            tradingAccount: '4044856',
            tradingAccountType: 'Demo',
            tradingAccountBalance: '$10000',
            status: 'Disconnected',
            createdDate: new Date(2023, 7, 10).toISOString(),
            lastUpdated: new Date(2023, 9, 18).toISOString(),
            userId: 'USR-002'
          },
        ];
        setAccounts(mockAccounts);
        setLoading(false);
      }, 800);
    };

    fetchAccounts();
  }, [botId]);

  const handleViewUserDetails = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

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

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading accounts...</div>;
  }

  if (accounts.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground mb-4">No accounts connected to this bot yet.</p>
        <Button>Add an Account</Button>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account Profile</TableHead>
          <TableHead>Api</TableHead>
          <TableHead>Account Trading</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell>
              <div>
                <div className="font-medium">{account.userAccount}</div>
                <div className="text-xs text-muted-foreground">{account.userEmail}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{account.apiName}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">
                {account.tradingAccount} | {account.tradingAccountType} | {account.tradingAccountBalance}
              </div>
            </TableCell>
            <TableCell>
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                onClick={() => handleViewUserDetails(account.userId)}
              >
                {account.userId}
              </Button>
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

export default BotAccountsTable;

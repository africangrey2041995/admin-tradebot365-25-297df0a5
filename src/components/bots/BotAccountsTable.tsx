
import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Account } from '@/types';
import { ConnectionStatus } from '@/types/connection';
import { toast } from 'sonner';

interface BotAccountsTableProps {
  botId: string;
}

// Standardized mock accounts data
const mockAccounts: Account[] = [
  {
    id: 'ACC001',
    name: 'Trading Account 1',
    userAccount: 'Primary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
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
    id: 'ACC002',
    name: 'Trading Account 2',
    userAccount: 'Secondary Account',
    userEmail: 'user@example.com',
    apiName: 'Binance API',
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
    id: 'ACC003',
    name: 'Demo Account',
    userAccount: 'Test Account',
    userEmail: 'test@example.com',
    apiName: 'Coinbase API',
    apiId: 'API002',
    tradingAccount: '4044856',
    tradingAccountType: 'Demo',
    tradingAccountBalance: '$10000',
    status: 'Disconnected',
    createdDate: new Date(2023, 7, 10).toISOString(),
    lastUpdated: new Date(2023, 9, 18).toISOString(),
    userId: 'USR-002'
  },
];

const BotAccountsTable = ({ botId }: BotAccountsTableProps) => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAccounts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      setTimeout(() => {
        try {
          // Filter accounts by botId in a real implementation
          setAccounts(mockAccounts);
          setLoading(false);
        } catch (innerError) {
          console.error('Error processing accounts data:', innerError);
          setError(innerError instanceof Error ? innerError : new Error('An error occurred while processing accounts'));
          setLoading(false);
          toast.error('Error loading account information');
        }
      }, 800);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setLoading(false);
      toast.error('Error fetching account information');
    }
  }, [botId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleViewUserDetails = (userId: string) => {
    try {
      navigate(`/admin/users/${userId}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Error navigating to user details');
    }
  };

  const handleRefresh = () => {
    toast.info('Refreshing accounts data...');
    fetchAccounts();
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
    return (
      <div className="py-8 text-center text-muted-foreground">
        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
        <p>Loading accounts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-destructive bg-destructive/10 rounded-md p-6">
        <p className="mb-4">{error.message}</p>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
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
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Profile</TableHead>
            <TableHead>Api</TableHead>
            <TableHead>Account Trading</TableHead>
            <TableHead>Status</TableHead>
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
                {getStatusBadge(account.status as ConnectionStatus)}
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
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Accounts
        </Button>
      </div>
    </div>
  );
};

export default BotAccountsTable;


import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, TrashIcon } from 'lucide-react';
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
            clientId: 'CL001',
            secretId: 'SE001',
            accessToken: 'TOKEN001',
            ctidTraderAccountId: 'CTID001',
            name: 'Main Trading Account',
            status: 'Connected',
            createdDate: new Date(2023, 5, 15).toISOString(),
            lastUpdated: new Date(2023, 11, 20).toISOString(),
            expireDate: new Date(2024, 11, 20).toISOString(),
          },
          {
            clientId: 'CL002',
            secretId: 'SE002',
            accessToken: 'TOKEN002',
            ctidTraderAccountId: 'CTID002',
            name: 'Bitcoin Trading',
            status: 'Connected',
            createdDate: new Date(2023, 6, 22).toISOString(),
            lastUpdated: new Date(2023, 10, 5).toISOString(),
            expireDate: new Date(2024, 10, 5).toISOString(),
          },
          {
            clientId: 'CL003',
            secretId: 'SE003',
            accessToken: 'TOKEN003',
            ctidTraderAccountId: 'CTID003',
            name: 'Altcoins Portfolio',
            status: 'Disconnected',
            createdDate: new Date(2023, 7, 10).toISOString(),
            lastUpdated: new Date(2023, 9, 18).toISOString(),
            expireDate: new Date(2024, 9, 18).toISOString(),
          },
        ];
        setAccounts(mockAccounts);
        setLoading(false);
      }, 800);
    };

    fetchAccounts();
  }, [botId]);

  const handleViewAccount = (accountId: string) => {
    navigate(`/accounts/${accountId}`);
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
          <TableHead>Account Name</TableHead>
          <TableHead>CTID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.ctidTraderAccountId}>
            <TableCell className="font-medium">{account.name}</TableCell>
            <TableCell>{account.ctidTraderAccountId}</TableCell>
            <TableCell>{getStatusBadge(account.status)}</TableCell>
            <TableCell>
              {new Date(account.lastUpdated).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => handleViewAccount(account.ctidTraderAccountId)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
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

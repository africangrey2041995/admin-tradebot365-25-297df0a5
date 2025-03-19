
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, RefreshCw, Link2Off, AlertOctagon } from 'lucide-react';
import StatusIndicator from '@/components/ui/StatusIndicator';
import { toast } from 'sonner';
import { Connection } from '@/types';

const Connections = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockConnections: Connection[] = [
    {
      accountId: 'client123',
      connectionStatus: 'Connected',
      lastConnectionTime: '2023-06-20T14:45:00Z',
    },
    {
      accountId: 'client456',
      connectionStatus: 'Disconnected',
      lastConnectionTime: '2023-06-15T09:30:00Z',
      lastDisconnectionTime: '2023-06-22T11:20:00Z',
      errorMessage: 'Authentication failed. Invalid access token.',
    },
    {
      accountId: 'client789',
      connectionStatus: 'Pending',
      lastConnectionTime: '2023-06-18T16:10:00Z',
    }
  ];

  const filteredConnections = mockConnections.filter(connection => 
    connection.accountId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    return dateString ? new Date(dateString).toLocaleString() : 'N/A';
  };

  const handleReconnect = (accountId: string) => {
    toast(`Reconnecting account ${accountId}`, {
      description: 'Attempting to reconnect to Coinstrat.pro...',
    });
  };

  const handleDisconnect = (accountId: string) => {
    toast(`Disconnecting account ${accountId}`, {
      description: 'Disconnecting from Coinstrat.pro...',
    });
  };

  return (
    <MainLayout title="Connection Status">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search connections..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Connection</TableHead>
                <TableHead>Last Disconnection</TableHead>
                <TableHead>Error Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConnections.length > 0 ? (
                filteredConnections.map((connection) => (
                  <TableRow key={connection.accountId} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{connection.accountId}</TableCell>
                    <TableCell>
                      <StatusIndicator 
                        status={connection.connectionStatus} 
                        showLabel 
                        lastUpdated={
                          connection.connectionStatus === 'Connected' 
                            ? connection.lastConnectionTime 
                            : connection.lastDisconnectionTime
                        }
                      />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(connection.lastConnectionTime)}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(connection.lastDisconnectionTime)}
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      {connection.errorMessage && (
                        <div className="flex items-start gap-2 text-destructive text-sm">
                          <AlertOctagon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{connection.errorMessage}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {connection.connectionStatus === 'Disconnected' ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleReconnect(connection.accountId)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reconnect
                        </Button>
                      ) : connection.connectionStatus === 'Connected' ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDisconnect(connection.accountId)}
                        >
                          <Link2Off className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          disabled
                        >
                          Pending...
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No connections found. Please try a different search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Connections;

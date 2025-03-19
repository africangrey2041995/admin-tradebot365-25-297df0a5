
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PlusCircle, Search, CircuitBoard, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Bot } from '@/types';

const Bots = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  const mockBots: Bot[] = [
    {
      botId: '1',
      botName: 'BTC Trend Follower',
      signalToken: 'Bot_number_1',
      status: 'Active',
      createdDate: '2023-05-15T10:30:00Z',
      lastUpdated: '2023-06-20T14:45:00Z',
      accounts: []
    },
    {
      botId: '2',
      botName: 'ETH Scalper',
      signalToken: 'Bot_number_2',
      status: 'Active',
      createdDate: '2023-06-10T08:15:00Z',
      lastUpdated: '2023-06-22T11:20:00Z',
      accounts: []
    },
    {
      botId: '3',
      botName: 'Gold Reversal',
      signalToken: 'Bot_number_3',
      status: 'Inactive',
      createdDate: '2023-04-22T16:40:00Z',
      lastUpdated: '2023-06-18T09:10:00Z',
      accounts: []
    }
  ];

  const filteredBots = mockBots.filter(bot => 
    bot.botName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bot.signalToken.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleAddBot = () => {
    toast('This feature will be implemented in the next version', {
      description: 'You\'ll be able to add and manage bots here.',
    });
  };

  const handleEditBot = (botId: string) => {
    toast(`Edit bot ${botId}`, {
      description: 'This feature will be implemented in the next version.',
    });
  };

  const handleDeleteBot = (botId: string) => {
    toast(`Delete bot ${botId}`, {
      description: 'This feature will be implemented in the next version.',
    });
  };

  return (
    <MainLayout title="Bot Management">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search bots..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddBot}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Bot
        </Button>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bot Name</TableHead>
                <TableHead>Signal Token</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBots.length > 0 ? (
                filteredBots.map((bot) => (
                  <TableRow key={bot.botId} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <CircuitBoard className="h-4 w-4 mr-2 text-primary" />
                        {bot.botName}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{bot.signalToken}</TableCell>
                    <TableCell>
                      <Badge variant={bot.status === 'Active' ? 'success' : 'secondary'}>
                        {bot.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{formatDate(bot.createdDate)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{formatDate(bot.lastUpdated)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditBot(bot.botId)}>Edit Bot</DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteBot(bot.botId)}
                            className="text-destructive focus:text-destructive"
                          >
                            Delete Bot
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No bots found. Please try a different search or add a new bot.
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

export default Bots;

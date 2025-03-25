
import React, { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Account } from '@/types';
import { toast } from 'sonner';

// Type definitions for our hierarchical structure
interface TradingAccount {
  account: Account;
}

interface CSPAccount {
  account: Account;
  tradingAccounts: TradingAccount[];
}

interface UserAccount {
  userId: string;
  email: string;
  name: string;
  cspAccounts: CSPAccount[];
}

interface HierarchicalAccountsTableProps {
  accounts: Account[];
  onRefresh: () => void;
}

const HierarchicalAccountsTable: React.FC<HierarchicalAccountsTableProps> = ({ 
  accounts,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLiveDemo, setFilterLiveDemo] = useState('all');

  // Transform flat account list into hierarchical structure
  const organizeAccountsHierarchically = (accounts: Account[]): UserAccount[] => {
    const userMap = new Map<string, UserAccount>();
    
    accounts.forEach(account => {
      // Skip accounts without required fields
      if (!account.cspUserId || !account.cspUserEmail) return;
      
      // Get or create user
      if (!userMap.has(account.cspUserId)) {
        userMap.set(account.cspUserId, {
          userId: account.cspUserId,
          email: account.cspUserEmail,
          name: account.userAccount || account.cspUserEmail.split('@')[0],
          cspAccounts: []
        });
      }
      
      const user = userMap.get(account.cspUserId)!;
      
      // Find or create CSP account
      let cspAccount = user.cspAccounts.find(csp => csp.account.cspAccountId === account.cspAccountId);
      
      if (!cspAccount) {
        cspAccount = {
          account: { ...account },
          tradingAccounts: []
        };
        user.cspAccounts.push(cspAccount);
      }
      
      // Add trading account
      cspAccount.tradingAccounts.push({
        account: { ...account }
      });
    });
    
    return Array.from(userMap.values());
  };

  const hierarchicalData = organizeAccountsHierarchically(accounts);

  // Apply filtering
  const filteredData = hierarchicalData.filter(user => {
    // Search functionality across all levels
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesUser = 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower) || 
        user.userId.toLowerCase().includes(searchLower);
        
      const matchesCSP = user.cspAccounts.some(csp => 
        csp.account.cspAccountName.toLowerCase().includes(searchLower) ||
        csp.account.apiName?.toLowerCase().includes(searchLower)
      );
      
      const matchesTrading = user.cspAccounts.some(csp => 
        csp.tradingAccounts.some(trading => 
          trading.account.tradingAccountNumber?.toLowerCase().includes(searchLower)
        )
      );
      
      if (!(matchesUser || matchesCSP || matchesTrading)) {
        return false;
      }
    }
    
    return true;
  });

  // Calculate total accounts
  const getTotalCounts = () => {
    let totalUsers = hierarchicalData.length;
    let totalCSP = hierarchicalData.reduce((sum, user) => sum + user.cspAccounts.length, 0);
    let totalTrading = hierarchicalData.reduce((sum, user) => 
      sum + user.cspAccounts.reduce((cspSum, csp) => cspSum + csp.tradingAccounts.length, 0), 0
    );
    
    return { totalUsers, totalCSP, totalTrading };
  };
  
  const { totalUsers, totalCSP, totalTrading } = getTotalCounts();

  const getStatusBadge = (status: string) => {
    if (status === 'Connected') {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Disconnected</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-x-2 flex">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
            <Input
              placeholder="Search accounts..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select 
            className="px-2 py-1 border rounded-md text-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="connected">Connected</option>
            <option value="disconnected">Disconnected</option>
          </select>
          
          <select 
            className="px-2 py-1 border rounded-md text-sm"
            value={filterLiveDemo}
            onChange={(e) => setFilterLiveDemo(e.target.value)}
          >
            <option value="all">All Accounts</option>
            <option value="live">Live</option>
            <option value="demo">Demo</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <div className="text-sm">
            <span className="text-gray-500 mr-1">Users:</span>
            <span className="font-medium">{totalUsers}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500 mr-1">CSP Accounts:</span>
            <span className="font-medium">{totalCSP}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500 mr-1">Trading Accounts:</span>
            <span className="font-medium">{totalTrading}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Accordion type="multiple" className="w-full">
          {filteredData.map((user, userIndex) => (
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
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-2">
                <div className="pl-4 border-l">
                  <div className="space-y-2">
                    {user.cspAccounts.map((cspAccount, cspIndex) => (
                      <Collapsible key={`csp-${cspAccount.account.cspAccountId}`} className="border rounded-md">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left">
                          <div className="flex items-center">
                            <div className="font-medium">{cspAccount.account.cspAccountName}</div>
                            <div className="text-sm text-gray-500 ml-2">({cspAccount.account.apiName})</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {cspAccount.tradingAccounts.length} Trading Accounts
                            </Badge>
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent className="px-3 pb-3">
                          <div className="pl-4 border-l">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Account Number</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Balance</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {cspAccount.tradingAccounts.map((tradingAccount, tradingIndex) => (
                                  <TableRow key={`trading-${tradingAccount.account.tradingAccountId}`}>
                                    <TableCell>{tradingAccount.account.tradingAccountNumber}</TableCell>
                                    <TableCell>
                                      {tradingAccount.account.tradingAccountType} - {tradingAccount.account.isLive ? 'Live' : 'Demo'}
                                    </TableCell>
                                    <TableCell>{tradingAccount.account.tradingAccountBalance}</TableCell>
                                    <TableCell>{getStatusBadge(tradingAccount.account.status)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {filteredData.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No accounts found with the current filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default HierarchicalAccountsTable;


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
import { 
  MoreHorizontal, 
  Search, 
  Pencil, 
  Trash, 
  Link, 
  Link2Off,
  RefreshCw
} from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Type definitions for our hierarchical structure
interface TradingAccount {
  tradingAccountId: string;
  tradingAccountNumber: string;
  tradingAccountType: string;
  tradingAccountBalance: string;
  isLive: boolean;
  status: string;
}

interface CSPAccount {
  cspAccountId: string;
  cspAccountName: string;
  apiName: string;
  status: string;
  email: string;
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
  onEdit?: (account: Account) => void;
  onDelete?: (accountId: string) => void;
  onToggleConnection?: (accountId: string) => void;
}

const HierarchicalAccountsTable: React.FC<HierarchicalAccountsTableProps> = ({ 
  accounts,
  onRefresh,
  onEdit = () => toast.info("Edit functionality will be implemented"),
  onDelete = (id) => toast.info(`Delete account ${id} functionality will be implemented`),
  onToggleConnection = (id) => toast.info(`Toggle connection for ${id} functionality will be implemented`)
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
      let cspAccount = user.cspAccounts.find(csp => csp.cspAccountId === account.cspAccountId);
      
      if (!cspAccount) {
        cspAccount = {
          cspAccountId: account.cspAccountId || '',
          cspAccountName: account.cspAccountName || '',
          apiName: account.apiName || '',
          status: account.status || '',
          email: account.cspUserEmail || '',
          tradingAccounts: []
        };
        user.cspAccounts.push(cspAccount);
      }
      
      // Add trading account
      cspAccount.tradingAccounts.push({
        tradingAccountId: account.tradingAccountId || '',
        tradingAccountNumber: account.tradingAccountNumber || '',
        tradingAccountType: account.tradingAccountType || '',
        tradingAccountBalance: account.tradingAccountBalance || '',
        isLive: account.isLive || false,
        status: account.status || ''
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
        (csp.cspAccountName?.toLowerCase() || '').includes(searchLower) ||
        (csp.apiName?.toLowerCase() || '').includes(searchLower)
      );
      
      const matchesTrading = user.cspAccounts.some(csp => 
        csp.tradingAccounts.some(trading => 
          (trading.tradingAccountNumber?.toLowerCase() || '').includes(searchLower)
        )
      );
      
      if (!(matchesUser || matchesCSP || matchesTrading)) {
        return false;
      }
    }
    
    // Filter by status if not 'all'
    if (filterStatus !== 'all') {
      const statusMatches = user.cspAccounts.some(csp => 
        csp.status.toLowerCase() === filterStatus ||
        csp.tradingAccounts.some(account => account.status.toLowerCase() === filterStatus)
      );
      
      if (!statusMatches) return false;
    }
    
    // Filter by live/demo if not 'all'
    if (filterLiveDemo !== 'all') {
      const isLive = filterLiveDemo === 'live';
      const liveStatusMatches = user.cspAccounts.some(csp => 
        csp.tradingAccounts.some(account => account.isLive === isLive)
      );
      
      if (!liveStatusMatches) return false;
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

  // Find original account from flat list
  const findOriginalAccount = (userId: string, cspAccountId: string, tradingAccountId?: string): Account | undefined => {
    return accounts.find(acc => 
      acc.cspUserId === userId && 
      acc.cspAccountId === cspAccountId && 
      (tradingAccountId ? acc.tradingAccountId === tradingAccountId : true)
    );
  };

  // Prepare data for export
  const prepareExportData = (): (string | number)[][] => {
    const exportData: (string | number)[][] = [];
    
    hierarchicalData.forEach(user => {
      user.cspAccounts.forEach(cspAccount => {
        cspAccount.tradingAccounts.forEach(tradingAccount => {
          exportData.push([
            tradingAccount.tradingAccountNumber,
            user.email,
            cspAccount.apiName,
            tradingAccount.tradingAccountType,
            tradingAccount.status,
            tradingAccount.tradingAccountBalance
          ]);
        });
      });
    });
    
    return exportData;
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
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast.info(`View all accounts for ${user.name}`)}>
                          View All Accounts
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info(`Contact ${user.name}`)}>
                          Contact User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-2">
                <div className="pl-4 border-l">
                  <div className="space-y-2">
                    {user.cspAccounts.map((cspAccount, cspIndex) => (
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
                                  const originalAccount = findOriginalAccount(user.userId, cspAccount.cspAccountId);
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
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Account Number</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Balance</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {cspAccount.tradingAccounts.map((tradingAccount, tradingIndex) => (
                                  <TableRow key={`trading-${tradingAccount.tradingAccountId}-${tradingIndex}`}>
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
                                            const originalAccount = findOriginalAccount(
                                              user.userId, 
                                              cspAccount.cspAccountId, 
                                              tradingAccount.tradingAccountId
                                            );
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

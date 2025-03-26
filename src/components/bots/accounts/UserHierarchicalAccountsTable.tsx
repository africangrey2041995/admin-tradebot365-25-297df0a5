import React, { useState, useEffect, useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, RefreshCw, Plus, Settings, Edit, Trash, Link, Link2 } from 'lucide-react';
import { Account } from '@/types';
import { toast } from 'sonner';
import { CSPAccount, TradingAccount } from '@/hooks/accounts/useAccountsTransform';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmptyAccountsState from './EmptyAccountsState';
import LoadingAccounts from './LoadingAccounts';
import ErrorState from './ErrorState';
import AccountsFilter from './AccountsFilter';

interface AccountsFilterParams {
  searchQuery: string;
  filterStatus: string;
  filterLiveDemo: string;
}

interface UserHierarchicalAccountsTableProps {
  accounts: Account[];
  isLoading: boolean;
  error: Error | null;
  onRefresh: () => void;
  onAddAccount?: () => void;
  onEditAccount?: (account: Account) => void;
  onDeleteAccount?: (accountId: string) => void;
  onToggleStatus?: (accountId: string) => void;
  botType?: 'premium' | 'prop' | 'user';
}

const organizeAccounts = (accounts: Account[]) => {
  const cspAccountsMap = new Map<string, CSPAccount>();
  
  accounts.forEach(account => {
    const cspAccountId = account.cspAccountId;
    
    if (!cspAccountsMap.has(cspAccountId)) {
      cspAccountsMap.set(cspAccountId, {
        cspAccountId: account.cspAccountId,
        cspAccountName: account.cspAccountName,
        apiName: account.apiName || '',
        status: account.status || '',
        email: account.cspUserEmail || '',
        tradingAccounts: []
      });
    }
    
    const cspAccount = cspAccountsMap.get(cspAccountId)!;
    
    cspAccount.tradingAccounts.push({
      tradingAccountId: account.tradingAccountId || '',
      tradingAccountNumber: account.tradingAccountNumber || '',
      tradingAccountType: account.tradingAccountType || '',
      tradingAccountBalance: account.tradingAccountBalance || '',
      isLive: account.isLive || false,
      status: account.status || ''
    });
  });
  
  return Array.from(cspAccountsMap.values());
};

const getStatusBadge = (status: string) => {
  let colorClass;
  
  switch (status.toLowerCase()) {
    case 'connected':
      colorClass = 'bg-green-100 text-green-800 border-green-200';
      break;
    case 'disconnected':
      colorClass = 'bg-red-100 text-red-800 border-red-200';
      break;
    case 'pending':
      colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 border-gray-200';
  }
  
  return <Badge variant="outline" className={colorClass}>{status}</Badge>;
};

const filterAccounts = (
  cspAccounts: CSPAccount[],
  filters: AccountsFilterParams
): CSPAccount[] => {
  if (!filters.searchQuery && filters.filterStatus === 'all' && filters.filterLiveDemo === 'all') {
    return cspAccounts;
  }

  return cspAccounts.filter(cspAccount => {
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      
      if (!cspAccount.cspAccountName.toLowerCase().includes(query) &&
          !cspAccount.apiName.toLowerCase().includes(query) &&
          !cspAccount.email.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    if (filters.filterStatus !== 'all') {
      const statusMatches = 
        cspAccount.status.toLowerCase() === filters.filterStatus.toLowerCase() ||
        cspAccount.tradingAccounts.some(ta => 
          ta.status.toLowerCase() === filters.filterStatus.toLowerCase()
        );
      
      if (!statusMatches) {
        return false;
      }
    }
    
    if (filters.filterLiveDemo !== 'all') {
      const isLive = filters.filterLiveDemo === 'live';
      const liveMatches = cspAccount.tradingAccounts.some(ta => ta.isLive === isLive);
      
      if (!liveMatches) {
        return false;
      }
    }
    
    return true;
  });
};

const UserHierarchicalAccountsTable: React.FC<UserHierarchicalAccountsTableProps> = ({
  accounts,
  isLoading,
  error,
  onRefresh,
  onAddAccount,
  onEditAccount,
  onDeleteAccount,
  onToggleStatus,
  botType = 'user'
}) => {
  const [expandedCSPs, setExpandedCSPs] = useState<string[]>([]);
  const [filters, setFilters] = useState<AccountsFilterParams>({
    searchQuery: '',
    filterStatus: 'all',
    filterLiveDemo: 'all'
  });

  const toggleCSPExpansion = (cspId: string) => {
    setExpandedCSPs(prev => 
      prev.includes(cspId) 
        ? prev.filter(id => id !== cspId) 
        : [...prev, cspId]
    );
  };

  const handleEdit = (account: Account) => {
    if (onEditAccount) {
      onEditAccount(account);
    } else {
      toast.info("Edit functionality will be implemented");
    }
  };

  const handleDelete = (accountId: string) => {
    if (onDeleteAccount) {
      onDeleteAccount(accountId);
    } else {
      toast.info(`Delete account ${accountId} functionality will be implemented`);
    }
  };

  const handleToggleStatus = (accountId: string) => {
    if (onToggleStatus) {
      onToggleStatus(accountId);
    } else {
      toast.info(`Toggle connection for ${accountId} functionality will be implemented`);
    }
  };

  const findOriginalAccount = (cspAccountId: string, tradingAccountId: string): Account | undefined => {
    return accounts.find(acc => 
      acc.cspAccountId === cspAccountId && acc.tradingAccountId === tradingAccountId
    );
  };

  const handleFilterChange = (newFilters: AccountsFilterParams) => {
    setFilters(newFilters);
  };

  const organizedAccounts = useMemo(() => organizeAccounts(accounts), [accounts]);
  const filteredAccounts = useMemo(() => 
    filterAccounts(organizedAccounts, filters), 
    [organizedAccounts, filters]
  );
  const totalTradingAccounts = useMemo(() => {
    return accounts.length;
  }, [accounts]);

  if (isLoading) {
    return <LoadingAccounts message="Đang tải tài khoản..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRefresh} />;
  }

  if (!accounts || accounts.length === 0) {
    return (
      <EmptyAccountsState 
        onRefresh={onRefresh} 
        botType={botType} 
        onAddAccount={onAddAccount} 
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium">Tài khoản CSP</h3>
          <p className="text-sm text-muted-foreground">
            Quản lý tài khoản Coinstrat Pro và tài khoản giao dịch của bạn
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
        </div>
      </div>

      <AccountsFilter 
        onFilterChange={handleFilterChange}
        totalAccounts={totalTradingAccounts}
      />

      <Accordion type="multiple" className="w-full space-y-2">
        {filteredAccounts.map((cspAccount) => (
          <AccordionItem 
            value={cspAccount.cspAccountId}
            key={cspAccount.cspAccountId}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="hover:no-underline py-3">
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <span className="font-medium text-base">{cspAccount.cspAccountName}</span>
                    <span className="ml-2 text-muted-foreground">({cspAccount.apiName})</span>
                  </div>
                  {cspAccount.email && (
                    <span className="text-sm text-muted-foreground">{cspAccount.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(cspAccount.status)}
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {cspAccount.tradingAccounts.length} Tài khoản giao dịch
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tài khoản</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Số dư</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cspAccount.tradingAccounts.map((tradingAccount) => {
                      const originalAccount = findOriginalAccount(
                        cspAccount.cspAccountId, 
                        tradingAccount.tradingAccountId
                      );
                      
                      return (
                        <TableRow key={tradingAccount.tradingAccountId}>
                          <TableCell>{tradingAccount.tradingAccountNumber}</TableCell>
                          <TableCell>
                            {tradingAccount.tradingAccountType} - {tradingAccount.isLive ? 'Live' : 'Demo'}
                          </TableCell>
                          <TableCell>{tradingAccount.tradingAccountBalance}</TableCell>
                          <TableCell>{getStatusBadge(tradingAccount.status)}</TableCell>
                          <TableCell className="text-right space-x-1">
                            {originalAccount && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleEdit(originalAccount)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDelete(tradingAccount.tradingAccountId)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleToggleStatus(tradingAccount.tradingAccountId)}
                                >
                                  {tradingAccount.status === 'Connected' 
                                    ? <Link2 className="h-4 w-4" /> 
                                    : <Link className="h-4 w-4" />
                                  }
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default UserHierarchicalAccountsTable;

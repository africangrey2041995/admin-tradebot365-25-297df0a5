
import React, { useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Account } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import AccountsFilter from './accounts/AccountsFilter';
import AccountsStatsDisplay from './accounts/AccountsStatsDisplay';
import AccountsAccordionGroup from './accounts/AccountsAccordionGroup';
import { AccountsFilterParams, UserAccount } from '../types/account-types';
import { organizeAccountsHierarchically, filterAccountData, getTotalCounts } from '../utils/account-utils';

export interface HierarchicalAccountsTableProps {
  accounts: Account[];
  onRefresh: () => void;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onToggleConnection: (accountId: string) => void;
  // Thêm props mới 
  selectedAccounts?: string[];
  onToggleSelect?: (accountId: string) => void;
}

const HierarchicalAccountsTable: React.FC<HierarchicalAccountsTableProps> = ({
  accounts,
  onRefresh,
  onEdit,
  onDelete,
  onToggleConnection,
  selectedAccounts = [],
  onToggleSelect
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterParams, setFilterParams] = useState<AccountsFilterParams>({
    searchQuery: '',
    filterStatus: 'all',
    filterLiveDemo: 'all'
  });

  // Transform flat list to hierarchical structure
  const hierarchicalData = organizeAccountsHierarchically(accounts);
  
  // Apply filters
  const filteredData = filterAccountData(hierarchicalData, filterParams);
  
  // Get account counts
  const accountCounts = getTotalCounts(filteredData);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  // Cập nhật hàm này để khớp với interface của AccountsFilter component
  const handleFilterChange = (key: keyof AccountsFilterParams, value: string) => {
    setFilterParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <AccountsFilter 
          filterParams={filterParams}
          onFilterChange={handleFilterChange}
        />
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          disabled={isRefreshing}
          className="w-full md:w-auto"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <AccountsStatsDisplay counts={accountCounts} />

      {filteredData.length > 0 ? (
        <Accordion type="multiple" className="border rounded-md p-1">
          {filteredData.map((user) => (
            <AccountsAccordionGroup
              key={user.userId}
              userId={user.userId}
              accounts={accounts}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleConnection={onToggleConnection}
              selectedAccounts={selectedAccounts}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-10 border rounded-md">
          <p className="text-gray-500">No accounts found matching your filters</p>
        </div>
      )}
    </div>
  );
};

export default HierarchicalAccountsTable;

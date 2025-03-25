
import React, { useState, useCallback } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Account } from '@/types';
import { toast } from 'sonner';
import { UserAccount, AccountsFilterParams, AccountsCount } from '../types/account-types';
import { 
  organizeAccountsHierarchically, 
  filterAccountData, 
  getTotalCounts 
} from '../utils/account-utils';
import UserAccountItem from './accounts/UserAccountItem';
import AccountsFilter from './accounts/AccountsFilter';
import AccountsStatsDisplay from './accounts/AccountsStatsDisplay';

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
  // State for filters
  const [filters, setFilters] = useState<AccountsFilterParams>({
    searchQuery: '',
    filterStatus: 'all',
    filterLiveDemo: 'all'
  });

  // Transform flat account list into hierarchical structure (memoized)
  const hierarchicalData = React.useMemo(() => 
    organizeAccountsHierarchically(accounts), 
  [accounts]);

  // Apply filtering (memoized)
  const filteredData = React.useMemo(() => 
    filterAccountData(hierarchicalData, filters), 
  [hierarchicalData, filters]);

  // Calculate total accounts (memoized)
  const counts: AccountsCount = React.useMemo(() => 
    getTotalCounts(hierarchicalData), 
  [hierarchicalData]);

  // Handler for filter changes
  const handleFilterChange = useCallback((key: keyof AccountsFilterParams, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <AccountsFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <AccountsStatsDisplay 
          counts={counts}
          onRefresh={onRefresh}
        />
      </div>
      
      <div className="border rounded-md">
        <Accordion type="multiple" className="w-full">
          {filteredData.map((user) => (
            <UserAccountItem
              key={`user-${user.userId}`}
              user={user}
              accounts={accounts}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleConnection={onToggleConnection}
            />
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

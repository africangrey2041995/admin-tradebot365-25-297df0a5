
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { AccountsFilterParams } from '../../types/account-types';

interface AccountsFilterProps {
  filters: AccountsFilterParams;
  onFilterChange: (key: keyof AccountsFilterParams, value: string) => void;
}

const AccountsFilter: React.FC<AccountsFilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="space-x-2 flex">
      <div className="relative">
        <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
        <Input
          placeholder="Search accounts..."
          className="pl-8 w-64"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
        />
      </div>
      
      <select 
        className="px-2 py-1 border rounded-md text-sm"
        value={filters.filterStatus}
        onChange={(e) => onFilterChange('filterStatus', e.target.value)}
      >
        <option value="all">All Statuses</option>
        <option value="connected">Connected</option>
        <option value="disconnected">Disconnected</option>
      </select>
      
      <select 
        className="px-2 py-1 border rounded-md text-sm"
        value={filters.filterLiveDemo}
        onChange={(e) => onFilterChange('filterLiveDemo', e.target.value)}
      >
        <option value="all">All Accounts</option>
        <option value="live">Live</option>
        <option value="demo">Demo</option>
      </select>
    </div>
  );
};

export default AccountsFilter;

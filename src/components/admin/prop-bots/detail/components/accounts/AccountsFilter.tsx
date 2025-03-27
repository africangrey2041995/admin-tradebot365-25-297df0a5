
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { AccountsFilterParams } from '../../types/account-types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AccountsFilterProps {
  filters: AccountsFilterParams;
  onFilterChange: (key: keyof AccountsFilterParams, value: string) => void;
}

const AccountsFilter: React.FC<AccountsFilterProps> = ({ filters, onFilterChange }) => {
  // Reset search when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup function - reset search if needed
      console.log('AccountsFilter component unmounted');
    };
  }, []);

  // Handle search input changes with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('Search value changed:', value);
    onFilterChange('searchQuery', value);
  };

  return (
    <div className="space-x-2 flex">
      <div className="relative">
        <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
        <Input
          placeholder="Search accounts..."
          className="pl-8 w-64"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <Select 
        value={filters.filterStatus} 
        onValueChange={(value) => onFilterChange('filterStatus', value)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="error">Error</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AccountsFilter;


import React from 'react';
import { Input } from '@/components/ui/input';
import { AccountsFilterParams } from '../../types/account-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AccountsFilterProps {
  filterParams: AccountsFilterParams;
  onFilterChange: (key: keyof AccountsFilterParams, value: string) => void;
}

const AccountsFilter: React.FC<AccountsFilterProps> = ({
  filterParams,
  onFilterChange
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex-1">
        <Input
          placeholder="Search accounts..."
          value={filterParams.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex gap-2">
        <Select 
          value={filterParams.filterStatus} 
          onValueChange={(value) => onFilterChange('filterStatus', value)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="disconnected">Disconnected</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          value={filterParams.filterLiveDemo} 
          onValueChange={(value) => onFilterChange('filterLiveDemo', value)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Account Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Accounts</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="demo">Demo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AccountsFilter;

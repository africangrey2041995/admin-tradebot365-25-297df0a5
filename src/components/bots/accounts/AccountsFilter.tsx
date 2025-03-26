
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AccountsFilterParams {
  searchQuery: string;
  filterStatus: string;
  filterLiveDemo: string;
}

interface AccountsFilterProps {
  onFilterChange: (filters: AccountsFilterParams) => void;
  totalAccounts: number;
}

const AccountsFilter: React.FC<AccountsFilterProps> = ({ 
  onFilterChange,
  totalAccounts
}) => {
  const [filters, setFilters] = useState<AccountsFilterParams>({
    searchQuery: '',
    filterStatus: 'all',
    filterLiveDemo: 'all'
  });

  // Apply filters when they change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  // Handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: e.target.value
    }));
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      filterStatus: e.target.value
    }));
  };

  // Handle live/demo filter change
  const handleLiveDemoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      filterLiveDemo: e.target.value
    }));
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
      <div className="relative w-full md:w-auto md:flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Tìm kiếm tài khoản..."
          className="pl-10"
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Lọc:</span>
        </div>
        
        <select 
          className="px-3 py-2 border rounded-md text-sm bg-background"
          value={filters.filterStatus}
          onChange={handleStatusChange}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="connected">Đã kết nối</option>
          <option value="disconnected">Đã ngắt kết nối</option>
        </select>
        
        <select 
          className="px-3 py-2 border rounded-md text-sm bg-background"
          value={filters.filterLiveDemo}
          onChange={handleLiveDemoChange}
        >
          <option value="all">Tất cả loại</option>
          <option value="live">Live</option>
          <option value="demo">Demo</option>
        </select>
        
        <Badge variant="outline" className="ml-2">
          {totalAccounts} Tài khoản
        </Badge>
      </div>
    </div>
  );
};

export default AccountsFilter;

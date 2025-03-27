
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface AccountsFilterProps {
  onFilterChange: (newFilters: {
    searchQuery: string;
    filterStatus: string;
    filterLiveDemo: string;
  }) => void;
  totalAccounts: number;
}

const AccountsFilter: React.FC<AccountsFilterProps> = ({
  onFilterChange,
  totalAccounts
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [filterLiveDemo, setFilterLiveDemo] = React.useState('all');

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    onFilterChange({
      searchQuery: value,
      filterStatus,
      filterLiveDemo
    });
  };

  // Handle status filter changes
  const handleStatusChange = (value: string) => {
    if (!value || value.trim() === '') return; // Prevent empty string values
    setFilterStatus(value);
    
    onFilterChange({
      searchQuery,
      filterStatus: value,
      filterLiveDemo
    });
  };

  // Handle live/demo filter changes
  const handleLiveDemoChange = (value: string) => {
    if (!value || value.trim() === '') return; // Prevent empty string values
    setFilterLiveDemo(value);
    
    onFilterChange({
      searchQuery,
      filterStatus,
      filterLiveDemo: value
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          Tài khoản
          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700">
            {totalAccounts} Tài khoản
          </Badge>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative md:w-1/2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm tài khoản..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="connected">Đã kết nối</SelectItem>
              <SelectItem value="disconnected">Chưa kết nối</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterLiveDemo} onValueChange={handleLiveDemoChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tài khoản" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="demo">Demo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AccountsFilter;

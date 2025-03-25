
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LogsFilterBarProps {
  onFilterChange: (filters: any) => void;
  showExport?: boolean;
  exportComponent?: React.ReactNode;
}

const LogsFilterBar: React.FC<LogsFilterBarProps> = ({ 
  onFilterChange,
  showExport = false,
  exportComponent = null
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    applyFilters(value, statusFilter, timeRange);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    applyFilters('', statusFilter, timeRange);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(searchValue, value, timeRange);
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    applyFilters(searchValue, statusFilter, value);
  };

  const applyFilters = (search: string, status: string, time: string) => {
    onFilterChange({
      search,
      status,
      time
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Input
          placeholder="Tìm kiếm theo ID, Symbol..."
          value={searchValue}
          onChange={handleSearchChange}
          className="pl-9"
        />
        <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
        {searchValue && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-6 w-6 p-0 opacity-70"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex flex-row gap-3">
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="success">Thành công</SelectItem>
            <SelectItem value="error">Lỗi</SelectItem>
            <SelectItem value="pending">Đang xử lý</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả thời gian</SelectItem>
            <SelectItem value="today">Hôm nay</SelectItem>
            <SelectItem value="yesterday">Hôm qua</SelectItem>
            <SelectItem value="week">Tuần này</SelectItem>
            <SelectItem value="month">Tháng này</SelectItem>
          </SelectContent>
        </Select>
        
        {showExport && exportComponent}
      </div>
    </div>
  );
};

export default LogsFilterBar;

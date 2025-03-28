
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Search, Filter, AlignJustify, SortAsc, SortDesc
} from 'lucide-react';

interface ApiKeyFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterStatus: string;
  onStatusFilterChange: (value: string) => void;
  sortField: string;
  onSortFieldChange: (value: string) => void;
  sortDirection: 'asc' | 'desc';
  onSortDirectionChange: () => void;
}

const ApiKeyFilters: React.FC<ApiKeyFiltersProps> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onStatusFilterChange,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Tìm kiếm API key..." 
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 items-center">
        <Select value={filterStatus} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>
                {filterStatus === 'all' && 'Tất cả trạng thái'}
                {filterStatus === 'connected' && 'Đã kết nối'}
                {filterStatus === 'disconnected' && 'Chưa kết nối'}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="connected">Đã kết nối</SelectItem>
            <SelectItem value="disconnected">Chưa kết nối</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={sortField} onValueChange={onSortFieldChange}>
          <SelectTrigger className="w-[160px]">
            <div className="flex items-center gap-2">
              <AlignJustify className="h-4 w-4" />
              <span>
                {sortField === 'name' && 'Tên API'}
                {sortField === 'clientId' && 'Client ID'}
                {sortField === 'connectionStatus' && 'Kết nối'}
                {sortField === 'expiry' && 'Hết hạn'}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Tên API</SelectItem>
            <SelectItem value="clientId">Client ID</SelectItem>
            <SelectItem value="connectionStatus">Kết nối</SelectItem>
            <SelectItem value="expiry">Hết hạn</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onSortDirectionChange}
          className="h-10 w-10"
        >
          {sortDirection === 'asc' ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ApiKeyFilters;

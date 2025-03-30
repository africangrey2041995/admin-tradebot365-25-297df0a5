
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface AccountsFilterProps {
  onFilterChange: (filter: { search?: string; status?: string | null }) => void;
  totalAccounts: number;
}

const AccountsFilter: React.FC<AccountsFilterProps> = ({ onFilterChange, totalAccounts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ search: value });
  };
  
  const handleStatusFilter = (status: string | null) => {
    setStatusFilter(status);
    onFilterChange({ status });
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter(null);
    onFilterChange({ search: '', status: null });
  };
  
  const getStatusLabel = (status: string | null) => {
    if (!status) return 'Tất cả trạng thái';
    
    switch (status.toLowerCase()) {
      case 'connected': return 'Đã kết nối';
      case 'disconnected': return 'Đã ngắt kết nối';
      case 'inactive': return 'Không hoạt động';
      default: return status;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 w-full">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Tìm kiếm tài khoản..."
          className="pl-8"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button
            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setSearchTerm('');
              onFilterChange({ search: '' });
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Trạng thái: </span>
            <span>{getStatusLabel(statusFilter)}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Lọc theo trạng thái</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleStatusFilter(null)} className="flex justify-between">
            Tất cả trạng thái
            {!statusFilter && <Badge className="bg-primary">Đang chọn</Badge>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusFilter('Connected')} className="flex justify-between">
            Đã kết nối
            {statusFilter === 'Connected' && <Badge className="bg-primary">Đang chọn</Badge>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusFilter('Disconnected')} className="flex justify-between">
            Đã ngắt kết nối
            {statusFilter === 'Disconnected' && <Badge className="bg-primary">Đang chọn</Badge>}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleStatusFilter('Inactive')} className="flex justify-between">
            Không hoạt động
            {statusFilter === 'Inactive' && <Badge className="bg-primary">Đang chọn</Badge>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {(searchTerm || statusFilter) && (
        <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-1">
          <X className="h-4 w-4" />
          <span>Xóa bộ lọc</span>
        </Button>
      )}
      
      <div className="ml-auto text-sm text-muted-foreground">
        <span>Tổng cộng: {totalAccounts} tài khoản</span>
      </div>
    </div>
  );
};

export default AccountsFilter;

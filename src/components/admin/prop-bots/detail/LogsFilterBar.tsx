
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';

export interface LogsFilterBarProps {
  onFilterChange: (filters: any) => void;
  filters: {
    search: string;
    status: string;
    time: string;
    accountId: string;
    userId: string;
    action: string;
  };
}

export const LogsFilterBar: React.FC<LogsFilterBarProps> = ({ 
  onFilterChange,
  filters
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Tìm kiếm ID, cặp tiền, hành động..."
            className="pl-9 bg-gray-900 border-gray-700"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        
        <div className="flex gap-2">
          <Select 
            value={filters.status} 
            onValueChange={(value) => onFilterChange({ status: value })}
          >
            <SelectTrigger className="w-[120px] bg-gray-900 border-gray-700">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trạng thái" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Processed">Thành công</SelectItem>
              <SelectItem value="Failed">Thất bại</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.time} 
            onValueChange={(value) => onFilterChange({ time: value })}
          >
            <SelectTrigger className="w-[130px] bg-gray-900 border-gray-700">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Thời gian" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="last-hour">Giờ qua</SelectItem>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="last-week">Tuần qua</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.action} 
            onValueChange={(value) => onFilterChange({ action: value })}
          >
            <SelectTrigger className="w-[130px] bg-gray-900 border-gray-700">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Hành động" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="ENTER">Vào lệnh</SelectItem>
              <SelectItem value="EXIT">Đóng lệnh</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            placeholder="Lọc theo ID tài khoản..."
            className="bg-gray-900 border-gray-700"
            value={filters.accountId}
            onChange={(e) => onFilterChange({ accountId: e.target.value })}
          />
        </div>
        <div className="relative flex-1">
          <Input
            placeholder="Lọc theo ID người dùng..."
            className="bg-gray-900 border-gray-700"
            value={filters.userId}
            onChange={(e) => onFilterChange({ userId: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

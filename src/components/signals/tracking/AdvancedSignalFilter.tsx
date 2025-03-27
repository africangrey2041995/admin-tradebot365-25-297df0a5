
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { SignalFilters, SignalUser } from '../types';
import { Badge } from '@/components/ui/badge';

interface AdvancedSignalFilterProps {
  onFilterChange: (filters: SignalFilters) => void;
  availableUsers?: SignalUser[];
  showExport?: boolean;
  exportComponent?: React.ReactNode;
}

export const AdvancedSignalFilter: React.FC<AdvancedSignalFilterProps> = ({
  onFilterChange,
  availableUsers = [],
  showExport = false,
  exportComponent
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SignalFilters>({
    dateRange: [null, null],
    status: [],
    actions: [],
    instruments: [],
    userId: '',
    search: '',
    sortBy: 'timestamp',
    sortOrder: 'desc'
  });
  
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<SignalFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    
    // Count active filters
    let count = 0;
    if (updatedFilters.dateRange && (updatedFilters.dateRange[0] || updatedFilters.dateRange[1])) count++;
    if (updatedFilters.status && updatedFilters.status.length > 0) count++;
    if (updatedFilters.actions && updatedFilters.actions.length > 0) count++;
    if (updatedFilters.instruments && updatedFilters.instruments.length > 0) count++;
    if (updatedFilters.userId) count++;
    if (updatedFilters.search) count++;
    
    setActiveFiltersCount(count);
  };

  // Reset all filters
  const resetFilters = () => {
    const defaultFilters = {
      dateRange: [null, null],
      status: [],
      actions: [],
      instruments: [],
      userId: '',
      search: '',
      sortBy: 'timestamp',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setActiveFiltersCount(0);
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "PPP", { locale: vi });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Lọc</span>
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1 bg-primary text-primary-foreground">{activeFiltersCount}</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-4" align="start">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Khoảng thời gian</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filters.dateRange?.[0] && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange?.[0] ? formatDate(filters.dateRange[0]) : "Từ ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange?.[0] || undefined}
                          onSelect={(date) => handleFilterChange({ dateRange: [date, filters.dateRange?.[1] || null] })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !filters.dateRange?.[1] && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateRange?.[1] ? formatDate(filters.dateRange[1]) : "Đến ngày"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange?.[1] || undefined}
                          onSelect={(date) => handleFilterChange({ dateRange: [filters.dateRange?.[0] || null, date] })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {availableUsers.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Người dùng</h4>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={filters.userId || ''}
                      onChange={(e) => handleFilterChange({ userId: e.target.value })}
                    >
                      <option value="">Tất cả người dùng</option>
                      {availableUsers.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Trạng thái</h4>
                  <Tabs 
                    defaultValue="all" 
                    className="w-full"
                    onValueChange={(value) => {
                      if (value === 'all') handleFilterChange({ status: [] });
                      else if (value === 'processed') handleFilterChange({ status: ['Processed'] });
                      else if (value === 'failed') handleFilterChange({ status: ['Failed'] });
                      else if (value === 'pending') handleFilterChange({ status: ['Pending'] });
                    }}
                  >
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="all">Tất cả</TabsTrigger>
                      <TabsTrigger value="processed">Thành công</TabsTrigger>
                      <TabsTrigger value="pending">Đang xử lý</TabsTrigger>
                      <TabsTrigger value="failed">Lỗi</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Xóa bộ lọc
                  </Button>
                  <Button size="sm" onClick={() => setIsOpen(false)}>Áp dụng</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Active filters display could go here */}
        </div>

        {showExport && exportComponent && (
          <div>
            {exportComponent}
          </div>
        )}
      </div>
    </div>
  );
};

// Export the component as default
export default AdvancedSignalFilter;

// Re-export the SignalFilters type
export type { SignalFilters };


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Calendar as CalendarIcon, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SignalFilters } from '../types';

export interface AdvancedSignalFilterProps {
  /** Callback when filters change */
  onFilterChange: (filters: SignalFilters) => void;
  
  /** Available users to filter by */
  availableUsers?: { id: string; name: string }[];
  
  /** Whether to show export options */
  showExport?: boolean;
  
  /** Custom export component */
  exportComponent?: React.ReactNode;
  
  /** Initial filters */
  initialFilters?: Partial<SignalFilters>;
}

/**
 * Advanced Signal Filter Component
 * 
 * A comprehensive filter interface for signal data with multiple 
 * filter criteria options.
 * 
 * @example
 * ```tsx
 * <AdvancedSignalFilter 
 *   onFilterChange={handleFilterChange}
 *   availableUsers={users}
 *   showExport={true}
 * />
 * ```
 */
const AdvancedSignalFilter: React.FC<AdvancedSignalFilterProps> = ({
  onFilterChange,
  availableUsers = [],
  showExport = false,
  exportComponent,
  initialFilters = {}
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState<SignalFilters>({
    search: '',
    signalSource: 'all',
    status: 'all',
    dateRange: {
      from: undefined,
      to: undefined
    },
    userId: '',
    ...initialFilters
  });
  
  // Helper to check if any filters are active
  const hasActiveFilters = (): boolean => {
    return (
      !!filters.search ||
      filters.signalSource !== 'all' ||
      filters.status !== 'all' ||
      !!filters.dateRange.from ||
      !!filters.dateRange.to ||
      !!filters.userId
    );
  };
  
  // Handle text search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      search: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Handle source type selection
  const handleSourceChange = (value: string) => {
    const newFilters = {
      ...filters,
      signalSource: value as 'all' | 'tradingview' | 'coinstrat'
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Handle status selection
  const handleStatusChange = (value: string) => {
    const newFilters = {
      ...filters,
      status: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Handle date range selection
  const handleDateRangeChange = (field: 'from' | 'to', value: Date | undefined) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Handle user selection
  const handleUserChange = (value: string) => {
    const newFilters = {
      ...filters,
      userId: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Reset all filters
  const handleResetFilters = () => {
    const newFilters: SignalFilters = {
      search: '',
      signalSource: 'all',
      status: 'all',
      dateRange: {
        from: undefined,
        to: undefined
      },
      userId: ''
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
    setIsAdvancedOpen(false);
  };
  
  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString();
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          {/* Basic search row */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search signals..."
                className="pl-8"
                value={filters.search}
                onChange={handleSearchChange}
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={cn(
                "gap-1",
                isAdvancedOpen && "border-primary/50 bg-primary/5"
              )}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveFilters() && (
                <span className="ml-1 rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
                  Active
                </span>
              )}
            </Button>
            
            {showExport && exportComponent}
          </div>
          
          {/* Advanced filters */}
          {isAdvancedOpen && (
            <div className="grid gap-4 pt-2 md:grid-cols-2 lg:grid-cols-4">
              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Signal Source */}
              <div className="space-y-2">
                <Label>Signal Source</Label>
                <Select
                  value={filters.signalSource}
                  onValueChange={handleSourceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="tradingview">TradingView</SelectItem>
                    <SelectItem value="coinstrat">Coinstrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Date Range - From */}
              <div className="space-y-2">
                <Label>Date From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.from ? formatDate(filters.dateRange.from) : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.from}
                      onSelect={(date) => handleDateRangeChange('from', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Date Range - To */}
              <div className="space-y-2">
                <Label>Date To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.dateRange.to ? formatDate(filters.dateRange.to) : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.dateRange.to}
                      onSelect={(date) => handleDateRangeChange('to', date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Users */}
              {availableUsers.length > 0 && (
                <div className="space-y-2 lg:col-span-2">
                  <Label>User</Label>
                  <Select
                    value={filters.userId}
                    onValueChange={handleUserChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Users</SelectItem>
                      {availableUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-2 lg:col-span-2">
                <Button
                  variant="secondary"
                  onClick={handleResetFilters}
                  className="gap-1"
                >
                  <X className="h-4 w-4" />
                  <span>Reset Filters</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSignalFilter;


import React, { useState } from 'react';
import { Search, Filter, Calendar, UserRound, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export interface SignalFilters {
  search: string;
  signalSource: 'all' | 'tradingview' | 'coinstrat';
  status: 'all' | 'success' | 'failed' | 'pending';
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  userId: string;
}

interface AdvancedSignalFilterProps {
  onFilterChange: (filters: SignalFilters) => void;
  availableUsers?: { id: string; name: string }[];
  initialFilters?: Partial<SignalFilters>;
  showExport?: boolean;
  exportComponent?: React.ReactNode;
}

export const AdvancedSignalFilter: React.FC<AdvancedSignalFilterProps> = ({
  onFilterChange,
  availableUsers = [],
  initialFilters,
  showExport = false,
  exportComponent
}) => {
  const [filters, setFilters] = useState<SignalFilters>({
    search: initialFilters?.search || '',
    signalSource: initialFilters?.signalSource || 'all',
    status: initialFilters?.status || 'all',
    dateRange: {
      from: initialFilters?.dateRange?.from,
      to: initialFilters?.dateRange?.to
    },
    userId: initialFilters?.userId || ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Handlers for each filter type
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      search: e.target.value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSignalSourceChange = (value: string) => {
    // Only set if the value is actually different than the current value
    if (value && value !== filters.signalSource) {
      const newFilters = {
        ...filters,
        signalSource: value as 'all' | 'tradingview' | 'coinstrat'
      };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };
  
  const handleStatusChange = (value: string) => {
    // Only set if the value is actually different than the current value
    if (value && value !== filters.status) {
      const newFilters = {
        ...filters,
        status: value as 'all' | 'success' | 'failed' | 'pending'
      };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };
  
  const handleUserChange = (value: string) => {
    // Only set if the value is actually different than the current value
    if (value !== filters.userId) {
      const newFilters = {
        ...filters,
        userId: value
      };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };
  
  const handleDateRangeChange = (from?: Date, to?: Date) => {
    const newFilters = {
      ...filters,
      dateRange: { from, to }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const resetFilters = () => {
    const resetFilters = {
      search: '',
      signalSource: 'all',
      status: 'all',
      dateRange: {
        from: undefined,
        to: undefined
      },
      userId: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  // Calculate active filter count
  const activeFilterCount = (
    (filters.search ? 1 : 0) +
    (filters.signalSource !== 'all' ? 1 : 0) +
    (filters.status !== 'all' ? 1 : 0) +
    (filters.dateRange.from || filters.dateRange.to ? 1 : 0) +
    (filters.userId ? 1 : 0)
  );
  
  // Format date range for display
  const formatDateRange = () => {
    if (filters.dateRange.from && filters.dateRange.to) {
      return `${format(filters.dateRange.from, 'MMM d, yyyy')} - ${format(filters.dateRange.to, 'MMM d, yyyy')}`;
    } else if (filters.dateRange.from) {
      return `From ${format(filters.dateRange.from, 'MMM d, yyyy')}`;
    } else if (filters.dateRange.to) {
      return `Until ${format(filters.dateRange.to, 'MMM d, yyyy')}`;
    }
    return '';
  };
  
  // Get user name from ID
  const getUserNameById = (userId: string) => {
    const user = availableUsers.find(user => user.id === userId);
    return user ? user.name : userId;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search signals by ID, symbol or action..."
            className="pl-9 pr-4"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-1 min-w-[120px]">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 rounded-full">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-4" align="end">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Filter Signals</h4>
                
                {/* Signal Source filter */}
                <div className="space-y-2">
                  <Label htmlFor="signal-source">Signal Source</Label>
                  <Select value={filters.signalSource} onValueChange={handleSignalSourceChange}>
                    <SelectTrigger id="signal-source">
                      <SelectValue placeholder="All sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All sources</SelectItem>
                      <SelectItem value="tradingview">TradingView</SelectItem>
                      <SelectItem value="coinstrat">Coinstrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Status filter */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={filters.status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Date Range filter */}
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left font-normal text-sm"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {filters.dateRange.from ? format(filters.dateRange.from, 'PPP') : 'From date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={filters.dateRange.from}
                          onSelect={(date) => handleDateRangeChange(date, filters.dateRange.to)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left font-normal text-sm"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {filters.dateRange.to ? format(filters.dateRange.to, 'PPP') : 'To date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={filters.dateRange.to}
                          onSelect={(date) => handleDateRangeChange(filters.dateRange.from, date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                {/* User filter - only show if users are provided */}
                {availableUsers.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="user">User</Label>
                    <Select value={filters.userId} onValueChange={handleUserChange}>
                      <SelectTrigger id="user">
                        <SelectValue placeholder="All users" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All users</SelectItem>
                        {availableUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <Separator />
                
                <Button onClick={resetFilters} variant="outline" size="sm" className="w-full">
                  <X className="h-4 w-4 mr-2" />
                  Reset filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          {showExport && exportComponent}
        </div>
      </div>
      
      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Search: {filters.search}</span>
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  const newFilters = {...filters, search: ''};
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </Badge>
          )}
          
          {filters.signalSource !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Source: {filters.signalSource === 'tradingview' ? 'TradingView' : 'Coinstrat'}</span>
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  const newFilters = {...filters, signalSource: 'all'};
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </Badge>
          )}
          
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Status: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}</span>
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  const newFilters = {...filters, status: 'all'};
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </Badge>
          )}
          
          {(filters.dateRange.from || filters.dateRange.to) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDateRange()}</span>
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  const newFilters = {...filters, dateRange: {from: undefined, to: undefined}};
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </Badge>
          )}
          
          {filters.userId && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <UserRound className="h-3 w-3 mr-1" />
              <span>{getUserNameById(filters.userId)}</span>
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  const newFilters = {...filters, userId: ''};
                  setFilters(newFilters);
                  onFilterChange(newFilters);
                }}
              />
            </Badge>
          )}
          
          {activeFilterCount > 1 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs" 
              onClick={resetFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSignalFilter;

import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Calendar, Users, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
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
  availableUsers?: { id: string, name: string }[];
  showExport?: boolean;
  exportComponent?: React.ReactNode;
}

const AdvancedSignalFilter: React.FC<AdvancedSignalFilterProps> = ({
  onFilterChange,
  availableUsers = [],
  showExport = false,
  exportComponent = null
}) => {
  const [filters, setFilters] = useState<SignalFilters>({
    search: '',
    signalSource: 'all',
    status: 'all',
    dateRange: {
      from: undefined,
      to: undefined
    },
    userId: ''
  });
  
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [dateOpen, setDateOpen] = useState(false);

  useEffect(() => {
    const active: string[] = [];
    
    if (filters.signalSource !== 'all') active.push('source');
    if (filters.status !== 'all') active.push('status');
    if (filters.dateRange.from || filters.dateRange.to) active.push('date');
    if (filters.userId) active.push('user');
    
    setActiveFilters(active);
  }, [filters]);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleClearSearch = () => {
    setFilters(prev => ({ ...prev, search: '' }));
  };

  const handleSignalSourceChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      signalSource: value as 'all' | 'tradingview' | 'coinstrat' 
    }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      status: value as 'all' | 'success' | 'failed' | 'pending' 
    }));
  };

  const handleUserChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      userId: value
    }));
  };

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setFilters(prev => ({
      ...prev,
      dateRange: range
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      signalSource: 'all',
      status: 'all',
      dateRange: {
        from: undefined,
        to: undefined
      },
      userId: ''
    });
    setDateOpen(false);
  };

  const removeFilter = (type: string) => {
    switch (type) {
      case 'source':
        setFilters(prev => ({ ...prev, signalSource: 'all' }));
        break;
      case 'status':
        setFilters(prev => ({ ...prev, status: 'all' }));
        break;
      case 'date':
        setFilters(prev => ({ 
          ...prev, 
          dateRange: { from: undefined, to: undefined } 
        }));
        break;
      case 'user':
        setFilters(prev => ({ ...prev, userId: '' }));
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            placeholder="Search by signal ID, symbol, or account..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-9"
          />
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          {filters.search && (
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
        
        <div className="flex flex-row gap-3 flex-wrap">
          <Select value={filters.signalSource} onValueChange={handleSignalSourceChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Signal Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="tradingview">TradingView/TB365</SelectItem>
              <SelectItem value="coinstrat">Coinstrat Pro</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-[150px] justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {filters.dateRange.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "P")} - {format(filters.dateRange.to, "P")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "P")
                  )
                ) : (
                  "Date Range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange.from}
                selected={filters.dateRange}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          
          {availableUsers.length > 0 && (
            <Select value={filters.userId} onValueChange={handleUserChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Users</SelectItem>
                {availableUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          {showExport && exportComponent}
          
          {activeFilters.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResetFilters}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/10"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.includes('source') && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
              <BarChart className="h-3 w-3" />
              Source: {filters.signalSource === 'tradingview' ? 'TradingView/TB365' : 'Coinstrat Pro'}
              <Button variant="ghost" size="sm" onClick={() => removeFilter('source')} className="h-4 w-4 p-0 ml-1">
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {activeFilters.includes('status') && (
            <Badge variant="outline" 
              className={`flex items-center gap-1 ${
                filters.status === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                filters.status === 'failed' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}
            >
              <Filter className="h-3 w-3" />
              Status: {filters.status.charAt(0).toUpperCase() + filters.status.slice(1)}
              <Button variant="ghost" size="sm" onClick={() => removeFilter('status')} className="h-4 w-4 p-0 ml-1">
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {activeFilters.includes('date') && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Date: {filters.dateRange.from && format(filters.dateRange.from, "MMM d")}
              {filters.dateRange.to && ` - ${format(filters.dateRange.to, "MMM d")}`}
              <Button variant="ghost" size="sm" onClick={() => removeFilter('date')} className="h-4 w-4 p-0 ml-1">
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {activeFilters.includes('user') && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 flex items-center gap-1">
              <Users className="h-3 w-3" />
              User: {availableUsers.find(u => u.id === filters.userId)?.name || filters.userId}
              <Button variant="ghost" size="sm" onClick={() => removeFilter('user')} className="h-4 w-4 p-0 ml-1">
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedSignalFilter;

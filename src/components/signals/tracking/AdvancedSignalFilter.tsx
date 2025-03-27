
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Search, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { SignalFilters, SignalUser } from '../types';

/**
 * Advanced Signal Filter Component
 * 
 * A comprehensive filtering component for signal data with date range, status,
 * source, and search capabilities.
 * 
 * @example
 * ```tsx
 * <AdvancedSignalFilter
 *   onFilterChange={setFilters}
 *   availableUsers={users}
 *   showExport={true}
 *   exportComponent={<ExportButton />}
 * />
 * ```
 * 
 * @accessibility
 * - All interactive elements are keyboard navigable
 * - Form controls have appropriate labels
 * - ARIA attributes are provided for complex widgets
 * - Color contrast meets WCAG standards
 */
interface AdvancedSignalFilterProps {
  /** Callback function triggered when filter values change */
  onFilterChange: (filters: SignalFilters) => void;
  
  /** List of users for the user filter dropdown */
  availableUsers?: SignalUser[];
  
  /** Whether to show export functionality */
  showExport?: boolean;
  
  /** Custom export component to display */
  exportComponent?: React.ReactNode;
}

const AdvancedSignalFilter: React.FC<AdvancedSignalFilterProps> = ({
  onFilterChange,
  availableUsers = [],
  showExport = false,
  exportComponent
}) => {
  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: undefined,
    to: undefined
  });
  
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [signalSource, setSignalSource] = useState<string>("all");
  const [userId, setUserId] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Update filters when any value changes
  const updateFilters = () => {
    onFilterChange({
      dateRange,
      status,
      search,
      signalSource,
      userId
    });
  };
  
  // Update filters when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    
    // Debounce search updates
    const handler = setTimeout(() => {
      onFilterChange({
        dateRange,
        status,
        search: e.target.value,
        signalSource,
        userId
      });
    }, 300);
    
    return () => clearTimeout(handler);
  };
  
  // Reset all filters to default values
  const resetFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setStatus("all");
    setSearch("");
    setSignalSource("all");
    setUserId("");
    
    onFilterChange({
      dateRange: { from: undefined, to: undefined },
      status: "all",
      search: "",
      signalSource: "all",
      userId: ""
    });
  };
  
  // Format date in a user-friendly format
  const formatDate = (date?: Date) => {
    if (!date) return "";
    return format(date, "PPP", { locale: vi });
  };
  
  return (
    <div className="space-y-4" data-testid="advanced-signal-filter">
      <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        {/* Search field */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Tìm kiếm tín hiệu..."
            className="pl-10"
            value={search}
            onChange={handleSearchChange}
            aria-label="Search signals"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Toggle filters button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            aria-expanded={showFilters}
            aria-controls="filter-panel"
          >
            <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
            Filters
          </Button>
          
          {/* Reset filters button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-muted-foreground"
            aria-label="Reset all filters"
          >
            <X className="h-4 w-4 mr-2" aria-hidden="true" />
            Reset
          </Button>
          
          {/* Export component (if enabled) */}
          {showExport && exportComponent}
        </div>
      </div>
      
      {/* Expandable filter panel */}
      {showFilters && (
        <div 
          id="filter-panel" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-md bg-background/50 dark:bg-gray-900/50"
          role="region"
          aria-label="Advanced filters"
        >
          {/* Date range filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium" id="date-range-label">Date Range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  aria-labelledby="date-range-label"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                      </>
                    ) : (
                      formatDate(dateRange.from)
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => {
                    setDateRange(range ?? { from: undefined, to: undefined });
                    updateFilters();
                  }}
                  initialFocus
                  locale={vi}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Status filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium" id="status-label">Status</label>
            <Select 
              value={status} 
              onValueChange={(value) => {
                setStatus(value);
                updateFilters();
              }}
              aria-labelledby="status-label"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Signal source filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium" id="source-label">Signal Source</label>
            <Select 
              value={signalSource} 
              onValueChange={(value) => {
                setSignalSource(value);
                updateFilters();
              }}
              aria-labelledby="source-label"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sources</SelectItem>
                <SelectItem value="tradingview">TradingView</SelectItem>
                <SelectItem value="coinstrat">Coinstrat</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* User filter (if users are available) */}
          {availableUsers && availableUsers.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium" id="user-label">User</label>
              <Select 
                value={userId} 
                onValueChange={(value) => {
                  setUserId(value);
                  updateFilters();
                }}
                aria-labelledby="user-label"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by user" />
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
        </div>
      )}
    </div>
  );
};

export default AdvancedSignalFilter;


import { useState, useCallback } from 'react';
import { SignalFilters } from '../types';

/**
 * useSignalFilters Hook
 * 
 * Custom hook for managing filters for signal data. Provides functions
 * to update and reset filter values for displaying and searching signal data.
 * 
 * @example
 * ```tsx
 * const { filters, updateFilters, resetFilters } = useSignalFilters();
 * 
 * // Update a specific filter
 * updateFilters({ status: 'success' });
 * 
 * // Update multiple filters at once
 * updateFilters({ 
 *   search: 'BTC', 
 *   dateRange: [new Date(), new Date()] 
 * });
 * 
 * // Reset all filters to default values
 * resetFilters();
 * ```
 * 
 * @returns Object containing the current filters and functions to update or reset them
 */
export const useSignalFilters = () => {
  /**
   * The default filter state used when initializing or resetting filters
   */
  const defaultFilters: SignalFilters = {
    dateRange: {
      from: undefined,
      to: undefined
    },
    status: 'all',
    search: '',
    sortBy: 'timestamp',
    sortOrder: 'desc',
    signalSource: 'all',
    userId: ''
  };
  
  /**
   * State holding the current filter values
   */
  const [filters, setFilters] = useState<SignalFilters>(defaultFilters);

  /**
   * Updates one or more filter values
   * 
   * @param filterKey - The filter key to update
   * @param value - The new value for the filter
   */
  const updateFilter = useCallback((filterKey: keyof SignalFilters, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: value
    }));
  }, []);

  /**
   * Resets all filters to their default values
   */
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    filters,
    updateFilter,
    resetFilters
  };
};

export default useSignalFilters;

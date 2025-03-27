
import { useState, useCallback } from 'react';
import { SignalFilters } from '../types';

/**
 * Custom hook for managing signal filters
 * @returns An object containing the current filters and a function to update them
 */
export const useSignalFilters = () => {
  const [filters, setFilters] = useState<SignalFilters>({
    dateRange: [null, null],
    status: [],
    actions: [],
    instruments: [],
    search: '',
    sortBy: 'timestamp',
    sortOrder: 'desc',
    signalSource: 'all'
  });

  const updateFilters = useCallback((newFilters: Partial<SignalFilters>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      dateRange: [null, null],
      status: [],
      actions: [],
      instruments: [],
      search: '',
      sortBy: 'timestamp',
      sortOrder: 'desc',
      signalSource: 'all'
    });
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters
  };
};


import { useState } from 'react';

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

export const useSignalFilters = (initialFilters?: Partial<SignalFilters>) => {
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

  const updateFilter = <K extends keyof SignalFilters>(
    key: K, 
    value: SignalFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
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
  };

  return {
    filters,
    updateFilter,
    setFilters,
    resetFilters
  };
};

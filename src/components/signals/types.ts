
/**
 * Centralized type definitions for signal components
 */

export interface SignalFilters {
  dateRange?: [Date | null, Date | null] | {
    from?: Date;
    to?: Date;
  };
  status?: string[] | string;
  actions?: string[];
  instruments?: string[];
  userId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  signalSource?: 'all' | 'tradingview' | 'coinstrat';
}

export interface SignalUser {
  id: string;
  name: string;
}

// Add additional shared types here as needed

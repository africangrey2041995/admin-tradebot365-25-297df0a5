
/**
 * Centralized type definitions for signal components
 * 
 * This file contains the key interfaces and types used across
 * signal-related components, hooks, and utilities.
 */

/**
 * Signal Filters Interface
 * 
 * Defines the structure of filter options used for filtering signal data.
 * Used by the useSignalFilters hook and filter components.
 */
export interface SignalFilters {
  /**
   * Date range for filtering signals by timestamp
   * Can be an object with from/to properties or a tuple [from, to]
   */
  dateRange: { 
    from?: Date; 
    to?: Date; 
  } | [Date | null, Date | null];
  
  /**
   * Status filter - can be a single status or array of statuses
   * Use 'all' to show all statuses
   */
  status: string | string[];
  
  /**
   * Filter by signal actions (buy, sell, etc.)
   */
  actions?: string[];
  
  /**
   * Filter by trading instruments/symbols
   */
  instruments?: string[];
  
  /**
   * Filter by user ID
   */
  userId: string;
  
  /**
   * Search text filter, usually applied to multiple fields
   */
  search: string;
  
  /**
   * Field to sort results by
   * @default 'timestamp'
   */
  sortBy?: string;
  
  /**
   * Sort direction
   * @default 'desc'
   */
  sortOrder?: 'asc' | 'desc';
  
  /**
   * Filter by signal source platform
   * @default 'all'
   */
  signalSource: 'all' | 'tradingview' | 'coinstrat';
}

/**
 * Signal User Interface
 * 
 * Represents a user associated with signals
 */
export interface SignalUser {
  /**
   * Unique identifier for the user
   */
  id: string;
  
  /**
   * Display name of the user
   */
  name: string;
}

/**
 * Signal Theme Options
 * 
 * Defines appearance options for signal components
 */
export interface SignalThemeOptions {
  /**
   * Primary color class to use for accents and highlights
   * @default 'primary'
   */
  accentColor?: 'primary' | 'blue' | 'green' | 'amber' | 'red';
  
  /**
   * Whether to use compact mode for signal displays
   * @default false
   */
  compact?: boolean;
  
  /**
   * Border radius style for signal components
   * @default 'rounded'
   */
  borderRadius?: 'none' | 'sm' | 'rounded' | 'lg' | 'full';
}

/**
 * Signal Display Options
 * 
 * Configuration for how signals should be displayed
 */
export interface SignalDisplayOptions {
  /**
   * Maximum number of signals to display
   */
  limit?: number;
  
  /**
   * Whether to show detailed information
   * @default true
   */
  showDetails?: boolean;
  
  /**
   * Whether to show account-related information
   * @default true
   */
  showAccounts?: boolean;
  
  /**
   * Whether to group signals by date
   * @default false
   */
  groupByDate?: boolean;
}

// Add additional shared types here as needed

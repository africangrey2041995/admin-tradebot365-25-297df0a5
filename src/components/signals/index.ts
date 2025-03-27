
/**
 * Signal Components and Utilities
 * 
 * This is the main entry point for the signals module, providing exports
 * for all signal-related components, hooks, and types.
 */

// Core components
export * from './core';

// Type-specific components
export * from './tradingview';
export * from './coinstrat';

// Hooks
export { useSignalFilters } from './hooks/useSignalFilters';
export type { SignalFilters } from './types';

// Tracking components
export * from './tracking';

// Error components
export * from './errors';

// Examples and documentation
export * from './examples';

// Types
export * from './types';

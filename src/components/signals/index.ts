
// Main entry point for the signals module
// These exports provide backward compatibility while migrating

// Core components
export * from './core';

// Type-specific components
export * from './tradingview';
export * from './coinstrat';

// Hooks
export { useSignalFilters } from './hooks/useSignalFilters';
export type { SignalFilters } from './hooks/useSignalFilters';

// Tracking components
export * from './tracking';

// Error components
export * from './errors';

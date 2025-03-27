
// Main entry point for the signals module
// These exports provide backward compatibility while migrating

// Core components
export { default as StatusBadge } from './core/badges/StatusBadge';
export { default as SignalLoadingState } from './core/components/SignalLoadingState';

// Hooks
export { useSignalFilters } from './hooks/useSignalFilters';
export type { SignalFilters } from './hooks/useSignalFilters';

// Tracking components
export { AdvancedSignalFilter } from './tracking';

// Note: As migration progresses, additional components will be exported here
// to maintain backward compatibility

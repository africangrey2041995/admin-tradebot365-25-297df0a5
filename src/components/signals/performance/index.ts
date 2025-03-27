
/**
 * Signal Performance Components
 * 
 * This module provides components for measuring and displaying
 * signal processing performance metrics.
 */

// Export performance tracking components
export { default as SignalPerformanceTracker } from './SignalPerformanceTracker';

// Export types
export type { PerformanceMetrics } from './SignalPerformanceTracker';

// Re-export the hook for tracking performance
export { useSignalPerformance } from '@/hooks/useSignalPerformance';
export type { 
  SignalPerformanceMetrics,
  UseSignalPerformanceOptions
} from '@/hooks/useSignalPerformance';

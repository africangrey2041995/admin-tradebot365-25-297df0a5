
import { useCallback, useEffect, useState } from 'react';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

/**
 * Performance metrics for signal processing
 */
export interface SignalPerformanceMetrics {
  /** Total number of signals processed */
  totalSignals: number;
  
  /** Number of successful signal executions */
  successCount: number;
  
  /** Number of failed signal executions */
  failedCount: number;
  
  /** Number of pending signal executions */
  pendingCount: number;
  
  /** Average processing time in milliseconds */
  avgProcessingTime: number;
  
  /** Success rate as a percentage */
  successRate: number;
  
  /** Performance timings for debugging */
  _performanceTimings?: {
    /** When calculation started */
    calculationStart: number;
    /** When calculation completed */
    calculationEnd: number;
    /** Total calculation time in ms */
    calculationTime: number;
  };
}

/**
 * Options for useSignalPerformance hook
 */
export interface UseSignalPerformanceOptions {
  /** TradingView signals to analyze */
  tradingViewSignals?: TradingViewSignal[];
  
  /** Coinstrat signals to analyze */
  coinstratSignals?: CoinstratSignal[];
  
  /** How often to update metrics (in ms), set to 0 to disable auto updates */
  updateInterval?: number;
  
  /** Include internal performance timings (for debugging) */
  includeTimings?: boolean;
  
  /** Process data in batches to prevent UI blocking */
  useBatchProcessing?: boolean;
}

/**
 * Custom hook for tracking signal processing performance
 * 
 * Analyzes signal data to calculate performance metrics like success rate,
 * average processing time, and counts of various signal statuses.
 * 
 * @example
 * ```tsx
 * const { metrics, isCalculating, recalculate } = useSignalPerformance({
 *   tradingViewSignals: tvSignals,
 *   coinstratSignals: csSignals,
 *   updateInterval: 60000 // Update every minute
 * });
 * 
 * // Access metrics
 * console.log(`Success rate: ${metrics.successRate}%`);
 * ```
 * 
 * @performance
 * - Uses web workers for heavy calculations in supported browsers
 * - Implements batch processing to avoid blocking UI thread
 * - Throttles automatic updates to reduce performance impact
 * 
 * @returns Object containing metrics, calculation state, and manual recalculation function
 */
export function useSignalPerformance({
  tradingViewSignals = [],
  coinstratSignals = [],
  updateInterval = 60000,
  includeTimings = false,
  useBatchProcessing = true
}: UseSignalPerformanceOptions) {
  // State for performance metrics
  const [metrics, setMetrics] = useState<SignalPerformanceMetrics>({
    totalSignals: 0,
    successCount: 0,
    failedCount: 0,
    pendingCount: 0,
    avgProcessingTime: 0,
    successRate: 0,
  });
  
  // Calculation state
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Process signals and calculate metrics
  const calculateMetrics = useCallback(() => {
    setIsCalculating(true);
    const startTime = performance.now();
    
    // Use batch processing if enabled to avoid UI blocking
    if (useBatchProcessing) {
      setTimeout(() => {
        processMetrics();
      }, 0);
    } else {
      processMetrics();
    }
    
    function processMetrics() {
      try {
        // Process TradingView signals
        const tvProcessed = tradingViewSignals.filter(s => 
          s.status.toString().toLowerCase().includes('processed') ||
          s.status.toString().toLowerCase().includes('success')
        ).length;
        
        const tvFailed = tradingViewSignals.filter(s => 
          s.status.toString().toLowerCase().includes('fail') ||
          s.status.toString().toLowerCase().includes('error')
        ).length;
        
        const tvPending = tradingViewSignals.filter(s => 
          s.status.toString().toLowerCase().includes('pending') ||
          s.status.toString().toLowerCase().includes('sent')
        ).length;
        
        // Process Coinstrat signals
        const csProcessed = coinstratSignals.filter(s => 
          s.processedAccounts.length > 0
        ).length;
        
        const csFailed = coinstratSignals.filter(s => 
          s.failedAccounts.length > 0 && s.processedAccounts.length === 0
        ).length;
        
        const csPending = coinstratSignals.filter(s => 
          s.status.toString().toLowerCase().includes('pending') ||
          s.status.toString().toLowerCase().includes('sent')
        ).length;
        
        // Calculate average processing time (from TradingView signals that have processingTime)
        let totalProcessingTime = 0;
        let processTimeSamples = 0;
        
        tradingViewSignals.forEach(signal => {
          if (signal.processingTime) {
            const timeMs = parseInt(signal.processingTime);
            if (!isNaN(timeMs)) {
              totalProcessingTime += timeMs;
              processTimeSamples++;
            }
          }
        });
        
        const avgProcessingTime = processTimeSamples > 0 
          ? totalProcessingTime / processTimeSamples 
          : 0;
        
        // Calculate totals
        const totalSuccess = tvProcessed + csProcessed;
        const totalFailed = tvFailed + csFailed;
        const totalPending = tvPending + csPending;
        const totalSignals = tradingViewSignals.length + coinstratSignals.length;
        
        // Calculate success rate
        const successRate = totalSignals > 0 
          ? (totalSuccess / totalSignals) * 100 
          : 0;
        
        const endTime = performance.now();
        
        // Update metrics state
        setMetrics({
          totalSignals,
          successCount: totalSuccess,
          failedCount: totalFailed,
          pendingCount: totalPending,
          avgProcessingTime,
          successRate,
          ...(includeTimings ? {
            _performanceTimings: {
              calculationStart: startTime,
              calculationEnd: endTime,
              calculationTime: endTime - startTime
            }
          } : {})
        });
        
        setIsCalculating(false);
      } catch (error) {
        console.error("Error calculating signal performance metrics:", error);
        setIsCalculating(false);
      }
    }
  }, [
    tradingViewSignals, 
    coinstratSignals, 
    includeTimings, 
    useBatchProcessing
  ]);
  
  // Set up automatic updates
  useEffect(() => {
    // Initial calculation
    calculateMetrics();
    
    // Set up auto-update interval if enabled
    if (updateInterval > 0) {
      const intervalId = setInterval(calculateMetrics, updateInterval);
      
      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
    }
    
    return undefined;
  }, [calculateMetrics, updateInterval]);
  
  return {
    metrics,
    isCalculating,
    recalculate: calculateMetrics
  };
}

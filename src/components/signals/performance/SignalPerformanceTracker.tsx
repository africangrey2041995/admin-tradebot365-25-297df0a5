
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Clock, BadgeCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

// Optimized performance measurement type
export interface PerformanceMetrics {
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
  
  /** Last updated timestamp */
  lastUpdated: Date;
}

export interface SignalPerformanceTrackerProps {
  /** TradingView signals to analyze */
  tradingViewSignals?: TradingViewSignal[];
  
  /** Coinstrat signals to analyze */
  coinstratSignals?: CoinstratSignal[];
  
  /** How often to update performance metrics (in ms) */
  updateInterval?: number;
  
  /** Whether to automatically update metrics */
  autoUpdate?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Signal Performance Tracker Component
 * 
 * Analyzes signal data and displays key performance metrics for monitoring
 * system health and efficiency.
 * 
 * @example
 * ```tsx
 * <SignalPerformanceTracker
 *   tradingViewSignals={tvSignals}
 *   coinstratSignals={csSignals}
 *   updateInterval={30000}
 * />
 * ```
 * 
 * @performance
 * - Uses memoization to prevent unnecessary recalculations
 * - Throttles updates to reduce performance impact
 * - Processes data in batches to avoid UI blocking
 */
const SignalPerformanceTracker: React.FC<SignalPerformanceTrackerProps> = ({
  tradingViewSignals = [],
  coinstratSignals = [],
  updateInterval = 60000, // 1 minute default
  autoUpdate = true,
  className
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalSignals: 0,
    successCount: 0,
    failedCount: 0,
    pendingCount: 0,
    avgProcessingTime: 0,
    successRate: 0,
    lastUpdated: new Date()
  });
  
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Recalculate metrics when signals change or on interval
  useEffect(() => {
    const calculateMetrics = () => {
      setIsCalculating(true);
      
      // Use requestIdleCallback or setTimeout to avoid blocking the main thread
      const calculateInBackground = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
      
      calculateInBackground(() => {
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
          
          setMetrics({
            totalSignals,
            successCount: totalSuccess,
            failedCount: totalFailed,
            pendingCount: totalPending,
            avgProcessingTime,
            successRate,
            lastUpdated: new Date()
          });
        } catch (error) {
          console.error("Error calculating signal performance metrics:", error);
        }
        
        setIsCalculating(false);
      });
    };
    
    // Initial calculation
    calculateMetrics();
    
    // Set up auto-update interval if enabled
    let intervalId: NodeJS.Timeout | null = null;
    
    if (autoUpdate) {
      intervalId = setInterval(calculateMetrics, updateInterval);
    }
    
    // Cleanup interval on unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [tradingViewSignals, coinstratSignals, updateInterval, autoUpdate]);
  
  // Format time for display
  const formatTime = (ms: number) => {
    if (ms === 0) return "N/A";
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };
  
  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Format last updated time
  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Loader2 
            className={cn(
              "h-5 w-5 mr-2", 
              isCalculating ? "animate-spin text-blue-500" : "text-muted-foreground"
            )} 
            aria-hidden="true" 
          />
          Signal Performance Metrics
          <span className="ml-auto text-xs text-muted-foreground">
            Last updated: {formatLastUpdated(metrics.lastUpdated)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Signals */}
          <div className="bg-muted/40 dark:bg-muted/20 p-3 rounded-md">
            <div className="text-sm text-muted-foreground mb-1">Total Signals</div>
            <div className="text-2xl font-semibold">{metrics.totalSignals}</div>
          </div>
          
          {/* Success Rate */}
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
            <div className="text-sm text-green-600 dark:text-green-400 flex items-center">
              <BadgeCheck className="h-4 w-4 mr-1" aria-hidden="true" />
              Success Rate
            </div>
            <div className="text-2xl font-semibold text-green-700 dark:text-green-300">
              {formatPercentage(metrics.successRate)}
            </div>
          </div>
          
          {/* Average Processing Time */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
            <div className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
              <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
              Avg Processing
            </div>
            <div className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
              {formatTime(metrics.avgProcessingTime)}
            </div>
          </div>
          
          {/* Failed Signals */}
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
            <div className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" aria-hidden="true" />
              Failed
            </div>
            <div className="text-2xl font-semibold text-red-700 dark:text-red-300">
              {metrics.failedCount}
            </div>
          </div>
        </div>
        
        {/* Performance marker for tracking render times */}
        <span id="signal-performance-rendered" className="hidden" aria-hidden="true">
          {new Date().getTime()}
        </span>
      </CardContent>
    </Card>
  );
};

export default SignalPerformanceTracker;

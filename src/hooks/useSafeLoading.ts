
import { useState, useEffect, useCallback } from 'react';

interface UseSafeLoadingOptions {
  /**
   * Maximum time in milliseconds before loading state is forcibly reset
   */
  timeoutMs?: number;
  
  /**
   * Initial loading state
   */
  initialState?: boolean;
  
  /**
   * Debug message prefix for logging
   */
  debugComponent?: string;
}

/**
 * A hook that provides safe loading state management with automatic timeout fallback
 * to prevent infinite loading states
 */
export const useSafeLoading = ({
  timeoutMs = 5000,
  initialState = false,
  debugComponent = 'Component'
}: UseSafeLoadingOptions = {}) => {
  const [loading, setLoading] = useState(initialState);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  
  // Clear any existing timeout when unmounting
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  
  // Start loading with safety timeout
  const startLoading = useCallback(() => {
    setLoading(true);
    console.log(`${debugComponent} - Starting loading state with ${timeoutMs}ms safety timeout`);
    
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set a new safety timeout
    const newTimeoutId = setTimeout(() => {
      console.warn(`${debugComponent} - Safety timeout reached after ${timeoutMs}ms, forcing loading to false`);
      setLoading(false);
    }, timeoutMs);
    
    setTimeoutId(newTimeoutId);
  }, [timeoutMs, debugComponent, timeoutId]);
  
  // Stop loading and clear timeout
  const stopLoading = useCallback(() => {
    setLoading(false);
    console.log(`${debugComponent} - Stopping loading state`);
    
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId, debugComponent]);
  
  return {
    loading,
    startLoading,
    stopLoading,
    setLoading
  };
};

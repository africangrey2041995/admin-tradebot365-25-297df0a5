
import { useState, useEffect, useCallback, useRef } from 'react';

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

  /**
   * Minimum loading duration to prevent flickering
   */
  minLoadingDurationMs?: number;
}

/**
 * A hook that provides safe loading state management with automatic timeout fallback
 * to prevent infinite loading states
 */
export const useSafeLoading = ({
  timeoutMs = 5000,
  initialState = false,
  debugComponent = 'Component',
  minLoadingDurationMs = 400
}: UseSafeLoadingOptions = {}) => {
  const [loading, setLoading] = useState(initialState);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const minLoadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingStartTimeRef = useRef<number | null>(null);
  
  // Clear any existing timeout when unmounting
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (minLoadingTimeoutRef.current) {
        clearTimeout(minLoadingTimeoutRef.current);
      }
    };
  }, []);
  
  // Start loading with safety timeout
  const startLoading = useCallback(() => {
    // If we're already loading, don't restart the timer
    if (loading) return;
    
    // Record when loading started
    loadingStartTimeRef.current = Date.now();
    setLoading(true);
    
    console.log(`${debugComponent} - Starting loading state with ${timeoutMs}ms safety timeout`);
    
    // Clear any existing timeout
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    
    // Set a new safety timeout
    const newTimeoutId = setTimeout(() => {
      console.warn(`${debugComponent} - Safety timeout reached after ${timeoutMs}ms, forcing loading to false`);
      setLoading(false);
      loadingStartTimeRef.current = null;
    }, timeoutMs);
    
    timeoutIdRef.current = newTimeoutId;
  }, [timeoutMs, debugComponent, loading]);
  
  // Stop loading and clear timeout
  const stopLoading = useCallback(() => {
    // If we're not loading or if there's no start time, just return
    if (!loading || !loadingStartTimeRef.current) {
      return;
    }
    
    const loadingDuration = Date.now() - loadingStartTimeRef.current;
    const remainingTime = Math.max(0, minLoadingDurationMs - loadingDuration);
    
    // If we've been loading for less than the minimum time, wait before stopping
    if (remainingTime > 0) {
      console.log(`${debugComponent} - Ensuring minimum loading time of ${minLoadingDurationMs}ms (${remainingTime}ms remaining)`);
      
      // Clear any existing min loading timeout
      if (minLoadingTimeoutRef.current) {
        clearTimeout(minLoadingTimeoutRef.current);
      }
      
      // Set a new minimum loading timeout
      minLoadingTimeoutRef.current = setTimeout(() => {
        setLoading(false);
        loadingStartTimeRef.current = null;
        console.log(`${debugComponent} - Minimum loading time elapsed, stopping loading state`);
      }, remainingTime);
    } else {
      // We've already exceeded the minimum loading time, stop immediately
      setLoading(false);
      loadingStartTimeRef.current = null;
      console.log(`${debugComponent} - Stopping loading state after ${loadingDuration}ms`);
    }
    
    // Clear the safety timeout
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, [timeoutIdRef, minLoadingDurationMs, debugComponent, loading]);
  
  return {
    loading,
    startLoading,
    stopLoading,
    setLoading
  };
};


import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Options for useSafeLoading hook
 */
export interface UseSafeLoadingOptions {
  /** Minimum time to show loading state in milliseconds */
  minLoadingTime?: number;
  
  /** Maximum time before automatically ending loading in milliseconds */
  safetyTimeoutMs?: number;
  
  /** Whether to log warnings for safety timeout issues */
  logWarnings?: boolean;
  
  /** Initial loading state */
  initialLoading?: boolean;
}

/**
 * A hook for safely managing loading states with minimum display times
 * and safety timeouts to prevent infinite loading states.
 * 
 * @example
 * ```tsx
 * const { isLoading, startLoading, endLoading } = useSafeLoading({
 *   minLoadingTime: 500,
 *   safetyTimeoutMs: 10000
 * });
 * 
 * const fetchData = async () => {
 *   startLoading();
 *   try {
 *     await api.getData();
 *   } finally {
 *     endLoading();
 *   }
 * };
 * ```
 * 
 * @performance
 * - Prevents UI flicker by enforcing minimum loading times
 * - Prevents infinite loading states with safety timeouts
 * - Uses refs to track timers, avoiding unnecessary re-renders
 */
export const useSafeLoading = ({
  minLoadingTime = 0,
  safetyTimeoutMs = 15000,
  logWarnings = true,
  initialLoading = false
}: UseSafeLoadingOptions = {}) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(initialLoading);
  
  // Ref to track timeouts
  const timeoutRef = useRef<{
    minLoadingTimeoutId: NodeJS.Timeout | null;
    safetyTimeoutId: NodeJS.Timeout | null;
    loadingStartTime: number | null;
  }>({
    minLoadingTimeoutId: null,
    safetyTimeoutId: null,
    loadingStartTime: null
  });
  
  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current.minLoadingTimeoutId) {
        clearTimeout(timeoutRef.current.minLoadingTimeoutId);
      }
      if (timeoutRef.current.safetyTimeoutId) {
        clearTimeout(timeoutRef.current.safetyTimeoutId);
      }
    };
  }, []);
  
  // Safety timeout handler
  const handleSafetyTimeout = useCallback(() => {
    if (logWarnings) {
      console.warn(
        `Loading state has been active for more than ${safetyTimeoutMs}ms. ` +
        `Automatically ending loading state to prevent infinite loading.`
      );
    }
    
    setIsLoading(false);
    timeoutRef.current.safetyTimeoutId = null;
    timeoutRef.current.loadingStartTime = null;
  }, [safetyTimeoutMs, logWarnings]);
  
  // Start loading state
  const startLoading = useCallback(() => {
    // Clear any existing timeouts
    if (timeoutRef.current.minLoadingTimeoutId) {
      clearTimeout(timeoutRef.current.minLoadingTimeoutId);
      timeoutRef.current.minLoadingTimeoutId = null;
    }
    
    if (timeoutRef.current.safetyTimeoutId) {
      clearTimeout(timeoutRef.current.safetyTimeoutId);
      timeoutRef.current.safetyTimeoutId = null;
    }
    
    // Set loading state
    setIsLoading(true);
    
    // Record start time
    timeoutRef.current.loadingStartTime = Date.now();
    
    // Set safety timeout
    if (safetyTimeoutMs > 0) {
      timeoutRef.current.safetyTimeoutId = setTimeout(
        handleSafetyTimeout,
        safetyTimeoutMs
      );
    }
  }, [safetyTimeoutMs, handleSafetyTimeout]);
  
  // End loading state with respect for minimum loading time
  const endLoading = useCallback(() => {
    // Clear safety timeout
    if (timeoutRef.current.safetyTimeoutId) {
      clearTimeout(timeoutRef.current.safetyTimeoutId);
      timeoutRef.current.safetyTimeoutId = null;
    }
    
    // If no minimum loading time, end immediately
    if (minLoadingTime <= 0) {
      setIsLoading(false);
      timeoutRef.current.loadingStartTime = null;
      return;
    }
    
    // If minimum loading time is set, respect it
    const startTime = timeoutRef.current.loadingStartTime || 0;
    const elapsedTime = Date.now() - startTime;
    
    if (elapsedTime >= minLoadingTime) {
      // Minimum time already elapsed, end immediately
      setIsLoading(false);
      timeoutRef.current.loadingStartTime = null;
    } else {
      // Wait for minimum time to elapse
      const remainingTime = minLoadingTime - elapsedTime;
      
      timeoutRef.current.minLoadingTimeoutId = setTimeout(() => {
        setIsLoading(false);
        timeoutRef.current.loadingStartTime = null;
        timeoutRef.current.minLoadingTimeoutId = null;
      }, remainingTime);
    }
  }, [minLoadingTime]);
  
  // Toggle loading state
  const toggleLoading = useCallback(() => {
    if (isLoading) {
      endLoading();
    } else {
      startLoading();
    }
  }, [isLoading, startLoading, endLoading]);
  
  return {
    isLoading,
    startLoading,
    endLoading,
    toggleLoading
  };
};

export default useSafeLoading;

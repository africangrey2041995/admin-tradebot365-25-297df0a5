
import { useState, useEffect, useCallback } from 'react';

interface UseSafeLoadingOptions {
  initialState?: boolean;
  timeout?: number;
  minLoadTime?: number;
}

/**
 * A hook that provides a safe loading state with minimum display time
 * to prevent flickering and ensure consistent UX
 */
export const useSafeLoading = (options: UseSafeLoadingOptions = {}) => {
  const { 
    initialState = false, 
    timeout = 10000, 
    minLoadTime = 500 
  } = options;
  
  const [loading, setLoading] = useState(initialState);
  const [error, setError] = useState<Error | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setError(null);
    setStartTime(Date.now());
  }, []);

  const stopLoading = useCallback((error?: Error) => {
    const currentTime = Date.now();
    const loadStartTime = startTime || currentTime;
    const elapsedTime = currentTime - loadStartTime;
    
    // Ensure we show loading for at least minLoadTime to prevent flickering
    if (elapsedTime < minLoadTime) {
      const remainingTime = minLoadTime - elapsedTime;
      setTimeout(() => {
        setLoading(false);
        if (error) setError(error);
      }, remainingTime);
    } else {
      setLoading(false);
      if (error) setError(error);
    }
  }, [startTime, minLoadTime]);

  // Setup safety timeout to prevent infinite loading states
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (loading && timeout > 0) {
      timeoutId = window.setTimeout(() => {
        console.warn('Loading timeout reached, forcing stop');
        stopLoading(new Error('Loading timeout reached'));
      }, timeout);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading, timeout, stopLoading]);

  return { 
    loading, 
    setLoading, 
    startLoading, 
    stopLoading, 
    error, 
    setError 
  };
};

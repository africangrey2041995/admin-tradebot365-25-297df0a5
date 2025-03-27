
import { useState, useEffect, useRef } from 'react';

interface UseSafeLoadingProps {
  timeoutMs?: number;
  debugComponent?: string;
  minLoadingDurationMs?: number;
}

export const useSafeLoading = ({
  timeoutMs = 10000,
  debugComponent = '',
  minLoadingDurationMs = 0
}: UseSafeLoadingProps = {}) => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const startLoading = () => {
    if (debugComponent) {
      console.log(`${debugComponent} - Starting loading state`);
    }
    
    setLoading(true);
    startTimeRef.current = Date.now();
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a safety timeout to prevent infinite loading
    timeoutRef.current = setTimeout(() => {
      if (loading) {
        if (debugComponent) {
          console.warn(`${debugComponent} - Safety timeout reached after ${timeoutMs}ms, forcing loading state reset`);
        }
        setLoading(false);
      }
    }, timeoutMs);
  };
  
  const stopLoading = () => {
    const loadingDuration = Date.now() - startTimeRef.current;
    
    // If we haven't met the minimum loading duration, wait before stopping
    if (minLoadingDurationMs > 0 && loadingDuration < minLoadingDurationMs) {
      const remainingTime = minLoadingDurationMs - loadingDuration;
      
      if (debugComponent) {
        console.log(`${debugComponent} - Enforcing minimum loading duration, waiting ${remainingTime}ms more`);
      }
      
      setTimeout(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setLoading(false);
        
        if (debugComponent) {
          console.log(`${debugComponent} - Stopping loading state after minimum duration`);
        }
      }, remainingTime);
    } else {
      // Clear the safety timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      setLoading(false);
      
      if (debugComponent) {
        console.log(`${debugComponent} - Stopping loading state after ${loadingDuration}ms`);
      }
    }
  };
  
  return {
    loading,
    startLoading,
    stopLoading
  };
};

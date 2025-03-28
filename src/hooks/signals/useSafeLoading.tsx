
import { useState, useEffect, useRef } from 'react';

export interface UseSafeLoadingProps {
  timeoutMs?: number;
  minLoadingDurationMs?: number;
  debugComponent?: string;
  skipLoadingState?: boolean;
  
  // Added for backward compatibility with old code
  initialState?: boolean;
  timeout?: number;
  minLoadTime?: number;
}

export const useSafeLoading = ({
  timeoutMs = 10000,
  minLoadingDurationMs = 500,
  debugComponent = '',
  skipLoadingState = false,
  
  // Support for old property names
  initialState = false,
  timeout,
  minLoadTime,
}: UseSafeLoadingProps = {}) => {
  // Use newer property names if available, fall back to older ones
  const effectiveTimeout = timeoutMs || timeout || 10000;
  const effectiveMinDuration = minLoadingDurationMs || minLoadTime || 500;
  
  const [loading, setLoading] = useState(initialState || false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const startLoading = () => {
    if (skipLoadingState) return;
    
    console.debug(`${debugComponent} - Starting loading state`);
    setLoading(true);
    startTimeRef.current = Date.now();
    
    // Set a timeout to prevent infinite loading
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      console.warn(`${debugComponent} - Loading timeout reached, forcing state reset`);
      setLoading(false);
      startTimeRef.current = null;
    }, effectiveTimeout);
  };
  
  const stopLoading = () => {
    if (skipLoadingState) return;
    
    // If there's a min duration, check if we need to delay the stop
    if (startTimeRef.current && effectiveMinDuration > 0) {
      const elapsedTime = Date.now() - startTimeRef.current;
      
      if (elapsedTime < effectiveMinDuration) {
        // We need to wait a bit more before stopping
        const remainingTime = effectiveMinDuration - elapsedTime;
        
        setTimeout(() => {
          console.debug(`${debugComponent} - Min duration satisfied, stopping loading state`);
          setLoading(false);
          startTimeRef.current = null;
          
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }, remainingTime);
        
        return;
      }
    }
    
    // If no min duration or it's already satisfied
    console.debug(`${debugComponent} - Stopping loading state`);
    setLoading(false);
    startTimeRef.current = null;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return {
    loading,
    startLoading,
    stopLoading
  };
};

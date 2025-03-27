
import { useState, useEffect, useRef } from 'react';

export interface UseSafeLoadingProps {
  timeoutMs?: number;
  minLoadingDurationMs?: number;
  debugComponent?: string;
  skipLoadingState?: boolean;
}

export const useSafeLoading = ({
  timeoutMs = 10000,
  minLoadingDurationMs = 500,
  debugComponent = '',
  skipLoadingState = false
}: UseSafeLoadingProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const startLoading = () => {
    if (skipLoadingState) return;
    
    console.debug(`${debugComponent} - Starting loading state`);
    setIsLoading(true);
    startTimeRef.current = Date.now();
    
    // Set a timeout to prevent infinite loading
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      console.warn(`${debugComponent} - Loading timeout reached, forcing state reset`);
      setIsLoading(false);
      startTimeRef.current = null;
    }, timeoutMs);
  };
  
  const stopLoading = () => {
    if (skipLoadingState) return;
    
    // If there's a min duration, check if we need to delay the stop
    if (startTimeRef.current && minLoadingDurationMs > 0) {
      const elapsedTime = Date.now() - startTimeRef.current;
      
      if (elapsedTime < minLoadingDurationMs) {
        // We need to wait a bit more before stopping
        const remainingTime = minLoadingDurationMs - elapsedTime;
        
        setTimeout(() => {
          console.debug(`${debugComponent} - Min duration satisfied, stopping loading state`);
          setIsLoading(false);
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
    setIsLoading(false);
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
    loading: isLoading,
    startLoading,
    stopLoading
  };
};

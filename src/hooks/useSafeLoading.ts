import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSafeLoadingOptions {
  timeoutMs?: number;
  debugComponent?: string;
  minLoadingDurationMs?: number;
  skipLoading?: boolean; // Add option to skip loading state management
}

interface UseSafeLoadingResult {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

/**
 * Safely manages loading state to prevent state updates on unmounted components
 * and ensure minimum loading durations to prevent UI flicker
 */
export const useSafeLoading = ({
  timeoutMs = 30000,
  debugComponent = '',
  minLoadingDurationMs = 0,
  skipLoading = false
}: UseSafeLoadingOptions = {}): UseSafeLoadingResult => {
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingStartTime = useRef<number | null>(null);
  
  const debugPrefix = debugComponent ? `[${debugComponent}] ` : '';

  // Clear any pending timeouts when unmounting
  useEffect(() => {
    return () => {
      componentMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const startLoading = useCallback(() => {
    if (skipLoading) {
      return; // Skip loading state management if requested
    }
    
    console.log(`${debugPrefix}Starting loading state`);
    loadingStartTime.current = Date.now();
    
    if (componentMounted.current) {
      setLoading(true);
    }
    
    // Set safety timeout to automatically clear loading state if stopLoading is never called
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      console.warn(`${debugPrefix}Loading timeout reached (${timeoutMs}ms), forcing stop`);
      if (componentMounted.current) {
        setLoading(false);
      }
      timeoutRef.current = null;
    }, timeoutMs);
  }, [debugPrefix, timeoutMs, skipLoading]);

  const stopLoading = useCallback(() => {
    if (skipLoading) {
      return; // Skip loading state management if requested
    }
    
    const stopLoadingExecution = () => {
      if (componentMounted.current) {
        setLoading(false);
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    
    // If we have a minimum loading duration and a loading start time
    if (minLoadingDurationMs > 0 && loadingStartTime.current) {
      const loadingDuration = Date.now() - loadingStartTime.current;
      const remainingTime = minLoadingDurationMs - loadingDuration;
      
      // If we've already shown loading for the minimum time, stop immediately
      if (remainingTime <= 0) {
        console.log(`${debugPrefix}Stopping loading state (minimum duration already met)`);
        stopLoadingExecution();
      } 
      // Otherwise, wait for the remaining time before stopping
      else {
        console.log(`${debugPrefix}Delaying loading stop for ${remainingTime}ms to meet minimum duration`);
        setTimeout(stopLoadingExecution, remainingTime);
      }
    } 
    // If no minimum duration, stop immediately
    else {
      console.log(`${debugPrefix}Stopping loading state`);
      stopLoadingExecution();
    }
    
    loadingStartTime.current = null;
  }, [debugPrefix, minLoadingDurationMs, skipLoading]);

  return {
    loading,
    startLoading,
    stopLoading
  };
};

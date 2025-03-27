
import React from 'react';
import { AlertTriangle, RefreshCw, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Props for the SignalErrorState component
 */
export interface SignalErrorStateProps {
  /** The error message to display */
  message?: string;
  
  /** More detailed error information */
  details?: string;
  
  /** Optional error object */
  error?: Error | null;
  
  /** Callback function for retry action */
  onRetry?: () => void;
  
  /** Whether to show the retry button */
  showRetry?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Custom title for the error state */
  title?: string;
}

/**
 * Signal Error State Component
 * 
 * Displays an error message with optional retry functionality when
 * loading or processing signals fails.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SignalErrorState message="Failed to load signals" />
 * 
 * // With retry action
 * <SignalErrorState 
 *   message="Network error occurred" 
 *   showRetry
 *   onRetry={() => refetchSignals()}
 * />
 * 
 * // With detailed error information
 * <SignalErrorState 
 *   message="Signal processing failed"
 *   details="The API returned a 500 status code. Please try again later."
 *   error={error}
 * />
 * ```
 * 
 * @accessibility
 * - Uses semantic HTML structure with appropriate ARIA roles
 * - Error messages are announced to screen readers
 * - Interactive elements are keyboard accessible
 */
const SignalErrorState: React.FC<SignalErrorStateProps> = ({
  message = 'An error occurred while loading signal data',
  details,
  error,
  onRetry,
  showRetry = true,
  className,
  title = 'Error Loading Signals'
}) => {
  // Format technical error details if available
  const errorDetails = error?.message || details;
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle 
        className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" 
        aria-hidden="true"
      />
      
      <h3 className="text-lg font-medium mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground mb-4 max-w-md">
        {message}
      </p>
      
      {errorDetails && (
        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md text-red-800 dark:text-red-300 text-sm mb-4 max-w-md text-left">
          <div className="flex items-start">
            <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p>{errorDetails}</p>
          </div>
        </div>
      )}
      
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry}
          className="flex items-center"
          type="button"
        >
          <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default SignalErrorState;

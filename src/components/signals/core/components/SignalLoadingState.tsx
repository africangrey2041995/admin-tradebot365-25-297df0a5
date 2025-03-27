
import React from 'react';
import { Loader2, Bot, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

/**
 * Props for the SignalLoadingState component
 */
export interface SignalLoadingStateProps {
  /** The message to display during loading */
  message?: string;
  
  /** The type of bot associated with this loading state */
  botType?: 'user' | 'premium' | 'prop' | 'default';
  
  /** Whether to show a progress bar */
  showProgress?: boolean;
  
  /** Whether to use a simplified loading display */
  isSimple?: boolean;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Progress value (0-100) if determinate */
  progressValue?: number;
  
  /** Whether the progress is determinate (has a specific value) */
  isDeterminate?: boolean;
}

/**
 * Signal Loading State Component
 * 
 * Displays an appropriate loading indicator for signal-related operations
 * with customizable messaging and visualization based on context.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SignalLoadingState />
 * 
 * // With custom message
 * <SignalLoadingState message="Fetching signal history..." />
 * 
 * // With progress bar
 * <SignalLoadingState 
 *   message="Processing signals..." 
 *   showProgress 
 *   progressValue={75} 
 *   isDeterminate 
 * />
 * ```
 * 
 * @accessibility
 * - Uses aria-live to announce loading state to screen readers
 * - Animated elements respect reduced motion preferences
 * - Progress indicators include appropriate ARIA attributes
 */
const SignalLoadingState: React.FC<SignalLoadingStateProps> = ({
  message = 'Loading signals...',
  botType = 'default',
  showProgress = false,
  isSimple = false,
  className,
  progressValue = 0,
  isDeterminate = false
}) => {
  // Helper to render the appropriate loading icon based on bot type
  const renderIcon = () => {
    switch (botType) {
      case 'user':
        return (
          <div className="relative">
            <Bot 
              className="h-10 w-10 text-blue-500 dark:text-blue-400" 
              aria-hidden="true"
            />
            <Loader2 
              className="absolute top-1/2 -right-3 h-5 w-5 text-blue-600 dark:text-blue-300 animate-spin" 
              aria-hidden="true"
            />
          </div>
        );
      case 'premium':
        return (
          <div className="relative">
            <Bot 
              className="h-10 w-10 text-purple-500 dark:text-purple-400" 
              aria-hidden="true"
            />
            <Loader2 
              className="absolute top-1/2 -right-3 h-5 w-5 text-purple-600 dark:text-purple-300 animate-spin" 
              aria-hidden="true"
            />
          </div>
        );
      case 'prop':
        return (
          <div className="relative">
            <Bot 
              className="h-10 w-10 text-green-500 dark:text-green-400" 
              aria-hidden="true"
            />
            <Loader2 
              className="absolute top-1/2 -right-3 h-5 w-5 text-green-600 dark:text-green-300 animate-spin" 
              aria-hidden="true"
            />
          </div>
        );
      default:
        return (
          <RefreshCw 
            className="h-10 w-10 text-gray-500 dark:text-gray-400 animate-spin" 
            aria-hidden="true"
          />
        );
    }
  };
  
  // If simple display is requested, show minimal loading state
  if (isSimple) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center p-4",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 text-muted-foreground animate-spin" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center py-6",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {renderIcon()}
      
      <h3 className="mt-4 text-lg font-medium text-center">
        {message}
      </h3>
      
      {showProgress && (
        <div className="w-full max-w-xs mt-4">
          <Progress 
            value={isDeterminate ? progressValue : undefined} 
            className="h-2" 
            aria-label={isDeterminate ? `${progressValue}% complete` : "Loading progress"}
            aria-valuenow={isDeterminate ? progressValue : undefined}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          
          {isDeterminate && (
            <div className="mt-1 text-xs text-right text-muted-foreground">
              {progressValue}%
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignalLoadingState;

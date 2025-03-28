
import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * SignalLoadingState Component
 * 
 * Displays a loading indicator for signal-related data with customizable
 * styling based on the bot type and display preferences.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SignalLoadingState />
 * 
 * // With custom message and bot type
 * <SignalLoadingState 
 *   message="Loading premium signals..." 
 *   botType="premium" 
 * />
 * 
 * // With progress bar and simple mode
 * <SignalLoadingState 
 *   showProgress={true} 
 *   isSimple={true} 
 * />
 * ```
 */
export interface SignalLoadingStateProps {
  /**
   * Custom message to display during loading
   * @default "Loading signals..."
   */
  message?: string;
  
  /**
   * Whether to show a progress bar
   * @default false
   */
  showProgress?: boolean;
  
  /**
   * Type of bot, affects the color scheme
   * @default 'user'
   */
  botType?: 'premium' | 'prop' | 'user';
  
  /**
   * Whether to use a simplified, more compact view
   * @default false
   */
  isSimple?: boolean;
  
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

/**
 * A component that displays a loading state for signals with customizable appearance.
 * The appearance changes based on the bot type (premium, prop, or user) and
 * can show a progress bar if needed.
 */
export const SignalLoadingState: React.FC<SignalLoadingStateProps> = ({
  message = "Loading signals...",
  showProgress = false,
  botType = 'user',
  isSimple = false,
  className = ''
}) => {
  // Determine style classes based on bot type
  const getBotTypeClasses = () => {
    switch (botType) {
      case 'premium':
        return 'text-amber-600 dark:text-amber-400';
      case 'prop':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'user':
      default:
        return 'text-primary';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${isSimple ? 'min-h-[100px]' : 'min-h-[200px]'} ${className}`}>
      <Loader2 className={`h-8 w-8 animate-spin mb-4 ${getBotTypeClasses()}`} />
      <p className="text-muted-foreground text-sm">{message}</p>
      {showProgress && (
        <div className="w-48 h-1.5 mt-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary dark:bg-primary rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      )}
    </div>
  );
};

export default SignalLoadingState;

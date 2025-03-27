
import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SignalLoadingStateProps {
  message?: string;
  showProgress?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  isSimple?: boolean;
  className?: string;
}

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

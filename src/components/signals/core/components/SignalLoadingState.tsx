
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SignalLoadingStateProps {
  message?: string;
  showProgress?: boolean;
  className?: string;
}

const SignalLoadingState: React.FC<SignalLoadingStateProps> = ({
  message = "Loading signal data...",
  showProgress = false,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <RefreshCw className="h-10 w-10 text-primary/70 animate-spin mb-4" />
      <h3 className="text-lg font-medium mb-2">{message}</h3>
      {showProgress && (
        <div className="w-full max-w-xs mt-2">
          <Progress
            value={100}
            className="h-1"
            indicatorClassName="animate-pulse bg-primary"
          />
        </div>
      )}
    </div>
  );
};

export default SignalLoadingState;

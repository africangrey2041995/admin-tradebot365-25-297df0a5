
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SignalLoadingStateProps {
  message?: string;
  showProgress?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  className?: string;
}

const SignalLoadingState: React.FC<SignalLoadingStateProps> = ({
  message = 'Loading signal data...',
  showProgress = false,
  botType = 'user',
  className = ''
}) => {
  return (
    <div className={`w-full py-8 flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center mb-4">
        <Loader2 className="h-6 w-6 mr-2 animate-spin text-primary" />
        <span className="text-lg font-medium text-muted-foreground">{message}</span>
      </div>
      
      {showProgress && (
        <div className="w-full max-w-md mt-2">
          <Progress value={undefined} className="h-1" />
        </div>
      )}
    </div>
  );
};

export default SignalLoadingState;

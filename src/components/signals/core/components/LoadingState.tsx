
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingStateProps {
  message?: string;
  showProgress?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading signal data...",
  showProgress = false,
  botType = 'user',
  className = ""
}) => {
  const colors = {
    premium: 'bg-amber-100 border-amber-200 text-amber-800',
    prop: 'bg-blue-100 border-blue-200 text-blue-800',
    user: 'bg-slate-100 border-slate-200 text-slate-800',
  };

  const bgColor = colors[botType] || colors.user;

  return (
    <div className={`p-6 rounded-lg border ${bgColor} ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-3">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-center">{message}</p>
        
        {showProgress && (
          <div className="w-full max-w-md mt-2">
            <Progress value={100} className="h-1" indicatorClassName="animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingState;

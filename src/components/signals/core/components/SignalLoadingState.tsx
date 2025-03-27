
import React from 'react';
import { Loader2 } from 'lucide-react';

export interface SignalLoadingStateProps {
  message?: string;
  showProgress?: boolean;
  botType?: 'premium' | 'prop' | 'user';
  isSimple?: boolean;
}

export const SignalLoadingState: React.FC<SignalLoadingStateProps> = ({
  message = "Loading signals...",
  showProgress = false,
  botType = 'user',
  isSimple = false
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${isSimple ? 'min-h-[100px]' : 'min-h-[200px]'}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default SignalLoadingState;

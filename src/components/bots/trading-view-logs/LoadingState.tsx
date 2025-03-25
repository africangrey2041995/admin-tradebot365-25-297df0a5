
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingStateProps {
  botType?: 'premium' | 'prop' | 'user';
}

const LoadingState: React.FC<LoadingStateProps> = ({ botType }) => {
  return (
    <div className="py-8 text-center text-muted-foreground">
      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
      <p>Loading logs...</p>
    </div>
  );
};

export default LoadingState;

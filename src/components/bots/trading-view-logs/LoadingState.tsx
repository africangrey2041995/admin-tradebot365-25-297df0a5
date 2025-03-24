
import React from 'react';
import { RefreshCw } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="py-8 text-center text-muted-foreground">
      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
      <p>Loading logs...</p>
    </div>
  );
};

export default LoadingState;

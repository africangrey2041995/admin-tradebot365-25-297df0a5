
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingSignalLogsProps {
  message?: string;
  botType?: 'premium' | 'prop' | 'user';
}

const LoadingSignalLogs: React.FC<LoadingSignalLogsProps> = ({
  message = "Loading logs...",
  botType = 'user'
}) => {
  // Get loading class based on bot type
  const getLoadingClass = () => {
    switch (botType) {
      case 'premium':
        return 'text-yellow-500';
      case 'prop':
        return 'text-blue-500';
      case 'user':
      default:
        return 'text-primary';
    }
  };
  
  const iconClass = getLoadingClass();
  
  return (
    <div className="py-10 text-center">
      <RefreshCw className={`h-8 w-8 animate-spin mx-auto mb-3 ${iconClass}`} />
      <p className="text-muted-foreground">{message}</p>
      <p className="text-xs text-muted-foreground mt-2">Vui lòng đợi trong giây lát...</p>
    </div>
  );
};

export default LoadingSignalLogs;

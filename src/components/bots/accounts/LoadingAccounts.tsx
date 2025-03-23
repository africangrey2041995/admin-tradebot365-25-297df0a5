
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingAccountsProps {
  message?: string;
}

const LoadingAccounts: React.FC<LoadingAccountsProps> = ({ 
  message = "Loading accounts..." 
}) => {
  return (
    <div className="py-8 text-center text-muted-foreground">
      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
      <p>{message}</p>
    </div>
  );
};

export default LoadingAccounts;


import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingAccountsProps {
  message?: string;
}

const LoadingAccounts: React.FC<LoadingAccountsProps> = ({ 
  message = 'Loading accounts...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default LoadingAccounts;

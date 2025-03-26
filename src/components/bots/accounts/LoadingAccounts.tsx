
import React from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadingAccountsProps {
  message?: string;
}

const LoadingAccounts: React.FC<LoadingAccountsProps> = ({ 
  message = "Đang tải tài khoản..." 
}) => {
  return (
    <div className="py-8 text-center">
      <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
      <p className="text-muted-foreground">{message}</p>
      <p className="text-xs text-muted-foreground mt-2">Vui lòng đợi trong giây lát...</p>
    </div>
  );
};

export default LoadingAccounts;

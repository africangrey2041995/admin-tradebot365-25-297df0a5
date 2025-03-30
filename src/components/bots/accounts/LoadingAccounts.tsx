
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingAccountsProps {
  message?: string;
}

const LoadingAccounts: React.FC<LoadingAccountsProps> = ({ 
  message = 'Đang tải dữ liệu tài khoản...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
        <Loader className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
      </div>
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  );
};

export default LoadingAccounts;

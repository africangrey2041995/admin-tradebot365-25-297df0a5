
import React from 'react';
import { Loader2 } from "lucide-react";

interface LoadingAccountsProps {
  message?: string;
}

const LoadingAccounts: React.FC<LoadingAccountsProps> = ({
  message = "Đang tải danh sách tài khoản..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4 border rounded-lg bg-gray-50">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default LoadingAccounts;


import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertOctagon, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-4 border rounded-lg bg-red-50">
      <AlertOctagon className="w-12 h-12 text-red-500 mb-2" />
      
      <h3 className="text-lg font-medium">Không thể tải danh sách tài khoản</h3>
      
      <p className="text-sm text-red-600 max-w-md">
        {error?.message || 'Đã xảy ra lỗi khi tải danh sách tài khoản. Vui lòng thử lại sau.'}
      </p>
      
      <Button onClick={onRetry} variant="outline" className="mt-2">
        <RefreshCw className="w-4 h-4 mr-2" />
        Thử lại
      </Button>
    </div>
  );
};

export default ErrorState;

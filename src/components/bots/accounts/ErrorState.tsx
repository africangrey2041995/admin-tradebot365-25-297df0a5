
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: Error | null;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-dashed border-red-200 dark:border-red-800">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-red-800 dark:text-red-400 mb-2">Không thể tải dữ liệu</h3>
      <p className="text-red-600 dark:text-red-400 text-center max-w-md mb-6">
        {error?.message || 'Đã xảy ra lỗi khi tải dữ liệu tài khoản. Vui lòng thử lại sau.'}
      </p>
      <Button 
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Thử lại
      </Button>
    </div>
  );
};

export default ErrorState;

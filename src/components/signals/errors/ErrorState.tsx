
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  error: Error;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="py-8 rounded-md text-center border border-red-200 bg-red-50/30 dark:border-red-800/30 dark:bg-red-900/10">
      <div className="max-w-md mx-auto">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2 text-red-700">Đã xảy ra lỗi khi tải dữ liệu</h3>
        <p className="text-sm text-red-600 mb-4">{error.message}</p>
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="border-red-300 hover:bg-red-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Thử lại
        </Button>
      </div>
    </div>
  );
};

export default ErrorState;

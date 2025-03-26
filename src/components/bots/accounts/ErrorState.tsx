
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: Error;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 text-red-600 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-medium mb-2">Không thể tải tài khoản</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error.message || 'Đã xảy ra lỗi khi tải tài khoản. Vui lòng thử lại.'}
      </p>
      <Button onClick={onRetry}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Thử lại
      </Button>
    </div>
  );
};

export default ErrorState;

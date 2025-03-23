
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorSignalLogsProps {
  error: Error;
  onRetry?: () => void;
  botType?: 'premium' | 'prop' | 'user';
}

const ErrorSignalLogs: React.FC<ErrorSignalLogsProps> = ({
  error,
  onRetry,
  botType = 'user'
}) => {
  // Get button class based on bot type
  const getButtonClass = () => {
    switch (botType) {
      case 'premium':
        return 'border-yellow-300 hover:bg-yellow-50';
      case 'prop':
        return 'border-blue-300 hover:bg-blue-50';
      case 'user':
      default:
        return '';
    }
  };
  
  const buttonClass = getButtonClass();
  
  return (
    <div className="py-8 rounded-md text-center border border-red-200 bg-red-50/30 dark:border-red-800/30 dark:bg-red-900/10">
      <div className="max-w-md mx-auto">
        <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2 text-red-700">Đã xảy ra lỗi khi tải dữ liệu</h3>
        <p className="text-sm text-red-600 mb-4">{error.message}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            onClick={onRetry}
            className={`border-red-300 hover:bg-red-50 ${buttonClass}`}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Thử lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorSignalLogs;

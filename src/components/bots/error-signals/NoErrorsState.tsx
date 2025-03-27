
import React from 'react';
import { CheckCircle } from 'lucide-react';

const NoErrorsState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Không có lỗi nào!</h3>
      <p className="text-muted-foreground max-w-md">
        Tuyệt vời! Hiện tại hệ thống không ghi nhận lỗi nào cho bot này. 
        Tất cả các tín hiệu đang hoạt động bình thường.
      </p>
    </div>
  );
};

export default NoErrorsState;


import React from 'react';
import { CheckCircle } from 'lucide-react';

const NoErrorsState: React.FC = () => {
  return (
    <div className="py-10 text-center">
      <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
      <p className="text-green-600 dark:text-green-500 font-medium">Không có lỗi tín hiệu nào!</p>
      <p className="text-muted-foreground mt-1">Tất cả tín hiệu của bạn đang được xử lý bình thường.</p>
    </div>
  );
};

export default NoErrorsState;

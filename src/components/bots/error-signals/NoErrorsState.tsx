
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const NoErrorsState: React.FC = () => {
  return (
    <Card className="text-center p-12 bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20">
      <div className="flex flex-col items-center justify-center space-y-3">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-medium">Không có lỗi nào được phát hiện</h3>
        <p className="text-muted-foreground max-w-md">
          Tất cả các bot đang hoạt động bình thường. Chúng tôi sẽ thông báo cho bạn ngay khi phát hiện bất kỳ sự cố nào.
        </p>
      </div>
    </Card>
  );
};

export default NoErrorsState;


import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';

interface EmptySignalLogsProps {
  onRefresh: () => void;
  message?: string;
}

const EmptySignalLogs: React.FC<EmptySignalLogsProps> = ({
  onRefresh,
  message = "Không có logs để hiển thị. Có thể bot chưa gửi tín hiệu nào hoặc tài khoản chưa được kết nối."
}) => {
  return (
    <div className="py-10 text-center">
      <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button variant="outline" onClick={onRefresh}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Làm mới
      </Button>
    </div>
  );
};

export default EmptySignalLogs;


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface SignalStatusBadgeProps {
  status: string;
  errorMessage?: string;
}

const SignalStatusBadge: React.FC<SignalStatusBadgeProps> = ({ status, errorMessage }) => {
  // Chuẩn hóa status để so sánh
  const normalizedStatus = status?.toLowerCase() || '';
  
  // Xác định loại trạng thái
  const isSuccess = normalizedStatus.includes('success') || normalizedStatus.includes('processed');
  const isFailed = normalizedStatus.includes('fail') || normalizedStatus.includes('error') || !!errorMessage;
  const isPending = normalizedStatus.includes('pending') || normalizedStatus.includes('wait');
  
  // Nếu không rơi vào các trường hợp trên, mặc định hiển thị như đã xử lý
  const defaultStatus = !isSuccess && !isFailed && !isPending;
  
  // Tạo title để hiển thị khi hover
  const title = errorMessage ? `Lỗi: ${errorMessage}` : status;
  
  return (
    <Badge
      variant="outline"
      className={`
        flex items-center gap-1 
        ${isSuccess ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : ''}
        ${isFailed ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300' : ''}
        ${isPending ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
        ${defaultStatus ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''}
      `}
      title={title}
    >
      {isSuccess && <CheckCircle className="h-3 w-3" />}
      {isFailed && <AlertTriangle className="h-3 w-3" />}
      {isPending && <Clock className="h-3 w-3" />}
      {defaultStatus && <CheckCircle className="h-3 w-3" />}
      
      <span>
        {isSuccess && 'Thành công'}
        {isFailed && 'Lỗi'}
        {isPending && 'Đang xử lý'}
        {defaultStatus && status}
      </span>
    </Badge>
  );
};

export default SignalStatusBadge;

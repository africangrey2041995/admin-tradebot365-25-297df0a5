
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

/**
 * Trả về Badge hiển thị trạng thái kết nối của tài khoản
 * @param status Trạng thái kết nối của tài khoản
 * @returns Badge component hiển thị trạng thái
 */
export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Connected':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Đã kết nối
        </Badge>
      );
    case 'Disconnected':
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Ngắt kết nối
        </Badge>
      );
    case 'Error':
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Lỗi
        </Badge>
      );
    case 'Pending':
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
          <Clock className="h-3 w-3 mr-1" />
          Đang xử lý
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
          {status}
        </Badge>
      );
  }
};

// Các hàm tiện ích khác liên quan đến tài khoản có thể được thêm vào đây


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExtendedSignal } from '@/types';
import ErrorSignalRow from './ErrorSignalRow';
import NoErrorsState from './NoErrorsState';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { toast } from 'sonner';

interface ErrorSignalsTableProps {
  errorSignals: ExtendedSignal[];
  unreadErrors: Set<string>;
  onMarkAsRead: (signalId: string) => void;
  onMarkAllAsRead?: () => void;
  loading: boolean;
  onRefresh?: () => void;
  error?: Error | null;
}

const ErrorSignalsTable: React.FC<ErrorSignalsTableProps> = ({ 
  errorSignals, 
  unreadErrors, 
  onMarkAsRead, 
  onMarkAllAsRead,
  loading,
  onRefresh,
  error
}) => {
  const handleRefresh = () => {
    if (onRefresh) {
      try {
        toast.info('Đang làm mới dữ liệu...');
        onRefresh();
      } catch (err) {
        console.error('Error refreshing data:', err);
        toast.error('Đã xảy ra lỗi khi làm mới dữ liệu');
      }
    }
  };

  // Xử lý trạng thái loading
  if (loading && errorSignals.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground flex flex-col items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin mb-3" />
        <p>Đang tải thông tin lỗi...</p>
      </div>
    );
  }

  // Xử lý trạng thái lỗi
  if (error) {
    return (
      <div className="py-8 text-center text-red-500 bg-red-50/10 rounded-md border border-red-200/30 p-6">
        <AlertTriangle className="h-10 w-10 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Đã xảy ra lỗi khi tải dữ liệu</h3>
        <p className="mb-4 text-sm text-red-400">{error.message}</p>
        {onRefresh && (
          <Button variant="outline" className="border-red-300" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Thử lại
          </Button>
        )}
      </div>
    );
  }

  // Xử lý trạng thái không có lỗi
  if (!errorSignals || errorSignals.length === 0) {
    return <NoErrorsState />;
  }

  // Hiển thị bảng lỗi
  return (
    <ErrorBoundary 
      errorTitle="Lỗi hiển thị bảng lỗi" 
      errorDescription="Đã xảy ra lỗi khi hiển thị bảng lỗi tín hiệu."
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-red-50 dark:bg-red-900/20">
              <TableHead className="text-red-700 dark:text-red-400">ID</TableHead>
              <TableHead className="text-red-700 dark:text-red-400">Mức độ</TableHead>
              <TableHead className="text-red-700 dark:text-red-400">Mô tả lỗi</TableHead>
              <TableHead className="text-red-700 dark:text-red-400">Thời gian</TableHead>
              <TableHead className="text-red-700 dark:text-red-400">Bot</TableHead>
              <TableHead className="text-red-700 dark:text-red-400">Loại Bot</TableHead>
              <TableHead className="text-red-700 dark:text-red-400">Người dùng</TableHead>
              <TableHead className="text-red-700 dark:text-red-400">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && errorSignals.length > 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2" />
                  <p className="text-muted-foreground">Đang làm mới dữ liệu...</p>
                </TableCell>
              </TableRow>
            ) : (
              errorSignals.map((signal) => (
                <ErrorSignalRow 
                  key={signal.id} 
                  signal={signal} 
                  isUnread={unreadErrors.has(signal.id)}
                  onMarkAsRead={onMarkAsRead}
                  onViewDetails={undefined}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </ErrorBoundary>
  );
};

export default ErrorSignalsTable;

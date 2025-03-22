
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExtendedSignal } from './types';
import ErrorSignalRow from './ErrorSignalRow';
import NoErrorsState from './NoErrorsState';

interface ErrorSignalsTableProps {
  errorSignals: ExtendedSignal[];
  unreadErrors: Set<string>;
  onMarkAsRead: (signalId: string) => void;
  loading: boolean;
  onRefresh?: () => void;
  error?: Error | null;
}

const ErrorSignalsTable: React.FC<ErrorSignalsTableProps> = ({ 
  errorSignals, 
  unreadErrors, 
  onMarkAsRead, 
  loading,
  onRefresh,
  error
}) => {
  // Xử lý trạng thái loading
  if (loading) {
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
          <Button variant="outline" className="border-red-300" onClick={onRefresh}>
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-red-50 dark:bg-red-900/20">
            <TableHead className="text-red-700 dark:text-red-400">ID</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Symbol</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Date</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Quantity</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Action</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Status</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Bot ID</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">User ID</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Account</TableHead>
            <TableHead className="text-red-700 dark:text-red-400">Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {errorSignals.map((signal) => (
            <ErrorSignalRow 
              key={signal.id} 
              signal={signal} 
              isUnread={unreadErrors.has(signal.id)}
              onMarkAsRead={onMarkAsRead}
            />
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800/30">
        <p className="text-sm text-red-700 dark:text-red-400 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <strong>Important:</strong> These error signals require immediate attention to ensure proper functioning of your trading system.
        </p>
        {onRefresh && (
          <div className="mt-2 flex justify-end">
            <Button variant="outline" size="sm" onClick={onRefresh} className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" />
              Làm mới dữ liệu
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorSignalsTable;

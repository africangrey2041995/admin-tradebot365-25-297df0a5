
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';
import { ExtendedSignal } from './types';
import ErrorSignalRow from './ErrorSignalRow';
import NoErrorsState from './NoErrorsState';

interface ErrorSignalsTableProps {
  errorSignals: ExtendedSignal[];
  unreadErrors: Set<string>;
  onMarkAsRead: (signalId: string) => void;
  loading: boolean;
}

const ErrorSignalsTable: React.FC<ErrorSignalsTableProps> = ({ 
  errorSignals, 
  unreadErrors, 
  onMarkAsRead, 
  loading 
}) => {
  if (loading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <div className="animate-pulse">Loading error signals...</div>
      </div>
    );
  }

  if (errorSignals.length === 0) {
    return <NoErrorsState />;
  }

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
            <TableHead className="text-red-700 dark:text-red-400">Bot</TableHead>
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
      </div>
    </div>
  );
};

export default ErrorSignalsTable;


import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { TradingViewSignal } from '@/types';
import ActionBadge from './ActionBadge';
import StatusBadge from './StatusBadge';

interface LogsTableProps {
  logs: TradingViewSignal[];
  onRefresh: () => void;
}

const LogsTable: React.FC<LogsTableProps> = ({ logs, onRefresh }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{log.id}</TableCell>
              <TableCell>{log.instrument}</TableCell>
              <TableCell>
                {new Date(log.timestamp).toLocaleString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
              <TableCell>{log.amount}</TableCell>
              <TableCell><ActionBadge action={log.action} /></TableCell>
              <TableCell><StatusBadge status={log.status} /></TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {log.errorMessage || '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Logs
        </Button>
      </div>
    </div>
  );
};

export default LogsTable;


import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import ActionBadge from './ActionBadge';
import StatusBadge from './StatusBadge';
import FormatDateTime from '../signal-logs/FormatDateTime';

interface LogsTableProps {
  logs: any[];
  selectedId: string | null;
  onSelectId: (id: string | null) => void;
  onRefresh: () => void;
  signalSourceLabel?: string;
}

const LogsTable: React.FC<LogsTableProps> = ({ 
  logs,
  selectedId,
  onSelectId,
  onRefresh,
  signalSourceLabel = "TradingView ID"
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={onRefresh} className="mr-2 gap-1">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{signalSourceLabel}</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow 
                key={log.id}
                className={selectedId === log.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                onClick={() => onSelectId(selectedId === log.id ? null : log.id)}
              >
                <TableCell>{log.id || log.sourceId}</TableCell>
                <TableCell className="font-mono">{log.instrument || log.symbol}</TableCell>
                <TableCell>
                  <FormatDateTime timestamp={log.timestamp} />
                </TableCell>
                <TableCell>{log.amount || '0.01'}</TableCell>
                <TableCell>
                  <ActionBadge action={log.action} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={log.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LogsTable;

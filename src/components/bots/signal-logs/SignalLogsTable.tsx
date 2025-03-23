
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { CoinstratSignal } from '@/types/signal';
import SignalActionBadge from './SignalActionBadge';
import SignalStatusBadge from './SignalStatusBadge';
import AccountStatusSummary from './AccountStatusSummary';
import FormatDateTime from './FormatDateTime';

interface SignalLogsTableProps {
  logs: CoinstratSignal[];
  userId: string;
  onViewDetails: (signal: CoinstratSignal) => void;
  signalSourceLabel?: string;
}

const SignalLogsTable: React.FC<SignalLogsTableProps> = ({ 
  logs, 
  userId, 
  onViewDetails,
  signalSourceLabel = "TradingView ID" 
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{signalSourceLabel}</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Accounts</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium">{log.originalSignalId}</TableCell>
            <TableCell>{log.instrument}</TableCell>
            <TableCell>
              <FormatDateTime timestamp={log.timestamp} />
            </TableCell>
            <TableCell>{log.amount}</TableCell>
            <TableCell>
              <SignalActionBadge action={log.action} />
            </TableCell>
            <TableCell>
              <SignalStatusBadge status={log.status as string} />
            </TableCell>
            <TableCell>
              <AccountStatusSummary signal={log} userId={userId} />
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {log.errorMessage || '-'}
            </TableCell>
            <TableCell>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => onViewDetails(log)}
                title="View Signal Details"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SignalLogsTable;

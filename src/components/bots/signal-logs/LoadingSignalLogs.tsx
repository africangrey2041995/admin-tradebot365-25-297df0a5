
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface LoadingSignalLogsProps {
  message?: string;
  botType?: 'premium' | 'prop' | 'user';
}

const LoadingSignalLogs: React.FC<LoadingSignalLogsProps> = ({
  message = "Loading logs...",
  botType = 'user'
}) => {
  // Get loading class based on bot type
  const getLoadingClass = () => {
    switch (botType) {
      case 'premium':
        return 'text-yellow-500';
      case 'prop':
        return 'text-blue-500';
      case 'user':
      default:
        return 'text-primary';
    }
  };
  
  const iconClass = getLoadingClass();

  // Render skeleton table for smoother UX
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center justify-center py-4">
        <RefreshCw className={`h-5 w-5 animate-spin mr-2 ${iconClass}`} />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Accounts</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={`skeleton-row-${index}`}>
              <TableCell><Skeleton className="h-4 w-14" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-20 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoadingSignalLogs;


import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

interface LoadingSignalLogsProps {
  message?: string;
  botType?: 'premium' | 'prop' | 'user';
  showProgress?: boolean;
}

const LoadingSignalLogs: React.FC<LoadingSignalLogsProps> = ({
  message = "Loading logs...",
  botType = 'user',
  showProgress = true
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
      <div className="flex flex-col items-center justify-center py-4">
        <div className="flex items-center mb-2">
          <RefreshCw className={`h-5 w-5 animate-spin mr-2 ${iconClass}`} />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        
        {showProgress && (
          <div className="w-full max-w-xs mt-2">
            <Progress 
              value={100} 
              className="h-1" 
              indicatorClassName={`animate-pulse ${botType === 'prop' ? 'bg-blue-500' : botType === 'premium' ? 'bg-yellow-500' : 'bg-primary'}`} 
            />
          </div>
        )}
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead>Source ID</TableHead>
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
              <TableCell><Skeleton className="h-4 w-4 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
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

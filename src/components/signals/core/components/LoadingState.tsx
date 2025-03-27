
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingStateProps {
  isSimple?: boolean;
  message?: string;
  botType?: 'premium' | 'prop' | 'user';
  showProgress?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  isSimple = false,
  message = "Loading signal data...",
  botType = 'user',
  showProgress = false
}) => {
  if (isSimple) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin mb-3" />
        <p className="text-sm text-muted-foreground">{message}</p>
        {showProgress && (
          <div className="w-48 mt-4">
            <Progress 
              value={100} 
              className="h-1" 
              indicatorClassName="animate-pulse bg-blue-500" 
            />
          </div>
        )}
      </div>
    );
  }
  
  return (
    <>
      {Array(5).fill(0).map((_, index) => (
        <TableRow key={`loading-row-${index}`}>
          <TableCell>
            <Skeleton className="h-6 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-16" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default LoadingState;

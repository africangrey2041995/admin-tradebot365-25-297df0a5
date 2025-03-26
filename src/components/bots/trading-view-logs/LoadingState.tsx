
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { RefreshCw } from "lucide-react";

export interface LoadingStateProps {
  isSimple?: boolean;
  message?: string;
  botType?: 'premium' | 'prop' | 'user';
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  isSimple = false,
  message = "Loading trading view logs...",
  botType = 'user'
}) => {
  if (isSimple) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin mb-3" />
        <p className="text-sm text-muted-foreground">{message}</p>
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

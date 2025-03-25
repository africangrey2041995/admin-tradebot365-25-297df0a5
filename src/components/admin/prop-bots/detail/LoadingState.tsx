
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-24" />
      </div>
      
      {/* Tabs skeleton */}
      <Card>
        <div className="flex p-2 border-b border-gray-800">
          <Skeleton className="h-10 w-28 mx-2" />
          <Skeleton className="h-10 w-28 mx-2" />
          <Skeleton className="h-10 w-28 mx-2" />
        </div>
        
        <CardContent className="p-6">
          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
          
          <Skeleton className="h-40 w-full mt-6" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingState;

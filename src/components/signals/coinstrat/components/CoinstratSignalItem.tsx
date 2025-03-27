
import React from 'react';
import { CoinstratSignal } from '@/types/signal';
import { ActionBadge, StatusBadge } from '@/components/signals/core/badges';
import FormatDateTime from '@/components/signals/core/components/FormatDateTime';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface CoinstratSignalItemProps {
  signal: CoinstratSignal;
  onViewDetails: () => void;
}

const CoinstratSignalItem: React.FC<CoinstratSignalItemProps> = ({
  signal,
  onViewDetails
}) => {
  const processedCount = signal.processedAccounts?.length || 0;
  const failedCount = signal.failedAccounts?.length || 0;
  const hasProcessingInfo = processedCount > 0 || failedCount > 0;

  return (
    <div className="p-4 border rounded-md">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{signal.instrument}</h3>
          <div className="text-sm text-muted-foreground">
            Original ID: {signal.originalSignalId}
          </div>
        </div>
        <div className="flex gap-2">
          <ActionBadge action={signal.action} />
          <StatusBadge status={signal.status as string} />
        </div>
      </div>
      
      {hasProcessingInfo && (
        <div className="flex gap-4 mt-3 mb-3">
          <div className="text-sm">
            <span className="text-muted-foreground">Processed:</span> 
            <span className="ml-1 font-medium">{processedCount}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Failed:</span> 
            <span className="ml-1 font-medium">{failedCount}</span>
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm text-muted-foreground">
          <FormatDateTime timestamp={signal.timestamp} />
        </div>
        <Button size="sm" variant="outline" onClick={onViewDetails}>
          <Eye className="h-3.5 w-3.5 mr-1" />
          Details
        </Button>
      </div>
    </div>
  );
};

export default CoinstratSignalItem;

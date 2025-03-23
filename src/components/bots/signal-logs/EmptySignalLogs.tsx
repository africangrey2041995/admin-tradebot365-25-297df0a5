
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface EmptySignalLogsProps {
  onRefresh: () => void;
}

const EmptySignalLogs: React.FC<EmptySignalLogsProps> = ({ onRefresh }) => {
  return (
    <div className="py-10 text-center">
      <p className="text-muted-foreground mb-4">No logs available for this bot yet.</p>
      <Button variant="outline" onClick={onRefresh}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};

export default EmptySignalLogs;

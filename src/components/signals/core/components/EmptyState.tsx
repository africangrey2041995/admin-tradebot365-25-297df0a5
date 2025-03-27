
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  onRefresh?: () => void;
  botType?: 'premium' | 'prop' | 'user';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No signal logs found for this bot.",
  onRefresh,
  botType = 'user'
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/30 rounded-lg p-6 text-center">
      <p className="text-gray-500 dark:text-gray-400 mb-4">{message}</p>
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Logs
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

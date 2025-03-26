
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TabHeaderProps {
  title: string;
  onRefresh?: () => void;
  isLoading?: boolean;
  actions?: React.ReactNode;
}

const TabHeader: React.FC<TabHeaderProps> = ({
  title,
  onRefresh,
  isLoading = false,
  actions
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center gap-2">
        {actions}
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        )}
      </div>
    </div>
  );
};

export default TabHeader;

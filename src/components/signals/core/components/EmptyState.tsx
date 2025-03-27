
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  onRefresh?: () => void;
  refreshButtonText?: string;
  botType?: 'premium' | 'prop' | 'user';
  icon?: 'warning' | 'info' | 'error';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = "No signal logs found",
  subMessage = "There are no signal logs available for this bot.",
  onRefresh,
  refreshButtonText = "Refresh Logs",
  botType = 'user',
  icon = 'warning'
}) => {
  return (
    <div className="bg-muted/50 p-6 rounded-lg text-center">
      <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-3" aria-label={message} />
      <h3 className="text-lg font-medium mb-1">{message}</h3>
      <p className="text-sm text-muted-foreground mb-4">{subMessage}</p>
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          {refreshButtonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

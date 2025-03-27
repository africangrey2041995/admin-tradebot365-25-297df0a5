
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface SignalEmptyStateProps {
  message?: string;
  refreshButtonText?: string;
  onRefresh?: () => void;
  botType?: 'premium' | 'prop' | 'user';
}

const SignalEmptyState: React.FC<SignalEmptyStateProps> = ({
  message = "No signal logs found",
  refreshButtonText = "Refresh Logs",
  onRefresh,
  botType = 'user'
}) => {
  return (
    <div className="bg-muted/50 p-6 rounded-lg text-center">
      <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-3" aria-label="No signal logs found" />
      <h3 className="text-lg font-medium mb-1">{message}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        There are no signal logs available for this {botType === 'user' ? 'bot' : botType === 'premium' ? 'premium bot' : 'prop bot'}.
      </p>
      {onRefresh && (
        <Button variant="outline" size="sm" onClick={onRefresh}>
          {refreshButtonText}
        </Button>
      )}
    </div>
  );
};

export default SignalEmptyState;

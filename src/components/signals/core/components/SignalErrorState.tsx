
import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface SignalErrorStateProps {
  error?: Error | string;
  onRetry?: () => void;
  title?: string;
}

const SignalErrorState: React.FC<SignalErrorStateProps> = ({
  error,
  onRetry,
  title = "Error Loading Signals"
}) => {
  const errorMessage = error instanceof Error 
    ? error.message 
    : typeof error === 'string' 
      ? error 
      : "An unexpected error occurred while loading signal data.";

  return (
    <Alert variant="destructive">
      <AlertOctagon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{errorMessage}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry} 
            className="mt-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default SignalErrorState;

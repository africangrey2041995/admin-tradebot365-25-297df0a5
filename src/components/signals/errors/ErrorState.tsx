
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorStateProps {
  error: Error | string;
  onRetry?: () => void;
  title?: string;
  botType?: 'premium' | 'prop' | 'user';
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  title = "Error Loading Signals",
  botType = 'user'
}) => {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <Alert variant="destructive" className="bg-red-50 border-red-300 text-red-800 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">{errorMessage}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            className="border-red-200 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900/50"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorState;

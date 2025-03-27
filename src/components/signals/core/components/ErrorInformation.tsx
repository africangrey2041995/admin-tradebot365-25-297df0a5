
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorInformationProps {
  errorMessage: string;
  errorCode?: string;
  className?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  compact?: boolean;
}

const ErrorInformation: React.FC<ErrorInformationProps> = ({
  errorMessage,
  errorCode,
  className = "",
  severity = 'medium',
  compact = false
}) => {
  if (!errorMessage) return null;
  
  // Map severity levels to styling
  const severityClasses = {
    low: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/30',
    medium: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30',
    high: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30',
    critical: 'bg-red-100 text-red-900 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50',
  };
  
  if (compact) {
    return (
      <div className={`flex items-start gap-2 ${className}`}>
        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          {errorCode && <span className="text-xs font-semibold">{errorCode}: </span>}
          <span className="text-sm">{errorMessage}</span>
        </div>
      </div>
    );
  }
  
  return (
    <Alert className={`${severityClasses[severity]} ${className}`}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-2">
        Error {errorCode && <span className="text-xs">({errorCode})</span>}
      </AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export default ErrorInformation;

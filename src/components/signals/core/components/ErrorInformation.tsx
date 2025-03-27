
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorInformationProps {
  title?: string;
  message: string;
  className?: string;
}

const ErrorInformation: React.FC<ErrorInformationProps> = ({
  title = "Error",
  message,
  className = ""
}) => {
  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorInformation;

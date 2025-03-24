
import React from 'react';
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';

interface ErrorInformationProps {
  errorMessage: string | undefined;
  onCopy: (text: string, label: string) => void;
}

const ErrorInformation: React.FC<ErrorInformationProps> = ({
  errorMessage,
  onCopy
}) => {
  if (!errorMessage) return null;

  return (
    <div className="border-t pt-4">
      <h3 className="text-sm font-medium text-red-600 mb-2">Error Information</h3>
      <div className="flex items-center">
        <p className="text-sm text-red-600">{errorMessage}</p>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 ml-1 p-0"
          onClick={() => onCopy(errorMessage, "Error Message")}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default ErrorInformation;


import React from 'react';
import { AlertTriangle } from 'lucide-react';

const NoErrorsState: React.FC = () => {
  return (
    <div className="py-10 text-center bg-green-50/20 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30">
      <AlertTriangle className="h-10 w-10 text-green-500 mx-auto mb-3" />
      <p className="text-green-600 dark:text-green-400 font-medium">No error signals to fix!</p>
      <p className="text-muted-foreground mt-1">All your signals are processing correctly.</p>
    </div>
  );
};

export default NoErrorsState;

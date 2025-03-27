
import React from 'react';
import { ExtendedSignal } from '@/types/signal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Server, Info } from 'lucide-react';

interface ErrorGroupListProps {
  signals: ExtendedSignal[];
  onViewDetails: (errorId: string) => void;
}

const ErrorGroupList: React.FC<ErrorGroupListProps> = ({ signals, onViewDetails }) => {
  // Group signals by error message or code
  const groupedErrors: Record<string, ExtendedSignal[]> = signals.reduce((acc, signal) => {
    const key = signal.errorCode || signal.errorMessage || 'unknown';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(signal);
    return acc;
  }, {} as Record<string, ExtendedSignal[]>);

  return (
    <div className="space-y-4">
      {Object.entries(groupedErrors).map(([errorKey, groupSignals]) => (
        <Card key={errorKey} className="overflow-hidden">
          <CardHeader className="bg-red-50/50 dark:bg-red-900/10 pb-2">
            <CardTitle className="text-base flex justify-between">
              <span className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                {errorKey.length > 50 ? `${errorKey.substring(0, 50)}...` : errorKey}
              </span>
              <Badge variant="outline">{groupSignals.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2">
              {groupSignals.slice(0, 5).map((signal) => (
                <li 
                  key={signal.id} 
                  className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded text-sm cursor-pointer"
                  onClick={() => onViewDetails(signal.id)}
                >
                  <div className="flex items-center">
                    <Server className="h-3 w-3 mr-2 text-muted-foreground" />
                    <span>
                      {signal.botName || signal.botId || 'Unknown Bot'}
                      {signal.userId && (
                        <span className="text-xs text-muted-foreground ml-2">
                          ({signal.userId})
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(signal.timestamp).toLocaleString()}
                  </div>
                </li>
              ))}
              {groupSignals.length > 5 && (
                <li className="text-center text-sm text-muted-foreground pt-2">
                  + {groupSignals.length - 5} more errors
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ErrorGroupList;

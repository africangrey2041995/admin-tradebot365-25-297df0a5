
import React, { useState } from 'react';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StatusBadge from './StatusBadge';
import ActionBadge from './ActionBadge';
import LoadingState from './LoadingState';
import AccountSection from '../signal-logs/AccountSection';
import { Info, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import FormatDateTime from '../signal-logs/FormatDateTime';

interface UnifiedSignalViewProps {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
  onRefresh: () => void;
  isLoading: boolean;
}

interface LoadingStateProps {
  isSimple?: boolean;
}

const UnifiedSignalView: React.FC<UnifiedSignalViewProps> = ({
  tradingViewLogs,
  coinstratLogs,
  onRefresh,
  isLoading
}) => {
  // Track which signals are expanded
  const [expandedSignals, setExpandedSignals] = useState<Set<string>>(new Set());

  // Helper to toggle expanded state
  const toggleSignalExpanded = (signalId: string) => {
    setExpandedSignals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(signalId)) {
        newSet.delete(signalId);
      } else {
        newSet.add(signalId);
      }
      return newSet;
    });
  };

  // Find matching Coinstrat logs for a Trading View signal
  const findMatchingCoinstratLogs = (tvSignalId: string) => {
    return coinstratLogs.filter(log => log.originalSignalId === tvSignalId);
  };

  // Render nothing if no logs and loading
  if ((tradingViewLogs.length === 0 && coinstratLogs.length === 0) && isLoading) {
    return <LoadingState isSimple={true} />;
  }

  // Render no data message if no logs and not loading
  if (tradingViewLogs.length === 0 && coinstratLogs.length === 0 && !isLoading) {
    return (
      <div className="bg-muted/50 p-6 rounded-lg text-center">
        <AlertTriangle className="h-10 w-10 text-muted-foreground mx-auto mb-3" aria-label="No signal logs found" />
        <h3 className="text-lg font-medium mb-1">No signal logs found</h3>
        <p className="text-sm text-muted-foreground mb-4">There are no signal logs available for this bot.</p>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Logs
        </Button>
      </div>
    );
  }

  // Organize the logs hierarchically: TradingView signals at the top level
  // Group Coinstrat logs by their originalSignalId
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Processing</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradingViewLogs.map(signal => {
            const hasCoinstratLogs = findMatchingCoinstratLogs(signal.id).length > 0;
            const isExpanded = expandedSignals.has(signal.id);
            
            return (
              <React.Fragment key={signal.id}>
                <TableRow 
                  className={`cursor-pointer hover:bg-muted/50 ${hasCoinstratLogs ? 'border-l-2 border-l-blue-500' : ''}`} 
                  onClick={() => toggleSignalExpanded(signal.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {hasCoinstratLogs && (
                        <Info className="h-4 w-4 text-blue-500 mr-2" aria-label="Has Coinstrat logs" />
                      )}
                      {signal.id}
                    </div>
                  </TableCell>
                  <TableCell>{signal.instrument}</TableCell>
                  <TableCell>
                    <FormatDateTime timestamp={signal.timestamp} />
                  </TableCell>
                  <TableCell>
                    <ActionBadge action={signal.action} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={signal.status as string} />
                  </TableCell>
                  <TableCell>
                    {hasCoinstratLogs ? (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-800/30 dark:text-blue-300">
                        {isExpanded ? 'Hide Details' : 'Show Details'}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Not Processed
                      </span>
                    )}
                  </TableCell>
                </TableRow>
                
                {/* Show Coinstrat logs if expanded */}
                {isExpanded && hasCoinstratLogs && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={6} className="p-0">
                      <div className="p-4 space-y-4">
                        <h4 className="text-sm font-medium mb-2">Processed by Coinstrat Pro:</h4>
                        {findMatchingCoinstratLogs(signal.id).map(csLog => (
                          <div key={csLog.id} className="bg-card border rounded-md p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <div className="text-xs text-muted-foreground">Coinstrat ID</div>
                                <div className="font-medium">{csLog.id}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Status</div>
                                <StatusBadge status={csLog.status as string} />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Processed</div>
                                <div className="font-medium">{csLog.processedAccounts.length}</div>
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Failed</div>
                                <div className="font-medium">{csLog.failedAccounts.length}</div>
                              </div>
                            </div>
                            
                            {/* Show account details if there are any */}
                            {csLog.processedAccounts.length > 0 && (
                              <AccountSection
                                title="Processed Accounts"
                                type="success"
                                processedAccounts={csLog.processedAccounts}
                                userId={signal.userId || 'USR-001'}
                              />
                            )}
                            
                            {csLog.failedAccounts.length > 0 && (
                              <AccountSection
                                title="Failed Accounts"
                                type="failed"
                                failedAccounts={csLog.failedAccounts}
                                userId={signal.userId || 'USR-001'}
                                titleClassName="text-red-600 dark:text-red-400"
                              />
                            )}
                            
                            {/* Show error message if exists */}
                            {csLog.errorMessage && (
                              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-300 rounded border border-red-200 dark:border-red-800">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4" />
                                  <span className="font-medium">Error:</span>
                                </div>
                                <p className="text-sm mt-1">{csLog.errorMessage}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
          
          {/* Show orphaned Coinstrat logs that don't have a matching Trading View signal */}
          {coinstratLogs
            .filter(log => !tradingViewLogs.some(tvLog => tvLog.id === log.originalSignalId))
            .map(orphanedLog => (
              <TableRow key={orphanedLog.id} className="border-l-2 border-l-yellow-500">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" aria-label="Orphaned log" />
                    {orphanedLog.id}
                  </div>
                </TableCell>
                <TableCell>{orphanedLog.instrument}</TableCell>
                <TableCell>
                  <FormatDateTime timestamp={orphanedLog.timestamp} />
                </TableCell>
                <TableCell>
                  <ActionBadge action={orphanedLog.action} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={orphanedLog.status as string} />
                </TableCell>
                <TableCell>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full dark:bg-yellow-800/30 dark:text-yellow-300">
                    Orphaned
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      
      {isLoading && (
        <div className="py-4 flex items-center justify-center">
          <RefreshCw className="h-5 w-5 text-muted-foreground animate-spin mr-2" />
          <span className="text-sm text-muted-foreground">Refreshing logs...</span>
        </div>
      )}
    </div>
  );
};

export default UnifiedSignalView;

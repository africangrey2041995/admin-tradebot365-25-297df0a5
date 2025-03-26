
import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ChevronRight, ChevronDown, ExternalLink, Info, AlertCircle, CheckCircle2, ArrowUpDown
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';
import ActionBadge from './ActionBadge';
import StatusBadge from './StatusBadge';
import HierarchicalSignalView from './HierarchicalSignalView';
import { cn } from '@/lib/utils';

export interface UnifiedSignalViewProps {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
  onRefresh: () => void;
  isLoading: boolean;
}

const UnifiedSignalView: React.FC<UnifiedSignalViewProps> = ({
  tradingViewLogs,
  coinstratLogs,
  onRefresh,
  isLoading
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Create mapping from TradingView signal IDs to their Coinstrat signals
  const signalMapping = new Map<string, CoinstratSignal[]>();
  
  coinstratLogs.forEach(coinstratSignal => {
    const originalId = coinstratSignal.originalSignalId;
    if (!signalMapping.has(originalId)) {
      signalMapping.set(originalId, []);
    }
    signalMapping.get(originalId)!.push(coinstratSignal);
  });

  // Map TradingView signals to include their Coinstrat signals
  const combinedSignals = tradingViewLogs.map(tvSignal => {
    const relatedCoinstratSignals = signalMapping.get(tvSignal.id) || [];
    
    // Calculate statistics about related executions
    const totalAccounts = relatedCoinstratSignals.reduce((sum, signal) => 
      sum + signal.processedAccounts.length + signal.failedAccounts.length, 0);
    
    const successfulAccounts = relatedCoinstratSignals.reduce((sum, signal) => 
      sum + signal.processedAccounts.length, 0);
    
    const failedAccounts = relatedCoinstratSignals.reduce((sum, signal) => 
      sum + signal.failedAccounts.length, 0);
    
    return {
      tvSignal,
      coinstratSignals: relatedCoinstratSignals,
      totalAccounts,
      successfulAccounts,
      failedAccounts
    };
  });

  // Identify orphaned Coinstrat signals (no matching TradingView signal)
  const orphanedCoinstratSignals = coinstratLogs.filter(csSignal => {
    return !tradingViewLogs.some(tvSignal => tvSignal.id === csSignal.originalSignalId);
  });

  const toggleExpandRow = (id: string, e?: React.MouseEvent) => {
    // If event is provided, stop propagation to prevent row click handling
    if (e) {
      e.stopPropagation();
    }
    
    console.log("Toggling row expansion for ID:", id);
    
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openDetailDialog = (signalId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row expansion when clicking detail button
    console.log("Opening detail dialog for ID:", signalId);
    setSelectedSignal(signalId);
    setDetailDialogOpen(true);
  };

  const getSelectedSignalDetails = () => {
    if (!selectedSignal) return null;
    
    // Find the TradingView signal
    const tvSignal = tradingViewLogs.find(signal => signal.id === selectedSignal);
    
    // Find all related Coinstrat signals
    const relatedCoinstratSignals = coinstratLogs.filter(
      signal => signal.originalSignalId === selectedSignal
    );
    
    return {
      tvSignal,
      coinstratSignals: relatedCoinstratSignals
    };
  };

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const renderStatusSummary = (successCount: number, failedCount: number, totalCount: number) => {
    if (totalCount === 0) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-600">No Executions</Badge>;
    }
    
    return (
      <div className="flex items-center space-x-1">
        {successCount > 0 && (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            {successCount}
          </Badge>
        )}
        {failedCount > 0 && (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
            <AlertCircle className="h-3 w-3 mr-1" />
            {failedCount}
          </Badge>
        )}
        {successCount + failedCount < totalCount && (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300">
            {totalCount - successCount - failedCount} Pending
          </Badge>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Source ID</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Timestamp
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Account Executions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {combinedSignals.map(({ tvSignal, coinstratSignals, totalAccounts, successfulAccounts, failedAccounts }) => (
              <React.Fragment key={tvSignal.id}>
                <TableRow 
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-gray-900/50",
                    expandedRows[tvSignal.id] && "bg-gray-50 dark:bg-gray-900/30"
                  )}
                >
                  <TableCell className="px-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={(e) => toggleExpandRow(tvSignal.id, e)}
                    >
                      {expandedRows[tvSignal.id] ? 
                        <ChevronDown className="h-4 w-4" /> : 
                        <ChevronRight className="h-4 w-4" />
                      }
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">TV</Badge>
                      {tvSignal.id}
                    </div>
                  </TableCell>
                  <TableCell>{tvSignal.instrument}</TableCell>
                  <TableCell>{formatDateTime(tvSignal.timestamp)}</TableCell>
                  <TableCell><ActionBadge action={tvSignal.action} /></TableCell>
                  <TableCell><StatusBadge status={tvSignal.status.toString()} /></TableCell>
                  <TableCell>
                    {renderStatusSummary(successfulAccounts, failedCount, totalAccounts)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8"
                      onClick={(e) => openDetailDialog(tvSignal.id, e)}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows[tvSignal.id] && coinstratSignals.length > 0 && (
                  <TableRow className="bg-gray-50 dark:bg-gray-900/10">
                    <TableCell colSpan={8} className="p-0">
                      <div className="p-4">
                        <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Coinstrat Signal Executions
                        </div>
                        <div className="border rounded-md bg-white dark:bg-gray-950">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Coinstrat ID</TableHead>
                                <TableHead>Symbol</TableHead>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Accounts</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {coinstratSignals.map(csSignal => (
                                <TableRow key={csSignal.id} className="hover:bg-gray-100 dark:hover:bg-gray-900/50">
                                  <TableCell className="font-medium">
                                    <div className="flex items-center">
                                      <Badge variant="outline" className="mr-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">CS</Badge>
                                      {csSignal.id}
                                    </div>
                                  </TableCell>
                                  <TableCell>{csSignal.instrument}</TableCell>
                                  <TableCell>{formatDateTime(csSignal.timestamp)}</TableCell>
                                  <TableCell><StatusBadge status={csSignal.status.toString()} /></TableCell>
                                  <TableCell>
                                    {renderStatusSummary(
                                      csSignal.processedAccounts.length, 
                                      csSignal.failedAccounts.length,
                                      csSignal.processedAccounts.length + csSignal.failedAccounts.length
                                    )}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="h-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openDetailDialog(csSignal.originalSignalId, e);
                                      }}
                                    >
                                      <ExternalLink className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
            
            {orphanedCoinstratSignals.length > 0 && (
              <React.Fragment>
                <TableRow className="bg-gray-100 dark:bg-gray-800/50">
                  <TableCell colSpan={8} className="py-2">
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      Coinstrat Signals Without Matching TradingView Signal
                    </div>
                  </TableCell>
                </TableRow>
                {orphanedCoinstratSignals.map(csSignal => (
                  <TableRow key={csSignal.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <TableCell className="px-2"></TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Badge variant="outline" className="mr-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">CS</Badge>
                        {csSignal.id}
                      </div>
                    </TableCell>
                    <TableCell>{csSignal.instrument}</TableCell>
                    <TableCell>{formatDateTime(csSignal.timestamp)}</TableCell>
                    <TableCell><ActionBadge action={csSignal.action} /></TableCell>
                    <TableCell><StatusBadge status={csSignal.status.toString()} /></TableCell>
                    <TableCell>
                      {renderStatusSummary(
                        csSignal.processedAccounts.length, 
                        csSignal.failedAccounts.length,
                        csSignal.processedAccounts.length + csSignal.failedAccounts.length
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8"
                        onClick={(e) => openDetailDialog(csSignal.originalSignalId, e)}
                      >
                        <Info className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            )}
            
            {combinedSignals.length === 0 && orphanedCoinstratSignals.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No signals found matching the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Signal Detail & Distribution</DialogTitle>
          </DialogHeader>
          
          {selectedSignal && (
            <div className="space-y-6">
              {/* Signal details section */}
              {getSelectedSignalDetails()?.tvSignal && (
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900/30">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Signal ID</div>
                    <div className="font-medium">{getSelectedSignalDetails()?.tvSignal?.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Instrument</div>
                    <div className="font-medium">{getSelectedSignalDetails()?.tvSignal?.instrument}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Action</div>
                    <div>
                      <ActionBadge action={getSelectedSignalDetails()?.tvSignal?.action || 'ENTER_LONG'} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Amount</div>
                    <div className="font-medium">{getSelectedSignalDetails()?.tvSignal?.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Timestamp</div>
                    <div className="font-medium">
                      {formatDateTime(getSelectedSignalDetails()?.tvSignal?.timestamp || '')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
                    <div>
                      <StatusBadge status={getSelectedSignalDetails()?.tvSignal?.status.toString() || ''} />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Hierarchical account distribution view */}
              <HierarchicalSignalView 
                tradingViewSignal={getSelectedSignalDetails()?.tvSignal} 
                coinstratSignals={getSelectedSignalDetails()?.coinstratSignals || []} 
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UnifiedSignalView;

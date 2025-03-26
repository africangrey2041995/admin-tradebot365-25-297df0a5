
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';
import StatusBadge from './StatusBadge';
import ActionBadge from './ActionBadge';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

interface UnifiedSignalViewProps {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
  onRefresh: () => void;
  isLoading?: boolean;
  error?: Error | null;
}

const UnifiedSignalView: React.FC<UnifiedSignalViewProps> = ({
  tradingViewLogs = [],
  coinstratLogs = [],
  onRefresh,
  isLoading = false,
  error = null
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString;
    }
  };

  // Get Coinstrat signals related to a TradingView signal
  const getRelatedCoinstratSignals = (tvSignalId: string) => {
    return coinstratLogs.filter(signal => signal.originalSignalId === tvSignalId);
  };

  // Check if we have any signals to display
  const hasSignals = tradingViewLogs.length > 0 || coinstratLogs.length > 0;

  if (isLoading) {
    return <LoadingState message="Đang tải tín hiệu..." />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={onRefresh} />;
  }

  if (!hasSignals) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
          <h3 className="text-xl font-medium mt-2">Không tìm thấy tín hiệu</h3>
          <p className="text-muted-foreground mb-4">
            Không có tín hiệu nào phù hợp với bộ lọc hiện tại hoặc bot chưa nhận được tín hiệu nào.
          </p>
          <Button onClick={onRefresh}>Làm mới</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead className="w-52">ID</TableHead>
            <TableHead className="w-32">Hành động</TableHead>
            <TableHead className="w-36">Symbol</TableHead>
            <TableHead className="w-40">Thời gian</TableHead>
            <TableHead className="w-32">Trạng thái</TableHead>
            <TableHead className="w-48">Tài khoản</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Trading View Signals */}
          {tradingViewLogs.map((signal) => {
            const isExpanded = expandedRows[signal.id] || false;
            const relatedSignals = getRelatedCoinstratSignals(signal.id);
            
            return (
              <React.Fragment key={signal.id}>
                {/* TradingView Signal Row */}
                <TableRow 
                  className={`cursor-pointer ${relatedSignals.length > 0 ? 'hover:bg-muted/50' : ''}`}
                  onClick={() => relatedSignals.length > 0 && toggleRow(signal.id)}
                >
                  <TableCell>
                    {relatedSignals.length > 0 ? (
                      isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )
                    ) : (
                      <div className="w-4" />
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {signal.id}
                  </TableCell>
                  <TableCell>
                    <ActionBadge action={signal.action} />
                  </TableCell>
                  <TableCell>{signal.instrument}</TableCell>
                  <TableCell>{formatDate(signal.timestamp)}</TableCell>
                  <TableCell>
                    <StatusBadge status={signal.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300">
                        TradingView/TB365
                      </span>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Coinstrat Signals related to this TradingView signal */}
                {isExpanded && relatedSignals.map((csSignal) => (
                  <TableRow key={csSignal.id} className="bg-muted/30">
                    <TableCell></TableCell>
                    <TableCell className="font-mono text-xs">
                      {csSignal.id}
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Original:</span> {csSignal.originalSignalId}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ActionBadge action={csSignal.action} />
                    </TableCell>
                    <TableCell>{csSignal.instrument}</TableCell>
                    <TableCell>{formatDate(csSignal.timestamp)}</TableCell>
                    <TableCell>
                      <StatusBadge status={csSignal.status} />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {/* Account Status Summary */}
                        <div className="flex items-center space-x-2">
                          {csSignal.processedAccounts.length > 0 && (
                            <div className="flex items-center text-xs">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                              <span className="text-green-700">{csSignal.processedAccounts.length}</span>
                            </div>
                          )}
                          
                          {csSignal.failedAccounts.length > 0 && (
                            <div className="flex items-center text-xs ml-2">
                              <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                              <span className="text-red-700">{csSignal.failedAccounts.length}</span>
                            </div>
                          )}
                          
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">
                            Coinstrat Pro
                          </span>
                        </div>
                        
                        {/* Account List - Alternatively you could add a "View Details" button here */}
                        {csSignal.processedAccounts.length > 0 && (
                          <div className="text-xs text-muted-foreground flex flex-wrap gap-1">
                            {csSignal.processedAccounts.slice(0, 2).map((acc, i) => (
                              <span key={i} className="bg-gray-100 px-1 rounded">{acc.name}</span>
                            ))}
                            {csSignal.processedAccounts.length > 2 && (
                              <span className="text-muted-foreground">+{csSignal.processedAccounts.length - 2} more</span>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            );
          })}

          {/* Standalone Coinstrat Signals (not linked to any TradingView signal) */}
          {coinstratLogs
            .filter(signal => !tradingViewLogs.some(tv => tv.id === signal.originalSignalId))
            .map((signal) => (
              <TableRow key={signal.id}>
                <TableCell></TableCell>
                <TableCell className="font-mono text-xs">
                  {signal.id}
                  {signal.originalSignalId && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Original:</span> {signal.originalSignalId}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <ActionBadge action={signal.action} />
                </TableCell>
                <TableCell>{signal.instrument}</TableCell>
                <TableCell>{formatDate(signal.timestamp)}</TableCell>
                <TableCell>
                  <StatusBadge status={signal.status} />
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {/* Account Status Summary */}
                    <div className="flex items-center space-x-2">
                      {signal.processedAccounts.length > 0 && (
                        <div className="flex items-center text-xs">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                          <span className="text-green-700">{signal.processedAccounts.length}</span>
                        </div>
                      )}
                      
                      {signal.failedAccounts.length > 0 && (
                        <div className="flex items-center text-xs ml-2">
                          <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                          <span className="text-red-700">{signal.failedAccounts.length}</span>
                        </div>
                      )}
                      
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">
                        Coinstrat Pro
                      </span>
                    </div>
                    
                    {/* Account List */}
                    {signal.processedAccounts.length > 0 && (
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-1">
                        {signal.processedAccounts.slice(0, 2).map((acc, i) => (
                          <span key={i} className="bg-gray-100 px-1 rounded">{acc.name}</span>
                        ))}
                        {signal.processedAccounts.length > 2 && (
                          <span className="text-muted-foreground">+{signal.processedAccounts.length - 2} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UnifiedSignalView;


import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import AdvancedSignalFilter from '@/components/signals/tracking/AdvancedSignalFilter';
import { SignalFilters } from '@/components/signals/types';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { Progress } from "@/components/ui/progress";
import LoadingSignalLogs from '@/components/bots/signal-logs/LoadingSignalLogs';
import { toast } from "sonner";

interface UnifiedSignalLogsTabProps {
  botId: string;
  userId: string;
}

const UnifiedSignalLogsTab: React.FC<UnifiedSignalLogsTabProps> = ({
  botId,
  userId
}) => {
  const [filters, setFilters] = useState<SignalFilters>({
    search: '',
    signalSource: 'all',
    status: 'all',
    dateRange: {
      from: undefined,
      to: undefined
    },
    userId: ''
  });
  
  const [filteredTvLogs, setFilteredTvLogs] = useState<TradingViewSignal[]>([]);
  const [filteredCsLogs, setFilteredCsLogs] = useState<CoinstratSignal[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [manualRefreshAttempted, setManualRefreshAttempted] = useState(false);
  
  // Add timeout reference for safety
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use the combined logs hook
  const {
    tradingViewLogs,
    coinstratLogs,
    loading,
    error,
    refreshLogs,
    availableUsers
  } = useCombinedSignalLogs({
    botId,
    userId,
    refreshTrigger
  });

  // Handle manual refresh with safety timeout
  const handleRefresh = () => {
    console.log('UnifiedSignalLogsTab - Manual refresh triggered');
    setManualRefreshAttempted(true);
    setRefreshTrigger(!refreshTrigger);
    
    // Set a safety timeout to prevent infinite loading state
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    toast.info("Refreshing signal logs...");
    
    loadingTimeoutRef.current = setTimeout(() => {
      console.warn('UnifiedSignalLogsTab - Safety timeout reached, forcing refresh completion');
      // Force refreshTrigger to change to ensure we don't get stuck
      setRefreshTrigger(prev => !prev);
      setManualRefreshAttempted(false);
      toast.error("Refresh timed out. Please try again.");
    }, 15000); // 15 second safety timeout
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);
  
  // Reset manual refresh flag when loading completes
  useEffect(() => {
    if (!loading && manualRefreshAttempted) {
      setManualRefreshAttempted(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    }
  }, [loading, manualRefreshAttempted]);

  // Apply filters to both log types
  useEffect(() => {
    // Filter TradingView logs
    let tvLogsFiltered = [...tradingViewLogs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      tvLogsFiltered = tvLogsFiltered.filter(log => 
        log.id.toLowerCase().includes(searchLower) ||
        log.instrument.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply source filter
    if (filters.signalSource === 'coinstrat') {
      tvLogsFiltered = [];
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      const statusMap: Record<string, string> = {
        'success': 'Processed',
        'failed': 'Failed',
        'pending': 'Pending'
      };
      
      const statusFilter = typeof filters.status === 'string' ? filters.status : filters.status?.[0] || 'all';
      
      if (statusFilter !== 'all') {
        tvLogsFiltered = tvLogsFiltered.filter(log => 
          log.status.toString().toLowerCase() === statusMap[statusFilter]?.toLowerCase()
        );
      }
    }
    
    // Apply date filter
    const dateRange = filters.dateRange as { from?: Date, to?: Date } | undefined;
    if (dateRange?.from || dateRange?.to) {
      tvLogsFiltered = tvLogsFiltered.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (dateRange.from) {
          isInRange = isInRange && logDate >= dateRange.from;
        }
        
        if (dateRange.to) {
          // Add one day to include the end date
          const endDate = new Date(dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    setFilteredTvLogs(tvLogsFiltered);
    
    // Filter Coinstrat logs
    let csLogsFiltered = [...coinstratLogs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      csLogsFiltered = csLogsFiltered.filter(log => 
        log.id.toLowerCase().includes(searchLower) ||
        log.originalSignalId.toLowerCase().includes(searchLower) ||
        log.instrument.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply source filter
    if (filters.signalSource === 'tradingview') {
      csLogsFiltered = [];
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      const statusFilter = typeof filters.status === 'string' ? filters.status : filters.status?.[0] || 'all';
      
      if (statusFilter !== 'all') {
        csLogsFiltered = csLogsFiltered.filter(log => {
          if (statusFilter === 'success') {
            return log.processedAccounts.length > 0;
          } else if (statusFilter === 'failed') {
            return log.failedAccounts.length > 0;
          } else if (statusFilter === 'pending') {
            return log.status.toString().toLowerCase().includes('pending');
          }
          return true;
        });
      }
    }
    
    // Apply date filter
    if (dateRange?.from || dateRange?.to) {
      csLogsFiltered = csLogsFiltered.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (dateRange.from) {
          isInRange = isInRange && logDate >= dateRange.from;
        }
        
        if (dateRange.to) {
          // Add one day to include the end date
          const endDate = new Date(dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    // Apply user filter
    if (filters.userId) {
      csLogsFiltered = csLogsFiltered.filter(log => {
        // Check if any processed or failed account belongs to the selected user
        const hasUserInProcessed = log.processedAccounts.some(
          account => account.userId === filters.userId
        );
        
        const hasUserInFailed = log.failedAccounts.some(
          account => account.userId === filters.userId
        );
        
        return hasUserInProcessed || hasUserInFailed;
      });
    }
    
    setFilteredCsLogs(csLogsFiltered);
  }, [tradingViewLogs, coinstratLogs, filters]);
  
  // Prepare export data based on both log types
  const prepareExportData = () => {
    const exportData: string[][] = [];
    
    // Add TradingView logs
    filteredTvLogs.forEach(log => {
      exportData.push([
        log.id,
        'TradingView',
        log.instrument,
        new Date(log.timestamp).toLocaleString(),
        log.action,
        log.status.toString(),
        log.amount,
        log.errorMessage || ''
      ]);
    });
    
    // Add Coinstrat logs
    filteredCsLogs.forEach(log => {
      exportData.push([
        log.id,
        'Coinstrat',
        log.instrument,
        new Date(log.timestamp).toLocaleString(),
        log.action,
        log.status.toString(),
        log.amount,
        log.errorMessage || '',
        log.originalSignalId,
        `${log.processedAccounts.length} success, ${log.failedAccounts.length} failed`
      ]);
    });
    
    return exportData;
  };
  
  const exportHeaders = [
    'ID',
    'Source',
    'Symbol',
    'Timestamp',
    'Action',
    'Status',
    'Amount',
    'Error',
    'Original Signal ID',
    'Execution Summary'
  ];

  // If loading and no data yet, show full loading state
  if (loading && tradingViewLogs.length === 0 && coinstratLogs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <LoadingSignalLogs 
            message="Fetching signal logs..." 
            botType="prop" 
            showProgress={true} 
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Advanced filtering */}
          <AdvancedSignalFilter
            onFilterChange={setFilters}
            availableUsers={availableUsers}
            showExport={true}
            exportComponent={
              <ExportDataDropdown
                data={prepareExportData()}
                headers={exportHeaders}
                fileName={`prop-bot-${botId}-unified-logs`}
              />
            }
          />
          
          {/* Signal table with hierarchical view */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Integrated Signal Tracking
              </h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh} 
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
            
            {loading && (
              <div className="py-2">
                <Progress 
                  value={100} 
                  className="h-1" 
                  indicatorClassName="animate-pulse bg-blue-500" 
                />
              </div>
            )}
            
            <UnifiedSignalView
              tradingViewLogs={filteredTvLogs}
              coinstratLogs={filteredCsLogs}
              onRefresh={handleRefresh}
              isLoading={loading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedSignalLogsTab;

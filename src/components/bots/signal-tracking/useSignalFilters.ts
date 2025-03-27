
import { useState, useEffect } from 'react';
import { SignalFilters } from '../trading-view-logs/AdvancedSignalFilter';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

interface UseSignalFiltersProps {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
}

interface ErrorStats {
  totalErrors: number;
  tradingViewErrors: number;
  coinstratErrors: number;
}

export interface UseSignalFiltersResult {
  filteredTradingViewLogs: TradingViewSignal[];
  filteredCoinstratLogs: CoinstratSignal[];
  filters: SignalFilters;
  handleFilterChange: (filters: SignalFilters) => void;
  setInitialFilters: (initialFilters: Partial<SignalFilters>) => void;
  errorStats: ErrorStats;
}

export const useSignalFilters = ({ tradingViewLogs, coinstratLogs }: UseSignalFiltersProps): UseSignalFiltersResult => {
  const [filters, setFilters] = useState<SignalFilters>({
    search: '',
    signalSource: 'all',
    status: 'all',
    dateRange: {
      from: undefined,
      to: undefined
    },
    userId: '',
    errorOnly: false // Adding the missing errorOnly property
  });

  const [filteredTradingViewLogs, setFilteredTradingViewLogs] = useState<TradingViewSignal[]>(tradingViewLogs);
  const [filteredCoinstratLogs, setFilteredCoinstratLogs] = useState<CoinstratSignal[]>(coinstratLogs);

  // Function to set initial filters if needed
  const setInitialFilters = (initialFilters: Partial<SignalFilters>) => {
    setFilters(prev => ({ ...prev, ...initialFilters }));
  };

  // Apply filters whenever filter criteria or source data changes
  useEffect(() => {
    applyFilters(filters);
  }, [filters, tradingViewLogs, coinstratLogs]);

  const handleFilterChange = (newFilters: SignalFilters) => {
    console.log('Applying filters:', newFilters);
    setFilters(newFilters);
  };

  const applyFilters = (currentFilters: SignalFilters) => {
    // Filter TradingView logs
    let filteredTvLogs = [...tradingViewLogs];
    
    // Apply search filter
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filteredTvLogs = filteredTvLogs.filter(log => 
        log.id.toLowerCase().includes(searchLower) ||
        log.instrument.toLowerCase().includes(searchLower) ||
        (log.accountName && log.accountName.toLowerCase().includes(searchLower)) ||
        log.action.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply source filter
    if (currentFilters.signalSource === 'coinstrat') {
      filteredTvLogs = [];
    }
    
    // Apply status filter
    if (currentFilters.status !== 'all') {
      const statusMap: Record<string, string> = {
        'success': 'Processed',
        'failed': 'Failed',
        'pending': 'Pending'
      };
      
      filteredTvLogs = filteredTvLogs.filter(log => 
        log.status?.toString().toLowerCase() === statusMap[currentFilters.status]?.toLowerCase()
      );
    }
    
    // Apply error only filter
    if (currentFilters.errorOnly) {
      filteredTvLogs = filteredTvLogs.filter(log => 
        log.status?.toString().toLowerCase() === 'failed' || 
        log.errorMessage
      );
    }
    
    // Apply date filter
    if (currentFilters.dateRange.from || currentFilters.dateRange.to) {
      filteredTvLogs = filteredTvLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (currentFilters.dateRange.from) {
          isInRange = isInRange && logDate >= currentFilters.dateRange.from;
        }
        
        if (currentFilters.dateRange.to) {
          // Add one day to include the end date
          const endDate = new Date(currentFilters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    // Apply user filter if specified
    if (currentFilters.userId) {
      filteredTvLogs = filteredTvLogs.filter(log => 
        log.userId === currentFilters.userId
      );
    }
    
    setFilteredTradingViewLogs(filteredTvLogs);
    
    // Filter Coinstrat logs with similar logic
    let filteredCsLogs = [...coinstratLogs];
    
    // Apply search filter
    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filteredCsLogs = filteredCsLogs.filter(log => 
        log.id.toLowerCase().includes(searchLower) ||
        log.originalSignalId.toLowerCase().includes(searchLower) ||
        log.instrument.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply source filter
    if (currentFilters.signalSource === 'tradingview') {
      filteredCsLogs = [];
    }
    
    // Apply status filter
    if (currentFilters.status !== 'all') {
      const statusFilter = currentFilters.status;
      
      filteredCsLogs = filteredCsLogs.filter(log => {
        if (statusFilter === 'success') {
          return log.processedAccounts?.length > 0 && log.failedAccounts?.length === 0;
        } else if (statusFilter === 'failed') {
          return log.failedAccounts?.length > 0;
        } else if (statusFilter === 'pending') {
          return log.status?.toString().toLowerCase().includes('pending');
        }
        return true;
      });
    }
    
    // Apply error only filter
    if (currentFilters.errorOnly) {
      filteredCsLogs = filteredCsLogs.filter(log => 
        log.failedAccounts?.length > 0 || 
        log.errorMessage
      );
    }
    
    // Apply date filter
    if (currentFilters.dateRange.from || currentFilters.dateRange.to) {
      filteredCsLogs = filteredCsLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (currentFilters.dateRange.from) {
          isInRange = isInRange && logDate >= currentFilters.dateRange.from;
        }
        
        if (currentFilters.dateRange.to) {
          // Add one day to include the end date
          const endDate = new Date(currentFilters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    // Apply user filter
    if (currentFilters.userId) {
      filteredCsLogs = filteredCsLogs.filter(log => {
        // Check if any processed or failed account belongs to the selected user
        const hasUserInProcessed = log.processedAccounts?.some(
          account => account.userId === currentFilters.userId
        );
        
        const hasUserInFailed = log.failedAccounts?.some(
          account => account.userId === currentFilters.userId
        );
        
        return hasUserInProcessed || hasUserInFailed;
      });
    }
    
    setFilteredCoinstratLogs(filteredCsLogs);
  };

  // Calculate error statistics
  const errorStats = {
    totalErrors: 
      (filteredTradingViewLogs.filter(log => log.status?.toString().toLowerCase() === 'failed' || log.errorMessage).length) +
      (filteredCoinstratLogs.filter(log => log.failedAccounts?.length > 0 || log.errorMessage).length),
    tradingViewErrors: filteredTradingViewLogs.filter(log => log.status?.toString().toLowerCase() === 'failed' || log.errorMessage).length,
    coinstratErrors: filteredCoinstratLogs.filter(log => log.failedAccounts?.length > 0 || log.errorMessage).length
  };

  return {
    filters,
    filteredTradingViewLogs,
    filteredCoinstratLogs,
    handleFilterChange,
    setInitialFilters,
    errorStats
  };
};

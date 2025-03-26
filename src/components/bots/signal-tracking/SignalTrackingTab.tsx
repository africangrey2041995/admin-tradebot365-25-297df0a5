
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import AdvancedSignalFilter from '@/components/bots/trading-view-logs/AdvancedSignalFilter';
import { useCombinedSignalLogs } from '@/hooks/useCombinedSignalLogs';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

interface SignalTrackingTabProps {
  botId: string;
  userId: string;
  isAdminView?: boolean;
}

const SignalTrackingTab: React.FC<SignalTrackingTabProps> = ({
  botId,
  userId,
  isAdminView = false
}) => {
  // State for filtered logs
  const [filteredTradingViewLogs, setFilteredTradingViewLogs] = useState<TradingViewSignal[]>([]);
  const [filteredCoinstratLogs, setFilteredCoinstratLogs] = useState<CoinstratSignal[]>([]);

  // Use the combined logs hook to fetch both types of logs
  const {
    tradingViewLogs,
    coinstratLogs,
    loading,
    error,
    refreshLogs,
    availableUsers
  } = useCombinedSignalLogs({
    botId,
    userId
  });

  // Initialize filtered logs when raw logs are loaded
  useEffect(() => {
    setFilteredTradingViewLogs(tradingViewLogs);
    setFilteredCoinstratLogs(coinstratLogs);
  }, [tradingViewLogs, coinstratLogs]);

  const handleRefresh = () => {
    refreshLogs();
  };

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    console.log('Applying filters:', filters);
    
    // Filter TradingView logs
    let filteredTvLogs = [...tradingViewLogs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTvLogs = filteredTvLogs.filter(log => 
        log.id.toLowerCase().includes(searchLower) ||
        log.instrument.toLowerCase().includes(searchLower) ||
        (log.accountName && log.accountName.toLowerCase().includes(searchLower)) ||
        log.action.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply source filter
    if (filters.signalSource === 'coinstrat') {
      filteredTvLogs = [];
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      const statusMap: Record<string, string> = {
        'success': 'Processed',
        'failed': 'Failed',
        'pending': 'Pending'
      };
      
      filteredTvLogs = filteredTvLogs.filter(log => 
        log.status.toString().toLowerCase() === statusMap[filters.status]?.toLowerCase()
      );
    }
    
    // Apply date filter
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredTvLogs = filteredTvLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (filters.dateRange.from) {
          isInRange = isInRange && logDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          // Add one day to include the end date
          const endDate = new Date(filters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    setFilteredTradingViewLogs(filteredTvLogs);
    
    // Filter Coinstrat logs
    let filteredCsLogs = [...coinstratLogs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCsLogs = filteredCsLogs.filter(log => 
        log.id.toLowerCase().includes(searchLower) ||
        log.originalSignalId.toLowerCase().includes(searchLower) ||
        log.instrument.toLowerCase().includes(searchLower) ||
        log.action.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply source filter
    if (filters.signalSource === 'tradingview') {
      filteredCsLogs = [];
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      const statusFilter = filters.status;
      
      filteredCsLogs = filteredCsLogs.filter(log => {
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
    
    // Apply date filter
    if (filters.dateRange.from || filters.dateRange.to) {
      filteredCsLogs = filteredCsLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (filters.dateRange.from) {
          isInRange = isInRange && logDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          // Add one day to include the end date
          const endDate = new Date(filters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    setFilteredCoinstratLogs(filteredCsLogs);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="mb-2">
              {isAdminView ? "Signal Tracking (Admin)" : "Theo dõi tín hiệu giao dịch"}
            </CardTitle>
            <CardDescription>
              Theo dõi hành trình tín hiệu từ TradingView đến các tài khoản giao dịch trên Coinstrat Pro
            </CardDescription>
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={loading}
            className="min-w-[120px]"
          >
            {loading ? "Đang làm mới..." : "Làm mới"}
          </Button>
        </div>
        
        {/* Advanced filtering for signals */}
        <div className="mb-6">
          <AdvancedSignalFilter 
            onFilterChange={handleFilterChange} 
            availableUsers={isAdminView ? availableUsers : []}
            showExport={isAdminView}
          />
        </div>
        
        {/* Unified hierarchical signal view */}
        <UnifiedSignalView 
          tradingViewLogs={filteredTradingViewLogs} 
          coinstratLogs={filteredCoinstratLogs} 
          onRefresh={refreshLogs} 
          isLoading={loading} 
        />
      </CardContent>
    </Card>
  );
};

export default SignalTrackingTab;

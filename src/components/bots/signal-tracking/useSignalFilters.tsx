
import { useState, useEffect } from 'react';
import { SignalFilters } from '../trading-view-logs/AdvancedSignalFilter';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

interface UseSignalFiltersProps {
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
}

export const useSignalFilters = ({ tradingViewLogs, coinstratLogs }: UseSignalFiltersProps) => {
  const [filters, setFilters] = useState<SignalFilters>({
    search: '',
    signalSource: 'all',
    status: 'all',
    dateRange: {
      from: undefined,
      to: undefined
    },
    userId: '',
    errorOnly: false // Mặc định không lọc chỉ lỗi
  });

  const [filteredTradingViewLogs, setFilteredTradingViewLogs] = useState<TradingViewSignal[]>([]);
  const [filteredCoinstratLogs, setFilteredCoinstratLogs] = useState<CoinstratSignal[]>([]);

  // Áp dụng bộ lọc vào logs
  useEffect(() => {
    // Lọc TradingView logs
    let tvFiltered = [...tradingViewLogs];
    
    // Áp dụng bộ lọc tìm kiếm
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      tvFiltered = tvFiltered.filter(log => 
        (log.id?.toLowerCase().includes(searchLower)) ||
        (log.instrument?.toLowerCase().includes(searchLower)) ||
        (log.action?.toLowerCase().includes(searchLower))
      );
    }
    
    // Áp dụng bộ lọc nguồn tín hiệu
    if (filters.signalSource === 'coinstrat') {
      tvFiltered = [];
    }
    
    // Áp dụng bộ lọc trạng thái
    if (filters.status !== 'all') {
      const statusMap: Record<string, string> = {
        'success': 'Processed',
        'failed': 'Failed',
        'pending': 'Pending'
      };
      
      tvFiltered = tvFiltered.filter(log => 
        log.status?.toString().toLowerCase() === statusMap[filters.status]?.toLowerCase()
      );
    }
    
    // Áp dụng bộ lọc thời gian
    if (filters.dateRange.from || filters.dateRange.to) {
      tvFiltered = tvFiltered.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (filters.dateRange.from) {
          isInRange = isInRange && logDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          // Thêm một ngày để bao gồm cả ngày kết thúc
          const endDate = new Date(filters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    // Áp dụng bộ lọc chỉ hiển thị lỗi
    if (filters.errorOnly) {
      tvFiltered = tvFiltered.filter(log => 
        log.status?.toString().toLowerCase() === 'failed' || 
        log.errorMessage
      );
    }
    
    setFilteredTradingViewLogs(tvFiltered);
    
    // Lọc Coinstrat logs
    let csFiltered = [...coinstratLogs];
    
    // Áp dụng bộ lọc tìm kiếm
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      csFiltered = csFiltered.filter(log => 
        (log.id?.toLowerCase().includes(searchLower)) ||
        (log.originalSignalId?.toLowerCase().includes(searchLower)) ||
        (log.instrument?.toLowerCase().includes(searchLower)) ||
        (log.action?.toLowerCase().includes(searchLower))
      );
    }
    
    // Áp dụng bộ lọc nguồn tín hiệu
    if (filters.signalSource === 'tradingview') {
      csFiltered = [];
    }
    
    // Áp dụng bộ lọc trạng thái
    if (filters.status !== 'all') {
      const statusFilter = filters.status;
      
      csFiltered = csFiltered.filter(log => {
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
    
    // Áp dụng bộ lọc thời gian
    if (filters.dateRange.from || filters.dateRange.to) {
      csFiltered = csFiltered.filter(log => {
        const logDate = new Date(log.timestamp);
        let isInRange = true;
        
        if (filters.dateRange.from) {
          isInRange = isInRange && logDate >= filters.dateRange.from;
        }
        
        if (filters.dateRange.to) {
          // Thêm một ngày để bao gồm cả ngày kết thúc
          const endDate = new Date(filters.dateRange.to);
          endDate.setDate(endDate.getDate() + 1);
          isInRange = isInRange && logDate <= endDate;
        }
        
        return isInRange;
      });
    }
    
    // Áp dụng bộ lọc người dùng
    if (filters.userId) {
      csFiltered = csFiltered.filter(log => {
        // Kiểm tra xem có tài khoản nào của người dùng đã xử lý hoặc bị lỗi
        const hasUserInProcessed = log.processedAccounts?.some(
          account => account.userId === filters.userId
        );
        
        const hasUserInFailed = log.failedAccounts?.some(
          account => account.userId === filters.userId
        );
        
        return hasUserInProcessed || hasUserInFailed;
      });
    }
    
    // Áp dụng bộ lọc chỉ hiển thị lỗi
    if (filters.errorOnly) {
      csFiltered = csFiltered.filter(log => 
        log.failedAccounts?.length > 0 || 
        log.errorMessage
      );
    }
    
    setFilteredCoinstratLogs(csFiltered);
  }, [tradingViewLogs, coinstratLogs, filters]);

  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (newFilters: SignalFilters) => {
    setFilters(newFilters);
  };

  // Tính toán thống kê lỗi
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
    errorStats
  };
};

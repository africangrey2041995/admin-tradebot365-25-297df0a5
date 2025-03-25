
import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { TradingViewSignal } from '@/types/signal';
import { normalizeUserId, validateUserId } from '@/utils/normalizeUserId';
import { useSafeLoading } from '@/hooks/useSafeLoading';
import { useAdmin } from '@/hooks/use-admin';

interface UseTradingViewLogsProps {
  botId: string;
  userId: string;
  refreshTrigger?: boolean;
}

interface UseTradingViewLogsResult {
  logs: TradingViewSignal[];
  error: Error | null;
  loading: boolean;
  fetchLogs: () => void;
}

/**
 * Custom hook để lấy và xử lý nhật ký tín hiệu từ TradingView
 * 
 * @param botId ID của bot, cần tuân theo định dạng BOT-XXX, PREMIUM-XXX hoặc PROP-XXX
 * @param userId ID của người dùng, cần tuân theo định dạng USR-XXX
 * @param refreshTrigger Kích hoạt refresh nhật ký khi giá trị thay đổi
 * @returns Nhật ký tín hiệu, trạng thái loading, lỗi và hàm fetchLogs để tải lại dữ liệu
 */
export const useTradingViewLogs = ({
  botId,
  userId,
  refreshTrigger = false
}: UseTradingViewLogsProps): UseTradingViewLogsResult => {
  const [logs, setLogs] = useState<TradingViewSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const fetchInProgressRef = useRef(false);
  
  // Use our safe loading hook instead of raw useState
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 3000,
    debugComponent: 'TradingViewLogs',
    minLoadingDurationMs: 500 // Ensure a minimum loading time to avoid flickering
  });

  // Get admin status from useAdmin hook
  const { isAdmin } = useAdmin();

  const fetchLogs = useCallback(() => {
    // Prevent multiple concurrent fetchLogs calls
    if (fetchInProgressRef.current) {
      console.log('TradingViewLogs - Fetch already in progress, skipping duplicate request');
      return;
    }
    
    fetchInProgressRef.current = true;
    
    // Only validate userId format for non-admin users
    if (!isAdmin && !validateUserId(userId)) {
      console.warn(`TradingViewLogs - Invalid userId format: ${userId}, should be in format USR-XXX`);
      // We still proceed but with a warning
    }
    
    console.log(`TradingViewLogs - Fetching logs for ${isAdmin ? 'admin' : `userId: ${userId}`} (normalized: ${normalizeUserId(userId)})`);
    console.log(`TradingViewLogs - Admin status: ${isAdmin ? 'Yes' : 'No'}`);
    startLoading();
    setError(null);
    
    setTimeout(() => {
      try {
        // Mock data with standardized userId format (USR-XXX)
        const mockLogs: TradingViewSignal[] = [
          {
            id: 'SIG001',
            action: 'ENTER_LONG',
            instrument: 'BTCUSDT',
            timestamp: new Date().toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '1.5',
            status: 'Processed',
            userId: 'USR-001' // Standardized format with dash
          },
          {
            id: 'SIG002',
            action: 'EXIT_LONG',
            instrument: 'ETHUSDT',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '2.3',
            status: 'Processed',
            userId: 'USR-001' // Standardized format with dash
          },
          {
            id: 'SIG003',
            action: 'ENTER_SHORT',
            instrument: 'SOLUSDT',
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            signalToken: `CST${Math.random().toString(36).substring(2, 10).toUpperCase()}${botId?.replace('BOT', '')}`,
            maxLag: '5s',
            investmentType: 'crypto',
            amount: '3.7',
            status: 'Failed',
            errorMessage: 'Invalid account configuration',
            userId: 'USR-002' // Standardized format with dash
          },
        ];
        
        try {
          // For admin users, don't filter by userId - show all logs
          if (isAdmin) {
            console.log(`TradingViewLogs - Admin user: showing all ${mockLogs.length} logs`);
            setLogs(mockLogs);
          } else {
            // Use normalizeUserId for consistent comparison for regular users
            const normalizedInputUserId = normalizeUserId(userId);
            console.log(`TradingViewLogs - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
            
            const filteredLogs = mockLogs.filter(log => {
              if (!log.userId) {
                console.warn(`TradingViewLogs - Log ${log.id} is missing userId`);
                return false;
              }
              
              const normalizedLogUserId = normalizeUserId(log.userId);
              const match = normalizedLogUserId === normalizedInputUserId;
              console.log(`TradingViewLogs - Comparing: ${log.userId} (${normalizedLogUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
              return match;
            });
            
            console.log(`TradingViewLogs - Filtered logs: ${filteredLogs.length} of ${mockLogs.length}`);
            setLogs(filteredLogs);
          }
        } catch (filterErr) {
          console.error('Error filtering logs:', filterErr);
          setError(filterErr instanceof Error ? filterErr : new Error('Error filtering logs data'));
          setLogs([]);
        }
      } catch (error) {
        console.error('Error processing logs:', error);
        setError(error instanceof Error ? error : new Error('Error processing logs data'));
        setLogs([]);
      } finally {
        stopLoading();
        fetchInProgressRef.current = false;
      }
    }, 500); // Reduced from 800ms to 500ms
  }, [botId, userId, startLoading, stopLoading, isAdmin]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Handle refresh trigger from parent
  useEffect(() => {
    if (refreshTrigger) {
      fetchLogs();
    }
  }, [refreshTrigger, fetchLogs]);

  return {
    logs,
    error,
    loading,
    fetchLogs
  };
};

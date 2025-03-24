
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { TradingViewSignal } from '@/types';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { useSafeLoading } from '@/hooks/useSafeLoading';

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

export const useTradingViewLogs = ({
  botId,
  userId,
  refreshTrigger = false
}: UseTradingViewLogsProps): UseTradingViewLogsResult => {
  const [logs, setLogs] = useState<TradingViewSignal[]>([]);
  const [error, setError] = useState<Error | null>(null);
  
  // Use our safe loading hook instead of raw useState
  const { loading, startLoading, stopLoading } = useSafeLoading({
    timeoutMs: 3000,
    debugComponent: 'TradingViewLogs'
  });

  const fetchLogs = useCallback(() => {
    console.log(`TradingViewLogs - Fetching logs for userId: ${userId}`);
    startLoading();
    setError(null);
    
    setTimeout(() => {
      try {
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
            userId: 'USR-001' // Standardized to USR-001 format with dash
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
            userId: 'USR-001' // Standardized to USR-001 format with dash
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
            userId: 'USR-002' // Standardized to USR-002 format with dash
          },
        ];
        
        try {
          // Use normalizeUserId for consistent comparison
          const normalizedInputUserId = normalizeUserId(userId);
          console.log(`TradingViewLogs - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
          
          const filteredLogs = mockLogs.filter(log => {
            const normalizedLogUserId = normalizeUserId(log.userId || '');
            const match = normalizedLogUserId === normalizedInputUserId;
            console.log(`TradingViewLogs - Comparing: ${log.userId} (${normalizedLogUserId}) with ${userId} (${normalizedInputUserId}) - Match: ${match}`);
            return match;
          });
          
          console.log(`TradingViewLogs - Filtered logs: ${filteredLogs.length} of ${mockLogs.length}`);
          setLogs(filteredLogs);
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
      }
    }, 800);
  }, [botId, userId, startLoading, stopLoading]);

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

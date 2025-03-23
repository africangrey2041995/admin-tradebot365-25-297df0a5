
import { useState, useEffect, useCallback } from 'react';
import { ExtendedSignal } from '@/types';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { toast } from 'sonner';

// Mock data for development - in production this would come from an API
const mockErrorSignals: ExtendedSignal[] = [
  {
    id: 'ERR001',
    action: 'ENTER_LONG',
    instrument: 'BTCUSDT',
    timestamp: '2023-07-15T08:30:45Z',
    signalToken: '1234abcd',
    maxLag: '5000',
    investmentType: 'crypto',
    amount: '0.5',
    status: 'Failed',
    errorMessage: 'Account balance insufficient',
    userId: 'USR-001',
    tradingAccount: 'Main Account',
    botId: 'BOT-3201',
    botType: 'user',
    botName: 'BTC Long',
    exchange: 'Binance',
    errorCode: 'ERR_INSUFFICIENT_BALANCE',
    errorSeverity: 'high'
  },
  {
    id: 'ERR002',
    action: 'EXIT_SHORT',
    instrument: 'ETHUSDT',
    timestamp: '2023-07-16T14:22:10Z',
    signalToken: '5678efgh',
    maxLag: '5000',
    investmentType: 'crypto',
    amount: '2.3',
    status: 'Failed',
    errorMessage: 'API key expired',
    userId: 'USR-002',
    tradingAccount: 'ETH Trading',
    botId: 'BOT-8932',
    botType: 'user',
    botName: 'ETH Trend',
    exchange: 'Binance',
    errorCode: 'ERR_API_KEY_EXPIRED',
    errorSeverity: 'critical'
  },
  {
    id: 'ERR003',
    action: 'ENTER_SHORT',
    instrument: 'SOLUSDT',
    timestamp: '2023-07-17T09:15:33Z',
    signalToken: '9012ijkl',
    maxLag: '5000',
    investmentType: 'crypto',
    amount: '10',
    status: 'Failed',
    errorMessage: 'Exchange connection timeout',
    userId: 'USR-001',
    tradingAccount: 'SOL Account',
    botId: 'PRE7459',
    botType: 'premium',
    botName: 'Alpha Momentum',
    exchange: 'Binance',
    errorCode: 'ERR_CONNECTION_TIMEOUT',
    errorSeverity: 'medium'
  },
  {
    id: 'ERR004',
    action: 'EXIT_LONG',
    instrument: 'ADAUSDT',
    timestamp: '2023-07-18T16:45:20Z',
    signalToken: '3456mnop',
    maxLag: '5000',
    investmentType: 'crypto',
    amount: '100',
    status: 'Failed',
    errorMessage: 'Invalid order parameters',
    userId: 'USR-001',
    tradingAccount: 'ADA Trading',
    botId: 'BOT-3201',
    botType: 'user',
    botName: 'BTC Long',
    exchange: 'Binance',
    errorCode: 'ERR_INVALID_PARAMS',
    errorSeverity: 'medium'
  },
  {
    id: 'ERR005',
    action: 'ENTER_LONG',
    instrument: 'DOGEUSDT',
    timestamp: '2023-07-19T10:30:15Z',
    signalToken: '7890qrst',
    maxLag: '5000',
    investmentType: 'crypto',
    amount: '1000',
    status: 'Failed',
    errorMessage: 'Exchange rejected order',
    userId: 'USR-002',
    tradingAccount: 'DOGE Trading',
    botId: 'BOT-8932',
    botType: 'user', 
    botName: 'Long Master',
    exchange: 'Binance',
    errorCode: 'ERR_EXCHANGE_REJECTED',
    errorSeverity: 'high'
  }
];

/**
 * Custom hook để xử lý tín hiệu lỗi
 * 
 * @param userId ID của người dùng hiện tại
 * @param botId ID của bot (tùy chọn)
 * @returns 
 */
export function useErrorSignals(userId: string, botId?: string) {
  const [errorSignals, setErrorSignals] = useState<ExtendedSignal[]>([]);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch error signals with improved error handling
  const fetchErrorSignals = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Normalize the input userId for consistent comparison
      const normalizedInputUserId = normalizeUserId(userId);
      console.log(`useErrorSignals - Normalized input userId: ${userId} → ${normalizedInputUserId}`);
      
      // Simulate API call with timeout
      setTimeout(() => {
        try {
          // Filter mock data to match botId AND userId with normalized comparison
          const signals = mockErrorSignals.filter(signal => {
            const normalizedSignalUserId = normalizeUserId(signal.userId);
            const matchesUserId = normalizedSignalUserId === normalizedInputUserId;
            const matchesBotId = !botId || signal.botId === botId;
            
            console.log(`useErrorSignals - Signal ${signal.id}: userId match: ${matchesUserId}, botId match: ${matchesBotId}`);
            return matchesBotId && matchesUserId;
          });
          
          console.log(`useErrorSignals - Filtered ${signals.length} signals for userId: ${userId} and botId: ${botId || 'any'}`);
          setErrorSignals(signals);
          
          // Set first two errors as unread
          const newUnread = new Set<string>();
          signals.slice(0, 2).forEach(signal => {
            if (signal.id) {
              newUnread.add(signal.id);
            }
          });
          setUnreadErrors(newUnread);
          
          setLoading(false);
        } catch (innerError) {
          console.error('Error processing error signals:', innerError);
          setError(innerError instanceof Error ? innerError : new Error('An error occurred while processing signals'));
          setLoading(false);
          toast.error('An error occurred while processing error signals');
        }
      }, 800);
    } catch (err) {
      console.error('Error fetching error signals:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setLoading(false);
      toast.error('An error occurred while loading error signals');
    }
  }, [botId, userId]);
  
  // Handle marking errors as read
  const handleMarkAsRead = (signalId: string) => {
    try {
      setUnreadErrors(prev => {
        const newSet = new Set(prev);
        newSet.delete(signalId);
        return newSet;
      });
      toast.success('Error signal marked as read');
    } catch (err) {
      console.error('Error marking signal as read:', err);
      toast.error('An error occurred while marking the signal as read');
    }
  };
  
  // Load data when component mounts or dependencies change
  useEffect(() => {
    fetchErrorSignals();
  }, [fetchErrorSignals]);
  
  return {
    errorSignals,
    unreadErrors,
    loading,
    error,
    handleMarkAsRead,
    refreshErrorSignals: fetchErrorSignals
  };
}

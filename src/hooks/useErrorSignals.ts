
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { ExtendedSignal } from '@/types';
import { mockErrorSignals } from '@/components/bots/error-signals/mockData';
import { BotType } from '@/constants/botTypes';
import { normalizeUserId } from '@/utils/normalizeUserId';

export const useErrorSignals = (userId: string) => {
  const [allErrorSignals, setAllErrorSignals] = useState<ExtendedSignal[]>([]);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Filter signals by bot type
  const userBotErrors = allErrorSignals.filter(signal => 
    signal.botType === BotType.USER_BOT || signal.botType === 'user'
  );
  
  const premiumBotErrors = allErrorSignals.filter(signal => 
    signal.botType === BotType.PREMIUM_BOT || signal.botType === 'premium'
  );
  
  const propBotErrors = allErrorSignals.filter(signal => 
    signal.botType === BotType.PROP_BOT || signal.botType === 'prop'
  );
  
  // Fetch error signals data
  const fetchErrorSignals = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Normalize the userId for consistent comparison
      const normalizedUserId = normalizeUserId(userId);
      console.log(`useErrorSignals - Fetching error signals for userId: ${normalizedUserId}`);
      
      // Simulate API call with a timeout
      setTimeout(() => {
        try {
          // Filter mock data to match userId
          const filteredSignals = mockErrorSignals.filter(signal => {
            const signalUserId = normalizeUserId(signal.userId || '');
            return signalUserId === normalizedUserId;
          });
          
          console.log(`useErrorSignals - Found ${filteredSignals.length} error signals for user ${normalizedUserId}`);
          setAllErrorSignals(filteredSignals);
          
          // Set first few errors as unread for demonstration
          const newUnread = new Set<string>();
          filteredSignals.slice(0, 3).forEach(signal => {
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
          toast.error('Đã xảy ra lỗi khi xử lý dữ liệu tín hiệu');
        }
      }, 800);
    } catch (err) {
      console.error('Error fetching error signals:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setLoading(false);
      toast.error('Đã xảy ra lỗi khi tải dữ liệu tín hiệu lỗi');
    }
  }, [userId]);
  
  // Load data on component mount or when userId changes
  useEffect(() => {
    fetchErrorSignals();
  }, [fetchErrorSignals]);
  
  // Mark an error as read
  const markAsRead = useCallback((signalId: string) => {
    try {
      setUnreadErrors(prev => {
        const newSet = new Set(prev);
        newSet.delete(signalId);
        return newSet;
      });
      toast.success('Đã đánh dấu tín hiệu lỗi là đã đọc');
    } catch (err) {
      console.error('Error marking signal as read:', err);
      toast.error('Đã xảy ra lỗi khi đánh dấu tín hiệu là đã đọc');
    }
  }, []);
  
  // Refresh error data
  const refreshErrorData = useCallback(() => {
    toast.info('Đang làm mới dữ liệu lỗi...');
    fetchErrorSignals();
  }, [fetchErrorSignals]);
  
  return {
    allErrorSignals,
    userBotErrors,
    premiumBotErrors,
    propBotErrors,
    unreadErrors,
    loading,
    error,
    refreshErrorData,
    markAsRead
  };
};

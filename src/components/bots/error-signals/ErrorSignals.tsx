
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorSignalsTable from './ErrorSignalsTable';
import { ExtendedSignal, ErrorSignalsProps } from './types';
import { getErrorSignals } from './mockData';
import { useNavigation } from '@/hooks/useNavigation';

const ErrorSignals: React.FC<ErrorSignalsProps> = ({ botId }) => {
  const [errorSignals, setErrorSignals] = useState<ExtendedSignal[]>([]);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { isAdminContext } = useNavigation();
  
  // Fetch error signals
  const fetchErrorSignals = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Giả lập API call với timeout
      setTimeout(() => {
        // Sử dụng mock data phù hợp với context admin/user
        const signals = getErrorSignals(isAdminContext, botId);
        setErrorSignals(signals);
        
        // Đặt tất cả lỗi là chưa đọc
        const newUnread = new Set<string>();
        signals.forEach(signal => newUnread.add(signal.id));
        setUnreadErrors(newUnread);
        
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error('Error fetching error signals:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
    }
  }, [botId, isAdminContext]);
  
  // Load data khi component mount hoặc botId thay đổi
  useEffect(() => {
    fetchErrorSignals();
  }, [fetchErrorSignals]);
  
  // Xử lý đánh dấu lỗi đã đọc
  const handleMarkAsRead = (signalId: string) => {
    setUnreadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(signalId);
      return newSet;
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Signals</CardTitle>
        <CardDescription>
          Signals that failed to process due to errors. Requires attention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ErrorSignalsTable 
          errorSignals={errorSignals}
          unreadErrors={unreadErrors}
          onMarkAsRead={handleMarkAsRead}
          loading={loading}
          error={error}
          onRefresh={fetchErrorSignals}
        />
      </CardContent>
    </Card>
  );
};

export default ErrorSignals;

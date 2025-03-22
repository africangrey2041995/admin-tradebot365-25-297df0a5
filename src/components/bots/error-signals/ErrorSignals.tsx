
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorSignalsTable from './ErrorSignalsTable';
import { ExtendedSignal, ErrorSignalsProps } from './types';
import { mockErrorSignals } from './mockData';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';

const ErrorSignals: React.FC<ErrorSignalsProps> = ({ botId }) => {
  const [errorSignals, setErrorSignals] = useState<ExtendedSignal[]>([]);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { navigateToBotDetail } = useNavigation();
  
  // Fetch error signals
  const fetchErrorSignals = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Giả lập API call với timeout
      setTimeout(() => {
        try {
          // Lọc dữ liệu mẫu để phù hợp với bot ID
          const signals = mockErrorSignals.filter(signal => 
            !botId || signal.botId === botId
          );
          
          setErrorSignals(signals);
          
          // Đặt tất cả lỗi là chưa đọc
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
          setError(innerError instanceof Error ? innerError : new Error('Unknown error processing signals'));
          setLoading(false);
          toast.error('Đã xảy ra lỗi khi xử lý tín hiệu lỗi');
        }
      }, 800);
    } catch (err) {
      console.error('Error fetching error signals:', err);
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      setLoading(false);
      toast.error('Đã xảy ra lỗi khi tải tín hiệu lỗi');
    }
  }, [botId]);
  
  // Load data khi component mount hoặc botId thay đổi
  useEffect(() => {
    fetchErrorSignals();
  }, [fetchErrorSignals]);
  
  // Xử lý đánh dấu lỗi đã đọc
  const handleMarkAsRead = (signalId: string) => {
    try {
      setUnreadErrors(prev => {
        const newSet = new Set(prev);
        newSet.delete(signalId);
        return newSet;
      });
      toast.success('Đã đánh dấu tín hiệu lỗi là đã đọc');
    } catch (err) {
      console.error('Error marking signal as read:', err);
      toast.error('Đã xảy ra lỗi khi đánh dấu tín hiệu lỗi là đã đọc');
    }
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

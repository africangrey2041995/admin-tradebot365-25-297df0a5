
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorSignalsTable from './error-signals/ErrorSignalsTable';
import { ExtendedSignal } from '@/types';
import { ErrorSignalsProps } from './error-signals/types';
import { mockErrorSignals } from './error-signals/mockData';
import { toast } from 'sonner';
import ErrorBoundary from '@/components/common/ErrorBoundary';

interface EnhancedErrorSignalsProps extends ErrorSignalsProps {
  userId: string; // Add userId prop
}

const ErrorSignals: React.FC<EnhancedErrorSignalsProps> = ({ botId, userId }) => {
  const [errorSignals, setErrorSignals] = useState<ExtendedSignal[]>([]);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch error signals with improved error handling
  const fetchErrorSignals = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      setTimeout(() => {
        try {
          // Filter mock data to match bot ID AND userId
          const signals = mockErrorSignals.filter(signal => 
            (!botId || signal.botId === botId) && 
            signal.userId === userId // Add user filtering
          );
          
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
  
  // Load data when component mounts or botId/userId changes
  useEffect(() => {
    fetchErrorSignals();
  }, [fetchErrorSignals]);
  
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
  
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default ErrorSignals;

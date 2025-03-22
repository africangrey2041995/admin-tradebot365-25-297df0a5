
import React, { useState, useEffect } from 'react';
import { ErrorSignalsProps } from './error-signals/types';
import ErrorSignalsTable from './error-signals/ErrorSignalsTable';
import { mockErrorSignals } from './error-signals/mockData';
import { ExtendedSignal } from '@/types';

const ErrorSignals: React.FC<ErrorSignalsProps> = ({ botId }) => {
  const [errorSignals, setErrorSignals] = useState<ExtendedSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Mock data loading
    const fetchErrorSignals = () => {
      setLoading(true);
      setTimeout(() => {
        // Get mock data based on bot type
        const mockData = mockErrorSignals.filter(signal => 
          !botId || signal.botId === botId
        );
        
        setErrorSignals(mockData);
        
        // Set the first 2 errors as unread for demonstration
        const newUnreadSet = new Set<string>();
        mockData.slice(0, 2).forEach(signal => {
          if (signal.id) {
            newUnreadSet.add(signal.id);
          }
        });
        setUnreadErrors(newUnreadSet);
        
        setLoading(false);
      }, 800);
    };

    fetchErrorSignals();
  }, [botId]);

  const markAsRead = (signalId: string) => {
    setUnreadErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(signalId);
      return newSet;
    });
  };

  return (
    <ErrorSignalsTable 
      errorSignals={errorSignals} 
      unreadErrors={unreadErrors} 
      onMarkAsRead={markAsRead}
      loading={loading}
    />
  );
};

export default ErrorSignals;

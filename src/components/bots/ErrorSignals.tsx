
import React, { useState, useEffect } from 'react';
import { ErrorSignalsProps } from './error-signals/types';
import ErrorSignalsTable from './error-signals/ErrorSignalsTable';
import { getMockErrorSignals } from './error-signals/mockData';

const ErrorSignals: React.FC<ErrorSignalsProps> = ({ botId }) => {
  const [errorSignals, setErrorSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadErrors, setUnreadErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Mock data loading
    const fetchErrorSignals = () => {
      setLoading(true);
      setTimeout(() => {
        // Get mock data based on bot type
        const mockErrorSignals = getMockErrorSignals(botId);
        
        setErrorSignals(mockErrorSignals);
        
        // Set the first 2 errors as unread for demonstration
        const newUnreadSet = new Set<string>();
        mockErrorSignals.slice(0, 2).forEach(signal => {
          newUnreadSet.add(signal.id);
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

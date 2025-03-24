
import React, { useState, useEffect } from 'react';
import { mockErrorSignals } from './error-signals/mockData';
import ErrorSignalsTable from './error-signals/ErrorSignalsTable';
import NoErrorsState from './error-signals/NoErrorsState';
import { ExtendedSignal } from '@/types';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { BotType } from '@/constants/botTypes';

interface ErrorSignalsProps {
  limit?: number;
  userId?: string;
  botType?: BotType;
}

const ErrorSignals: React.FC<ErrorSignalsProps> = ({ 
  limit = 10,
  userId,
  botType
}) => {
  const [signals, setSignals] = useState<ExtendedSignal[]>([]);
  const [unreadSignals, setUnreadSignals] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  
  // Initialize unread signals on component mount
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      // Filter signals based on userId and botType
      const filteredSignals = mockErrorSignals.filter(signal => {
        // If userId is provided, only show signals for that user
        const userIdMatch = !userId || signal.userId === userId || normalizeUserId(signal.userId) === normalizeUserId(userId);
        
        // If botType is provided, only show signals for that bot type
        const botTypeMatch = !botType || signal.botType === botType;
        
        // Log for debugging
        console.info(`ErrorSignals - Signal ${signal.id}: userId match: ${userIdMatch}, botType match: ${botTypeMatch}`);
        
        return userIdMatch && botTypeMatch;
      });
      
      // Log the filtered count
      console.info(`ErrorSignals - Filtered ${filteredSignals.length} signals for userId: ${userId || 'any'} and botType: ${botType || 'any'}`);
      
      // Set all signals as unread initially
      const initialUnreadSet = new Set(filteredSignals.map(signal => signal.id));
      
      setSignals(filteredSignals.slice(0, limit));
      setUnreadSignals(initialUnreadSet);
      setLoading(false);
    }, 800);
  }, [limit, userId, botType]);
  
  const handleMarkAsRead = (signalId: string) => {
    const newUnreadSet = new Set(unreadSignals);
    newUnreadSet.delete(signalId);
    setUnreadSignals(newUnreadSet);
  };
  
  const handleMarkAllAsRead = () => {
    setUnreadSignals(new Set());
  };
  
  if (!loading && signals.length === 0) {
    return <NoErrorsState />;
  }
  
  return (
    <ErrorSignalsTable 
      signals={signals} 
      unreadSignals={unreadSignals} 
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      loading={loading}
    />
  );
};

export default ErrorSignals;

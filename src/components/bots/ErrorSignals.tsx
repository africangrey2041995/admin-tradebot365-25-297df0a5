import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorSignalsTable from './error-signals/ErrorSignalsTable';
import NoErrorsState from './error-signals/NoErrorsState';
import { ExtendedSignal } from '@/types/signal';
import { normalizeUserId } from '@/utils/normalizeUserId';
import { BotType } from '@/constants/botTypes';
import { useAdmin } from '@/hooks/use-admin';
import { mockErrorSignals } from './error-signals/mockData';
import { useUser } from '@clerk/clerk-react';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from 'sonner';
import ErrorBoundary from '@/components/common/ErrorBoundary';

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
  const { isAdmin } = useAdmin();
  const { user } = useUser();
  const { navigateToBotDetail } = useNavigation();
  const [error, setError] = useState<Error | null>(null);
  
  // Initialize unread signals on component mount
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    
    setTimeout(() => {
      // Filter signals based on userId, botType, and admin status
      const filteredSignals = mockErrorSignals.filter(signal => {
        // If userId is provided, only show signals for that user
        const userIdMatch = !userId || signal.userId === userId || normalizeUserId(signal.userId) === normalizeUserId(userId);
        
        // If botType is provided, only show signals for that bot type
        const botTypeMatch = !botType || signal.botType === botType;
        
        // Check if this is an admin-only signal (ADMIN-001)
        const isAdminOnlySignal = signal.userId === 'ADMIN-001';
        
        // Include admin signals only for admin users
        const includeBasedOnAdminStatus = !isAdminOnlySignal || isAdmin;
        
        // Log for debugging
        console.info(`ErrorSignals - Signal ${signal.id}: userId match: ${userIdMatch}, botType match: ${botTypeMatch}, adminOnly: ${isAdminOnlySignal}, include: ${includeBasedOnAdminStatus}`);
        
        return userIdMatch && botTypeMatch && includeBasedOnAdminStatus;
      });
      
      // Log the filtered count
      console.info(`ErrorSignals - Filtered ${filteredSignals.length} signals for userId: ${userId || 'any'} and botType: ${botType || 'any'}`);
      
      // Set all signals as unread initially
      const initialUnreadSet = new Set(filteredSignals.map(signal => signal.id));
      
      setSignals(filteredSignals.slice(0, limit));
      setUnreadSignals(initialUnreadSet);
      setLoading(false);
    }, 800);
  }, [limit, userId, botType, isAdmin]);
  
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
      errorSignals={signals} 
      unreadErrors={unreadSignals} 
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      loading={loading}
    />
  );
};

export default ErrorSignals;

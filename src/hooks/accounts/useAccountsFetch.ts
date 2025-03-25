
import { useState, useCallback, useEffect } from 'react';
import { Account } from '@/types';
import { mockAccounts } from '@/mocks/accountsMock';

/**
 * Hook for fetching account data
 * @param initialData Optional initial data to use
 * @returns Object with loading state, errors, and fetch function
 */
export const useAccountsFetch = (initialData: Account[] = []) => {
  const [accounts, setAccounts] = useState<Account[]>(initialData.length > 0 ? initialData : []);
  const [loading, setLoading] = useState(initialData.length === 0);
  const [error, setError] = useState<Error | null>(null);

  // Fetch accounts data (currently mocked)
  const fetchAccounts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // In a real app, this would be an API call
        setAccounts(mockAccounts);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    }, 800);
  }, []);

  // Initial fetch if no initialData was provided
  useEffect(() => {
    if (initialData.length === 0) {
      fetchAccounts();
    }
  }, [fetchAccounts, initialData.length]);

  return {
    accounts,
    setAccounts,
    loading,
    error,
    fetchAccounts,
    refresh: fetchAccounts // Alias for fetchAccounts for clarity
  };
};

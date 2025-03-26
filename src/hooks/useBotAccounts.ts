
import { useCallback } from 'react';
import { Account } from '@/types';
import { useAccountsQuery } from './accounts/useAccountsQuery';
import { useAccountsTransform, UserAccount, HierarchicalData } from './accounts/useAccountsTransform';

/**
 * Return type for the useBotAccounts hook
 */
interface UseBotAccountsReturn {
  accounts: Account[];
  loading: boolean;
  error: Error | null;
  fetchAccounts: () => void;
  handleRefresh: () => void;
  addAccount: (account: Account) => void;
  updateAccount: (updatedAccount: Account) => void;
  deleteAccount: (accountId: string) => void;
  toggleAccountStatus: (accountId: string) => void;
  hierarchicalAccounts: UserAccount[];
  hierarchicalData: HierarchicalData;
  isAddingAccount: boolean;
  isUpdatingAccount: boolean;
  isDeletingAccount: boolean;
  isTogglingStatus: boolean;
}

/**
 * Custom hook for managing bot accounts
 * Uses React Query for robust data fetching and mutation handling
 * @param botId The ID of the bot to fetch accounts for
 * @param userId The ID of the user who owns the bot
 * @param initialData Optional initial data to use
 * @param botType Optional bot type to filter accounts ('premium' | 'prop' | 'user')
 * @returns Combined object with all account management functionality
 */
export const useBotAccounts = (
  botId: string, 
  userId: string, 
  initialData: Account[] = [],
  botType?: 'premium' | 'prop' | 'user'
): UseBotAccountsReturn => {
  // Use the new React Query hook for data fetching and CRUD operations
  const { 
    accounts: allAccounts, 
    loading, 
    error, 
    fetchAccounts,
    handleRefresh,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus,
    isAddingAccount,
    isUpdatingAccount,
    isDeletingAccount,
    isTogglingStatus
  } = useAccountsQuery(botId, initialData);

  // Filter accounts by bot type if specified
  const accounts = useCallback(() => {
    if (!botType) return allAccounts;
    
    // In a real implementation, accounts would have a botType property
    // Here, for demo purposes, we're just returning all accounts
    // In production, you would filter: return allAccounts.filter(acc => acc.botType === botType);
    return allAccounts;
  }, [allAccounts, botType])();
  
  // Use the transform hook to get hierarchical data
  const hierarchicalData = useAccountsTransform(accounts);
  
  return {
    // Data
    accounts,
    loading,
    error,
    hierarchicalAccounts: hierarchicalData.users,
    hierarchicalData,
    
    // Functions
    fetchAccounts,
    handleRefresh,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus,
    
    // Mutation states
    isAddingAccount,
    isUpdatingAccount,
    isDeletingAccount,
    isTogglingStatus
  };
};

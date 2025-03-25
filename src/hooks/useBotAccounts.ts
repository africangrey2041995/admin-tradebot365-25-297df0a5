
import { useCallback } from 'react';
import { Account } from '@/types';
import { useAccountsFetch } from './accounts/useAccountsFetch';
import { useAccountsCrud } from './accounts/useAccountsCrud';
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
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  hierarchicalAccounts: UserAccount[];
  hierarchicalData: HierarchicalData;
}

/**
 * Custom hook for managing bot accounts
 * Combines fetching, CRUD operations, and data transformation
 * @param botId The ID of the bot to fetch accounts for
 * @param userId The ID of the user who owns the bot
 * @param initialData Optional initial data to use
 * @returns Combined object with all account management functionality
 */
export const useBotAccounts = (
  botId: string, 
  userId: string, 
  initialData: Account[] = []
): UseBotAccountsReturn => {
  // Use the fetch hook for loading and error states
  const { 
    accounts, 
    setAccounts, 
    loading, 
    error, 
    fetchAccounts, 
    refresh 
  } = useAccountsFetch(initialData);
  
  // Use the CRUD hook for account operations
  const { 
    addAccount, 
    updateAccount, 
    deleteAccount, 
    toggleAccountStatus 
  } = useAccountsCrud(accounts);
  
  // Use the transform hook to get hierarchical data
  const hierarchicalData = useAccountsTransform(accounts);
  
  // Simple alias for the refresh function
  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);
  
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
    setAccounts
  };
};

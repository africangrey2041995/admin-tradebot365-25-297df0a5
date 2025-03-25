
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Account } from '@/types';
import { mockAccounts } from '@/mocks/accountsMock';
import { toast } from 'sonner';

// Keys for React Query cache
export const accountsQueryKeys = {
  all: ['accounts'] as const,
  byBot: (botId: string) => [...accountsQueryKeys.all, botId] as const,
};

/**
 * Hook for fetching accounts data using React Query
 * @param botId The bot ID to fetch accounts for
 * @param initialData Optional initial data to use
 * @returns Object with accounts data, loading state, and operations
 */
export const useAccountsQuery = (botId: string, initialData: Account[] = []) => {
  const queryClient = useQueryClient();
  const queryKey = accountsQueryKeys.byBot(botId);

  // Mock API function - replace with real API in production
  const fetchAccountsFromAPI = async (): Promise<Account[]> => {
    // Simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Fetching accounts for bot ${botId}`);
        resolve(mockAccounts);
      }, 800);
    });
  };

  // Use React Query for data fetching with proper caching and stale data handling
  const { 
    data: accounts = initialData, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey,
    queryFn: fetchAccountsFromAPI,
    initialData: initialData.length > 0 ? initialData : undefined,
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep unused data in cache for 5 minutes
  });

  // Mutation for adding a new account
  const addAccountMutation = useMutation({
    mutationFn: async (newAccount: Account) => {
      // Simulate API call - replace with real API in production
      return new Promise<Account>((resolve) => {
        setTimeout(() => {
          resolve(newAccount);
        }, 500);
      });
    },
    onSuccess: (newAccount) => {
      // Update the query cache with the new account
      queryClient.setQueryData(queryKey, (oldData: Account[] = []) => [...oldData, newAccount]);
      toast.success('Tài khoản đã được thêm thành công');
    },
    onError: (error) => {
      console.error('Error adding account:', error);
      toast.error('Không thể thêm tài khoản. Vui lòng thử lại sau.');
    },
  });

  // Mutation for updating an account
  const updateAccountMutation = useMutation({
    mutationFn: async (updatedAccount: Account) => {
      // Simulate API call - replace with real API in production
      return new Promise<Account>((resolve) => {
        setTimeout(() => {
          resolve(updatedAccount);
        }, 500);
      });
    },
    onSuccess: (updatedAccount) => {
      // Update the query cache with the updated account
      queryClient.setQueryData(queryKey, (oldData: Account[] = []) => 
        oldData.map(acc => acc.cspAccountId === updatedAccount.cspAccountId ? updatedAccount : acc)
      );
      toast.success('Tài khoản đã được cập nhật');
    },
    onError: (error) => {
      console.error('Error updating account:', error);
      toast.error('Không thể cập nhật tài khoản. Vui lòng thử lại sau.');
    },
  });

  // Mutation for deleting an account
  const deleteAccountMutation = useMutation({
    mutationFn: async (accountId: string) => {
      // Simulate API call - replace with real API in production
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(accountId);
        }, 500);
      });
    },
    onSuccess: (accountId) => {
      // Update the query cache by removing the deleted account
      queryClient.setQueryData(queryKey, (oldData: Account[] = []) => 
        oldData.filter(acc => acc.cspAccountId !== accountId)
      );
      toast.success('Tài khoản đã được xóa');
    },
    onError: (error) => {
      console.error('Error deleting account:', error);
      toast.error('Không thể xóa tài khoản. Vui lòng thử lại sau.');
    },
  });

  // Mutation for toggling account status
  const toggleAccountStatusMutation = useMutation({
    mutationFn: async (accountId: string) => {
      // Find the current account to get its status
      const currentAccount = accounts.find(acc => acc.cspAccountId === accountId);
      if (!currentAccount) throw new Error('Account not found');
      
      const newStatus = currentAccount.status === 'Connected' ? 'Disconnected' : 'Connected';
      
      // Simulate API call - replace with real API in production
      return new Promise<{accountId: string, newStatus: string}>((resolve) => {
        setTimeout(() => {
          resolve({accountId, newStatus});
        }, 500);
      });
    },
    onSuccess: ({accountId, newStatus}) => {
      // Update the query cache with the toggled status
      queryClient.setQueryData(queryKey, (oldData: Account[] = []) => 
        oldData.map(acc => acc.cspAccountId === accountId 
          ? {...acc, status: newStatus} 
          : acc
        )
      );
      
      const actionText = newStatus === 'Connected' ? 'kết nối' : 'ngắt kết nối';
      toast.success(`Tài khoản đã được ${actionText}`);
    },
    onError: (error) => {
      console.error('Error toggling account status:', error);
      toast.error('Không thể thay đổi trạng thái tài khoản. Vui lòng thử lại sau.');
    },
  });

  return {
    // Data
    accounts,
    loading: isLoading,
    error: error as Error | null,
    
    // Functions
    fetchAccounts: refetch,
    handleRefresh: refetch,
    
    // Mutations
    addAccount: (account: Account) => addAccountMutation.mutate(account),
    updateAccount: (account: Account) => updateAccountMutation.mutate(account),
    deleteAccount: (accountId: string) => deleteAccountMutation.mutate(accountId),
    toggleAccountStatus: (accountId: string) => toggleAccountStatusMutation.mutate(accountId),
    
    // Mutation states
    isAddingAccount: addAccountMutation.isPending,
    isUpdatingAccount: updateAccountMutation.isPending,
    isDeletingAccount: deleteAccountMutation.isPending,
    isTogglingStatus: toggleAccountStatusMutation.isPending,
  };
};

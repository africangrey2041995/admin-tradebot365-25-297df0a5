
import { useState, useCallback } from 'react';
import { Account } from '@/types';
import { toast } from 'sonner';

/**
 * Hook for managing account CRUD operations
 * @param initialAccounts Initial array of accounts
 * @returns Object with accounts state and CRUD operations
 */
export const useAccountsCrud = (initialAccounts: Account[] = []) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  // Add a new account
  const addAccount = useCallback((account: Account) => {
    setAccounts(prev => [...prev, account]);
    toast.success('Tài khoản đã được thêm thành công');
  }, []);

  // Update an existing account
  const updateAccount = useCallback((updatedAccount: Account) => {
    setAccounts(prev => 
      prev.map(acc => acc.cspAccountId === updatedAccount.cspAccountId ? updatedAccount : acc)
    );
    toast.success('Tài khoản đã được cập nhật');
  }, []);

  // Delete an account
  const deleteAccount = useCallback((accountId: string) => {
    setAccounts(prev => prev.filter(acc => acc.cspAccountId !== accountId));
    toast.success('Tài khoản đã được xóa');
  }, []);

  // Toggle account connection status
  const toggleAccountStatus = useCallback((accountId: string) => {
    setAccounts(prev => 
      prev.map(acc => {
        if (acc.cspAccountId === accountId) {
          const newStatus = acc.status === 'Connected' ? 'Disconnected' : 'Connected';
          return { ...acc, status: newStatus };
        }
        return acc;
      })
    );
    
    const account = accounts.find(acc => acc.cspAccountId === accountId);
    const actionText = account?.status === 'Connected' ? 'ngắt kết nối' : 'kết nối';
    toast.success(`Tài khoản đã được ${actionText}`);
  }, [accounts]);

  return {
    accounts,
    setAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    toggleAccountStatus
  };
};

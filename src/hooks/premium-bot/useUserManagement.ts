
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { Account } from '@/types';
import { useBotAccounts } from '@/hooks/useBotAccounts';

export const useUserManagement = (botId: string, userId: string) => {
  const {
    accounts,
    handleRefresh: refreshAccounts,
    updateAccount,
    deleteAccount,
    toggleAccountStatus
  } = useBotAccounts(botId, userId);

  // Calculate statistics
  const uniqueUsers = (() => {
    const userIds = new Set(accounts.map(account => account.cspUserId));
    return userIds.size;
  })();
  
  const uniqueCSPAccounts = (() => {
    const cspIds = new Set(accounts.map(account => account.cspAccountId));
    return cspIds.size;
  })();

  const tradingAccountsCount = accounts.length;
  
  // Account management handlers
  const handleEditAccount = useCallback((account: Account) => {
    console.log("Edit account:", account);
    toast.info(`Editing account: ${account.cspAccountName}`);
    updateAccount(account);
  }, [updateAccount]);
  
  const handleDeleteAccount = useCallback((accountId: string) => {
    console.log("Delete account:", accountId);
    toast.info(`Deleting account: ${accountId}`);
    deleteAccount(accountId);
  }, [deleteAccount]);
  
  const handleToggleConnection = useCallback((accountId: string) => {
    console.log("Toggle connection:", accountId);
    toggleAccountStatus(accountId);
  }, [toggleAccountStatus]);

  return {
    accounts,
    uniqueUsers,
    uniqueCSPAccounts,
    tradingAccountsCount,
    refreshAccounts,
    handleEditAccount,
    handleDeleteAccount,
    handleToggleConnection
  };
};

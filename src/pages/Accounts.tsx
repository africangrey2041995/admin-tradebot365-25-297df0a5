
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Account } from '@/types';
import AccountCard from '@/components/accounts/AccountCard';
import EditAccountDialog from '@/components/accounts/EditAccountDialog';
import AccountsHeader from '@/components/accounts/AccountsHeader';
import AccountsList from '@/components/accounts/AccountsList';
import useAccounts from '@/hooks/useAccounts';
import AddAccountDialog from '@/components/accounts/AddAccountDialog';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  
  const { 
    accounts, 
    addAccount, 
    updateAccount, 
    deleteAccount, 
    reconnectAccount 
  } = useAccounts();

  const filteredAccounts = accounts.filter(account => 
    account.cspAccountName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.ctidTraderAccountId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAccount = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditAccount = (clientId: string) => {
    const account = accounts.find(a => a.clientId === clientId);
    if (account) {
      setSelectedAccount(account);
      setIsEditDialogOpen(true);
    }
  };

  const handleSaveEditedAccount = (updatedAccount: Partial<Account>) => {
    if (!selectedAccount) return;
    updateAccount(selectedAccount.clientId || '', updatedAccount);
  };

  const handleDeleteAccount = (clientId: string) => {
    deleteAccount(clientId);
  };

  const handleReconnect = (clientId: string) => {
    reconnectAccount(clientId);
  };

  return (
    <MainLayout title="Quản Lý Tài Khoản">
      <AccountsHeader 
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onAddAccount={handleAddAccount}
      />

      <AccountsList 
        accounts={filteredAccounts}
        onEdit={handleEditAccount}
        onDelete={handleDeleteAccount}
        onReconnect={handleReconnect}
      />

      <AddAccountDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddAccount={addAccount}
      />

      <EditAccountDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        account={selectedAccount}
        onSave={handleSaveEditedAccount}
      />
    </MainLayout>
  );
};

export default Accounts;

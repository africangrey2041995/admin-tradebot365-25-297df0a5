
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '@/hooks/admin/useUsers';
import { useBotAccounts } from '@/hooks/useBotAccounts';
import { UsersManagement } from '@/components/admin/users/UsersManagement';
import { AccountsStatsSection } from '@/components/admin/users/AccountsStatsSection';

const Users = () => {
  const navigate = useNavigate();
  const { users, totalUsers } = useUsers();

  const { 
    accounts, 
    hierarchicalData,
    loading: accountsLoading,
    handleRefresh
  } = useBotAccounts('all', 'all');
  
  const connectedAccounts = accounts.filter(acc => acc.status === 'connected').length;
  const disconnectedAccounts = accounts.length - connectedAccounts;
  const liveAccounts = accounts.filter(acc => acc.isLive).length;
  const demoAccounts = accounts.length - liveAccounts;

  const viewUserDetail = (userId: string) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleAddUser = () => {
    console.log("Add user clicked");
  };

  return (
    <div className="container mx-auto py-10">
      <AccountsStatsSection 
        hierarchicalData={hierarchicalData}
        connectedAccounts={connectedAccounts}
        disconnectedAccounts={disconnectedAccounts}
        liveAccounts={liveAccounts}
        demoAccounts={demoAccounts}
        onRefresh={handleRefresh}
      />
      
      <UsersManagement 
        onViewUserDetail={viewUserDetail}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Users;

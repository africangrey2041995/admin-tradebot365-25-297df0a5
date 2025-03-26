
import React from 'react';
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import AccountsStatsCards from '@/components/admin/accounts/AccountsStatsCards';
import { HierarchicalData } from '@/hooks/accounts/useAccountsTransform';

interface AccountsStatsSectionProps {
  hierarchicalData: HierarchicalData;
  connectedAccounts: number;
  disconnectedAccounts: number;
  liveAccounts: number;
  demoAccounts: number;
  onRefresh: () => void;
}

export const AccountsStatsSection: React.FC<AccountsStatsSectionProps> = ({
  hierarchicalData,
  connectedAccounts,
  disconnectedAccounts,
  liveAccounts,
  demoAccounts,
  onRefresh
}) => {
  const handleRefresh = () => {
    onRefresh();
    toast.success("Đã làm mới dữ liệu thống kê");
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Thống kê tài khoản</h2>
        <button 
          className="flex items-center text-sm text-indigo-400 hover:text-indigo-300"
          onClick={handleRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Làm mới thống kê
        </button>
      </div>
      
      <AccountsStatsCards 
        data={hierarchicalData}
        connectedAccounts={connectedAccounts}
        disconnectedAccounts={disconnectedAccounts}
        liveAccounts={liveAccounts}
        demoAccounts={demoAccounts}
      />
    </div>
  );
};

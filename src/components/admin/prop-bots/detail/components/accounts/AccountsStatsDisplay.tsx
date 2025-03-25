
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { AccountsCount } from '../../types/account-types';

interface AccountsStatsDisplayProps {
  counts: AccountsCount;
  onRefresh: () => void;
}

const AccountsStatsDisplay: React.FC<AccountsStatsDisplayProps> = ({ counts, onRefresh }) => {
  return (
    <div className="flex gap-2">
      <div className="text-sm">
        <span className="text-gray-500 mr-1">Users:</span>
        <span className="font-medium">{counts.totalUsers}</span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-gray-500 mr-1">CSP Accounts:</span>
        <span className="font-medium">{counts.totalCSP}</span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-gray-500 mr-1">Trading Accounts:</span>
        <span className="font-medium">{counts.totalTrading}</span>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh}
      >
        <RefreshCw className="h-4 w-4 mr-1" /> Refresh
      </Button>
    </div>
  );
};

export default AccountsStatsDisplay;

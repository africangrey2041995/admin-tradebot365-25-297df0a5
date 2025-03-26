
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Database, Wallet } from "lucide-react";
import { HierarchicalData } from '@/hooks/accounts/useAccountsTransform';

interface AccountsStatsCardsProps {
  data: HierarchicalData;
  connectedAccounts?: number;
  disconnectedAccounts?: number;
  liveAccounts?: number;
  demoAccounts?: number;
}

export const AccountsStatsCards: React.FC<AccountsStatsCardsProps> = ({ 
  data,
  connectedAccounts = 0,
  disconnectedAccounts = 0,
  liveAccounts = 0,
  demoAccounts = 0
}) => {
  const { totalUsers, totalCSPAccounts, totalTradingAccounts } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Users Card */}
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">Tổng số người dùng</p>
              <h3 className="text-3xl font-bold text-white">{totalUsers}</h3>
            </div>
            <div className="bg-indigo-900/30 p-3 rounded-lg">
              <Users className="h-6 w-6 text-indigo-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSP Accounts Card */}
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">Tổng CSP Accounts</p>
              <h3 className="text-3xl font-bold text-white">{totalCSPAccounts}</h3>
            </div>
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <Database className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Accounts Card */}
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">Tổng Trading Accounts</p>
              <h3 className="text-3xl font-bold text-white">{totalTradingAccounts}</h3>
            </div>
            <div className="bg-blue-900/30 p-3 rounded-lg">
              <Wallet className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsStatsCards;

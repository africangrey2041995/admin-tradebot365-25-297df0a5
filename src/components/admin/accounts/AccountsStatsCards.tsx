
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Database, Wallet, CheckCircle, XCircle } from "lucide-react";
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
  
  // Calculate averages and percentages
  const avgCSPPerUser = totalUsers > 0 ? (totalCSPAccounts / totalUsers).toFixed(1) : '0';
  const avgTradingPerCSP = totalCSPAccounts > 0 ? (totalTradingAccounts / totalCSPAccounts).toFixed(1) : '0';
  const connectedPercentage = totalTradingAccounts > 0 
    ? Math.round(connectedAccounts / totalTradingAccounts * 100) 
    : 0;
  const livePercentage = totalTradingAccounts > 0 
    ? Math.round(liveAccounts / totalTradingAccounts * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Users Card */}
      <Card className="bg-zinc-900 border-zinc-800 text-white">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">Tổng số người dùng</p>
              <h3 className="text-3xl font-bold text-white">{totalUsers}</h3>
              <p className="text-zinc-400 text-sm mt-2">
                Trung bình {avgCSPPerUser} tài khoản CSP / người dùng
              </p>
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
              <p className="text-zinc-400 text-sm mt-2">
                Trung bình {avgTradingPerCSP} tài khoản giao dịch / CSP
              </p>
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
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-zinc-400 text-xs">{connectedPercentage}% kết nối</span>
                </div>
                <div className="flex items-center">
                  <Wallet className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-zinc-400 text-xs">{livePercentage}% tài khoản Live</span>
                </div>
              </div>
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

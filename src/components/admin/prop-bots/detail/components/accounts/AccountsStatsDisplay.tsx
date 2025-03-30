
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Database, CreditCard } from 'lucide-react';
import { AccountsCount } from '../../types/account-types';

interface AccountsStatsDisplayProps {
  counts: AccountsCount;
}

const AccountsStatsDisplay: React.FC<AccountsStatsDisplayProps> = ({ counts }) => {
  const statsItems = [
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      label: 'Users',
      value: counts.users || counts.totalUsers || 0,
      description: 'Unique users',
    },
    {
      icon: <Database className="h-5 w-5 text-indigo-600" />,
      label: 'CSP Accounts',
      value: counts.cspAccounts || counts.totalCSP || 0,
      description: 'Total CSP accounts',
    },
    {
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      label: 'Trading Accounts',
      value: counts.tradingAccounts || counts.totalTrading || 0,
      description: 'Connected trading accounts',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statsItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
                {item.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccountsStatsDisplay;

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import UserHierarchicalAccountsTable from './accounts/UserHierarchicalAccountsTable';
import { Account } from '@/types';
import { CoinstratSignal } from '@/types/signal';

interface UserBotDetailTabsProps {
  botId: string;
  userId: string;
  onRefresh: () => void;
  isLoading: boolean;
  accountsData: Account[];
  logsData: CoinstratSignal[];
  signalSourceLabel?: string;
  botType?: 'premium' | 'prop' | 'user';
  onAddAccount?: () => void;  // Add this prop
}

const UserBotDetailTabs: React.FC<UserBotDetailTabsProps> = ({
  botId,
  userId,
  onRefresh,
  isLoading,
  accountsData,
  logsData,
  signalSourceLabel = 'Signal Source',
  botType = 'user',
  onAddAccount  // Add this prop
}) => {
  const [activeTab, setActiveTab] = useState('accounts');

  const handleRefresh = () => {
    onRefresh();
  };

  return (
    <Tabs defaultValue="accounts" className="w-full" onValueChange={setActiveTab}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="accounts">Tài khoản</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <div className="flex space-x-2">
          {activeTab === 'accounts' && onAddAccount && (
            <Button variant="outline" size="sm" onClick={onAddAccount}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm tài khoản
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Làm mới
          </Button>
        </div>
      </div>

      <TabsContent value="accounts" className="mt-0">
        <Card>
          <CardContent className="p-6">
            <UserHierarchicalAccountsTable 
              accounts={accountsData}
              isLoading={isLoading}
              error={null}
              onRefresh={handleRefresh}
              onAddAccount={onAddAccount}
              botType={botType}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="logs" className="mt-0">
        <Card>
          <CardContent className="p-6">
            {/* Logs content goes here */}
            <div className="text-center text-gray-500 p-8">
              Logs tab content will be implemented here
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-0">
        <Card>
          <CardContent className="p-6">
            {/* Settings content goes here */}
            <div className="text-center text-gray-500 p-8">
              Settings tab content will be implemented here
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UserBotDetailTabs;

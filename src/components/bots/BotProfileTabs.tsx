
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';

interface BotProfileTabsProps {
  botId: string;
  onAddAccount: () => void;
}

const BotProfileTabs = ({ botId, onAddAccount }: BotProfileTabsProps) => {
  return (
    <Tabs defaultValue="accounts" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
        <TabsTrigger value="logs">Logs From Trading View</TabsTrigger>
        <TabsTrigger value="coinstrat">Log to Coinstrat Pro</TabsTrigger>
      </TabsList>
      
      <TabsContent value="accounts">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage accounts connected to this bot</CardDescription>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={onAddAccount}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BotAccountsTable botId={botId} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="logs">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Logs From Trading View</CardTitle>
                <CardDescription>Recent webhook messages received from TradingView</CardDescription>
              </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <TradingViewLogs botId={botId} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="coinstrat">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Log to Coinstrat Pro</CardTitle>
                <CardDescription>Signals pushed to connected accounts via Coinstrat Pro</CardDescription>
              </div>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CoinstratLogs botId={botId} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BotProfileTabs;

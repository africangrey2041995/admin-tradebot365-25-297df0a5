
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw, AlertTriangle, HelpCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import BotAccountsTable from '@/components/bots/BotAccountsTable';
import TradingViewLogs from '@/components/bots/TradingViewLogs';
import CoinstratLogs from '@/components/bots/CoinstratLogs';
import ErrorSignals from '@/components/bots/ErrorSignals';
import { Badge } from '@/components/ui/badge';

interface BotProfileTabsProps {
  botId: string;
  onAddAccount: () => void;
}

const BotProfileTabs = ({ botId, onAddAccount }: BotProfileTabsProps) => {
  const [unreadErrorCount, setUnreadErrorCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("accounts");
  
  useEffect(() => {
    // Simulate fetching unread error count
    // In a real app, this would come from an API
    const getUnreadErrorCount = () => {
      // Mock data for demonstration
      setUnreadErrorCount(3);
    };
    
    getUnreadErrorCount();
    
    // Setup periodic check for new errors
    const intervalId = setInterval(getUnreadErrorCount, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [botId]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Mark errors as read when error tab is clicked
    if (value === "errors") {
      setUnreadErrorCount(0);
    }
  };

  return (
    <Tabs 
      defaultValue="accounts" 
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full"
    >
      <TabsList className="mb-4">
        <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
        <TabsTrigger value="logs">Logs From Trading View</TabsTrigger>
        <TabsTrigger value="coinstrat">Log to Coinstrat Pro</TabsTrigger>
        <TabsTrigger 
          value="errors" 
          className="flex items-center gap-1 relative"
        >
          <AlertTriangle className="h-4 w-4 text-red-500" />
          Error Signals
          {unreadErrorCount > 0 && (
            <Badge 
              className="absolute -top-1.5 -right-1.5 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-red-500 text-white rounded-full"
            >
              {unreadErrorCount}
            </Badge>
          )}
        </TabsTrigger>
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
      
      <TabsContent value="errors">
        <Card className="border-red-200 dark:border-red-800/30 bg-red-50/20 dark:bg-red-900/10">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Error Signals to Fix
                  {unreadErrorCount > 0 && (
                    <Badge className="bg-red-500 text-white">
                      {unreadErrorCount} new
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Critical signals that require your immediate attention
                </CardDescription>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ErrorSignals botId={botId} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BotProfileTabs;

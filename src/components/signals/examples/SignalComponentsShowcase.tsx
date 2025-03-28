
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActionBadge, StatusBadge, UserStatusBadge } from '../core/badges';
import { SignalLoadingState } from '../core/components';

/**
 * Signal Components Showcase
 * 
 * Displays examples of all signal-related components in various states
 * for documentation and testing purposes.
 */
const SignalComponentsShowcase: React.FC = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Signal Components Showcase</h1>
      <p className="text-muted-foreground">
        This page demonstrates the various signal components available in the system
        with their different states and variations.
      </p>
      
      <Tabs defaultValue="badges">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="loading">Loading States</TabsTrigger>
          <TabsTrigger value="filters">Filter Components</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="space-y-6">
          {/* Status Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
              <CardDescription>
                Status badges indicate the current state of a signal or process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Sizes</h3>
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge status="Success" size="sm" />
                    <StatusBadge status="Success" size="md" />
                    <StatusBadge status="Success" size="lg" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Status Types</h3>
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge status="Success" />
                    <StatusBadge status="Failed" />
                    <StatusBadge status="Pending" />
                    <StatusBadge status="Warning" />
                    <StatusBadge status="Unknown" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">With Variations</h3>
                  <div className="flex flex-wrap gap-3">
                    <StatusBadge status="Processed" />
                    <StatusBadge status="Error" />
                    <StatusBadge status="Processing" />
                    <StatusBadge status="In Progress" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Action Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Action Badges</CardTitle>
              <CardDescription>
                Action badges represent trading actions or operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Sizes</h3>
                  <div className="flex flex-wrap gap-3">
                    <ActionBadge action="Buy" size="sm" />
                    <ActionBadge action="Buy" size="md" />
                    <ActionBadge action="Buy" size="lg" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Action Types</h3>
                  <div className="flex flex-wrap gap-3">
                    <ActionBadge action="Buy" />
                    <ActionBadge action="Sell" />
                    <ActionBadge action="Add" />
                    <ActionBadge action="Reduce" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">With Aliases</h3>
                  <div className="flex flex-wrap gap-3">
                    <ActionBadge action="Long" />
                    <ActionBadge action="Short" />
                    <ActionBadge action="Custom" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* User Status Badges */}
          <Card>
            <CardHeader>
              <CardTitle>User Status Badges</CardTitle>
              <CardDescription>
                User status badges indicate the state of a user or account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Sizes</h3>
                  <div className="flex flex-wrap gap-3">
                    <UserStatusBadge status="Active" size="sm" />
                    <UserStatusBadge status="Active" size="md" />
                    <UserStatusBadge status="Active" size="lg" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Status Types</h3>
                  <div className="flex flex-wrap gap-3">
                    <UserStatusBadge status="Active" />
                    <UserStatusBadge status="Inactive" />
                    <UserStatusBadge status="Pending" />
                    <UserStatusBadge status="Suspended" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Connection Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <UserStatusBadge status="Connected" />
                    <UserStatusBadge status="Disconnected" />
                    <UserStatusBadge status="Verifying" />
                    <UserStatusBadge status="Blocked" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loading" className="space-y-6">
          {/* Loading States */}
          <Card>
            <CardHeader>
              <CardTitle>Signal Loading States</CardTitle>
              <CardDescription>
                Loading indicators for different types of signals and bots.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">User Bot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SignalLoadingState 
                      botType="user"
                      message="Loading user signals..."
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Premium Bot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SignalLoadingState 
                      botType="premium"
                      message="Loading premium signals..."
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Prop Bot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SignalLoadingState 
                      botType="prop"
                      message="Loading prop signals..."
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">With Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SignalLoadingState 
                      showProgress={true}
                      message="Processing signals... 60%"
                    />
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Simple Mode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SignalLoadingState 
                        botType="user"
                        isSimple={true}
                        message="User"
                      />
                      <SignalLoadingState 
                        botType="premium"
                        isSimple={true}
                        message="Premium"
                      />
                      <SignalLoadingState 
                        botType="prop"
                        isSimple={true}
                        message="Prop"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="filters" className="space-y-6">
          {/* Filter Components */}
          <Card>
            <CardHeader>
              <CardTitle>Signal Filters</CardTitle>
              <CardDescription>
                Components for filtering and searching signal data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center text-muted-foreground">
                <p>Filter components examples will be added here.</p>
                <p className="text-sm">
                  For implementation examples, see <code>src/components/signals/hooks/useSignalFilters.ts</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignalComponentsShowcase;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActionBadge from '../core/badges/ActionBadge';
import StatusBadge from '../core/badges/StatusBadge';
import SignalLoadingState from '../core/components/SignalLoadingState';
import SignalErrorState from '../core/components/SignalErrorState';
import SignalPerformanceTracker from '../performance/SignalPerformanceTracker';
import AdvancedSignalFilter from '../tracking/AdvancedSignalFilter';
import { TradingViewSignal, CoinstratSignal, SignalAction } from '@/types/signal';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

/**
 * Signal Components Showcase
 * 
 * A comprehensive showcase and documentation page for all signal-related
 * components, badges, and utilities.
 * 
 * @example
 * ```tsx
 * <SignalComponentsShowcase />
 * ```
 */
const SignalComponentsShowcase: React.FC = () => {
  const [tab, setTab] = useState('badges');
  const [performanceMode, setPerformanceMode] = useState<'idle' | 'loading' | 'error'>('idle');
  
  // Mock data for examples
  const mockTradingViewSignals: TradingViewSignal[] = [
    {
      id: 'TV-1',
      action: 'ENTER_LONG' as SignalAction,
      instrument: 'BTCUSDT',
      timestamp: new Date().toISOString(),
      signalToken: 'token-123',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.1',
      status: 'Processed',
      processingTime: '250',
    },
    {
      id: 'TV-2',
      action: 'EXIT_LONG' as SignalAction,
      instrument: 'BTCUSDT',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      signalToken: 'token-123',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.1',
      status: 'Failed',
      processingTime: '150',
      errorMessage: 'Timeout occurred'
    },
    {
      id: 'TV-3',
      action: 'ENTER_SHORT' as SignalAction,
      instrument: 'ETHUSDT',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      signalToken: 'token-456',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '1.0',
      status: 'Pending',
    }
  ];
  
  const mockCoinstratSignals: CoinstratSignal[] = [
    {
      id: 'CS-1',
      originalSignalId: 'TV-1',
      action: 'ENTER_LONG' as SignalAction,
      instrument: 'BTCUSDT',
      timestamp: new Date(Date.now() - 100).toISOString(),
      signalToken: 'token-123',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.1',
      status: 'Processed',
      processedAccounts: [
        {
          accountId: 'ACC-1',
          name: 'My Trading Account',
          timestamp: new Date().toISOString(),
          status: 'success'
        }
      ],
      failedAccounts: []
    },
    {
      id: 'CS-2',
      originalSignalId: 'TV-2',
      action: 'EXIT_LONG' as SignalAction,
      instrument: 'BTCUSDT',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
      signalToken: 'token-123',
      maxLag: '5s',
      investmentType: 'crypto',
      amount: '0.1',
      status: 'Failed',
      processedAccounts: [],
      failedAccounts: [
        {
          accountId: 'ACC-1',
          name: 'My Trading Account',
          timestamp: new Date(Date.now() - 3500000).toISOString(),
          reason: 'Timeout error',
          status: 'failed'
        }
      ]
    }
  ];
  
  // Toggle performance tracker mode for demo purposes
  const togglePerformanceMode = () => {
    if (performanceMode === 'idle') setPerformanceMode('loading');
    else if (performanceMode === 'loading') setPerformanceMode('error');
    else setPerformanceMode('idle');
  };
  
  // Render mode-dependent components
  const renderPerformanceContent = () => {
    switch (performanceMode) {
      case 'loading':
        return <SignalLoadingState message="Loading performance data..." showProgress />;
      case 'error':
        return (
          <SignalErrorState 
            message="Failed to load performance data" 
            details="Network connection timeout after 30 seconds"
            onRetry={() => setPerformanceMode('idle')}
          />
        );
      default:
        return (
          <SignalPerformanceTracker 
            tradingViewSignals={mockTradingViewSignals}
            coinstratSignals={mockCoinstratSignals}
            autoUpdate={false}
          />
        );
    }
  };
  
  return (
    <div className="container py-8 space-y-6">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Signal Components</h1>
        <p className="text-muted-foreground">
          A collection of components, badges, and utilities for displaying and working with trading signals.
        </p>
      </div>
      
      <Tabs defaultValue="badges" value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="states">State Components</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Action Badges</CardTitle>
              <CardDescription>
                Display badges for signal actions like buy, sell, and close positions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Standard Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <ActionBadge action="ENTER_LONG" />
                    <ActionBadge action="ENTER_SHORT" />
                    <ActionBadge action="EXIT_LONG" />
                    <ActionBadge action="EXIT_SHORT" />
                  </div>
                  
                  <h3 className="text-sm font-medium mt-6">Alternative Naming</h3>
                  <div className="flex flex-wrap gap-2">
                    <ActionBadge action="BUY" />
                    <ActionBadge action="SELL" />
                    <ActionBadge action="LONG" />
                    <ActionBadge action="SHORT" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Size Variations</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    <ActionBadge action="ENTER_LONG" size="sm" />
                    <ActionBadge action="ENTER_LONG" />
                    <ActionBadge action="ENTER_LONG" size="lg" />
                  </div>
                  
                  <h3 className="text-sm font-medium mt-6">Icon Only</h3>
                  <div className="flex flex-wrap gap-2">
                    <ActionBadge action="ENTER_LONG" iconOnly />
                    <ActionBadge action="ENTER_SHORT" iconOnly />
                    <ActionBadge action="EXIT_LONG" iconOnly />
                    <ActionBadge action="EXIT_SHORT" iconOnly />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Status Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="Processed" />
                    <StatusBadge status="Pending" />
                    <StatusBadge status="Failed" />
                    <StatusBadge status="Sent" />
                    <StatusBadge status="Expired" />
                    <StatusBadge status="Cancelled" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Size Variations</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                    <StatusBadge status="Processed" size="sm" />
                    <StatusBadge status="Processed" />
                    <StatusBadge status="Processed" size="lg" />
                  </div>
                  
                  <h3 className="text-sm font-medium mt-6">Icon Only</h3>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="Processed" iconOnly />
                    <StatusBadge status="Pending" iconOnly />
                    <StatusBadge status="Failed" iconOnly />
                    <StatusBadge status="Sent" iconOnly />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Usage Example</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm overflow-auto">
{`import { ActionBadge, StatusBadge } from '@/components/signals';

// In your component
return (
  <div className="space-x-2">
    <ActionBadge action="ENTER_LONG" />
    <StatusBadge status="Processed" />
  </div>
);`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* States Tab */}
        <TabsContent value="states" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>
                Visual indicators for loading and processing states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Default Loading</h3>
                  <SignalLoadingState />
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">With Progress</h3>
                  <SignalLoadingState 
                    message="Processing signals..." 
                    showProgress 
                    progressValue={65} 
                    isDeterminate
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">User Bot</h3>
                  <SignalLoadingState 
                    message="Loading user signals..." 
                    botType="user" 
                  />
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Premium Bot</h3>
                  <SignalLoadingState 
                    message="Loading premium signals..." 
                    botType="premium" 
                  />
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-3">Prop Bot</h3>
                  <SignalLoadingState 
                    message="Loading prop signals..." 
                    botType="prop" 
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Error States</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-3">Basic Error</h4>
                    <SignalErrorState />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-3">With Technical Details</h4>
                    <SignalErrorState 
                      message="Failed to fetch signal data" 
                      details="Network connection error (ETIMEDOUT)" 
                      error={new Error("Request timed out after 30 seconds")}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Usage Example</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm overflow-auto">
{`import { SignalLoadingState, SignalErrorState } from '@/components/signals';

// In your component
if (isLoading) {
  return <SignalLoadingState message="Loading signal data..." />;
}

if (error) {
  return (
    <SignalErrorState 
      message="Failed to load signals" 
      error={error}
      onRetry={refetchData} 
    />
  );
}

// Render your content...`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Filters Tab */}
        <TabsContent value="filters" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Signal Filters</CardTitle>
              <CardDescription>
                Filter components for signal data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-3">Advanced Signal Filter</h3>
                <AdvancedSignalFilter 
                  onFilterChange={(filters) => console.log("Filters changed:", filters)}
                  availableUsers={[
                    { id: 'USR-001', name: 'John Doe' },
                    { id: 'USR-002', name: 'Jane Smith' }
                  ]}
                  showExport
                  exportComponent={
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                  }
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Usage Example</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm overflow-auto">
{`import { useState } from 'react';
import { AdvancedSignalFilter, SignalFilters } from '@/components/signals';

// In your component
const [filters, setFilters] = useState<SignalFilters>({
  search: '',
  status: 'all',
  signalSource: 'all'
});

const handleFilterChange = (newFilters: SignalFilters) => {
  setFilters(newFilters);
  // Apply filters to your data...
};

return (
  <AdvancedSignalFilter 
    onFilterChange={handleFilterChange}
    availableUsers={users}
    showExport={true}
    exportComponent={<ExportButton />}
  />
);`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Tracking</CardTitle>
                <CardDescription>
                  Components for monitoring signal processing performance
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={togglePerformanceMode}
              >
                <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                Toggle State
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                {renderPerformanceContent()}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Usage Example</h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
                  <pre className="text-sm overflow-auto">
{`import { SignalPerformanceTracker } from '@/components/signals';

// In your component
return (
  <SignalPerformanceTracker
    tradingViewSignals={tvSignals}
    coinstratSignals={csSignals}
    updateInterval={60000} // Update every minute
    autoUpdate={true}
  />
);`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignalComponentsShowcase;

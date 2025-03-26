
import React from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import UnifiedSignalView from '@/components/bots/trading-view-logs/UnifiedSignalView';
import AdvancedSignalFilter from '@/components/bots/trading-view-logs/AdvancedSignalFilter';
import ExportDataDropdown from '@/components/admin/prop-bots/detail/ExportDataDropdown';
import { TradingViewSignal, CoinstratSignal } from '@/types/signal';

interface SignalTrackingTabProps {
  botId: string | undefined;
  tradingViewLogs: TradingViewSignal[];
  coinstratLogs: CoinstratSignal[];
  isLoading: boolean;
  availableUsers: string[];
  onRefresh: () => void;
}

const SignalTrackingTab: React.FC<SignalTrackingTabProps> = ({
  botId,
  tradingViewLogs,
  coinstratLogs,
  isLoading,
  availableUsers,
  onRefresh
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <CardTitle className="mb-2">Signal Tracking</CardTitle>
            <CardDescription>
              Theo dõi hành trình tín hiệu từ TradingView đến các tài khoản giao dịch trên Coinstrat Pro
            </CardDescription>
          </div>
          <Button 
            onClick={onRefresh} 
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? "Đang làm mới..." : "Làm mới"}
          </Button>
        </div>
        
        {/* Advanced filtering for signals */}
        <div className="mb-6">
          <AdvancedSignalFilter 
            onFilterChange={() => {/* Handle filter changes */}} 
            availableUsers={availableUsers}
            showExport={true}
            exportComponent={
              <ExportDataDropdown 
                data={[]} 
                headers={['ID', 'Signal', 'Action', 'Timestamp', 'Status']} 
                fileName={`premium-bot-${botId}-signals`} 
              />
            }
          />
        </div>
        
        {/* Unified hierarchical signal view */}
        <UnifiedSignalView 
          tradingViewLogs={tradingViewLogs} 
          coinstratLogs={coinstratLogs} 
          onRefresh={onRefresh} 
          isLoading={isLoading} 
        />
      </CardContent>
    </Card>
  );
};

export default SignalTrackingTab;

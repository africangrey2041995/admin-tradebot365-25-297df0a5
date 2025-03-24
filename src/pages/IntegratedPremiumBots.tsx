
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import IntegratedBotsHeader from '@/components/integrated-premium-bots/IntegratedBotsHeader';
import IntegratedBotsSearch from '@/components/integrated-premium-bots/IntegratedBotsSearch';
import IntegratedBotsList from '@/components/integrated-premium-bots/IntegratedBotsList';
import { useIntegratedPremiumBots } from '@/hooks/useIntegratedPremiumBots';

const IntegratedPremiumBots = () => {
  const {
    searchTerm,
    riskFilter,
    filteredBots,
    handleSearchChange,
    handleRiskFilterChange,
    refreshData
  } = useIntegratedPremiumBots();

  return (
    <MainLayout title="Integrated Premium Bots">
      <div className="space-y-6">
        <IntegratedBotsHeader onRefresh={refreshData} />
        
        <IntegratedBotsSearch 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          riskFilter={riskFilter}
          onRiskFilterChange={handleRiskFilterChange}
        />
        
        <IntegratedBotsList bots={filteredBots} />
      </div>
    </MainLayout>
  );
};

export default IntegratedPremiumBots;

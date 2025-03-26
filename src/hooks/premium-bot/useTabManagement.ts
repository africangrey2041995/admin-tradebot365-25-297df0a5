
import { useState } from 'react';

export const useTabManagement = (initialTab = "overview") => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedPeriod, setSelectedPeriod] = useState("1m");
  const [refreshLoading, setRefreshLoading] = useState(false);
  
  const startRefresh = () => {
    setRefreshLoading(true);
  };
  
  const stopRefresh = () => {
    setRefreshLoading(false);
  };
  
  return {
    activeTab,
    setActiveTab,
    selectedPeriod,
    setSelectedPeriod,
    refreshLoading,
    startRefresh,
    stopRefresh
  };
};

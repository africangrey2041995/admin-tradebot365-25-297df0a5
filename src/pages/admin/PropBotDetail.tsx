
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminPropBot } from '@/hooks/useAdminPropBot';
import { usePropBotStats } from '@/components/admin/prop-bots/detail/usePropBotStats';
import PropBotDetailHeader from '@/components/admin/prop-bots/detail/PropBotDetailHeader';
import PropBotEnhancedTabs from '@/components/admin/prop-bots/detail/PropBotEnhancedTabs';
import PropBotInfoCard from '@/components/admin/prop-bots/detail/PropBotInfoCard';
import LoadingState from '@/components/admin/prop-bots/detail/LoadingState';
import PropBotNotFound from '@/components/admin/prop-bots/detail/PropBotNotFound';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from "sonner";
import { BotStatus } from '@/constants/botTypes';

const PropBotDetail: React.FC = () => {
  const { botId } = useParams<{ botId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const { goBack } = useNavigation();
  
  // Custom hook for fetching and managing the prop bot data
  const { 
    propBot, 
    isLoading, 
    handleRefresh, 
    handleUpdateBot, 
    handleUpdateStatus,
    connectedAccounts,
    processedSignals
  } = useAdminPropBot(botId);

  // Custom hook for generating bot stats and challenge rules
  const { botStats, botInfo, challengeRules } = usePropBotStats(propBot);

  // Fix for error 1: Wrapping goBack in a handler that accepts MouseEvent
  const handleBackClick = () => {
    goBack();
  };

  const handleEditBot = () => {
    // In a real application, this might open a dedicated edit form
    toast.info("Đang mở form chỉnh sửa bot");
  };

  const handleDeleteBot = () => {
    // In a real application, you would make an API call to delete the bot
    console.log("Deleting bot:", botId);
    
    // Navigate back to the list view
    toast.success("Bot đã được xóa thành công");
    goBack();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!propBot) {
    return <PropBotNotFound botId={botId} onBack={handleBackClick} />;
  }

  return (
    <div className="space-y-6">
      <PropBotDetailHeader 
        botName={propBot.name}
        botId={propBot.botId}
        risk={propBot.risk}
        status={propBot.status || BotStatus.ACTIVE}
        onBack={handleBackClick}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDeleteBot}
        onEdit={handleEditBot}
      />
      
      <PropBotInfoCard
        botId={propBot.botId}
        description={propBot.description || ""}
        createdDate={propBot.createdDate}
        lastUpdated={propBot.lastUpdated}
        performanceLastMonth={propBot.performanceLastMonth}
        performanceAllTime={propBot.performanceAllTime}
        propFirm={propBot.propFirm}
        exchange={propBot.exchange}
        status={propBot.status || BotStatus.ACTIVE}
        risk={propBot.risk}
        colorScheme="green"
        minCapital={propBot.minCapital}
        maxDrawdown={propBot.maxDrawdown}
        challengeDuration={propBot.challengeDuration}
        connectedAccounts={connectedAccounts}
        processedSignals={processedSignals}
        onUpdate={handleUpdateBot}
      />
      
      <PropBotEnhancedTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userId="admin" // For admin context
        botId={propBot.botId}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        propBot={propBot}
        botStats={botStats}
        botInfo={botInfo}
        challengeRules={challengeRules}
        onUpdateBot={handleUpdateBot}
      />
    </div>
  );
};

export default PropBotDetail;

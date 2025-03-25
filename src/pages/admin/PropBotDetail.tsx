
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { PropBot } from '@/types/bot';
import PropBotDetailHeader from '@/components/admin/prop-bots/detail/PropBotDetailHeader';
import PropBotEnhancedTabs from '@/components/admin/prop-bots/detail/PropBotEnhancedTabs';
import PropBotInfoCard from '@/components/admin/prop-bots/detail/PropBotInfoCard';
import LoadingState from '@/components/admin/prop-bots/detail/LoadingState';
import { useNavigation } from '@/hooks/useNavigation';
import { toast } from "sonner";
import { mockPropBots } from '@/mocks/propBotsMock';
import { BotRiskLevel, BotStatus } from '@/constants/botTypes';

const PropBotDetail: React.FC = () => {
  const { botId } = useParams<{ botId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [propBot, setPropBot] = useState<PropBot | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { goBack } = useNavigation();

  useEffect(() => {
    // In a real application, we would fetch the data from an API
    // For now, we'll use mock data and simulate a loading state
    setIsLoading(true);
    
    setTimeout(() => {
      console.log("Looking for botId:", botId);
      console.log("Available bots:", mockPropBots.map(b => b.botId));
      
      const foundBot = mockPropBots.find(bot => bot.botId === botId);
      if (foundBot) {
        console.log("Found bot:", foundBot);
        setPropBot(foundBot);
      } else {
        console.log("Bot not found");
        toast.error("Không tìm thấy bot với ID đã cung cấp");
      }
      setIsLoading(false);
    }, 800);
  }, [botId]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      const foundBot = mockPropBots.find(bot => bot.botId === botId);
      if (foundBot) {
        setPropBot(foundBot);
        toast.success("Đã làm mới dữ liệu");
      } else {
        toast.error("Không tìm thấy bot với ID đã cung cấp");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleUpdateBot = (updatedData: Partial<PropBot>) => {
    if (!propBot) return;
    
    // Update the local state
    const updatedBot = { ...propBot, ...updatedData };
    setPropBot(updatedBot);
    
    // In a real application, you would make an API call here
    console.log("Bot updated:", updatedBot);
    
    // Show success toast
    toast.success("Thông tin bot đã được cập nhật");
  };

  const handleUpdateStatus = (newStatus: BotStatus) => {
    if (!propBot) return;
    
    // Update the local state with the new status
    const updatedBot = { ...propBot, status: newStatus };
    setPropBot(updatedBot);
    
    // In a real application, you would make an API call here
    console.log("Bot status updated:", updatedBot);
  };

  const handleDeleteBot = () => {
    // In a real application, you would make an API call to delete the bot
    console.log("Deleting bot:", botId);
    
    // Navigate back to the list view
    toast.success("Bot đã được xóa thành công");
    goBack();
  };

  const handleEditBot = () => {
    // In a real application, this might open a dedicated edit form
    toast.info("Đang mở form chỉnh sửa bot");
  };

  // Fix for error 1: Wrapping goBack in a handler that accepts MouseEvent
  const handleBackClick = () => {
    goBack();
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!propBot) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold text-white mb-4">
            Không tìm thấy Prop Bot
          </h1>
          <p className="text-gray-400 mb-6">
            Bot với ID {botId} không tồn tại hoặc đã bị xóa.
          </p>
          <button 
            onClick={handleBackClick}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Quay lại
          </button>
        </div>
      </Card>
    );
  }

  // Bot stats for the overview tab
  const botStats = {
    totalTrades: 42,
    winRate: "68%",
    profitFactor: 2.4,
    sharpeRatio: 1.8,
    currentDrawdown: propBot.maxDrawdown || "2.3%",
  };

  // Bot info for the info card
  const botInfo = {
    createdDate: propBot.createdDate,
    lastUpdated: propBot.lastUpdated,
    botId: propBot.botId,
  };

  // Challenge rules for the overview tab
  const challengeRules = [
    "Đạt mục tiêu lợi nhuận tối thiểu 10% trong vòng 30 ngày",
    "Không vượt quá 5% drawdown trong bất kỳ thời điểm nào",
    "Giao dịch ít nhất 15 ngày trong tháng",
    "Không sử dụng martingale hoặc grid trading",
    "Không có lệnh mở qua đêm vào cuối tuần",
    "Duy trì lợi nhuận ổn định, không có ngày lỗ quá 2%"
  ];

  return (
    <div className="space-y-6">
      <PropBotDetailHeader 
        botName={propBot.name}
        botId={propBot.botId}
        risk={propBot.risk || BotRiskLevel.MEDIUM}
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
        risk={propBot.risk || BotRiskLevel.MEDIUM}
        colorScheme="green"
        minCapital={propBot.minCapital}
        maxDrawdown={propBot.maxDrawdown}
        challengeDuration={propBot.challengeDuration}
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

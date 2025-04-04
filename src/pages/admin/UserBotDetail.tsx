
import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useNavigation } from '@/hooks/useNavigation';
import UserBotDetailContent from './components/user-bot-detail/UserBotDetailContent';
import { useAdminBotDetail } from './hooks/useAdminBotDetail';
import { mockAccounts, mockLogs } from './components/user-bot-detail/mock-data';
import { toast } from 'sonner';
import { useBotAccounts } from '@/hooks/useBotAccounts';

const AdminUserBotDetail = () => {
  const { botId } = useParams<{ botId: string }>();
  const { goBack, navigateTo } = useNavigation();
  
  const { 
    isLoading, 
    refreshLoading, 
    bot, 
    userInfo, 
    handleRefresh 
  } = useAdminBotDetail(botId);

  // Fetch accounts with the useBotAccounts hook for real accounts data
  const { 
    accounts,
    handleRefresh: refreshAccounts
  } = useBotAccounts(
    botId || '',
    userInfo?.id || '',
    mockAccounts, // Use mockAccounts as initial data
    'user' // Bot type
  );

  const handleBackClick = () => {
    goBack();
  };

  const viewPublicBotProfile = () => {
    try {
      window.open(`/bots/${botId}`, '_blank');
    } catch (error) {
      console.error('Error opening public bot profile:', error);
      toast.error('Không thể mở trang công khai của bot');
    }
  };

  const viewUserDetails = () => {
    if (userInfo) {
      try {
        navigateTo(`/admin/users/${userInfo.id}`);
      } catch (error) {
        console.error('Error navigating to user details:', error);
        toast.error('Không thể chuyển đến trang chi tiết người dùng');
      }
    }
  };
  
  // Combined refresh function to update both bot and account data
  const handleFullRefresh = () => {
    handleRefresh();
    refreshAccounts();
  };

  return (
    <ErrorBoundary>
      <UserBotDetailContent
        botId={botId || ''}
        isLoading={isLoading}
        refreshLoading={refreshLoading}
        bot={bot}
        userInfo={userInfo}
        accounts={accounts.length > 0 ? accounts : mockAccounts} // Use real accounts if available
        logs={mockLogs}
        handleRefresh={handleFullRefresh}
        handleBackClick={handleBackClick}
        viewPublicBotProfile={viewPublicBotProfile}
        viewUserDetails={viewUserDetails}
      />
    </ErrorBoundary>
  );
};

export default AdminUserBotDetail;

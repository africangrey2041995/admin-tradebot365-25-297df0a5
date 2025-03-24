
import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { useNavigation } from '@/hooks/useNavigation';
import UserBotDetailContent from './components/user-bot-detail/UserBotDetailContent';
import { useAdminBotDetail } from './hooks/useAdminBotDetail';
import { mockAccounts, mockLogs } from './components/user-bot-detail/mock-data';
import { toast } from 'sonner';

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

  return (
    <ErrorBoundary>
      <UserBotDetailContent
        botId={botId || ''}
        isLoading={isLoading}
        refreshLoading={refreshLoading}
        bot={bot}
        userInfo={userInfo}
        accounts={mockAccounts}
        logs={mockLogs}
        handleRefresh={handleRefresh}
        handleBackClick={handleBackClick}
        viewPublicBotProfile={viewPublicBotProfile}
        viewUserDetails={viewUserDetails}
      />
    </ErrorBoundary>
  );
};

export default AdminUserBotDetail;

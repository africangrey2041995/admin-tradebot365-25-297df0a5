
import React from 'react';
import { RefreshCw, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";
import UserBotDetailTabs from '@/components/bots/UserBotDetailTabs';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { CoinstratSignal } from '@/types/signal';
import { Account } from '@/types';
import UserBotDetailHeader from '../UserBotDetailHeader';
import UserInfoCard from '../UserInfoCard';
import BotIntegrationInfo from '../BotIntegrationInfo';
import UserBotInfo from './UserBotInfo';

interface UserBotDetailContentProps {
  botId: string;
  isLoading: boolean;
  refreshLoading: boolean;
  bot: any;
  userInfo: any;
  accounts: Account[];
  logs: CoinstratSignal[];
  handleRefresh: () => void;
  handleBackClick: () => void;
  viewPublicBotProfile: () => void;
  viewUserDetails: () => void;
}

const UserBotDetailContent: React.FC<UserBotDetailContentProps> = ({
  botId,
  isLoading,
  refreshLoading,
  bot,
  userInfo,
  accounts,
  logs,
  handleRefresh,
  handleBackClick,
  viewPublicBotProfile,
  viewUserDetails
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium">Đang tải thông tin bot...</p>
        </div>
      </div>
    );
  }

  if (!bot) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Info className="h-12 w-12 text-orange-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Không Tìm Thấy Bot</h2>
          <p className="text-muted-foreground mb-6">Chúng tôi không thể tìm thấy bot bạn đang tìm kiếm.</p>
          <Button onClick={handleBackClick}>Quay Lại Danh Sách Bot</Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <UserBotDetailHeader 
          title="Chi tiết Bot Người Dùng"
          onBack={handleBackClick}
          onViewPublicProfile={viewPublicBotProfile}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <UserBotInfo bot={bot} />
          </div>
                
          <div className="lg:col-span-7">
            {userInfo && (
              <UserInfoCard 
                userInfo={userInfo}
                onViewUserDetails={viewUserDetails}
              />
            )}
          </div>
        </div>

        <BotIntegrationInfo botId={botId || ''} />

        <UserBotDetailTabs 
          botId={botId || ''}
          userId={userInfo?.id || ''}
          accountsData={accounts}
          logsData={logs}
          onRefresh={handleRefresh}
          isLoading={refreshLoading}
        />
      </div>
    </ErrorBoundary>
  );
};

export default UserBotDetailContent;

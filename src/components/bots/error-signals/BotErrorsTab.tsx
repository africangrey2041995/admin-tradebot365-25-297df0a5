
import React from 'react';
import { UserErrorDisplay } from './UserErrorDisplay';
import { BotType } from '@/constants/botTypes';
import ErrorDetailsModal from '@/components/admin/monitoring/ErrorDetailsModal';

interface BotErrorsTabProps {
  botId: string;
  userId: string;
}

const BotErrorsTab: React.FC<BotErrorsTabProps> = ({ botId, userId }) => {
  const [selectedErrorId, setSelectedErrorId] = React.useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = React.useState<boolean>(false);

  const handleViewErrorDetails = (errorId: string) => {
    setSelectedErrorId(errorId);
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
  };

  const handleResolveError = (errorId: string) => {
    console.log("Resolving error:", errorId);
    setIsErrorModalOpen(false);
    setSelectedErrorId(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Lỗi Bot</h3>
        <p className="text-sm text-muted-foreground">
          Lỗi gần đây của bot này cần được xử lý.
        </p>
      </div>

      <UserErrorDisplay 
        botType={BotType.USER_BOT} 
        userId={userId}
        onViewDetails={handleViewErrorDetails}
        specificBotId={botId}
      />

      <ErrorDetailsModal
        errorId={selectedErrorId}
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        onResolve={handleResolveError}
      />
    </div>
  );
};

export default BotErrorsTab;


import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface UserBotDetailHeaderProps {
  title: string;
  onBack: () => void;
  onViewPublicProfile: () => void;
}

const UserBotDetailHeader: React.FC<UserBotDetailHeaderProps> = ({
  title,
  onBack,
  onViewPublicProfile,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onBack}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
      <Button variant="outline" onClick={onViewPublicProfile}>
        <ExternalLink className="h-4 w-4 mr-2" />
        Xem trang người dùng
      </Button>
    </div>
  );
};

export default UserBotDetailHeader;

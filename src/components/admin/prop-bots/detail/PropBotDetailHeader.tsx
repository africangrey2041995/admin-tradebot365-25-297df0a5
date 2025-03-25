
import React from 'react';
import { ArrowLeft, Edit, Power, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BotRiskLevel, BotStatus, BOT_RISK_DISPLAY, BOT_STATUS_DISPLAY } from '@/constants/botTypes';
import { toast } from 'sonner';

interface PropBotDetailHeaderProps {
  botName: string;
  botId: string;
  risk: BotRiskLevel;
  status: BotStatus;
  onBack: () => void;
}

const PropBotDetailHeader: React.FC<PropBotDetailHeaderProps> = ({
  botName,
  botId,
  risk,
  status,
  onBack,
}) => {
  const getRiskColor = (risk: BotRiskLevel) => {
    switch (risk) {
      case BotRiskLevel.LOW: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case BotRiskLevel.MEDIUM: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case BotRiskLevel.HIGH: return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getStatusColor = (status: BotStatus) => {
    switch (status) {
      case BotStatus.ACTIVE: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case BotStatus.INACTIVE: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
      case BotStatus.MAINTENANCE: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case BotStatus.ERROR: return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case BotStatus.SUSPENDED: return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const handleEdit = () => {
    toast.info(`Chỉnh sửa Bot: ${botName}`);
  };

  const handleToggleStatus = () => {
    const newStatus = status === BotStatus.ACTIVE ? BotStatus.INACTIVE : BotStatus.ACTIVE;
    const actionText = status === BotStatus.ACTIVE ? 'vô hiệu hóa' : 'kích hoạt';
    toast.success(`Đã ${actionText} bot: ${botName}`);
  };

  const handleDelete = () => {
    toast.warning(`Xóa Bot: ${botName}`, {
      description: "Tính năng này chưa được triển khai",
      action: {
        label: "Hủy",
        onClick: () => toast.dismiss(),
      },
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 mb-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Button>
        <h2 className="text-xl font-bold text-white">{botName}</h2>
        <Badge className={getRiskColor(risk)}>
          Rủi ro: {BOT_RISK_DISPLAY[risk] || 'Không xác định'}
        </Badge>
        <Badge className={getStatusColor(status)}>
          {BOT_STATUS_DISPLAY[status] || 'Không xác định'}
        </Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 mr-2">
          {botId}
        </Badge>
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-1" />
          Chỉnh sửa
        </Button>
        <Button 
          variant={status === BotStatus.ACTIVE ? "outline" : "default"} 
          size="sm" 
          onClick={handleToggleStatus}
        >
          <Power className="h-4 w-4 mr-1" />
          {status === BotStatus.ACTIVE ? 'Vô hiệu hóa' : 'Kích hoạt'}
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-1" />
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default PropBotDetailHeader;

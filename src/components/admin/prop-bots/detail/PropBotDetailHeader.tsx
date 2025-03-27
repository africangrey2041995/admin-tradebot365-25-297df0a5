import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Edit, Power, Trash2, AlertTriangle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BotRiskLevel, BotStatus, BOT_RISK_DISPLAY, BOT_STATUS_DISPLAY } from '@/constants/botTypes';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PropBotDetailHeaderProps {
  botName: string;
  botId: string;
  risk: BotRiskLevel;
  status: BotStatus;
  onBack: () => void;
  onUpdateStatus?: (newStatus: BotStatus) => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onUpdateName?: (newName: string) => void;
}

const PropBotDetailHeader: React.FC<PropBotDetailHeaderProps> = ({
  botName,
  botId,
  risk,
  status,
  onBack,
  onUpdateStatus = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onUpdateName = () => {},
}) => {
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(botName);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingName]);

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
    onEdit();
  };

  const handleToggleStatus = () => {
    setIsStatusDialogOpen(true);
  };

  const confirmStatusChange = () => {
    const newStatus = status === BotStatus.ACTIVE ? BotStatus.INACTIVE : BotStatus.ACTIVE;
    onUpdateStatus(newStatus);
    
    const actionText = status === BotStatus.ACTIVE ? 'vô hiệu hóa' : 'kích hoạt';
    toast.success(`Đã ${actionText} bot: ${botName}`);
    
    setIsStatusDialogOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  const startEditingName = () => {
    setIsEditingName(true);
    setEditedName(botName);
  };

  const cancelEditingName = () => {
    setIsEditingName(false);
    setEditedName(botName);
  };

  const saveBotName = () => {
    if (editedName.trim() === '') {
      toast.error('Tên bot không được để trống');
      return;
    }

    onUpdateName(editedName);
    setIsEditingName(false);
    toast.success('Đã cập nhật tên bot thành công');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveBotName();
    } else if (e.key === 'Escape') {
      cancelEditingName();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 mb-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          Quay lại
        </Button>
        
        {isEditingName ? (
          <div className="flex items-center">
            <Input
              ref={nameInputRef}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8 w-auto mr-2 bg-background"
            />
            <Button size="sm" variant="ghost" onClick={saveBotName} className="p-0 w-8 h-8 mr-1">
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button size="sm" variant="ghost" onClick={cancelEditingName} className="p-0 w-8 h-8">
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white">{botName}</h2>
            <Button variant="ghost" size="sm" onClick={startEditingName} className="ml-1 p-0 w-8 h-8">
              <Edit className="h-4 w-4 text-gray-400 hover:text-white" />
            </Button>
          </div>
        )}
        
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

      <AlertDialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {status === BotStatus.ACTIVE 
                ? "Vô hiệu hóa Bot Trading?" 
                : "Kích hoạt Bot Trading?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {status === BotStatus.ACTIVE 
                ? "Bot sẽ ngừng giao dịch và không xử lý tín hiệu mới. Bạn có thể kích hoạt lại nó bất cứ lúc nào."
                : "Bot sẽ bắt đầu xử lý tín hiệu giao dịch. Đảm bảo rằng cấu hình đã được thiết lập đúng."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              {status === BotStatus.ACTIVE ? "Vô hiệu hóa" : "Kích hoạt"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Xóa Bot Trading?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Thao tác này không thể hoàn tác. Bot sẽ bị xóa vĩnh viễn khỏi hệ thống và tất cả dữ liệu liên quan sẽ bị mất.
              Tất cả người dùng đã đăng ký sẽ mất quyền truy cập vào bot này.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Xóa vĩnh viễn
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PropBotDetailHeader;

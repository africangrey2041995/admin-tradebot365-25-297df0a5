
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Trash, Power, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import EditBotDialog from './EditBotDialog';
import { BotCardProps } from './BotCard';
import { useNavigation } from '@/hooks/useNavigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { UserBotAccountDialog } from './accounts/dialogs';

interface BotProfileHeaderProps {
  botId: string;
  status: string;
  botDetails: BotCardProps;
  onUpdateBot: (updatedBot: Partial<BotCardProps>) => void;
}

const BotProfileHeader = ({ botId, status, botDetails, onUpdateBot }: BotProfileHeaderProps) => {
  const { goBack } = useNavigation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddAccountDialogOpen, setIsAddAccountDialogOpen] = useState(false);
  const [isStatusToggleLoading, setIsStatusToggleLoading] = useState(false);
  
  const handleBack = () => {
    try {
      goBack();
    } catch (error) {
      console.error('Error navigating back:', error);
      toast.error('Không thể quay lại trang trước. Đang chuyển về trang Bot.');
    }
  };

  const handleDeleteBot = () => {
    try {
      console.log(`Deleting bot: ${botId}`);
      toast.success(`Bot ${botId} đã được xóa`);
      goBack();
    } catch (error) {
      console.error(`Error deleting bot ${botId}:`, error);
      toast.error('Đã xảy ra lỗi khi xóa bot. Vui lòng thử lại sau.');
    }
  };

  const handleSaveBot = (updatedBot: Partial<BotCardProps>) => {
    try {
      onUpdateBot(updatedBot);
      toast.success('Cài đặt bot đã được cập nhật thành công');
    } catch (error) {
      console.error('Error updating bot settings:', error);
      toast.error('Đã xảy ra lỗi khi cập nhật cài đặt bot');
    }
  };

  const handleAddAccount = (formData: any) => {
    try {
      console.log('Adding account:', formData);
      toast.success('Đã thêm tài khoản mới thành công');
      setIsAddAccountDialogOpen(false);
    } catch (error) {
      console.error('Error adding account:', error);
      toast.error('Đã xảy ra lỗi khi thêm tài khoản');
    }
  };

  const handleToggleBotStatus = () => {
    setIsStatusToggleLoading(true);
    
    try {
      // Giả lập thời gian xử lý
      setTimeout(() => {
        const newStatus = status === 'Active' ? 'Inactive' : 'Active';
        
        // Cập nhật trạng thái bot
        onUpdateBot({ status: newStatus });
        
        const actionText = status === 'Active' ? 'dừng hoạt động' : 'kích hoạt';
        toast.success(`Bot đã được ${actionText} thành công`);
        
        setIsStatusToggleLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error toggling bot status:', error);
      toast.error('Đã xảy ra lỗi khi thay đổi trạng thái bot');
      setIsStatusToggleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" />
        Quay Lại
      </Button>
      
      <div className="flex items-center gap-2">
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              <Trash className="h-4 w-4" />
              <span>Xóa Bot</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc chắn muốn xóa bot này?</AlertDialogTitle>
              <AlertDialogDescription>
                Hành động này không thể hoàn tác. Điều này sẽ xóa vĩnh viễn bot
                và xóa tất cả dữ liệu của nó khỏi máy chủ của chúng tôi.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteBot}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Xóa Bot
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          onClick={() => setIsAddAccountDialogOpen(true)}
        >
          <UserPlus className="h-4 w-4" />
          <span>Thêm Tài Khoản</span>
        </Button>

        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Settings className="h-4 w-4" />
          <span>Cài Đặt</span>
        </Button>
        
        <Button 
          className={`flex items-center gap-2 ${status === 'Active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
          onClick={handleToggleBotStatus}
          disabled={isStatusToggleLoading}
        >
          <Power className="h-4 w-4" />
          {isStatusToggleLoading ? (
            <span>Đang xử lý...</span>
          ) : (
            <span>{status === 'Active' ? 'Dừng Bot' : 'Khởi Động Bot'}</span>
          )}
        </Button>
      </div>

      <EditBotDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        bot={botDetails}
        onSave={handleSaveBot}
      />

      <UserBotAccountDialog
        open={isAddAccountDialogOpen}
        onOpenChange={setIsAddAccountDialogOpen}
        botId={botId}
        onAddAccount={handleAddAccount}
      />
    </div>
  );
};

export default BotProfileHeader;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings, Trash, Power } from 'lucide-react';
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
  
  const handleBack = () => {
    try {
      goBack();
    } catch (error) {
      console.error('Error navigating back:', error);
      toast.error('Không thể quay lại trang trước. Đang chuyển về trang Bot.');
      // Fallback navigation logic would be handled in the useNavigation hook
    }
  };

  const handleDeleteBot = () => {
    try {
      // Here you would implement the actual deletion logic
      console.log(`Deleting bot: ${botId}`);
      
      // Show success toast
      toast.success(`Bot ${botId} đã được xóa`);
      
      // Navigate back to bots page
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
          className="flex items-center gap-2"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Settings className="h-4 w-4" />
          <span>Cài Đặt</span>
        </Button>
        <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Power className="h-4 w-4" />
          <span>{status === 'Active' ? 'Dừng Bot' : 'Khởi Động Bot'}</span>
        </Button>
      </div>

      <EditBotDialog 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        bot={botDetails}
        onSave={handleSaveBot}
      />
    </div>
  );
};

export default BotProfileHeader;


import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { BotCardProps } from '@/components/bots/BotCard';

interface EditBotDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bot: BotCardProps | null;
  onSave: (updatedBot: Partial<BotCardProps>) => void;
}

const EditBotDialog: React.FC<EditBotDialogProps> = ({ 
  isOpen, 
  onClose, 
  bot, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Partial<BotCardProps>>({
    title: '',
    subtitle: '',
  });

  useEffect(() => {
    if (bot) {
      setFormData({
        title: bot.title || '',
        subtitle: bot.subtitle || '',
      });
    }
  }, [bot]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    if (!formData.title) {
      toast.error('Tên bot không được để trống');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="relative mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="absolute right-0 top-0 h-8 w-8 p-0 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Đóng</span>
          </Button>
          
          <div className="w-full flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <DialogTitle className="text-center text-xl font-medium">Chỉnh Sửa Bot</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 px-1">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Tên Bot</Label>
            <Input 
              id="title" 
              placeholder="Nhập tên bot" 
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-sm font-medium">Mô tả</Label>
            <Textarea 
              id="subtitle" 
              placeholder="Nhập mô tả cho bot" 
              value={formData.subtitle}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!formData.title}
            className="bg-green-500 hover:bg-green-600"
          >
            Lưu Thay Đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBotDialog;

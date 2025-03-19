
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, User } from 'lucide-react';
import { toast } from 'sonner';
import { Account } from '@/types';

interface EditAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
  onSave: (updatedAccount: Partial<Account>) => void;
}

const EditAccountDialog: React.FC<EditAccountDialogProps> = ({ 
  isOpen, 
  onClose, 
  account, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Partial<Account>>({
    name: '',
    userEmail: '',
  });

  React.useEffect(() => {
    if (account) {
      setFormData({
        name: account.name || account.userAccount || '',
        userEmail: account.userEmail || '',
      });
    }
  }, [account]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error('Tên tài khoản không được để trống');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <div className="relative mb-6">
          <div className="absolute right-0 top-0">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Đóng</span>
            </Button>
          </div>
          <div className="w-full flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-medium">Chỉnh Sửa Tài Khoản</DialogTitle>
          </DialogHeader>
        </div>
        
        <div className="space-y-4 px-1">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Tên Tài Khoản</Label>
            <Input 
              id="name" 
              placeholder="Nhập tên tài khoản" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userEmail" className="text-sm font-medium">Email</Label>
            <Input 
              id="userEmail" 
              placeholder="Nhập email" 
              value={formData.userEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!formData.name}
            className="bg-green-500 hover:bg-green-600"
          >
            Lưu Thay Đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;

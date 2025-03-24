
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, X } from 'lucide-react';
import { NewAccount } from '@/hooks/useAccounts';

interface AddAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAccount: (newAccount: NewAccount) => void;
}

const AddAccountDialog: React.FC<AddAccountDialogProps> = ({
  open,
  onOpenChange,
  onAddAccount
}) => {
  const [newAccount, setNewAccount] = useState<NewAccount>({
    name: '',
    email: '',
  });

  const resetForm = () => {
    setNewAccount({ name: '', email: '' });
  };

  const handleSaveAccount = () => {
    onAddAccount(newAccount);
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="max-w-md">
        <div className="relative mb-6">
          <div className="absolute right-0 top-0">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="w-full flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-medium">Thêm Tài Khoản Mới</DialogTitle>
          </DialogHeader>
        </div>
        
        <div className="space-y-4 px-1">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Name Account</Label>
            <Input 
              id="name" 
              placeholder="Enter name account" 
              value={newAccount.name}
              onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email Account</Label>
            <Input 
              id="email" 
              placeholder="Enter email account" 
              value={newAccount.email}
              onChange={(e) => setNewAccount({...newAccount, email: e.target.value})}
            />
          </div>
        </div>
        
        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            onClick={handleSaveAccount} 
            disabled={!newAccount.name || !newAccount.email}
            className="bg-green-500 hover:bg-green-600"
          >
            Add Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;

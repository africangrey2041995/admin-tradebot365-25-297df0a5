
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserStatus, UserPlan } from '@/constants/userConstants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
    status: string;
    plan: string;
  };
  onUserUpdated?: (userData: {
    id: string;
    name: string;
    email: string;
    status: string;
    plan: string;
  }) => void;
}

export function EditUserDialog({ open, onOpenChange, user, onUserUpdated }: EditUserDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({
    id: user.id,
    name: user.name,
    email: user.email,
    status: user.status,
    plan: user.plan,
  });

  React.useEffect(() => {
    if (open) {
      // Reset form state when dialog opens
      setUserData({
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        plan: user.plan,
      });
    }
  }, [open, user]);

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real app, make API call to update user
      // await fetch(`/api/users/${user.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onUserUpdated) {
        onUserUpdated(userData);
      }
      
      toast.success(`Thông tin người dùng ${userData.name} đã được cập nhật thành công`);
      onOpenChange(false);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi cập nhật thông tin người dùng');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Thay đổi thông tin người dùng và nhấn lưu khi hoàn tất.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Tên người dùng</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="border-zinc-700 bg-zinc-800 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="border-zinc-700 bg-zinc-800 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <Select 
                value={userData.status}
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger className="border-zinc-700 bg-zinc-800 text-white">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                  <SelectGroup>
                    <SelectLabel>Trạng thái</SelectLabel>
                    <SelectItem value={UserStatus.ACTIVE}>Hoạt động</SelectItem>
                    <SelectItem value={UserStatus.INACTIVE}>Không hoạt động</SelectItem>
                    <SelectItem value={UserStatus.SUSPENDED}>Bị khóa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="plan">Gói dịch vụ</Label>
              <Select 
                value={userData.plan}
                onValueChange={(value) => handleChange('plan', value)}
              >
                <SelectTrigger className="border-zinc-700 bg-zinc-800 text-white">
                  <SelectValue placeholder="Chọn gói dịch vụ" />
                </SelectTrigger>
                <SelectContent className="border-zinc-700 bg-zinc-800 text-white">
                  <SelectGroup>
                    <SelectLabel>Gói dịch vụ</SelectLabel>
                    <SelectItem value={UserPlan.FREE}>Miễn phí</SelectItem>
                    <SelectItem value={UserPlan.BASIC}>Cơ bản</SelectItem>
                    <SelectItem value={UserPlan.PREMIUM}>Cao cấp</SelectItem>
                    <SelectItem value={UserPlan.ENTERPRISE}>Doanh nghiệp</SelectItem>
                    <SelectItem value={UserPlan.TRIAL}>Dùng thử</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-zinc-700 text-white"
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                'Lưu thay đổi'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';
import { toast } from "sonner";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserAdded?: () => void;
}

export function AddUserDialog({ 
  open, 
  onOpenChange, 
  onUserAdded 
}: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    plan: UserPlan.FREE
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Người dùng mới đã được tạo thành công!");
      onOpenChange(false);
      if (onUserAdded) onUserAdded();
      
      // Reset form
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        plan: UserPlan.FREE
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo người dùng mới!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Điền các thông tin cần thiết để tạo một người dùng mới.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">Tên</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700"
                  placeholder="Nhập tên"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Họ</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="bg-zinc-800 border-zinc-700"
                  placeholder="Nhập họ"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Nhập email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Nhập số điện thoại (không bắt buộc)"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">Vai trò</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => handleSelectChange('role', value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={UserRole.SUPPORT}>Support</SelectItem>
                    <SelectItem value={UserRole.PARTNER}>Partner</SelectItem>
                    <SelectItem value={UserRole.AGENT}>Agent</SelectItem>
                    <SelectItem value={UserRole.USER}>User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="text-white">Trạng thái</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                    <SelectItem value={UserStatus.INACTIVE}>Inactive</SelectItem>
                    <SelectItem value={UserStatus.PENDING}>Pending</SelectItem>
                    <SelectItem value={UserStatus.SUSPENDED}>Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="plan" className="text-white">Gói dịch vụ</Label>
                <Select 
                  value={formData.plan} 
                  onValueChange={(value) => handleSelectChange('plan', value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue placeholder="Chọn gói" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserPlan.FREE}>Free</SelectItem>
                    <SelectItem value={UserPlan.BASIC}>Basic</SelectItem>
                    <SelectItem value={UserPlan.PREMIUM}>Premium</SelectItem>
                    <SelectItem value={UserPlan.ENTERPRISE}>Enterprise</SelectItem>
                    <SelectItem value={UserPlan.TRIAL}>Trial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              {isLoading ? 'Đang xử lý...' : 'Thêm người dùng'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

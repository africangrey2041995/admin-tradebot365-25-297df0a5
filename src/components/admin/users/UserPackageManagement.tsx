
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Package, ShieldAlert, AlertCircle } from "lucide-react";
import { UserPlanBadge } from './UserPlanBadge';
import { UserPlan, USER_PLAN_DISPLAY, USER_PLAN_LIMITS } from '@/constants/userConstants';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UserPackageManagementProps {
  userId: string;
  currentPlan: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  autoRenew?: boolean;
  paymentMethod?: string;
  lastPaymentDate?: string;
  paymentAmount?: string;
}

export const UserPackageManagement: React.FC<UserPackageManagementProps> = ({
  userId,
  currentPlan,
  subscriptionStartDate = '2023-10-15',
  subscriptionEndDate = '2024-10-15',
  autoRenew = true,
  paymentMethod = 'Thẻ tín dụng',
  lastPaymentDate = '2023-10-15',
  paymentAmount = '500,000 VND',
}) => {
  const [changePackageDialogOpen, setChangePackageDialogOpen] = useState(false);
  const [extensionDialogOpen, setExtensionDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState(currentPlan);
  const [extensionPeriod, setExtensionPeriod] = useState('1');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePlan = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to change plan
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification
      toast.success(`Đã thay đổi gói dịch vụ từ ${USER_PLAN_DISPLAY[currentPlan as UserPlan]} sang ${USER_PLAN_DISPLAY[newPlan as UserPlan]}`);
      setChangePackageDialogOpen(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thay đổi gói dịch vụ!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtendSubscription = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to extend subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success notification
      toast.success(`Đã gia hạn gói ${USER_PLAN_DISPLAY[currentPlan as UserPlan]} thêm ${extensionPeriod} tháng`);
      setExtensionDialogOpen(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gia hạn gói dịch vụ!");
    } finally {
      setIsLoading(false);
    }
  };

  const formattedStartDate = new Date(subscriptionStartDate).toLocaleDateString('vi-VN');
  const formattedEndDate = new Date(subscriptionEndDate).toLocaleDateString('vi-VN');
  const formattedLastPaymentDate = new Date(lastPaymentDate).toLocaleDateString('vi-VN');

  const daysRemaining = Math.max(0, Math.ceil((new Date(subscriptionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  const isExpiringSoon = daysRemaining <= 7;

  return (
    <>
      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-amber-500" />
                Quản lý gói dịch vụ
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Thông tin về gói dịch vụ và đăng ký của người dùng
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="border-zinc-700"
                onClick={() => setChangePackageDialogOpen(true)}
              >
                Thay đổi gói
              </Button>
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={() => setExtensionDialogOpen(true)}
              >
                Gia hạn gói
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Gói hiện tại</div>
              <div className="flex items-center">
                <UserPlanBadge plan={currentPlan} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Thời hạn</div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-zinc-500" />
                  <span>
                    {formattedStartDate} - {formattedEndDate}
                  </span>
                </div>
                {isExpiringSoon && (
                  <div className="flex items-center mt-1 text-amber-500">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Sắp hết hạn ({daysRemaining} ngày)</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Tự động gia hạn</div>
              <div className="flex items-center">
                {autoRenew ? (
                  <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0">
                    Bật
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border-0">
                    Tắt
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Phương thức thanh toán</div>
              <div>{paymentMethod}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Lần thanh toán gần nhất</div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-zinc-500" />
                <span>{formattedLastPaymentDate}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Số tiền</div>
              <div>{paymentAmount}</div>
            </div>
            
            <div className="space-y-2 col-span-2">
              <div className="text-sm text-zinc-400">Giới hạn gói</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between border border-zinc-800 rounded-md p-2">
                  <span className="text-zinc-400">Bots</span>
                  <Badge className="bg-zinc-800">{USER_PLAN_LIMITS[currentPlan as UserPlan]?.bots || 'N/A'}</Badge>
                </div>
                <div className="flex items-center justify-between border border-zinc-800 rounded-md p-2">
                  <span className="text-zinc-400">Accounts</span>
                  <Badge className="bg-zinc-800">{USER_PLAN_LIMITS[currentPlan as UserPlan]?.accounts || 'N/A'}</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog to change package */}
      <Dialog open={changePackageDialogOpen} onOpenChange={setChangePackageDialogOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Thay đổi gói dịch vụ</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Thay đổi gói dịch vụ cho người dùng này
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-plan">Gói hiện tại</Label>
              <div className="flex items-center h-10 px-3 border border-zinc-800 rounded-md bg-zinc-800/50">
                <UserPlanBadge plan={currentPlan} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-plan">Gói mới</Label>
              <Select value={newPlan} onValueChange={setNewPlan}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Chọn gói mới" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value={UserPlan.FREE}>{USER_PLAN_DISPLAY[UserPlan.FREE]}</SelectItem>
                  <SelectItem value={UserPlan.BASIC}>{USER_PLAN_DISPLAY[UserPlan.BASIC]}</SelectItem>
                  <SelectItem value={UserPlan.PREMIUM}>{USER_PLAN_DISPLAY[UserPlan.PREMIUM]}</SelectItem>
                  <SelectItem value={UserPlan.ENTERPRISE}>{USER_PLAN_DISPLAY[UserPlan.ENTERPRISE]}</SelectItem>
                  <SelectItem value={UserPlan.TRIAL}>{USER_PLAN_DISPLAY[UserPlan.TRIAL]}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tính năng của gói mới</Label>
              <div className="border border-zinc-800 rounded-md p-3 bg-zinc-800/50">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Bot tối đa: {USER_PLAN_LIMITS[newPlan as UserPlan]?.bots || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span>Tài khoản tối đa: {USER_PLAN_LIMITS[newPlan as UserPlan]?.accounts || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setChangePackageDialogOpen(false)}
              className="border-zinc-700"
            >
              Hủy
            </Button>
            <Button
              disabled={newPlan === currentPlan || isLoading}
              onClick={handleChangePlan}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {isLoading ? 'Đang xử lý...' : 'Xác nhận thay đổi'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog to extend subscription */}
      <Dialog open={extensionDialogOpen} onOpenChange={setExtensionDialogOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Gia hạn gói dịch vụ</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Gia hạn thời gian sử dụng gói dịch vụ cho người dùng này
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-plan">Gói hiện tại</Label>
              <div className="flex items-center h-10 px-3 border border-zinc-800 rounded-md bg-zinc-800/50">
                <UserPlanBadge plan={currentPlan} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current-expiry">Ngày hết hạn hiện tại</Label>
              <div className="flex items-center h-10 px-3 border border-zinc-800 rounded-md bg-zinc-800/50">
                {formattedEndDate}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="extension-period">Thời gian gia hạn (tháng)</Label>
              <Select value={extensionPeriod} onValueChange={setExtensionPeriod}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Chọn thời gian gia hạn" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="1">1 tháng</SelectItem>
                  <SelectItem value="3">3 tháng</SelectItem>
                  <SelectItem value="6">6 tháng</SelectItem>
                  <SelectItem value="12">12 tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-expiry">Ngày hết hạn mới</Label>
              <div className="flex items-center h-10 px-3 border border-zinc-800 rounded-md bg-zinc-800/50">
                {(() => {
                  const newEndDate = new Date(subscriptionEndDate);
                  newEndDate.setMonth(newEndDate.getMonth() + parseInt(extensionPeriod, 10));
                  return newEndDate.toLocaleDateString('vi-VN');
                })()}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExtensionDialogOpen(false)}
              className="border-zinc-700"
            >
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleExtendSubscription}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {isLoading ? 'Đang xử lý...' : 'Xác nhận gia hạn'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

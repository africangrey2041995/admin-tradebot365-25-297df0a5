
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlan, USER_PLAN_DISPLAY, USER_PLAN_LIMITS } from '@/constants/userConstants';
import { Badge } from "@/components/ui/badge";
import { UserPlanBadge } from '../users/UserPlanBadge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';

interface PackagesTableProps {
  onEditPackage: (packageId: UserPlan) => void;
}

export const PackagesTable: React.FC<PackagesTableProps> = ({ onEditPackage }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState<UserPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (packageId: UserPlan) => {
    setPackageToDelete(packageId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return;
    
    setIsDeleting(true);
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Đã xóa gói ${USER_PLAN_DISPLAY[packageToDelete]}`);
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa gói dịch vụ");
    } finally {
      setIsDeleting(false);
    }
  };

  // Chuyển đổi từ enum UserPlan sang mảng để hiển thị
  const packages = Object.values(UserPlan).map(planKey => ({
    id: planKey,
    name: USER_PLAN_DISPLAY[planKey],
    maxBots: USER_PLAN_LIMITS[planKey]?.bots || 0,
    maxAccounts: USER_PLAN_LIMITS[planKey]?.accounts || 0,
    price: planKey === 'free' ? '0 VND' : 
           planKey === 'basic' ? '200,000 VND/tháng' : 
           planKey === 'premium' ? '500,000 VND/tháng' : 
           planKey === 'enterprise' ? 'Liên hệ' : 
           planKey === 'trial' ? '0 VND (giới hạn thời gian)' : 'N/A',
    activeUsers: planKey === 'free' ? 1250 : 
                planKey === 'basic' ? 780 : 
                planKey === 'premium' ? 355 : 
                planKey === 'enterprise' ? 15 : 
                planKey === 'trial' ? 475 : 0,
    features: planKey === 'free' ? ['Giới hạn bot cơ bản', 'Không có bot premium'] :
              planKey === 'basic' ? ['Một số bot premium', 'Thống kê cơ bản'] :
              planKey === 'premium' ? ['Tất cả bot premium', 'Đầy đủ tính năng'] :
              planKey === 'enterprise' ? ['Tùy chỉnh theo yêu cầu', 'Hỗ trợ 24/7'] :
              planKey === 'trial' ? ['Giống Premium nhưng giới hạn thời gian', 'Chỉ dùng thử 7 ngày'] : []
  }));

  return (
    <>
      <div className="mt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gói dịch vụ</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Bot tối đa</TableHead>
              <TableHead>Account tối đa</TableHead>
              <TableHead>Người dùng hiện tại</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-1">
                    <UserPlanBadge plan={pkg.id} />
                    <div className="text-sm text-zinc-400">{pkg.features.join(', ')}</div>
                  </div>
                </TableCell>
                <TableCell>{pkg.price}</TableCell>
                <TableCell>{pkg.maxBots}</TableCell>
                <TableCell>{pkg.maxAccounts}</TableCell>
                <TableCell>
                  <Badge className="bg-zinc-800">
                    {pkg.activeUsers}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => onEditPackage(pkg.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      onClick={() => handleDeleteClick(pkg.id)}
                      disabled={pkg.id === UserPlan.FREE} // Không cho phép xóa gói Free
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog xác nhận xóa */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Xóa gói dịch vụ</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Bạn có chắc chắn muốn xóa gói dịch vụ này không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-center p-4 border border-red-500/20 rounded-md bg-red-500/10">
              <div className="text-center">
                <p className="text-red-500 font-medium">
                  {packageToDelete ? `Xóa gói: ${USER_PLAN_DISPLAY[packageToDelete]}` : 'Xóa gói dịch vụ'}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  Tất cả người dùng đang sử dụng gói này sẽ bị chuyển về gói Free
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-zinc-700"
            >
              Hủy
            </Button>
            <Button
              disabled={isDeleting}
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {isDeleting ? 'Đang xử lý...' : 'Xác nhận xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

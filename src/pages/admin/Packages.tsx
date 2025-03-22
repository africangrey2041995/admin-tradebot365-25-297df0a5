
import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, CircleDollarSign, Users, Layers } from "lucide-react";
import { PackagesTable } from '@/components/admin/packages/PackagesTable';
import { EditPackageForm } from '@/components/admin/packages/EditPackageForm';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlan } from '@/constants/userConstants';
import { toast } from 'sonner';

const AdminPackages = () => {
  const [editingPackageId, setEditingPackageId] = useState<UserPlan | null>(null);
  const [addPackageDialogOpen, setAddPackageDialogOpen] = useState(false);
  const [newPackageName, setNewPackageName] = useState("");
  const [isAddingPackage, setIsAddingPackage] = useState(false);

  const handleAddPackage = async () => {
    if (!newPackageName.trim()) {
      toast.error("Tên gói không được để trống");
      return;
    }
    
    setIsAddingPackage(true);
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Đã tạo gói dịch vụ mới: ${newPackageName}`);
      setAddPackageDialogOpen(false);
      setNewPackageName("");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tạo gói dịch vụ");
    } finally {
      setIsAddingPackage(false);
    }
  };

  const handleEditPackage = (packageId: UserPlan) => {
    setEditingPackageId(packageId);
  };

  const handleBackToList = () => {
    setEditingPackageId(null);
  };

  // Thống kê gói (dữ liệu mẫu)
  const stats = {
    totalPackages: 5,
    totalActiveUsers: 2875,
    monthlyRevenue: "950,000,000 VND",
    mostPopularPlan: "Free"
  };

  return (
    <div className="space-y-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Quản lý gói dịch vụ</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {editingPackageId ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Chi tiết gói dịch vụ</h1>
            <Button 
              variant="outline" 
              onClick={handleBackToList}
              className="border-zinc-800"
            >
              Quay lại danh sách
            </Button>
          </div>
          
          <EditPackageForm packageId={editingPackageId} />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-white">Quản lý gói dịch vụ</h1>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-white"
              onClick={() => setAddPackageDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm gói mới
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-zinc-800 bg-zinc-900 text-white">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-zinc-400">Tổng số gói</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.totalPackages}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                    <Package className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-zinc-800 bg-zinc-900 text-white">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-zinc-400">Tổng người dùng</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.totalActiveUsers}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-zinc-800 bg-zinc-900 text-white">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-zinc-400">Doanh thu tháng</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.monthlyRevenue}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <CircleDollarSign className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-zinc-800 bg-zinc-900 text-white">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-zinc-400">Gói phổ biến nhất</p>
                    <h3 className="text-2xl font-bold mt-1">{stats.mostPopularPlan}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                    <Layers className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-zinc-800 bg-zinc-900 text-white">
            <CardHeader>
              <CardTitle>Danh sách gói dịch vụ</CardTitle>
              <CardDescription className="text-zinc-400">
                Quản lý các gói dịch vụ trong hệ thống
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PackagesTable onEditPackage={handleEditPackage} />
            </CardContent>
          </Card>
        </>
      )}

      {/* Dialog thêm gói mới */}
      <Dialog open={addPackageDialogOpen} onOpenChange={setAddPackageDialogOpen}>
        <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Thêm gói dịch vụ mới</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Tạo một gói dịch vụ mới trong hệ thống
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="package-name">Tên gói dịch vụ</Label>
              <Input 
                id="package-name" 
                placeholder="Nhập tên gói dịch vụ" 
                className="bg-zinc-800 border-zinc-700"
                value={newPackageName}
                onChange={(e) => setNewPackageName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-zinc-400">
                Sau khi tạo gói mới, bạn sẽ được chuyển đến trang cài đặt chi tiết để thiết lập các tham số cho gói.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddPackageDialogOpen(false)}
              className="border-zinc-700"
            >
              Hủy
            </Button>
            <Button
              disabled={isAddingPackage || !newPackageName.trim()}
              onClick={handleAddPackage}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {isAddingPackage ? 'Đang xử lý...' : 'Tạo gói mới'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPackages;

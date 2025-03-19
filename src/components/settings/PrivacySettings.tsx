
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
} from "@/components/ui/alert-dialog";

const PrivacySettings = () => {
  const { toast } = useToast();

  const handleDataExport = () => {
    toast({
      title: "Yêu cầu xuất dữ liệu đã được gửi",
      description: "Bạn sẽ nhận được email với dữ liệu của mình trong vòng 24 giờ.",
    });
  };

  const handleDataDelete = () => {
    toast({
      title: "Yêu cầu xóa dữ liệu đã được gửi",
      description: "Chúng tôi sẽ xử lý yêu cầu của bạn và thông báo qua email khi hoàn tất.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Data Collection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Thu thập dữ liệu</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="analytics" defaultChecked />
            <div className="grid gap-1.5">
              <Label htmlFor="analytics" className="font-medium">Phân tích sử dụng</Label>
              <p className="text-sm text-muted-foreground">
                Cho phép thu thập dữ liệu về cách bạn sử dụng ứng dụng để cải thiện trải nghiệm.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="crash-reports" defaultChecked />
            <div className="grid gap-1.5">
              <Label htmlFor="crash-reports" className="font-medium">Báo cáo lỗi</Label>
              <p className="text-sm text-muted-foreground">
                Gửi báo cáo lỗi tự động khi ứng dụng gặp sự cố.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="personalization" defaultChecked />
            <div className="grid gap-1.5">
              <Label htmlFor="personalization" className="font-medium">Cá nhân hóa</Label>
              <p className="text-sm text-muted-foreground">
                Cho phép sử dụng dữ liệu của bạn để cá nhân hóa trải nghiệm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Data Sharing */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Chia sẻ dữ liệu giao dịch</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <p>Chia sẻ thống kê giao dịch công khai</p>
            <p className="text-sm text-muted-foreground">Cho phép người dùng khác xem thống kê giao dịch của bạn.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      {/* Data Export/Delete */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dữ liệu cá nhân</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleDataExport}>
            Xuất dữ liệu của tôi
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Xóa dữ liệu của tôi</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc chắn muốn tiếp tục?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ xóa vĩnh viễn tất cả dữ liệu cá nhân của bạn khỏi hệ thống của chúng tôi. 
                  Quá trình này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={handleDataDelete}>Tiếp tục</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Cookie Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cài đặt cookie</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="essential-cookies" defaultChecked disabled />
            <div className="grid gap-1.5">
              <Label htmlFor="essential-cookies" className="font-medium">Cookie thiết yếu</Label>
              <p className="text-sm text-muted-foreground">
                Cookie cần thiết để ứng dụng hoạt động (không thể tắt).
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="preference-cookies" defaultChecked />
            <div className="grid gap-1.5">
              <Label htmlFor="preference-cookies" className="font-medium">Cookie tùy chọn</Label>
              <p className="text-sm text-muted-foreground">
                Lưu trữ tùy chọn và cài đặt của bạn.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="statistics-cookies" defaultChecked />
            <div className="grid gap-1.5">
              <Label htmlFor="statistics-cookies" className="font-medium">Cookie thống kê</Label>
              <p className="text-sm text-muted-foreground">
                Thu thập dữ liệu ẩn danh để cải thiện ứng dụng.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing-cookies" />
            <div className="grid gap-1.5">
              <Label htmlFor="marketing-cookies" className="font-medium">Cookie tiếp thị</Label>
              <p className="text-sm text-muted-foreground">
                Được sử dụng để hiển thị quảng cáo phù hợp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;

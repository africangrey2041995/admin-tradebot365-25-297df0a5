
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Key, ShieldCheck } from "lucide-react";

const SecuritySettings = () => {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleToggle2FA = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    // In a real app, this would trigger 2FA setup flow
    if (checked) {
      setShowConfirmDialog(true);
    } else {
      toast({
        title: "Xác thực hai yếu tố đã bị tắt",
        description: "Tài khoản của bạn hiện được bảo vệ ít hơn.",
        variant: "default",
      });
    }
  };

  const handle2FAConfirm = () => {
    setShowConfirmDialog(false);
    toast({
      title: "Xác thực hai yếu tố đã được bật",
      description: "Tài khoản của bạn hiện được bảo vệ bổ sung.",
      variant: "default",
    });
  };

  const validatePasswords = () => {
    if (newPassword.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Mật khẩu không khớp");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleChangePassword = () => {
    if (validatePasswords()) {
      // In a real app, you would call an API to change the password
      toast({
        title: "Mật khẩu đã được thay đổi",
        description: "Mật khẩu mới của bạn đã được cập nhật thành công.",
        variant: "default",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Key className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Thay đổi mật khẩu</h3>
        </div>
        
        {passwordError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Lỗi</AlertTitle>
            <AlertDescription>{passwordError}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-3">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
            <Input 
              id="current-password" 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input 
              id="new-password" 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={handleChangePassword}
          disabled={!currentPassword || !newPassword || !confirmPassword}
        >
          Cập nhật mật khẩu
        </Button>
      </div>

      <div className="border-t border-border my-6"></div>

      {/* 2FA Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Xác thực hai yếu tố (2FA)</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">Bảo vệ tài khoản của bạn</p>
            <p className="text-sm text-muted-foreground">
              Yêu cầu mã bổ sung khi đăng nhập trên thiết bị không xác định.
            </p>
          </div>
          <Switch 
            checked={twoFactorEnabled} 
            onCheckedChange={handleToggle2FA} 
          />
        </div>
      </div>

      {/* 2FA Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác thực hai yếu tố</DialogTitle>
            <DialogDescription>
              Thiết lập xác thực hai yếu tố (2FA) để tăng cường bảo mật cho tài khoản của bạn.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Thông báo quan trọng</AlertTitle>
              <AlertDescription>
                Trong ứng dụng thực tế, bạn sẽ nhận được mã QR để quét hoặc mã dự phòng để thiết lập 2FA.
              </AlertDescription>
            </Alert>
            
            <div className="flex justify-center p-4">
              <div className="w-40 h-40 bg-muted flex items-center justify-center border">
                <p className="text-sm text-center text-muted-foreground">
                  Mã QR sẽ hiển thị ở đây
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Hủy</Button>
            <Button onClick={handle2FAConfirm}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecuritySettings;

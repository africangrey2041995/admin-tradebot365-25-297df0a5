
import React, { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Fingerprint, Phone, Mail } from "lucide-react";

const PersonalDataForm = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    phone: user?.phoneNumbers?.[0]?.phoneNumber || ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      // In a real app, you would call Clerk's API to update user data here
      // await user?.update({...})
      
      // For now, we'll just simulate success
      toast({
        title: "Thông tin cá nhân đã được cập nhật",
        description: "Thay đổi của bạn đã được lưu thành công.",
        variant: "default",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể cập nhật thông tin cá nhân.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-6">
        {/* Email - Read only */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email
            </Label>
          </div>
          <Input
            id="email"
            type="email"
            value={user?.primaryEmailAddress?.emailAddress || ""}
            disabled
            className="bg-muted/50"
          />
          <p className="text-xs text-muted-foreground">Email không thể thay đổi.</p>
        </div>

        {/* User ID - Read only */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="userId" className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4 text-muted-foreground" />
              ID
            </Label>
          </div>
          <Input
            id="userId"
            value={user?.id || ""}
            disabled
            className="bg-muted/50 font-mono text-sm"
          />
        </div>

        {/* Username */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="username" className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Tên người dùng
            </Label>
          </div>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-muted/50" : ""}
          />
        </div>

        {/* Phone number */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Số điện thoại
            </Label>
          </div>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={!isEditing ? "bg-muted/50" : ""}
            placeholder="+84 ..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </Button>
            <Button onClick={handleSave}>Lưu thay đổi</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>
        )}
      </div>
    </div>
  );
};

export default PersonalDataForm;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User } from 'lucide-react';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended';
}

interface UserInfoCardProps {
  userInfo: UserInfo;
  onViewUserDetails: () => void;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ userInfo, onViewUserDetails }) => {
  return (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle>Thông tin Người Dùng</CardTitle>
        <CardDescription>
          Thông tin về người dùng sở hữu bot này
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Người dùng ID</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium text-primary"
                    onClick={onViewUserDetails}
                  >
                    {userInfo.id}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tên</p>
                  <p className="font-medium">{userInfo.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                  <p className="font-medium">{userInfo.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Số điện thoại</p>
                  <p className="font-medium">{userInfo.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 md:col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${
                  userInfo.status === 'active' ? 'bg-green-500' : 
                  userInfo.status === 'inactive' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Trạng thái</p>
                  <p className="font-medium">
                    {userInfo.status === 'active' ? 'Hoạt động' : 
                    userInfo.status === 'inactive' ? 'Không hoạt động' : 'Đã khóa'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;

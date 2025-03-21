
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PremiumBotDetail: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate('/admin/premium-bots')}
            className="text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-white">
            Alpha Momentum
          </h1>
        </div>
      </div>
      
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Chi tiết</TabsTrigger>
          <TabsTrigger value="subscribers">Người đăng ký</TabsTrigger>
          <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Thông tin Bot</CardTitle>
              <CardDescription>
                Thông tin cơ bản về bot premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Thông tin chi tiết sẽ hiển thị ở đây</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Danh sách người đăng ký</CardTitle>
              <CardDescription>
                Người dùng đã đăng ký sử dụng bot này
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Danh sách người đăng ký sẽ hiển thị ở đây</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="text-black">Dữ liệu hiệu suất</CardTitle>
              <CardDescription>
                Thống kê hiệu suất của bot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Biểu đồ hiệu suất sẽ hiển thị ở đây</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PremiumBotDetail;

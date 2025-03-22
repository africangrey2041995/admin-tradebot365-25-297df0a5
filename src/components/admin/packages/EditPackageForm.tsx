
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { UserPlan, USER_PLAN_DISPLAY, USER_PLAN_LIMITS } from '@/constants/userConstants';
import { toast } from "sonner";
import { UserPlanBadge } from '../users/UserPlanBadge';
import { GanttChart, ListChecks, Lock, Settings, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface EditPackageFormProps {
  packageId: UserPlan;
}

// Định nghĩa schema cho form
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên gói phải có ít nhất 2 ký tự",
  }),
  description: z.string().optional(),
  price: z.string().min(1, {
    message: "Giá không được để trống",
  }),
  maxBots: z.coerce.number().min(0, {
    message: "Giá trị không hợp lệ",
  }),
  maxAccounts: z.coerce.number().min(0, {
    message: "Giá trị không hợp lệ",
  }),
  trialDays: z.coerce.number().min(0, {
    message: "Giá trị không hợp lệ",
  }),
  autoRenew: z.boolean().default(true),
  isActive: z.boolean().default(true),
  features: z.string().optional(),
});

export const EditPackageForm: React.FC<EditPackageFormProps> = ({ packageId }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  
  // Lấy thông tin gói dựa vào packageId
  const packageInfo = {
    id: packageId,
    name: USER_PLAN_DISPLAY[packageId],
    description: packageId === UserPlan.FREE ? 'Gói miễn phí với các tính năng cơ bản' :
                packageId === UserPlan.BASIC ? 'Gói cơ bản với nhiều tính năng hơn' :
                packageId === UserPlan.PREMIUM ? 'Gói cao cấp với đầy đủ tính năng' :
                packageId === UserPlan.ENTERPRISE ? 'Gói doanh nghiệp với tùy chỉnh theo yêu cầu' :
                packageId === UserPlan.TRIAL ? 'Gói dùng thử với đầy đủ tính năng trong thời gian giới hạn' : '',
    price: packageId === UserPlan.FREE ? '0' :
           packageId === UserPlan.BASIC ? '200000' :
           packageId === UserPlan.PREMIUM ? '500000' :
           packageId === UserPlan.ENTERPRISE ? 'Liên hệ' :
           packageId === UserPlan.TRIAL ? '0' : '',
    maxBots: USER_PLAN_LIMITS[packageId]?.bots || 0,
    maxAccounts: USER_PLAN_LIMITS[packageId]?.accounts || 0,
    trialDays: packageId === UserPlan.TRIAL ? 7 : 0,
    autoRenew: true,
    isActive: true,
    features: packageId === UserPlan.FREE ? 'Giới hạn bot cơ bản\nKhông có bot premium' :
              packageId === UserPlan.BASIC ? 'Một số bot premium\nThống kê cơ bản\nHỗ trợ qua email' :
              packageId === UserPlan.PREMIUM ? 'Tất cả bot premium\nĐầy đủ tính năng\nHỗ trợ ưu tiên\nKhông giới hạn thời gian' :
              packageId === UserPlan.ENTERPRISE ? 'Tùy chỉnh theo yêu cầu\nHỗ trợ 24/7\nTư vấn chiến lược riêng\nAPI riêng\nTích hợp tùy chỉnh' :
              packageId === UserPlan.TRIAL ? 'Giống Premium nhưng giới hạn thời gian\nChỉ dùng thử 7 ngày' : '',
  };
  
  // Khởi tạo form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: packageInfo.name,
      description: packageInfo.description,
      price: packageInfo.price,
      maxBots: packageInfo.maxBots,
      maxAccounts: packageInfo.maxAccounts,
      trialDays: packageInfo.trialDays,
      autoRenew: packageInfo.autoRenew,
      isActive: packageInfo.isActive,
      features: packageInfo.features,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitted values:', values);
      toast.success(`Đã cập nhật gói dịch vụ ${values.name}`);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật gói dịch vụ");
    } finally {
      setIsLoading(false);
    }
  };

  // Số người dùng đang sử dụng gói này (dữ liệu mẫu)
  const activeUsers = packageId === UserPlan.FREE ? 1250 : 
                      packageId === UserPlan.BASIC ? 780 : 
                      packageId === UserPlan.PREMIUM ? 355 : 
                      packageId === UserPlan.ENTERPRISE ? 15 : 
                      packageId === UserPlan.TRIAL ? 475 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <UserPlanBadge plan={packageId} />
          <span className="text-sm font-mono text-zinc-400">{packageId}</span>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Button 
            variant="outline" 
            className="border-zinc-700"
          >
            Hủy
          </Button>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </div>

      <Card className="border-zinc-800 bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <GanttChart className="h-5 w-5 mr-2 text-amber-500" />
            Thông tin tổng quan
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Thông tin tổng quan về gói dịch vụ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Người dùng hiện tại</div>
              <div className="text-2xl font-bold">{activeUsers}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Doanh thu từ gói</div>
              <div className="text-2xl font-bold">
                {packageId === UserPlan.FREE || packageId === UserPlan.TRIAL ? 
                  '0 VND' : 
                  packageId === UserPlan.ENTERPRISE ? 
                    'Tùy chỉnh' : 
                    `${(activeUsers * parseInt(packageInfo.price.replace(/[^0-9]/g, '') || '0')).toLocaleString('vi-VN')} VND/tháng`
                }
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-zinc-400">Trạng thái</div>
              <div className="flex items-center">
                <Switch 
                  checked={form.watch('isActive')} 
                  onCheckedChange={(checked) => form.setValue('isActive', checked)}
                  className="data-[state=checked]:bg-amber-500"
                />
                <span className="ml-2">{form.watch('isActive') ? 'Hoạt động' : 'Không hoạt động'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-zinc-800 border-zinc-700">
          <TabsTrigger value="general" className="data-[state=active]:bg-zinc-700">
            <Settings className="h-4 w-4 mr-2" />
            Cài đặt chung
          </TabsTrigger>
          <TabsTrigger value="limits" className="data-[state=active]:bg-zinc-700">
            <Lock className="h-4 w-4 mr-2" />
            Giới hạn & Quyền
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-zinc-700">
            <Users className="h-4 w-4 mr-2" />
            Người dùng
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-zinc-700">
            <ListChecks className="h-4 w-4 mr-2" />
            Tính năng
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="general" className="space-y-6">
              <Card className="border-zinc-800 bg-zinc-900 text-white">
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Thông tin cơ bản về gói dịch vụ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên gói</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nhập tên gói" 
                              className="bg-zinc-800 border-zinc-700"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá (VND/tháng)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nhập giá" 
                              className="bg-zinc-800 border-zinc-700"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-zinc-400">
                            Nhập 0 cho gói miễn phí hoặc "Liên hệ" cho doanh nghiệp
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Nhập mô tả gói dịch vụ" 
                            className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trialDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thời gian dùng thử (ngày)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Số ngày dùng thử" 
                            className="bg-zinc-800 border-zinc-700"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-zinc-400">
                          Nhập 0 nếu không có thời gian dùng thử
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="autoRenew"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-800 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Tự động gia hạn</FormLabel>
                          <FormDescription className="text-zinc-400">
                            Gói dịch vụ sẽ tự động gia hạn khi hết hạn
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-amber-500"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="limits" className="space-y-6">
              <Card className="border-zinc-800 bg-zinc-900 text-white">
                <CardHeader>
                  <CardTitle>Giới hạn và quyền hạn</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Cài đặt giới hạn và quyền hạn cho gói dịch vụ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="maxBots"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số Bot tối đa</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Nhập số lượng" 
                              className="bg-zinc-800 border-zinc-700"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxAccounts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số Account tối đa</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Nhập số lượng" 
                              className="bg-zinc-800 border-zinc-700"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Quyền truy cập Bot Premium</h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                        <span>Bot Premium cơ bản</span>
                        <Switch 
                          checked={packageId !== UserPlan.FREE} 
                          disabled={packageId === UserPlan.FREE}
                          className="data-[state=checked]:bg-amber-500"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                        <span>Bot Premium nâng cao</span>
                        <Switch 
                          checked={packageId === UserPlan.PREMIUM || packageId === UserPlan.ENTERPRISE || packageId === UserPlan.TRIAL} 
                          disabled={packageId === UserPlan.FREE || packageId === UserPlan.BASIC}
                          className="data-[state=checked]:bg-amber-500"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                        <span>Prop Trading Bot</span>
                        <Switch 
                          checked={packageId === UserPlan.PREMIUM || packageId === UserPlan.ENTERPRISE || packageId === UserPlan.TRIAL} 
                          disabled={packageId === UserPlan.FREE || packageId === UserPlan.BASIC}
                          className="data-[state=checked]:bg-amber-500"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between rounded-lg border border-zinc-800 p-3">
                        <span>Bot dành riêng cho doanh nghiệp</span>
                        <Switch 
                          checked={packageId === UserPlan.ENTERPRISE} 
                          disabled={packageId !== UserPlan.ENTERPRISE}
                          className="data-[state=checked]:bg-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card className="border-zinc-800 bg-zinc-900 text-white">
                <CardHeader>
                  <CardTitle>Người dùng hiện tại</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Danh sách người dùng đang sử dụng gói dịch vụ này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-zinc-400">Tổng cộng: {activeUsers} người dùng</div>
                    <Button variant="outline" className="border-zinc-700">
                      Xem tất cả
                    </Button>
                  </div>
                  
                  <div className="border border-zinc-800 rounded-md p-4 text-center">
                    <p className="text-zinc-400">
                      Tính năng xem danh sách chi tiết người dùng sẽ được cập nhật trong thời gian tới.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <Card className="border-zinc-800 bg-zinc-900 text-white">
                <CardHeader>
                  <CardTitle>Tính năng gói dịch vụ</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Cài đặt các tính năng có trong gói dịch vụ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Các tính năng</FormLabel>
                        <FormDescription className="text-zinc-400">
                          Nhập danh sách các tính năng, mỗi tính năng một dòng
                        </FormDescription>
                        <FormControl>
                          <Textarea 
                            placeholder="Các tính năng của gói" 
                            className="bg-zinc-800 border-zinc-700 min-h-[200px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

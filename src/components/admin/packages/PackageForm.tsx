
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Package } from '@/types';
import { UserPlan, USER_PLAN_DISPLAY } from '@/constants/userConstants';
import { Loader2, Plus, X } from 'lucide-react';

interface PackageFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Package>) => void;
  package?: Package | null;
  isSubmitting: boolean;
}

// Define form schema using Zod
const packageSchema = z.object({
  planId: z.nativeEnum(UserPlan),
  name: z.string().min(2, 'Tên gói phải có ít nhất 2 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  features: z.array(z.string().min(1, 'Tính năng không được để trống')),
  limits: z.object({
    bots: z.union([
      z.literal('Infinity'),
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
    accounts: z.union([
      z.literal('Infinity'),
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
  }),
  pricing: z.object({
    monthly: z.union([
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
    quarterly: z.union([
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
    yearly: z.union([
      z.number().min(0),
      z.string().regex(/^\d+$/).transform(val => Number(val))
    ]),
    currency: z.string().default('VND'),
  }),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  isEnterprise: z.boolean().default(false),
});

type FormValues = z.infer<typeof packageSchema>;

export const PackageForm: React.FC<PackageFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  package: pkg,
  isSubmitting
}) => {
  // Create specific defaultValues by processing the package data
  const getDefaultValues = (): FormValues => {
    if (pkg) {
      // For editing an existing package
      return {
        ...pkg,
        limits: {
          bots: pkg.limits.bots === Infinity ? 'Infinity' : pkg.limits.bots,
          accounts: pkg.limits.accounts === Infinity ? 'Infinity' : pkg.limits.accounts,
        },
        pricing: {
          monthly: pkg.pricing.monthly,
          quarterly: pkg.pricing.quarterly,
          yearly: pkg.pricing.yearly,
          currency: pkg.pricing.currency,
        },
        isActive: pkg.isActive,
        isPopular: pkg.isPopular || false,
        isEnterprise: pkg.isEnterprise || false,
      } as unknown as FormValues;
    }

    // For creating a new package
    return {
      planId: UserPlan.BASIC,
      name: '',
      description: '',
      features: [''],
      limits: {
        bots: 1,
        accounts: 1,
      },
      pricing: {
        monthly: 0,
        quarterly: 0,
        yearly: 0,
        currency: 'VND',
      },
      isActive: true,
      isPopular: false,
      isEnterprise: false,
    };
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: getDefaultValues()
  });

  const { control, handleSubmit, setValue, watch } = form;
  const isEdit = !!pkg;

  // Use field array to manage dynamic features
  const { fields, append, remove } = useFieldArray({
    name: 'features',
    control
  });

  // Handle form submission
  const onFormSubmit = (data: FormValues) => {
    // Process data before submitting
    const submittedData: Partial<Package> = {
      ...data,
      limits: {
        bots: data.limits.bots === 'Infinity' ? Infinity : Number(data.limits.bots),
        accounts: data.limits.accounts === 'Infinity' ? Infinity : Number(data.limits.accounts),
      },
      pricing: {
        monthly: Number(data.pricing.monthly),
        quarterly: Number(data.pricing.quarterly),
        yearly: Number(data.pricing.yearly),
        currency: data.pricing.currency,
      }
    };
    
    onSubmit(submittedData);
  };

  // Add new feature field
  const addFeature = () => {
    append('');
  };

  // Handle plan change (auto-update name)
  const watchPlanId = watch('planId');
  React.useEffect(() => {
    if (!isEdit && watchPlanId) {
      setValue('name', USER_PLAN_DISPLAY[watchPlanId]);
    }
  }, [watchPlanId, setValue, isEdit]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Chỉnh sửa gói dịch vụ' : 'Thêm gói dịch vụ mới'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="planId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại gói</FormLabel>
                    <Select
                      disabled={isEdit}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Chọn loại gói" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-800">
                        {Object.values(UserPlan).map((plan) => (
                          <SelectItem key={plan} value={plan}>
                            {USER_PLAN_DISPLAY[plan]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên gói</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nhập tên gói"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Mô tả chi tiết về gói dịch vụ"
                      className="resize-none bg-zinc-800 border-zinc-700 min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Tính năng</FormLabel>
              <div className="space-y-2 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={control}
                      name={`features.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Tính năng ${index + 1}`}
                              className="bg-zinc-800 border-zinc-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="h-8 w-8 text-zinc-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="mt-2 border-zinc-700 text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" /> Thêm tính năng
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormLabel>Giới hạn</FormLabel>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <FormField
                    control={control}
                    name="limits.bots"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Số bot"
                              className="bg-zinc-800 border-zinc-700 pl-10"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                              Bots:
                            </span>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Nhập "Infinity" cho không giới hạn
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="limits.accounts"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Số tài khoản"
                              className="bg-zinc-800 border-zinc-700 pl-10"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                              Acc:
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <FormLabel>Giá (VND)</FormLabel>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  <FormField
                    control={control}
                    name="pricing.monthly"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="number"
                              min="0"
                              placeholder="Giá hàng tháng"
                              className="bg-zinc-800 border-zinc-700 pl-16"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                              Tháng:
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={control}
                      name="pricing.quarterly"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type="number"
                                min="0"
                                placeholder="Giá hàng quý"
                                className="bg-zinc-800 border-zinc-700 pl-12"
                              />
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                                Quý:
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="pricing.yearly"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type="number"
                                min="0"
                                placeholder="Giá hàng năm"
                                className="bg-zinc-800 border-zinc-700 pl-12"
                              />
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                                Năm:
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-800 p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Trạng thái</FormLabel>
                      <FormDescription className="text-xs">
                        Gói dịch vụ có hiển thị không?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="isPopular"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-800 p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Phổ biến</FormLabel>
                      <FormDescription className="text-xs">
                        Đánh dấu là gói phổ biến nhất
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="isEnterprise"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-zinc-800 p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Doanh nghiệp</FormLabel>
                      <FormDescription className="text-xs">
                        Đánh dấu là gói dành cho doanh nghiệp
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-zinc-700"
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? 'Cập nhật' : 'Tạo gói'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

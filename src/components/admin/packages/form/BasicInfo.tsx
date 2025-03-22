
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { Textarea } from '@/components/ui/textarea';
import { useFormContext, useWatch } from 'react-hook-form';
import { UserPlan, USER_PLAN_DISPLAY } from '@/constants/userConstants';
import { FormValues } from './types';

interface BasicInfoProps {
  isEdit: boolean;
}

export function BasicInfo({ isEdit }: BasicInfoProps) {
  const { control, setValue } = useFormContext<FormValues>();
  
  // Auto-update name when plan changes (for new packages only)
  const watchPlanId = useWatch({ control, name: 'planId' });
  
  useEffect(() => {
    if (!isEdit && watchPlanId) {
      setValue('name', USER_PLAN_DISPLAY[watchPlanId]);
    }
  }, [watchPlanId, setValue, isEdit]);

  return (
    <>
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
    </>
  );
}

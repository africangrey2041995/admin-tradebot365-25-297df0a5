
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';

export function SettingsSection() {
  const { control } = useFormContext<FormValues>();

  return (
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
  );
}

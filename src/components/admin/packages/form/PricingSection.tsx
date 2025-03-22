
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import { FormValues } from './types';

export function PricingSection() {
  const { control } = useFormContext<FormValues>();

  return (
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
  );
}

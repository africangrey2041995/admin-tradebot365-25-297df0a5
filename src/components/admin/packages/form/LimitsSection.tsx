
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from '@/components/ui/input';
import { Info } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { FormValues, displayLimitValue } from './types';

export function LimitsSection() {
  const { control } = useFormContext<FormValues>();

  return (
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
                    type="number"
                    min="0"
                    placeholder="Số bot"
                    className="bg-zinc-800 border-zinc-700 pl-10"
                    value={displayLimitValue(field.value as number)}
                    onChange={(e) => {
                      // Parse to number, default to 0 if empty
                      const numValue = e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(numValue);
                    }}
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400">
                    Bots:
                  </span>
                </div>
              </FormControl>
              <FormDescription className="text-xs flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 cursor-help text-zinc-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-800 border-zinc-700 text-white">
                      <p>Nhập 0 hoặc lớn hơn 999 để đặt không giới hạn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span>Nhập 0 hoặc &gt;999 cho không giới hạn</span>
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
                    type="number"
                    min="0"
                    placeholder="Số tài khoản"
                    className="bg-zinc-800 border-zinc-700 pl-10"
                    value={displayLimitValue(field.value as number)}
                    onChange={(e) => {
                      // Parse to number, default to 0 if empty
                      const numValue = e.target.value === '' ? 0 : Number(e.target.value);
                      field.onChange(numValue);
                    }}
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
  );
}

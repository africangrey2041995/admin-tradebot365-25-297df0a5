
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormValues } from './types';

export function FeaturesSection() {
  const { control } = useFormContext<FormValues>();
  
  // Use field array to manage dynamic features with correct generic type parameters
  const { fields, append, remove } = useFieldArray<FormValues, 'features', 'number'>({
    name: 'features',
    control
  });

  // Add new feature field
  const addFeature = () => {
    append('');  // Append an empty string as a new feature
  };

  return (
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
  );
}

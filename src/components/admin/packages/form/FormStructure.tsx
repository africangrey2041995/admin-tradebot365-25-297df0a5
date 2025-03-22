
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Package } from '@/types';
import { FormValues } from './types';

interface FormStructureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<Package>) => void;
  form: UseFormReturn<FormValues>;
  isEdit: boolean;
  isSubmitting: boolean;
  children: React.ReactNode;
}

export function FormStructure({
  open,
  onOpenChange,
  onSubmit,
  form,
  isEdit,
  isSubmitting,
  children
}: FormStructureProps) {
  const { handleSubmit } = form;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Chỉnh sửa gói dịch vụ' : 'Thêm gói dịch vụ mới'}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {children}
            
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
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

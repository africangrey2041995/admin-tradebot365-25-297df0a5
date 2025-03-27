
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, PackagePlus, Edit } from 'lucide-react';
import { FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form';
import { FormValues } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FormStructureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FormValues) => void;
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
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl bg-zinc-900 border-zinc-800 text-white max-h-[90vh] flex flex-col">
        <DialogHeader className="sticky top-0 z-20 bg-zinc-900 pb-4">
          <DialogTitle className="flex items-center gap-2">
            {isEdit ? (
              <>
                <Edit className="h-5 w-5 text-primary" />
                Chỉnh sửa gói dịch vụ
              </>
            ) : (
              <>
                <PackagePlus className="h-5 w-5 text-primary" />
                Thêm gói dịch vụ mới
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6">
                {children}
              </div>
            </ScrollArea>
            
            <DialogFooter className="sticky bottom-0 z-20 bg-zinc-900 pt-4 mt-4">
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? 'Cập nhật gói' : 'Tạo gói mới'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

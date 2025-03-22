
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Package } from '@/types';
import { createPackage, updatePackage, deletePackage } from '@/api/packages';
import { toast } from 'sonner';

export function usePackageMutations() {
  const queryClient = useQueryClient();

  // Create package mutation
  const createMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPackages'] });
      toast.success('Gói dịch vụ đã được tạo thành công');
    },
    onError: (error) => {
      toast.error(`Lỗi khi tạo gói dịch vụ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Update package mutation
  const updateMutation = useMutation({
    mutationFn: ({ packageId, updates }: { packageId: string, updates: Partial<Package> }) => 
      updatePackage(packageId, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminPackages'] });
      queryClient.invalidateQueries({ queryKey: ['adminPackage', variables.packageId] });
      toast.success('Gói dịch vụ đã được cập nhật thành công');
    },
    onError: (error) => {
      toast.error(`Lỗi khi cập nhật gói dịch vụ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Delete package mutation
  const deleteMutation = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPackages'] });
      toast.success('Gói dịch vụ đã được xóa thành công');
    },
    onError: (error) => {
      toast.error(`Lỗi khi xóa gói dịch vụ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
}

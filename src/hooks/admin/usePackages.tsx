
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Package } from '@/types';
import { ADMIN_API } from '@/constants/apiEndpoints';
import { UserPlan, USER_PLAN_DISPLAY, USER_PLAN_LIMITS } from '@/constants/userConstants';
import { toast } from 'sonner';

// Simulated mock data for development
const mockPackages: Package[] = [
  {
    id: '1',
    planId: UserPlan.FREE,
    name: USER_PLAN_DISPLAY[UserPlan.FREE],
    description: 'Gói miễn phí với các tính năng cơ bản',
    features: ['1 Bot', '2 Tài khoản', 'Hỗ trợ cơ bản'],
    limits: USER_PLAN_LIMITS[UserPlan.FREE],
    pricing: {
      monthly: 0,
      quarterly: 0,
      yearly: 0,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    planId: UserPlan.BASIC,
    name: USER_PLAN_DISPLAY[UserPlan.BASIC],
    description: 'Gói cơ bản cho người mới bắt đầu',
    features: ['3 Bot', '5 Tài khoản', 'Hỗ trợ qua email'],
    limits: USER_PLAN_LIMITS[UserPlan.BASIC],
    pricing: {
      monthly: 200000,
      quarterly: 540000,
      yearly: 1920000,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    planId: UserPlan.PREMIUM,
    name: USER_PLAN_DISPLAY[UserPlan.PREMIUM],
    description: 'Gói cao cấp cho trader chuyên nghiệp',
    features: ['10 Bot', '20 Tài khoản', 'Hỗ trợ ưu tiên 24/7', 'Chiến lược nâng cao'],
    limits: USER_PLAN_LIMITS[UserPlan.PREMIUM],
    pricing: {
      monthly: 500000,
      quarterly: 1350000,
      yearly: 4800000,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isPopular: true
  },
  {
    id: '4',
    planId: UserPlan.ENTERPRISE,
    name: USER_PLAN_DISPLAY[UserPlan.ENTERPRISE],
    description: 'Gói doanh nghiệp với khả năng tùy chỉnh cao',
    features: ['Không giới hạn Bot', 'Không giới hạn tài khoản', 'Hỗ trợ riêng', 'API tùy chỉnh'],
    limits: USER_PLAN_LIMITS[UserPlan.ENTERPRISE],
    pricing: {
      monthly: 2000000,
      quarterly: 5400000,
      yearly: 19200000,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    isEnterprise: true
  },
  {
    id: '5',
    planId: UserPlan.TRIAL,
    name: USER_PLAN_DISPLAY[UserPlan.TRIAL],
    description: 'Gói dùng thử 14 ngày',
    features: ['2 Bot', '3 Tài khoản', 'Hỗ trợ cơ bản'],
    limits: USER_PLAN_LIMITS[UserPlan.TRIAL],
    pricing: {
      monthly: 0,
      quarterly: 0,
      yearly: 0,
      currency: 'VND'
    },
    isActive: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  }
];

// Simulate API calls
const fetchPackages = async (): Promise<Package[]> => {
  // Normally would fetch from API
  // const response = await fetch(ADMIN_API.PACKAGES.LIST);
  // return response.json();
  
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  return mockPackages;
};

const getPackageById = async (packageId: string): Promise<Package> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const pkg = mockPackages.find(p => p.id === packageId);
  if (!pkg) {
    throw new Error('Package not found');
  }
  return pkg;
};

const createPackage = async (newPackage: Omit<Package, 'id' | 'createdAt' | 'updatedAt'>): Promise<Package> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const now = new Date().toISOString();
  const createdPackage: Package = {
    ...newPackage,
    id: `pkg-${Math.random().toString(36).substring(2, 9)}`,
    createdAt: now,
    updatedAt: now
  };
  return createdPackage;
};

const updatePackage = async (packageId: string, updates: Partial<Omit<Package, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Package> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const pkg = mockPackages.find(p => p.id === packageId);
  if (!pkg) {
    throw new Error('Package not found');
  }
  return {
    ...pkg,
    ...updates,
    updatedAt: new Date().toISOString()
  };
};

const deletePackage = async (packageId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Would normally delete from API
  // await fetch(`${ADMIN_API.PACKAGES.DELETE(packageId)}`, { method: 'DELETE' });
};

export function usePackages() {
  const queryClient = useQueryClient();
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  // Queries
  const packagesQuery = useQuery({
    queryKey: ['adminPackages'],
    queryFn: fetchPackages
  });

  const packageDetailQuery = useQuery({
    queryKey: ['adminPackage', selectedPackageId],
    queryFn: () => selectedPackageId ? getPackageById(selectedPackageId) : null,
    enabled: !!selectedPackageId
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPackages'] });
      toast.success('Gói dịch vụ đã được tạo thành công');
      setIsFormDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Lỗi khi tạo gói dịch vụ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ packageId, updates }: { packageId: string, updates: Partial<Package> }) => 
      updatePackage(packageId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPackages'] });
      queryClient.invalidateQueries({ queryKey: ['adminPackage', selectedPackageId] });
      toast.success('Gói dịch vụ đã được cập nhật thành công');
      setIsFormDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Lỗi khi cập nhật gói dịch vụ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPackages'] });
      toast.success('Gói dịch vụ đã được xóa thành công');
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Lỗi khi xóa gói dịch vụ: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Handle opening the form for adding
  const handleAddPackage = () => {
    setEditingPackage(null);
    setIsFormDialogOpen(true);
  };

  // Handle opening the form for editing
  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setIsFormDialogOpen(true);
  };

  // Handle opening the delete dialog
  const handleDeletePackageClick = (packageId: string) => {
    setSelectedPackageId(packageId);
    setIsDeleteDialogOpen(true);
  };

  // Handle submitting the form
  const handleSubmitPackage = (packageData: Omit<Package, 'id' | 'createdAt' | 'updatedAt'> | Partial<Package>) => {
    if (editingPackage) {
      updateMutation.mutate({
        packageId: editingPackage.id,
        updates: packageData as Partial<Package>
      });
    } else {
      createMutation.mutate(packageData as Omit<Package, 'id' | 'createdAt' | 'updatedAt'>);
    }
  };

  // Handle confirming deletion
  const handleConfirmDelete = () => {
    if (selectedPackageId) {
      deleteMutation.mutate(selectedPackageId);
    }
  };

  return {
    packages: packagesQuery.data || [],
    isLoading: packagesQuery.isLoading,
    error: packagesQuery.error,

    selectedPackage: packageDetailQuery.data,
    isLoadingPackageDetail: packageDetailQuery.isLoading,
    packageDetailError: packageDetailQuery.error,

    editingPackage,
    isDeleteDialogOpen,
    isFormDialogOpen,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    setSelectedPackageId,
    handleAddPackage,
    handleEditPackage,
    handleDeletePackageClick,
    handleSubmitPackage,
    handleConfirmDelete,
    
    setIsDeleteDialogOpen,
    setIsFormDialogOpen
  };
}

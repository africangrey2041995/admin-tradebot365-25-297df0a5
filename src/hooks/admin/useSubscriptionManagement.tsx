
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSubscription, SubscriptionStatus } from '@/types/subscription';
import { toast } from 'sonner';

// Mock API functions for subscriptions
const fetchSubscriptions = async (): Promise<UserSubscription[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock subscription data
  return [
    {
      id: 'sub_001',
      userId: 'user_001',
      packageId: 'pkg_premium',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      status: 'active',
      currentPeriod: 'monthly',
      paymentMethod: 'credit_card',
      lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'sub_002',
      userId: 'user_002',
      packageId: 'pkg_basic',
      startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: false,
      status: 'expired',
      currentPeriod: 'quarterly',
      paymentMethod: 'paypal',
      lastPaymentDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'sub_003',
      userId: 'user_003',
      packageId: 'pkg_enterprise',
      startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 355 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      status: 'active',
      currentPeriod: 'yearly',
      paymentMethod: 'bank_transfer',
      lastPaymentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 355 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'sub_004',
      userId: 'user_004',
      packageId: 'pkg_basic',
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: false,
      status: 'active',
      currentPeriod: 'monthly',
      paymentMethod: 'credit_card',
      lastPaymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      nextPaymentDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'sub_005',
      userId: 'user_005',
      packageId: 'pkg_premium',
      startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      status: 'cancelled',
      currentPeriod: 'quarterly',
      paymentMethod: 'paypal',
      lastPaymentDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      cancelledAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ];
};

const updateSubscription = async (
  subscriptionId: string, 
  updates: Partial<UserSubscription>
): Promise<UserSubscription> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // In a real app, this would update the database
  console.log(`Updating subscription ${subscriptionId} with:`, updates);
  
  // Mock updated subscription
  return {
    id: subscriptionId,
    userId: 'user_001',
    packageId: 'pkg_premium',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    status: updates.status || 'active' as SubscriptionStatus,
    currentPeriod: 'monthly',
    paymentMethod: 'credit_card',
    lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    nextPaymentDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    ...updates
  };
};

const cancelSubscription = async (subscriptionId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would update the database
  console.log(`Cancelling subscription ${subscriptionId}`);
};

const renewSubscription = async (subscriptionId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // In a real app, this would update the database
  console.log(`Renewing subscription ${subscriptionId}`);
};

export function useSubscriptionManagement() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubscription, setSelectedSubscription] = useState<UserSubscription | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);

  // Query for fetching all subscriptions
  const subscriptionsQuery = useQuery({
    queryKey: ['adminSubscriptions'],
    queryFn: fetchSubscriptions
  });

  // Update subscription mutation
  const updateMutation = useMutation({
    mutationFn: ({ subscriptionId, updates }: { subscriptionId: string, updates: Partial<UserSubscription> }) =>
      updateSubscription(subscriptionId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubscriptions'] });
      toast.success('Đăng ký đã được cập nhật thành công');
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Lỗi khi cập nhật đăng ký: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Cancel subscription mutation
  const cancelMutation = useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubscriptions'] });
      toast.success('Đăng ký đã được hủy thành công');
      setIsCancelDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Lỗi khi hủy đăng ký: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Renew subscription mutation
  const renewMutation = useMutation({
    mutationFn: renewSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubscriptions'] });
      toast.success('Đăng ký đã được gia hạn thành công');
      setIsRenewDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Lỗi khi gia hạn đăng ký: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Filter subscriptions based on search term and status
  const filteredSubscriptions = subscriptionsQuery.data?.filter(subscription => {
    const matchesSearch = 
      subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.packageId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Handler functions
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleEditSubscription = (subscription: UserSubscription) => {
    setSelectedSubscription(subscription);
    setIsEditDialogOpen(true);
  };

  const handleCancelSubscriptionClick = (subscription: UserSubscription) => {
    setSelectedSubscription(subscription);
    setIsCancelDialogOpen(true);
  };

  const handleRenewSubscriptionClick = (subscription: UserSubscription) => {
    setSelectedSubscription(subscription);
    setIsRenewDialogOpen(true);
  };

  const handleUpdateSubscription = (updates: Partial<UserSubscription>) => {
    if (selectedSubscription) {
      updateMutation.mutate({
        subscriptionId: selectedSubscription.id,
        updates
      });
    }
  };

  const handleConfirmCancel = () => {
    if (selectedSubscription) {
      cancelMutation.mutate(selectedSubscription.id);
    }
  };

  const handleConfirmRenew = () => {
    if (selectedSubscription) {
      renewMutation.mutate(selectedSubscription.id);
    }
  };

  return {
    // Data
    subscriptions: filteredSubscriptions,
    isLoading: subscriptionsQuery.isLoading,
    error: subscriptionsQuery.error,
    selectedSubscription,
    searchTerm,
    statusFilter,

    // UI state
    isEditDialogOpen,
    isCancelDialogOpen,
    isRenewDialogOpen,
    isSubmitting: updateMutation.isPending,
    isCancelling: cancelMutation.isPending,
    isRenewing: renewMutation.isPending,

    // Actions
    setSelectedSubscription,
    handleSearch,
    handleStatusFilterChange,
    handleEditSubscription,
    handleCancelSubscriptionClick,
    handleRenewSubscriptionClick,
    handleUpdateSubscription,
    handleConfirmCancel,
    handleConfirmRenew,
    setIsEditDialogOpen,
    setIsCancelDialogOpen,
    setIsRenewDialogOpen
  };
}

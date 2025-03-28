import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSubscription, SubscriptionStatus } from '@/types/subscription';
import { toast } from 'sonner';

const fetchSubscriptions = async (): Promise<UserSubscription[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
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
  await new Promise(resolve => setTimeout(resolve, 600));
  
  console.log(`Updating subscription ${subscriptionId} with:`, updates);
  
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
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log(`Cancelling subscription ${subscriptionId}`);
};

const renewSubscription = async (subscriptionId: string, renewalPeriods: number = 1): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  console.log(`Renewing subscription ${subscriptionId} for ${renewalPeriods} periods`);
};

const bulkCancelSubscriptions = async (subscriptionIds: string[]): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Cancelling ${subscriptionIds.length} subscriptions: `, subscriptionIds);
};

const bulkRenewSubscriptions = async (
  subscriptionIds: string[], 
  renewalPeriods: number = 1
): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  console.log(`Renewing ${subscriptionIds.length} subscriptions for ${renewalPeriods} periods: `, subscriptionIds);
};

const bulkUpdateSubscriptionStatus = async (
  subscriptionIds: string[],
  status: SubscriptionStatus
): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log(`Updating ${subscriptionIds.length} subscriptions to status ${status}: `, subscriptionIds);
};

export function useSubscriptionManagement() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubscription, setSelectedSubscription] = useState<UserSubscription | null>(null);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isRenewDialogOpen, setIsRenewDialogOpen] = useState(false);
  const [isViewDetailsDialogOpen, setIsViewDetailsDialogOpen] = useState(false);
  
  const [selectedSubscriptionIds, setSelectedSubscriptionIds] = useState<string[]>([]);
  const [isBulkActionDialogOpen, setIsBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'cancel' | 'renew' | 'change-status'>('cancel');
  const [newBulkStatus, setNewBulkStatus] = useState<SubscriptionStatus>('active');

  const subscriptionsQuery = useQuery({
    queryKey: ['adminSubscriptions'],
    queryFn: fetchSubscriptions
  });

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

  const renewMutation = useMutation({
    mutationFn: ({ subscriptionId, renewalPeriods }: { subscriptionId: string, renewalPeriods: number }) =>
      renewSubscription(subscriptionId, renewalPeriods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubscriptions'] });
      toast.success('Đăng ký đã được gia hạn thành công');
      setIsRenewDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Lỗi khi gia hạn đăng ký: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const bulkCancelMutation = useMutation({
    mutationFn: bulkCancelSubscriptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubscriptions'] });
      toast.success(`${selectedSubscriptionIds.length} đăng ký đã được hủy thành công`);
      setIsBulkActionDialogOpen(false);
      setSelectedSubscriptionIds([]);
    },
    onError: (error) => {
      toast.error(`Lỗi khi hủy đăng ký hàng loạt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const bulkRenewMutation = useMutation({
    mutationFn: ({ ids, renewalPeriods }: { ids: string[], renewalPeriods: number }) => 
      bulkRenewSubscriptions(ids, renewalPeriods),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubscriptions'] });
      toast.success(`${selectedSubscriptionIds.length} đăng ký đã được gia hạn thành công`);
      setIsBulkActionDialogOpen(false);
      setSelectedSubscriptionIds([]);
    },
    onError: (error) => {
      toast.error(`Lỗi khi gia hạn đăng ký hàng loạt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const bulkUpdateStatusMutation = useMutation({
    mutationFn: ({ ids, status }: { ids: string[], status: SubscriptionStatus }) => 
      bulkUpdateSubscriptionStatus(ids, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSubscriptions'] });
      toast.success(`${selectedSubscriptionIds.length} đăng ký đã được cập nhật trạng thái thành công`);
      setIsBulkActionDialogOpen(false);
      setSelectedSubscriptionIds([]);
    },
    onError: (error) => {
      toast.error(`Lỗi khi cập nhật trạng thái hàng loạt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  const filteredSubscriptions = subscriptionsQuery.data?.filter(subscription => {
    const matchesSearch = 
      subscription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.packageId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

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

  const handleViewDetailsClick = (subscription: UserSubscription) => {
    setSelectedSubscription(subscription);
    setIsViewDetailsDialogOpen(true);
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

  const handleConfirmRenew = (renewalPeriods: number = 1) => {
    if (selectedSubscription) {
      renewMutation.mutate({ 
        subscriptionId: selectedSubscription.id,
        renewalPeriods
      });
    }
  };

  const handleSelectedRowsChange = (ids: string[]) => {
    setSelectedSubscriptionIds(ids);
  };

  const handleBulkCancel = () => {
    setBulkAction('cancel');
    setIsBulkActionDialogOpen(true);
  };

  const handleBulkRenew = () => {
    setBulkAction('renew');
    setIsBulkActionDialogOpen(true);
  };

  const handleBulkChangeStatus = () => {
    setBulkAction('change-status');
    setIsBulkActionDialogOpen(true);
  };

  const handleConfirmBulkAction = (newStatus?: SubscriptionStatus, renewalPeriods?: number) => {
    if (selectedSubscriptionIds.length === 0) return;

    switch (bulkAction) {
      case 'cancel':
        bulkCancelMutation.mutate(selectedSubscriptionIds);
        break;
      case 'renew':
        bulkRenewMutation.mutate({ 
          ids: selectedSubscriptionIds, 
          renewalPeriods: renewalPeriods || 1 
        });
        break;
      case 'change-status':
        if (newStatus) {
          bulkUpdateStatusMutation.mutate({ 
            ids: selectedSubscriptionIds, 
            status: newStatus 
          });
        }
        break;
    }
  };

  return {
    subscriptions: filteredSubscriptions,
    isLoading: subscriptionsQuery.isLoading,
    error: subscriptionsQuery.error,
    selectedSubscription,
    searchTerm,
    statusFilter,
    selectedSubscriptionIds,

    isEditDialogOpen,
    isCancelDialogOpen,
    isRenewDialogOpen,
    isViewDetailsDialogOpen,
    isBulkActionDialogOpen,
    bulkAction,
    newBulkStatus,
    
    isSubmitting: updateMutation.isPending,
    isCancelling: cancelMutation.isPending,
    isRenewing: renewMutation.isPending,
    isBulkProcessing: 
      bulkCancelMutation.isPending || 
      bulkRenewMutation.isPending || 
      bulkUpdateStatusMutation.isPending,

    setSelectedSubscription,
    handleSearch,
    handleStatusFilterChange,
    handleEditSubscription,
    handleCancelSubscriptionClick,
    handleRenewSubscriptionClick,
    handleViewDetailsClick,
    handleUpdateSubscription,
    handleConfirmCancel,
    handleConfirmRenew,
    
    handleSelectedRowsChange,
    handleBulkCancel,
    handleBulkRenew,
    handleBulkChangeStatus,
    handleConfirmBulkAction,
    setNewBulkStatus,
    
    setIsEditDialogOpen,
    setIsCancelDialogOpen,
    setIsRenewDialogOpen,
    setIsViewDetailsDialogOpen,
    setIsBulkActionDialogOpen
  };
}

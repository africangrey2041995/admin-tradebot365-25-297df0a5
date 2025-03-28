
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSubscription, PaymentRecord } from '@/types/subscription';
import { toast } from 'sonner';

// Query keys for React Query
export const subscriptionKeys = {
  all: ['subscriptions'] as const,
  byUser: (userId: string) => [...subscriptionKeys.all, 'user', userId] as const,
  detail: (subscriptionId: string) => [...subscriptionKeys.all, subscriptionId] as const,
  payments: (subscriptionId: string) => [...subscriptionKeys.detail(subscriptionId), 'payments'] as const,
};

// Mock data functions - would be replaced with real API calls
const fetchUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
  // Simulated API call
  console.log(`Fetching subscription for user: ${userId}`);
  
  // For demo purposes, return a mock subscription
  // In real app, this would call an API endpoint
  return {
    id: `sub_${Math.random().toString(36).substring(2, 10)}`,
    userId,
    packageId: 'pkg_basic',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
    autoRenew: true,
    status: 'active',
    currentPeriod: 'monthly',
    paymentMethod: 'Thẻ tín dụng',
    lastPaymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    nextPaymentDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    paymentHistory: [
      {
        id: `pay_${Math.random().toString(36).substring(2, 10)}`,
        userId,
        packageId: 'pkg_basic',
        amount: 299000,
        currency: 'VND',
        paymentMethod: 'Thẻ tín dụng',
        paymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        description: 'Thanh toán gói Basic - 1 tháng'
      }
    ]
  };
};

const updateSubscription = async (data: { subscriptionId: string, updates: Partial<UserSubscription> }): Promise<UserSubscription> => {
  // Simulated API call
  console.log(`Updating subscription ${data.subscriptionId}:`, data.updates);
  
  // In real app, this would call an API endpoint
  // Return mock updated subscription
  return {
    id: data.subscriptionId,
    userId: 'user123',
    packageId: 'pkg_basic',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: data.updates.autoRenew ?? true,
    status: data.updates.status ?? 'active',
    currentPeriod: data.updates.currentPeriod ?? 'monthly',
    ...data.updates,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Main hook for subscription management
export function useSubscription(userId: string) {
  const queryClient = useQueryClient();

  // Fetch user's subscription
  const subscriptionQuery = useQuery({
    queryKey: subscriptionKeys.byUser(userId),
    queryFn: () => fetchUserSubscription(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation to update subscription
  const updateMutation = useMutation({
    mutationFn: updateSubscription,
    onSuccess: (data) => {
      // Invalidate and refetch subscription data
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.byUser(userId) });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.detail(data.id) });
      toast.success('Đã cập nhật thông tin đăng ký thành công');
    },
    onError: (error) => {
      toast.error(`Lỗi khi cập nhật đăng ký: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Toggle auto-renew
  const toggleAutoRenew = (subscriptionId: string, currentValue: boolean) => {
    updateMutation.mutate({
      subscriptionId,
      updates: { autoRenew: !currentValue }
    });
  };

  // Cancel subscription
  const cancelSubscription = (subscriptionId: string) => {
    updateMutation.mutate({
      subscriptionId,
      updates: {
        status: 'cancelled',
        cancelledAt: new Date().toISOString(),
        autoRenew: false
      }
    });
  };

  return {
    subscription: subscriptionQuery.data,
    isLoading: subscriptionQuery.isLoading,
    error: subscriptionQuery.error,
    toggleAutoRenew,
    cancelSubscription,
    updateSubscription: (subscriptionId: string, updates: Partial<UserSubscription>) => 
      updateMutation.mutate({ subscriptionId, updates }),
    isUpdating: updateMutation.isPending
  };
}

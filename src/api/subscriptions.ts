
import { UserSubscription, PaymentRecord, SubscriptionStatus } from '@/types/subscription';

// Mock data for user subscriptions
const mockSubscriptions: UserSubscription[] = [
  {
    id: 'sub_a1b2c3',
    userId: 'USR-001',
    packageId: 'pkg_premium',
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
        id: 'pay_a1b2c3',
        userId: 'USR-001',
        packageId: 'pkg_premium',
        amount: 799000,
        currency: 'VND',
        paymentMethod: 'Thẻ tín dụng',
        paymentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        description: 'Thanh toán Premium - 1 tháng'
      }
    ]
  },
  {
    id: 'sub_d4e5f6',
    userId: 'USR-002',
    packageId: 'pkg_basic',
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // Expired
    autoRenew: false,
    status: 'expired',
    currentPeriod: 'monthly',
    paymentMethod: 'Paypal',
    lastPaymentDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    paymentHistory: [
      {
        id: 'pay_d4e5f6',
        userId: 'USR-002',
        packageId: 'pkg_basic',
        amount: 299000,
        currency: 'VND',
        paymentMethod: 'Paypal',
        paymentDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'success',
        description: 'Thanh toán Basic - 1 tháng'
      }
    ]
  }
];

// Fetch subscription by user ID
export const fetchUserSubscription = async (userId: string): Promise<UserSubscription | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const subscription = mockSubscriptions.find(sub => sub.userId === userId);
  
  if (!subscription) {
    return null;
  }
  
  return { ...subscription };
};

// Create a new subscription
export const createSubscription = async (data: Omit<UserSubscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserSubscription> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newSubscription: UserSubscription = {
    id: `sub_${Math.random().toString(36).substring(2, 10)}`,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // In a real app, this would be saved to a database
  return newSubscription;
};

// Update existing subscription
export const updateSubscription = async (subscriptionId: string, updates: Partial<UserSubscription>): Promise<UserSubscription> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const subIndex = mockSubscriptions.findIndex(sub => sub.id === subscriptionId);
  
  if (subIndex === -1) {
    throw new Error(`Subscription with ID ${subscriptionId} not found`);
  }
  
  // In a real app, this would update the database
  const updatedSubscription: UserSubscription = {
    ...mockSubscriptions[subIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return updatedSubscription;
};

// Cancel subscription
export const cancelSubscription = async (subscriptionId: string): Promise<UserSubscription> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const subIndex = mockSubscriptions.findIndex(sub => sub.id === subscriptionId);
  
  if (subIndex === -1) {
    throw new Error(`Subscription with ID ${subscriptionId} not found`);
  }
  
  // In a real app, this would update the database
  const updatedSubscription: UserSubscription = {
    ...mockSubscriptions[subIndex],
    status: 'cancelled',
    autoRenew: false,
    cancelledAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  return updatedSubscription;
};

// Add payment record to subscription
export const addPaymentRecord = async (subscriptionId: string, payment: Omit<PaymentRecord, 'id'>): Promise<PaymentRecord> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const subscription = mockSubscriptions.find(sub => sub.id === subscriptionId);
  
  if (!subscription) {
    throw new Error(`Subscription with ID ${subscriptionId} not found`);
  }
  
  const newPayment: PaymentRecord = {
    id: `pay_${Math.random().toString(36).substring(2, 10)}`,
    ...payment
  };
  
  // In a real app, this would update the database
  return newPayment;
};

// Fetch payment history for a subscription
export const fetchPaymentHistory = async (subscriptionId: string): Promise<PaymentRecord[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const subscription = mockSubscriptions.find(sub => sub.id === subscriptionId);
  
  if (!subscription) {
    throw new Error(`Subscription with ID ${subscriptionId} not found`);
  }
  
  return subscription.paymentHistory || [];
};

// Change subscription status
export const changeSubscriptionStatus = async (subscriptionId: string, newStatus: SubscriptionStatus): Promise<UserSubscription> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const subIndex = mockSubscriptions.findIndex(sub => sub.id === subscriptionId);
  
  if (subIndex === -1) {
    throw new Error(`Subscription with ID ${subscriptionId} not found`);
  }
  
  // In a real app, this would update the database
  const updatedSubscription: UserSubscription = {
    ...mockSubscriptions[subIndex],
    status: newStatus,
    updatedAt: new Date().toISOString()
  };
  
  return updatedSubscription;
};

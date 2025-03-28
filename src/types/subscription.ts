
/**
 * Định nghĩa các types liên quan đến Subscription
 */

export type SubscriptionStatus = 'active' | 'expired' | 'pending' | 'cancelled';

// Record thanh toán
export interface PaymentRecord {
  id: string;
  userId: string;
  packageId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentDate: string;
  status: 'success' | 'failed' | 'pending' | 'refunded';
  invoiceId?: string;
  receiptUrl?: string;
  description?: string;
}

// Thông tin đăng ký gói dịch vụ
export interface UserSubscription {
  id: string;
  userId: string;
  packageId: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  status: SubscriptionStatus;
  currentPeriod: 'monthly' | 'quarterly' | 'yearly';
  paymentMethod?: string;
  paymentHistory?: PaymentRecord[];
  lastPaymentDate?: string;
  nextPaymentDate?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Type guard to check if subscription is active
export function isActiveSubscription(subscription: UserSubscription | null | undefined): boolean {
  if (!subscription) return false;
  return subscription.status === 'active' && new Date(subscription.endDate) > new Date();
}

// Helper to calculate days remaining in subscription
export function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper to generate a human-readable subscription status
export function getSubscriptionStatusDisplay(subscription: UserSubscription | null | undefined): string {
  if (!subscription) return 'Không có gói';
  
  const daysRemaining = getDaysRemaining(subscription.endDate);
  
  switch(subscription.status) {
    case 'active':
      return daysRemaining <= 7 
        ? `Còn ${daysRemaining} ngày` 
        : 'Đang hoạt động';
    case 'expired':
      return 'Đã hết hạn';
    case 'pending':
      return 'Chờ xác nhận';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return 'Không xác định';
  }
}

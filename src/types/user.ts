
/**
 * Định nghĩa các types liên quan đến User
 */

import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';

// Thông tin cơ bản của user
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  country?: string;
  city?: string;
  address?: string;
  postalCode?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  plan: UserPlan;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  apiKeys?: UserApiKey[];
  preferences?: UserPreferences;
  billingInfo?: BillingInfo;
  notifications?: UserNotification[];
  bots: number; // Number of bots owned by user
  joinDate: string; // When user joined the platform
  botTypes?: string[]; // Types of bots user has access to
  activity?: string; // User activity status
}

// Thông tin API key của user
export interface UserApiKey {
  id: string;
  userId: string;
  key: string;
  name: string;
  createdAt: string;
  lastUsed?: string;
  permissions: string[];
  isActive: boolean;
}

// Cài đặt ưu tiên của user
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  smsNotificationsEnabled: boolean;
}

// Thông tin thanh toán của user
export interface BillingInfo {
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
  bankName?: string;
  accountNumber?: string;
  swiftCode?: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;
  billingPostalCode: string;
}

// Thông báo của user
export interface UserNotification {
  id: string;
  userId: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

// Type guard to check premium users
export function isPremiumUser(user: User): boolean {
  return user.plan === UserPlan.PREMIUM || user.plan === UserPlan.ENTERPRISE;
}

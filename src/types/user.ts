
import { UserStatus, UserPlan, UserRole, ActivityLevel } from '@/constants/userConstants';

/**
 * Định nghĩa các types liên quan đến User
 */

// Thông tin cơ bản của user
export interface User {
  id: string;
  email: string;
  fullName: string;
  displayName?: string;
  status: UserStatus;
  plan: UserPlan;
  role: UserRole;
  avatar?: string;
  joinDate: string;
  lastLogin?: string;
  bots: number;
  activityLevel?: ActivityLevel;
  verified: boolean;
  phoneNumber?: string;
  country?: string;
  timezone?: string;
  language?: string;
  botTypes?: string[];
}

// Thông tin đăng nhập
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Thông tin đăng ký
export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Thông tin hồ sơ người dùng
export interface UserProfile extends Omit<User, 'password'> {
  preferences?: UserPreferences;
  billingInfo?: BillingInfo;
  notifications?: NotificationSettings;
}

// Thiết lập người dùng
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// Thông tin thanh toán
export interface BillingInfo {
  plan: UserPlan;
  nextBillingDate?: string;
  paymentMethod?: string;
  billingAddress?: string;
  invoices?: Invoice[];
}

// Hóa đơn
export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'cancelled';
  downloadUrl?: string;
}

// Thiết lập thông báo
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketingEmails: boolean;
  botAlerts: boolean;
  securityAlerts: boolean;
  productUpdates: boolean;
}

// Yêu cầu thay đổi mật khẩu
export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Response cho thông tin user hiện tại
export interface CurrentUserResponse {
  user: User;
  token?: string;
  refreshToken?: string;
}

// Thông tin admin
export interface AdminUser extends User {
  adminLevel: 'full' | 'limited' | 'readonly';
  permissions: string[];
  managedUsers?: number;
  lastActivity?: string;
}

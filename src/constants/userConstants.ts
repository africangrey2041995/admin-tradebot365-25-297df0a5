
/**
 * Định nghĩa các hằng số liên quan đến người dùng
 */

// Các vai trò người dùng
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SUPPORT = 'support',
  PARTNER = 'partner',
  AGENT = 'agent'
}

// Trạng thái người dùng
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  BANNED = 'banned'
}

// Gói dịch vụ người dùng
export enum UserPlan {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
  TRIAL = 'trial'
}

// Định dạng hiển thị vai trò người dùng
export const USER_ROLE_DISPLAY: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Quản trị viên',
  [UserRole.USER]: 'Người dùng',
  [UserRole.SUPPORT]: 'Hỗ trợ',
  [UserRole.PARTNER]: 'Đối tác',
  [UserRole.AGENT]: 'Đại lý'
};

// Định dạng hiển thị trạng thái người dùng
export const USER_STATUS_DISPLAY: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'Hoạt động',
  [UserStatus.INACTIVE]: 'Không hoạt động',
  [UserStatus.PENDING]: 'Đang xử lý',
  [UserStatus.SUSPENDED]: 'Tạm khóa',
  [UserStatus.BANNED]: 'Đã khóa'
};

// Định dạng hiển thị gói dịch vụ người dùng
export const USER_PLAN_DISPLAY: Record<UserPlan, string> = {
  [UserPlan.FREE]: 'Miễn phí',
  [UserPlan.BASIC]: 'Cơ bản',
  [UserPlan.PREMIUM]: 'Cao cấp',
  [UserPlan.ENTERPRISE]: 'Doanh nghiệp',
  [UserPlan.TRIAL]: 'Dùng thử'
};

// Thông tin giới hạn gói dịch vụ
export const USER_PLAN_LIMITS: Record<UserPlan, { bots: number; accounts: number; }> = {
  [UserPlan.FREE]: { bots: 1, accounts: 2 },
  [UserPlan.BASIC]: { bots: 3, accounts: 5 },
  [UserPlan.PREMIUM]: { bots: 10, accounts: 20 },
  [UserPlan.ENTERPRISE]: { bots: 100, accounts: 200 },
  [UserPlan.TRIAL]: { bots: 2, accounts: 3 }
};

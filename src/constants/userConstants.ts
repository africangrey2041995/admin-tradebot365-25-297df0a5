
/**
 * Constants liên quan đến người dùng trong hệ thống
 */

// Các trạng thái người dùng
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended'
}

// Các gói dịch vụ
export enum UserPlan {
  FREE = 'free',
  TRIAL = 'trial',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise'
}

// Các vai trò người dùng
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPPORT = 'support'
}

// Định dạng hiển thị trạng thái người dùng
export const USER_STATUS_DISPLAY: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'Hoạt động',
  [UserStatus.INACTIVE]: 'Không hoạt động',
  [UserStatus.PENDING]: 'Chờ xác nhận',
  [UserStatus.SUSPENDED]: 'Đã khóa'
};

// Định dạng hiển thị gói dịch vụ
export const USER_PLAN_DISPLAY: Record<UserPlan, string> = {
  [UserPlan.FREE]: 'Miễn phí',
  [UserPlan.TRIAL]: 'Dùng thử',
  [UserPlan.BASIC]: 'Cơ bản',
  [UserPlan.PREMIUM]: 'Premium',
  [UserPlan.ENTERPRISE]: 'Doanh nghiệp'
};

// Định dạng hiển thị vai trò người dùng
export const USER_ROLE_DISPLAY: Record<UserRole, string> = {
  [UserRole.USER]: 'Người dùng',
  [UserRole.ADMIN]: 'Quản trị viên',
  [UserRole.SUPPORT]: 'Hỗ trợ'
};

// Mức độ hoạt động
export enum ActivityLevel {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Định dạng hiển thị mức độ hoạt động
export const ACTIVITY_LEVEL_DISPLAY: Record<ActivityLevel, string> = {
  [ActivityLevel.NONE]: 'Không hoạt động',
  [ActivityLevel.LOW]: 'Thấp',
  [ActivityLevel.MEDIUM]: 'Trung bình',
  [ActivityLevel.HIGH]: 'Cao'
};

// ID prefix cho người dùng
export const USER_ID_PREFIX = 'USR-';

// Các mẫu ID hợp lệ
export const USER_ID_REGEX = /^USR-\d{5}$/;

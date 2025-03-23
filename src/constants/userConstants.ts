
/**
 * User related constants
 */

// Roles of users in the system
export enum UserRole {
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
  AFFILIATE = 'affiliate',
  SUPPORT = 'support',
  PARTNER = 'partner',
  AGENT = 'agent'
}

// Status of users in the system
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
  BANNED = 'banned'
}

// Subscription plans
export enum UserPlan {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
  TRIAL = 'trial'
}

// Default limits for each plan
export const USER_PLAN_LIMITS = {
  [UserPlan.FREE]: {
    bots: 1,
    accounts: 1
  },
  [UserPlan.BASIC]: {
    bots: 3,
    accounts: 2
  },
  [UserPlan.PREMIUM]: {
    bots: 10,
    accounts: 5
  },
  [UserPlan.ENTERPRISE]: {
    bots: 50,
    accounts: 20
  },
  [UserPlan.TRIAL]: {
    bots: 2,
    accounts: 1
  }
};

// Display names for user plans
export const USER_PLAN_DISPLAY = {
  [UserPlan.FREE]: 'Miễn phí',
  [UserPlan.BASIC]: 'Cơ bản',
  [UserPlan.PREMIUM]: 'Cao cấp',
  [UserPlan.ENTERPRISE]: 'Doanh nghiệp',
  [UserPlan.TRIAL]: 'Dùng thử'
};

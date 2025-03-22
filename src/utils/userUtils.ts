import { User, UserPlan, UserRole, UserStatus } from '@/types';

/**
 * Gets a display name for a user
 */
export const getUserDisplayName = (user?: User | null): string => {
  if (!user) return 'Unknown User';
  
  if (user.name) {
    return user.name;
  }
  
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  
  if (user.firstName) {
    return user.firstName;
  }
  
  if (user.username) {
    return user.username;
  }
  
  return user.email.split('@')[0];
};

/**
 * Formats a user's role for display
 */
export const formatUserRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.SUPPORT:
      return 'Support';
    case UserRole.PARTNER:
      return 'Partner';
    case UserRole.AGENT:
      return 'Agent';
    default:
      return 'User';
  }
};

/**
 * Formats a user's status for display
 */
export const formatUserStatus = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'Active';
    case UserStatus.INACTIVE:
      return 'Inactive';
    case UserStatus.PENDING:
      return 'Pending';
    case UserStatus.SUSPENDED:
      return 'Suspended';
    default:
      return 'Unknown';
  }
};

/**
 * Formats a user's plan for display
 */
export const formatUserPlan = (plan: UserPlan): string => {
  switch (plan) {
    case UserPlan.FREE:
      return 'Free';
    case UserPlan.BASIC:
      return 'Basic';
    case UserPlan.PREMIUM:
      return 'Premium';
    case UserPlan.ENTERPRISE:
      return 'Enterprise';
    case UserPlan.TRIAL:
      return 'Trial';
    default:
      return 'Unknown';
  }
};

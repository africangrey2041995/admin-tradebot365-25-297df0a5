
import { BotStatus, BotType, BotRiskLevel } from '@/constants/botTypes';
import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';
import { User as BaseUser } from './user';
import { Bot, PremiumBot as BasePremiumBot, UserBot as BaseUserBot, PropBot as BasePropBot } from './bot';

/**
 * Admin-specific user interfaces with extended properties
 */

// Admin User Interface - extends the base User type
export interface AdminUser extends BaseUser {
  roleDescription?: string;
  permissions?: string[];
  lastLogin?: string;
}

// Admin User with admin-specific permissions
export interface AdminSuperUser extends Omit<AdminUser, "role" | "permissions"> {
  role: 'admin' | 'superadmin';
  permissions: {
    manageUsers: boolean;
    manageBots: boolean;
    manageDatabase: boolean;
    viewLogs: boolean;
    manageNotifications: boolean;
    manageEmail: boolean;
    manageSettings: boolean;
    manageAdmins: boolean;
  };
}

/**
 * Admin-specific bot interfaces with extended properties
 */

// Admin User Bot Interface - extends the base UserBot
export interface AdminUserBot extends BaseUserBot {
  // Additional properties for UserBot in admin context
  userEmail?: string;
  totalSignals?: number;
  errorSignals?: number;
  adminNotes?: string;
}

// Admin Premium Bot Interface - extends the base PremiumBot
export interface AdminPremiumBot extends BasePremiumBot {
  users?: number; // Number of users using this bot
  profit?: string; // Total profit generated
  colorScheme: 'default' | 'blue' | 'green' | 'red' | 'purple'; // Required in admin context
  adminSettings?: {
    isPromoted: boolean;
    isArchived: boolean;
    adminNotes?: string;
  };
}

// Admin Prop Bot Interface - extends the base PropBot
export interface AdminPropBot extends BasePropBot {
  description: string; // Required in admin context
  lastUpdated: string; // Required in admin context
  adminSettings?: {
    isPromoted: boolean;
    isArchived: boolean;
    adminNotes?: string;
  };
}

// BotProfileTabs component props
export interface BotProfileTabsProps {
  botId: string;
  onAddAccount: () => void;
}

// Type guard functions for admin-specific types
export function isAdminUser(user: BaseUser | AdminUser): user is AdminUser {
  return 'roleDescription' in user || 'permissions' in user;
}

export function isAdminSuperUser(user: BaseUser | AdminUser | AdminSuperUser): user is AdminSuperUser {
  return (user as AdminSuperUser).role === 'admin' || (user as AdminSuperUser).role === 'superadmin';
}

// Re-export the base types for convenience and backward compatibility
export type { BasePremiumBot as PremiumBot, BasePropBot as PropBot };

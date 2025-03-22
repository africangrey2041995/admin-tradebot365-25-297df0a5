
import { BotStatus, BotType } from '@/constants/botTypes';
import { UserStatus, UserPlan, UserRole } from '@/constants/userConstants';

/**
 * Định nghĩa các types dành riêng cho Admin
 */

// Thông tin user trong danh sách admin
export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
  plan: UserPlan;
  role: UserRole;
  bots: number;
  joinDate: string;
  botTypes?: string[];
  activity?: string;
}

// Thông tin premium bot trong danh sách admin
export interface AdminPremiumBotListItem {
  id: string;
  name: string;
  status: BotStatus;
  users: number;
  profit: string;
  createdDate: string;
  type: BotType.PREMIUM_BOT;
}

// Thông tin prop bot trong danh sách admin
export interface AdminPropBotListItem {
  id: string;
  name: string;
  status: BotStatus;
  users: number;
  profit: string;
  createdDate: string;
  type: BotType.PROP_BOT;
}

// Thông tin user bot trong danh sách admin
export interface AdminUserBotListItem {
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  status: BotStatus;
  accounts: number;
  createdDate: string;
  type: BotType.USER_BOT;
}

// Thông tin dashboard admin
export interface AdminDashboardStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    suspended: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
  };
  bots: {
    total: number;
    active: number;
    inactive: number;
    error: number;
    premium: number;
    prop: number;
    user: number;
  };
  revenue: {
    today: string;
    thisWeek: string;
    thisMonth: string;
    total: string;
    growth: string;
  };
  system: {
    errors: number;
    warnings: number;
    uptime: string;
    performanceScore: number;
    apiCalls: number;
    cpuUsage: string;
    memoryUsage: string;
  };
}

// Type cho item trong danh sách user bots
export interface UserBot {
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  status: string;
  accounts: number;
  createdDate: string;
}

// Fix re-exports with export type syntax
export type { User } from './user';
export type { PremiumBot, PropBot } from './bot';

// Add UserWithRole type
export interface UserWithRole {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

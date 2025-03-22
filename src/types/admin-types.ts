
import { BotStatus, BotType, BotRiskLevel } from '@/constants/botTypes';
import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';
import { Account } from './account';
import { Bot, PremiumBot as BasePremiumBot, UserBot as BaseUserBot, PropBot as BasePropBot } from './bot';

// Admin User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  plan: UserPlan;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  bots: number;
  joinDate: string;
}

export interface UserWithRole extends User {
  roleDescription?: string;
  permissions?: string[];
  lastLogin?: string;
}

// Admin User with admin-specific permissions
export interface AdminUser extends Omit<UserWithRole, "role" | "permissions"> {
  role: 'admin' | 'superadmin';
  bots: number;
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
  lastLogin?: string;
}

// Re-export bot types with the correct interfaces
export interface UserBot extends BaseUserBot {
  // Additional properties for UserBot in admin context
}

// Admin Premium Bot Interface
export interface PremiumBot extends BasePremiumBot {
  botId?: string;
  users?: number;
  profit?: string;
  colorScheme: 'default' | 'blue' | 'green' | 'red' | 'purple'; // Removed the optional marker (?)
}

// Admin Prop Bot Interface
export interface PropBot extends BasePropBot {
  users: number;
  profit: string;
  performanceLastMonth: string;
  performanceAllTime: string;
  minCapital: string;
  description: string;
  lastUpdated: string;
}

// BotProfileTabs component props
export interface BotProfileTabsProps {
  botId: string;
  onAddAccount: () => void;
}

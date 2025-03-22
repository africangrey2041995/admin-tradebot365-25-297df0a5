
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

// Re-export bot types with the correct interfaces
export type { BasePropBot as PropBot, BaseUserBot as UserBot };

// Admin Premium Bot Interface
export interface PremiumBot extends BasePremiumBot {
  botId?: string;
  users?: number;
  profit?: string;
}

// BotProfileTabs component props
export interface BotProfileTabsProps {
  botId: string;
  onAddAccount: () => void;
}

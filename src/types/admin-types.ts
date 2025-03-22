
import { BotStatus, BotType, BotRiskLevel } from '@/constants/botTypes';
import { UserRole, UserStatus, UserPlan } from '@/constants/userConstants';
import { Account } from './account';

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
}

// Admin Premium Bot Interface
export interface PremiumBot {
  id: string;
  name: string;
  description?: string;
  exchange?: string;
  type: BotType.PREMIUM_BOT;
  performanceLastMonth: string;
  performanceAllTime: string;
  risk: BotRiskLevel;
  minCapital: string;
  status: BotStatus;
  subscribers: number;
  imageUrl?: string | null;
  colorScheme?: 'default' | 'red' | 'blue' | 'green' | 'purple';
  isIntegrated?: boolean;
  botId?: string;
  users?: number;
  profit?: string;
  createdDate: string;
  lastUpdated?: string;
  features?: string[];
  tradingStyle?: string;
  timeframe?: string;
  markets?: string[];
  accounts?: Account[] | number;
}

// BotProfileTabs component props
export interface BotProfileTabsProps {
  botId: string;
  onAddAccount: () => void;
}


import { BotType, BotStatus, BotRiskLevel } from '@/constants/botTypes';

/**
 * Định nghĩa các types liên quan đến Bot
 */

// Thống kê hiệu suất bot
export interface BotPerformance {
  totalPnL: string;
  totalTrades: number;
  winRate: string;
  avgProfit: string;
  avgLoss: string;
  maxDrawdown: string;
  profitFactor: string;
  lastMonthPerformance: string;
  allTimePerformance: string;
  monthlyPerformance?: MonthlyPerformance[];
}

// Hiệu suất theo tháng
export interface MonthlyPerformance {
  month: string;
  performance: string;
  trades: number;
  winRate: string;
}

// Cài đặt của User Bot
export interface UserBotSettings {
  maxLoss?: string;
  maxRisk?: string;
  maxPositions?: number;
  activeTradingHours?: string[];
  excludedSymbols?: string[];
  includedSymbols?: string[];
  stopLoss?: string;
  takeProfit?: string;
  lotSize?: string;
  leverage?: string;
}

// Thông tin cơ bản của bot - Base bot interface with common properties
export interface BaseBot {
  id: string;
  name: string;
  description: string;
  status: BotStatus;
  type: BotType;
  createdDate: string;
  lastUpdated: string;
  risk?: BotRiskLevel;
  imageUrl?: string;
  exchange?: string;
  performance?: BotPerformance;
  ownerId?: string; // Standardized ownerId field
}

// Bot của người dùng
export interface UserBot extends BaseBot {
  type: BotType.USER_BOT;
  owner: string;
  ownerId: string; // Required for UserBot
  accounts: number;
  accountsList?: Account[];
  strategy?: string;
  isActive: boolean;
  settings?: UserBotSettings;
}

// Bot Premium
export interface PremiumBot extends BaseBot {
  type: BotType.PREMIUM_BOT;
  performanceLastMonth: string;
  performanceAllTime: string;
  minCapital: string;
  subscribers: number;
  colorScheme: 'default' | 'red' | 'blue' | 'green' | 'purple';
  isIntegrated?: boolean;
  features?: string[];
  tradingStyle?: string;
  timeframe?: string;
  markets?: string[];
  accounts?: Account[] | number;
}

// Bot PropTrading
export interface PropBot extends BaseBot {
  type: BotType.PROP_BOT;
  performanceLastMonth: string;
  performanceAllTime: string;
  minCapital: string;
  users: number; 
  profit: string;
  maxDrawdown?: string;
  propFirm?: string;
  challengeDuration?: string;
  accountSizes?: string[];
}

// Bot đã tích hợp
export interface IntegratedBot extends BaseBot {
  originalId: string;
  integratedDate: string;
  accounts?: Account[];
  performance?: BotPerformance;
}

// Thông tin trạng thái bot
export interface BotStatusInfo {
  id: string;
  status: BotStatus;
  lastActiveTime?: string;
  errorCount?: number;
  lastError?: string;
  healthStatus: 'healthy' | 'warning' | 'critical';
  connectionStatus: 'connected' | 'disconnected' | 'partial';
}

// Bot Type Union
export type Bot = UserBot | PremiumBot | PropBot | IntegratedBot;

// Type guard functions to check bot types
export function isUserBot(bot: Bot): bot is UserBot {
  return bot.type === BotType.USER_BOT;
}

export function isPremiumBot(bot: Bot): bot is PremiumBot {
  return bot.type === BotType.PREMIUM_BOT;
}

export function isPropBot(bot: Bot): bot is PropBot {
  return bot.type === BotType.PROP_BOT;
}

export function isIntegratedBot(bot: Bot): bot is IntegratedBot {
  return 'originalId' in bot && 'integratedDate' in bot;
}

// Import Account type to avoid circular dependencies
import { Account } from './account';

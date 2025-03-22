import { BotType, BotStatus, BotRiskLevel } from '@/constants/botTypes';
import { Account } from './account';

/**
 * Định nghĩa các types liên quan đến Bot
 */

// Thông tin cơ bản của bot
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
  botId?: string; // Added to match usage in components
}

// Bot của người dùng
export interface UserBot extends BaseBot {
  type: BotType.USER_BOT;
  owner: string;
  ownerId: string;
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
  users?: number; // Added to match usage in components
  profit?: string; // Added to match usage in components
  colorScheme: 'default' | 'red' | 'blue' | 'green' | 'purple';
  isIntegrated?: boolean;
  features?: string[];
  tradingStyle?: string;
  timeframe?: string;
  markets?: string[];
  accounts?: Account[] | number; // Added to match usage in components
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

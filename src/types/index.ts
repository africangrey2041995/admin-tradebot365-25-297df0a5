
export * from './user';
export * from './bot';
export * from './account';
export * from './signal';
export * from './connection';

// Re-export bot-related enums from constants for convenience
export { BotRiskLevel, BotType, BotStatus } from '@/constants/botTypes';
import { UserPlan } from '@/constants/userConstants';

/**
 * Các types khác
 */

// Log hoạt động hệ thống
export interface ActivityLog {
  id: string;
  type: 'user_registration' | 'user_login' | 'admin_login' | 'admin_action' | 'bot_action' | 'system';
  action: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  botId?: string;
  ipAddress?: string;
  timestamp: string;
  details: string;
  severity: 'info' | 'warning' | 'error';
}

// Thông báo hệ thống
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
  link?: string;
  linkText?: string;
  source: 'system' | 'bot' | 'user' | 'admin';
  sourceId?: string;
}

// Thống kê hệ thống
export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalBots: number;
  activeBots: number;
  totalAccounts: number;
  connectedAccounts: number;
  totalTrades: number;
  successfulTrades: number;
  failedTrades: number;
  systemLoad: number;
  uptime: string;
  lastUpdated: string;
}

// Thông tin phiên bản
export interface VersionInfo {
  version: string;
  buildNumber: string;
  releaseDate: string;
  environment: 'development' | 'staging' | 'production';
  features: string[];
  changelog: string[];
}

// Package definition - based on existing UserPlan and USER_PLAN_LIMITS
export interface Package {
  id: string;
  planId: UserPlan;
  name: string;
  description: string;
  features: string[];
  limits: {
    bots: number;
    accounts: number;
  };
  pricing: {
    monthly: number;
    quarterly: number;
    yearly: number;
    currency: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isPopular?: boolean;
  isEnterprise?: boolean;
}
